# MenezesDev — Workflow nativo de ImageGen

**Versão:** 1.0.0
**Etapa:** 4.5
**Status:** fluxo operacional oficial

## 1. Arquitetura atual

```text
AGENTS.md + briefing + consumidor + referências
                    │
                    ▼
       $menezesdev-image-director
       direção, rota, prompt, revisão
                    │
                    ▼
             $imagegen nativo
          geração ou edição raster
                    │
                    ▼
          inspeção visual em detalhe alto
                    │
                    ▼
  public/assets/** + .prompt.md + .meta.json
```

Não há servidor MCP de imagem, chave de API, endpoint de geração/edição ou faturamento separado da OpenAI API nesse fluxo.

## 2. Papéis

### Diretor de arte

O skill repo-local `.agents/skills/menezesdev-image-director/SKILL.md` transforma os briefings em uma decisão visual executável. Ele não substitui os arquivos de origem: lê, reconcilia e registra as regras aplicadas.

### Gerador raster

`$imagegen` nativo do Codex gera e edita bitmaps. Um output de projeto deve ser copiado ou movido do diretório de geração do Codex para o destino do repositório antes do encerramento da tarefa.

### Código e vetor

SVG e frontend são a rota oficial para logos, marks, favicons vetoriais, gráficos, diagramas, geometria precisa, UI exata e texto de interface.

### Navegador

O navegador valida a implementação real e captura screenshots reais. Ele nunca gera ou substitui fotografia do briefing.

## 3. Preparação

1. Ler todo `AGENTS.md` aplicável e a memória obrigatória do projeto.
2. Inspecionar `git status`, assets existentes e sidecars.
3. Ler a instrução do asset, o componente ou wireframe consumidor e os briefings oficiais.
4. Classificar o asset como raster, SVG/frontend, screenshot real ou composição posterior.
5. Verificar o destino. Não sobrescrever asset existente, aprovado ou em uso.
6. Registrar as referências e o papel de cada uma.

Se o destino existir, usar o próximo nome `-candidate-NN` disponível.

## 4. Geração

O `$menezesdev-image-director` entrega um prompt curto e auditável usando, quando aplicável:

```text
Use case
Asset type
Primary request
Scene/backdrop
Subject
Style/medium
Composition/framing
Lighting/mood
Color palette
Materials/textures
Constraints
Avoid
```

Para hero web, declarar explicitamente:

- proporção pretendida;
- posição do HTML;
- área de espaço negativo protegida;
- posição do ponto focal;
- detalhes que não podem invadir o texto;
- estratégia de crop mobile;
- texto, marcas, watermark e clichês proibidos.

Executar uma chamada nativa por candidata. Não gerar lote de variações aleatórias para escolher depois.

## 5. Materialização do output

O ImageGen nativo salva primeiro em um diretório gerenciado pelo Codex. Para uso no projeto:

1. localizar o arquivo retornado pela geração;
2. inspecionar dimensões e formato reais;
3. converter deterministicamente para o formato final quando necessário;
4. preservar a proporção pedida com crop controlado, sem deformação;
5. gravar no destino do repositório sem sobrescrever;
6. verificar novamente dimensões, formato e abertura do arquivo.

Conversão ou crop mecânico não altera o conteúdo visual e não conta como uma edição criativa. Qualquer mudança de cena, pessoa, objeto, iluminação ou composição volta ao `$imagegen` como edição dirigida.

## 6. Edição com referências

Rotular cada imagem de entrada:

- `edit target` — imagem que será modificada;
- `style reference` — linguagem, textura ou luz;
- `composition reference` — enquadramento e distribuição;
- `supporting insert` — elemento a ser composto.

Para um alvo existente apenas no filesystem, abrir a imagem antes da edição para deixá-la visível no contexto do Codex.

Toda edição deve repetir os invariantes:

```text
CHANGE: <uma falha objetiva>
PRESERVE: <tudo que deve permanecer inalterado>
```

Gerar a edição como novo arquivo, salvo quando a substituição tiver sido explicitamente autorizada e o asset não estiver `approved` ou `in-use`.

## 7. Revisão

Abrir o output em detalhe alto e verificar:

- fidelidade ao projeto e ao briefing;
- realismo, anatomia e interação entre sujeitos e objetos;
- cabelo, barba, pele, ferramentas, comida, materiais e texturas aplicáveis;
- iluminação, contraste e paleta;
- espaço negativo protegido;
- foco na área correta;
- composição desktop;
- crop mobile;
- ausência de texto, watermark, logo inventado, aparência de stock e clichês proibidos.

Uma falha objetiva permite somente uma edição direcionada na primeira rodada. Se a edição ainda falhar, manter o status `generated` ou marcar como `rejected` e reportar o problema; não aprovar por conveniência.

## 8. Promoção de candidatas

Estados:

```text
generated → reviewed → approved → in-use
                  ↘ rejected
```

- `generated`: arquivo materializado e revisado tecnicamente, sem aprovação final.
- `reviewed`: passou por revisão visual documentada.
- `approved`: aprovado por critério explícito ou pelo responsável do projeto.
- `in-use`: integrado ao site.
- `rejected`: falha que impede uso.

A geração automática termina em `generated`. Promoção posterior atualiza o metadata sem alterar o bitmap.

## 9. Convenções de nomes

Assets finais:

```text
<project>-<role>.webp
<project>-<category>-01.webp
```

Candidatas:

```text
<project>-<role>-candidate-01.webp
```

Sidecars usam o mesmo basename:

```text
m47-hero.webp
m47-hero.prompt.md
m47-hero.meta.json
```

Usar minúsculas, hífen e índices de dois dígitos. Nunca usar nomes ambíguos como `final-final`.

## 10. Prompt sidecar

O `.prompt.md` contém:

- data;
- projeto e tipo do asset;
- destino;
- skill diretor;
- gerador `native-imagegen`;
- arquivos lidos;
- referências e seus papéis;
- prompt final exato;
- edição `CHANGE`/`PRESERVE`, quando houver.

Não registrar tokens, chaves, cookies, headers, IDs de sessão ou dados sensíveis.

## 11. Metadata

Estrutura mínima:

```json
{
  "project": "m47",
  "asset_type": "hero",
  "name": "m47-hero",
  "path": "public/assets/demos/m47/m47-hero.webp",
  "generator": "native-imagegen",
  "date": "2026-08-22",
  "aspect_ratio": "16:10",
  "dimensions": { "width": 1536, "height": 960 },
  "format": "webp",
  "briefing_files": [],
  "references": [],
  "status": "generated",
  "suggested_alt": "",
  "review_notes": []
}
```

Pode incluir SHA-256 e detalhes de conversão local. Não incluir credenciais ou informações internas do serviço.

## 12. Integração futura com Canva

Canva recebe apenas:

- assets raster já selecionados;
- SVGs oficiais;
- screenshots reais da implementação;
- textos e dimensões aprovados.

Usos previstos: banners, mockups, montagens desktop/mobile e apresentações. A composição deve preservar o asset e não criar uma fotografia substituta, UI fictícia ou screenshot inventado.

## 13. Falhas e fallback

Se `$imagegen` nativo estiver indisponível, concluir somente documentação, configuração e prompt auditado. Reportar o bloqueio com precisão. Não ativar o MCP histórico, não pedir chave da API e não improvisar com navegador, Canva, stock, placeholder, gradiente ou blob.
