import { serverSupabase, TABLE_PRODUCTS } from './_lib/admin.js';

function esc(v=''){return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')}
export default async function handler(req,res){
  const proto=String(req.headers['x-forwarded-proto']||'https').split(',')[0];
  const host=req.headers.host;
  const base=`${proto}://${host}`;
  const fixed=['/','/catalogo','/sobre','/contato','/privacidade','/termos'];
  let products=[];
  try{
    const sb=serverSupabase();
    const {data}=await sb.from(TABLE_PRODUCTS).select('slug,updated_at,published,publication_status').eq('published',true);
    products=(data||[]).filter(x=>x.slug&&x.publication_status!=='draft');
  }catch{}
  const urls=[...fixed.map(path=>({loc:`${base}${path}`})),...products.map(p=>({loc:`${base}/produto/${encodeURIComponent(p.slug)}`,lastmod:p.updated_at}))];
  const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${esc(u.loc)}</loc>${u.lastmod?`<lastmod>${esc(new Date(u.lastmod).toISOString())}</lastmod>`:''}</url>`).join('\n')}\n</urlset>`;
  res.setHeader('Content-Type','application/xml; charset=utf-8');
  res.setHeader('Cache-Control','public, max-age=0, s-maxage=3600');
  res.status(200).send(xml);
}
