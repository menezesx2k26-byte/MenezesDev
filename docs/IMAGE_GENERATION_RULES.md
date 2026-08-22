# MenezesDev — Regras de Geração de Imagens

**Versão:** 1.0.0  
**Etapa:** 4.5 — pipeline MCP de imagens  
**Status:** regra criativa oficial

## 1. Finalidade

O Codex e o servidor MCP devem gerar ou editar apenas assets raster que tenham uma função concreta no layout e respeitem os briefings oficiais. O pipeline não existe para preencher espaço com imagens genéricas.

## 2. Princípios obrigatórios

1. A função no layout vem antes da estética.
2. O briefing vem antes do improviso.
3. Texto de interface deve ser HTML, não pixels.
4. Logo final, ícone exato, gráfico e diagrama devem ser SVG/frontend, não geração raster.
5. Screenshots de portfólio devem vir do site real implementado.
6. O modelo não pode inventar fatos empresariais, avaliações, métricas, endereços, telefones ou resultados.
7. Assets de um mesmo case precisam parecer parte do mesmo ensaio ou sistema.
8. M47, Tavola 27 e Prismae precisam manter linguagens visuais distintas.
9. Uma imagem aprovada ou em uso não pode ser sobrescrita automaticamente.
10. Toda geração real deve ser rastreável por prompt, parâmetros, metadados e hash.

## 3. Fontes antes da geração

Antes de uma chamada real, ler nesta ordem:

1. instrução específica aprovada para o asset, quando existir;
2. `docs/DEMO_CASES.md`;
3. `docs/BRAND_GUIDE.md` quando o asset pertencer à MenezesDev;
4. este arquivo;
5. preset do projeto;
6. observações estruturadas da chamada.

A primeira geração de uma categoria deve usar `dry_run: true` e o `prompt_preview` deve ser revisado antes de qualquer gasto.

## 4. Classificação do asset

Usar geração raster para hero fotográfico, galeria, fotografia editorial, textura ou fundo. Não usar Image API para logo final, favicon vetorial, gráfico de dados, diagrama exato ou screenshot. Mockups devem preservar screenshots reais; IA pode, no máximo, produzir o cenário ou fundo quando isso fizer sentido.

## 5. Composição para web

O espaço negativo deve ser planejado. Quando o HTML fica à esquerda, o ponto focal normalmente fica à direita e cerca de 38%–45% da largura deve permanecer visualmente calma. Para texto à direita, inverter a lógica. O ponto focal precisa sobreviver ao crop mobile ou deve existir um asset mobile dedicado.

## 6. Anatomia obrigatória do prompt

O prompt final deve ser auditável e usar, quando aplicável, estas seções:

```text
PURPOSE
PROJECT IDENTITY
SCENE / BACKGROUND
SUBJECT
COMPOSITION
LIGHTING AND COLOR
MATERIALS AND TEXTURE
WEB LAYOUT REQUIREMENTS
PRESERVE
CHANGE
CONSTRAINTS
OUTPUT
```

Em edições, separar explicitamente o que muda (`CHANGE`) do que deve permanecer (`PRESERVE`). Preferir uma mudança principal por iteração para reduzir drift.

## 7. Texto, logos e marcas

Não gerar headline, CTA, preço, menu, endereço, avaliação ou logo legível dentro do bitmap. Não inventar logos em fotografias. Evitar marcas reais de terceiros como foco. Logos finais dos demos e da MenezesDev devem ser vetoriais e aplicados pelo frontend ou por composição determinística.

## 8. Pessoas e realismo

Quando houver pessoas, mãos, ferramentas e objetos precisam interagir de forma fisicamente plausível. Evitar pose de stock, pele plástica, anatomia confusa, objetos fundidos e retoque excessivo. Pessoas devem ser fictícias e não devem receber identidade, cargo ou depoimento.

## 9. Formato e qualidade

- padrão web fotográfico: WebP, compressão 85;
- PNG: quando necessário para fluxo intermediário ou alpha em modelo compatível;
- JPEG: apenas para fotografia opaca quando houver motivo;
- `low`: exploração;
- `medium`: candidato padrão de produção;
- `high`: somente quando o detalhe justificar.

A implementação atual bloqueia `background: transparent` com `gpt-image-2` antes da chamada, pois o contrato atual do modelo rejeita essa combinação.

## 10. Convenção de nomes

Usar minúsculas, hífen e sequência com dois dígitos, por exemplo:

```text
m47-hero.webp
m47-gallery-01.webp
tavola27-hero.webp
tavola27-food-01.webp
prismae-office-01.webp
```

Candidatas ainda não aprovadas devem usar `-candidate-01`, `-candidate-02` etc. Não usar nomes como `final-final.webp`, `image1.webp` ou `new-hero.webp`.

## 11. Edição

Toda edição deve preservar explicitamente os invariantes. Se houver máscara, a alteração deve permanecer na região solicitada. Não mudar proporção, sujeito, roupa, luz ou cenário sem pedido. Para `gpt-image-2`, não enviar `input_fidelity`.

## 12. Rastreabilidade

Uma geração real cria, ao lado do asset:

```text
<asset>.webp
<asset>.prompt.md
<asset>.meta.json
```

O metadata deve registrar projeto, tipo, modelo, qualidade, tamanho, formato, data, arquivos-fonte, referências, SHA-256, request ID quando disponível e status.

## 13. Estados

```text
generated → reviewed → approved → in-use
                  ↘ rejected
```

`overwrite` é falso por padrão. Assets `approved` ou `in-use` nunca podem ser sobrescritos pela tool.

## 14. Segurança e custo

A chave da API nunca é argumento de tool e nunca vai para prompt, metadata ou Git. `dry_run` não chama a API e não exige `OPENAI_API_KEY`. Variantes extras só podem ser solicitadas explicitamente. O pipeline usa concorrência e tentativas conservadoras.

## 19. Regras globais de conteúdo

Os negócios demonstrativos são fictícios. Não incluir empresa real apresentada como cliente, CNPJ/telefone/endereço real, avaliação falsa, prêmio, certificação, número de clientes, resultado financeiro, antes/depois enganoso, watermark ou assinatura do gerador. O demo pode parecer convincente, mas deve continuar transparentemente demonstrativo.

## 20. Direção específica — M47 Barber

M47 é urbano, preciso, masculino e contemporâneo. Usar preto profundo, tons quentes e dourado fosco discreto. Fotografia editorial de alto contraste controlado, luz lateral quente, textura real de cabelo/barba, ferramentas plausíveis e ambiente premium sem ostentação. Evitar barber pole, bigode como ícone, caveira, navalhas cruzadas, western, madeira envelhecida dominante, fundo branco, pose de stock e olhar direto para a câmera. No hero, o HTML fica à esquerda; barbeiro e cliente ficam à direita, com espaço negativo real à esquerda.

## 21. Direção específica — Tavola 27

Tavola 27 deve ser quente, simples, tátil e editorial. Priorizar creme, verde, vinho e tons naturais de comida; luz natural ou ambiental suave; massa fresca, louça, ingredientes, cozinha e mesa vivida. Evitar bandeira italiana, mapa da Itália, cantina turística, pizzaria, chef sorrindo para câmera, queijo voando, saturação extrema e comida plástica.

## 22. Direção específica — Prismae

Prismae depende principalmente de grid, tipografia, dados, diagramas e frontend, não de fotografia. Fotografia é opcional e deve parecer editorial, silenciosa e racional. Evitar aperto de mãos, executivos apontando gráficos, equipe sorrindo para notebook, prédios espelhados, skyline, setas, foguetes, alvos, xadrez e stock corporativo azul.

## 23. Direção específica — MenezesDev

Tecnologia premium, escura, contemporânea e comercial. Violeta/magenta são assinatura, não efeito aplicado em tudo. Evitar Matrix, chuva de código, hacker de capuz, robô humanoide genérico, circuitos aleatórios, globo digital, hologramas, excesso de neon, cyberpunk e blobs 3D genéricos de startup.

## 24. Critérios de rejeição

Rejeitar imediatamente quando houver anatomia claramente errada, texto aleatório relevante, watermark, logo inventado, clichê proibido central, alimento plástico, crop mobile inviável, ponto focal sob o HTML, identidade confundida com outro case, UI falsa apresentada como screenshot, dados empresariais inventados ou arquivo incompatível.

## 25. Ciclo de iteração

1. executar `dry_run`;
2. gerar em `low` ou `medium`;
3. revisar contra função, realismo, identidade e integridade;
4. corrigir o maior defeito por vez;
5. implementar no layout;
6. revisar desktop/mobile;
7. promover para `approved` quando realmente aprovado.

## 26. Primeiro teste

O primeiro asset operacional é `public/assets/demos/m47/m47-hero.webp`, em 16:10, com texto HTML à esquerda, foco à direita, `quality: low` e `dry_run: true` antes da primeira chamada paga.
