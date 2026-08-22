# MenezesDev — Interações canônicas

**Fase:** 7 — interações e comportamento
**Status:** contrato funcional fechado para orientar a Fase 8; sem implementação
**Escopo:** navegação, estados, movimento, formulários, acessibilidade e diferenças funcionais responsivas

## 1. Arquivos canônicos

- `MENEZESDEV.md` — Home comercial e páginas editoriais de case.
- `M47.md` — landing page demonstrativa M47 Barber.
- `TAVOLA27.md` — Home e navegação multipágina do Tavola 27.
- `PRISMAE.md` — Home, soluções e formulário demonstrativo da Prismae.

Estes documentos complementam `docs/wireframes/`. Em caso de conflito, o wireframe continua sendo autoridade para composição; este diretório é autoridade para comportamento. Uma mudança estrutural só é permitida quando uma incompatibilidade estiver registrada explicitamente.

## 2. Fontes e limites

Fontes lidas:

- `AGENTS.md`;
- `docs/BRAND_GUIDE.md`;
- `docs/DEMO_CASES.md`;
- todos os documentos em `docs/wireframes/`;
- `docs/context/STATE.md`;
- `docs/context/DECISIONS.md`;
- `docs/context/HANDOFF.md`;
- CTAs e mensagens aprovadas em `HOME_COPY.md — MenezesDev.md`.

Esta fase não define:

- biblioteca de animação;
- componentes ou framework;
- arquitetura de estado;
- Astro, Tailwind ou dependências npm;
- backend, provedor de analytics ou anti-spam;
- Cloudflare bindings, schema, build ou deploy;
- screenshots, assets ou promoção de status de imagem.

## 3. Destinos canônicos

### MenezesDev

| Destino | Rota/comportamento |
|---|---|
| Home | `/` |
| Projetos | `/#projetos` |
| Serviços | `/#servicos` |
| Processo | `/#processo` |
| Planos | `/#planos` |
| FAQ | `/#faq` |
| Case M47 | `/projetos/m47` |
| Case Tavola 27 | `/projetos/tavola-27` |
| Case Prismae | `/projetos/prismae` |
| Demo M47 | `/demo/m47` |
| Demo Tavola 27 | `/demo/tavola27` |
| Demo Prismae | `/demo/prismae` |
| Orçamento/WhatsApp | URL real aprovada e configurada na Fase 8 |

As rotas internas abrem na mesma aba. WhatsApp é a única saída externa prevista nesta fase e abre em nova aba, com aviso acessível de mudança de contexto.

### Demos

- M47 é uma página única em `/demo/m47` com âncoras internas.
- Tavola 27 usa `/demo/tavola27`, `/menu`, `/storia`, `/gallery` e `/contact` sob esse prefixo.
- Prismae usa `/demo/prismae`, `/solutions`, `/solutions/strategy`, `/solutions/processes`, `/solutions/indicators`, `/about` e `/contact` sob esse prefixo.
- `/demo/prismae/about` é uma rota reservada e não deve aparecer como link ativo enquanto a copy institucional expandida não estiver aprovada.

## 4. Navbar desktop

- Permanece visível com `position: sticky` desde o topo; não se oculta ao rolar.
- Estado de topo: aparência prevista pelo projeto, sem alteração de altura.
- Estado após aproximadamente 24 px de scroll: superfície torna-se suficientemente opaca para preservar contraste, sem salto de layout.
- A altura definida no wireframe permanece estável nos dois estados.
- Links de página recebem `aria-current="page"` na rota ativa.
- Âncoras da página recebem `aria-current="location"` somente quando a seção correspondente domina a área útil da viewport.
- O estado ativo não depende apenas de cor: usa também peso, sublinhado, marcador ou outra diferença de forma.
- A marca leva ao topo da Home do projeto correspondente na mesma aba.

### Seção ativa por scroll

- O link ativo muda quando o início da seção cruza uma linha de referência logo abaixo do header e a seção ocupa a maior área relevante.
- Em fronteiras instáveis, o estado anterior é mantido até a próxima seção assumir claramente a leitura; não deve piscar entre dois links.
- Ao chegar ao final da página, o último item navegável aplicável pode tornar-se ativo mesmo que não ocupe a maior área.
- Se uma rota ou seção não possui link no header, nenhum item é marcado por aproximação.

## 5. Menu mobile

### Abertura

- O acionador é um botão com nome acessível, alvo mínimo de 44 × 44 px e `aria-expanded`.
- Abre um painel modal lateral, com largura máxima aproximada de 360 px e nunca maior que 90vw.
- O painel usa a altura dinâmica disponível da viewport e possui scroll próprio quando necessário.
- O foco vai para o botão de fechar, que é o primeiro controle do painel.
- O restante da página fica inerte para teclado e tecnologia assistiva.
- O scroll do documento é bloqueado sem deslocar o conteúdo horizontalmente.

### Fechamento

- Fecha pelo botão, clique/toque fora, tecla Escape, ativação de um link ou mudança de rota.
- Clique dentro do painel não fecha, salvo quando ativa um destino.
- Após fechamento sem navegação, o foco retorna ao acionador que abriu o menu.
- Após ativar âncora, o painel fecha primeiro; então ocorre o scroll e o foco programático vai para o heading da seção.
- Após mudança de rota, o navegador posiciona o foco no início do conteúdo principal da nova página.

### Teclado e viewport

- Tab e Shift+Tab ficam contidos no painel enquanto ele está aberto.
- Escape funciona a partir de qualquer elemento interno.
- O painel não usa gesto de swipe como única forma de fechar.
- Com teclado virtual aberto, nenhum CTA sticky cobre campos ou controles; o conteúdo do painel continua rolável.

## 6. Âncoras e mudança de página

- Âncoras internas abrem na mesma aba e atualizam o hash.
- O scroll considera a altura do header por meio de uma margem de destino; o heading nunca fica escondido.
- Duração de scroll suave: 300–400 ms, sem overshoot.
- Em `prefers-reduced-motion: reduce`, o scroll é imediato.
- Ao carregar uma URL com hash, aplica-se o mesmo offset e o destino recebe foco programático sem remover seu foco visível.
- Back/forward restaura rota, hash e posição de maneira nativa; não há scroll hijacking.
- Navegação entre páginas usa o comportamento do navegador, sem transição SPA obrigatória nesta fase.

## 7. Links e CTAs

### Classificação

| Tipo | Elemento semântico | Aba | Fallback |
|---|---|---|---|
| Rota interna | link | mesma | página 404 real a definir na Fase 8 |
| Âncora | link | mesma | sem JS, salto nativo para o `id` |
| WhatsApp MenezesDev | link externo | nova | publicação reprovada se URL real não estiver configurada |
| Ação demonstrativa | botão local ou link para aviso interno | mesma | mostra status demonstrativo; nunca usa URL externa |
| Expandir/recolher | botão | n/a | conteúdo permanece acessível sem animação |
| Enviar formulário Prismae | botão de submit local | n/a | valida e simula somente estado de interface, sem rede |

### Estados visuais

- **Default:** texto e contorno possuem contraste suficiente; cursor corresponde ao tipo de controle.
- **Hover:** mudança curta de superfície, sublinhado, posição ou escala; nenhuma informação nova aparece apenas aqui.
- **Focus-visible:** anel de pelo menos 2 px, contraste mínimo de 3:1 contra áreas adjacentes e offset suficiente para não ser cortado.
- **Active:** resposta de pressão de 80–120 ms, sem deslocamento maior que 2 px.
- **Disabled:** só existe quando a ação realmente não pode ocorrer; não é usado para esconder destino ainda não configurado.
- **Loading:** mantém largura do controle, impede novo acionamento e comunica estado em texto.
- **Success/Error:** usa texto e, quando houver ícone, não depende apenas de cor.

Links externos informam de forma visual ou acessível que abrem uma nova aba. Nenhum link usa `#`, `javascript:` ou URL fictícia como destino temporário.

## 8. Sistema de motion

### Tokens comportamentais

| Categoria | Duração | Easing | Distância/escala máxima |
|---|---:|---|---:|
| Pressão/active | 80–120 ms | saída rápida | 2 px |
| Hover/foco de controle | 140–180 ms | padrão | 2–4 px ou escala 1.01 |
| Menu e navegação local | 200–260 ms | padrão | 16 px |
| Accordion/disclosure | 220–300 ms | padrão | altura + opacidade, sem translate amplo |
| Entrada de seção | 320–420 ms | desaceleração | 16 px |
| Imagem clicável quando existir | 180–240 ms | padrão | escala máxima 1.02 |

Easing padrão: curva de desaceleração equivalente a `cubic-bezier(0.2, 0, 0, 1)`. Saídas podem usar uma curva mais rápida equivalente a `cubic-bezier(0.4, 0, 1, 1)`.

### Entrada de elementos

- Pode ocorrer uma vez por visita da página quando aproximadamente 15% do bloco entra na viewport.
- Combina opacidade com translate vertical de no máximo 16 px.
- Stagger é limitado a grupos curtos e intervalo máximo de 60 ms; listas longas não animam item por item.
- Hero, H1, conteúdo crítico acima da dobra e mensagens de erro não aguardam observação ou animação para ficar disponíveis.
- Gráficos e números não contam valores do zero nem simulam desempenho empresarial.

### Quando não animar

- conteúdo já visível no carregamento;
- navegação por teclado que precisa de resposta imediata;
- erro de formulário e foco no primeiro erro;
- mudança de estado que não possui transição espacial;
- grandes blocos de texto;
- qualquer movimento que cause atraso perceptível, CLS ou concorrência com leitura.

### Reduced motion

Com `prefers-reduced-motion: reduce`:

- entradas aparecem sem translate e sem stagger;
- scroll suave torna-se imediato;
- menus, accordions e disclosures mudam de estado sem animação de deslocamento;
- zoom de imagens é removido;
- loaders usam texto estático, não rotação contínua;
- foco, sucesso e erro continuam claramente visíveis.

Não há parallax, scroll hijacking, loop decorativo, bounce, partículas ou autoplay.

## 9. Accordion acessível

- Todos os painéis começam fechados.
- Vários painéis podem permanecer abertos; abrir um não fecha outro e não move o usuário inesperadamente.
- O cabeçalho inteiro é um botão; clicar no texto ou indicador alterna o painel.
- Enter e Space alternam o painel.
- Tab segue a ordem natural. Setas para cima/baixo movem entre headers; Home/End levam ao primeiro/último header.
- O botão mantém `aria-expanded` e `aria-controls`; o painel possui relação com o heading.
- O indicador visual gira ou muda forma, mas o texto acessível não depende dele.
- Expansão/recolhimento dura 220–280 ms e preserva o fluxo; conteúdo abaixo se move de forma contínua.
- Em reduced motion, o painel abre ou fecha imediatamente.
- Ao fechar, o foco permanece no botão que controlava o painel.
- Todo conteúdo vem da copy aprovada e permanece disponível no DOM, sem carregamento tardio.

## 10. Formulários — contrato compartilhado

- Todo campo possui label visível persistente; placeholder nunca substitui label.
- Campos obrigatórios são identificados no label e também semanticamente.
- Instruções de formato aparecem antes do erro quando necessárias.
- Erro fica junto do campo, ligado por descrição acessível e anunciado sem repetir toda a página.
- No submit inválido, dados permanecem preenchidos e o foco vai ao primeiro campo inválido.
- Uma mensagem geral anuncia quantos campos exigem correção, sem substituir mensagens específicas.
- Submit válido entra em loading, mantém o botão estável e bloqueia múltiplos envios.
- Enter envia a partir de controles de linha única; em textarea, Enter cria nova linha.
- Autofill apropriado é permitido por campo; não armazenar dados pessoais em localStorage.
- Sucesso e erro de rede são estados distintos. Na Prismae demonstrativa não existe rede e, portanto, não se inventa erro de servidor.
- Backend, retenção, consentimento, transporte e provedor anti-spam permanecem para especificação técnica da Fase 8.

## 11. Acessibilidade interativa

- Um skip link é o primeiro controle focável e leva ao conteúdo principal.
- Ordem de Tab acompanha a ordem visual e do DOM; elementos não interativos não recebem `tabindex`.
- Alvos touch têm no mínimo 44 × 44 px; controles primários preferem 48 px de altura.
- Foco nunca é removido sem substituto visível.
- Overlays fecham com Escape, prendem foco e restauram o foco de origem.
- `aria-current`, `aria-expanded`, `aria-controls`, `aria-invalid`, `aria-describedby`, `aria-live` e `aria-busy` são usados somente onde descrevem um estado real.
- Nenhum estado depende apenas de cor, hover, movimento ou posição.
- Ícones sem texto recebem nome acessível; ícones redundantes são ocultos da árvore acessível.
- Conteúdo revelado por hover também existe no estado default e no foco.
- Regiões roláveis por teclado possuem nome acessível e foco visível.
- Mudanças de rota movem o foco para o H1; mudanças de hash movem para o heading de destino.

## 12. Responsividade comportamental

- Desktop exibe navegação inline; mobile usa painel modal.
- Hover é um refinamento opcional, nunca requisito funcional.
- CTAs podem ocupar largura total no mobile e empilham quando necessário.
- Cards inteiros podem ampliar a área clicável, mas não contêm links ou botões aninhados.
- Grids empilhados preservam a mesma ordem de leitura dos wireframes.
- Accordions e disclosures mantêm alvo de 44 px e texto completo.
- Trilhos horizontais usam gesto touch, trackpad e teclado; não autoplay.
- Elementos sticky não ocupam mais espaço que o header já previsto e não cobrem conteúdo com teclado virtual.
- Orientação e resize não descartam campos, estados de accordion ou foco atual.
- Nenhuma informação essencial desaparece em mobile.

## 13. Vocabulário de estados

| Estado | Aplicação |
|---|---|
| DEFAULT | todo controle |
| HOVER | ponteiro preciso; nunca única fonte de informação |
| FOCUS-VISIBLE | todo controle por teclado |
| ACTIVE | botões, links e cards acionáveis |
| DISABLED | somente indisponibilidade real e explicável |
| LOADING | submit ou ação assíncrona real/local controlada |
| SUCCESS | formulário e status de ação demonstrativa concluída |
| ERROR | validação ou falha real; não usado em conteúdo passivo |

## 14. Critérios globais de aceite

- Toda rota e todo CTA listado nos wireframes possui destino ou estado local explícito.
- Nenhuma ação de M47, Tavola 27 ou Prismae envia usuário/dado a uma empresa real ou inexistente.
- Nenhum controle requer hover.
- Menu, accordion, disclosures, trilhos e formulários são operáveis por teclado.
- Reduced motion remove movimento não essencial.
- Nenhuma interação exige conteúdo, screenshot ou asset inexistente.
- Os wireframes permanecem estruturalmente intactos.
- Nenhum movimento contínuo, parallax, scroll hijacking ou stagger excessivo foi especificado.
- A Home MenezesDev mantém caminho curto de hero, cards, planos e CTA final para o WhatsApp real aprovado.

## 15. Pendências reservadas à Fase 8

- fornecer e validar a URL real de WhatsApp da MenezesDev;
- escolher estratégia técnica de foco, scroll, menu e accordion;
- decidir framework, componentes e tokens implementados;
- definir backend e política de dados de formulários reais;
- definir anti-spam, rate limit e proteção de transporte;
- definir analytics, consentimento e eventos;
- criar tratamento 404 e rotas físicas;
- executar testes em navegador e screenshots reais;
- validar comportamento com tecnologia assistiva na implementação.
