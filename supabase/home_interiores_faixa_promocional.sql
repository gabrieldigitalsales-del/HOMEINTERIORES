-- HOME INTERIORES — Faixa promocional editável
-- Rode uma vez no SQL Editor do Supabase caso o banco já exista.

alter table public.home_interiores_configuracoes_site_2026
  add column if not exists promo_enabled boolean not null default true;

alter table public.home_interiores_configuracoes_site_2026
  add column if not exists promo_messages jsonb not null default '["ATÉ 10% OFF À VISTA","FRETE GRÁTIS EM CONDIÇÕES ESPECIAIS","OFERTAS EM PEÇAS SELECIONADAS","CONDIÇÕES EXCLUSIVAS PELO WHATSAPP","NOVIDADES NO SHOWROOM TODA SEMANA"]'::jsonb;
