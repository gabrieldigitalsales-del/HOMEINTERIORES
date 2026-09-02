import crypto from 'node:crypto';
import { isAdmin, serverSupabase, json, MAX_PRODUCTS, TABLE_PRODUCTS, TABLE_SETTINGS, TABLE_CATEGORIES, BUCKET_IMAGES } from './_lib/admin.js';

function cleanProduct(input={}){
  const p={...input};
  p.image_urls=Array.isArray(p.image_urls)?[...new Set(p.image_urls.filter(Boolean))]:(p.image_url?[p.image_url]:[]);
  p.image_url=p.image_urls[0]||p.image_url||'';
  delete p.created_at;
  return p;
}

export default async function handler(req,res){
  if(req.method !== 'POST') return json(res,405,{error:'Método não permitido.'});
  if(!isAdmin(req)) return json(res,401,{error:'Sessão do painel expirada. Entre novamente em /admin.'});
  let sb;
  try{ sb=serverSupabase(); }catch(err){ return json(res,500,{error:err.message}); }
  const action=String(req.body?.action||'');
  try{
    if(action==='saveProduct'){
      const product=cleanProduct(req.body.product||{});
      if(!product.id){
        const {count,error:countError}=await sb.from(TABLE_PRODUCTS).select('id',{count:'exact',head:true});
        if(countError) throw countError;
        if((count||0)>=MAX_PRODUCTS) return json(res,409,{error:`Limite máximo de ${MAX_PRODUCTS} produtos atingido.`});
        delete product.id;
        const {data,error}=await sb.from(TABLE_PRODUCTS).insert(product).select().single();
        if(error) throw error;
        return json(res,200,{data});
      }
      const id=product.id; delete product.id;
      const {data,error}=await sb.from(TABLE_PRODUCTS).update(product).eq('id',id).select().single();
      if(error) throw error;
      return json(res,200,{data});
    }
    if(action==='deleteProduct'){
      const {error}=await sb.from(TABLE_PRODUCTS).delete().eq('id',req.body.id);
      if(error) throw error;
      return json(res,200,{ok:true});
    }
    if(action==='saveCategory'){
      const input=req.body.category||{};
      const name=String(input.name||'').trim();
      if(!name) return json(res,400,{error:'Informe o nome da categoria.'});
      if(input.id){
        const {data:old,error:oldError}=await sb.from(TABLE_CATEGORIES).select('*').eq('id',input.id).single();
        if(oldError) throw oldError;
        const {data,error}=await sb.from(TABLE_CATEGORIES).update({name}).eq('id',input.id).select().single();
        if(error) throw error;
        if(old.name!==name){
          const {error:updateProductsError}=await sb.from(TABLE_PRODUCTS).update({category:name}).eq('category',old.name);
          if(updateProductsError) throw updateProductsError;
        }
        return json(res,200,{data});
      }
      const {data:maxData}=await sb.from(TABLE_CATEGORIES).select('position').order('position',{ascending:false}).limit(1).maybeSingle();
      const {data,error}=await sb.from(TABLE_CATEGORIES).insert({name,position:(maxData?.position||0)+1}).select().single();
      if(error) throw error;
      return json(res,200,{data});
    }
    if(action==='deleteCategory'){
      const {data:cat,error:catError}=await sb.from(TABLE_CATEGORIES).select('*').eq('id',req.body.id).single();
      if(catError) throw catError;
      const {count,error:countError}=await sb.from(TABLE_PRODUCTS).select('id',{count:'exact',head:true}).eq('category',cat.name);
      if(countError) throw countError;
      if((count||0)>0) return json(res,409,{error:'Essa categoria está sendo usada por produto(s). Troque a categoria desses produtos antes de excluir.'});
      const {error}=await sb.from(TABLE_CATEGORIES).delete().eq('id',req.body.id);
      if(error) throw error;
      return json(res,200,{ok:true});
    }
    if(action==='saveSettings'){
      const settings={...(req.body.settings||{}),id:'principal'};
      delete settings.created_at;
      const {data,error}=await sb.from(TABLE_SETTINGS).upsert(settings).select().single();
      if(error) throw error;
      return json(res,200,{data});
    }
    if(action==='createUpload'){
      const ext=String(req.body.ext||'jpg').replace(/[^a-zA-Z0-9]/g,'').toLowerCase()||'jpg';
      const path=`catalogo/${Date.now()}-${crypto.randomUUID()}.${ext}`;
      const {data,error}=await sb.storage.from(BUCKET_IMAGES).createSignedUploadUrl(path);
      if(error) throw error;
      const publicUrl=sb.storage.from(BUCKET_IMAGES).getPublicUrl(path).data.publicUrl;
      return json(res,200,{path,token:data.token,publicUrl});
    }
    return json(res,400,{error:'Ação inválida.'});
  }catch(err){
    console.error('Home Interiores admin-data:',err);
    return json(res,500,{error:err.message||'Erro interno.'});
  }
}
