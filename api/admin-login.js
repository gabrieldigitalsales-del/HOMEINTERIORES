import { adminPassword, makeSessionCookie, json } from './_lib/admin.js';

async function readPassword(req){
  if (req.body && typeof req.body === 'object') return String(req.body.password || '').trim();
  if (typeof req.body === 'string') {
    try { return String(JSON.parse(req.body)?.password || '').trim(); } catch {}
    try { return String(new URLSearchParams(req.body).get('password') || '').trim(); } catch {}
  }
  return '';
}

export default async function handler(req,res){
  if(req.method !== 'POST') return json(res,405,{error:'Método não permitido.'});

  const supplied = await readPassword(req);
  const configured = String(adminPassword() || '').trim();
  if(!configured) return json(res,500,{error:'Configure HOME_INTERIORES_ADMIN_PASSWORD no Vercel antes de usar o painel.'});
  if(supplied !== configured) return json(res,401,{error:'Senha inválida.'});

  try {
    res.setHeader('Set-Cookie', makeSessionCookie());
    return json(res,200,{ok:true});
  } catch(err){
    console.error('Home Interiores admin-login:', err);
    return json(res,500,{error:'Senha correta, mas houve uma falha ao criar a sessão do painel.'});
  }
}
