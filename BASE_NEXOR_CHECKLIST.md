# BASE NEXOR — PADRÃO DE SITES 2026

Este projeto incorpora a base reutilizável para os próximos sites NEXOR. Adaptar identidade e necessidades de cada cliente, sem copiar conteúdo específico.

## UX / catálogo
- Header inteligente e menu mobile em tela cheia
- Busca instantânea e tolerante a acentos
- Favoritos + orçamento de múltiplos produtos
- Código automático de produto
- Status, preço opcional, preço anterior/promocional
- Destaques, novidades, ordenação, rascunho/publicado
- Relacionados manuais/automáticos
- Galeria multi-imagem, swipe, miniaturas e contador
- URL própria, compartilhamento e WhatsApp contextual
- Vitrine/showroom e CTA de disponibilidade
- Faixa promocional editável e programável
- Hero e conteúdo editáveis
- Duplicar produto, prévia e validação de imagens
- Compressão WebP no upload quando vantajosa
- Lazy loading, skeleton loading e animações discretas
- Voltar ao topo e responsividade mobile-first

## Produção / SEO
- 404 personalizada
- Meta title e description por rota
- Open Graph e Twitter card
- Favicon
- robots.txt
- sitemap.xml
- Política de Privacidade
- Termos de Uso
- Canonical por rota
- Preferência reduced-motion
- Estrutura pronta para analytics via dataLayer
- Segurança do admin por cookie HttpOnly em produção

## Antes de publicar
1. Trocar a senha padrão de admin no Vercel.
2. Definir HOME_INTERIORES_SESSION_SECRET forte.
3. Rodar supabase/home_interiores_setup.sql.
4. Ajustar domínio em robots.txt e sitemap.xml se necessário.
5. Preencher endereço, horário, Open Graph e contatos no Admin.
6. Inserir fotos reais, revisar preços/status e testar WhatsApp.
7. Testar desktop, Android e iPhone.


## Experiência premium e privacidade
- Banner de cookies com aceitar, recusar não essenciais e preferências granulares.
- Analytics condicionado ao consentimento do usuário.
- Preferências reabertas pelo rodapé.
- Toasts para ações de favoritos, compartilhamento e privacidade.
- Produtos vistos recentemente salvos por dispositivo.
- Compartilhamento nativo no mobile e fallback para copiar link.
- Busca instantânea com miniaturas.
- Estados vazios premium.
- Pré-carregamento da próxima imagem e fallback visual de imagem.
- Favoritos e histórico local por dispositivo, sem compartilhar dados entre visitantes.
