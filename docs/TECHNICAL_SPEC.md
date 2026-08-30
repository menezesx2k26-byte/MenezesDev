# MenezesDev — Especificação técnica final

**Fase:** 8 — especificação técnica
**Status:** contrato fechado para orientar a Fase 9 e a implementação da Fase 10
**Data de verificação:** 2026-08-22
**Escopo:** arquitetura, rotas, dados, estilos, comportamento, SEO, hosting, segurança e quality tooling
**Natureza:** documentação; nenhum scaffolding ou código de frontend foi criado nesta fase

## Precedência do contrato

Esta especificação transforma em decisões técnicas os contratos canônicos já fechados:

1. copy e oferta aprovadas;
2. docs/BRAND_GUIDE.md e docs/DEMO_CASES.md;
3. docs/wireframes/ para composição;
4. docs/interactions/ para comportamento;
5. assets existentes e seus sidecars;
6. este documento para implementação técnica.

Se uma implementação não puder cumprir simultaneamente esses contratos, ela não deve improvisar. A incompatibilidade precisa ser registrada em docs/context/DECISIONS.md antes da mudança.

## Não objetivos

Esta fase não autoriza inicializar Astro, criar package.json ou src/, instalar pacotes, implementar componentes, editar assets, gerar imagens ou screenshots, configurar Cloudflare, analytics ou formulários reais, fazer deploy ou iniciar a Fase 9.

# 1. Arquitetura base

## Baseline fechado

| Camada | Decisão |
|---|---|
| Framework | Astro 7, geração estática |
| Linguagem | TypeScript strict |
| CSS | Tailwind CSS 4 via plugin Vite oficial e CSS-first |
| Package manager | pnpm |
| Runtime de build | Node.js 24 LTS |
| Repositório/deploy source | GitHub |
| Hosting inicial | Cloudflare Pages |
| Ícones de interface | Lucide por lucide-astro |
| Marcação | HTML semântico |
| Estilo | CSS-first; utilidades Tailwind sobre tokens |
| Cliente | JavaScript vanilla + ilhas React seletivas |

O projeto continua static-first e multi-page: Astro entrega HTML estático por padrão e não existe SPA shell ou client router. React 19 é permitido somente em ilhas isoladas via `@astrojs/react`, com hidratação explícita e escopo local. Vue, Svelte, Preact, Solid e equivalentes não fazem parte do baseline.

A ordem obrigatória para interações é:

1. HTML nativo;
2. CSS;
3. TypeScript/JavaScript vanilla pequeno;
4. ilha React quando uma interação ou motion de alto valor justificar o runtime local;
5. outra dependência externa apenas após justificativa objetiva e novo registro de decisão.

Navbar, menu modal, accordion, trilho editorial e formulário demonstrativo permanecem Astro/vanilla enquanto essa solução continuar mais simples. React não é autorização para reescrever componentes existentes por conveniência.

## Configuração Astro futura

A Fase 10 deve configurar explicitamente:

    output: "static"
    outDir: "dist"
    build.format: "file"
    trailingSlash: "never"

O formato file mantém as 16 rotas sem barra final, como documentado nas Fases 6 e 7. Links internos e canonicals devem usar caminhos sem extensão e sem barra final, exceto a raiz.

# 2. Cloudflare

## Arquitetura inicial

Cloudflare Pages recebe somente o diretório estático dist. O baseline não contém:

- @astrojs/cloudflare;
- Pages Functions;
- functions/;
- _worker.js;
- Wrangler;
- bindings;
- runtime server-side;
- endpoint ou middleware de edge.

GitHub é a origem do deploy. A branch main é produção. Pull requests e branches permitidas podem gerar previews.

Configuração futura do projeto Pages:

| Campo | Valor |
|---|---|
| Git provider | GitHub |
| Production branch | main |
| Build command | pnpm build |
| Build output directory | dist |
| Root directory | raiz do repositório |
| Build image | v3 |
| NODE_VERSION | 24.19.0 |
| PNPM_VERSION | 11.22.0 |

Cloudflare Pages v3 não deve inferir versões pelos campos engines/packageManager. NODE_VERSION e PNPM_VERSION devem ser configurados também no dashboard, com os mesmos valores versionados no repositório.

## Quando migrar

Pages permanece até surgir necessidade concreta de API, formulário server-side, autenticação, D1, KV, R2 dinâmico, server rendering, middleware dependente de runtime ou integração secreta no servidor.

Nessa situação, comparar Pages Functions e Cloudflare Workers conforme a função necessária. Não instalar adapter nem migrar preventivamente.

# 3. Package manager e runtime

## Versões baseline verificadas

| Item | Versão fechada em 2026-08-22 |
|---|---:|
| Node.js | 24.19.0 LTS |
| pnpm | 11.22.0 |
| Astro | 7.2.4 |
| tailwindcss | 4.3.3 |
| @tailwindcss/vite | 4.3.3 |
| @astrojs/sitemap | 3.7.3 |
| lucide-astro | 0.556.0 |
| @astrojs/check | 0.9.10 |
| TypeScript | 6.0.3 |
| Prettier | 3.9.6 |
| prettier-plugin-astro | 0.14.1 |

Essas versões são o snapshot de implementação. TypeScript fica na linha 6.0.3 porque o `@astrojs/check` 0.9.10 declara compatibilidade com TypeScript 5 e 6; a linha 7.0.2 atual não deve ser instalada enquanto esse peer range não for atualizado e validado. A Fase 10 deve instalar o conjunto com versões exatas e gerar pnpm-lock.yaml. Uma atualização patch/minor antes do scaffolding só é permitida após verificar compatibilidade nas fontes oficiais e registrar o novo snapshot. Mudança de major exige decisão nova.

O futuro package.json deve declarar:

    "packageManager": "pnpm@11.22.0"
    "engines": {
      "node": ">=24.19.0 <25",
      "pnpm": "11.22.0"
    }

Um arquivo .node-version deve conter 24.19.0. Nenhum comando de build depende de Astro, Tailwind, pnpm, Prettier ou TypeScript instalados globalmente.

## Scripts canônicos futuros

| Script | Responsabilidade |
|---|---|
| dev | astro dev |
| check | astro check |
| build:site | astro build |
| check:routes | verificar dist, as 16 rotas e links/âncoras internos |
| build | check → build:site → check:routes |
| preview | astro preview |
| format | Prettier write |
| format:check | Prettier check |
| validate | format:check → build |

O verificador de rotas deve usar Node.js e o manifesto tipado do projeto; não adicionar uma biblioteca apenas para percorrer arquivos HTML.

# 4. TypeScript

tsconfig.json deve estender astro/tsconfigs/strictest. Se strictest produzir incompatibilidade real com uma API necessária, a exceção precisa ser pontual e documentada; não reduzir o projeto inteiro para base.

Regras:

- noImplicitAny e strictNullChecks permanecem ativos;
- usar import type quando aplicável;
- não usar any indiscriminadamente;
- não usar ts-ignore como solução normal;
- não usar casts para ocultar erro de modelagem;
- validar dados externos ou opcionais antes de convertê-los;
- usar readonly e satisfies para catálogos estáticos.

Tipos obrigatórios:

- NavigationItem;
- RouteDefinition;
- LinkDefinition;
- Project;
- Plan;
- FAQItem;
- PageMetadata;
- ImageMetadata;
- DemoConfig;
- FormFieldConfig;
- SocialLink;
- SiteConfig.

Conteúdo repetível deve nascer em dados tipados. Componentes recebem dados; não duplicam objetos editoriais em vários arquivos.

# 5. Tailwind

Tailwind 4 entra exclusivamente por tailwindcss + @tailwindcss/vite em astro.config.mjs. O CSS global começa com:

    @import "tailwindcss";

Não usar @astrojs/tailwind, tailwind.config.js legado nem configuração copiada de Tailwind 3.

A diretiva @theme define os tokens globais que precisam gerar utilidades: breakpoints, tipografia, spacing compartilhado, radii, z-index e motion. Valores específicos dos demos ficam em escopos próprios.

Breakpoints:

| Token | Valor | Função |
|---|---:|---|
| sm | 40rem / 640 px | ajustes de mobile largo |
| md | 48rem / 768 px | início do tablet/duas colunas |
| lg | 64rem / 1024 px | composição desktop |
| xl | 80rem / 1280 px | containers amplos |
| 2xl | 90rem / 1440 px | viewport de referência dos wireframes |

O layout é mobile-first. 320 e 390 px são viewports de validação, não novos breakpoints. Gutters responsivos usam clamp e tokens.

Classes arbitrárias são aceitáveis somente para uma exceção local comprovada. Se o mesmo valor aparecer duas vezes ou representar uma regra de identidade, ele vira token.

# 6. CSS e design tokens

## Camadas

Ordem conceitual:

1. reset e defaults mínimos;
2. tokens primitivos globais;
3. tokens semânticos compartilhados;
4. tokens MenezesDev;
5. tokens M47;
6. tokens Tavola 27;
7. tokens Prismae;
8. utilidades Tailwind;
9. estilos locais de componentes/seções.

Arquivos conceituais futuros:

    src/styles/global.css
    src/styles/tokens.css
    src/styles/themes/menezesdev.css
    src/styles/themes/m47.css
    src/styles/themes/tavola27.css
    src/styles/themes/prismae.css

Cada layout aplica um atributo data-theme na raiz. Tokens semânticos como fundo, superfície, texto, borda, accent, container, gutter e fonte apontam para valores do tema ativo. Isso permite infraestrutura comum sem transformar os projetos em skins: composição, escala, ritmo, seções e seleção de mídia continuam separados por projeto.

## Tokens obrigatórios

- cores de fundo, superfície, texto, texto secundário, borda e accent;
- containers de 1240 px, 1280 px e 1320 px conforme o wireframe;
- gutters 16, 20, 24, 32, 40 e 48 px conforme projeto/faixa;
- escala de spacing baseada em 4 e 8 px;
- famílias, pesos, tamanhos, line-height e tracking;
- radii 12, 16, 20, 24, 28 e pill;
- z-index: base 0, sticky 20, backdrop 40, modal 50, skip/focus 60;
- motion descrito na seção 15.

MenezesDev não injeta roxo em M47, Tavola ou Prismae. Os demos não importam o arquivo de tema da MenezesDev.

# 7. Fontes

## Estratégia

Usar a Fonts API estável do Astro 7 com provider local. Os WOFF2 licenciados devem ser versionados em src/assets/fonts/ junto das licenças correspondentes. Não há request runtime para Google Fonts, Fontsource ou outro CDN.

Preferir arquivos variáveis quando a família oficial os fornecer:

| Projeto | Display | Pesos usados | Corpo/UI | Pesos usados |
|---|---|---|---|---|
| MenezesDev | Manrope | 600–800 | Inter | 400–600 |
| M47 | Archivo | 700–800 | Inter | 400–600 |
| Tavola 27 | Cormorant Garamond | 500–600 | Manrope | 400–600 |
| Prismae | Plus Jakarta Sans | 600–700 | Inter | 400–600 |

Configurar font-display: swap. Não carregar itálicos ou pesos que não aparecem nos contratos.

Fallbacks:

- Manrope: Manrope, Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
- Inter: Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
- Archivo: Archivo, Inter, system-ui, sans-serif;
- Cormorant Garamond: Cormorant Garamond, Georgia, Times New Roman, serif;
- Plus Jakarta Sans: Plus Jakarta Sans, Inter, system-ui, sans-serif.

Preload apenas o arquivo da fonte display que pinta o H1 acima da dobra em cada layout. Inter/Manrope de corpo e fontes não usadas na rota carregam normalmente. A Fase 9 pode remover um preload se a medição mostrar disputa com o LCP.

# 8. Ícones

Lucide por lucide-astro é a única biblioteca de ícones genéricos. SVGs de logo, mark e identidade continuam sendo assets próprios.

Regras:

- ícone decorativo: aria-hidden e focusable false;
- ícone redundante dentro de botão com texto: oculto da árvore acessível;
- botão somente com ícone: nome acessível explícito;
- stroke e tamanho vêm de tokens;
- não misturar outro pack;
- não usar Lucide como logo ou ilustração de marca.

# 9. Estrutura de rotas

## As 16 rotas publicáveis

| # | Projeto | Rota |
|---:|---|---|
| 1 | MenezesDev | / |
| 2 | Case | /projetos/m47 |
| 3 | Case | /projetos/tavola-27 |
| 4 | Case | /projetos/prismae |
| 5 | M47 | /demo/m47 |
| 6 | Tavola 27 | /demo/tavola27 |
| 7 | Tavola 27 | /demo/tavola27/menu |
| 8 | Tavola 27 | /demo/tavola27/storia |
| 9 | Tavola 27 | /demo/tavola27/gallery |
| 10 | Tavola 27 | /demo/tavola27/contact |
| 11 | Prismae | /demo/prismae |
| 12 | Prismae | /demo/prismae/solutions |
| 13 | Prismae | /demo/prismae/solutions/strategy |
| 14 | Prismae | /demo/prismae/solutions/processes |
| 15 | Prismae | /demo/prismae/solutions/indicators |
| 16 | Prismae | /demo/prismae/contact |

Âncoras documentadas não contam como rotas físicas. /demo/prismae/about não possui arquivo, link público, redirect nem placeholder até existir copy aprovada.

## 404

Criar futuramente uma página Astro que gere dist/404.html. Ela deve:

- retornar o comportamento 404 nativo do Pages;
- usar title e robots noindex;
- informar que a página não foi encontrada;
- oferecer link para /;
- não redirecionar automaticamente;
- não sugerir rota inexistente;
- preservar header/footer MenezesDev em versão simples.

A presença do 404.html superior impede o fallback SPA do Pages.

# 10. Componentização

Estrutura conceitual:

    src/
      components/
      config/
      data/
      layouts/
      pages/
      scripts/
      sections/
        menezesdev/
        m47/
        tavola27/
        prismae/
      styles/
      types/
      utils/

Compartilhar somente semântica e comportamento realmente iguais.

Componentes compartilháveis:

- Button ou Action, preservando diferença entre link e botão;
- Container;
- SkipLink;
- SiteHeader;
- MobileMenu;
- Footer;
- ProjectCard;
- Accordion;
- SEO;
- Icon.

Layouts:

- BaseLayout para documento, metadata, skip link e estilos mínimos;
- MenezesDevLayout;
- M47Layout;
- Tavola27Layout;
- PrismaeLayout.

Seções M47, Tavola e Prismae permanecem em diretórios próprios. Não criar Hero universal, Section universal, Card universal ou prop variant extensa para composições visualmente diferentes. Infraestrutura pode ser comum; aparência e ritmo não.

# 11. Conteúdo

Copy aprovada é fonte de verdade. Dados editoriais devem ser tipados por domínio:

    src/data/menezesdev/
    src/data/projects.ts
    src/data/m47.ts
    src/data/tavola27.ts
    src/data/prismae.ts

Não inventar depoimentos, clientes, empresas, equipe, história, métricas, resultados, endereço, telefone, horário, CNPJ, prêmio ou certificação.

A copy expandida de /demo/prismae/about continua ausente. A rota não deve nascer a partir de texto mínimo, Lorem Ipsum, IA ou conteúdo derivado de metodologia.

# 12. Imagens

Usar exclusivamente assets existentes e aprovados para a função definida. Os WebPs sob public/assets são servidos diretamente, sem recompressão automática.

Todo elemento img recebe width e height reais, aspect-ratio compatível, object-fit e object-position documentados. Isso reserva espaço e evita layout shift.

Regras de carregamento:

- hero/LCP: loading eager, fetchpriority high e nunca lazy;
- abaixo da dobra: loading lazy e decoding async;
- preload de imagem somente se a Fase 9 demonstrar benefício além de fetchpriority;
- alt informativo vem do sidecar;
- repetição puramente decorativa usa alt vazio;
- nenhum texto HTML entra no bitmap.

## Assets raster fechados

| Projeto | Arquivo | Dimensões | Função contratada |
|---|---|---:|---|
| M47 | m47-hero.webp | 1536×960 | hero da demo e capa do case |
| M47 | m47-gallery-01.webp | 1200×1500 | corte masculino em andamento |
| M47 | m47-gallery-02.webp | 1200×1500 | acabamento de barba |
| M47 | m47-gallery-03.webp | 1536×1024 | detalhe de cabelo/acabamento |
| M47 | m47-gallery-04.webp | 1536×1024 | ferramentas profissionais em uso |
| M47 | m47-gallery-05.webp | 1536×960 | ambiente/interior |
| M47 | m47-gallery-06.webp | 1200×1500 | retrato editorial pós-atendimento |
| Tavola 27 | tavola27-hero.webp | 1536×960 | hero da demo e capa do case |
| Tavola 27 | tavola27-food-01.webp | 1200×1500 | prato editorial 01 |
| Tavola 27 | tavola27-food-02.webp | 1536×1024 | prato editorial 02 |
| Tavola 27 | tavola27-food-03.webp | 1200×1500 | prato editorial 03 |
| Tavola 27 | tavola27-food-04.webp | 1536×1024 | prato editorial 04 |
| Tavola 27 | tavola27-space-01.webp | 1536×960 | ambiente editorial horizontal |
| Tavola 27 | tavola27-space-02.webp | 1536×1024 | ambiente complementar horizontal |
| Tavola 27 | tavola27-space-03.webp | 1200×1500 | ambiente complementar vertical |
| Tavola 27 | tavola27-detail-01.webp | 1536×1024 | detalhe de preparo/ingrediente |
| Tavola 27 | tavola27-detail-02.webp | 1536×1024 | detalhe de louça/textura |

No M47 mobile, m47-hero.webp usa inicialmente object-position: 68% center e só pode variar dentro de 65–70%.

O diretório public/assets/menezesdev contém apenas .gitkeep. O arquivo menezesdev-brand-kit.zip contém PNGs aprovados para prototipagem e implementação inicial. A Fase 10 pode materializá-los byte por byte no caminho público previsto, com verificação de hash; não pode regenerar, retocar ou fingir que existe SVG mestre.

# 13. SVG

Usar sem rasterização:

- m47-logo.svg — viewBox 0 0 560 120;
- m47-mark.svg — viewBox 0 0 220 120;
- tavola27-logo.svg — viewBox 0 0 620 120;
- prismae-logo.svg — viewBox 0 0 640 120;
- prismae-hero-graphic.svg — viewBox 0 0 960 720;
- prismae-process.svg — viewBox 0 0 1280 360.

Preservar viewBox, proporção e geometria. Logos dentro de links usam o nome acessível do link; o desenho pode ser aria-hidden para não duplicar o nome.

O hero graphic Prismae recebe descrição equivalente em texto. No mobile, prismae-process.svg fica visualmente ausente e as quatro etapas são HTML semântico. Não comprimir o SVG horizontal até ficar ilegível.

# 14. JavaScript

Astro entrega zero JavaScript por padrão. Client directives só podem aparecer em ilhas React documentadas; páginas passivas continuam sem runtime React.

Módulos vanilla permitidos:

- controle do dialog do menu mobile;
- foco, hash, scroll offset e seção ativa;
- accordion/plan disclosure;
- teclado do trilho Tavola no mobile;
- formulário demonstrativo Prismae;
- anúncio de estados locais M47/Tavola.

Cada módulo carrega apenas nas rotas que o usam. M47 não recebe JS de galeria; Tavola não recebe JS de formulário; demos não recebem analytics de negócio.

Orçamento arquitetural inicial:

- nenhum runtime global de framework ou client router;
- React só carrega nas rotas que montam ilhas e somente após a diretiva de hidratação escolhida;
- páginas passivas: zero JS próprio sempre que possível;
- módulos compartilhados pequenos e tree-shaken;
- revisão obrigatória se uma rota ultrapassar aproximadamente 35 kB gzip de JS próprio ou se uma ilha aumentar o LCP/TBT além dos targets.

Esse valor orienta a arquitetura; os limites de aceite finais pertencem à Fase 9.

O menu usa dialog/showModal como primitiva nativa. O navegador fornece modalidade e inércia; TypeScript complementa clique fora, scroll lock, foco inicial, fechamento após navegação e restauração de foco.

O accordion usa button + região associada porque o contrato exige aria-expanded, múltiplos painéis e navegação por setas/Home/End. details/summary só pode substituir essa estrutura se cumprir integralmente o contrato em todos os navegadores-alvo.

# 15. Motion

Motion continua CSS-first. Em ilhas React aprovadas, `motion` é o runtime padrão para animações que exigem estado, layout ou sequência difícil de manter em CSS/vanilla.

| Token | Duração | Easing |
|---|---:|---|
| active | 80–120 ms | saída rápida |
| control | 140–180 ms | cubic-bezier(0.2, 0, 0, 1) |
| navigation | 200–260 ms | cubic-bezier(0.2, 0, 0, 1) |
| disclosure | 220–300 ms | cubic-bezier(0.2, 0, 0, 1) |
| section | 320–420 ms | desaceleração |
| media | 180–240 ms | cubic-bezier(0.2, 0, 0, 1) |

Limites: pressão até 2 px, hover até 4 px, entrada até 16 px, imagem clicável no máximo 1.02 e stagger no máximo 60 ms em grupos curtos.

Não usar GSAP, Lenis, scroll hijacking, autoplay contínuo ou loops decorativos no baseline. `motion` pode ser usado apenas dentro de ilhas React aprovadas. Parallax, partículas, contadores e efeitos contínuos exigem justificativa visual, medição de performance e fallback de reduced motion.

`prefers-reduced-motion` remove smooth scroll, translate, stagger, zoom e animações não essenciais. Foco, erro, sucesso e estado atual permanecem visíveis. Ilhas React devem consultar a preferência de redução de movimento e renderizar um estado equivalente sem animação.

Entradas por scroll são progressive enhancement: conteúdo começa visível, a ilha pode animá-lo quando entra no viewport e nunca esconde H1, hero, CTA ou erro antes da hidratação.

# 16. Formulário Prismae

A interface é funcional localmente, mas nunca transmite dados.

Contrato técnico:

- form sem endpoint, action externa, fetch, XHR ou Astro Action;
- campos e validações exatamente como docs/interactions/PRISMAE.md;
- botão demonstrativo type=button, controlado por TypeScript;
- Enter em campo de linha única chama a mesma rotina local;
- Enter na textarea cria nova linha;
- validação usa APIs nativas mais mensagens próprias aprovadas;
- nenhum localStorage, sessionStorage, IndexedDB, cookie ou analytics;
- valores existem apenas na memória do DOM até sucesso/reset;
- loading local máximo aproximado de 400 ms;
- sucesso substitui o formulário e move foco para o heading aprovado.

Usar type=button é deliberado: se o script falhar, o navegador não faz submit GET/POST acidental com dados pessoais. A interface sem JS permanece visível e explicitamente demonstrativa, mas não envia.

Anti-spam não é necessário porque não há transmissão. Um formulário real futuro exige nova arquitetura server-side, validação no servidor e rate limiting; Cloudflare Turnstile pode ser avaliado nessa ocasião, sem compromisso preventivo.

# 17. WhatsApp MenezesDev

Há um único ponto central futuro:

    siteConfig.commercial.whatsappUrl

O valor inicial é null até aprovação. A mensagem canônica permanece:

    Olá! Vi o site da MenezesDev e gostaria de solicitar um orçamento para um site.

Todas as ações comerciais recebem o mesmo href derivado da configuração. O helper valida protocolo HTTPS, host oficial do WhatsApp, presença da mensagem aprovada e target de nova aba com rel noopener noreferrer.

Política:

- desenvolvimento: aviso explícito no console e marcador de configuração somente em modo DEV;
- preview: CTA não pode parecer operacional se o destino estiver ausente;
- produção/main: build falha antes de gerar dist se a URL aprovada estiver ausente ou inválida;
- nunca usar #, link genérico, número fictício, disabled silencioso ou fallback para outro contato.

A Fase 9 transforma essa verificação em critério de aceite.

# 18. Demos fictícios

M47, Tavola 27 e Prismae não usam contato externo.

- M47: botões locais exibem mensagens demonstrativas; sem WhatsApp, mapa ou booking.
- Tavola 27: reserva é âncora/status local; sem formulário, calendário ou dados.
- Prismae: validação e sucesso locais; sem request ou persistência.

Os layouts de demo exibem permanentemente a identificação de conceito fictício. Não reutilizam URL comercial, social links, schema de negócio local ou analytics separado.

# 19. SEO

## Implementação

Um componente SEO leve recebe PageMetadata tipado e renderiza:

- title;
- meta description;
- canonical absoluto;
- robots;
- Open Graph;
- Twitter card;
- favicon/apple-touch-icon;
- lang pt-BR no html;
- link para sitemap quando aplicável.

Astro config usa site: https://menezesdev.com.br. O domínio deve ser validado no gate de lançamento da Fase 9, mas nenhum componente repete a string.

Metadata da Home usa literalmente:

- title: MenezesDev | Criação de Sites Profissionais
- description: Sites profissionais, rápidos e responsivos para empresas e negócios. Landing pages e sites institucionais a partir de R$600.
- OG title: MenezesDev — Sites que impulsionam negócios.
- OG description: Sites modernos, rápidos e profissionais para empresas que querem fortalecer sua presença digital.

## Política final de indexação

| Rotas | Política |
|---|---|
| / | index, follow |
| /projetos/m47 | index, follow |
| /projetos/tavola-27 | index, follow |
| /projetos/prismae | index, follow |
| /demo/** | noindex, nofollow, noarchive |
| /404 | noindex, nofollow |
| previews/pages.dev | noindex |

As demos ficam fora do sitemap. robots.txt permite crawling para que o noindex seja lido e aponta para sitemap-index.xml.

Usar @astrojs/sitemap com filter que inclui somente a Home e as três páginas de case. Não listar demos, 404 ou rota Prismae About.

Aplicar robots das demos em meta e também X-Robots-Tag por regra /demo/* em public/_headers. Previews já recebem X-Robots-Tag: noindex do Pages; a build não deve removê-lo.

Open Graph não autoriza asset novo. M47 e Tavola podem usar seus heroes existentes nas páginas de case. Prismae e a Home usam card Twitter summary sem imagem até existir raster aprovado adequado. Não publicar og:image quebrado nem rasterizar SVG silenciosamente.

# 20. Dados estruturados

Na Home, JSON-LD pode conter WebSite e Organization com apenas nome, URL, logo aprovado quando materializado, descrição factual e sameAs somente para URLs reais aprovadas.

Páginas de case podem usar CreativeWork ou WebSite como conceito demonstrativo, com creator MenezesDev e descrição explícita de projeto fictício. Não declarar que M47, Tavola 27 ou Prismae são clientes.

Proibido:

- LocalBusiness para demos;
- endereço, telefone ou localização inventada;
- Review, AggregateRating ou avaliação;
- número de clientes, faturamento ou resultado;
- founder/person sem bio aprovada;
- employee, award ou credential inexistente.

JSON-LD é gerado de dados tipados e testado como JSON válido. Não copiar objetos manualmente entre páginas.

# 21. Analytics

Baseline: Cloudflare Web Analytics, sem Google Analytics e sem biblioteca npm.

Estratégia:

- ativação automática no edge do Pages, não snippet versionado no layout;
- regra de hostname permite somente o domínio canônico de produção;
- regra de exclusão desativa /demo/*;
- pages.dev, previews, desenvolvimento e localhost não recebem beacon;
- desativar qualquer segunda injeção manual para evitar duplicidade;
- não criar sites/propriedades separados para M47, Tavola 27 ou Prismae;
- não definir eventos de reserva, booking ou lead fictícios.

O CSP permite o beacon oficial somente quando injetado: script de static.cloudflareinsights.com/beacon.min.js e envio RUM no endpoint /cdn-cgi/rum do próprio domínio.

Cloudflare Web Analytics mede pageviews e performance; os números não representam métricas dos negócios fictícios.

# 22. Privacidade

Baseline de coleta mínima:

- nenhum formulário persistente;
- nenhum pixel de publicidade;
- nenhum fingerprinting;
- nenhum tracker fora do Web Analytics;
- nenhum dado Prismae em analytics;
- nenhuma query string comercial coletada deliberadamente.

A documentação oficial atual informa que o beacon RUM não usa cookies, localStorage, sessionStorage ou IndexedDB e descarta o IP no data center de entrada. Isso é fato técnico, não conclusão jurídica.

Não afirmar automaticamente que consentimento é dispensado. A Fase 9 deve revisar domínio, público, jurisdição, política de privacidade e configuração efetiva. Se a revisão exigir consentimento, o analytics permanece desativado até existir mecanismo aprovado.

# 23. Acessibilidade

Implementação futura obrigatória:

- lang pt-BR;
- skip link como primeiro foco;
- landmarks header, nav, main e footer;
- um H1 por página e hierarquia sem saltos artificiais;
- foco visível com contraste e sem corte;
- ordem DOM igual à leitura mobile;
- links e botões semanticamente corretos;
- touch targets mínimos de 44×44 px, primários preferencialmente 48 px;
- menu modal por dialog, Escape, foco inicial, trap nativo, scroll lock e restauração;
- accordions com aria-expanded, aria-controls e teclado completo;
- aria-current page/location apenas em estado real;
- labels persistentes, required, aria-invalid, aria-describedby e erros próximos;
- regiões status/live para feedback demonstrativo;
- contraste validado por tema e estado;
- reduced motion;
- alt text/alt vazio conforme função;
- SVG e ícones sem duplicação de nome.

HTML nativo vem antes de ARIA. Não adicionar role quando o elemento nativo já oferece a semântica.

# 24. Performance

Estratégia:

- SSG e HTML estático;
- CSS enxuto e dividido por layout quando isso reduzir transferência;
- zero framework cliente;
- módulos JS por rota;
- WebPs existentes;
- fontes WOFF2 locais e pesos mínimos;
- width/height e aspect-ratio;
- lazy loading abaixo da dobra;
- fetchpriority high no LCP;
- preload seletivo de uma fonte display;
- sem carrossel pesado ou vídeo autoplay;
- sem recompressão/build de imagens já aprovadas;
- sem cache rules customizadas gerais no Pages antes de evidência.

Provável LCP:

| Home | Elemento provável |
|---|---|
| MenezesDev | plano dominante com m47-hero.webp no mosaico do hero |
| M47 | m47-hero.webp |
| Tavola 27 | tavola27-hero.webp |
| Prismae | prismae-hero-graphic.svg ou H1, a confirmar por medição |

Nas páginas de case, a capa correspondente é o candidato LCP. A Fase 9 define thresholds finais e mede desktop/mobile; esta fase não inventa nota Lighthouse.

# 25. Segurança

Nenhum segredo chega ao frontend. O baseline não precisa de API key, token privado, cookie de sessão, banco ou secret Cloudflare.

Astro 7 usa security.csp para gerar hashes de scripts/estilos do build e acrescentar:

- default-src self;
- base-uri self;
- object-src none;
- form-action self;
- img-src self e data quando estritamente necessário;
- font-src self;
- connect-src self;
- permissão explícita do beacon Cloudflare em produção.

Como frame-ancestors não é confiável em CSP por meta, public/_headers aplica:

- Content-Security-Policy: frame-ancestors none;
- X-Frame-Options: DENY;
- X-Content-Type-Options: nosniff;
- Referrer-Policy: strict-origin-when-cross-origin;
- Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=().

Aplicar também X-Robots-Tag nas demos. Testar CSP primeiro em preview/report-only quando necessário, depois enforcing. Não adicionar unsafe-inline como atalho. Alterações exigidas pelo beacon devem permitir apenas a origem/arquivo oficial.

Links externos usam HTTPS, target nova aba e rel noopener noreferrer. Nenhum HTML do usuário é renderizado; não usar set:html para copy ou campos.

# 26. Git e deploy

Fluxo:

    feature branch/PR quando apropriado
      → validação automática
      → revisão
      → merge em main
      → Cloudflare Pages production

GitHub permanece fonte de verdade. main é protegida contra force push. Previews de PR são públicos somente se isso for aceitável; quando necessário, proteger previews por Cloudflare Access.

CI futura:

1. checkout;
2. Node 24.19.0;
3. pnpm 11.22.0;
4. pnpm install --frozen-lockfile;
5. pnpm validate.

Cloudflare Pages executa pnpm build e publica dist. Nenhum deploy local direto é o caminho normal.

# 27. Quality tooling

Ferramentas mínimas:

- astro check para Astro/TypeScript;
- astro build para produção;
- Prettier + prettier-plugin-astro;
- script local de rotas, links e âncoras;
- inspeção do dist para 16 rotas, 404, sitemap, robots, metadata e ausência de About;
- auditoria manual/automatizada de acessibilidade na Fase 9;
- E2E somente para fluxos críticos definidos na Fase 9.

Não adicionar ESLint inicialmente. Com Astro sem JSX/framework, TypeScript strict, astro check e Prettier cobrem os sinais essenciais sem duplicação. Reavaliar se a implementação revelar classes de erro não detectadas.

Fluxos candidatos a E2E da Fase 9:

- menu mobile/foco/Escape;
- âncoras e seção ativa;
- FAQ e disclosures;
- M47/Tavola status local;
- Prismae inválido → loading local → sucesso;
- noindex das demos;
- bloqueio de produção sem WhatsApp.

# 28. Configuração central

src/config/site.ts será a fonte única para:

- nome MenezesDev;
- tagline;
- base URL;
- WhatsApp;
- mensagem comercial;
- social links;
- metadata padrão;
- locale;
- copyright;
- ambiente de deploy.

src/data/routes.ts será a fonte única das 16 rotas. Navegação importa o manifesto, não repete strings.

Cada DemoConfig contém nome, prefixo, aviso fictício, tema, navegação, metadata e ações locais permitidas. Nenhum config de demo aceita contato externo.

PageMetadata sobrescreve apenas o necessário sobre os defaults. Social links com URL null não são renderizados. A configuração central é tipada e validada no build.

# 29. Pendências explícitas

Não resolver por invenção:

1. URL real aprovada do WhatsApp MenezesDev;
2. copy expandida de /demo/prismae/about;
3. screenshots reais dos demos, somente depois da implementação;
4. qualquer integração backend futura.

Pendências operacionais para o gate da Fase 9:

- confirmar controle/TLS do domínio canônico antes de publicar;
- conferir materialização byte a byte do brand kit aprovado para favicon/logo;
- decidir se um raster social MenezesDev será formalmente aprovado; sem ele, não emitir og:image quebrado.

Nenhuma pendência permite placeholder público, rota vazia, CTA enganoso ou conteúdo inventado.

# 30. Decision records

## DR-01 — Astro static

- **DECISÃO:** Astro 7 com output static e formato file continua sendo a arquitetura de entrega; ilhas React seletivas não alteram o modelo de rotas.
- **MOTIVAÇÃO:** 16 rotas conhecidas, conteúdo editorial e necessidade de preservar HTML pré-renderizado sem impedir interações premium pontuais.
- **ALTERNATIVAS DESCARTADAS:** SPA, Next.js e SSR como baseline.
- **IMPACTO:** HTML pré-renderizado, hidratação localizada e rotas verificáveis no dist.
- **REVISITAR QUANDO:** uma rota realmente exigir renderização sob demanda ou estado complexo compartilhado.

## DR-02 — Cloudflare Pages

- **DECISÃO:** Git integration no Pages, main em produção, dist como output e previews de PR.
- **MOTIVAÇÃO:** hosting estático cobre todo o escopo atual.
- **ALTERNATIVAS DESCARTADAS:** Workers/Pages Functions preventivos, Direct Upload e adapter Cloudflare.
- **IMPACTO:** sem runtime, binding, endpoint ou segredo.
- **REVISITAR QUANDO:** surgir API, auth, storage dinâmico, SSR ou middleware runtime.

## DR-03 — Ausência de framework cliente global

- **DECISÃO:** manter Astro/HTML/CSS/TypeScript vanilla como padrão e proibir SPA/client router; decisão original de proibir qualquer React foi superada em 29/08/2026 pela necessidade de ilhas visuais seletivas.
- **MOTIVAÇÃO:** dialog, accordion, scroll, status e formulário local continuam pequenos, mas o portfólio precisa demonstrar motion/interações premium sem migrar a aplicação inteira.
- **ALTERNATIVAS DESCARTADAS:** reescrever o site em React/Next.js ou hidratar páginas completas.
- **IMPACTO:** React e Motion entram apenas em ilhas documentadas, com hidratação explícita e orçamento de bundle.
- **REVISITAR QUANDO:** ilhas começarem a dominar a página ou estado compartilhado exigir outra arquitetura.

## DR-09 — React islands e Motion seletivos

- **DECISÃO:** `@astrojs/react`, React/ReactDOM e `motion` fazem parte do baseline técnico, mas só carregam em ilhas explicitamente montadas.
- **MOTIVAÇÃO:** permitir componentes visuais sofisticados mantendo output estático, SEO, acessibilidade e performance como defaults.
- **DIRETIVAS:** preferir `client:visible` e `client:idle`; `client:load` exige interação crítica acima da dobra.
- **RESTRIÇÕES:** sem client router, sem shadcn/GSAP/Lenis no baseline e sem conversão automática de componentes Astro existentes.
- **REVISITAR QUANDO:** bundle, LCP/TBT ou manutenção mostrarem custo maior que o ganho visual.

## DR-04 — Tailwind 4 CSS-first

- **DECISÃO:** tailwindcss + @tailwindcss/vite, tokens por @theme e CSS variables escopadas.
- **MOTIVAÇÃO:** integração oficial atual e alinhamento com design tokens.
- **ALTERNATIVAS DESCARTADAS:** @astrojs/tailwind legado, Tailwind 3 e classes arbitrárias como sistema.
- **IMPACTO:** configuração vive no CSS; temas permanecem isolados.
- **REVISITAR QUANDO:** plugin oficial mudar de forma incompatível em novo major.

## DR-05 — Fontes locais

- **DECISÃO:** WOFF2 self-hosted pela Fonts API local do Astro.
- **MOTIVAÇÃO:** privacidade, reprodutibilidade e controle de pesos/preload.
- **ALTERNATIVAS DESCARTADAS:** requests runtime ao Google Fonts e carregar todos os pesos.
- **IMPACTO:** arquivos/licenças entram no repositório e cada layout carrega apenas o necessário.
- **REVISITAR QUANDO:** licença, subset ou medição justificar outra distribuição.

## DR-06 — Cloudflare Web Analytics

- **DECISÃO:** injeção de edge apenas no hostname produtivo, excluindo /demo/*.
- **MOTIVAÇÃO:** medição leve sem GA e sem métricas de negócios fictícios.
- **ALTERNATIVAS DESCARTADAS:** Google Analytics, propriedade por demo e tracker em dev/preview.
- **IMPACTO:** regras Cloudflare e CSP precisam ser validados; nenhuma dependência npm.
- **REVISITAR QUANDO:** requisitos legais, consentimento ou eventos de produto mudarem.

## DR-07 — Demos noindex

- **DECISÃO:** todos os caminhos /demo/** recebem noindex, nofollow, noarchive e ficam fora do sitemap.
- **MOTIVAÇÃO:** impedir interpretação das empresas fictícias como negócios reais.
- **ALTERNATIVAS DESCARTADAS:** indexação normal e bloqueio apenas em robots.txt.
- **IMPACTO:** páginas de case continuam indexáveis e apresentam os conceitos com transparência.
- **REVISITAR QUANDO:** nunca para fingir negócios reais; somente se a estratégia editorial mudar com revisão explícita.

## DR-08 — Nenhum backend inicial

- **DECISÃO:** nenhum endpoint, banco, persistência ou submit de rede.
- **MOTIVAÇÃO:** WhatsApp é link real; demais ações são demonstrativas locais.
- **ALTERNATIVAS DESCARTADAS:** backend vazio, Pages Function preventiva e anti-spam sem formulário real.
- **IMPACTO:** Pages estático basta e não há segredo.
- **REVISITAR QUANDO:** formulário real, booking, reserva ou integração for aprovado.

## Matriz de validação da Fase 8

| Verificação | Resultado documental |
|---|---|
| Wireframes confrontados | grids, containers, mobile, crops e assets preservados |
| Interactions confrontadas | menu, CTA, accordion, galerias, status e formulário cobertos |
| DEMO_CASES confrontado | identidades, conteúdo fictício e transparência preservados |
| Rotas | 16 publicáveis; About reservado e ausente |
| Assets | todos os WebPs/SVGs existentes mapeados; nenhum novo asset exigido silenciosamente |
| Static-first | todas as rotas e ações funcionam sem backend |
| Dados fictícios | nenhum fluxo transmite ou persiste dados |
| Segredos | nenhum necessário no baseline |
| Cloudflare Pages | suficiente; adapter/Functions/Workers ausentes |
| Dependências | somente as de função concreta listadas na seção 3 |

## Fontes oficiais verificadas

- [Astro — versão atual e política de upgrade](https://docs.astro.build/en/upgrade-astro/)
- [Astro — configuração static, CSP, output e build](https://docs.astro.build/en/reference/configuration-reference/)
- [Astro — rotas e arquivos estáticos](https://docs.astro.build/en/guides/routing/)
- [Astro — TypeScript](https://docs.astro.build/en/guides/typescript/)
- [Astro — fontes locais](https://docs.astro.build/en/guides/fonts/)
- [Astro — sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [npm — Astro](https://www.npmjs.com/package/astro)
- [npm — astro check e peer range de TypeScript](https://www.npmjs.com/package/@astrojs/check)
- [npm — TypeScript](https://www.npmjs.com/package/typescript)
- [npm — pnpm](https://www.npmjs.com/package/pnpm)
- [Tailwind — integração com Astro](https://tailwindcss.com/docs/installation/framework-guides/astro)
- [Tailwind — breakpoints e mobile-first](https://tailwindcss.com/docs/responsive-design)
- [Node.js — releases LTS](https://nodejs.org/en/about/previous-releases)
- [Cloudflare Pages — Astro](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [Cloudflare Pages — build e variáveis](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Cloudflare Pages — build image e versões](https://developers.cloudflare.com/pages/configuration/build-image/)
- [Cloudflare Pages — headers](https://developers.cloudflare.com/pages/configuration/headers/)
- [Cloudflare Pages — previews](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Cloudflare Pages — 404 e serving](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Cloudflare Web Analytics — configuração](https://developers.cloudflare.com/web-analytics/get-started/)
- [Cloudflare Web Analytics — regras](https://developers.cloudflare.com/web-analytics/configuration-options/rules/)
- [Cloudflare Web Analytics — coleta e privacidade técnica](https://developers.cloudflare.com/speed/observatory/rum-beacon/)

As consultas foram feitas em 2026-08-22. APIs, versões e políticas sensíveis devem ser reconfirmadas se a Fase 10 ocorrer após mudança relevante de major ou plataforma.
