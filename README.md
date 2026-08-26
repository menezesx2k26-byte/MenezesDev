# MenezesDev

**Sites que impulsionam negócios — e uma plataforma internacional de ferramentas web em construção.**

Este repositório reúne dois workstreams relacionados, mas governados separadamente:

1. **MenezesDev comercial** — site institucional, portfólio e demos fictícias;
2. **MenezesDev Tools** — plataforma internacional de utilidades web gratuitas, browser-first e AdSense-first.

O Git é a fonte de verdade. As branches de implementação e pesquisa permanecem isoladas até os gates de release/merge serem satisfeitos.

---

## Estado atual

### MenezesDev comercial

A implementação do site comercial está materializada em:

```text
feat/phase-10-implementation
```

Base registrada para integração futura:

```text
152fab910296f29cfae2e07bf6ccc2c69f0ce0df
```

Estado documentado nessa linha de trabalho:

- Phase 10 de implementação concluída;
- Astro 7.2.4 + TypeScript 6 + Tailwind CSS 4;
- 16 rotas canônicas + 404 implementadas;
- demos fictícias mantidas `noindex`;
- hard gates de implementação concluídos;
- release de produção ainda bloqueada por gates externos/operacionais;
- `IMPLEMENTATION DONE`: sim;
- `PRODUCTION READY`: não;
- `VISUAL PORTFOLIO COMPLETE`: não.

A documentação detalhada dessa implementação vive em `docs/context/STATE.md` e `docs/PHASE_10_IMPLEMENTATION_REPORT.md` na branch comercial.

### MenezesDev Tools

Branch canônica de pesquisa, governança e especificação:

```text
feat/tools-oss-catalog
```

Estado atual do workflow Tools:

- Phase 0 — Product constitution: **CLOSED**;
- Phase 1 — Global Market Intelligence: **CLOSED**;
- Phase 2 — OSS Capability Audit: **CLOSED**;
- Phase 3 — Capability Map: **CLOSED**;
- Phase 4 — Freeze Launch 50: **CLOSED / 50 aprovadas e congeladas**;
- Phase 5 — Information architecture / international SEO: **CLOSED**;
- Phase 6 — Tools architecture design: **CLOSED / written spec approved**;
- Phase 7 — Security design / threat-model consolidation: **ACTIVE / architectural design cycle**;
- runtime Tools: **ainda não implementado**;
- `main`: **não recebe implementação parcial do Tools**.

Estado canônico detalhado:

```text
docs/context/TOOLS_STATE.md
```

---

# MenezesDev Tools

## Missão

Construir uma grande plataforma internacional de ferramentas web gratuitas dentro do mesmo domínio/repositório, com crescimento por SEO e uso recorrente, monetização principalmente por Google AdSense e custo marginal extremamente baixo.

A regra econômica central é simples:

> Se uma operação determinística pode rodar com segurança no navegador do usuário, ela não deve virar uma requisição de backend paga por uso.

## Superfície pública planejada

```text
menezesdev.com/
├── /                         site comercial; sem Ads
├── /projetos/...             portfólio; sem Ads
├── /demo/...                 demos fictícias; sem Ads
├── /tools/...                Tools em inglês internacional
├── /pt-br/ferramentas/...    localização PT-BR
└── /guides/...               conteúdo editorial/educacional
```

English (`en`) é o idioma principal do Tools. PT-BR é a localização secundária.

---

## Launch 50

O primeiro release público do Tools exige **50 ferramentas completas e funcionais**.

A matriz congelada usa:

- **35** ferramentas SEO/AdSense-led — 70%;
- **10** ferramentas de cobertura arquitetural — 20%;
- **5** experimentos/strategic bets — 10%.

Situação técnica da matriz:

- **46/50** clear/internal/local-bounded;
- **4/50** local-conditional: Image Compressor, HTML Formatter, Merge PDF e Split PDF;
- **0/50** exigem backend de processamento por operação comum.

Matriz canônica:

```text
docs/tools/LAUNCH50_FROZEN.md
```

Pool técnico/econômico completo:

```text
docs/tools/CAPABILITY_MAP.md
```

---

## Arquitetura browser-first

Ordem obrigatória de decisão:

```text
secure native browser API
        >
secure browser JS/TS
        >
secure local WASM
        >
backend somente quando realmente necessário
```

`Web Worker` significa isolamento no navegador, não backend.

Para o Launch 50, a arquitetura aprovada assume `serverRequired = false` para as operações comuns das 50 ferramentas.

Rust/WASM é usado quando traz ganho concreto de segurança, performance, parsing hostil, determinismo ou controle de recursos. Não é requisito ideológico.

---

## Segurança

Todo input controlado pelo usuário é não confiável.

Pipeline obrigatório:

```text
validate
   ↓
bound
   ↓
sanitize / canonicalize
   ↓
process
   ↓
encode safe output
```

Entre os hard gates:

- limites de bytes/caracteres/páginas/dimensões/profundidade/trabalho;
- nenhuma confiança em extensão/MIME/filename;
- proteção contra bombs e inputs patológicos;
- regex potencialmente catastrófica isolada e limitada;
- PDF/SVG/HTML ativos desabilitados por padrão;
- nenhum server-side fetch arbitrário sem threat model SSRF específico;
- nenhum conteúdo de arquivo/texto privado em telemetry;
- erros públicos sem stack trace, segredo ou caminho interno.

Contrato obrigatório:

```text
docs/tools/SECURITY_POLICY.md
```

---

## Tool SDK

O Tools será guiado por um SDK híbrido tipado, não por 50 páginas completamente independentes nem por um renderer universal gigantesco.

Direção aprovada da Phase 6:

```text
Tool Catalog
    ↓
locale content + routes/SEO + relations/search
    ↓
Astro static generation
    ↓
Tool Runtime Controller
    ↓
validate / bound / canonicalize
    ↓
main thread | Web Worker | WASM Worker
    ↓
typed result
    ↓
safe renderer
```

Princípios:

- stable tool id independente de slug/locale;
- catálogo serializável e data-only;
- engines puros, sem Astro/DOM/Ads/analytics;
- boundaries executáveis resolvidos por IDs allowlisted;
- UI genérica para calculadoras/texto comuns;
- renderers especializados para experiências como PDF/image crop/regex/Markdown;
- dependências pesadas carregadas apenas na ferramenta que precisa delas;
- locale/content gerado no build;
- SEO/search/related tools derivados da mesma fonte canônica;
- Ads e analytics são adapters opcionais, nunca dependências da correção da ferramenta.

Spec:

```text
docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-design.md
```

Closure:

```text
docs/tools/PHASE6_CLOSURE.md
```

---

## SEO internacional

A Phase 5 já fechou o contrato de SEO/IA.

Direção principal:

```text
/tools/<categoria>/<tool>/
/pt-br/ferramentas/<categoria>/<ferramenta>/
```

O contrato inclui:

- rotas EN/PT-BR exatas das 50;
- self-canonical por locale;
- `hreflang` recíproco somente para variantes reais/publicadas;
- sitemap segmentado;
- robots/index/noindex;
- breadcrumbs;
- related-tool graph;
- guides por intenção independente;
- busca interna não indexável;
- política anti-thin/doorway;
- utility-first content;
- HTML estático com conteúdo SEO-critical;
- fallbacks de hosting nunca viram origem canônica por acidente.

Spec:

```text
docs/superpowers/specs/2026-08-24-menezesdev-tools-phase5-seo-ia-design.md
```

---

## AdSense e custo

A monetização inicial planejada do Tools é Google AdSense.

Princípios:

- comercial/portfólio/demo continuam ad-free;
- slots de Ads não podem parecer controles da ferramenta;
- Ads não ficam colados a Upload/Download/Convert/Calculate de forma enganosa;
- `adsEligible` será controlado pelo Traffic Guard;
- suspicious/automated traffic não entra intencionalmente no mesmo caminho monetizado de humanos elegíveis;
- global/per-route kill switches serão obrigatórios antes de escala monetizada;
- ferramenta continua funcionando se Ads ou analytics estiverem desligados.

---

## Autonomous Growth Engine

Após Launch 50 e dados reais, o produto poderá operar um flywheel policy-gated:

```text
Search Console + product analytics + revenue + Trend Radar
                           ↓
                  Opportunity Engine
                           ↓
        improve page / guide / approved new tool
                           ↓
        policy + quality + security + cost gates
                           ↓
                     publish
                           ↓
                     measure
                           ↓
             improve / expand / prune
                           ↺
```

### Agente editorial

O agente de IA é **on-demand**, alimentado por brief estruturado e fact/source pack verificado.

Ele pode explicar, organizar e reescrever; não estabelece sozinho:

- fórmulas canônicas;
- resultados das ferramentas;
- fatos de licença;
- fatos de segurança;
- claims de fonte.

### Trend Radar e crawler

Ordem preferida de sinais:

1. Search Console e dados first-party;
2. APIs/RSS/feeds;
3. índices públicos de trends/news;
4. crawler HTML apenas como fallback e somente para domínios aprovados.

O crawler futuro será whitelist-only, respeitará robots/terms, rate limits, cache/ETag/backoff e nunca poderá burlar login, paywall, CAPTCHA, WAF ou anti-bot.

A implementação desse sistema permanece pós-launch, principalmente nas Phases 21–22.

Binding addendum:

```text
docs/tools/workflow-addenda/2026-08-24-autonomous-growth-autopilot.md
```

---

## Deployment e fallback

O host primário planejado é Cloudflare Pages, mas o produto deve permanecer provider-portable.

```text
GitHub — source of truth
        ↓
reproducible static build
        ↓
provider-neutral artifact
        ↓
Cloudflare Pages primary
        +
approved static fallback
```

Não vamos transformar ferramenta browser-capable em Cloudflare-dependent apenas por conveniência.

Fallback deve preservar:

- canonical domain;
- segurança;
- URLs públicas;
- custo controlado;
- possibilidade de desligar Ads se consent/policy não puder ser garantido.

Addendum:

```text
docs/tools/addenda/2026-08-24_DEPLOYMENT_PORTABILITY_AND_FALLBACK.md
```

---

# MenezesDev comercial

## Oferta

Os valores públicos são preços de entrada; o orçamento final depende do escopo.

| Plano | A partir de | Entrega principal |
|---|---:|---|
| **Essencial** | **R$600** | Landing page profissional, responsiva e publicada |
| **Profissional** | **R$950** | Site institucional com até 5 páginas |
| **Negócio** | **R$1.500** | Site orientado à geração de contatos e conversão |
| **Personalizado** | **R$2.500** | Aplicações, integrações, dashboards e funcionalidades especiais |

A oferta completa está em:

```text
SERVICES_AND_PRICING.md — MenezesDev.md
```

## Cases demonstrativos

O portfólio usa três empresas fictícias, sem fingir clientes reais:

| Case | Nicho | Papel |
|---|---|---|
| **M47 Barber** | Barbearia contemporânea | landing page de entrada |
| **Tavola 27** | Restaurante italiano contemporâneo | site institucional editorial/multipágina |
| **Prismae** | Consultoria empresarial | autoridade, estrutura, dados e leads |

As rotas `/demo/**` são demos fictícias e permanecem fora da indexação orgânica.

---

## Stack atual

Base comercial implementada:

- Astro 7.2.4 static;
- TypeScript 6.0.3;
- Tailwind CSS 4.3.3;
- pnpm 11.22.0;
- Node.js 24;
- Lucide Astro;
- HTML semântico;
- CSS-first;
- JavaScript cliente mínimo;
- sem framework cliente obrigatório;
- Cloudflare Pages como direção primária de hosting.

Tools reutilizará essa base, mas com layouts/metadata/runtime próprios onde a separação fizer sentido.

---

## Branches importantes

```text
main
  └── produção; não recebe Tools parcial

feat/phase-10-implementation
  └── implementação comercial atual

feat/tools-oss-catalog
  └── pesquisa, governança, SEO, arquitetura e audits do Tools

feat/tools-platform
  └── futura branch de integração da implementação Tools
```

A futura `feat/tools-platform` deve nascer da implementação comercial aprovada/sucessora e carregar junto toda a governança/spec do Tools.

---

## Documentação principal

### Governança geral

- `AGENTS.md` — contrato operacional para agentes;
- `docs/context/STATE.md` — estado do workstream comercial/geral;
- `docs/context/DECISIONS.md` — decisões comerciais/gerais;
- `docs/context/HANDOFF.md` — continuidade comercial/geral.

### Tools

- `docs/context/TOOLS_STATE.md` — estado canônico do Tools;
- `docs/context/TOOLS_DECISIONS.md` — decisões duráveis do Tools;
- `docs/context/TOOLS_HANDOFF.md` — continuidade entre sessões/agentes;
- `docs/tools/IMMUTABLE_WORKFLOW.md` — workflow operacional canônico;
- `docs/tools/TOOLS_SCOPE.md` — escopo aprovado;
- `docs/tools/SECURITY_POLICY.md` — contrato de segurança;
- `docs/tools/CAPABILITY_MAP.md` — caminhos técnicos/econômicos do pool final;
- `docs/tools/LAUNCH50_FROZEN.md` — Launch 50 congelado;
- `docs/tools/OSS_CATALOG.md` — catálogo/audit OSS;
- `docs/tools/AUTONOMOUS_GROWTH_SECURITY.md` — controles do crescimento autônomo;
- `docs/superpowers/specs/2026-08-24-menezesdev-tools-phase5-seo-ia-design.md` — SEO/IA;
- `docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-design.md` — arquitetura Tool SDK/runtime;
- `docs/tools/PHASE6_CLOSURE.md` — fechamento formal da arquitetura.

### Comercial

- `docs/BRAND_GUIDE.md` — identidade visual;
- `docs/DEMO_CASES.md` — cases;
- `docs/TECHNICAL_SPEC.md` — arquitetura comercial;
- `docs/ACCEPTANCE_CRITERIA.md` — hard/release gates;
- `docs/wireframes/` — wireframes;
- `docs/interactions/` — comportamento/interações;
- `docs/NATIVE_IMAGEGEN_WORKFLOW.md` — pipeline visual.

---

## Regras para agentes

Antes de qualquer trabalho de MenezesDev Tools, leia `AGENTS.md` e siga o verification gate definido ali.

Em resumo:

```text
TOOLS_STATE
→ TOOLS_DECISIONS
→ TOOLS_HANDOFF
→ IMMUTABLE_WORKFLOW completo
→ binding addenda
→ SECURITY_POLICY quando aplicável
→ relevant scope/spec/audit
→ confirmar phase/gate
→ só então agir
```

**No memory-only execution is permitted for MenezesDev Tools. Git is the source of truth.**

---

## Segurança e custo — regras gerais

- nenhuma chave, token, certificado, cookie, senha ou `.env` entra no Git;
- nenhum serviço pago vira requisito silenciosamente;
- browser-first continua sendo o padrão econômico do Tools;
- demos fictícias não fingem clientes/resultados reais;
- produção não recebe implementação parcial apenas para mostrar progresso;
- deploy deve permanecer reproduzível a partir do repositório.

---

**MenezesDev — direção visual, engenharia, utilidade e crescimento com custo controlado.**
