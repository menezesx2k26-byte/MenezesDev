# Wireframes — Tavola 27

## 1. Intenção estrutural

Site editorial multipágina sustentado pela coleção fotográfica. A Home alterna aproximação e respiro: mesa, ingrediente, prato, ambiente, preparação. A estrutura não replica M47 em fundo claro; usa capítulos mais longos, assimetria suave e alternância entre serif e sans definida no briefing.

## 2. Grid e ritmo

| Propriedade | Desktop | Mobile |
|---|---|---|
| Viewport de referência | 1440 px | 390 px |
| Conteúdo máximo | 1320 px | 350 px |
| Gutters | 48 px mínimo | 20 px |
| Grid | 12 colunas / gap 24 px | 4 colunas / gap 12 px |
| Header | 80 px, sticky | 64 px, sticky |
| Ritmo entre capítulos | 112–144 px | 72–96 px |
| Texto principal | 4–5 colunas | 4 colunas |
| Imagem dominante | 7–12 colunas | largura total ou 82vw em trilho |

## 3. Home — composição vertical

### Desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ LOGO │ MENU NOSSA HISTÓRIA GALERIA CONTATO │ RESERVAR       │ 80
├──────────────────────────────────────────────────────────────┤
│ HERO 16:10 — tavola27-hero.webp                              │ 760–820
│ COPY 5 col sobre parede calma      │ MESA / PRATO À DIREITA │
├──────────────────────────────────────────────────────────────┤
│ MANIFESTO COPY 5 col        │ DETAIL-02 7 col               │ 620
├──────────────────────────────────────────────────────────────┤
│ MENU INTRO 4 col │ FOOD-01 4 col │ FOOD-02 / FOOD-03 4 col │ 920
├──────────────────────────────────────────────────────────────┤
│ SPACE-01 7 col                       │ HISTÓRIA 5 col         │ 680
├──────────────────────────────────────────────────────────────┤
│ GALERIA EDITORIAL: FOOD-04 7 │ SPACE-03 5                  │ 560
│ SPACE-02 8                         │ DETAIL-01 4             │ 520
├──────────────────────────────────────────────────────────────┤
│ RESERVA DEMONSTRATIVA: texto 7 │ ação 5                    │ 420
├──────────────────────────────────────────────────────────────┤
│ FOOTER: LOGO │ NAVEGAÇÃO │ TRANSPARÊNCIA                    │ 300
└──────────────────────────────────────────────────────────────┘
```

### Mobile

```text
┌────────────────────────────┐
│ LOGO                  MENU │ 64
├────────────────────────────┤
│ HERO COPY                  │
│ H1 / texto / CTAs          │
├────────────────────────────┤
│ HERO IMAGE 4:5             │
│ crop centro-direita        │
├────────────────────────────┤
│ MANIFESTO                  │
│ DETAIL-02                  │
├────────────────────────────┤
│ DESTAQUES DO MENU          │
│ FOOD-01 + TEXTO            │
│ FOOD-02 + TEXTO            │
│ FOOD-03 + TEXTO            │
├────────────────────────────┤
│ HISTÓRIA                   │
│ SPACE-01                   │
├────────────────────────────┤
│ GALERIA EM TRILHO          │
│ 04 / SPACE-03 / SPACE-02   │
│ / DETAIL-01                │
├────────────────────────────┤
│ RESERVA DEMONSTRATIVA      │
├────────────────────────────┤
│ FOOTER                     │
└────────────────────────────┘
```

## 4. Header e hero

### Header desktop

- `tavola27-logo.svg` ocupa colunas 1–3.
- Menu, Nossa história, Galeria e Contato ocupam colunas 5–9.
- `Reservar mesa` ocupa colunas 10–12.
- O header pertence a uma faixa própria e não cobre o hero.

### Header mobile

- Wordmark reduzido à esquerda e acionador de menu à direita.
- Os quatro links e `Reservar mesa` aparecem no painel, nessa ordem.
- Não existe botão de reserva fixo sobre a galeria.

### Hero desktop

- `tavola27-hero.webp` ocupa um container de até 1320 × 825 px, respeitando 16:10.
- Copy HTML usa as colunas 1–5 sobre a parede creme de baixa informação; a mesa e o prato permanecem à direita.
- Ordem: `Tempo, mesa e boa comida.` → texto → `Conhecer o menu` + `Reservar mesa`.
- A copy não ultrapassa aproximadamente 40% da largura da fotografia.

### Hero mobile

- Copy e mídia se separam: copy de 300–360 px, seguida por janela fotográfica 4:5 de 440–500 px.
- Crop horizontal centro-direita, preservando prato, taça e parte reconhecível do salão.
- A área calma à esquerda pode sair do crop porque o HTML já está acima.
- CTAs empilham em 320 px; em 390 px podem permanecer lado a lado se mantiverem boa área clicável.

## 5. Manifesto

- Desktop: eyebrow, headline e texto nas colunas 1–5; `tavola27-detail-02.webp` nas colunas 7–12.
- O still life de louça, ervas, farinha e azeite introduz o sistema material antes dos pratos.
- Mobile: copy primeiro, imagem depois, em 3:2 sem crop severo.
- Altura alvo: 620 px desktop; 620–700 px mobile.
- Não transformar a composição em card nem adicionar selos italianos.

## 6. Destaques do menu

### Desktop

- Altura alvo: 880–960 px.
- Colunas 1–4: título da seção e os três nomes/descrições, com bastante entrelinha vertical.
- Colunas 5–8: `tavola27-food-01.webp` em retrato 4:5, associado a Tagliatelle al Ragù.
- Colunas 9–12: `tavola27-food-02.webp` em 3:2 na metade superior e `tavola27-food-03.webp` em retrato controlado na metade inferior.
- Cada prato é ligado ao texto por proximidade e ordem, não por overlay.
- `Valores apenas demonstrativos.` encerra o bloco. Não criar preços inexistentes.

### Mobile

- Três capítulos consecutivos: nome/descrição → fotografia.
- Food 01 e 03 preservam 4:5; Food 02 preserva 3:2.
- Intervalo de 48–56 px entre pratos; não usar grade de miniaturas.
- O CTA `Conhecer o menu` pode reaparecer no fim da seção, usando a copy já aprovada.

## 7. História

- Desktop: `tavola27-space-01.webp` nas colunas 1–7 e copy nas colunas 9–12.
- Mobile: headline e texto antes da imagem para criar nova abertura de capítulo.
- A imagem permanece 16:10 e mostra o salão; não usar crop que transforme o ambiente em detalhe abstrato.
- Altura alvo: 680 px desktop; 620–700 px mobile.

## 8. Galeria editorial

### Desktop

Primeira linha, aproximadamente 560 px:

- `tavola27-food-04.webp` nas colunas 1–7, prato não repetido e enquadramento alto.
- `tavola27-space-03.webp` nas colunas 8–12, canto íntimo em retrato.

Segunda linha, aproximadamente 520 px:

- `tavola27-space-02.webp` nas colunas 1–8, cozinha aberta.
- `tavola27-detail-01.webp` nas colunas 9–12, preparação de massa.

O contraste de proporções cria ritmo; as alturas não são equalizadas por crop arbitrário.

### Mobile

- Trilho horizontal nativo, sem autoplay, com cada item entre 78vw e 86vw.
- Ordem: Food 04 → Space 03 → Space 02 → Detail 01.
- Retrato e paisagem mantêm suas proporções; a altura do trilho acompanha cada mídia ou usa duas faixas de altura previstas, sem cortar o assunto.
- Uma indicação estrutural de continuidade pode ser definida na Fase 7; não é necessário inventar texto.

## 9. Reservas e footer

### Reservas

- Desktop: texto/contexto nas colunas 1–7; ação nas colunas 9–12.
- Mobile: texto seguido do CTA em largura total.
- O estado deve mostrar `Demonstração de interface.` de forma próxima à ação.
- Não há integração, calendário, telefone ou confirmação de reserva nesta fase.

### Footer

- Logo, navegação e aviso demonstrativo compõem três grupos.
- Pode usar `Projeto demonstrativo MenezesDev.`.
- Também preserva o aviso obrigatório: `Conceito demonstrativo criado pela MenezesDev. Esta empresa é fictícia.`
- Não incluir telefone, endereço ou CNPJ.

## 10. Estrutura compartilhada das páginas internas

As páginas internas reutilizam somente o shell estrutural: header de 80/64 px, intro, conteúdo editorial e footer. A proporção, ordem e seleção de imagens mudam por rota; elas não são clones com título trocado.

### Shell desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ HEADER TAVOLA 27                                             │ 80
├──────────────────────────────────────────────────────────────┤
│ INTRO COPY 5 col               │ MEDIA 7 col                │ 520–680
├──────────────────────────────────────────────────────────────┤
│ CONTEÚDO ESPECÍFICO EM GRID EDITORIAL                        │ auto
├──────────────────────────────────────────────────────────────┤
│ CTA/ESTADO DEMONSTRATIVO                                     │ 300–420
├──────────────────────────────────────────────────────────────┤
│ FOOTER                                                       │ 300
└──────────────────────────────────────────────────────────────┘
```

### Shell mobile

- Header → intro → mídia → conteúdo → CTA/estado → footer.
- Nenhuma imagem fica ao lado de um parágrafo em menos de 768 px.
- Títulos permanecem antes da mídia mesmo quando a mídia vem primeiro no desktop.

## 11. Regras por rota interna

| Rota | Ordem e composição desktop | Mobile | Assets | Limite de conteúdo |
|---|---|---|---|---|
| `/menu` | intro 5/7 com Detail 01; lista dos três pratos em 4/4/4; Food 01–03 em alternância; Food 04 como interlúdio visual sem nome inventado | intro → mídia → três pratos empilhados → interlúdio | Detail 01, Food 01–04 | somente os três pratos aprovados; não completar cardápio por suposição |
| `/storia` | intro com Space 03; manifesto 5/7; história 7/5; faixa de preparação | todos os blocos em copy → imagem | Space 03, Detail 02, Space 01, Detail 01 | usar apenas manifesto e história aprovados |
| `/gallery` | mosaico de 12 colunas com todas as fotos; capítulos por prato, espaço e preparo sem filtros | trilho por grupo ou sequência de uma coluna | hero, Food 01–04, Space 01–03, Detail 01–02 | sem legendas factuais inventadas; alt text vem dos sidecars |
| `/contact` | intro 7/5; área demonstrativa de reserva; imagem de ambiente ampla; aviso final | texto → ação → aviso → imagem | Space 03 ou Hero | sem endereço, telefone, horário ou formulário não especificado |

## 12. Mapa de assets

| Asset | Dimensão | Função Home | Função interna |
|---|---:|---|---|
| `tavola27-hero.webp` | 1536×960 | hero | abertura opcional da galeria |
| `tavola27-food-01.webp` | 1200×1500 | Tagliatelle | menu/galeria |
| `tavola27-food-02.webp` | 1536×1024 | Ravioli | menu/galeria |
| `tavola27-food-03.webp` | 1200×1500 | Tiramisù | menu/galeria |
| `tavola27-food-04.webp` | 1536×1024 | galeria | interlúdio/galeria, sem prato nomeado |
| `tavola27-space-01.webp` | 1536×960 | história | storia/galeria |
| `tavola27-space-02.webp` | 1536×1024 | galeria/cozinha | galeria |
| `tavola27-space-03.webp` | 1200×1500 | galeria/ambiente | storia/contact/galeria |
| `tavola27-detail-01.webp` | 1536×1024 | galeria/preparo | menu/storia/galeria |
| `tavola27-detail-02.webp` | 1536×1024 | manifesto | storia/galeria |
| `tavola27-logo.svg` | viewBox 620×120 | header/footer | header/footer |

Todos os assets existentes têm função definida. Reutilização entre Home e páginas internas é intencional; não representa geração adicional.

## 13. O que simplifica no mobile

- Hero separa copy e fotografia.
- Mosaico do menu vira três capítulos verticais.
- História troca 7/5 por texto → imagem.
- Galeria vira trilho simples, sem carrossel pesado.
- Navegação vai para painel.
- Grandes respiros desktop diminuem, mas não desaparecem.
- Nenhuma imagem importante é ocultada na Home; a ordem muda para sustentar a leitura.
