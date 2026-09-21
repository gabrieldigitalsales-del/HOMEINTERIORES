import { clearSessionCookie, json } from './_lib/admin.js';
export default async function handler(req,res){
  res.setHeader('Set-Cookie', clearSessionCookie());
  return json(res,200,{ok:true});
}
