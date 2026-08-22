# MenezesDev Image Pipeline — especificação histórica e migração

**Versão:** 2.0.0
**Etapa:** 4.5
**Estado atual:** MCP descontinuado; substituído pelo ImageGen nativo em 2026-08-22

## 1. Decisão vigente

A implementação baseada em servidor MCP local e OpenAI Image API foi retirada do fluxo ativo. A geração e edição raster agora usam:

```text
briefing do repositório
  → $menezesdev-image-director
  → $imagegen nativo do Codex
  → revisão visual
  → asset + prompt + metadata no repositório
```

O fluxo não exige `OPENAI_API_KEY`, faturamento separado da OpenAI API, `images.generate`, `images.edit`, processo STDIO local ou configuração de tool MCP.

## 2. Configuração desativada

O servidor `menezesdev_image` não deve aparecer em `.codex/config.toml` nem na configuração versionada de exemplo. As antigas tools `generate_hero_image` e `edit_image_asset` não fazem parte do contrato operacional.

Nenhuma configuração global do usuário é alterada por esta migração. Se uma configuração global antiga ainda existir em outra máquina, sua remoção exige autorização e deve ser feita separadamente.

## 3. Implementação histórica preservada

`tools/mcp-image/` permanece no repositório como registro técnico. Não apagar ou reutilizar silenciosamente.

```text
tools/mcp-image/
├── package.json
├── src/
│   ├── core/
│   ├── tools/
│   ├── index.ts
│   └── server.ts
├── tests/
├── scripts/
└── config/
```

O diretório está fora do fluxo ativo e não deve:

- receber credenciais;
- ser conectado ao Codex;
- executar geração ou edição real;
- ser tratado como dependência de produção de assets;
- servir como fallback automático quando o ImageGen nativo estiver indisponível.

## 4. Partes exclusivamente ligadas à API

Estas partes são históricas e não são portadas para o fluxo nativo:

- cliente `OpenAIImageClient`;
- dependência do SDK `openai` para geração;
- endpoints de geração e edição de imagens;
- seleção de modelo por ambiente;
- chave, tentativas, timeout e request ID da API;
- transporte MCP STDIO e registro das tools;
- `dry_run` como porta de entrada para posterior chamada paga;
- parâmetros específicos de qualidade, compressão e compatibilidade do modelo.

Elas podem continuar presentes no código histórico, mas não em configuração, documentação operacional ou comandos de produção.

## 5. Garantias preservadas

As seguintes decisões continuam obrigatórias no fluxo nativo:

- leitura do briefing antes da geração;
- identidade isolada por projeto;
- função do asset no layout;
- espaço negativo e posição do ponto focal;
- crop desktop/mobile;
- nomes determinísticos e candidatas versionadas;
- referências com papel explícito;
- proteção contra sobrescrita;
- prompt auditável;
- sidecar de metadata;
- revisão visual antes de aprovação;
- SVG/frontend para logos, marcas, gráficos, diagramas, geometria e UI exata;
- screenshots somente do site real.

## 6. Fontes oficiais

Ordem de autoridade:

1. `AGENTS.md` aplicável;
2. instrução específica do asset;
3. componente ou wireframe consumidor, quando existir;
4. `docs/DEMO_CASES.md`;
5. `docs/IMAGE_GENERATION_RULES.md`;
6. `docs/BRAND_GUIDE.md` quando aplicável;
7. referências explicitamente fornecidas.

## 7. Responsabilidades atuais

### `$menezesdev-image-director`

O skill repo-local em `.agents/skills/menezesdev-image-director/SKILL.md`:

- classifica a rota correta do asset;
- lê briefing e consumidor;
- preserva a identidade do projeto;
- define composição, espaço negativo e crop;
- consolida restrições e referências;
- entrega um prompt auditável;
- conduz a revisão visual e, quando necessário, uma edição direcionada.

### `$imagegen`

O skill nativo do Codex executa a geração ou edição raster sem chave da OpenAI API. Outputs destinados ao projeto são materializados no repositório; não permanecem apenas no diretório de geração do Codex.

## 8. Persistência

Cada asset materializado recebe:

```text
m47-hero.webp
m47-hero.prompt.md
m47-hero.meta.json
```

O metadata registra o gerador `native-imagegen`, dimensões reais, formato, data, fontes, referências, status, alt text sugerido e observações da revisão. Hash é recomendado quando disponível.

## 9. Edição

Uma edição nativa usa a imagem visível como alvo e declara:

```text
CHANGE: uma correção objetiva
PRESERVE: composição, identidade, luz, sujeito e demais invariantes
```

Não reescrever o prompt inteiro para variar aleatoriamente. Se a edição nativa não estiver disponível, interromper a etapa visual e reportar o bloqueio; não reativar o MCP ou a API.

## 10. Canva e screenshots

Canva entra somente depois da aprovação dos assets, para banners, mockups, montagens desktop/mobile e apresentações editáveis. Screenshots usados nessas composições devem ser capturados da implementação real validada no navegador.

## 11. Validação da migração

A migração está correta quando:

- não existe stanza ativa `mcp_servers.menezesdev_image` no projeto;
- nenhuma instrução operacional pede chave da API para gerar assets;
- `tools/mcp-image/` está explicitamente marcado como histórico;
- as regras apontam para os dois skills;
- o destino é protegido contra sobrescrita;
- prompts e metadados permanecem auditáveis;
- o primeiro hero M47 é revisado em desktop e mobile antes de promoção.

## 12. Reativação

Reativar o MCP histórico exigiria uma nova decisão arquitetural explícita, análise de custo e segurança, atualização documental e autorização do usuário. Não existe fallback implícito para ele.
