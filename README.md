# MenezesDev

## Infraestrutura de aquisição orgânica, utilidades web e mídia digital

**MenezesDev está evoluindo de um projeto de serviços digitais para uma plataforma internacional de ativos web: ferramentas gratuitas, conteúdo orientado por dados e uma arquitetura preparada para transformar utilidade real em tráfego orgânico recorrente e receita publicitária.**

A tese é simples:

```text
resolver problemas que as pessoas já procuram
        ↓
entregar ferramentas gratuitas e rápidas
        ↓
executar o máximo possível no navegador
        ↓
capturar tráfego por SEO + uso recorrente
        ↓
medir demanda, CTR, posição e receita
        ↓
expandir somente onde os dados justificarem
```

O objetivo é construir um **portfólio de propriedades digitais úteis**, com baixo custo marginal, distribuição orgânica e monetização progressiva.

## Launch 50

O primeiro release público do MenezesDev Tools exige **50 ferramentas completas e funcionais**:

- **35** SEO/AdSense-led;
- **10** de cobertura arquitetural;
- **5** experimentos estratégicos;
- **46/50** com caminho clear/internal/local-bounded;
- **4/50** local-conditional;
- **0/50** com backend obrigatório por operação comum.

A execução é browser-first: quando uma operação puder ser feita com segurança no dispositivo do visitante, ela não deve criar processamento pago no backend MenezesDev.

## Flywheel de crescimento

```text
Launch 50
  ↓
SEO + uso recorrente
  ↓
Search Console + analytics + receita
  ↓
Opportunity Engine + Trend Radar
  ↓
melhorar página / guide / avaliar nova tool
  ↓
AI Editorial dentro de gates
  ↓
mais tráfego e dados
  ↺
```

Sem oportunidade qualificada, o resultado correto é **não publicar**. O sistema futuro também deve consolidar, noindexar, redirecionar ou remover ativos fracos/canibalizantes.

## Monetização

O modelo inicial aprovado é **Google AdSense** nas superfícies elegíveis de Tools e guides. Após audiência e inventário existirem, canais adicionais — como **Taboola/native discovery**, patrocínios de clusters, afiliados, Pro/ad-free, batch e API — podem ser avaliados somente se aumentarem receita líquida sem degradar produto, SEO, privacidade, retenção ou custo.

## Rede de verticais

O Launch permanece concentrado no domínio principal:

```text
menezesdev.com/tools/...
menezesdev.com/pt-br/ferramentas/...
menezesdev.com/guides/...
```

A arquitetura permite avaliar, no futuro e com revisão SEO própria, verticais especializadas como:

```text
finance.menezesdev.com
dev.menezesdev.com
image.menezesdev.com
text.menezesdev.com
pdf.menezesdev.com
```

Esses subdomínios **não fazem parte da arquitetura canônica do Launch 50**; representam uma opção de expansão do portfólio quando os dados justificarem a separação.

## Tool SDK

Direção aprovada:

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

Princípios: stable tool id, catálogo data-only, engines puros, boundaries allowlisted, dependências pesadas lazy, generic primitives + specialized renderers, Ads/analytics opcionais para a correção da ferramenta e build estático provider-neutral.

## Segurança e privacidade

Todo input é não confiável e segue:

```text
validate → bound → sanitize/canonicalize → process → encode safe output
```

Arquivos, textos, valores financeiros e resultados privados não entram em telemetria. Engines/boundaries/workers não recebem autoridade de rede por padrão. Security profiles têm limites finitos e overrides locais só podem apertá-los.

## SEO internacional

English (`en`) é a superfície primária; PT-BR é secundária. O contrato cobre rotas independentes por locale, self-canonical, `hreflang` recíproco para pares reais, sitemaps, anti-thin, category hubs, related tools, guides e busca interna não indexável.

Rotas-base:

```text
/tools/<category>/<tool>/
/pt-br/ferramentas/<categoria>/<ferramenta>/
```

## Infraestrutura

- Astro 7 static-first;
- TypeScript strict;
- Tailwind CSS 4;
- pnpm 11 / Node 24;
- sem React/Vue/Svelte no baseline;
- GitHub como source of truth;
- Cloudflare Pages como host primário;
- `dist/` provider-neutral;
- fallback estático aprovado antes de release;
- nenhuma tool browser-capable pode depender do runtime Cloudflare para funcionar.

## Workstreams

### Site comercial

A implementação comercial está materializada em `feat/phase-10-implementation` com 16 rotas canônicas e os 97 hard gates históricos implementados. O release definitivo continua separado dos gates do MenezesDev Tools; produção não deve ser declarada pronta apenas porque o build/preview existe.

### MenezesDev Tools

- Phases 0–9: contratos de produto, market intelligence, Launch 50, SEO/IA, Tool SDK, security, Traffic/Cost Guard e plano de implementação concluídos/aprovados;
- implementação parcial permanece fora de `main`;
- branch de plataforma: `feat/tools-platform`;
- plano canônico de foundation: `docs/superpowers/plans/2026-08-29-menezesdev-tools-phase10-12-foundation.md`.

O proof set da foundation cobre Percentage Calculator, JSON Formatter, Image Resizer e Regex Tester antes das waves de implementação das 50.

## Documentação canônica

```text
docs/context/TOOLS_STATE.md
docs/context/TOOLS_DECISIONS.md
docs/context/TOOLS_HANDOFF.md
docs/tools/IMMUTABLE_WORKFLOW.md
docs/tools/SECURITY_POLICY.md
docs/tools/LAUNCH50_FROZEN.md
docs/tools/CAPABILITY_MAP.md
docs/superpowers/specs/2026-08-24-menezesdev-tools-phase5-seo-ia-design.md
docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-design.md
docs/superpowers/specs/2026-08-26-menezesdev-tools-phase7-security-design.md
docs/superpowers/specs/2026-08-26-menezesdev-tools-phase8-traffic-cost-guard-design.md
docs/superpowers/plans/2026-08-29-menezesdev-tools-phase10-12-foundation.md
```

MenezesDev é uma infraestrutura para transformar **utilidade em distribuição, distribuição em dados e dados em um portfólio digital progressivamente mais eficiente**.