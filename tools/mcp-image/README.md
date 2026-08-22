# MenezesDev Image Pipeline — implementação histórica

> **Descontinuado para geração real desde 2026-08-22.** Este pacote não faz parte do fluxo ativo e não deve ser conectado ao Codex, receber credenciais ou produzir assets.

Esta pasta preserva a implementação da Etapa 4.5 / Fase 2 baseada em MCP STDIO e OpenAI Image API para fins de histórico, auditoria e eventual consulta de decisões técnicas.

O fluxo oficial atual é:

```text
briefing do repositório
  → $menezesdev-image-director
  → $imagegen nativo
  → revisão visual
  → asset + sidecars no repositório
```

Consulte:

- `docs/NATIVE_IMAGEGEN_WORKFLOW.md` para o processo ativo;
- `docs/IMAGE_GENERATION_RULES.md` para as regras criativas;
- `docs/MCP_IMAGE_PIPELINE_SPEC.md` para o mapeamento entre a implementação histórica e a arquitetura atual.

## O que continua útil aqui

- leitura de briefing e isolamento por projeto;
- presets de identidade;
- convenções de caminhos e nomes;
- proteção contra sobrescrita;
- estrutura de prompt auditável;
- metadados e validação de arquivos;
- testes históricos dessas garantias.

## O que não deve mais ser usado

- servidor `menezesdev_image`;
- tools `generate_hero_image` e `edit_image_asset`;
- cliente e endpoints da OpenAI Image API;
- configuração por chave ou modelo de API;
- `pnpm start`, `pnpm smoke` ou chamadas reais para produção de assets.

Os fontes e testes permanecem intactos como registro. Alterações futuras nesta pasta exigem uma decisão arquitetural explícita; não reative o MCP por conveniência.
