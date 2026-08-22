# MenezesDev Image Pipeline — MCP Fase 2

Servidor MCP local via STDIO para gerar e editar assets raster usando a Image API da OpenAI. A Fase 2 disponibiliza `generate_hero_image` e `edit_image_asset`, com `dry_run`, prompt estruturado, isolamento do workspace, proteção contra sobrescrita e logs rastreáveis.

## Requisitos

- Node.js 22 ou superior;
- pnpm 11;
- chave da OpenAI API apenas para chamadas reais;
- build antes de conectar o servidor ao Codex.

## Instalação e validação

```bash
cd tools/mcp-image
pnpm install
cp .env.example .env
pnpm check
```

`pnpm check` executa typecheck, build, testes unitários e um smoke test MCP completo por STDIO. Nenhuma chamada paga ocorre durante essa validação.

## Configuração

Variáveis principais:

```bash
OPENAI_API_KEY=
OPENAI_IMAGE_MODEL=gpt-image-2
IMAGEGEN_WORKSPACE_ROOT=/caminho/absoluto/do/repositorio
DEFAULT_OUTPUT_FORMAT=webp
DEFAULT_QUALITY=medium
DEFAULT_OUTPUT_COMPRESSION=85
DEFAULT_BACKGROUND=opaque
OPENAI_MAX_ATTEMPTS=2
OPENAI_TIMEOUT_MS=180000
```

`OPENAI_API_KEY` pode ficar vazia para `dry_run=true`. A implementação atual bloqueia `background: transparent` quando o modelo é `gpt-image-2`, porque o contrato vigente desse modelo rejeita transparência.

## Conectar ao Codex

1. Faça o build com `pnpm build`.
2. Copie `config/codex.config.example.toml` para a configuração do projeto em `.codex/config.toml`.
3. Troque o `cwd` pelo caminho absoluto do repositório.
4. Exporte `OPENAI_API_KEY` e `IMAGEGEN_WORKSPACE_ROOT` no ambiente do Codex.
5. Reinicie a sessão do Codex e confirme as tools com `codex mcp list` ou pela interface disponível.

## Primeiro dry run

Chame `generate_hero_image` com:

```json
{
  "project": "m47",
  "asset_name": "m47-hero",
  "brief_file": "docs/DEMO_CASES.md",
  "output_path": "public/assets/demos/m47/m47-hero.webp",
  "aspect_ratio": "16:10",
  "layout_role": "Hero principal com conteúdo HTML à esquerda",
  "negative_space": "left",
  "text_block_position": "left",
  "focal_point": "right",
  "mobile_strategy": "shared-crop",
  "quality": "low",
  "dry_run": true
}
```

Depois de revisar `prompt_preview`, repita com `dry_run: false`. A ferramenta cria o asset, o `.prompt.md` e o `.meta.json` no mesmo diretório.

## Limites de segurança

- leituras: `docs/**`, `public/assets/**`, `.imagegen/references/**`;
- escrita MenezesDev: `public/assets/menezesdev/**`;
- escrita dos cases: `public/assets/demos/<project>/**`;
- caminhos absolutos, `..`, symlinks de escape e SVG são recusados;
- `overwrite` é falso por padrão;
- assets marcados `approved` ou `in-use` nunca são sobrescritos;
- temporários são isolados em `.imagegen/tmp/**` e limpos após sucesso ou erro.

## Comandos

| Comando | Função |
| --- | --- |
| `pnpm typecheck` | valida TypeScript sem emitir arquivos |
| `pnpm build` | compila `src/**` para `dist/**` |
| `pnpm test` | executa os testes locais sobre o build |
| `pnpm smoke` | abre o servidor via cliente MCP e faz um dry run |
| `pnpm check` | executa toda a validação sem custo de API |
| `pnpm start` | inicia o servidor MCP STDIO compilado |

Não escreva logs em `stdout` dentro do servidor: o canal é reservado ao protocolo MCP. Logs operacionais usam `stderr`.
