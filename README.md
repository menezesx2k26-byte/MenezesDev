# MenezesDev

**Sites que impulsionam negócios.**

Repositório principal do site comercial, dos cases demonstrativos e do ambiente de trabalho da **MenezesDev**.

O projeto está sendo construído com **Codex como agente principal**, documentação explícita no repositório e uma regra simples: tecnologia, design e automação só entram quando melhoram o produto sem criar dependência desnecessária ou custo obrigatório.

## Estado atual

- **Fase atual:** 9 — critérios de aceite e release gates concluídos.
- **Work Mode:** 4.5.
- **Agente principal:** Codex nativo.
- **Custo obrigatório adicional de API para o baseline:** R$ 0.
- **Pipeline raster oficial:** Codex ImageGen nativo.
- **Primeiro asset oficial:** `public/assets/demos/m47/m47-hero.webp`.
- **M47 hero:** WebP, 1536×960, 16:10, status `generated`.
- **MCP de imagem anterior:** desativado e mantido apenas como registro histórico.

Os assets, wireframes responsivos, contratos de interação, especificação técnica e critérios de aceite estão concluídos. A Fase 10 de implementação ainda não foi iniciada.

## Baseline técnico fechado

- Astro 7 com geração estática e TypeScript strict;
- Tailwind CSS 4 via `@tailwindcss/vite`;
- pnpm 11 e Node.js 24 LTS;
- HTML semântico, CSS-first e JavaScript cliente mínimo;
- GitHub `main` como origem de produção no Cloudflare Pages;
- `pnpm build` como build e `dist` como diretório publicado;
- nenhum framework cliente, backend, endpoint ou segredo no baseline;
- Cloudflare Web Analytics somente na superfície real de produção, nunca nas demos fictícias.

O contrato técnico completo está em `docs/TECHNICAL_SPEC.md`. A auditoria futura usa `docs/ACCEPTANCE_CRITERIA.md`, com 97 hard gates, 10 release gates e 8 targets. Nenhum scaffold ou pacote foi criado nas Fases 8–9.

## Oferta comercial

Os valores públicos representam preços de entrada; o orçamento final depende do escopo.

| Plano | A partir de | Entrega principal |
|---|---:|---|
| **Essencial** | **R$600** | Landing page profissional, responsiva e publicada |
| **Profissional** | **R$950** | Site institucional com até 5 páginas |
| **Negócio** | **R$1.500** | Site orientado à geração de contatos e conversão |
| **Personalizado** | **R$2.500** | Aplicações, integrações, dashboards e funcionalidades especiais |

Princípios comerciais:

- escopo fechado;
- 2 rodadas de revisão nos pacotes-base;
- domínio e serviços pagos de terceiros são tratados separadamente;
- nenhuma funcionalidade é prometida antes de análise técnica;
- manutenção mensal é opcional.

A especificação completa está em `SERVICES_AND_PRICING.md — MenezesDev.md`.

## Cases demonstrativos

O portfólio inicial usa três empresas fictícias para demonstrar níveis diferentes de produto sem inventar clientes reais.

| Case | Nicho | Pacote representado | Objetivo |
|---|---|---|---|
| **M47 Barber** | Barbearia contemporânea | Essencial | Mostrar a força de uma landing page de entrada |
| **Tavola 27** | Restaurante italiano contemporâneo | Profissional | Demonstrar um site institucional editorial e multipágina |
| **Prismae** | Consultoria empresarial | Negócio | Demonstrar autoridade, estrutura, dados e geração de leads |

Os três cases devem parecer produtos independentes, não variações do mesmo template.

### M47 Barber

Direção visual: masculina, urbana, precisa e contemporânea; preto profundo, iluminação lateral quente, madeira discreta e dourado fosco.

O primeiro hero oficial já foi produzido com ImageGen nativo e passou por revisão de realismo, anatomia, ferramentas, iluminação, espaço negativo e crop mobile.

![Hero demonstrativo M47 Barber](public/assets/demos/m47/m47-hero.webp)

## Pipeline nativo de imagens

A arquitetura oficial da Etapa 4.5 é:

```text
briefing do repositório
  → $menezesdev-image-director
  → $imagegen nativo
  → revisão visual
  → asset + .prompt.md + .meta.json
  → validação no layout real
```

### Regras principais

- O briefing do repositório vem antes da improvisação.
- A função da imagem no layout vem antes da estética isolada.
- Texto de interface deve ser HTML, não pixels gerados.
- Logo final, mark, gráfico, diagrama e UI exata devem ser SVG/frontend quando possível.
- Screenshots de portfólio devem vir do site real implementado.
- Nada de clientes, avaliações, métricas ou resultados comerciais fictícios apresentados como reais.
- Assets aprovados não devem ser sobrescritos silenciosamente.
- Cada raster importante mantém prompt e metadata auditáveis.

O skill repo-local de direção de arte fica em:

```text
.agents/skills/menezesdev-image-director/SKILL.md
```

### Canva

Canva Premium é reservado para a camada editorial posterior:

- mockups com screenshots reais;
- thumbnails;
- banners;
- posts e stories;
- apresentações de case;
- redimensionamento e peças comerciais.

Ele não substitui screenshots reais nem deve inventar a interface final dos sites.

## Work Mode 4.5

Este repositório mantém o **Codex nativo como caminho padrão e de rollback**.

Princípios:

- Codex nativo é o agente principal.
- OmniRoute é opcional e nunca substitui o Codex silenciosamente.
- Headroom é opcional e só entra em sessões explicitamente iniciadas com ele.
- Segredos ficam fora do Git (`.env`, chaves e tokens nunca entram no repositório).
- Memória de projeto fica em arquivos explícitos e auditáveis dentro de `docs/context/`.
- Ferramentas experimentais só entram após teste e rollback simples.
- Nenhuma dependência paga vira requisito sem aprovação explícita.

Leia `docs/WORK_MODE_4_5.md` antes de alterar a infraestrutura de agentes.

## Roadmap atual

- [x] Brand Kit real
- [x] Oferta comercial
- [x] Copy completa da Home
- [x] Cases demonstrativos
- [x] Produção dos assets visuais
- [x] Wireframe desktop + mobile
- [x] **Interações e comportamento**
- [x] **Especificação técnica final**
- [x] **Critérios de aceite**
- [ ] Prompt Mestre do Codex

A implementação deve respeitar essa ordem para reduzir improvisação e retrabalho.

## Estrutura relevante do repositório

```text
MenezesDev/
├── AGENTS.md
├── README.md
├── .agents/
│   └── skills/
│       └── menezesdev-image-director/
├── .codex/
├── docs/
│   ├── BRAND_GUIDE.md
│   ├── DEMO_CASES.md
│   ├── IMAGE_GENERATION_RULES.md
│   ├── MCP_IMAGE_PIPELINE_SPEC.md
│   ├── NATIVE_IMAGEGEN_WORKFLOW.md
│   ├── TECHNICAL_SPEC.md
│   ├── ACCEPTANCE_CRITERIA.md
│   ├── wireframes/
│   ├── interactions/
│   └── context/
├── public/
│   └── assets/
│       └── demos/
│           ├── m47/
│           ├── tavola27/
│           └── prismae/
└── tools/
    └── mcp-image/   # implementação histórica/desativada
```

## Documentação principal

- `AGENTS.md` — regras operacionais para agentes.
- `docs/BRAND_GUIDE.md` — identidade da MenezesDev.
- `docs/DEMO_CASES.md` — especificação dos três cases demonstrativos.
- `HOME_COPY.md — MenezesDev.md` — copy aprovada da Home.
- `SERVICES_AND_PRICING.md — MenezesDev.md` — oferta e limites comerciais.
- `docs/IMAGE_GENERATION_RULES.md` — regras globais de produção visual.
- `docs/NATIVE_IMAGEGEN_WORKFLOW.md` — workflow oficial do ImageGen nativo.
- `docs/wireframes/README.md` — composição canônica desktop/mobile.
- `docs/interactions/README.md` — estados e comportamento canônicos.
- `docs/TECHNICAL_SPEC.md` — arquitetura e decisões técnicas canônicas para a implementação futura.
- `docs/ACCEPTANCE_CRITERIA.md` — matriz objetiva de hard gates, release gates, targets e Definition of Done.
- `docs/context/STATE.md` — estado operacional atual.
- `docs/context/DECISIONS.md` — decisões canônicas do projeto.
- `docs/context/HANDOFF.md` — continuidade entre sessões/agentes.

`tools/mcp-image/`, `docs/MCP_IMAGE_PIPELINE_SPEC.md` e `docs/FASE_2_REPORT.md` permanecem para rastreabilidade histórica da implementação MCP substituída; não representam o caminho ativo de geração raster.

## Segurança e custo

- Nenhuma chave de API deve ser commitada.
- O baseline não depende de API paga para geração de imagens.
- Serviços externos pagos devem ser opcionais e explícitos.
- O repositório deve permanecer reproduzível e auditável.

---

**MenezesDev — sites profissionais com direção visual, engenharia e escopo claros.**
