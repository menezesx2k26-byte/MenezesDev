# MenezesDev — Regras de Geração de Imagens

**Versão:** 2.0.0
**Etapa:** 4.5 — ImageGen nativo do Codex
**Status:** regra criativa oficial

## 1. Finalidade

Gerar ou editar apenas assets raster com função concreta no layout e aderência aos briefings oficiais. O pipeline não existe para preencher espaço com imagens genéricas.

## 2. Arquitetura obrigatória

O fluxo oficial é:

```text
briefing do repositório
  → $menezesdev-image-director
  → $imagegen nativo
  → revisão visual
  → asset + prompt + metadata no repositório
```

- `$menezesdev-image-director` interpreta briefing, identidade, função no layout, referências, nomes e critérios de revisão.
- `$imagegen` nativo é o gerador e editor raster oficial.
- Nenhuma etapa depende de `OPENAI_API_KEY`, faturamento separado da OpenAI API, `images.generate`, `images.edit` ou MCP de imagem.
- Canva é reservado para composições editáveis posteriores com assets já aprovados.
- O navegador serve somente para validar o site implementado e capturar screenshots reais.
- Logos, marcas, ícones, gráficos, diagramas, geometria exata e UI fiel são construídos como SVG ou frontend.

## 3. Princípios obrigatórios

1. A função no layout vem antes da estética.
2. O briefing vem antes do improviso.
3. Texto de interface deve ser HTML, não pixels.
4. Screenshots de portfólio devem vir do site real implementado.
5. O gerador não pode inventar fatos empresariais, avaliações, métricas, endereços, telefones ou resultados.
6. Assets de um mesmo case precisam parecer parte do mesmo ensaio ou sistema.
7. M47, Tavola 27 e Prismae precisam manter linguagens visuais distintas.
8. Uma imagem aprovada ou em uso não pode ser sobrescrita automaticamente.
9. Toda geração materializada deve ser rastreável por prompt, fontes, referências e metadados.
10. Gerar uma candidata por vez e corrigir somente falhas objetivas.

## 4. Fontes antes da geração

Ler, nesta ordem:

1. `AGENTS.md` aplicável;
2. instrução específica aprovada para o asset;
3. componente, wireframe ou contrato de layout que consumirá o asset, quando existir;
4. `docs/DEMO_CASES.md`;
5. este arquivo;
6. `docs/BRAND_GUIDE.md` quando aplicável;
7. referências visuais explicitamente fornecidas.

Registrar no sidecar quais arquivos foram lidos e quais referências foram usadas. Não transformar imagem externa genérica em referência aprovada por inferência.

## 5. Classificação do asset

Usar geração raster para hero fotográfico, galeria, fotografia editorial, textura, fundo fotográfico ou cena para mockup. Não usar geração raster para logo final, favicon vetorial, gráfico de dados, diagrama exato, UI fiel ou screenshot.

Canva pode montar banners, apresentações e composições desktop/mobile depois que os assets e screenshots reais estiverem aprovados. Ele não é o gerador fotográfico principal.

## 6. Composição para web

O espaço negativo deve ser planejado. Quando o HTML fica à esquerda, o ponto focal normalmente fica à direita e cerca de 38%–45% da largura deve permanecer visualmente calma. Para texto à direita, inverter a lógica.

O prompt deve dizer:

- onde ficará o HTML;
- qual área precisa permanecer limpa;
- onde está o ponto focal;
- quais detalhes não podem invadir a área de texto;
- como a narrativa sobrevive ao crop mobile.

Se a composição não resistir ao crop mobile, usar um asset mobile dedicado em vez de aprovar um hero frágil.

## 7. Anatomia do prompt auditável

Usar a estrutura do `$imagegen`, mantendo apenas os campos aplicáveis:

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

Em edições, acrescentar explicitamente:

```text
CHANGE
PRESERVE
```

Preferir uma mudança principal por iteração para reduzir drift.

## 8. Texto, logos e marcas

Não gerar headline, CTA, preço, menu, endereço, avaliação ou logo legível dentro do bitmap. Não inventar logos em fotografias. Evitar marcas reais de terceiros como foco. Logos finais dos demos e da MenezesDev devem ser vetoriais e aplicados pelo frontend ou por composição determinística.

## 9. Pessoas e realismo

Quando houver pessoas, mãos, ferramentas e objetos precisam interagir de forma fisicamente plausível. Evitar pose de stock, pele plástica, anatomia confusa, objetos fundidos e retoque excessivo. Pessoas devem ser fictícias e não devem receber identidade, cargo ou depoimento.

## 10. Formato e dimensões

- proporção e crop são definidos pela função no layout;
- padrão final para fotografia web: WebP;
- PNG é permitido como saída nativa intermediária ou quando alpha for necessário;
- JPEG só é usado para fotografia opaca quando houver motivo;
- o arquivo final deve ser convertido de forma determinística quando a saída nativa não estiver no formato solicitado;
- registrar dimensões reais, não dimensões presumidas.

Conversão de formato e crop não autorizam alterar conteúdo visual, inventar elementos ou sobrescrever um asset existente.

## 11. Convenção de nomes

Usar minúsculas, hífen e sequência com dois dígitos:

```text
m47-hero.webp
m47-gallery-01.webp
tavola27-hero.webp
tavola27-food-01.webp
prismae-office-01.webp
```

Se o destino já existir, usar `-candidate-01`, `-candidate-02` etc. Nunca usar `final-final.webp`, `image1.webp` ou `new-hero.webp`.

## 12. Referências

Toda imagem de entrada deve ter papel explícito: referência de estilo, referência de composição, alvo de edição ou inserção. Para edição nativa de arquivo local, abrir primeiro a imagem para torná-la visível ao fluxo do Codex. Referências não autorizam copiar logos, pessoas identificáveis ou marcas de terceiros.

## 13. Edição

Uma edição deve declarar uma falha objetiva e preservar os invariantes. Usar:

```text
CHANGE: <uma correção direcionada>
PRESERVE: <identidade, composição, luz, sujeito e demais invariantes>
```

Não mudar proporção, sujeito, roupa, luz, cenário ou crop sem pedido. Para a primeira candidata, permitir no máximo uma edição direcionada antes de reportar o resultado.

## 14. Revisão visual

Abrir a imagem em detalhe alto e verificar:

- aderência ao briefing e à identidade do projeto;
- realismo, anatomia e interação entre pessoas, objetos e ferramentas;
- materiais, cabelo, barba, pele, comida ou outros detalhes críticos;
- iluminação, cor, contraste e textura;
- espaço negativo e posição do foco;
- crop desktop e crop mobile;
- ausência de texto aleatório, watermark, logo inventado, aparência de stock e clichês proibidos.

Não aprovar automaticamente. O status inicial é sempre `generated`.

## 15. Rastreabilidade

Ao materializar um asset, criar ao lado:

```text
<asset>.webp
<asset>.prompt.md
<asset>.meta.json
```

O metadata deve registrar, no mínimo:

- projeto;
- tipo e nome do asset;
- caminho;
- gerador `native-imagegen`;
- data;
- proporção;
- dimensões reais;
- formato;
- arquivos de briefing lidos;
- referências utilizadas;
- status `generated`;
- sugestão de alt text;
- observações da revisão.

Hash do arquivo pode ser acrescentado quando a ferramenta local disponível permitir.

## 16. Estados e proteção contra sobrescrita

```text
generated → reviewed → approved → in-use
                  ↘ rejected
```

Assets `approved` ou `in-use` nunca podem ser sobrescritos automaticamente. Se o destino existir sem autorização explícita de substituição, criar uma candidata versionada.

## 17. Segurança, custo e rotas proibidas

Não pedir, ler, registrar ou configurar chave da OpenAI API para gerar assets. Não usar o MCP histórico `menezesdev_image`, automação do ChatGPT pelo navegador, Canva como gerador fotográfico, stock genérico, placeholder, gradiente ou blob como substituto silencioso.

Prompts, metadata e logs não podem conter chaves, tokens, cookies ou dados sensíveis.

## 18. Regras globais de conteúdo

Os negócios demonstrativos são fictícios. Não incluir empresa real apresentada como cliente, CNPJ/telefone/endereço real, avaliação falsa, prêmio, certificação, número de clientes, resultado financeiro, antes/depois enganoso, watermark ou assinatura do gerador. O demo pode parecer convincente, mas deve continuar transparentemente demonstrativo.

## 19. Direção específica — M47 Barber

M47 é urbano, preciso, masculino e contemporâneo. Usar preto profundo, tons quentes e dourado fosco discreto. Fotografia editorial de alto contraste controlado, luz lateral quente, textura real de cabelo/barba, ferramentas plausíveis e ambiente premium sem ostentação.

Evitar barber pole, bigode como ícone, caveira, navalhas cruzadas, western, madeira envelhecida dominante, fundo branco, pose de stock e olhar direto para a câmera. No hero, o HTML fica à esquerda; barbeiro e cliente ficam à direita, com espaço negativo real à esquerda e composição resistente ao crop mobile.

## 20. Direção específica — Tavola 27

Tavola 27 deve ser quente, simples, tátil e editorial. Priorizar creme, verde, vinho e tons naturais de comida; luz natural ou ambiental suave; massa fresca, louça, ingredientes, cozinha e mesa vivida. Evitar bandeira italiana, mapa da Itália, cantina turística, pizzaria, chef sorrindo para câmera, queijo voando, saturação extrema e comida plástica.

## 21. Direção específica — Prismae

Prismae depende principalmente de grid, tipografia, dados, diagramas e frontend, não de fotografia. Fotografia é opcional e deve parecer editorial, silenciosa e racional. Evitar aperto de mãos, executivos apontando gráficos, equipe sorrindo para notebook, prédios espelhados, skyline, setas, foguetes, alvos, xadrez e stock corporativo azul.

## 22. Direção específica — MenezesDev

Tecnologia premium, escura, contemporânea e comercial. Violeta/magenta são assinatura, não efeito aplicado em tudo. Evitar Matrix, chuva de código, hacker de capuz, robô humanoide genérico, circuitos aleatórios, globo digital, hologramas, excesso de neon, cyberpunk e blobs 3D genéricos de startup.

## 23. Critérios de rejeição

Rejeitar quando houver anatomia claramente errada, texto aleatório relevante, watermark, logo inventado, clichê proibido central, alimento plástico, crop mobile inviável, ponto focal sob o HTML, identidade confundida com outro case, UI falsa apresentada como screenshot, dados empresariais inventados ou arquivo incompatível.

## 24. Ciclo de iteração

1. auditar o briefing e o destino com `$menezesdev-image-director`;
2. preparar um prompt final auditável;
3. gerar uma candidata com `$imagegen` nativo;
4. revisar em detalhe alto;
5. fazer no máximo uma edição direcionada para a falha objetiva mais importante;
6. materializar asset e sidecars;
7. implementar no layout e revisar desktop/mobile;
8. promover para `approved` somente após aprovação humana ou critério explícito do projeto.

## 25. Primeiro asset operacional

O primeiro asset é `public/assets/demos/m47/m47-hero.webp`, em 16:10, com conteúdo HTML à esquerda, foco à direita e status inicial `generated`.
