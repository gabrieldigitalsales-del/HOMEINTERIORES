import { serverSupabase, json, TABLE_PRODUCTS } from './_lib/admin.js';

const ORDERS_TABLE = 'home_interiores_pedidos_2026';

function priceToCents(value=''){
  let s=String(value||'').trim().replace(/\s/g,'').replace(/^R\$/i,'');
  if(!s) return 0;
  if(s.includes(',')){
    s=s.replace(/\./g,'').replace(',','.');
  }else{
    const dots=(s.match(/\./g)||[]).length;
    if(dots>1) s=s.replace(/\./g,'');
    else if(dots===1){
      const [a,b='']=s.split('.');
      if(b.length===3) s=a+b;
    }
  }
  s=s.replace(/[^0-9.]/g,'');
  const n=Number(s);
  return Number.isFinite(n)&&n>0?Math.round(n*100):0;
}

function requestOrigin(req){
  const proto=String(req.headers['x-forwarded-proto']||'https').split(',')[0];
  const host=String(req.headers['x-forwarded-host']||req.headers.host||'').split(',')[0];
  return host?`${proto}://${host}`:'';
}

function stripeParams(items,orderId,origin){
  const p=new URLSearchParams();
  p.set('mode','payment');
  p.set('automatic_payment_methods[enabled]','true');
  p.set('customer_creation','always');
  p.set('billing_address_collection','required');
  p.set('phone_number_collection[enabled]','true');
  p.set('shipping_address_collection[allowed_countries][0]','BR');
  p.set('success_url',`${origin}/pedido/sucesso?session_id={CHECKOUT_SESSION_ID}`);
  p.set('cancel_url',`${origin}/carrinho?cancelado=1`);
  p.set('locale','pt-BR');
  p.set('metadata[home_order_id]',orderId);

  items.forEach((item,i)=>{
    p.set(`line_items[${i}][quantity]`,String(item.quantity));
    p.set(`line_items[${i}][price_data][currency]`,'brl');
    p.set(`line_items[${i}][price_data][unit_amount]`,String(item.unit_amount));
    p.set(`line_items[${i}][price_data][product_data][name]`,item.name);
    p.set(`line_items[${i}][price_data][product_data][description]`,item.description);
    if(item.image_url?.startsWith('https://')) p.set(`line_items[${i}][price_data][product_data][images][0]`,item.image_url);
    p.set(`line_items[${i}][price_data][product_data][metadata][product_id]`,item.id);
    p.set(`line_items[${i}][price_data][product_data][metadata][code]`,item.code||'');
  });
  return p;
}

export default async function handler(req,res){
  if(req.method!=='POST') return json(res,405,{error:'Método não permitido.'});
  const secret=process.env.STRIPE_SECRET_KEY;
  if(!secret) return json(res,503,{error:'Pagamento online ainda não foi ativado. Configure STRIPE_SECRET_KEY no Vercel.'});

  const requested=Array.isArray(req.body?.items)?req.body.items:[];
  const qtyById=new Map();
  for(const item of requested){
    const id=String(item?.id||'');
    const quantity=Math.max(1,Math.min(10,Number(item?.quantity)||1));
    if(id) qtyById.set(id,quantity);
  }
  const ids=[...qtyById.keys()];
  if(!ids.length) return json(res,400,{error:'Seu carrinho está vazio.'});

  try{
    const sb=serverSupabase();
    const {data:shopSettings,error:settingsError}=await sb.from('home_interiores_configuracoes_site_2026').select('commerce_enabled').eq('id','principal').maybeSingle();
    if(settingsError) throw settingsError;
    if(shopSettings?.commerce_enabled!==true) return json(res,403,{error:'As compras pelo site estão desativadas no momento. Fale com a Home Interiores pelo WhatsApp.'});
    const {data:products,error}=await sb.from(TABLE_PRODUCTS).select('id,name,category,description,price,image_url,code,published,status').in('id',ids);
    if(error) throw error;

    const byId=new Map((products||[]).map(p=>[p.id,p]));
    const items=[];
    for(const id of ids){
      const p=byId.get(id);
      if(!p||p.published===false) continue;
      const cents=priceToCents(p.price);
      if(!cents) continue;
      items.push({
        id:p.id,
        code:p.code||'',
        name:String(p.name||'').trim()||p.category||'Peça Home Interiores',
        description:[p.code,p.category,p.status].filter(Boolean).join(' · ').slice(0,500),
        unit_amount:cents,
        quantity:qtyById.get(id)||1,
        image_url:p.image_url||''
      });
    }
    if(!items.length) return json(res,400,{error:'Os produtos do carrinho ainda não possuem preço válido para pagamento online.'});

    const total=items.reduce((sum,x)=>sum+x.unit_amount*x.quantity,0);
    const {data:order,error:orderError}=await sb.from(ORDERS_TABLE).insert({
      status:'pending',
      payment_status:'unpaid',
      currency:'brl',
      total_cents:total,
      items:items.map(x=>({id:x.id,code:x.code,name:x.name,unit_amount:x.unit_amount,quantity:x.quantity,image_url:x.image_url}))
    }).select('id').single();
    if(orderError) throw orderError;

    const origin=requestOrigin(req);
    if(!origin) throw new Error('Não foi possível determinar o endereço do site.');

    const stripeRes=await fetch('https://api.stripe.com/v1/checkout/sessions',{
      method:'POST',
      headers:{
        Authorization:`Bearer ${secret}`,
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body:stripeParams(items,order.id,origin)
    });
    const session=await stripeRes.json();
    if(!stripeRes.ok){
      await sb.from(ORDERS_TABLE).update({status:'checkout_error',updated_at:new Date().toISOString()}).eq('id',order.id);
      throw new Error(session?.error?.message||'Não foi possível iniciar o pagamento.');
    }

    await sb.from(ORDERS_TABLE).update({stripe_session_id:session.id,updated_at:new Date().toISOString()}).eq('id',order.id);
    return json(res,200,{url:session.url,session_id:session.id});
  }catch(err){
    console.error('Home Interiores checkout:',err);
    return json(res,500,{error:err.message||'Erro ao iniciar pagamento.'});
  }
}
