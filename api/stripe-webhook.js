import crypto from 'node:crypto';
import { serverSupabase, json } from './_lib/admin.js';

const ORDERS_TABLE='home_interiores_pedidos_2026';

async function rawBody(req){
  if(Buffer.isBuffer(req.body)) return req.body;
  if(typeof req.body==='string') return Buffer.from(req.body);
  const chunks=[];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk));
  return Buffer.concat(chunks);
}

function verifyStripeSignature(payload,header,secret){
  if(!header||!secret) return false;
  const parts=String(header).split(',').reduce((acc,p)=>{
    const [k,v]=p.split('=');
    if(k&&v) (acc[k]||(acc[k]=[])).push(v);
    return acc;
  },{});
  const t=parts.t?.[0];
  const signatures=parts.v1||[];
  if(!t||!signatures.length) return false;
  if(Math.abs(Date.now()/1000-Number(t))>300) return false;
  const expected=crypto.createHmac('sha256',secret).update(`${t}.`).update(payload).digest('hex');
  return signatures.some(sig=>{
    try{return sig.length===expected.length&&crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected))}catch{return false}
  });
}

export const config={api:{bodyParser:false}};

export default async function handler(req,res){
  if(req.method!=='POST') return json(res,405,{error:'Método não permitido.'});
  const webhookSecret=process.env.STRIPE_WEBHOOK_SECRET;
  if(!webhookSecret) return json(res,503,{error:'Webhook Stripe não configurado.'});
  try{
    const payload=await rawBody(req);
    const signature=req.headers['stripe-signature'];
    if(!verifyStripeSignature(payload,signature,webhookSecret)) return json(res,400,{error:'Assinatura Stripe inválida.'});
    const event=JSON.parse(payload.toString('utf8'));
    const session=event?.data?.object;
    if(!session?.id?.startsWith('cs_')) return json(res,200,{received:true});

    if(['checkout.session.completed','checkout.session.async_payment_succeeded','checkout.session.async_payment_failed','checkout.session.expired'].includes(event.type)){
      const sb=serverSupabase();
      const orderId=session.metadata?.home_order_id;
      if(orderId){
        const paid=['checkout.session.completed','checkout.session.async_payment_succeeded'].includes(event.type)&&session.payment_status==='paid';
        const failed=event.type==='checkout.session.async_payment_failed';
        const expired=event.type==='checkout.session.expired';
        const shipping=session.shipping_details||session.collected_information?.shipping_details||null;
        const customer=session.customer_details||{};
        await sb.from(ORDERS_TABLE).update({
          status:paid?'paid':failed?'payment_failed':expired?'expired':'pending',
          payment_status:session.payment_status||'unpaid',
          total_cents:Number(session.amount_total||0),
          customer_name:customer.name||null,
          customer_email:customer.email||null,
          customer_phone:customer.phone||null,
          shipping_address:shipping||null,
          stripe_session_id:session.id,
          stripe_payment_intent:typeof session.payment_intent==='string'?session.payment_intent:null,
          stripe_customer_id:typeof session.customer==='string'?session.customer:null,
          updated_at:new Date().toISOString()
        }).eq('id',orderId);
      }
    }
    return json(res,200,{received:true});
  }catch(err){
    console.error('Home Interiores Stripe webhook:',err);
    return json(res,400,{error:'Webhook inválido.'});
  }
}
