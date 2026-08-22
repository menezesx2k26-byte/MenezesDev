# MenezesDev

Repositório principal do site e do ambiente de trabalho da MenezesDev.

## Work Mode 4.5

Este repositório usa uma camada operacional pensada para manter o **Codex como agente principal**, sem exigir Claude Code pago e sem adicionar custo obrigatório de API.

Princípios:

- Codex nativo é o caminho padrão.
- OmniRoute é opcional e nunca substitui o Codex silenciosamente.
- Headroom é opcional e entra somente em sessões explicitamente iniciadas com ele.
- Segredos ficam fora do Git (`.env`, chaves e tokens nunca entram no repositório).
- Memória de projeto fica em arquivos explícitos e auditáveis dentro de `docs/context/`.
- Ferramentas experimentais só entram depois de teste e rollback simples.
- Nenhuma dependência paga vira requisito sem aprovação explícita.

Leia `docs/WORK_MODE_4_5.md` antes de alterar a infraestrutura de agentes.

## Pipeline nativo de imagens — Etapa 4.5

Assets raster usam o fluxo nativo do Codex:

```text
briefing do repositório
  → $menezesdev-image-director
  → $imagegen nativo
  → revisão visual
  → asset + prompt + metadata no repositório
```

Esse caminho não usa `OPENAI_API_KEY`, faturamento separado da OpenAI API, `images.generate`, `images.edit` ou MCP de imagem. O skill de direção de arte fica em `.agents/skills/menezesdev-image-director/`.

Canva é reservado para composições editáveis posteriores. Screenshots são capturados apenas do site implementado. Logos, marcas, gráficos, diagramas e UI exata são produzidos como SVG ou frontend.

Documentação:

- `docs/MCP_IMAGE_PIPELINE_SPEC.md`
- `docs/IMAGE_GENERATION_RULES.md`
- `docs/NATIVE_IMAGEGEN_WORKFLOW.md`
- `docs/DEMO_CASES.md`
- `docs/BRAND_GUIDE.md`
- `docs/FASE_2_REPORT.md`
- `tools/mcp-image/README.md`

`tools/mcp-image/` e `docs/FASE_2_REPORT.md` permanecem apenas como registro histórico da implementação substituída.
