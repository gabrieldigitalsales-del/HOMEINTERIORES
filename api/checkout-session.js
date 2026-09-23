import { serverSupabase, json } from './_lib/admin.js';

const ORDERS_TABLE='home_interiores_pedidos_2026';

export default async function handler(req,res){
  if(req.method!=='GET') return json(res,405,{error:'Método não permitido.'});
  const secret=process.env.STRIPE_SECRET_KEY;
  if(!secret) return json(res,503,{error:'Pagamento online ainda não foi ativado.'});
  const sessionId=String(req.query?.session_id||'');
  if(!sessionId.startsWith('cs_')) return json(res,400,{error:'Sessão inválida.'});
  try{
    const stripeRes=await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=payment_intent`,{
      headers:{Authorization:`Bearer ${secret}`}
    });
    const session=await stripeRes.json();
    if(!stripeRes.ok) throw new Error(session?.error?.message||'Não foi possível consultar o pagamento.');

    const sb=serverSupabase();
    const orderId=session.metadata?.home_order_id||null;
    const shipping=session.shipping_details||session.collected_information?.shipping_details||null;
    const customer=session.customer_details||{};
    const paid=session.payment_status==='paid';
    if(orderId){
      await sb.from(ORDERS_TABLE).update({
        status:paid?'paid':'pending',
        payment_status:session.payment_status||'unpaid',
        total_cents:Number(session.amount_total||0),
        customer_name:customer.name||null,
        customer_email:customer.email||null,
        customer_phone:customer.phone||null,
        shipping_address:shipping||null,
        stripe_session_id:session.id,
        stripe_payment_intent:typeof session.payment_intent==='string'?session.payment_intent:(session.payment_intent?.id||null),
        stripe_customer_id:typeof session.customer==='string'?session.customer:(session.customer?.id||null),
        updated_at:new Date().toISOString()
      }).eq('id',orderId);
    }

    return json(res,200,{
      paid,
      payment_status:session.payment_status,
      amount_total:session.amount_total||0,
      customer_name:customer.name||'',
      customer_email:customer.email||'',
      order_id:orderId
    });
  }catch(err){
    console.error('Home Interiores checkout verify:',err);
    return json(res,500,{error:err.message||'Erro ao verificar pagamento.'});
  }
}
