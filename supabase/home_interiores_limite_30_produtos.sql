-- HOME INTERIORES — limite máximo comercial de 30 produtos.
-- Rode este arquivo no SQL Editor do Supabase se o projeto já estava publicado antes desta versão.

create or replace function public.home_interiores_validar_limite_produtos_2026()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  total_produtos integer;
begin
  perform pg_advisory_xact_lock(hashtext('home_interiores_limite_30_produtos_2026'));

  select count(*) into total_produtos
  from public.home_interiores_catalogo_produtos_2026;

  if total_produtos >= 30 then
    raise exception 'Limite máximo de 30 produtos atingido. Exclua um produto para cadastrar outro.';
  end if;

  return new;
end;
$$;

drop trigger if exists home_interiores_limite_produtos_2026
on public.home_interiores_catalogo_produtos_2026;

create trigger home_interiores_limite_produtos_2026
before insert on public.home_interiores_catalogo_produtos_2026
for each row
execute function public.home_interiores_validar_limite_produtos_2026();
