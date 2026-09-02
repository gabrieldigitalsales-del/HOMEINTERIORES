import { adminPassword, makeSessionCookie, json } from './_lib/admin.js';

export default async function handler(req,res){
  if(req.method !== 'POST') return json(res,405,{error:'Método não permitido.'});
  const supplied = String(req.body?.password || '');
  if(supplied !== adminPassword()) return json(res,401,{error:'Senha inválida.'});
  try {
    res.setHeader('Set-Cookie', makeSessionCookie());
    return json(res,200,{ok:true});
  } catch(err){ return json(res,500,{error:err.message}); }
}
