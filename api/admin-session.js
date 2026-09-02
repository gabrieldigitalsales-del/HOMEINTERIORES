import { isAdmin, json } from './_lib/admin.js';
export default async function handler(req,res){
  if(req.method !== 'GET') return json(res,405,{error:'Método não permitido.'});
  return json(res,200,{authenticated:isAdmin(req)});
}
