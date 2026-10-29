import { supabase, supabaseEnabled } from './supabase';

export const TABLE_PRODUCTS = 'home_interiores_catalogo_produtos_2026';
export const BUCKET_IMAGES = 'home-interiores-produtos-2026';
export const MAX_PRODUCTS = 100;
export const TABLE_CATEGORIES = 'home_interiores_categorias_2026';
export const defaultCategories = ['Mesas','Sofás','Poltronas','Puffs e Bancos','Aparadores','Cadeiras','Decoração','Quadros'];
const LOCAL_CATEGORIES_KEY = 'home_interiores_categorias_2026';
const LOCAL_KEY = 'home_interiores_catalogo_produtos_2026';
const LOCAL_CATALOG_VERSION_KEY = 'home_interiores_catalogo_version_2026';
const LOCAL_CATALOG_VERSION = 'catalogo-20-produtos-v1';
const LOCAL_ADMIN_SESSION_KEY = 'home_interiores_admin_local_session_2026';
const isLocalDev = typeof window !== 'undefined' && ['localhost','127.0.0.1'].includes(window.location.hostname);

export function slugify(value=''){return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80)}
export function productCode(index=0){return `HI-${String(index+1).padStart(4,'0')}`}
function hydrateProduct(p,i=0){const code=p.code||productCode(i);return {...p,code,slug:p.slug||`${slugify(p.name||p.category||'peca')}-${String(code).toLowerCase()}`,status:p.status||'Disponível',published:p.published!==false,publication_status:p.publication_status||'published',old_price:p.old_price||'',sort_order:Number.isFinite(Number(p.sort_order))?Number(p.sort_order):i+1,related_ids:Array.isArray(p.related_ids)?p.related_ids:[]}}

export const seedProducts = [
  {
    "id": "catalogo-01",
    "name": "Conjunto de Jantar Aura Mármore",
    "category": "Mesas",
    "description": "Mesa de jantar com tampo claro de efeito marmorizado e cadeiras estofadas em tons neutros. Uma composição elegante para salas de jantar contemporâneas.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/produtos-2026/01-conjunto-aura-marmore.webp",
    "image_urls": [
      "/produtos-2026/01-conjunto-aura-marmore.webp"
    ],
    "code": "HI-0001",
    "slug": "conjunto-de-jantar-aura-marmore-hi-0001",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 1,
    "related_ids": []
  },
  {
    "id": "catalogo-02",
    "name": "Puff Loop Duo",
    "category": "Puffs e Bancos",
    "description": "Dupla de puffs estofados em tecido bege com estrutura curva em madeira, ideal para complementar salas, quartos e halls com leveza e personalidade.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/produtos-2026/02-puff-loop-duo.webp",
    "image_urls": [
      "/produtos-2026/02-puff-loop-duo.webp"
    ],
    "code": "HI-0002",
    "slug": "puff-loop-duo-hi-0002",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 2,
    "related_ids": []
  },
  {
    "id": "catalogo-03",
    "name": "Sofá Siena Bege",
    "category": "Sofás",
    "description": "Sofá de linhas retas em tom bege, com base em madeira e almofadas decorativas. Visual clean e acolhedor para ambientes sofisticados.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/produtos-2026/03-sofa-siena-bege.webp",
    "image_urls": [
      "/produtos-2026/03-sofa-siena-bege.webp"
    ],
    "code": "HI-0003",
    "slug": "sofa-siena-bege-hi-0003",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 3,
    "related_ids": []
  },
  {
    "id": "catalogo-04",
    "name": "Díptico Horizonte Árvore",
    "category": "Decoração",
    "description": "Composição em dois painéis com árvore ao pôr do sol, criando um ponto de destaque elegante e acolhedor para salas, halls e espaços de convivência.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/produtos-2026/04-diptico-horizonte-arvore.webp",
    "image_urls": [
      "/produtos-2026/04-diptico-horizonte-arvore.webp"
    ],
    "code": "HI-0004",
    "slug": "diptico-horizonte-arvore-hi-0004",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 4,
    "related_ids": []
  },
  {
    "id": "catalogo-05",
    "name": "Mesa Oval Milano",
    "category": "Mesas",
    "description": "Mesa de jantar oval clara acompanhada de cadeiras estofadas em taupe e estrutura metálica escura. Equilíbrio entre suavidade, conforto e design.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/produtos-2026/05-mesa-oval-milano.webp",
    "image_urls": [
      "/produtos-2026/05-mesa-oval-milano.webp"
    ],
    "code": "HI-0005",
    "slug": "mesa-oval-milano-hi-0005",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 5,
    "related_ids": []
  },
  {
    "id": "catalogo-06",
    "name": "Sofá Capri Cinza",
    "category": "Sofás",
    "description": "Sofá cinza de desenho contemporâneo, com proporções confortáveis e almofadas decorativas que acrescentam textura e sofisticação.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/produtos-2026/06-sofa-capri-cinza.webp",
    "image_urls": [
      "/produtos-2026/06-sofa-capri-cinza.webp"
    ],
    "code": "HI-0006",
    "slug": "sofa-capri-cinza-hi-0006",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 6,
    "related_ids": []
  },
  {
    "id": "catalogo-07",
    "name": "Banco Orgânico Nilo",
    "category": "Puffs e Bancos",
    "description": "Banco estofado de desenho orgânico, acabamento claro e pés em madeira. Uma peça versátil para living, quarto, hall ou apoio aos pés.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/produtos-2026/07-banco-organico-nilo.webp",
    "image_urls": [
      "/produtos-2026/07-banco-organico-nilo.webp"
    ],
    "code": "HI-0007",
    "slug": "banco-organico-nilo-hi-0007",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 7,
    "related_ids": []
  },
  {
    "id": "catalogo-08",
    "name": "Mesa de Jantar Verona",
    "category": "Mesas",
    "description": "Conjunto de jantar em madeira natural com desenho atemporal e cadeiras de linhas leves. Uma composição quente e elegante para receber.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/produtos-2026/08-mesa-verona-madeira.webp",
    "image_urls": [
      "/produtos-2026/08-mesa-verona-madeira.webp"
    ],
    "code": "HI-0008",
    "slug": "mesa-de-jantar-verona-hi-0008",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 8,
    "related_ids": []
  },
  {
    "id": "catalogo-09",
    "name": "Mesa de Jantar Íris",
    "category": "Mesas",
    "description": "Mesa redonda com tampo preto e cadeiras em madeira clara, criando contraste moderno e presença marcante em salas de jantar compactas ou integradas.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/produtos-2026/09-mesa-iris-preta.webp",
    "image_urls": [
      "/produtos-2026/09-mesa-iris-preta.webp"
    ],
    "code": "HI-0009",
    "slug": "mesa-de-jantar-iris-hi-0009",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 9,
    "related_ids": []
  },
  {
    "id": "catalogo-10",
    "name": "Poltrona Ravena Duo",
    "category": "Poltronas",
    "description": "Par de poltronas com estrutura robusta em madeira escura e estofado bege. Design retrô reinterpretado com conforto e acabamento sofisticado.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/produtos-2026/10-poltrona-duo-ravena.webp",
    "image_urls": [
      "/produtos-2026/10-poltrona-duo-ravena.webp"
    ],
    "code": "HI-0010",
    "slug": "poltrona-ravena-duo-hi-0010",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 10,
    "related_ids": []
  },
  {
    "id": "catalogo-11",
    "name": "Poltrona Nordic Couro",
    "category": "Poltronas",
    "description": "Poltrona de inspiração escandinava com madeira clara, trama natural e assento em tom caramelo. Uma peça autoral para composições de destaque.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/produtos-2026/11-poltrona-nordic-couro.webp",
    "image_urls": [
      "/produtos-2026/11-poltrona-nordic-couro.webp"
    ],
    "code": "HI-0011",
    "slug": "poltrona-nordic-couro-hi-0011",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 11,
    "related_ids": []
  },
  {
    "id": "catalogo-12",
    "name": "Poltrona Oslo Duo",
    "category": "Poltronas",
    "description": "Par de poltronas cinza com braços em madeira, linhas contemporâneas e conforto visual. Ideal para salas de estar, escritórios e cantos de leitura.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/produtos-2026/12-poltrona-duo-oslo-cinza.webp",
    "image_urls": [
      "/produtos-2026/12-poltrona-duo-oslo-cinza.webp"
    ],
    "code": "HI-0012",
    "slug": "poltrona-oslo-duo-hi-0012",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 12,
    "related_ids": []
  },
  {
    "id": "catalogo-13",
    "name": "Poltrona Siena Duo",
    "category": "Poltronas",
    "description": "Par de poltronas com estrutura em madeira e estofado claro, de desenho leve e elegante para composições contemporâneas.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/produtos-2026/13-poltrona-duo-siena.webp",
    "image_urls": [
      "/produtos-2026/13-poltrona-duo-siena.webp"
    ],
    "code": "HI-0013",
    "slug": "poltrona-siena-duo-hi-0013",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 13,
    "related_ids": []
  },
  {
    "id": "catalogo-14",
    "name": "Mesa de Jantar Carrara",
    "category": "Mesas",
    "description": "Conjunto de jantar redondo com tampo de efeito marmorizado, base central em madeira e cadeiras caramelo. Sofisticação com presença escultural.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/produtos-2026/14-mesa-carrara-marmore.webp",
    "image_urls": [
      "/produtos-2026/14-mesa-carrara-marmore.webp"
    ],
    "code": "HI-0014",
    "slug": "mesa-de-jantar-carrara-hi-0014",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 14,
    "related_ids": []
  },
  {
    "id": "catalogo-15",
    "name": "Mesa de Jantar Navy",
    "category": "Mesas",
    "description": "Mesa redonda em madeira acompanhada de cadeiras em trama azul-marinho. Uma composição marcante para áreas de jantar e espaços gourmet.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/produtos-2026/15-mesa-navy-madeira.webp",
    "image_urls": [
      "/produtos-2026/15-mesa-navy-madeira.webp"
    ],
    "code": "HI-0015",
    "slug": "mesa-de-jantar-navy-hi-0015",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 15,
    "related_ids": []
  },
  {
    "id": "catalogo-16",
    "name": "Poltrona Alba Bouclé",
    "category": "Poltronas",
    "description": "Poltrona em madeira clara com estofado bouclé em tom neutro. Textura, conforto e leveza em uma peça de visual atemporal.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/produtos-2026/16-poltrona-alba-boucle.webp",
    "image_urls": [
      "/produtos-2026/16-poltrona-alba-boucle.webp"
    ],
    "code": "HI-0016",
    "slug": "poltrona-alba-boucle-hi-0016",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 16,
    "related_ids": []
  },
  {
    "id": "catalogo-17",
    "name": "Sofá Kyoto Creme",
    "category": "Sofás",
    "description": "Sofá minimalista em tom creme com estrutura aparente em madeira. Linhas leves e elegantes para ambientes de estética natural e contemporânea.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/produtos-2026/17-sofa-kyoto-creme.webp",
    "image_urls": [
      "/produtos-2026/17-sofa-kyoto-creme.webp"
    ],
    "code": "HI-0017",
    "slug": "sofa-kyoto-creme-hi-0017",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 17,
    "related_ids": []
  },
  {
    "id": "catalogo-18",
    "name": "Cadeira Luna Taupe",
    "category": "Cadeiras",
    "description": "Cadeira estofada em taupe com estrutura de madeira e encosto curvo. Conforto e proporção elegante para sala de jantar ou home office.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/produtos-2026/18-cadeira-luna-taupe.webp",
    "image_urls": [
      "/produtos-2026/18-cadeira-luna-taupe.webp"
    ],
    "code": "HI-0018",
    "slug": "cadeira-luna-taupe-hi-0018",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 18,
    "related_ids": []
  },
  {
    "id": "catalogo-19",
    "name": "Cadeira Elisa Bouclé",
    "category": "Cadeiras",
    "description": "Cadeira com assento e encosto estofados em tecido texturizado, estrutura em madeira e desenho curvo que combina conforto e sofisticação.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/produtos-2026/19-cadeira-elisa-boucle.webp",
    "image_urls": [
      "/produtos-2026/19-cadeira-elisa-boucle.webp"
    ],
    "code": "HI-0019",
    "slug": "cadeira-elisa-boucle-hi-0019",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 19,
    "related_ids": []
  },
  {
    "id": "catalogo-20",
    "name": "Cadeira Trama Navy",
    "category": "Cadeiras",
    "description": "Cadeira em azul-marinho com trama envolvente e assento estofado. Uma peça de personalidade para jantar, varanda coberta ou espaço gourmet.",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/produtos-2026/20-cadeira-trama-navy.webp",
    "image_urls": [
      "/produtos-2026/20-cadeira-trama-navy.webp"
    ],
    "code": "HI-0020",
    "slug": "cadeira-trama-navy-hi-0020",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 20,
    "related_ids": []
  }
];
function localGet(){
  const raw = localStorage.getItem(LOCAL_KEY);
  const version = localStorage.getItem(LOCAL_CATALOG_VERSION_KEY);
  // Migração automática do catálogo local: garante que o lote com fotos apareça
  // mesmo para quem já abriu versões anteriores deste projeto no mesmo localhost.
  if (!raw || version !== LOCAL_CATALOG_VERSION) {
    const base=seedProducts.map(hydrateProduct);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(base));
    localStorage.setItem(LOCAL_CATALOG_VERSION_KEY, LOCAL_CATALOG_VERSION);
    return base;
  }
  try { return JSON.parse(raw).map(hydrateProduct); } catch {
    const base=seedProducts.map(hydrateProduct);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(base));
    localStorage.setItem(LOCAL_CATALOG_VERSION_KEY, LOCAL_CATALOG_VERSION);
    return base;
  }
}
function localSet(items){ localStorage.setItem(LOCAL_KEY, JSON.stringify(items)); }

export async function listProducts(){
  if (isLocalDev || !supabaseEnabled) return localGet();
  let { data, error } = await supabase.from(TABLE_PRODUCTS).select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false });
  if (error) {
    console.warn('Catálogo avançado ainda não atualizado; tentando compatibilidade:', error.message);
    const fallback=await supabase.from(TABLE_PRODUCTS).select('*').order('created_at',{ascending:false});
    data=fallback.data; error=fallback.error;
  }
  if (error) { console.warn(error); return seedProducts.map(hydrateProduct); }
  const remoteProducts = data?.length ? data.map(hydrateProduct) : [];
  const remoteHasCurrentCatalog = remoteProducts.some(product => {
    const urls = [product?.image_url, ...(Array.isArray(product?.image_urls) ? product.image_urls : [])]
      .filter(Boolean)
      .map(String);
    return String(product?.code || '').startsWith('HI-') &&
      urls.some(url =>
        url.startsWith('/catalogo/') ||
        url.includes('/storage/v1/object/public/home-interiores-produtos-2026/')
      );
  });
  return remoteHasCurrentCatalog ? remoteProducts : seedProducts.map(hydrateProduct);
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
  if(isLocalDev) return sessionStorage.getItem(LOCAL_ADMIN_SESSION_KEY)==='ok';
  try{
    const r=await fetch('/api/admin-session',{credentials:'same-origin'});
    const j=await r.json();
    return !!j.authenticated;
  }catch{return false}
}

export async function adminLogin(password){
  if(isLocalDev){
    if(String(password||'').trim()!=='asd123') throw new Error('Senha inválida.');
    sessionStorage.setItem(LOCAL_ADMIN_SESSION_KEY,'ok');
    return true;
  }
  const r=await fetch('/api/admin-login',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok) throw new Error(j.error||'Senha inválida.');
  return true;
}

export async function adminLogout(){
  if(isLocalDev){sessionStorage.removeItem(LOCAL_ADMIN_SESSION_KEY);return;}
  await fetch('/api/admin-logout',{method:'POST',credentials:'same-origin'}).catch(()=>{});
}

export async function saveProduct(product){
  if (isLocalDev || !supabaseEnabled) {
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
  if (isLocalDev || !supabaseEnabled) { localSet(localGet().filter(x=>x.id!==id)); return; }
  await adminRequest('deleteProduct',{id});
}

async function optimizeImage(file){
  if(!file?.type?.startsWith('image/') || /gif|svg/i.test(file.type)) return file;
  if(typeof document==='undefined') return file;
  const bitmap=await createImageBitmap(file).catch(()=>null); if(!bitmap) return file;
  const max=2200, scale=Math.min(1,max/Math.max(bitmap.width,bitmap.height));
  const w=Math.max(1,Math.round(bitmap.width*scale)),h=Math.max(1,Math.round(bitmap.height*scale));
  const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.drawImage(bitmap,0,0,w,h);bitmap.close?.();
  const blob=await new Promise(r=>canvas.toBlob(r,'image/webp',0.86));
  if(!blob || blob.size>=file.size) return file;
  return new File([blob],`${file.name.replace(/\.[^.]+$/,'')}.webp`,{type:'image/webp'});
}

export async function uploadImage(file){
  const optimized=await optimizeImage(file);
  if (isLocalDev || !supabaseEnabled) return await new Promise((resolve,reject)=>{ const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=reject; r.readAsDataURL(optimized); });
  file=optimized;
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
  if(isLocalDev || !supabaseEnabled) return localCategoriesGet();
  const {data,error}=await supabase.from(TABLE_CATEGORIES).select('*').order('position',{ascending:true}).order('name',{ascending:true});
  if(error){console.warn(error);return defaultCategories.map((name,i)=>({id:`fallback-${i}`,name,position:i+1}))}
  return data?.length?data:defaultCategories.map((name,i)=>({id:`fallback-${i}`,name,position:i+1}));
}

export async function saveCategory(category){
  if(isLocalDev || !supabaseEnabled){
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
  if(isLocalDev || !supabaseEnabled){
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
  hero_image_urls: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=88'],
  hero_kicker: 'Sete Lagoas · Minas Gerais',
  hero_title: 'Home Interiores',
  hero_subtitle: 'Design, curadoria e excelência para espaços que traduzem a sua essência.',
  essence_text: 'Design que acolhe. Curadoria que inspira. Excelência que permanece.',
  instagram_url: 'https://www.instagram.com/homeinterioresoficial/',
  whatsapp_general: '5531990813008',
  location: 'Sete Lagoas - MG',
  institutional_image_url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=88',
  promo_enabled: true,
  promo_start_at: '',
  promo_end_at: '',
  og_image_url: '',
  footer_address: 'Sete Lagoas - MG',
  business_hours: 'Atendimento sob consulta',
  privacy_email: '',
  commerce_enabled: false,
  promo_messages: [
    'ATÉ 10% OFF À VISTA',
    'FRETE GRÁTIS EM CONDIÇÕES ESPECIAIS',
    'OFERTAS EM PEÇAS SELECIONADAS',
    'CONDIÇÕES EXCLUSIVAS PELO WHATSAPP',
    'NOVIDADES NO SHOWROOM TODA SEMANA'
  ]
};

export async function getSiteSettings(){
  if (isLocalDev || !supabaseEnabled) {
    const raw=localStorage.getItem(LOCAL_SETTINGS_KEY);
    if(!raw){localStorage.setItem(LOCAL_SETTINGS_KEY,JSON.stringify(defaultSettings));return defaultSettings;}
    try{
      const merged={...defaultSettings,...JSON.parse(raw)};
      merged.hero_image_urls=Array.isArray(merged.hero_image_urls)&&merged.hero_image_urls.length
        ? merged.hero_image_urls.filter(Boolean).slice(0,6)
        : (merged.hero_image_url?[merged.hero_image_url]:[]);
      merged.hero_image_url=merged.hero_image_urls[0]||merged.hero_image_url||'';
      return merged;
    }catch{return defaultSettings}
  }
  const {data,error}=await supabase.from(TABLE_SETTINGS).select('*').eq('id','principal').maybeSingle();
  if(error){console.warn(error);return defaultSettings}
  const merged={...defaultSettings,...(data||{})};
  merged.hero_image_urls=Array.isArray(merged.hero_image_urls)&&merged.hero_image_urls.length
    ? merged.hero_image_urls.filter(Boolean).slice(0,6)
    : (merged.hero_image_url?[merged.hero_image_url]:[]);
  merged.hero_image_url=merged.hero_image_urls[0]||merged.hero_image_url||'';
  return merged;
}

export async function saveSiteSettings(settings){
  const heroImages=Array.isArray(settings?.hero_image_urls)?settings.hero_image_urls.filter(Boolean).slice(0,6):[];
  const payload={...defaultSettings,...settings,id:'principal',hero_image_urls:heroImages,hero_image_url:heroImages[0]||settings?.hero_image_url||''};
  if (isLocalDev || !supabaseEnabled){localStorage.setItem(LOCAL_SETTINGS_KEY,JSON.stringify(payload));return payload;}
  const {data}=await adminRequest('saveSettings',{settings:payload});
  return data;
}
