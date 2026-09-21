export default function handler(req,res){
  const proto=String(req.headers['x-forwarded-proto']||'https').split(',')[0];
  const host=req.headers.host;
  res.setHeader('Content-Type','text/plain; charset=utf-8');
  res.setHeader('Cache-Control','public, max-age=0, s-maxage=3600');
  res.status(200).send(`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: ${proto}://${host}/sitemap.xml\n`);
}
