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

## Pipeline MCP de imagens — Etapa 4.5 / Fase 2

O repositório inclui um servidor MCP local via STDIO em `tools/mcp-image/` para geração e edição de assets raster com direção de arte baseada nos briefings do projeto.

Ferramentas disponíveis nesta fase:

- `generate_hero_image`
- `edit_image_asset`

Características principais:

- `dry_run` sem chave e sem custo de geração;
- uso de `gpt-image-2` apenas em execuções reais;
- workspace com allowlist de leitura/escrita;
- bloqueio de path traversal, SVG e sobrescrita indevida;
- assets aprovados/in-use protegidos;
- prompt e metadados rastreáveis com SHA-256;
- nenhuma chave da OpenAI entra no Git.

Documentação:

- `docs/MCP_IMAGE_PIPELINE_SPEC.md`
- `docs/IMAGE_GENERATION_RULES.md`
- `docs/DEMO_CASES.md`
- `docs/BRAND_GUIDE.md`
- `docs/FASE_2_REPORT.md`
- `tools/mcp-image/README.md`

Configuração de exemplo do Codex: `.codex/config.example.toml`.

O primeiro teste previsto é um `dry_run` de `public/assets/demos/m47/m47-hero.webp`. Nenhuma geração paga deve ocorrer antes da revisão do `prompt_preview`.
