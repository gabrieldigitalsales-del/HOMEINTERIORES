-- HOME INTERIORES — referência do hardening aplicado em 22/09/2026
-- Este arquivo documenta a configuração atual. Não executar cegamente em outro projeto.

-- Princípio: catálogo público somente leitura; escrita administrativa somente via API server-side.
revoke all on public.home_interiores_admins_2026 from anon, authenticated;
revoke all on public.home_interiores_catalogo_produtos_2026 from anon, authenticated;
revoke all on public.home_interiores_categorias_2026 from anon, authenticated;
revoke all on public.home_interiores_configuracoes_site_2026 from anon, authenticated;

grant select on public.home_interiores_catalogo_produtos_2026 to anon, authenticated;
grant select on public.home_interiores_categorias_2026 to anon, authenticated;
grant select on public.home_interiores_configuracoes_site_2026 to anon, authenticated;

-- Uploads são gerados pelo backend com signed upload URL.
update storage.buckets
set file_size_limit=10485760,
    allowed_mime_types=array['image/jpeg','image/png','image/webp','image/gif']::text[]
where id='home-interiores-produtos-2026';

-- Login rate limit: tabela protegida por RLS, acessada apenas pela service role.
alter table public.home_interiores_admin_login_attempts_2026 enable row level security;
revoke all on public.home_interiores_admin_login_attempts_2026 from public, anon, authenticated;
