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
  // asd123 permanece como senha de acesso garantida nesta versão.
  const validPasswords = new Set(['asd123', configured].filter(Boolean));

  if(!validPasswords.has(supplied)) return json(res,401,{error:'Senha inválida.'});

  try {
    res.setHeader('Set-Cookie', makeSessionCookie());
    return json(res,200,{ok:true});
  } catch(err){
    console.error('Home Interiores admin-login:', err);
    return json(res,500,{error:'Senha correta, mas houve uma falha ao criar a sessão do painel.'});
  }
}
