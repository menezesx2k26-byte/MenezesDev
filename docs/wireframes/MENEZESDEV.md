# Wireframes — MenezesDev

## 1. Home comercial

### Parâmetros

| Propriedade | Desktop | Mobile |
|---|---|---|
| Viewport de referência | 1440 px | 390 px |
| Conteúdo máximo | 1240 px | 350 px |
| Gutters | 32 px mínimo | 20 px |
| Grid | 12 colunas / gap 24 px | 4 colunas / gap 12 px |
| Ritmo entre seções | 96–128 px | 64–88 px |
| Largura de texto | 4–6 colunas | 4 colunas |
| Header | 80 px, sticky | 64 px, sticky |

### Composição vertical — desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ NAV: MARCA | PROJETOS SERVIÇOS PROCESSO PLANOS FAQ | CTA    │ 80
├──────────────────────────────────────────────────────────────┤
│ HERO COPY 5 col              │ CASE MEDIA SYSTEM 7 col      │ 720
│ eyebrow / H1 / texto          │ M47 + Tavola + Prismae        │
│ CTA principal + secundário    │ sem frame de browser          │
│ preço + informação técnica    │ indicadores auxiliares        │
├──────────────────────────────────────────────────────────────┤
│ RÁPIDO │ RESPONSIVO │ SEGURO │ ENCONTRÁVEL                   │ 112
├──────────────────────────────────────────────────────────────┤
│ PROBLEMA 5 col       │ COMPARAÇÃO 3,5 col + 3,5 col          │ 620
├──────────────────────────────────────────────────────────────┤
│ INTRO PROJETOS 7 col                         │ RESPIRO       │ 280
├──────────────────────────────────────────────────────────────┤
│ M47 COPY 5 col                 │ M47 HERO 7 col               │ 640
├──────────────────────────────────────────────────────────────┤
│ TAVOLA MOSAICO 8 col                    │ COPY 4 col         │ 680
├──────────────────────────────────────────────────────────────┤
│ PRISMAE COPY 5 col              │ HERO GRAPHIC 7 col          │ 620
├──────────────────────────────────────────────────────────────┤
│ CTA PÓS-PORTFÓLIO: texto 8 col │ botão 4 col                 │ 180
├──────────────────────────────────────────────────────────────┤
│ SERVIÇOS: intro 4 col │ lista editorial 8 col               │ 720
├──────────────────────────────────────────────────────────────┤
│ PROCESSO: intro + 01 ─ 02 ─ 03 ─ 04                         │ 600
├──────────────────────────────────────────────────────────────┤
│ DIFERENCIAIS 5 col    │ 6 capacidades em grid 7 col         │ 660
├──────────────────────────────────────────────────────────────┤
│ PLANOS: 3 col + 3 col + 3 col; personalizado abaixo         │ 980
├──────────────────────────────────────────────────────────────┤
│ FAQ 4 col             │ 11 perguntas em accordion 8 col     │ 760*
├──────────────────────────────────────────────────────────────┤
│ CTA FINAL 8 col                         │ ações 4 col         │ 380
├──────────────────────────────────────────────────────────────┤
│ FOOTER: marca 4 │ navegação 3 │ serviços 3 │ contato 2       │ 360
└──────────────────────────────────────────────────────────────┘
* altura inicial; respostas expandem o fluxo sem sobreposição.
```

### Composição vertical — mobile

```text
┌────────────────────────────┐
│ MARCA                 MENU │ 64
├────────────────────────────┤
│ HERO COPY                  │
│ H1 / texto / CTAs          │
│ preço / informação técnica│
├────────────────────────────┤
│ MOSAICO DOS 3 CASES        │
│ sem mockup de interface    │
├────────────────────────────┤
│ 4 ITENS DE CONFIANÇA       │
├────────────────────────────┤
│ PROBLEMA                   │
│ APENAS REDES SOCIAIS       │
│ COM SITE PRÓPRIO           │
├────────────────────────────┤
│ INTRO PROJETOS             │
├────────────────────────────┤
│ M47: COPY → HERO           │
├────────────────────────────┤
│ TAVOLA: COPY → 2 IMAGENS   │
├────────────────────────────┤
│ PRISMAE: COPY → GRAPHIC    │
├────────────────────────────┤
│ CTA PÓS-PORTFÓLIO          │
├────────────────────────────┤
│ SERVIÇOS, 1 POR LINHA      │
├────────────────────────────┤
│ PROCESSO, 01–04 VERTICAL   │
├────────────────────────────┤
│ DIFERENCIAIS, 1 POR LINHA  │
├────────────────────────────┤
│ PLANOS, CARDS EMPILHADOS   │
│ “INCLUI” EM DISCLOSURE     │
├────────────────────────────┤
│ FAQ EM ACCORDION           │
├────────────────────────────┤
│ CTA FINAL / AÇÕES          │
├────────────────────────────┤
│ FOOTER EMPILHADO           │
└────────────────────────────┘
```

## 2. Header e navegação

### Desktop

- Marca ocupa colunas 1–3.
- Links ocupam colunas 5–9; o espaçamento entre eles é regular.
- `Solicitar orçamento` ocupa colunas 10–12.
- Âncoras apontam para as seções previstas na copy, sem itens extras.
- O header pode permanecer sticky; não reduz de altura na Fase 6.

### Mobile

- Linha única com marca e acionador de menu.
- O painel aberto apresenta Projetos, Serviços, Processo, Planos e FAQ nessa ordem.
- `Falar pelo WhatsApp` é a última ação e ocupa toda a largura do painel.
- Nenhum CTA flutuante adicional é previsto nesta fase.

## 3. Hero

### Desktop

- Copy nas colunas 1–5; composição visual nas colunas 6–12.
- Altura alvo: 720 px depois do header, com o bloco textual centralizado verticalmente.
- Ordem interna: eyebrow, H1, texto, par de CTAs, microcopy de preço e informação complementar.
- O sistema visual à direita usa recortes reais de `m47-hero.webp`, `tavola27-hero.webp` e `prismae-hero-graphic.svg` em uma composição editorial, sem barra de navegador, UI inventada ou alegação de screenshot.
- M47 é o plano dominante; Tavola e Prismae aparecem como planos menores e claramente distintos.
- Os quatro indicadores de Responsivo, Performance, HTTPS e SEO técnico ficam próximos ao sistema visual, mas fora das imagens.

### Mobile

- A copy vem antes da mídia para garantir leitura e conversão.
- CTAs ocupam duas linhas quando 350 px não comportar ambos com boa área clicável.
- O sistema visual vira um mosaico de uma peça larga e duas peças menores; nenhuma imagem recebe texto sobreposto.
- A informação complementar pode quebrar em duas linhas. Apenas em 320 px a microcopy secundária pode ser visualmente simplificada conforme a regra 58 da copy aprovada.

## 4. Seções da Home

| Ordem | Seção | Desktop | Mobile | Copy canônica | Asset/função |
|---:|---|---|---|---|---|
| 1 | Navbar | 12 col, 80 px | linha de 64 px + painel | Home Copy §3 | sem asset |
| 2 | Hero | 5/7, 720 px | copy → mosaico, 700–780 px | §§4–5 | heroes dos três cases |
| 3 | Confiança | 4 itens em linha, 112 px | 2×2 ou 1 por linha, 280–340 px | §6 | ícones frontend futuros |
| 4 | Problema | intro 5 col + comparação 7 col, 620 px | intro → lista A → lista B, 760–900 px | §7 | sem imagem; contraste de estrutura |
| 5 | Transição | texto 7 col, 280 px | 4 col, 260–320 px | §8 | respiro antes dos cases |
| 6 | M47 | copy 5 + hero 7, 640 px | copy → hero 16:10/4:5, 700–780 px | §9 com identidade final | `m47-hero.webp` |
| 7 | Tavola 27 | mosaico 8 + copy 4, 680 px | copy → hero → food, 780–900 px | §10 com identidade final | hero + `food-01` |
| 8 | Prismae | copy 5 + graphic 7, 620 px | copy → graphic 4:3, 680–760 px | §11 com identidade final | `prismae-hero-graphic.svg` |
| 9 | CTA de projetos | texto 8 + botão 4, 180 px | empilhado, 220–260 px | §12 | sem asset |
| 10 | Serviços | intro 4 + lista 8, 720 px | cinco itens empilhados, 820–980 px | §§13–18 | sem imagem |
| 11 | Processo | intro + quatro etapas, 600 px | 01–04 verticais, 760–900 px | §§19–24 | conectores frontend futuros |
| 12 | Diferenciais | intro 5 + grid 7, 660 px | seis itens empilhados, 820–980 px | §§25–32 | prova por conteúdo, sem métricas |
| 13 | Planos | três planos + personalizado, 980 px | planos empilhados, listas recolhíveis, 1250–1550 px inicial | §§33–38 | sem imagem |
| 14 | FAQ | intro 4 + accordion 8, 760 px inicial | accordion, 760–900 px inicial | §§39–50 | sem imagem |
| 15 | CTA final | texto 8 + ações 4, 380 px | empilhado, 340–420 px | §§51–52 | sem imagem |
| 16 | Footer | 4/3/3/2, 360 px | quatro grupos empilhados, 520–620 px | §53 | sem imagem |

## 5. Presença distinta dos cases na Home

### M47 Barber

- Identificação: `Barbearia · Landing Page` e `Conceito demonstrativo`.
- Correspondência: `Essencial — a partir de R$600`.
- O bloco é escuro e compacto, com `m47-hero.webp` grande, foco à direita e copy fora da fotografia.
- O CTA `Ver projeto` fica imediatamente após tags e correspondência comercial.
- No mobile, a imagem usa `object-position` horizontal entre 65% e 70%.

### Tavola 27

- Identificação: `Restaurante · Site institucional` e `Conceito demonstrativo`.
- Correspondência: `Profissional — a partir de R$950`.
- O bloco usa `tavola27-hero.webp` como plano largo e `tavola27-food-01.webp` como detalhe vertical sobre uma segunda linha do grid. A copy fica à direita, não sobre a imagem.
- No mobile, copy, hero e detalhe aparecem em sequência; o hero é recortado para o centro-direita.

### Prismae

- Identificação: `Consultoria · Site para geração de leads` e `Conceito demonstrativo`.
- Correspondência: `Negócio — a partir de R$1.500`.
- O bloco é sustentado por grid e `prismae-hero-graphic.svg`; não recebe fotografia.
- No mobile, o gráfico permanece 4:3 e vem depois da copy. Textos internos do SVG não podem ficar menores que o limite de leitura; abaixo disso, a largura do gráfico deve acompanhar a viewport sem crop.

### Bindings literais dos cards

| Case final | Headline e descrição aprovadas | Tags | Ação/label |
|---|---|---|---|
| M47 Barber | `Presença forte para uma marca de personalidade.` / `Website desenvolvido como conceito para uma barbearia moderna, reunindo serviços, localização, horários e contato em uma experiência visual direta e sofisticada.` | Landing Page; Mobile First; WhatsApp; Localização | `Ver projeto` / `Conceito demonstrativo` |
| Tavola 27 | `A experiência começa antes da primeira mesa.` / `Conceito de website para restaurante, pensado para apresentar ambiente, cardápio, localização e canais de contato com uma linguagem visual marcante.` | Restaurante; Cardápio; Responsivo; Contato | `Ver projeto` / `Conceito demonstrativo` |
| Prismae | `Confiança também é construída no digital.` / `Website institucional para uma empresa de serviços, com foco em autoridade, organização da informação e geração de contatos comerciais.` | Institucional; Serviços; Formulário; SEO técnico | `Ver projeto` / `Conceito demonstrativo` |

Esses bindings preservam a copy das seções 9–11 e aplicam somente a substituição de identidade definida no contrato de precedência.

## 6. Serviços, processo e prova de capacidade

### Serviços

- Intro ocupa 4 colunas e a lista ocupa 8.
- Os cinco serviços usam linhas editoriais, não cinco cards idênticos.
- Sites institucionais e Landing Pages têm maior peso; Catálogos digitais, Integrações e Aplicações personalizadas seguem abaixo.
- Toda descrição e microcopy vêm literalmente das seções 14–18 da copy aprovada.

### Processo

- Desktop: quatro etapas em sequência horizontal com números grandes e texto abaixo.
- Mobile: linha vertical 01–04, preservando a ordem Briefing → Direção visual → Desenvolvimento → Publicação.
- A observação sobre duas rodadas de revisão encerra a seção, separada dos quatro passos.

### Prova sem alegações falsas

- A prova visual principal são os três cases explicitamente rotulados como conceitos demonstrativos.
- A prova técnica são as seis capacidades das seções 26–31: Performance, Responsividade, SEO técnico, Segurança, Infraestrutura moderna e Código versionado.
- `Desenvolvido para ser rápido.` aparece uma única vez como assinatura da seção.
- Não existe seção de depoimentos, logos de clientes ou estatísticas. A ausência é deliberada e segue as seções 59–60 da copy.

## 7. Planos e FAQ

### Planos

- Desktop: Essencial, Profissional e Negócio em três colunas de mesma base; Profissional recebe o badge `RECOMENDADO` e maior prioridade estrutural. O bloco de Projetos Personalizados ocupa 12 colunas abaixo.
- Mobile: cards empilhados na ordem Essencial → Profissional → Negócio → Personalizado. A área `Inclui` usa disclosure recolhido inicialmente, mas todo o texto permanece disponível.
- Preços sempre incluem `A partir de`; o aviso comercial das seções 33 e 38 fica visível, não em tooltip.
- Não incluir manutenção mensal na Home: ela existe na oferta comercial, mas não faz parte da copy aprovada da página.

### FAQ

- Desktop: título nas colunas 1–4 e 11 perguntas nas colunas 5–12.
- Mobile: título seguido do accordion em uma coluna.
- A primeira pergunta pode iniciar aberta; as demais fechadas. Essa decisão pode ser refinada na Fase 7 sem alterar a ordem ou o conteúdo.
- Respostas são literais das seções 40–50, sem resumo ou omissão.

## 8. Auditoria da copy da Home

| Fonte | Posição no wireframe | Tratamento |
|---|---|---|
| §§1–2 | objetivo e tom globais | regra, não texto de interface |
| §3 | header desktop/mobile | literal |
| §§4–5 | hero e indicadores | literal |
| §6 | barra de confiança | literal |
| §7 | problema e comparação | literal, listas completas |
| §8 | abertura de projetos | literal |
| §§9–11 | três cases | headline, descrição, tags, CTA e label literais; identidade atualizada pela precedência documentada |
| §12 | CTA pós-portfólio | literal |
| §§13–18 | serviços | cinco serviços completos e microcopy |
| §§19–24 | processo | quatro etapas e observação completas |
| §§25–32 | diferenciais | seis diferenciais e assinatura completa |
| §§33–38 | planos | três planos, listas, personalizado e ressalva completos |
| §§39–50 | FAQ | onze perguntas e respostas completas |
| §§51–52 | CTA final | copy, CTAs, microcopy e mensagem do WhatsApp |
| §53 | footer | marca, tagline, descrição, grupos, CTA e copyright |
| §54 | metadados da Home | fora do canvas, reservado à implementação |
| §§55–57 | hierarquia, preço e linguagem | regras aplicadas ao wireframe |
| §58 | regras de alteração | copy bloqueada contra reescrita |
| §§59–60 | depoimentos e números | seções inexistentes por regra explícita |
| §61 | objetivo comercial | orienta a hierarquia completa |

## 9. Página reutilizável de case MenezesDev

Essa é a página editorial em `/projetos/<slug>`, não a demo. Ela apresenta contexto e acesso ao projeto sem fingir resultados ou screenshots inexistentes.

### Composição — desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ HEADER MENEZESDEV                                            │ 80
├──────────────────────────────────────────────────────────────┤
│ CASE SUMMARY 5 col          │ COVER ASSET 7 col              │ 620
│ nome / categoria / label    │ hero ou hero graphic           │
│ descrição / tags / CTA      │                                │
├──────────────────────────────────────────────────────────────┤
│ CONTEXTO 5 col     │ ABORDAGEM 7 col                         │ 520
│ briefing factual  │ decisões verificáveis                    │
├──────────────────────────────────────────────────────────────┤
│ SISTEMA VISUAL / ASSET STRIP                                │ 520
├──────────────────────────────────────────────────────────────┤
│ SCREENSHOTS REAIS — BLOCO CONDICIONAL                        │ auto
│ DESKTOP 8 col                      │ MOBILE 4 col             │
├──────────────────────────────────────────────────────────────┤
│ RECURSOS 7 col              │ PACOTE + CTA DEMO 5 col        │ 440
├──────────────────────────────────────────────────────────────┤
│ CTA MENEZESDEV + FOOTER                                      │ 560
└──────────────────────────────────────────────────────────────┘
```

### Composição — mobile

```text
┌────────────────────────────┐
│ HEADER                     │
├────────────────────────────┤
│ NOME / CATEGORIA / LABEL   │
│ DESCRIÇÃO / TAGS / CTA     │
├────────────────────────────┤
│ COVER ASSET                │
├────────────────────────────┤
│ CONTEXTO                   │
├────────────────────────────┤
│ ABORDAGEM                  │
├────────────────────────────┤
│ ASSETS EM SEQUÊNCIA        │
├────────────────────────────┤
│ SCREENSHOTS REAIS*         │
│ DESKTOP → MOBILE           │
├────────────────────────────┤
│ RECURSOS / PACOTE / CTA    │
├────────────────────────────┤
│ CTA MENEZESDEV / FOOTER    │
└────────────────────────────┘
* seção ausente enquanto as capturas reais não existirem.
```

### Contrato de conteúdo

- **Resumo:** headline, descrição, tags, categoria e label do card correspondente na Home.
- **Contexto:** objetivo comercial, posicionamento e problema descritos em `docs/DEMO_CASES.md`; não converter intenção interna em resultado alegado.
- **Abordagem:** arquitetura, direção visual e recursos técnicos previstos no briefing; escrever como decisão de projeto, não como case de cliente real.
- **Screenshots:** somente imagens capturadas da implementação real em desktop e mobile. Enquanto ausentes, a seção inteira não é renderizada; o layout não exibe placeholder.
- **Recursos:** lista factual de recursos demonstrados no briefing.
- **Pacote:** correspondência comercial do case com Essencial, Profissional ou Negócio.
- **Demo:** o CTA `Ver projeto` usa a rota final decidida na infraestrutura futura. Não assumir subdomínio nesta fase.

### Assets por variação

| Case | Capa | Faixa visual | Crop mobile |
|---|---|---|---|
| M47 | `m47-hero.webp` | `gallery-03`, `gallery-05`, `gallery-06` | hero em 65–70%; galeria sem crop agressivo |
| Tavola 27 | `tavola27-hero.webp` | `food-01`, `space-01`, `detail-01` | hero centro-direita; retratos mantêm proporção |
| Prismae | `prismae-hero-graphic.svg` | `prismae-process.svg` | gráfico 4:3; processo vira representação HTML quando estreito |

### Reordenação responsiva

- Capa passa de lado direito para depois da copy.
- Contexto e abordagem deixam de dividir linha e passam a blocos consecutivos.
- Na futura seção de screenshots, desktop aparece antes de mobile; ambos usam capturas reais e legendas factuais.
- Recursos vêm antes do CTA de demo para que o visitante entenda o escopo antes de sair da página.
- Faixas visuais de M47 e Tavola viram sequência ou trilho; Prismae permanece modular e não recebe fotografia de preenchimento.
