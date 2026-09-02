import crypto from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

export const COOKIE_NAME = 'home_interiores_admin_session_2026';
export const MAX_PRODUCTS = 30;
export const TABLE_PRODUCTS = 'home_interiores_catalogo_produtos_2026';
export const TABLE_SETTINGS = 'home_interiores_configuracoes_site_2026';
export const TABLE_CATEGORIES = 'home_interiores_categorias_2026';
export const BUCKET_IMAGES = 'home-interiores-produtos-2026';

function sessionSecret(){
  return process.env.HOME_INTERIORES_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
}

function expectedToken(){
  const secret = sessionSecret();
  if (!secret) return '';
  return crypto.createHmac('sha256', secret).update('home-interiores-admin-2026').digest('hex');
}

export function isAdmin(req){
  const cookies = String(req.headers.cookie || '').split(';').map(v=>v.trim());
  const item = cookies.find(v=>v.startsWith(`${COOKIE_NAME}=`));
  if (!item) return false;
  const token = decodeURIComponent(item.slice(COOKIE_NAME.length + 1));
  const expected = expectedToken();
  if (!token || !expected || token.length !== expected.length) return false;
  try { return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected)); } catch { return false; }
}

export function makeSessionCookie(){
  const token = expectedToken();
  if (!token) throw new Error('HOME_INTERIORES_SESSION_SECRET ou SUPABASE_SERVICE_ROLE_KEY não configurado no Vercel.');
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=28800`;
}

export function clearSessionCookie(){
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

export function adminPassword(){
  return process.env.HOME_INTERIORES_ADMIN_PASSWORD || 'asd123';
}

export function serverSupabase(){
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no Vercel.');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function json(res, status, body){
  res.status(status).setHeader('Content-Type','application/json; charset=utf-8').json(body);
}
