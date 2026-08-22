# MenezesDev — Wireframes canônicos

**Fase:** 6 — wireframes desktop + mobile
**Status:** fechado para orientar a Fase 7; sem implementação
**Escopo:** composição, hierarquia, conteúdo e comportamento responsivo

## 1. Arquivos canônicos

- `MENEZESDEV.md` — Home comercial e página reutilizável de case.
- `M47.md` — landing page M47 Barber.
- `TAVOLA27.md` — Home e regras das páginas internas do Tavola 27.
- `PRISMAE.md` — Home e regras das páginas internas da Prismae.

Os diagramas são mapas de composição, não telas finais. Medidas são alvos de projeto e podem variar de forma controlada durante a implementação, desde que a hierarquia e os contratos de conteúdo sejam preservados.

## 2. Fontes obrigatórias

Estes wireframes foram definidos a partir de:

- `AGENTS.md`;
- `docs/BRAND_GUIDE.md`;
- `docs/DEMO_CASES.md`;
- `HOME_COPY.md — MenezesDev.md`;
- `SERVICES_AND_PRICING.md — MenezesDev.md`;
- `docs/IMAGE_GENERATION_RULES.md`;
- `docs/NATIVE_IMAGEGEN_WORKFLOW.md`;
- `docs/context/STATE.md`;
- `docs/context/DECISIONS.md`;
- assets finais existentes em `public/assets/`.

## 3. Precedência de conteúdo

Há um conflito histórico controlado: a copy aprovada da Home ainda chama os cases de **Atlas Barber**, **Casa Nostra** e **Nexa Consultoria**, enquanto o briefing final, as identidades e os assets aprovados consolidaram **M47 Barber**, **Tavola 27** e **Prismae**.

Para a composição e para a implementação futura:

1. `docs/DEMO_CASES.md` e os assets finais são a autoridade para nome, categoria, identidade e correspondência comercial de cada case;
2. as seções 9–11 de `HOME_COPY.md — MenezesDev.md` continuam sendo a fonte das headlines, descrições, tags, CTA e label dos três cards, sem reescrita;
3. toda a outra copy da Home permanece literal e integralmente vinculada ao documento aprovado;
4. preços, escopo, prazos e ressalvas comerciais vêm de `SERVICES_AND_PRICING.md — MenezesDev.md`;
5. nenhum depoimento, cliente, resultado, estatística ou alegação nova pode preencher lacunas.

Essa precedência troca somente as identidades provisórias dos três cards pelos cases finais. Não autoriza revisão criativa da copy.

## 4. Viewports e grids de referência

| Faixa | Viewport de referência | Conteúdo máximo | Gutters | Colunas | Gap |
|---|---:|---:|---:|---:|---:|
| Desktop | 1440 px | 1240 px | 32 px mínimo | 12 | 24 px |
| Tablet | 768–1023 px | fluido | 24 px | 8 | 20 px |
| Mobile | 390 px | 350 px | 20 px | 4 | 12 px |
| Mobile estreito | 320 px | 288 px | 16 px | 4 | 12 px |

Regras compartilhadas:

- acima de 1240 px, o respiro lateral cresce e o conteúdo permanece centralizado;
- abaixo de 1024 px, composições 5/7 ou 4/8 passam para 4/4 ou para empilhamento;
- abaixo de 768 px, o fluxo principal é uma coluna; duas colunas só permanecem para conteúdo curto e comparável;
- texto corrido usa no máximo 65–72 caracteres por linha no desktop e a largura disponível no mobile;
- imagens nunca são esticadas; `object-fit: cover` só é usado com posição e crop definidos neste contrato;
- o conteúdo HTML não pode ser incorporado a fotografias, screenshots ou gráficos.

## 5. Ritmo e alturas

| Elemento | Desktop | Mobile |
|---|---:|---:|
| Header | 72–80 px | 60–64 px |
| Hero comercial | 680–760 px | 620–760 px conforme mídia |
| Hero de demo | 720–820 px | copy 300–380 px + mídia 420–520 px |
| Seção de conteúdo | 520–760 px | altura pelo conteúdo; padding 64–88 px |
| Seção curta/CTA | 220–420 px | 280–420 px |
| Intervalo principal entre seções | 96–128 px | 64–88 px |
| Intervalo interno entre blocos | 32–64 px | 24–40 px |

Alturas não são fixas quando a copy exige mais espaço. O objetivo é impedir compressão e também evitar grandes áreas vazias sem função.

## 6. Contratos estruturais compartilhados

### Headers

- Desktop: marca à esquerda, navegação no centro/direita e CTA principal na extremidade direita.
- Mobile: marca à esquerda e acionador de menu à direita; links e CTA aparecem em painel de navegação. Não reduzir todos os links a uma linha ilegível.
- O comportamento pode ser `sticky`, mas altura, contraste e área clicável devem permanecer estáveis. Efeitos visuais do estado sticky pertencem à Fase 7.

### CTAs

- Um CTA primário por zona visual.
- Pares de CTA ficam lado a lado no desktop e empilham ou quebram em duas linhas no mobile.
- CTAs de reserva, agenda e diagnóstico das demos continuam demonstrativos; não simulam uma operação real silenciosamente.

### Mídia

- A composição usa somente os assets finais inventariados.
- Nenhuma moldura pode fingir ser screenshot de um site ainda não implementado.
- Slots de screenshot nas páginas de case são condicionais: só aparecem depois da captura do site real.
- Logos e gráficos SVG permanecem vetoriais; fotografias permanecem WebP.

### Acessibilidade de composição

- Ordem visual e ordem de leitura devem coincidir no mobile.
- Conteúdo essencial não depende de texto sobre áreas detalhadas de fotografia.
- Gráficos com texto pequeno ganham alternativa HTML no mobile, em vez de serem apenas reduzidos.
- Galerias mantêm alt text dos sidecars; imagens decorativas repetidas podem receber alt vazio na implementação.

## 7. Registro dos assets e função principal

| Projeto | Asset | Função definida na Fase 6 |
|---|---|---|
| MenezesDev | nenhum asset próprio disponível | hero composto com recortes dos três cases; nenhum mockup fictício |
| MenezesDev | M47 hero, Tavola hero, Prismae hero graphic | prova visual dos três produtos na Home e capas dos cases |
| M47 | `m47-hero.webp` | hero 16:10, copy à esquerda, foco à direita |
| M47 | `m47-gallery-01.webp` a `06.webp` | corte, barba, detalhes, ferramentas, ambiente e retrato editorial |
| M47 | `m47-logo.svg`, `m47-mark.svg` | header/footer e assinatura de seção |
| Tavola 27 | `tavola27-hero.webp` | hero com copy à esquerda e mesa à direita |
| Tavola 27 | `tavola27-food-01.webp` a `04.webp` | destaques do menu e ritmo editorial |
| Tavola 27 | `tavola27-space-01.webp` a `03.webp` | história, ambiente, cozinha e páginas internas |
| Tavola 27 | `tavola27-detail-01.webp`, `02.webp` | manifesto, preparação e detalhes táteis |
| Tavola 27 | `tavola27-logo.svg` | header/footer |
| Prismae | `prismae-hero-graphic.svg` | hero e síntese visual do sistema de gestão |
| Prismae | `prismae-process.svg` | metodologia no desktop; conteúdo HTML equivalente no mobile |
| Prismae | `prismae-logo.svg` | header/footer |

## 8. Distinção obrigatória entre os três demos

| Case | Ritmo dominante | Relação imagem/conteúdo | Mobile |
|---|---|---|---|
| M47 | compacto, escuro, alto contraste | hero cinematográfico e galeria assimétrica técnica | copy separada da mídia; sequência fotográfica direta |
| Tavola 27 | editorial, quente, pausado | imagens grandes, alternância de retrato/paisagem e respiros | leitura em capítulos e galeria por trilho horizontal |
| Prismae | racional, claro, modular | tipografia, cards, números, gráficos e formulário | módulos empilhados; gráfico de processo vira HTML |

Nenhum dos três usa a mesma sequência visual com uma paleta diferente.

## 9. Limites desta fase

Ficam deliberadamente para a Fase 7:

- estados sticky finais, menu aberto e comportamento de accordion;
- animações, transições, hover e microinterações;
- sombras, bordas, raios e gradientes finais;
- tipografia fina, quebras finais de linha e escala interpolada;
- validação em navegador e screenshots reais;
- implementação de formulário, WhatsApp, mapa, reserva ou agenda;
- analytics, SEO técnico e infraestrutura;
- promoção de assets de `generated` para `in-use`.

Não há componente, framework ou código de frontend iniciado por estes documentos.
