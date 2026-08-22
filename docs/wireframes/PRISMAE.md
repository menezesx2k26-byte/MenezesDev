# Wireframes — Prismae

## 1. Intenção estrutural

Site multipágina de consultoria sustentado por grid, tipografia, números de processo, cards, gráficos determinísticos e formulário. Fotografia não preenche nenhuma lacuna. A sensação de autoridade vem da organização e da clareza, não de cenas corporativas ou alegações de resultado.

## 2. Grid e ritmo

| Propriedade | Desktop | Mobile |
|---|---|---|
| Viewport de referência | 1440 px | 390 px |
| Conteúdo máximo | 1240 px | 350 px |
| Gutters | 32 px mínimo | 20 px |
| Grid | 12 colunas / gap 24 px | 4 colunas / gap 12 px |
| Header | 76 px, sticky | 64 px, sticky |
| Ritmo entre seções | 88–112 px | 64–80 px |
| Texto principal | 4–6 colunas | 4 colunas |
| Módulo de dados | 6–8 colunas | 4 colunas |

## 3. Home — composição vertical

### Desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ LOGO │ SOLUÇÕES METODOLOGIA SOBRE CONTATO │ DIAGNÓSTICO     │ 76
├──────────────────────────────────────────────────────────────┤
│ HERO COPY 5 col              │ HERO GRAPHIC 7 col           │ 700
│ eyebrow / H1 / texto / CTAs   │ 4:3, sem fotografia          │
├──────────────────────────────────────────────────────────────┤
│ PROBLEMA 5 col        │ 5 ITENS EM GRID 7 col               │ 500
├──────────────────────────────────────────────────────────────┤
│ SOLUÇÕES: ESTRATÉGIA │ PROCESSOS │ INDICADORES              │ 520
├──────────────────────────────────────────────────────────────┤
│ METODOLOGIA INTRO                                              │
│ PROCESS GRAPHIC 12 col — 01 → 02 → 03 → 04                  │ 560
├──────────────────────────────────────────────────────────────┤
│ DADOS/COPY 5 col        │ GRÁFICOS ILUSTRATIVOS 7 col       │ 620
├──────────────────────────────────────────────────────────────┤
│ CTA INTERMEDIÁRIO                                             │ 260
├──────────────────────────────────────────────────────────────┤
│ LEAD COPY 5 col         │ FORMULÁRIO 7 col                  │ 720
├──────────────────────────────────────────────────────────────┤
│ CTA FINAL + TRANSPARÊNCIA                                     │ 320
├──────────────────────────────────────────────────────────────┤
│ FOOTER                                                       │ 300
└──────────────────────────────────────────────────────────────┘
```

### Mobile

```text
┌────────────────────────────┐
│ LOGO                  MENU │ 64
├────────────────────────────┤
│ HERO COPY / CTAs           │
├────────────────────────────┤
│ HERO GRAPHIC 4:3           │
├────────────────────────────┤
│ PROBLEMA / 5 ITENS         │
├────────────────────────────┤
│ 3 SOLUÇÕES EMPILHADAS      │
├────────────────────────────┤
│ METODOLOGIA EM HTML        │
│ 01 / 02 / 03 / 04          │
├────────────────────────────┤
│ DADOS ILUSTRATIVOS         │
│ GRÁFICOS EMPILHADOS        │
├────────────────────────────┤
│ CTA INTERMEDIÁRIO          │
├────────────────────────────┤
│ COPY / FORMULÁRIO          │
├────────────────────────────┤
│ CTA FINAL / AVISO          │
├────────────────────────────┤
│ FOOTER                     │
└────────────────────────────┘
```

## 4. Header e hero

### Header

- Desktop: `prismae-logo.svg` nas colunas 1–3; Soluções, Metodologia, Sobre e Contato nas colunas 5–9; `Solicitar diagnóstico` nas colunas 10–12.
- Mobile: logo à esquerda, menu à direita; os links e CTA ocupam o painel em uma coluna.
- Não há ticker, estatística ou selo de cliente no header.

### Hero desktop

- Copy nas colunas 1–5 e `prismae-hero-graphic.svg` nas colunas 6–12.
- O gráfico mantém proporção 4:3 e altura máxima aproximada de 600 px; não é usado como background.
- Ordem: `GESTÃO E ESTRATÉGIA` → `Clareza para decidir. Estrutura para crescer.` → texto → `Solicitar diagnóstico` + `Conhecer soluções`.
- Relação aproximada: 42% texto / 58% gráfico.

### Hero mobile

- Copy vem primeiro e o gráfico depois, ambos em 4 colunas.
- O SVG usa toda a largura de 350 px e mantém 4:3; não há crop de textos ou gráficos internos.
- CTAs empilham quando necessário.
- Nenhuma fotografia, mockup de dashboard ou tela fictícia acompanha o gráfico.

## 5. Problema e soluções

### Problema

- Desktop: headline nas colunas 1–5; os cinco itens ocupam as colunas 7–12 em duas linhas de grid, sem ícones metafóricos.
- Mobile: headline seguida de decisões sem dados, processos pouco claros, retrabalho, responsabilidades confusas e indicadores que chegam tarde.
- Altura alvo: 500 px desktop; 520–620 px mobile.

### Soluções

- Desktop: três módulos de 4 colunas para Estratégia, Processos e Indicadores.
- Mobile: módulos empilhados na mesma ordem.
- Cada módulo contém somente título, descrição aprovada e `Conhecer soluções` como ação comum quando uma ação for necessária.
- O CTA `Solicitar diagnóstico` encerra a seção sem aparecer dentro de todos os módulos.
- Altura alvo: 520 px desktop; 650–760 px mobile.

## 6. Metodologia

### Desktop

- Intro ocupa até 6 colunas e precede `prismae-process.svg` em 12 colunas.
- O SVG permanece com proporção 1280:360 e largura total do container; números, títulos e descrições continuam legíveis.
- `Solicitar diagnóstico` pode aparecer depois do gráfico, como CTA de metodologia previsto no briefing.

### Mobile

- O SVG horizontal não é reduzido até ficar ilegível e não exige gesto oculto para compreender o método.
- Ele é substituído visualmente por quatro blocos HTML empilhados com o mesmo conteúdo: 01 Diagnóstico, 02 Priorização, 03 Implementação, 04 Acompanhamento.
- O SVG continua sendo o asset desktop; o HTML é a representação responsiva acessível, não um novo gráfico.
- Conectores viram uma linha vertical simples. Animação fica para a Fase 7.

## 7. Visualização de dados

### Desktop

- Copy e explicação ocupam colunas 1–5; o sistema de gráficos ocupa colunas 6–12.
- O sistema pode conter três módulos frontend/SVG: evolução hipotética, eficiência operacional fictícia e distribuição de atividades, exatamente as categorias permitidas no briefing.
- Cada módulo exibe `Dados ilustrativos.` no próprio bloco, não apenas em nota de rodapé.
- Barras, linha ou distribuição podem usar relações visuais sem números empresariais. Nenhum percentual, cliente, receita ou resultado é preenchido nesta fase.

### Mobile

- Copy precede os gráficos.
- Módulos empilham em uma coluna, com no máximo um gráfico por viewport vertical.
- Legendas ficam em HTML; não reduzir rótulos dentro de SVG.
- `Dados ilustrativos.` permanece junto de cada visualização.

## 8. Conversão e formulário

### Distribuição de CTAs

- Hero: `Solicitar diagnóstico` e `Conhecer soluções`.
- Soluções: uma ação de diagnóstico ao final da seção.
- Metodologia: uma ação depois dos quatro passos.
- CTA intermediário: uma faixa curta antes dos dados ou do formulário, usando `Solicitar diagnóstico`.
- Final: uma única ação de diagnóstico próxima à transparência demonstrativa.

Não repetir o botão em cada card ou item.

### Formulário desktop

- Copy/contexto nas colunas 1–5; formulário nas colunas 6–12.
- Nome e Empresa dividem a primeira linha; E-mail e WhatsApp dividem a segunda; Principal desafio e Mensagem ocupam linhas inteiras; `Solicitar diagnóstico` encerra.
- Altura alvo: 720 px.

### Formulário mobile

- Copy vem antes.
- Nome → Empresa → E-mail → WhatsApp → Principal desafio → Mensagem → CTA, todos em uma coluna.
- Nenhum campo desaparece ou muda de ordem.
- O estado de sucesso usa literalmente `Recebemos sua solicitação.` e os dois parágrafos aprovados que explicam que nenhuma solicitação será encaminhada à empresa fictícia.
- Validação, anti-spam e envio pertencem à Fase 7 e às fases técnicas posteriores.

## 9. Footer

- Desktop: `prismae-logo.svg`, navegação e aviso demonstrativo em três grupos.
- Mobile: grupos empilhados.
- Texto obrigatório: `Conceito demonstrativo criado pela MenezesDev. Esta empresa é fictícia.`
- Não incluir clientes, endereço, CNPJ, telefone, certificações ou métricas.

## 10. Estrutura compartilhada das páginas internas

### Shell desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ HEADER PRISMAE                                               │ 76
├──────────────────────────────────────────────────────────────┤
│ INTRO 5 col                   │ DIAGRAMA/CARD SYSTEM 7 col  │ 520–620
├──────────────────────────────────────────────────────────────┤
│ CONTEÚDO MODULAR 12 col                                      │ auto
├──────────────────────────────────────────────────────────────┤
│ CTA OU FORMULÁRIO                                            │ 320–720
├──────────────────────────────────────────────────────────────┤
│ FOOTER                                                       │ 300
└──────────────────────────────────────────────────────────────┘
```

### Shell mobile

- Header → intro → visual determinístico → conteúdo modular → CTA/formulário → footer.
- O visual nunca vem antes do H1 na ordem de leitura.
- Cards de duas ou três colunas viram uma coluna.

## 11. Regras por rota interna

| Rota | Estrutura suficiente | Mobile | Visual permitido | Dependência de copy |
|---|---|---|---|---|
| `/solutions` | intro; três soluções 4/4/4; método; CTA | módulos empilhados; método em HTML | hero graphic + process graphic | todas as descrições já existem |
| `/solutions/strategy` | título e frase aprovada; diagrama de prioridades; passos 01–04 relevantes; CTA | texto → diagrama frontend → passos | subset determinístico do sistema gráfico | não criar benefícios ou resultados adicionais |
| `/solutions/processes` | título e frase aprovada; fluxo de processo; método; CTA | fluxo vertical | SVG/frontend, sem foto | não completar com serviços inexistentes |
| `/solutions/indicators` | título e frase aprovada; dados ilustrativos; método; CTA | gráficos empilhados | SVG/frontend com aviso em cada bloco | sem números até dataset/copy aprovados |
| `/about` | intro curta; metodologia; princípios derivados do briefing; CTA | tudo empilhado | process graphic desktop, HTML mobile | copy institucional pública ainda precisa ser aprovada; não preencher com história inventada |
| `/contact` | intro; formulário completo; estado de sucesso; transparência | copy → campos → sucesso | nenhum asset fotográfico | copy do formulário e sucesso já existe |

A rota `/about` tem estrutura definida, mas qualquer parágrafo institucional além do método permanece bloqueado até existir copy aprovada. A página não depende de volume fictício para funcionar: intro, método e CTA formam o mínimo publicável.

## 12. Mapa de assets

| Asset | Dimensão lógica | Função Home | Função interna | Mobile |
|---|---:|---|---|---|
| `prismae-hero-graphic.svg` | viewBox 960×720 | hero e síntese de estratégia/processos/indicadores | overview de soluções | 4:3 em largura total, sem crop |
| `prismae-process.svg` | viewBox 1280×360 | metodologia desktop | solutions/about | substituído visualmente por HTML equivalente |
| `prismae-logo.svg` | viewBox 640×120 | header/footer | header/footer | reduzido sem rasterização |

`prismae-office-01.webp` não existe e não é necessário. Nenhum slot dos wireframes depende dele.

## 13. O que simplifica no mobile

- Hero 5/7 vira copy → gráfico.
- Lista do problema e soluções empilham.
- Process graphic horizontal vira quatro blocos HTML.
- Gráficos de dados ficam um por linha.
- Formulário de duas colunas vira uma coluna.
- Header vai para menu.
- Nenhum conteúdo é substituído por fotografia.
