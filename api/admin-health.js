import { json } from './_lib/admin.js';
export default function handler(req,res){
  return json(res,200,{ok:true,version:'login-fix-2',panel:'/admin'});
}
