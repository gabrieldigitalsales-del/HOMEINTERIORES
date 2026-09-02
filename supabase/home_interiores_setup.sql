-- HOME INTERIORES — estrutura com nomes exclusivos para evitar colisões.
-- Execute no SQL Editor do Supabase.

create table if not exists public.home_interiores_catalogo_produtos_2026 (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text default '',
  price text default '',
  image_url text default '',
  image_urls jsonb not null default '[]'::jsonb,
  seller_name text not null default 'Equipe Home Interiores',
  seller_whatsapp text not null,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Compatibilidade para instalações que já executaram uma versão anterior do catálogo.
alter table public.home_interiores_catalogo_produtos_2026
  add column if not exists image_urls jsonb not null default '[]'::jsonb;

update public.home_interiores_catalogo_produtos_2026
set image_urls = jsonb_build_array(image_url)
where image_url is not null and image_url <> '' and (image_urls is null or image_urls = '[]'::jsonb);

create table if not exists public.home_interiores_admins_2026 (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.home_interiores_catalogo_produtos_2026 enable row level security;
alter table public.home_interiores_admins_2026 enable row level security;

-- Desde 30/05/2026, novos projetos podem não expor tabelas automaticamente na Data API.
grant select on table public.home_interiores_catalogo_produtos_2026 to anon, authenticated;
grant insert, update, delete on table public.home_interiores_catalogo_produtos_2026 to authenticated;
grant select on table public.home_interiores_admins_2026 to authenticated;

drop policy if exists "home_interiores_public_read_2026" on public.home_interiores_catalogo_produtos_2026;
create policy "home_interiores_public_read_2026"
on public.home_interiores_catalogo_produtos_2026 for select
to anon, authenticated
using (true);

drop policy if exists "home_interiores_admin_write_2026" on public.home_interiores_catalogo_produtos_2026;
create policy "home_interiores_admin_write_2026"
on public.home_interiores_catalogo_produtos_2026 for all
to authenticated
using (exists (select 1 from public.home_interiores_admins_2026 a where a.user_id = (select auth.uid())))
with check (exists (select 1 from public.home_interiores_admins_2026 a where a.user_id = (select auth.uid())));

drop policy if exists "home_interiores_admin_self_read_2026" on public.home_interiores_admins_2026;
create policy "home_interiores_admin_self_read_2026"
on public.home_interiores_admins_2026 for select
to authenticated
using (user_id = (select auth.uid()));

insert into storage.buckets (id, name, public)
values ('home-interiores-produtos-2026','home-interiores-produtos-2026',true)
on conflict (id) do update set public=true;

drop policy if exists "home_interiores_public_images_read_2026" on storage.objects;
create policy "home_interiores_public_images_read_2026"
on storage.objects for select
to public
using (bucket_id = 'home-interiores-produtos-2026');

drop policy if exists "home_interiores_admin_images_insert_2026" on storage.objects;
create policy "home_interiores_admin_images_insert_2026"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'home-interiores-produtos-2026'
  and exists (select 1 from public.home_interiores_admins_2026 a where a.user_id = (select auth.uid()))
);

drop policy if exists "home_interiores_admin_images_update_2026" on storage.objects;
create policy "home_interiores_admin_images_update_2026"
on storage.objects for update
to authenticated
using (
  bucket_id = 'home-interiores-produtos-2026'
  and exists (select 1 from public.home_interiores_admins_2026 a where a.user_id = (select auth.uid()))
)
with check (
  bucket_id = 'home-interiores-produtos-2026'
  and exists (select 1 from public.home_interiores_admins_2026 a where a.user_id = (select auth.uid()))
);

drop policy if exists "home_interiores_admin_images_delete_2026" on storage.objects;
create policy "home_interiores_admin_images_delete_2026"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'home-interiores-produtos-2026'
  and exists (select 1 from public.home_interiores_admins_2026 a where a.user_id = (select auth.uid()))
);

-- Depois de criar seu usuário em Authentication > Users, substitua o UUID abaixo e rode:
-- insert into public.home_interiores_admins_2026 (user_id) values ('SEU-UUID-AQUI');

-- Configurações gerais editáveis do site (nome exclusivo Home Interiores)
create table if not exists public.home_interiores_configuracoes_site_2026 (
  id text primary key default 'principal',
  hero_image_url text not null default '',
  hero_kicker text not null default 'Sete Lagoas · Minas Gerais',
  hero_title text not null default 'Home Interiores',
  hero_subtitle text not null default 'Design, curadoria e excelência para espaços que traduzem a sua essência.',
  essence_text text not null default 'Design que acolhe. Curadoria que inspira. Excelência que permanece.',
  instagram_url text not null default 'https://www.instagram.com/homeinterioresoficial/',
  whatsapp_general text not null default '5531990813008',
  location text not null default 'Sete Lagoas - MG',
  institutional_image_url text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.home_interiores_configuracoes_site_2026 enable row level security;
grant select on table public.home_interiores_configuracoes_site_2026 to anon, authenticated;
grant insert, update on table public.home_interiores_configuracoes_site_2026 to authenticated;

drop policy if exists "home_interiores_settings_public_read_2026" on public.home_interiores_configuracoes_site_2026;
create policy "home_interiores_settings_public_read_2026"
on public.home_interiores_configuracoes_site_2026 for select
to anon, authenticated using (true);

drop policy if exists "home_interiores_settings_admin_write_2026" on public.home_interiores_configuracoes_site_2026;
create policy "home_interiores_settings_admin_write_2026"
on public.home_interiores_configuracoes_site_2026 for all
to authenticated
using (exists (select 1 from public.home_interiores_admins_2026 a where a.user_id = (select auth.uid())))
with check (exists (select 1 from public.home_interiores_admins_2026 a where a.user_id = (select auth.uid())));

insert into public.home_interiores_configuracoes_site_2026 (
  id, hero_image_url, institutional_image_url
) values (
  'principal',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=88',
  'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=88'
) on conflict (id) do nothing;


-- LIMITE COMERCIAL DO CATÁLOGO — máximo de 30 produtos no total.
-- A trava abaixo protege o limite também no banco, inclusive se houver tentativa de inserir fora do painel.
create or replace function public.home_interiores_validar_limite_produtos_2026()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  total_produtos integer;
begin
  -- Serializa tentativas simultâneas de cadastro para não ultrapassar 30 por concorrência.
  perform pg_advisory_xact_lock(hashtext('home_interiores_limite_30_produtos_2026'));

  select count(*) into total_produtos
  from public.home_interiores_catalogo_produtos_2026;

  if total_produtos >= 30 then
    raise exception 'Limite máximo de 30 produtos atingido. Exclua um produto para cadastrar outro.';
  end if;

  return new;
end;
$$;

drop trigger if exists home_interiores_limite_produtos_2026 on public.home_interiores_catalogo_produtos_2026;
create trigger home_interiores_limite_produtos_2026
before insert on public.home_interiores_catalogo_produtos_2026
for each row
execute function public.home_interiores_validar_limite_produtos_2026();
