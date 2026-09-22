import crypto from 'node:crypto';
import { adminPassword, makeSessionCookie, json, serverSupabase } from './_lib/admin.js';

const ATTEMPT_TABLE='home_interiores_admin_login_attempts_2026';
const WINDOW_MS=15*60*1000;
const MAX_FAILED=8;

async function readPassword(req){
  if (req.body && typeof req.body === 'object') return String(req.body.password || '').trim();
  if (typeof req.body === 'string') {
    try { return String(JSON.parse(req.body)?.password || '').trim(); } catch {}
    try { return String(new URLSearchParams(req.body).get('password') || '').trim(); } catch {}
  }
  return '';
}

function requestIp(req){
  const forwarded=String(req.headers['x-forwarded-for']||'').split(',')[0].trim();
  return forwarded || String(req.headers['x-real-ip']||'').trim() || 'unknown';
}

function ipHash(req){
  return crypto.createHash('sha256').update(requestIp(req)).digest('hex');
}

function sameSecret(a,b){
  const ah=crypto.createHash('sha256').update(String(a||'')).digest();
  const bh=crypto.createHash('sha256').update(String(b||'')).digest();
  return crypto.timingSafeEqual(ah,bh);
}

export default async function handler(req,res){
  if(req.method !== 'POST') return json(res,405,{error:'Método não permitido.'});

  let sb;
  try { sb=serverSupabase(); }
  catch(err){ return json(res,500,{error:err.message}); }

  const hash=ipHash(req);
  const since=new Date(Date.now()-WINDOW_MS).toISOString();
  const {count,error:countError}=await sb
    .from(ATTEMPT_TABLE)
    .select('id',{count:'exact',head:true})
    .eq('ip_hash',hash)
    .eq('success',false)
    .gte('attempted_at',since);

  if(countError){
    console.error('Home Interiores admin-login rate limit:',countError);
    return json(res,500,{error:'Não foi possível validar o acesso ao painel.'});
  }
  if((count||0)>=MAX_FAILED){
    return json(res,429,{error:'Muitas tentativas de acesso. Aguarde alguns minutos e tente novamente.'});
  }

  const supplied = await readPassword(req);
  const configured = String(adminPassword() || '').trim();
  if(!configured) return json(res,500,{error:'Configure HOME_INTERIORES_ADMIN_PASSWORD no Vercel antes de usar o painel.'});

  if(!sameSecret(supplied,configured)){
    await sb.from(ATTEMPT_TABLE).insert({ip_hash:hash,success:false});
    return json(res,401,{error:'Senha inválida.'});
  }

  try {
    await sb.from(ATTEMPT_TABLE).insert({ip_hash:hash,success:true});
    res.setHeader('Set-Cookie', makeSessionCookie());
    return json(res,200,{ok:true});
  } catch(err){
    console.error('Home Interiores admin-login:', err);
    return json(res,500,{error:'Senha correta, mas houve uma falha ao criar a sessão do painel.'});
  }
}
