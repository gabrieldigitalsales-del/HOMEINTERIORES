# Home Interiores — Final Completo

Site catálogo em React + Vite com painel administrativo em `/admin`.

## Acesso ao painel
- URL: `/admin`
- Senha de interface: `asd123`
- Não existe link ou menção ao painel na área pública.

## Painel
### Produtos
- adicionar, editar e remover
- múltiplas imagens por produto
- primeira imagem usada como capa
- categoria, descrição e preço opcional
- vendedor e WhatsApp específico
- destaque no catálogo

### Configurações do site
- upload/troca da imagem principal do hero
- título, subtítulo e texto pequeno do hero
- frase Essência Home
- imagem institucional
- Instagram
- WhatsApp geral
- localização
- prévia do hero em tempo real

## Mobile
O catálogo, modal do produto, menu, formulários e painel foram refinados para celular.

## Rodar localmente
```bash
npm install
npm run dev
```

## Supabase
O projeto funciona em modo local sem `.env`. Para persistência online, configure `.env` conforme `.env.example` e execute `supabase/home_interiores_setup.sql`.

Recursos usam nomes exclusivos:
- `home_interiores_catalogo_produtos_2026`
- `home_interiores_configuracoes_site_2026`
- `home_interiores_admins_2026`
- bucket `home-interiores-produtos-2026`

### Observação de segurança
A senha simples `asd123` é uma trava de interface conforme solicitado. Para uma publicação pública com escrita real no Supabase, o ideal é posteriormente validar a senha no servidor/Edge Function ou usar Supabase Auth. Não exponha uma `service_role` no frontend.
