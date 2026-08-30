# MenezesDev — Critérios de aceite e release gates

**Fase:** 9 — critérios de aceite e release gates
**Status:** contrato canônico para implementação e auditoria da Fase 10
**Data:** 2026-08-22
**Escopo:** PASS/FAIL objetivo para build, conteúdo, composição, comportamento, qualidade e produção
**Natureza:** documentação; nenhum frontend, pacote, asset, deploy ou screenshot foi criado nesta fase

## Precedência

Este documento converte em testes os contratos já aprovados. Ele não substitui:

1. `HOME_COPY.md — MenezesDev.md` e `SERVICES_AND_PRICING.md — MenezesDev.md` para copy e oferta;
2. `docs/BRAND_GUIDE.md` e `docs/DEMO_CASES.md` para identidade e conteúdo dos demos;
3. `docs/wireframes/` para composição;
4. `docs/interactions/` para comportamento;
5. `docs/TECHNICAL_SPEC.md` para arquitetura;
6. os assets e sidecars existentes para mídia.

Quando um critério falhar por incompatibilidade real entre contratos, a implementação não escolhe silenciosamente um lado: registra a contradição em `docs/context/DECISIONS.md` antes de alterar o baseline.

# 1. Classificação dos critérios

| Classe | Significado | Estado permitido |
|---|---|---|
| HARD GATE | Falha impede `IMPLEMENTATION DONE`. | PASS ou FAIL |
| RELEASE GATE | Pode haver implementação concluída, mas produção fica bloqueada. | PASS, FAIL ou BLOCKED com pendência nomeada |
| TARGET | Meta medida; resultado abaixo exige investigação e justificativa, mas não equivale automaticamente a falha técnica. | PASS ou MISS documentado |

Cada linha da matriz da seção 29 contém requisito, severidade, escopo, método e resultado esperado. Os IDs são estáveis; não renumerar critérios existentes. Novos critérios recebem o próximo número livre da área.

## Protocolo de evidência

- **Build limpo:** checkout novo do commit candidato, sem `node_modules`, `dist` ou cache anterior.
- **Build de produção:** resultado de `pnpm install --frozen-lockfile` e `pnpm validate` com os exit codes preservados.
- **Preview local:** conteúdo de `dist` servido como site estático, sem modo de desenvolvimento.
- **Preview Cloudflare:** deploy de branch/PR separado de produção, usado para headers, redirects, TLS e `noindex` de preview.
- **Produção canônica:** domínio real confirmado, usado somente para release gates dependentes do ambiente.
- **Evidência de navegador:** rota, viewport, commit, resultado, console e Network registrados no relatório de auditoria.
- **PASS:** resultado observado coincide integralmente com o esperado.
- **FAIL:** qualquer parte objetiva do esperado não ocorre.
- **BLOCKED:** permitido apenas em release gate dependente de informação/ambiente externo ainda não aprovado.
- **TARGET MISS:** registrar página, viewport, três medições, mediana, ambiente, causa investigada e decisão de correção ou aceitação.

Não silenciar regra, excluir página ou alterar o ambiente apenas para obter verde.

# 2. Build e reprodutibilidade

Os critérios `BUILD-001` a `BUILD-006` exigem um checkout limpo capaz de instalar, verificar e gerar `dist` sem segredo, ferramenta global ou dependência não registrada. O comando canônico de aceitação é:

    pnpm install --frozen-lockfile
    pnpm validate

O relatório deve incluir versões efetivas de Node.js e pnpm e confirmar o snapshot de `docs/TECHNICAL_SPEC.md`.

# 3. Rotas

## Registro canônico

| Rota | Indexação | Origem da copy | Status esperado |
|---|---|---|---|
| `/` | index, follow | `HOME_COPY.md — MenezesDev.md` | HTTP 200 |
| `/projetos/m47` | index, follow | Home Copy §§9 e 53; Demo Cases §§3–17 e 53–55 | HTTP 200 |
| `/projetos/tavola-27` | index, follow | Home Copy §§10 e 53; Demo Cases §§18–34 e 53–55 | HTTP 200 |
| `/projetos/prismae` | index, follow | Home Copy §§11 e 53; Demo Cases §§35–51 e 53–55 | HTTP 200 |
| `/demo/m47` | noindex, nofollow, noarchive | Demo Cases §§3–15; wireframe/interações M47 | HTTP 200 |
| `/demo/tavola27` | noindex, nofollow, noarchive | Demo Cases §§18–32; wireframe/interações Tavola | HTTP 200 |
| `/demo/tavola27/menu` | noindex, nofollow, noarchive | Demo Cases §27; wireframe Tavola §11 | HTTP 200 |
| `/demo/tavola27/storia` | noindex, nofollow, noarchive | Demo Cases §§26 e 28; wireframe Tavola §11 | HTTP 200 |
| `/demo/tavola27/gallery` | noindex, nofollow, noarchive | Demo Cases §29; wireframe Tavola §11 | HTTP 200 |
| `/demo/tavola27/contact` | noindex, nofollow, noarchive | Demo Cases §§30–31; wireframe/interações Tavola | HTTP 200 |
| `/demo/prismae` | noindex, nofollow, noarchive | Demo Cases §§35–48; wireframe/interações Prismae | HTTP 200 |
| `/demo/prismae/solutions` | noindex, nofollow, noarchive | Demo Cases §§42–48; wireframe Prismae §11 | HTTP 200 |
| `/demo/prismae/solutions/strategy` | noindex, nofollow, noarchive | Demo Cases §§43–44; wireframe Prismae §11 | HTTP 200 |
| `/demo/prismae/solutions/processes` | noindex, nofollow, noarchive | Demo Cases §§43–44; wireframe Prismae §11 | HTTP 200 |
| `/demo/prismae/solutions/indicators` | noindex, nofollow, noarchive | Demo Cases §§43–45; wireframe Prismae §11 | HTTP 200 |
| `/demo/prismae/contact` | noindex, nofollow, noarchive | Demo Cases §§46–47; interações Prismae §7 | HTTP 200 |
| qualquer URL desconhecida | noindex, nofollow | `docs/TECHNICAL_SPEC.md` §9 | HTTP 404 com página própria |
| `/demo/prismae/about` | não publicável | copy expandida pendente | HTTP 404; sem link, redirect ou sitemap |

As 16 primeiras linhas são as rotas canônicas publicáveis. A página 404 e a ausência deliberada de About são verificações adicionais, não novas rotas de produto.

# 4. Copy e conteúdo

Pontuação, quebra de linha e ênfase responsiva podem mudar sem alterar palavras-chave, preços, promessas ou sentido. Qualquer reescrita, resumo ou nova alegação é FAIL sem aprovação registrada.

Preços públicos obrigatórios:

| Plano | Linguagem aceita |
|---|---|
| Essencial | `A partir de R$600` |
| Profissional | `A partir de R$950` |
| Negócio | `A partir de R$1.500` |
| Personalizado | `A partir de R$2.500` ou redação equivalente aprovada com “a partir de” |

Cada demo exibe de forma persistente no footer: `Conceito demonstrativo criado pela MenezesDev. Esta empresa é fictícia.` Variações adicionais como `Projeto demonstrativo MenezesDev.` não substituem essa frase obrigatória.

# 5. Assets

## Inventário fechado de 23 assets

| # | Projeto | Asset | Função mínima auditável |
|---:|---|---|---|
| 1 | M47 | `m47-hero.webp` | hero 16:10 e capa do case; crop mobile em 65–70% |
| 2 | M47 | `m47-gallery-01.webp` | corte em andamento |
| 3 | M47 | `m47-gallery-02.webp` | acabamento de barba |
| 4 | M47 | `m47-gallery-03.webp` | cabelo/acabamento |
| 5 | M47 | `m47-gallery-04.webp` | ferramentas em uso |
| 6 | M47 | `m47-gallery-05.webp` | ambiente |
| 7 | M47 | `m47-gallery-06.webp` | retrato/sobre |
| 8 | M47 | `m47-logo.svg` | header/footer desktop |
| 9 | M47 | `m47-mark.svg` | header mobile/assinatura |
| 10 | Tavola 27 | `tavola27-hero.webp` | hero e capa do case |
| 11 | Tavola 27 | `tavola27-food-01.webp` | Tagliatelle/menu/galeria |
| 12 | Tavola 27 | `tavola27-food-02.webp` | Ravioli/menu/galeria |
| 13 | Tavola 27 | `tavola27-food-03.webp` | Tiramisù/menu/galeria |
| 14 | Tavola 27 | `tavola27-food-04.webp` | interlúdio/galeria sem prato inventado |
| 15 | Tavola 27 | `tavola27-space-01.webp` | história/ambiente |
| 16 | Tavola 27 | `tavola27-space-02.webp` | cozinha/galeria |
| 17 | Tavola 27 | `tavola27-space-03.webp` | ambiente/storia/contact |
| 18 | Tavola 27 | `tavola27-detail-01.webp` | preparação/menu/storia |
| 19 | Tavola 27 | `tavola27-detail-02.webp` | manifesto/materialidade |
| 20 | Tavola 27 | `tavola27-logo.svg` | header/footer |
| 21 | Prismae | `prismae-hero-graphic.svg` | hero e visão geral de soluções |
| 22 | Prismae | `prismae-process.svg` | metodologia desktop |
| 23 | Prismae | `prismae-logo.svg` | header/footer |

Para rasters, calcular SHA-256 e comparar com `sha256` do sidecar `.meta.json`. Para SVGs, comparar bytes/diff com os commits canônicos da Fase 5 registrados em `docs/context/STATE.md`. Alteração intencional exige decisão e nova aprovação; diferença silenciosa é FAIL.

# 6. Responsividade

## Matriz mínima de viewports

| Largura | Altura de referência | Uso |
|---:|---:|---|
| 320 px | 568 px | mobile estreito |
| 360 px | 800 px | mobile comum |
| 390 px | 844 px | mobile de referência |
| 768 px | 1024 px | tablet |
| 1024 px | 768 px | transição desktop/tablet |
| 1280 px | 800 px | desktop compacto |
| 1440 px | 900 px | desktop de referência |
| 844 px | 390 px | landscape mobile básico |

Validar as 16 rotas em 390, 768 e 1440 px. Nas demais larguras, validar `/`, as três páginas de case e as três homes de demo; páginas internas podem usar amostragem por shell, desde que cada variação Tavola/Prismae apareça ao menos uma vez.

# 7. Navegação

O teste mobile inclui abertura e fechamento por todos os mecanismos, foco inicial, Tab/Shift+Tab, Escape, clique externo, inércia do background, scroll lock, restauração de foco e navegação por link. O teste de âncoras confirma offset do header e foco no heading.

# 8. CTAs

## Catálogo dos 17 rótulos distintos

Cada ocorrência de um rótulo deve seguir o comportamento do contexto; a contagem 17/17 não significa testar apenas uma ocorrência por texto.

| # | Rótulo | Projeto/contexto | Destino ou resultado permitido |
|---:|---|---|---|
| 1 | `Solicitar orçamento` | MenezesDev | URL real central do WhatsApp; release bloqueado se ausente |
| 2 | `Falar pelo WhatsApp` | MenezesDev | mesma URL real; menu fecha antes de nova aba |
| 3 | `Quero meu site` | MenezesDev hero | mesma URL real |
| 4 | `Ver projetos` | MenezesDev hero | `/#projetos` |
| 5 | `Ver projeto` | cards/cases | card → `/projetos/<slug>`; case → `/demo/<case>` |
| 6 | `Quero começar` | plano Essencial | URL real central do WhatsApp |
| 7 | `Quero gerar mais contatos` | plano Negócio | URL real central do WhatsApp; sem promessa de resultado |
| 8 | `Contar sobre meu projeto` | Personalizado | URL real central do WhatsApp |
| 9 | `Ver planos` | MenezesDev | `/#planos` |
| 10 | `Agendar horário` | M47 | botão local; status demonstrativo, sem URL |
| 11 | `Ver serviços` | M47 | `#servicos` |
| 12 | `Abrir localização` | M47 | botão local; nenhum mapa real |
| 13 | `Agendar pelo WhatsApp` | M47 | botão local; nenhum WhatsApp real |
| 14 | `Conhecer o menu` | Tavola 27 | `/demo/tavola27/menu` |
| 15 | `Reservar mesa` | Tavola 27 | seção/status demonstrativo local |
| 16 | `Solicitar diagnóstico` | Prismae | `/demo/prismae/contact#diagnostico` ou processamento local no formulário |
| 17 | `Conhecer soluções` | Prismae | `/demo/prismae/solutions` |

Cards Estratégia, Processos e Indicadores são links de navegação, não novos rótulos de CTA da contagem 17.

# 9. WhatsApp MenezesDev

É um `RELEASE GATE` crítico. O teste negativo obrigatório executa a build de release com `siteConfig.commercial.whatsappUrl = null`: se CTAs comerciais seriam publicados, a build deve falhar. Desenvolvimento e build técnico sem publicação podem funcionar com diagnóstico explícito.

O teste positivo exige URL aprovada, HTTPS, host oficial do WhatsApp e a mensagem literal: `Olá! Vi o site da MenezesDev e gostaria de solicitar um orçamento para um site.` Nenhum número será inventado para executar o teste.

# 10. FAQ

As onze perguntas e respostas da Home começam fechadas, permitem múltiplos painéis abertos e preservam a ordem aprovada. Mouse, toque, Enter, Space, setas, Home e End são auditados; `aria-expanded`, `aria-controls`, foco e indicador visual precisam acompanhar o estado.

# 11. Formulário Prismae

O teste usa os seis campos e limites de `docs/interactions/PRISMAE.md`. A aba Network deve ser limpa imediatamente antes da submissão e filtrada por Fetch/XHR, Document, Beacon e WebSocket. Após submit válido, não pode existir request contendo campos, valores ou ação de formulário.

Também verificar ausência de dados em cookies, `localStorage`, `sessionStorage` e IndexedDB antes e depois do fluxo. Requests normais de asset iniciados por navegação não contam como transmissão do formulário, mas qualquer payload de lead é FAIL.

# 12. Acessibilidade

Alvo de conformidade: WCAG 2.2 AA. A auditoria automática deve produzir zero violações `critical` e zero `serious`; toda ocorrência precisa ser investigada, inclusive as de menor severidade.

Os valores normativos usados são os da [WCAG 2.2](https://www.w3.org/TR/WCAG22/): 4,5:1 para texto normal, 3:1 para texto grande e 24×24 CSS px como mínimo de alvo no nível AA, observadas as exceções formais. O projeto adota o contrato mais forte de 44×44 CSS px para controles móveis e 48 px preferenciais nos controles primários.

Automação não substitui teclado, foco, reduced motion, zoom/reflow, leitura de labels/erros e inspeção da ordem do DOM.

# 13. Contraste e touch

Medir todas as combinações de texto/superfície e estados default, hover, focus, active, invalid e disabled usados. Texto normal deve atingir 4,5:1; texto grande, 3:1; limites/ícones/indicadores necessários e foco, 3:1 contra a cor adjacente quando o critério WCAG se aplicar.

O alvo de 44×44 CSS px é HARD GATE do projeto para controles móveis. Links inline dentro de parágrafos seguem a exceção normativa de alvo inline, mas precisam de espaçamento, contraste e foco utilizáveis.

# 14. Motion

Testar uma vez com preferência normal e outra com `prefers-reduced-motion: reduce`. No modo reduzido, remover translate, stagger, smooth scroll, zoom e movimento de disclosure; estado, foco, erro e sucesso continuam perceptíveis.

# 15. Console e runtime

Percorrer as 16 rotas no build de produção. Erros de extensão/navegador só podem ser excluídos quando reproduzidos fora do projeto ou identificados por origem externa; registrar a exclusão. Erros, rejeições, 404 de assets, hydration errors e warnings recorrentes da aplicação são FAIL.

# 16. Links

O crawler do `dist` verifica hrefs, rotas, arquivos e fragmentos. Links internos usam o mesmo tab; WhatsApp é a única saída comercial prevista e usa nova aba com proteção. Nenhum `#` vazio, `javascript:`, URL fictícia ou âncora sem `id` é permitido.

# 17. SEO

As quatro rotas indexáveis são `/` e `/projetos/*`. As doze rotas `/demo/**` ficam fora do sitemap e recebem `noindex, nofollow, noarchive`. Previews recebem `noindex` por header/plataforma.

O target agregado de SEO do Lighthouse aplica-se somente às quatro rotas indexáveis. Aplicá-lo às demos seria contraditório, pois a auditoria penaliza deliberadamente páginas bloqueadas de indexação. Nas demos, o PASS vem dos gates explícitos de robots, canonical, metadata social segura e ausência de dados estruturados enganosos.

# 18. HTML e semântica

Usar link para navegação, button para ação, listas/tabelas nativas e `dialog`/controles nativos quando cumprem o contrato. `div`/`span` clicável no lugar de controle nativo é FAIL. ARIA complementa estado real e não substitui semântica disponível.

# 19. Performance

Executar Lighthouse mobile em build de produção ou preview comparável. Para as sete páginas principais (`/`, três `/projetos/*` e três homes de demo), executar três rodadas e usar a mediana. Registrar versão do Lighthouse, hardware/runner, throttling, commit e URL.

Targets:

- Performance ≥ 90;
- Accessibility ≥ 95;
- Best Practices ≥ 95;
- SEO ≥ 95 somente nas quatro rotas indexáveis;
- LCP ≤ 2,5 s;
- CLS ≤ 0,10;
- TBT ≤ 200 ms.

Segundo a documentação oficial do [Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/), 90–100 é a faixa “Good”; os scores variam com ambiente e distribuição. Por isso são TARGETS, enquanto lazy loading, dimensões, ausência de runtime pesado e JS necessário são HARD GATES.

# 20. JavaScript

Auditar bundles por rota. Páginas passivas devem tender a zero JS próprio; menu, foco, FAQ/disclosures, trilho Tavola, estados locais, formulário Prismae e ilhas visuais documentadas são domínios aprovados. React só é permitido em ilhas com hidratação explícita; SPA/client router, hidratação global ou dependência cliente pesada sem decisão continuam FAIL.

# 21. Fontes

Inspecionar Network e CSS computado em cada identidade. Somente WOFF2 locais, pesos aprovados e famílias necessárias à rota podem carregar. Requests a Google Fonts, Fontsource/CDN ou preload sem uso acima da dobra são FAIL.

# 22. Privacidade

Não há publicidade, fingerprinting ou armazenamento de lead. Cloudflare Web Analytics só pode existir no hostname canônico de produção, nas rotas reais MenezesDev/cases, nunca em `/demo/**`, localhost, desenvolvimento ou previews.

A conclusão sobre consentimento não é inventada: antes de ativar analytics, o release report registra a revisão de domínio, público, jurisdição, política e configuração. Se houver exigência de consentimento ainda não implementada, analytics permanece desligado e o release gate fica bloqueado.

# 23. Segurança

Verificar repositório, `dist`, source maps, HTML, JS e configurações por padrões de segredo. Headers mínimos: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, política contra framing e CSP compatível. O teste de CSP navega as rotas e confirma zero bloqueio indevido de fontes, assets ou analytics legítimo.

# 24. Cloudflare e deploy

Release gates são verificados no painel/configuração e por requests reais: GitHub como origem, `main` como produção, `pnpm build`, output `dist`, previews separados, domínio canônico, TLS válido, redirect de host quando necessário e previews não indexáveis. Workers, Functions, `_worker.js`, bindings ou adapter Cloudflare são FAIL sem decisão nova.

# 25. Brand fidelity

A auditoria lado a lado usa `/`, `/demo/m47`, `/demo/tavola27` e `/demo/prismae` em 390 e 1440 px. Não se aceita “profissional” como conclusão isolada: validar tokens, famílias, composição, proporção de mídia, densidade, ritmo e elementos proibidos de cada identidade.

- MenezesDev: dark-first, neutros dominantes, gradiente violeta-magenta controlado, Manrope/Inter.
- M47: preto/quente/dourado fosco, fotografia compacta, Archivo/Inter, sem gradiente colorido.
- Tavola 27: creme/verde/vinho, editorial fotográfico pausado, Cormorant Garamond/Manrope.
- Prismae: claro, grid/dados/cards, verde petróleo/accent, Plus Jakarta Sans/Inter, sem fotografia de preenchimento.

# 26. Wireframe fidelity

Comparar DOM e renderização com a ordem, hierarquia, grid, funções de asset, reordenação e simplificações mobile da Fase 6. Alturas são alvos flexíveis; diferença numérica isolada não falha. Alterar ordem essencial, remover seção/copy, trocar função de asset ou replicar o mesmo template entre demos é FAIL sem decisão.

# 27. Interaction fidelity

Executar os estados e fluxos da Fase 7. Remover interação por conveniência, trocar ação local por externa ou adicionar modal/lightbox/carrossel/efeito complexo não aprovado é FAIL.

# 28. Screenshots e mockups

Screenshots não bloqueiam início nem conclusão da implementação. Só podem ser capturados depois que a rota real funcionar, em desktop/mobile/full page conforme o case. Nenhum screenshot gerado por IA, mockup de UI fictícia ou frame inventado pode ser apresentado como implementação real.

# 29. Matriz de testes

As tabelas abaixo são a matriz executável. `Todas` significa as 16 rotas; `principais` significa `/`, três cases e três homes de demo.

## Build

| ID | Área | Critério | Severidade | Páginas | Viewport | Método | Resultado esperado |
|---|---|---|---|---|---|---|---|
| BUILD-001 | Build | Lockfile e versões fixadas | HARD GATE | repositório | n/a | Inspecionar `pnpm-lock.yaml`, `packageManager`, engines e `.node-version`. | Lock versionado; Node/pnpm coincidem com Technical Spec. |
| BUILD-002 | Build | Instalação reproduzível | HARD GATE | repositório | n/a | Checkout limpo; `pnpm install --frozen-lockfile`. | Exit 0; lockfile não muda. |
| BUILD-003 | Build | TypeScript strict e Astro check | HARD GATE | repositório | n/a | Inspecionar `tsconfig`; executar `pnpm check`. | `strictest`; zero erros e nenhum ignore estrutural. |
| BUILD-004 | Build | Build canônico | HARD GATE | todas | n/a | Executar `pnpm build`. | Exit 0; sem rota obrigatória falhando. |
| BUILD-005 | Build | Saída estática completa | HARD GATE | todas | n/a | Inspecionar `dist`, manifesto de rotas e 404. | `dist` contém 16 rotas, assets, sitemap/robots e `404.html`. |
| BUILD-006 | Build | Baseline autônomo e documentado | HARD GATE | repositório | n/a | Auditar scripts, CI, imports, secrets e dependências contra Technical Spec/Decisions. | Sem ferramenta global, segredo ou dependência não aprovada; desvio tem decisão registrada. |

## Rotas

| ID | Área | Critério | Severidade | Páginas | Viewport | Método | Resultado esperado |
|---|---|---|---|---|---|---|---|
| ROUTE-001 | Rotas | Dezesseis rotas canônicas | HARD GATE | todas | n/a | Crawler HTTP/`dist` conforme registro da seção 3. | 16/16 retornam 200 e conteúdo correto. |
| ROUTE-002 | Rotas | Links e fragmentos internos | HARD GATE | todas | n/a | Extrair `href`; resolver rota/arquivo e `id`. | Zero destino interno inexistente. |
| ROUTE-003 | Rotas | Ausência de rota contraditória | HARD GATE | todas | n/a | Comparar output com manifesto tipado e contratos. | Nenhuma rota inventada ou alias contraditório. |
| ROUTE-004 | Rotas | Prismae About ausente | HARD GATE | `/demo/prismae/about` | n/a | Request, sitemap, navegação e `dist`. | Retorna 404; sem arquivo, link, redirect ou sitemap. |
| ROUTE-005 | Rotas | Fallback 404 | HARD GATE | URL inexistente | 390 e 1440 | Request de slug aleatório e inspeção visual. | HTTP 404 real, `noindex`, Home link e sem redirect automático. |

## Conteúdo

| ID | Área | Critério | Severidade | Páginas | Viewport | Método | Resultado esperado |
|---|---|---|---|---|---|---|---|
| CONTENT-001 | Copy | Copy institucional e hierarquia | HARD GATE | `/` e cases | 390 e 1440 | Diff textual/DOM contra Home Copy e wireframe. | Conteúdo integral e sentido preservados; só quebras/pontuação mínimas. |
| CONTENT-002 | Copy | Oferta e preços | HARD GATE | `/` e cases | todas | Buscar preços, “a partir de”, planos e ressalvas. | R$600, R$950, R$1.500 e R$2.500 conforme contratos; sem preço absoluto enganoso. |
| CONTENT-003 | Integridade | Sem slogans/depoimentos/clientes inventados | HARD GATE | todas | todas | Revisão textual e busca por seções/nomes não aprovados. | Nenhum slogan genérico, depoimento ou cliente fictício apresentado como real. |
| CONTENT-004 | Integridade | Sem métricas/resultados/credenciais inventados | HARD GATE | todas | todas | Revisar copy, gráficos, JSON-LD e UI. | Nenhuma métrica comercial, avaliação, prêmio, resultado ou garantia falsa. |
| CONTENT-005 | Integridade | Sem contato/empresa fictícia como real | HARD GATE | demos | todas | Buscar telefone, e-mail, CNPJ, endereço, horário e links externos. | Nenhum dado empresarial real/inventado; dados de interface marcados demonstrativos. |
| CONTENT-006 | Transparência | Identificação dos demos | HARD GATE | demos | 320–1440 | Inspecionar cards, páginas e footer. | Três demos rotulados como conceito; footer contém frase obrigatória completa. |

## Assets

| ID | Área | Critério | Severidade | Páginas | Viewport | Método | Resultado esperado |
|---|---|---|---|---|---|---|---|
| ASSET-001 | Assets | Inventário e função | HARD GATE | todas | todas | Comparar DOM/CSS com catálogo de 23 assets. | 23/23 existem e cada um cumpre ao menos a função prevista. |
| ASSET-002 | Assets | Integridade e carregamento | HARD GATE | todas | todas | Hash/sidecar, Git diff, Network e console. | Bytes preservados; zero asset 404/corrompido. |
| ASSET-003 | Assets | Sem substitutos silenciosos | HARD GATE | todas | todas | Revisão de arquivos e visual. | Sem placeholder, stock genérico, blob/gradiente substituto ou raster regenerado. |
| ASSET-004 | SVG | Vetores e logos | HARD GATE | todas | todas | Inspecionar MIME, markup e dimensões. | Seis SVGs permanecem vetoriais, com `viewBox`; nenhum logo ImageGen/rasterizado. |
| ASSET-005 | Layout shift | Reserva de mídia | HARD GATE | todas | todas | Inspecionar HTML/CSS e CLS. | `width`/`height` ou `aspect-ratio` antes do load; sem salto relevante. |
| ASSET-006 | M47 | Hero e galeria | HARD GATE | M47/case/Home | 320–1440 | Comparar crop/ordem com wireframe. | Hero original; mobile 65–70%; galeria 01–06 nas funções e ordem aprovadas. |
| ASSET-007 | Tavola/Prismae | Sistema visual próprio | HARD GATE | Tavola/Prismae/cases | 320–1440 | Comparação com mapas de assets. | Tavola preserva sistema editorial; Prismae usa três SVGs e nenhuma foto corporate de preenchimento. |

## Responsividade

| ID | Área | Critério | Severidade | Páginas | Viewport | Método | Resultado esperado |
|---|---|---|---|---|---|---|---|
| RESP-001 | Responsividade | Matriz mínima | HARD GATE | conforme seção 6 | 320, 360, 390, 768, 1024, 1280, 1440 | Captura/inspeção em cada largura. | Todas as larguras previstas executadas e registradas. |
| RESP-002 | Reflow | Sem overflow/sobreposição | HARD GATE | todas/amostra | todas | Comparar `scrollWidth`/`clientWidth`; inspeção visual. | Zero overflow horizontal não intencional, colisão ou sobreposição. |
| RESP-003 | Conteúdo | Copy e controles disponíveis | HARD GATE | todas/amostra | todas | Revisão visual e teclado. | Copy essencial legível; CTA/menu dentro da viewport e acionáveis. |
| RESP-004 | Mídia | Assunto e crop | HARD GATE | páginas com mídia | todas | Comparar com wireframes e focal point. | Nenhuma imagem crítica perde assunto; proporções preservadas. |
| RESP-005 | Mobile | Sem dependência de hover e landscape | HARD GATE | principais | 320–390 e 844×390 | Touch/teclado e rotação. | Toda função disponível sem hover; landscape básico utilizável. |

## Navegação e CTAs

| ID | Área | Critério | Severidade | Páginas | Viewport | Método | Resultado esperado |
|---|---|---|---|---|---|---|---|
| NAV-001 | Navegação | Desktop e estados atuais | HARD GATE | todas | 1024–1440 | Ativar cada link/rota e inspecionar `aria-current`. | Destinos corretos; estado atual coerente e não somente por cor. |
| NAV-002 | Navegação | Sticky e âncoras | HARD GATE | páginas com âncora | todas | Navegar por link/hash, reload e back/forward. | Header não cobre heading; hash/offset/foco corretos. |
| NAV-003 | Menu mobile | Abertura/fechamento | HARD GATE | todas | 320–390 | Botão, fechar, Escape, clique fora, link e troca de rota. | Todos os mecanismos funcionam; estado expandido coerente. |
| NAV-004 | Menu mobile | Nome, foco e modalidade | HARD GATE | todas | 320–390 | Árvore acessível e Tab/Shift+Tab. | Nome acessível; foco inicial/contido; background inerte. |
| NAV-005 | Menu mobile | Retorno e scroll lock | HARD GATE | todas | 320–390 | Abrir, rolar, fechar sem navegação. | Documento bloqueado sem shift; foco retorna ao gatilho. |
| NAV-006 | Teclado | Fluxo completo | HARD GATE | todas | todas | Operar navegação somente por teclado. | Todas as ações alcançáveis, ordem lógica e foco visível. |
| CTA-001 | CTAs | Catálogo 17/17 | HARD GATE | todas | todas | Mapear todas as ocorrências aos 17 rótulos da seção 8. | 17/17 rótulos e 100% das ocorrências têm destino/estado previsto. |
| CTA-002 | CTAs | Sem placeholder ou ação morta | HARD GATE | todas | todas | Inspecionar href, listeners, estados e ativação. | Sem `href="#"`, `javascript:`, placeholder ou CTA habilitado sem efeito. |
| CTA-003 | Demos | Ações locais | HARD GATE | demos | todas | Ativar agenda, localização, reserva e diagnóstico; observar Network. | Nenhuma empresa/serviço real abre; status demonstrativo correto. |
| CTA-004 | MenezesDev | Configuração central | HARD GATE | `/` e cases | todas | Inspecionar origem dos hrefs e mensagem. | CTAs usam um único valor central; nenhuma URL duplicada/fictícia. |
| CTA-005 | Semântica | Link versus botão | HARD GATE | todas | todas | Inspecionar DOM e ativação por teclado. | Navegação usa link; ação local usa button; cards sem controles aninhados. |

## WhatsApp e FAQ

| ID | Área | Critério | Severidade | Páginas | Viewport | Método | Resultado esperado |
|---|---|---|---|---|---|---|---|
| WAPP-001 | WhatsApp | Destino real aprovado | RELEASE GATE | `/` e cases | todas | Conferir aprovação e `siteConfig`; testar CTAs. | URL HTTPS oficial não nula e mensagem literal; nova aba protegida. |
| WAPP-002 | WhatsApp | Negative release test | RELEASE GATE | build de produção | n/a | Simular configuração null com CTAs comerciais publicados. | Gate/build de release falha; nenhum CTA quebrado chega a produção. |
| FAQ-001 | FAQ | Copy e estados | HARD GATE | `/` | todas | Comparar 11 Q&As e estado inicial. | 11 completas, ordenadas, inicialmente fechadas; múltiplas abertas. |
| FAQ-002 | FAQ | Mouse, touch e teclado | HARD GATE | `/` | 320–1440 | Clique, toque, Enter, Space, setas, Home/End. | Todos os mecanismos alternam/navegam corretamente. |
| FAQ-003 | FAQ | Acessibilidade e motion | HARD GATE | `/` | todas | Inspecionar ARIA, foco, indicador e reduced motion. | Estado coerente; foco visível; conteúdo sem hover; redução respeitada. |

## Formulário Prismae

| ID | Área | Critério | Severidade | Páginas | Viewport | Método | Resultado esperado |
|---|---|---|---|---|---|---|---|
| FORM-001 | Formulário | Campos, labels e ordem | HARD GATE | Prismae contact/home se usado | 320–1440 | Inspecionar seis campos, tipos, autofill e DOM. | Labels visíveis; ordem e required conforme Fase 7. |
| FORM-002 | Validação | Regras e mensagens | HARD GATE | Prismae contact | todas | Casos vazio, limite, e-mail e telefone. | Cada regra/mensagem aprovada ocorre; sem opção inventada. |
| FORM-003 | Erros | Associação, foco e preservação | HARD GATE | Prismae contact | todas | Submit inválido por teclado. | `aria-invalid`/descrição; foco no primeiro inválido; valores preservados. |
| FORM-004 | Loading | Busy e duplicidade | HARD GATE | Prismae contact | todas | Submit válido e cliques/Enter repetidos. | `aria-busy`, `Processando demonstração…`, ≤400 ms e uma transição. |
| FORM-005 | Sucesso | Copy e foco | HARD GATE | Prismae contact | todas | Completar fluxo. | Três textos literais; heading focado; sem protocolo/prazo inventado. |
| FORM-006 | Rede | Zero transmissão | HARD GATE | Prismae contact | todas | Auditar Network Fetch/XHR/Document/Beacon/WebSocket com dados sentinela. | Zero request/payload causado pelo formulário; nenhum endpoint/action. |
| FORM-007 | Persistência | Zero armazenamento | HARD GATE | Prismae contact | todas | Inspecionar cookies, local/session storage e IndexedDB antes/depois. | Nenhum lead persistido; valores removidos após sucesso. |

## Acessibilidade, contraste e motion

| ID | Área | Critério | Severidade | Páginas | Viewport | Método | Resultado esperado |
|---|---|---|---|---|---|---|---|
| A11Y-001 | Documento | Idioma, landmarks e skip link | HARD GATE | todas | todas | Inspecionar DOM/árvore acessível e acionar primeiro foco. | `lang="pt-BR"`; header/nav/main/footer coerentes; skip link funcional. |
| A11Y-002 | Headings | H1 e hierarquia | HARD GATE | todas | todas | Extrair headings por rota. | Um H1 coerente; níveis sem salto estrutural enganoso. |
| A11Y-003 | Teclado | Funcionalidade completa | HARD GATE | todas | todas | Navegação sem mouse. | Zero keyboard trap indevido; todas as funções e foco perceptíveis. |
| A11Y-004 | Estados | Não só cor/hover | HARD GATE | todas | todas | Comparar estados em teclado/touch e monocromia quando útil. | Estado e informação não dependem apenas de cor, hover ou movimento. |
| A11Y-005 | Mídia/ícones | Nomes e alternativas | HARD GATE | todas | todas | Árvore acessível e sidecars. | Alt útil para informativas; `alt=""`/ocultação para decorativas; sem nome duplicado. |
| A11Y-006 | Form/menu | Relações e foco | HARD GATE | interativas | todas | Auditoria manual + árvore acessível. | Labels/erros/status associados; menu modal prende/restaura foco. |
| A11Y-007 | WCAG automática | Severidade | HARD GATE | todas | 390 e 1440 | Rodar auditoria automatizada por rota; revisar achados. | 0 critical; 0 serious; nenhum finding silenciado. |
| A11Y-008 | WCAG manual | WCAG 2.2 AA | HARD GATE | todas | matriz mínima | Checklist manual de critérios aplicáveis, zoom/reflow e reduced motion. | Zero falha AA aplicável; exceção normativa registrada com evidência. |
| CONTRAST-001 | Contraste | Texto e componentes | HARD GATE | todas | todas | Medidor sobre cada token/estado. | Texto normal ≥4,5:1; grande ≥3:1; componente/foco ≥3:1 quando aplicável. |
| CONTRAST-002 | Touch | Alvos e espaçamento | HARD GATE | todas | 320–390 | Medir caixas CSS e links inline. | Controles móveis ≥44×44; primários preferem 48; exceção inline permanece utilizável. |
| MOTION-001 | Motion | Limites e timings | HARD GATE | todas | todas | Medir CSS/JS e interação normal. | Durações, distâncias, zoom 1.02 e stagger ≤60 ms conforme Fase 7. |
| MOTION-002 | Motion | Padrões proibidos | HARD GATE | todas | todas | Inspeção visual/CSS/JS. | Sem loop decorativo, autoplay perturbador, hijacking, parallax agressivo ou contadores. |
| MOTION-003 | Reduced motion | Preferência do usuário | HARD GATE | todas | todas | Emular `reduce`; repetir fluxos. | Movimento não essencial removido/reduzido sem perder estado ou função. |

## Runtime, links e SEO

| ID | Área | Critério | Severidade | Páginas | Viewport | Método | Resultado esperado |
|---|---|---|---|---|---|---|---|
| RUNTIME-001 | Console | Erros e rejeições | HARD GATE | todas | 390 e 1440 | Percorrer rotas/fluxos com console limpo. | 0 uncaught errors; 0 unhandled rejections. |
| RUNTIME-002 | Runtime | Assets, hydration e warnings | HARD GATE | todas | 390 e 1440 | Console e Network. | 0 asset 404; 0 hydration error; 0 warning recorrente da aplicação. |
| RUNTIME-003 | Evidência | Exclusões externas | HARD GATE | todas | n/a | Classificar origem de warning excluído e reproduzir fora do site. | Apenas ruído comprovadamente externo é excluído e documentado. |
| LINK-001 | Links | Internos e âncoras | HARD GATE | todas | n/a | Crawler do `dist` e ativação de amostra. | 0 link interno/fragmento quebrado. |
| LINK-002 | Links | Externos aprovados | HARD GATE | MenezesDev | n/a | Validar URL/HTTPS, nova aba e `rel`. | Somente destinos aprovados; `noopener noreferrer` quando necessário. |
| LINK-003 | Links | Sem destino fictício | HARD GATE | todas | n/a | Buscar `#` vazio, `javascript:`, exemplo e contato fictício. | Nenhum link público fictício/placeholder. |
| SEO-001 | Indexação | Rotas reais | HARD GATE | `/` e `/projetos/*` | n/a | Inspecionar meta/header HTTP. | `index, follow`; canonical absoluto correto. |
| SEO-002 | Metadata | Conteúdo por página | HARD GATE | todas | n/a | Extrair title, description, OG e Twitter. | Title único; description/canonical/social presentes e factuais; sem imagem quebrada. |
| SEO-003 | Demos | Noindex completo | HARD GATE | `/demo/**` | n/a | Meta, `X-Robots-Tag`, sitemap. | `noindex, nofollow, noarchive`; 0 demo no sitemap. |
| SEO-004 | Preview | Não indexável | HARD GATE | preview/pages.dev | n/a | Request headers e meta. | `noindex` efetivo em todo preview. |
| SEO-005 | Sitemap/robots | Coerência | HARD GATE | site | n/a | Parse de sitemap/robots e comparação com manifesto. | Só quatro rotas indexáveis no sitemap; robots não impede leitura de `noindex`. |
| SEO-006 | Dados estruturados | Fatos e schema | HARD GATE | rotas com JSON-LD | n/a | Parse/validador e revisão factual. | JSON válido; sem LocalBusiness de demo, AggregateRating ou dado empresarial inventado. |

## HTML, performance, JavaScript e fontes

| ID | Área | Critério | Severidade | Páginas | Viewport | Método | Resultado esperado |
|---|---|---|---|---|---|---|---|
| HTML-001 | HTML | Estrutura válida | HARD GATE | todas | n/a | Parser/validator e inspeção DOM. | Zero erro estrutural que altere semântica, foco ou layout. |
| HTML-002 | Semântica | Controles nativos | HARD GATE | todas | n/a | Inspecionar elementos/listeners. | Link navega, button age; sem div clicável; HTML nativo antes de ARIA. |
| HTML-003 | Semântica | Listas e tabelas | HARD GATE | todas | n/a | Árvore acessível/DOM. | Coleções e dados tabulares usam estruturas corretas. |
| PERF-001 | LCP | Prioridade do hero | HARD GATE | principais | mobile/desktop | Inspecionar markup e waterfall. | LCP/hero não lazy; eager/high quando imagem; sem bloqueio evitável. |
| PERF-002 | Imagens | Carregamento abaixo da dobra | HARD GATE | páginas com mídia | mobile/desktop | Markup e waterfall. | Lazy/async quando apropriado; dimensões reservadas. |
| PERF-003 | Arquitetura | Sem peso preventivo | HARD GATE | todas | n/a | Auditar dependências e bundles. | Sem SPA/runtime global, hidratação desnecessária, animação pesada, carrossel pesado ou vídeo autoplay. |
| PERF-004 | Fontes/JS | Carga seletiva | HARD GATE | todas | n/a | Coverage, Network e bundles por rota. | Só pesos/famílias/módulos necessários à rota. |
| PERF-005 | Auditoria | Ambiente reproduzível | HARD GATE | principais | mobile | Três Lighthouse por página com ambiente registrado. | Três relatórios válidos; mediana calculada sem excluir pior execução arbitrariamente. |
| PERF-101 | Performance | Lighthouse Performance | TARGET | principais | mobile | Mediana de três runs. | Score ≥90. |
| PERF-102 | Performance | Lighthouse Accessibility | TARGET | principais | mobile | Mediana de três runs. | Score ≥95. |
| PERF-103 | Performance | Lighthouse Best Practices | TARGET | principais | mobile | Mediana de três runs. | Score ≥95. |
| PERF-104 | Performance | Lighthouse SEO | TARGET | `/` e `/projetos/*` | mobile | Mediana de três runs. | Score ≥95; demos excluídas por `noindex` deliberado. |
| PERF-105 | Web Vitals lab | LCP | TARGET | principais | mobile | Mediana de três runs. | LCP ≤2,5 s. |
| PERF-106 | Web Vitals lab | CLS | TARGET | principais | mobile | Mediana de três runs. | CLS ≤0,10. |
| PERF-107 | Web Vitals lab | TBT | TARGET | principais | mobile | Mediana de três runs. | TBT ≤200 ms. |
| JS-001 | JavaScript | Static-first | HARD GATE | todas | n/a | Inspecionar HTML/bundles e comportamento sem JS onde passivo. | HTML estático; JS somente em rotas/interações aprovadas. |
| JS-002 | JavaScript | Domínios permitidos | HARD GATE | todas | n/a | Mapear módulos a menu, foco, FAQ, trilho, estados e form. | Nenhum módulo cliente sem função documentada. |
| JS-003 | JavaScript | Hidratação seletiva | HARD GATE | todas | n/a | Lockfile, bundles, client directives e decisões. | React somente em ilhas explícitas; sem SPA/client router, hidratação global ou runtime pesado sem ADR. |
| FONT-001 | Fontes | Self-hosting WOFF2 | HARD GATE | todas | n/a | Network, CSS e arquivos. | Só WOFF2 locais; zero Google Fonts/CDN runtime. |
| FONT-002 | Fontes | Famílias e pesos por identidade | HARD GATE | todas | n/a | Computed styles e Network por rota. | Manrope/Inter, Archivo/Inter, Cormorant/Manrope e Jakarta/Inter conforme contrato; só pesos usados. |
| FONT-003 | Fontes | Display, fallback e preload | HARD GATE | todas | n/a | CSS/waterfall com falha simulada de fonte. | `font-display` definido; fallback legível; preload só do recurso acima da dobra realmente usado. |

## Privacidade, segurança e deploy

| ID | Área | Critério | Severidade | Páginas | Viewport | Método | Resultado esperado |
|---|---|---|---|---|---|---|---|
| PRIV-001 | Privacidade | Sem coleta não aprovada | HARD GATE | todas | n/a | Network, storage, scripts e cookies. | Sem advertising pixel, fingerprinting ou tracker não aprovado. |
| PRIV-002 | Analytics | Escopo real de produção | HARD GATE | demos/dev/preview | n/a | Network por hostname/path. | Nenhum beacon em demos, localhost, dev ou preview; sem propriedades fictícias. |
| PRIV-003 | Formulário | Lead não transmitido/persistido | HARD GATE | Prismae contact | n/a | Reutilizar FORM-006/007. | Zero dado em rede, storage, cookie ou analytics. |
| PRIV-004 | Analytics | Revisão de consentimento | RELEASE GATE | produção | n/a | Revisão documentada da configuração/contexto. | Decisão registrada; se consentimento for necessário e faltar, analytics fica desativado. |
| SEC-001 | Segurança | Segredos no repo/bundle | HARD GATE | repositório/`dist` | n/a | Secret scan, busca em source map/HTML/JS. | Zero key, token, certificado, cookie ou segredo. |
| SEC-002 | Segurança | Arquivos sensíveis | HARD GATE | repositório | n/a | `git ls-files`, ignore e histórico candidato. | Nenhum `.env` sensível ou credencial versionada. |
| SEC-003 | Headers | Baseline de proteção | HARD GATE | todas | n/a | Request headers. | nosniff, Referrer-Policy, Permissions-Policy e proteção contra framing conforme spec. |
| SEC-004 | CSP | Compatibilidade e restrição | HARD GATE | todas | n/a | Navegação/console/Network com CSP enforcing. | Sem `unsafe-inline` por atalho; fontes/assets/analytics legítimos funcionam; framing bloqueado. |
| DEPLOY-001 | Cloudflare | Build/output | RELEASE GATE | projeto Pages | n/a | Inspecionar configuração de build. | `pnpm build`; output `dist`; raiz correta. |
| DEPLOY-002 | Git | Origem e produção | RELEASE GATE | projeto Pages | n/a | Inspecionar Git integration. | GitHub é origem; `main` é production branch. |
| DEPLOY-003 | Preview | Separação | RELEASE GATE | PR/branch | n/a | Criar/inspecionar preview autorizado. | Preview separado, não substitui produção e permanece noindex. |
| DEPLOY-004 | Domínio | Canonical e redirect | RELEASE GATE | produção | n/a | DNS/HTTP/canonical em hosts. | Domínio aprovado resolve; host alternativo redireciona quando necessário; canonical final correto. |
| DEPLOY-005 | TLS | Certificado | RELEASE GATE | produção | n/a | Handshake/request HTTPS. | TLS válido, sem mixed content ou erro de certificado. |
| DEPLOY-006 | Runtime | Sem Cloudflare dinâmico preventivo | RELEASE GATE | projeto Pages | n/a | Auditar adapter, Functions, Workers e bindings. | Nenhum runtime/adapter/binding sem nova decisão. |

## Marca, wireframes, interações e screenshots

| ID | Área | Critério | Severidade | Páginas | Viewport | Método | Resultado esperado |
|---|---|---|---|---|---|---|---|
| BRAND-001 | Marca | MenezesDev | HARD GATE | `/` e cases | 390 e 1440 | Comparar tokens, fontes e uso de gradiente ao Brand Guide. | Dark-first, Manrope/Inter, neutros dominantes e gradiente controlado; sem template genérico. |
| BRAND-002 | Marca | M47 | HARD GATE | M47/case/Home | 390 e 1440 | Comparação visual/token/fontes. | Preto/quente/dourado, Archivo/Inter, ritmo compacto; sem clichê/gradiente colorido. |
| BRAND-003 | Marca | Tavola e Prismae | HARD GATE | demos/cases/Home | 390 e 1440 | Comparação visual/token/fontes. | Tavola editorial creme/verde/vinho; Prismae claro/grid/dados; famílias corretas. |
| BRAND-004 | Marca | Distinção lado a lado | HARD GATE | quatro homes | 390 e 1440 | Painel comparativo de estrutura, ritmo, mídia e tokens. | Demos não compartilham sequência/composição como skins; diferenças objetivas registradas. |
| BRAND-005 | Marca | Brand Kit público aprovado | RELEASE GATE | MenezesDev | todas | Conferir logo/favicon requeridos, origem, bytes e ausência de placeholder. | Assets públicos necessários foram materializados byte a byte do kit aprovado; nenhum arquivo foi recriado. |
| WIRE-001 | Wireframe | Ordem/hierarquia/função | HARD GATE | todas | 390 e 1440 | Checklist seção por seção contra Fase 6. | Estrutura, copy, CTAs e assets mantêm posição/função; sem módulo essencial ausente. |
| WIRE-002 | Wireframe | Reordenação mobile | HARD GATE | todas | 320–768 | Comparar ordem DOM/visual e simplificações. | Empilhamento, crops, trilhos e processo Prismae HTML seguem o contrato; sem pixel-perfect artificial. |
| INTERACT-001 | Interações | Fidelidade Fase 7 | HARD GATE | todas | todas | Executar matriz de estados/fluxos. | Toda interação aprovada funciona; nenhuma removida por conveniência. |
| INTERACT-002 | Interações | Sem complexidade inventada | HARD GATE | todas | todas | Auditar overlays, carrosséis, lightboxes, tabs e listeners. | Nenhuma interação complexa nova sem necessidade/decisão. |
| SCREEN-001 | Screenshots | Autenticidade | HARD GATE | cases/portfólio | todas | Inspecionar origem e comparar com site real. | Nenhum screenshot IA/UI fictícia apresentado como implementação real. |
| SCREEN-101 | Screenshots | Capturas finais | TARGET | demos implementados | desktop/mobile | Após funcionamento, capturar hero/full page conforme briefings. | Conjunto real disponível para `VISUAL PORTFOLIO COMPLETE`; não bloqueia Implementation Done/Production Ready. |

## Pendências classificadas

| Pendência | Classificação | Efeito objetivo |
|---|---|---|
| URL real do WhatsApp MenezesDev | blocker de produção | Não bloqueia implementação; bloqueia `WAPP-001` e Production Ready. |
| Copy expandida de `/demo/prismae/about` | pós-implementação | Não bloqueia implementação ou produção enquanto rota/link permanecerem ausentes. |
| Domínio e TLS reais | blocker de produção | Bloqueiam `DEPLOY-004/005`; não bloqueiam build local. |
| Screenshots reais | pós-implementação | Não bloqueiam Implementation Done/Production Ready; bloqueiam Visual Portfolio Complete. |
| Materialização adicional do Brand Kit | blocker de produção | Quando um logo/favicon público requerido ainda estiver ausente, precisa vir byte a byte do kit aprovado; sem placeholder. |
| Backend futuro | pós-implementação | Não bloqueia nenhuma definição atual; exige nova decisão antes de transmissão. |

Nenhuma pendência atualmente aberta é blocker de implementação da arquitetura estática de 16 rotas.

# 30. Definition of Done

## IMPLEMENTATION DONE

Somente quando:

- todos os 97 HARD GATES estiverem PASS;
- build/check/rotas estiverem verdes em checkout limpo;
- console/runtime estiverem limpos;
- responsividade e teclado tiverem evidência na matriz mínima;
- acessibilidade automática e manual estiverem aprovadas;
- wireframes, identidades e interações corresponderem aos contratos;
- targets medidos estiverem PASS ou com MISS investigado e documentado;
- nenhum release gate for falsamente marcado como PASS por placeholder.

Release gates podem permanecer BLOCKED sem invalidar `IMPLEMENTATION DONE`, desde que a produção não ocorra.

## PRODUCTION READY

Exige `IMPLEMENTATION DONE` e:

- todos os 10 RELEASE GATES em PASS;
- WhatsApp real aprovado/configurado;
- domínio canônico e TLS confirmados;
- preview/produção e SEO de ambiente validados;
- política efetiva de analytics/privacidade registrada;
- nenhum TARGET MISS sem investigação e decisão registrada.

## VISUAL PORTFOLIO COMPLETE

Exige `PRODUCTION READY` e:

- demos reais funcionando;
- screenshots reais desktop, mobile e full page capturados conforme os briefings;
- mockups/composições finais produzidos somente a partir dessas capturas;
- zero screenshot gerado por IA apresentado como implementação.

## Contagem canônica

| Classe | Quantidade |
|---|---:|
| HARD GATE | 97 |
| RELEASE GATE | 10 |
| TARGET | 8 |
| Total | 115 |

As contagens são derivadas das linhas com ID na seção 29. A validação documental da Fase 9 deve falhar se a contagem real divergir desta tabela.

## Fontes normativas verificadas

- [W3C — Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C — Understanding Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [W3C — Understanding Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Chrome for Developers — Lighthouse performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)

Consultas realizadas em 2026-08-22. Ferramentas e regras automatizadas sensíveis à versão devem ser registradas no relatório de execução da Fase 10.
