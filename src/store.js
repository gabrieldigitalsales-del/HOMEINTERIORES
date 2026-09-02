import { supabase, supabaseEnabled } from './supabase';

export const TABLE_PRODUCTS = 'home_interiores_catalogo_produtos_2026';
export const BUCKET_IMAGES = 'home-interiores-produtos-2026';
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

export async function saveProduct(product){
  if (!supabaseEnabled) {
    const items = localGet();
    const id = product.id || crypto.randomUUID();
    const next = [{...product,id}, ...items.filter(x=>x.id!==id)];
    localSet(next); return {...product,id};
  }
  const payload = {...product};
  payload.image_urls = Array.isArray(payload.image_urls) ? [...new Set(payload.image_urls.filter(Boolean))] : (payload.image_url ? [payload.image_url] : []);
  payload.image_url = payload.image_urls[0] || payload.image_url || '';
  if (!payload.id) delete payload.id;
  const { data, error } = await supabase.from(TABLE_PRODUCTS).upsert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id){
  if (!supabaseEnabled) { localSet(localGet().filter(x=>x.id!==id)); return; }
  const { error } = await supabase.from(TABLE_PRODUCTS).delete().eq('id', id);
  if (error) throw error;
}

export async function uploadImage(file){
  if (!supabaseEnabled) return await new Promise((resolve,reject)=>{ const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=reject; r.readAsDataURL(file); });
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET_IMAGES).upload(path, file, { upsert:false, cacheControl:'3600' });
  if (error) throw error;
  return supabase.storage.from(BUCKET_IMAGES).getPublicUrl(path).data.publicUrl;
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
  const {data,error}=await supabase.from(TABLE_SETTINGS).upsert(payload).select().single();
  if(error) throw error;
  return data;
}
