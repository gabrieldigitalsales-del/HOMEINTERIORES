-- Categorias editáveis do catálogo Home Interiores
create table if not exists public.home_interiores_categorias_2026 (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists home_interiores_categorias_2026_name_unique
on public.home_interiores_categorias_2026 (lower(name));

alter table public.home_interiores_categorias_2026 enable row level security;
grant select on table public.home_interiores_categorias_2026 to anon, authenticated;

drop policy if exists "home_interiores_categorias_public_read_2026" on public.home_interiores_categorias_2026;
create policy "home_interiores_categorias_public_read_2026"
on public.home_interiores_categorias_2026 for select
to anon, authenticated using (true);

insert into public.home_interiores_categorias_2026 (name, position) values
  ('Mesas',1),
  ('Sofás',2),
  ('Poltronas',3),
  ('Aparadores',4),
  ('Cadeiras',5),
  ('Decoração',6)
on conflict do nothing;
