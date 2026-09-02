import { supabase, supabaseEnabled } from './supabase';

export const TABLE_PRODUCTS = 'home_interiores_catalogo_produtos_2026';
export const BUCKET_IMAGES = 'home-interiores-produtos-2026';
export const MAX_PRODUCTS = 30;
export const TABLE_CATEGORIES = 'home_interiores_categorias_2026';
export const defaultCategories = ['Mesas','Sofás','Poltronas','Aparadores','Cadeiras','Decoração'];
const LOCAL_CATEGORIES_KEY = 'home_interiores_categorias_2026';
const LOCAL_KEY = 'home_interiores_catalogo_produtos_2026';

export const seedProducts = [
  {
    id: 'mesa-organica', name: 'Mesa Orgânica Essenza', category: 'Mesas',
    description: 'Linhas orgânicas e presença escultural para composições contemporâneas.',
    price: '', seller_name: 'Equipe Home Interiores', seller_whatsapp: '5531990813008', featured: true,
    image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85', image_urls: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85']
  },
  {
    id: 'sofa-living', name: 'Sofá Living Curve', category: 'Sofás',
    description: 'Conforto generoso, proporções elegantes e acabamento pensado para salas de alto padrão.',
    price: '', seller_name: 'Equipe Home Interiores', seller_whatsapp: '5531990813008', featured: true,
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85', image_urls: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85']
  },
  {
    id: 'poltrona', name: 'Poltrona Serena', category: 'Poltronas',
    description: 'Uma peça de destaque que equilibra design, ergonomia e personalidade.',
    price: '', seller_name: 'Equipe Home Interiores', seller_whatsapp: '5531990813008', featured: false,
    image_url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1400&q=85', image_urls: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1400&q=85']
  },
  {
    id: 'aparador', name: 'Aparador Linha', category: 'Aparadores',
    description: 'Geometria limpa para organizar, apoiar e valorizar a composição do ambiente.',
    price: '', seller_name: 'Equipe Home Interiores', seller_whatsapp: '5531990813008', featured: false,
    image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85', image_urls: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85']
  },
  {
    id: 'cadeira', name: 'Cadeira Aura', category: 'Cadeiras',
    description: 'Madeira, textura e conforto em uma cadeira versátil para projetos sofisticados.',
    price: '', seller_name: 'Equipe Home Interiores', seller_whatsapp: '5531990813008', featured: false,
    image_url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1400&q=85', image_urls: ['https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1400&q=85']
  },
  {
    id: 'decoracao', name: 'Curadoria Decor', category: 'Decoração',
    description: 'Objetos selecionados para dar identidade, ritmo e acabamento aos espaços.',
    price: '', seller_name: 'Equipe Home Interiores', seller_whatsapp: '5531990813008', featured: false,
    image_url: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1400&q=85', image_urls: ['https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1400&q=85']
  }
];

function localGet(){
  const raw = localStorage.getItem(LOCAL_KEY);
  if (!raw) { localStorage.setItem(LOCAL_KEY, JSON.stringify(seedProducts)); return seedProducts; }
  try { return JSON.parse(raw); } catch { return seedProducts; }
}
function localSet(items){ localStorage.setItem(LOCAL_KEY, JSON.stringify(items)); }

export async function listProducts(){
  if (!supabaseEnabled) return localGet();
  const { data, error } = await supabase.from(TABLE_PRODUCTS).select('*').order('created_at', { ascending: false });
  if (error) { console.warn(error); return localGet(); }
  return data?.length ? data : seedProducts;
}

async function adminRequest(action, payload={}){
  const response = await fetch('/api/admin-data', {
    method:'POST',
    credentials:'same-origin',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({action,...payload})
  });
  const result = await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(result.error || 'Erro ao comunicar com o painel.');
  return result;
}

export async function checkAdminSession(){
  try{
    const r=await fetch('/api/admin-session',{credentials:'same-origin'});
    const j=await r.json();
    return !!j.authenticated;
  }catch{return false}
}

export async function adminLogin(password){
  const r=await fetch('/api/admin-login',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok) throw new Error(j.error||'Senha inválida.');
  return true;
}

export async function adminLogout(){
  await fetch('/api/admin-logout',{method:'POST',credentials:'same-origin'}).catch(()=>{});
}

export async function saveProduct(product){
  if (!supabaseEnabled) {
    const items = localGet();
    const isNew = !product.id;
    if (isNew && items.length >= MAX_PRODUCTS) throw new Error(`Limite máximo de ${MAX_PRODUCTS} produtos atingido. Exclua um produto para cadastrar outro.`);
    const id = product.id || crypto.randomUUID();
    const next = [{...product,id}, ...items.filter(x=>x.id!==id)];
    localSet(next); return {...product,id};
  }
  const {data}=await adminRequest('saveProduct',{product});
  return data;
}

export async function deleteProduct(id){
  if (!supabaseEnabled) { localSet(localGet().filter(x=>x.id!==id)); return; }
  await adminRequest('deleteProduct',{id});
}

export async function uploadImage(file){
  if (!supabaseEnabled) return await new Promise((resolve,reject)=>{ const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=reject; r.readAsDataURL(file); });
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const signed=await adminRequest('createUpload',{ext});
  const {error}=await supabase.storage.from(BUCKET_IMAGES).uploadToSignedUrl(signed.path,signed.token,file,{cacheControl:'3600',contentType:file.type||undefined});
  if(error) throw error;
  return signed.publicUrl;
}


function localCategoriesGet(){
  const raw=localStorage.getItem(LOCAL_CATEGORIES_KEY);
  if(!raw){localStorage.setItem(LOCAL_CATEGORIES_KEY,JSON.stringify(defaultCategories));return defaultCategories.map((name,i)=>({id:`local-${i}`,name,position:i+1}));}
  try{return JSON.parse(raw).map((name,i)=>typeof name==='string'?{id:`local-${i}`,name,position:i+1}:name)}catch{return defaultCategories.map((name,i)=>({id:`local-${i}`,name,position:i+1}))}
}
function localCategoriesSet(items){localStorage.setItem(LOCAL_CATEGORIES_KEY,JSON.stringify(items));}

export async function listCategories(){
  if(!supabaseEnabled) return localCategoriesGet();
  const {data,error}=await supabase.from(TABLE_CATEGORIES).select('*').order('position',{ascending:true}).order('name',{ascending:true});
  if(error){console.warn(error);return defaultCategories.map((name,i)=>({id:`fallback-${i}`,name,position:i+1}))}
  return data?.length?data:defaultCategories.map((name,i)=>({id:`fallback-${i}`,name,position:i+1}));
}

export async function saveCategory(category){
  if(!supabaseEnabled){
    const items=localCategoriesGet();
    const name=String(category?.name||'').trim();
    if(!name) throw new Error('Informe o nome da categoria.');
    if(items.some(x=>x.name.toLowerCase()===name.toLowerCase() && x.id!==category.id)) throw new Error('Essa categoria já existe.');
    const old=items.find(x=>x.id===category.id);
    const id=category.id||`local-${Date.now()}`;
    const next=category.id?items.map(x=>x.id===id?{...x,name}:x):[...items,{id,name,position:items.length+1}];
    localCategoriesSet(next);
    if(old && old.name!==name){localSet(localGet().map(p=>p.category===old.name?{...p,category:name}:p));}
    return {id,name};
  }
  const {data}=await adminRequest('saveCategory',{category});
  return data;
}

export async function deleteCategory(id){
  if(!supabaseEnabled){
    const items=localCategoriesGet();
    const cat=items.find(x=>x.id===id);
    if(cat && localGet().some(p=>p.category===cat.name)) throw new Error('Essa categoria está sendo usada por produto(s). Troque a categoria desses produtos antes de excluir.');
    localCategoriesSet(items.filter(x=>x.id!==id));return;
  }
  await adminRequest('deleteCategory',{id});
}

export const TABLE_SETTINGS = 'home_interiores_configuracoes_site_2026';
const LOCAL_SETTINGS_KEY = 'home_interiores_configuracoes_site_2026';
export const defaultSettings = {
  id: 'principal',
  hero_image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=88',
  hero_kicker: 'Sete Lagoas · Minas Gerais',
  hero_title: 'Home Interiores',
  hero_subtitle: 'Design, curadoria e excelência para espaços que traduzem a sua essência.',
  essence_text: 'Design que acolhe. Curadoria que inspira. Excelência que permanece.',
  instagram_url: 'https://www.instagram.com/homeinterioresoficial/',
  whatsapp_general: '5531990813008',
  location: 'Sete Lagoas - MG',
  institutional_image_url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=88'
};

export async function getSiteSettings(){
  if (!supabaseEnabled) {
    const raw=localStorage.getItem(LOCAL_SETTINGS_KEY);
    if(!raw){localStorage.setItem(LOCAL_SETTINGS_KEY,JSON.stringify(defaultSettings));return defaultSettings;}
    try{return {...defaultSettings,...JSON.parse(raw)}}catch{return defaultSettings}
  }
  const {data,error}=await supabase.from(TABLE_SETTINGS).select('*').eq('id','principal').maybeSingle();
  if(error){console.warn(error);return defaultSettings}
  return {...defaultSettings,...(data||{})};
}

export async function saveSiteSettings(settings){
  const payload={...defaultSettings,...settings,id:'principal'};
  if (!supabaseEnabled){localStorage.setItem(LOCAL_SETTINGS_KEY,JSON.stringify(payload));return payload;}
  const {data}=await adminRequest('saveSettings',{settings:payload});
  return data;
}
