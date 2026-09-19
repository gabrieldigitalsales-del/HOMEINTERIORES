# Home Interiores — Pacote Comercial Premium

Esta versão adiciona uma nova camada comercial à BASE NEXOR:

- Comparação de até 3 produtos por dispositivo.
- Seleção para orçamento sem checkout, enviada por WhatsApp.
- Ficha técnica por produto: medidas, material, acabamento e cuidados.
- Prazo/disponibilidade editável.
- Variações de cores, tamanhos e tecidos/acabamentos.
- URL de vídeo por produto.
- Páginas automáticas de Novidades, Promoções e Pronta entrega.
- Indicadores no painel: visualizações, WhatsApp, favoritos, comparação e orçamento.
- Analytics interno respeita o consentimento de cookies de análise.

## Supabase
Rode novamente `supabase/home_interiores_setup.sql` no SQL Editor. Os comandos usam `add column if not exists` e `create table if not exists`, portanto atualizam a base existente.

## Localhost
No localhost os produtos, favoritos, comparação, orçamento e analytics de teste usam o armazenamento local do navegador.

## Produção
No Vercel, os indicadores globais dependem da nova tabela `home_interiores_eventos_2026` criada pelo SQL.
