# MenezesDev — Etapa 4.5 / Relatório da Fase 2

| Campo | Resultado |
| --- | --- |
| Status | Concluída localmente |
| Data | 22 de agosto de 2026 |
| Transporte | MCP STDIO |
| Runtime | Node.js 22+ / TypeScript |
| Modelo padrão | `gpt-image-2` |
| Tools entregues | `generate_hero_image`, `edit_image_asset` |
| Teste pago | Não executado |

## Entregas

- servidor MCP compilável via STDIO;
- cliente oficial da OpenAI Image API;
- geração e edição com referências;
- `promptBuilder` baseado em brief, regras e preset do projeto;
- presets de MenezesDev, M47, Tavola 27 e Prismae;
- validação de tamanho, formato, compressão e compatibilidade do modelo;
- workspace isolado com allowlists de leitura e escrita;
- bloqueio de path traversal, SVG, symlink de escape e sobrescrita indevida;
- proteção de assets com estado `approved` ou `in-use`;
- escrita transacional com temporários, rollback e SHA-256;
- logs `.prompt.md` e metadados `.meta.json`;
- `dry_run` completo sem chave e sem escrita do asset;
- configuração de exemplo para o Codex;
- testes unitários e smoke MCP por STDIO.

## Validação executada

```text
TypeScript typecheck: aprovado
TypeScript build: aprovado
Testes locais: 9 aprovados, 0 falhas
Smoke MCP STDIO: aprovado
Tools anunciadas: edit_image_asset, generate_hero_image
```

Os testes cobrem tamanho, transparência incompatível, bloqueio de SVG, path traversal, proteção de asset aprovado, geração de prompt M47, hero em dry run sem chave, máscara inválida e edição válida em dry run.

## Decisão de compatibilidade

O contrato atual do `gpt-image-2` rejeita fundo transparente. A implementação bloqueia `background: transparent` antes de chamar a API. O tipo comum mantém a opção para uma futura troca por modelo compatível.

O parâmetro `input_fidelity` não é enviado ao `gpt-image-2`.

## Limite desta validação

Nenhuma geração real foi feita nesta fase, evitando custo antes da auditoria do prompt. A primeira chamada paga recomendada continua sendo `m47-hero.webp`, em qualidade baixa, depois de revisar o retorno de `dry_run`.

## Próxima ação recomendada

Integrar a pasta `tools/mcp-image` ao repositório real, configurar `.codex/config.toml`, exportar `OPENAI_API_KEY` e `IMAGEGEN_WORKSPACE_ROOT`, executar o dry run do hero M47 e só então autorizar a primeira geração real.
