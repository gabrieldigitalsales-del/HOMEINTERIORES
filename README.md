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

## Limite comercial de produtos
Esta versão limita o catálogo a **30 produtos no total**.

- O painel exibe `X de 30 produtos utilizados`.
- Ao atingir 30, o botão de novo produto é bloqueado.
- Editar produtos existentes continua permitido.
- Para cadastrar o 31º, é necessário excluir um produto existente.
- Para instalações Supabase já publicadas, rode `supabase/home_interiores_limite_30_produtos.sql` no SQL Editor para ativar também a trava no banco.


## Vercel + painel /admin (configuração obrigatória)

O catálogo público usa a chave publicável do Supabase somente para leitura. As alterações feitas pelo painel passam por funções server-side do Vercel, mantendo o RLS habilitado.

No Vercel, abra **Project > Settings > Environment Variables** e configure:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
HOME_INTERIORES_ADMIN_PASSWORD=asd123
HOME_INTERIORES_SESSION_SECRET=uma-chave-aleatoria-longa-com-32-ou-mais-caracteres
```

**Segurança:** `SUPABASE_SERVICE_ROLE_KEY` é privada e deve existir somente no Vercel. Nunca crie `VITE_SUPABASE_SERVICE_ROLE_KEY` e nunca coloque essa chave no código do frontend.

Depois de salvar as variáveis, faça um novo deploy. Entre em `/admin` com a senha `asd123`. O login cria uma sessão segura HttpOnly por até 8 horas.

Não desative o RLS e não crie policy de escrita para `anon`. O site público deve continuar somente leitura.

### Limite comercial

O sistema mantém o limite máximo de 30 produtos. A validação é feita no painel e também na API antes de qualquer novo cadastro.
