# MenezesDev Image Pipeline — Especificação MCP

**Versão:** 1.0.0  
**Etapa:** 4.5  
**Estado atual:** Fase 2 integrada

## 1. Objetivo

Expor ao Codex um servidor MCP local via STDIO capaz de gerar e editar assets raster da MenezesDev e dos cases, com briefing estruturado, workspace seguro, rastreabilidade e controle explícito de custo.

Fluxo:

```text
Codex → tool MCP → validação/workspace → promptBuilder → OpenAI Image API → validação/escrita → asset + sidecars
```

## 2. Decisões técnicas

- transporte: STDIO local;
- runtime: Node.js 22+ / TypeScript / ESM;
- package manager: pnpm 11;
- API: OpenAI Image API;
- modelo padrão: `gpt-image-2`, configurável por ambiente;
- raster somente: PNG/JPEG/WebP;
- SVG, diagramas e gráficos exatos ficam no frontend/vetor;
- screenshots precisam vir do site real;
- geração paga nunca ocorre em `dry_run`.

## 3. Fontes oficiais

Ordem de autoridade:

1. instrução específica aprovada para o asset;
2. `docs/DEMO_CASES.md`;
3. `docs/BRAND_GUIDE.md` quando aplicável;
4. `docs/IMAGE_GENERATION_RULES.md`;
5. preset do projeto;
6. observações estruturadas da chamada.

## 4. Estrutura

```text
tools/mcp-image/
├── package.json
├── src/
│   ├── index.ts
│   ├── server.ts
│   ├── core/
│   ├── tools/
│   └── types/
├── tests/
├── scripts/
├── config/
└── README.md

public/assets/
├── menezesdev/
└── demos/
    ├── m47/
    ├── tavola27/
    └── prismae/
```

Temporários ficam em `.imagegen/tmp/` e não são versionados.

## 5. Tools da Fase 2

### `generate_hero_image`

Gera um hero raster com composição coerente com o layout HTML. Entradas principais: `project`, `asset_name`, `brief_file`, `output_path`, `aspect_ratio`, `layout_role`, `negative_space`, `text_block_position`, `focal_point`, `mobile_strategy`, `quality`, `reference_images`, `dry_run` e `overwrite`.

Quando há referências, a chamada real usa edição para aumentar fidelidade. `dry_run` valida inputs, resolve arquivos e monta o prompt sem chamar a API.

### `edit_image_asset`

Edita um ou mais assets existentes. Entradas principais: `project`, `source_images`, `mask_file` opcional, `brief_file`, `output_path`, `change_request`, `preserve`, `quality`, `background`, `dry_run` e `overwrite`.

A edição separa o que muda do que deve permanecer. Máscara precisa ser PNG, menor que 4 MB e compatível com as dimensões da primeira imagem.

## 6. Workspace e segurança

Leitura permitida:

- `docs/**`;
- `public/assets/**`;
- `.imagegen/references/**`.

Escrita permitida:

- MenezesDev: `public/assets/menezesdev/**`;
- M47: `public/assets/demos/m47/**`;
- Tavola 27: `public/assets/demos/tavola27/**`;
- Prismae: `public/assets/demos/prismae/**`;
- temporários: `.imagegen/tmp/**`.

O servidor bloqueia caminhos absolutos recebidos pela tool, path traversal, escape por symlink, extensões não raster e sobrescrita implícita. Assets marcados `approved` ou `in-use` permanecem protegidos mesmo com `overwrite=true`.

## 7. Configuração

Variáveis:

```text
OPENAI_API_KEY=
OPENAI_IMAGE_MODEL=gpt-image-2
IMAGEGEN_WORKSPACE_ROOT=
DEFAULT_OUTPUT_FORMAT=webp
DEFAULT_QUALITY=medium
DEFAULT_OUTPUT_COMPRESSION=85
DEFAULT_BACKGROUND=opaque
OPENAI_MAX_ATTEMPTS=2
OPENAI_TIMEOUT_MS=180000
```

A chave só é exigida em execução real. Nunca deve ser commitada ou recebida como argumento de tool.

## 8. Compatibilidade do modelo

A implementação atual bloqueia `background: transparent` para `gpt-image-2` antes da API, porque o contrato atual do modelo não aceita essa combinação. Também não envia `input_fidelity` ao modelo.

## 9. Persistência

Para cada geração real:

```text
m47-hero.webp
m47-hero.prompt.md
m47-hero.meta.json
```

A escrita é transacional: staging em `.imagegen/tmp/<run-id>`, validação de bytes/formato/dimensões, SHA-256, promoção atômica e rollback em falha.

## 10. Retorno e erros

Sucesso retorna `success`, `status`, projeto, tipo do asset, paths, modelo, tamanho, qualidade, formato, `prompt_preview`, request ID quando disponível e warnings. Erros são normalizados e indicam se a falha é retryable.

## 11. Testes da Fase 2

O pacote entregue registrou:

- TypeScript typecheck aprovado;
- build aprovado;
- 9 testes locais aprovados e 0 falhas;
- smoke MCP STDIO aprovado;
- tools anunciadas: `edit_image_asset` e `generate_hero_image`;
- nenhuma chamada paga executada.

A integração no repositório deve repetir `pnpm check` na máquina de desenvolvimento antes da primeira geração real.

## 12. Codex

Configuração de exemplo: `.codex/config.example.toml`.

Após `pnpm build`, o MCP aponta para `tools/mcp-image/dist/index.js`, com `cwd` igual à raiz absoluta do repositório e as variáveis `OPENAI_API_KEY`, `OPENAI_IMAGE_MODEL` e `IMAGEGEN_WORKSPACE_ROOT` herdadas do ambiente.

## 13. Primeiro dry run

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

Revisar o `prompt_preview`. Somente depois disso considerar `dry_run: false`.

## 14. Próximas fases

Fase 3 adicionará `generate_brand_image`, `generate_gallery_image` e `generate_mockup_image`. A Etapa 5 usará o pipeline para produzir os assets reais dos demos e da Home da MenezesDev.
