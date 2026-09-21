import { supabase, supabaseEnabled } from './supabase';

export const TABLE_PRODUCTS = 'home_interiores_catalogo_produtos_2026';
export const BUCKET_IMAGES = 'home-interiores-produtos-2026';
export const MAX_PRODUCTS = 30;
export const TABLE_CATEGORIES = 'home_interiores_categorias_2026';
export const defaultCategories = ['Mesas','Sofás','Poltronas','Aparadores','Cadeiras','Decoração'];
const LOCAL_CATEGORIES_KEY = 'home_interiores_categorias_2026';
const LOCAL_KEY = 'home_interiores_catalogo_produtos_2026';
const LOCAL_CATALOG_VERSION_KEY = 'home_interiores_catalogo_version_2026';
const LOCAL_CATALOG_VERSION = 'fotos-30-produtos-v1';
const LOCAL_ADMIN_SESSION_KEY = 'home_interiores_admin_local_session_2026';
const isLocalDev = typeof window !== 'undefined' && ['localhost','127.0.0.1'].includes(window.location.hostname);

export function slugify(value=''){return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80)}
export function productCode(index=0){return `HI-${String(index+1).padStart(4,'0')}`}
function hydrateProduct(p,i=0){const code=p.code||productCode(i);return {...p,code,slug:p.slug||`${slugify(p.name||p.category||'peca')}-${String(code).toLowerCase()}`,status:p.status||'Disponível',published:p.published!==false,publication_status:p.publication_status||'published',old_price:p.old_price||'',sort_order:Number.isFinite(Number(p.sort_order))?Number(p.sort_order):i+1,related_ids:Array.isArray(p.related_ids)?p.related_ids:[]}}

export const seedProducts = [
  {
    "id": "importado-01",
    "name": "",
    "category": "Cadeiras",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/catalogo/produto-01/01.webp",
    "image_urls": [
      "/catalogo/produto-01/01.webp",
      "/catalogo/produto-01/02.webp",
      "/catalogo/produto-01/03.webp",
      "/catalogo/produto-01/04.webp",
      "/catalogo/produto-01/05.webp",
      "/catalogo/produto-01/06.webp"
    ],
    "code": "HI-0001",
    "slug": "peca-01-hi-0001",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 1,
    "related_ids": []
  },
  {
    "id": "importado-02",
    "name": "",
    "category": "Poltronas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/catalogo/produto-02/01.webp",
    "image_urls": [
      "/catalogo/produto-02/01.webp",
      "/catalogo/produto-02/02.webp",
      "/catalogo/produto-02/03.webp"
    ],
    "code": "HI-0002",
    "slug": "peca-02-hi-0002",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 2,
    "related_ids": []
  },
  {
    "id": "importado-03",
    "name": "",
    "category": "Mesas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/catalogo/produto-03/01.webp",
    "image_urls": [
      "/catalogo/produto-03/01.webp",
      "/catalogo/produto-03/02.webp",
      "/catalogo/produto-03/03.webp",
      "/catalogo/produto-03/04.webp",
      "/catalogo/produto-03/05.webp",
      "/catalogo/produto-03/06.webp",
      "/catalogo/produto-03/07.webp",
      "/catalogo/produto-03/08.webp"
    ],
    "code": "HI-0003",
    "slug": "peca-03-hi-0003",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 3,
    "related_ids": []
  },
  {
    "id": "importado-04",
    "name": "",
    "category": "Sofás",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/catalogo/produto-04/01.webp",
    "image_urls": [
      "/catalogo/produto-04/01.webp",
      "/catalogo/produto-04/02.webp",
      "/catalogo/produto-04/03.webp",
      "/catalogo/produto-04/04.webp",
      "/catalogo/produto-04/05.webp",
      "/catalogo/produto-04/06.webp",
      "/catalogo/produto-04/07.webp",
      "/catalogo/produto-04/08.webp",
      "/catalogo/produto-04/09.webp",
      "/catalogo/produto-04/10.webp"
    ],
    "code": "HI-0004",
    "slug": "peca-04-hi-0004",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 4,
    "related_ids": []
  },
  {
    "id": "importado-05",
    "name": "",
    "category": "Cadeiras",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/catalogo/produto-05/01.webp",
    "image_urls": [
      "/catalogo/produto-05/01.webp",
      "/catalogo/produto-05/02.webp",
      "/catalogo/produto-05/03.webp",
      "/catalogo/produto-05/04.webp"
    ],
    "code": "HI-0005",
    "slug": "peca-05-hi-0005",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 5,
    "related_ids": []
  },
  {
    "id": "importado-06",
    "name": "",
    "category": "Mesas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/catalogo/produto-06/01.webp",
    "image_urls": [
      "/catalogo/produto-06/01.webp",
      "/catalogo/produto-06/02.webp",
      "/catalogo/produto-06/03.webp",
      "/catalogo/produto-06/04.webp",
      "/catalogo/produto-06/05.webp"
    ],
    "code": "HI-0006",
    "slug": "peca-06-hi-0006",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 6,
    "related_ids": []
  },
  {
    "id": "importado-07",
    "name": "",
    "category": "Cadeiras",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/catalogo/produto-07/01.webp",
    "image_urls": [
      "/catalogo/produto-07/01.webp",
      "/catalogo/produto-07/02.webp",
      "/catalogo/produto-07/03.webp"
    ],
    "code": "HI-0007",
    "slug": "peca-07-hi-0007",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 7,
    "related_ids": []
  },
  {
    "id": "importado-08",
    "name": "",
    "category": "Mesas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": true,
    "image_url": "/catalogo/produto-08/01.webp",
    "image_urls": [
      "/catalogo/produto-08/01.webp",
      "/catalogo/produto-08/02.webp",
      "/catalogo/produto-08/03.webp",
      "/catalogo/produto-08/04.webp",
      "/catalogo/produto-08/05.webp",
      "/catalogo/produto-08/06.webp"
    ],
    "code": "HI-0008",
    "slug": "peca-08-hi-0008",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 8,
    "related_ids": []
  },
  {
    "id": "importado-09",
    "name": "",
    "category": "Cadeiras",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-09/01.webp",
    "image_urls": [
      "/catalogo/produto-09/01.webp",
      "/catalogo/produto-09/02.webp",
      "/catalogo/produto-09/03.webp",
      "/catalogo/produto-09/04.webp",
      "/catalogo/produto-09/05.webp"
    ],
    "code": "HI-0009",
    "slug": "peca-09-hi-0009",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 9,
    "related_ids": []
  },
  {
    "id": "importado-10",
    "name": "",
    "category": "Mesas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-10/01.webp",
    "image_urls": [
      "/catalogo/produto-10/01.webp",
      "/catalogo/produto-10/02.webp",
      "/catalogo/produto-10/03.webp",
      "/catalogo/produto-10/04.webp",
      "/catalogo/produto-10/05.webp",
      "/catalogo/produto-10/06.webp",
      "/catalogo/produto-10/07.webp"
    ],
    "code": "HI-0010",
    "slug": "peca-10-hi-0010",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 10,
    "related_ids": []
  },
  {
    "id": "importado-11",
    "name": "",
    "category": "Sofás",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-11/01.webp",
    "image_urls": [
      "/catalogo/produto-11/01.webp",
      "/catalogo/produto-11/02.webp",
      "/catalogo/produto-11/03.webp"
    ],
    "code": "HI-0011",
    "slug": "peca-11-hi-0011",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 11,
    "related_ids": []
  },
  {
    "id": "importado-12",
    "name": "",
    "category": "Cadeiras",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-12/01.webp",
    "image_urls": [
      "/catalogo/produto-12/01.webp",
      "/catalogo/produto-12/02.webp",
      "/catalogo/produto-12/03.webp",
      "/catalogo/produto-12/04.webp",
      "/catalogo/produto-12/05.webp"
    ],
    "code": "HI-0012",
    "slug": "peca-12-hi-0012",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 12,
    "related_ids": []
  },
  {
    "id": "importado-13",
    "name": "",
    "category": "Aparadores",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-13/01.webp",
    "image_urls": [
      "/catalogo/produto-13/01.webp",
      "/catalogo/produto-13/02.webp",
      "/catalogo/produto-13/03.webp",
      "/catalogo/produto-13/04.webp",
      "/catalogo/produto-13/05.webp",
      "/catalogo/produto-13/06.webp",
      "/catalogo/produto-13/07.webp"
    ],
    "code": "HI-0013",
    "slug": "peca-13-hi-0013",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 13,
    "related_ids": []
  },
  {
    "id": "importado-14",
    "name": "",
    "category": "Poltronas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-14/01.webp",
    "image_urls": [
      "/catalogo/produto-14/01.webp",
      "/catalogo/produto-14/02.webp",
      "/catalogo/produto-14/03.webp",
      "/catalogo/produto-14/04.webp",
      "/catalogo/produto-14/05.webp",
      "/catalogo/produto-14/06.webp",
      "/catalogo/produto-14/07.webp",
      "/catalogo/produto-14/08.webp",
      "/catalogo/produto-14/09.webp"
    ],
    "code": "HI-0014",
    "slug": "peca-14-hi-0014",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 14,
    "related_ids": []
  },
  {
    "id": "importado-15",
    "name": "",
    "category": "Sofás",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-15/01.webp",
    "image_urls": [
      "/catalogo/produto-15/01.webp",
      "/catalogo/produto-15/02.webp",
      "/catalogo/produto-15/03.webp",
      "/catalogo/produto-15/04.webp",
      "/catalogo/produto-15/05.webp",
      "/catalogo/produto-15/06.webp",
      "/catalogo/produto-15/07.webp",
      "/catalogo/produto-15/08.webp",
      "/catalogo/produto-15/09.webp",
      "/catalogo/produto-15/10.webp",
      "/catalogo/produto-15/11.webp",
      "/catalogo/produto-15/12.webp",
      "/catalogo/produto-15/13.webp",
      "/catalogo/produto-15/14.webp",
      "/catalogo/produto-15/15.webp",
      "/catalogo/produto-15/16.webp",
      "/catalogo/produto-15/17.webp"
    ],
    "code": "HI-0015",
    "slug": "peca-15-hi-0015",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 15,
    "related_ids": []
  },
  {
    "id": "importado-16",
    "name": "",
    "category": "Poltronas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-16/01.webp",
    "image_urls": [
      "/catalogo/produto-16/01.webp",
      "/catalogo/produto-16/02.webp",
      "/catalogo/produto-16/03.webp",
      "/catalogo/produto-16/04.webp"
    ],
    "code": "HI-0016",
    "slug": "peca-16-hi-0016",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 16,
    "related_ids": []
  },
  {
    "id": "importado-17",
    "name": "",
    "category": "Poltronas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-17/01.webp",
    "image_urls": [
      "/catalogo/produto-17/01.webp",
      "/catalogo/produto-17/02.webp",
      "/catalogo/produto-17/03.webp"
    ],
    "code": "HI-0017",
    "slug": "peca-17-hi-0017",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 17,
    "related_ids": []
  },
  {
    "id": "importado-18",
    "name": "",
    "category": "Mesas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-18/01.webp",
    "image_urls": [
      "/catalogo/produto-18/01.webp",
      "/catalogo/produto-18/02.webp",
      "/catalogo/produto-18/03.webp",
      "/catalogo/produto-18/04.webp",
      "/catalogo/produto-18/05.webp"
    ],
    "code": "HI-0018",
    "slug": "peca-18-hi-0018",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 18,
    "related_ids": []
  },
  {
    "id": "importado-19",
    "name": "",
    "category": "Mesas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-19/01.webp",
    "image_urls": [
      "/catalogo/produto-19/01.webp",
      "/catalogo/produto-19/02.webp",
      "/catalogo/produto-19/03.webp",
      "/catalogo/produto-19/04.webp",
      "/catalogo/produto-19/05.webp",
      "/catalogo/produto-19/06.webp"
    ],
    "code": "HI-0019",
    "slug": "peca-19-hi-0019",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 19,
    "related_ids": []
  },
  {
    "id": "importado-20",
    "name": "",
    "category": "Cadeiras",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-20/01.webp",
    "image_urls": [
      "/catalogo/produto-20/01.webp",
      "/catalogo/produto-20/02.webp",
      "/catalogo/produto-20/03.webp",
      "/catalogo/produto-20/04.webp",
      "/catalogo/produto-20/05.webp",
      "/catalogo/produto-20/06.webp",
      "/catalogo/produto-20/07.webp"
    ],
    "code": "HI-0020",
    "slug": "peca-20-hi-0020",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 20,
    "related_ids": []
  },
  {
    "id": "importado-21",
    "name": "",
    "category": "Mesas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-21/01.webp",
    "image_urls": [
      "/catalogo/produto-21/01.webp",
      "/catalogo/produto-21/02.webp",
      "/catalogo/produto-21/03.webp",
      "/catalogo/produto-21/04.webp",
      "/catalogo/produto-21/05.webp",
      "/catalogo/produto-21/06.webp",
      "/catalogo/produto-21/07.webp",
      "/catalogo/produto-21/08.webp"
    ],
    "code": "HI-0021",
    "slug": "peca-21-hi-0021",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 21,
    "related_ids": []
  },
  {
    "id": "importado-22",
    "name": "",
    "category": "Cadeiras",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-22/01.webp",
    "image_urls": [
      "/catalogo/produto-22/01.webp",
      "/catalogo/produto-22/02.webp",
      "/catalogo/produto-22/03.webp",
      "/catalogo/produto-22/04.webp"
    ],
    "code": "HI-0022",
    "slug": "peca-22-hi-0022",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 22,
    "related_ids": []
  },
  {
    "id": "importado-23",
    "name": "",
    "category": "Aparadores",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-23/01.webp",
    "image_urls": [
      "/catalogo/produto-23/01.webp",
      "/catalogo/produto-23/02.webp",
      "/catalogo/produto-23/03.webp",
      "/catalogo/produto-23/04.webp",
      "/catalogo/produto-23/05.webp",
      "/catalogo/produto-23/06.webp",
      "/catalogo/produto-23/07.webp",
      "/catalogo/produto-23/08.webp",
      "/catalogo/produto-23/09.webp",
      "/catalogo/produto-23/10.webp",
      "/catalogo/produto-23/11.webp",
      "/catalogo/produto-23/12.webp",
      "/catalogo/produto-23/13.webp"
    ],
    "code": "HI-0023",
    "slug": "peca-23-hi-0023",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 23,
    "related_ids": []
  },
  {
    "id": "importado-24",
    "name": "",
    "category": "Poltronas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-24/01.webp",
    "image_urls": [
      "/catalogo/produto-24/01.webp",
      "/catalogo/produto-24/02.webp",
      "/catalogo/produto-24/03.webp",
      "/catalogo/produto-24/04.webp",
      "/catalogo/produto-24/05.webp",
      "/catalogo/produto-24/06.webp"
    ],
    "code": "HI-0024",
    "slug": "peca-24-hi-0024",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 24,
    "related_ids": []
  },
  {
    "id": "importado-25",
    "name": "",
    "category": "Mesas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-25/01.webp",
    "image_urls": [
      "/catalogo/produto-25/01.webp",
      "/catalogo/produto-25/02.webp",
      "/catalogo/produto-25/03.webp",
      "/catalogo/produto-25/04.webp"
    ],
    "code": "HI-0025",
    "slug": "peca-25-hi-0025",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 25,
    "related_ids": []
  },
  {
    "id": "importado-26",
    "name": "",
    "category": "Poltronas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-26/01.webp",
    "image_urls": [
      "/catalogo/produto-26/01.webp",
      "/catalogo/produto-26/02.webp",
      "/catalogo/produto-26/03.webp"
    ],
    "code": "HI-0026",
    "slug": "peca-26-hi-0026",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 26,
    "related_ids": []
  },
  {
    "id": "importado-27",
    "name": "",
    "category": "Mesas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-27/01.webp",
    "image_urls": [
      "/catalogo/produto-27/01.webp",
      "/catalogo/produto-27/02.webp",
      "/catalogo/produto-27/03.webp",
      "/catalogo/produto-27/04.webp",
      "/catalogo/produto-27/05.webp",
      "/catalogo/produto-27/06.webp"
    ],
    "code": "HI-0027",
    "slug": "peca-27-hi-0027",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 27,
    "related_ids": []
  },
  {
    "id": "importado-28",
    "name": "",
    "category": "Mesas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-28/01.webp",
    "image_urls": [
      "/catalogo/produto-28/01.webp",
      "/catalogo/produto-28/02.webp",
      "/catalogo/produto-28/03.webp",
      "/catalogo/produto-28/04.webp"
    ],
    "code": "HI-0028",
    "slug": "peca-28-hi-0028",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 28,
    "related_ids": []
  },
  {
    "id": "importado-29",
    "name": "",
    "category": "Aparadores",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-29/01.webp",
    "image_urls": [
      "/catalogo/produto-29/01.webp",
      "/catalogo/produto-29/02.webp",
      "/catalogo/produto-29/03.webp",
      "/catalogo/produto-29/04.webp"
    ],
    "code": "HI-0029",
    "slug": "peca-29-hi-0029",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 29,
    "related_ids": []
  },
  {
    "id": "importado-30",
    "name": "",
    "category": "Mesas",
    "description": "",
    "price": "",
    "old_price": "",
    "seller_name": "Equipe Home Interiores",
    "seller_whatsapp": "5531990813008",
    "featured": false,
    "image_url": "/catalogo/produto-30/01.webp",
    "image_urls": [
      "/catalogo/produto-30/01.webp",
      "/catalogo/produto-30/02.webp",
      "/catalogo/produto-30/03.webp",
      "/catalogo/produto-30/04.webp",
      "/catalogo/produto-30/05.webp"
    ],
    "code": "HI-0030",
    "slug": "peca-30-hi-0030",
    "status": "Disponível",
    "published": true,
    "publication_status": "published",
    "sort_order": 30,
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
