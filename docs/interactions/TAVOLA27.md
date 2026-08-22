# Interações — Tavola 27

## 1. Escopo

Tavola 27 é uma demo multipágina sob `/demo/tavola27`. Navegação, galeria e reserva preservam o ritmo editorial de `docs/wireframes/TAVOLA27.md`. Não existe sistema real de reservas.

## 2. Rotas e navegação

| Item | Destino |
|---|---|
| Logo | `/demo/tavola27` |
| Menu | `/demo/tavola27/menu` |
| Nossa história | `/demo/tavola27/storia` |
| Galeria | `/demo/tavola27/gallery` |
| Contato | `/demo/tavola27/contact` |

- Todas as rotas abrem na mesma aba.
- O link da rota atual usa `aria-current="page"` e diferença de forma além da cor vinho/verde.
- O header permanece sticky com altura constante de 80 px desktop e 64 px mobile.
- Não há transição obrigatória entre páginas; o navegador move foco para o H1 da nova rota.

## 3. Menu mobile

- Ordem: Menu → Nossa história → Galeria → Contato → `Reservar mesa`.
- O CTA de reserva fecha o painel e navega para a seção demonstrativa antes de mover o foco ao heading.
- Focus trap, Escape, clique fora, retorno de foco e scroll lock seguem o contrato global.
- A rota ativa fica identificada dentro do painel.

## 4. CTAs

| Texto | Contexto | Destino | Aba | Resultado |
|---|---|---|---|---|
| `Conhecer o menu` | hero/Home | `/demo/tavola27/menu` | mesma | abre a página de menu e foca o H1 |
| `Conhecer o menu` | fim dos destaques mobile, se usado | `/demo/tavola27/menu` | mesma | mesmo comportamento |
| `Reservar mesa` | hero/Home | `/demo/tavola27#reservas` | mesma | scroll até aviso demonstrativo |
| `Reservar mesa` | header na Home | `/demo/tavola27#reservas` | mesma | fecha menu quando aplicável |
| `Reservar mesa` | header/páginas internas | `/demo/tavola27/contact#reservas` | mesma | abre Contact e foca a seção |
| `Reservar mesa` | Contact ou seção de reserva | `#reservas` | mesma | mantém a seção e anuncia o status |

### Reserva demonstrativa

- O destino contém de forma persistente `Demonstração de interface.` antes ou imediatamente junto da ação.
- Ao chegar por CTA, o heading da seção recebe foco e um status educado anuncia: `Demonstração de interface. Nenhuma reserva foi enviada.`
- Não abrir calendário, modal, formulário, WhatsApp, telefone, mapa ou sistema externo.
- Não coletar data, horário, quantidade de pessoas ou dados pessoais.
- Acionar novamente não duplica o aviso.
- O footer continua exibindo `Conceito demonstrativo criado pela MenezesDev. Esta empresa é fictícia.`

## 5. Home

### Hero

- CTAs ficam disponíveis sem aguardar entrada animada.
- `Conhecer o menu` é o único CTA que muda de página.
- `Reservar mesa` usa a âncora demonstrativa.
- A fotografia é passiva e não recebe link, zoom ou drag.

### Manifesto, menu e história

- Blocos editoriais e imagens são passivos.
- Nomes dos três pratos não abrem modal nem rota individual; não existem páginas de prato aprovadas.
- A entrada pode ocorrer por capítulo, nunca por palavra, prato ou ingrediente isolado.
- `Valores apenas demonstrativos.` permanece sempre visível e não depende de tooltip.

## 6. Galeria

### Decisão sobre lightbox

Não haverá lightbox. A galeria deve conservar leitura editorial contínua e não precisa de zoom para cumprir o briefing.

### Desktop

- Mosaico é passivo, sem overlays, legendas em hover ou controles de navegação.
- Imagens não entram na ordem de Tab.
- Entrada pode usar no máximo um movimento por linha do mosaico.

### Mobile/Home

- O trilho horizontal usa scroll nativo, snap suave, touch e trackpad.
- A região possui nome acessível, foco visível e pode receber Tab para permitir setas esquerda/direita.
- Home/End levam ao início/fim do trilho quando ele possui foco.
- Não há autoplay, loop, paginação infinita ou captura do scroll vertical.
- A próxima imagem permanece parcialmente visível como indicação de continuidade; nenhuma copy nova é necessária.
- Em reduced motion, snap e scroll programático são imediatos.

### Página `/gallery`

- Desktop usa o mosaico completo passivo.
- Mobile pode usar trilhos por grupo ou sequência de uma coluna conforme o wireframe; se usar trilhos, aplica exatamente o comportamento acima.
- Alt text vem dos sidecars; não inventar legendas empresariais.

## 7. Comportamento por página interna

### `/menu`

- Header indica Menu como página atual.
- Os três pratos aprovados ficam sempre expostos; não usar tabs, filtros ou categorias inexistentes.
- Food 04 permanece interlúdio visual e não recebe nome/link.
- CTA de reserva leva a `/demo/tavola27/contact#reservas`.

### `/storia`

- Header indica Nossa história.
- Conteúdo é passivo e usa apenas manifesto/história aprovados.
- Não criar linha do tempo, equipe, fundador ou expansão sob interação.
- CTA de reserva leva a `/demo/tavola27/contact#reservas`.

### `/gallery`

- Header indica Galeria.
- Sem filtros, favoritos, download ou lightbox.
- CTA de reserva leva a `/demo/tavola27/contact#reservas`.

### `/contact`

- Header indica Contato.
- A seção `#reservas` é o destino de todos os CTAs vindos de páginas internas.
- Não existe formulário, telefone, endereço, mapa ou horário.
- A área demonstrativa mostra e anuncia o estado definido na seção 4.

## 8. Footer

- Logo leva à Home Tavola 27.
- Links repetem as quatro rotas canônicas e mantêm a mesma aba.
- O link da rota atual usa `aria-current="page"` também no footer quando isso não gerar ruído visual.
- Não renderizar telefone, endereço, CNPJ ou redes sociais.
- Os textos `Projeto demonstrativo MenezesDev.` e o aviso obrigatório permanecem visíveis, não em modal.

## 9. Estados aplicáveis

| Elemento | Estados |
|---|---|
| Link de rota | default, hover, focus-visible, active, current |
| Menu mobile | closed, opening, open, closing |
| CTA de menu | default, hover, focus-visible, active |
| CTA de reserva | default, hover, focus-visible, active, success/status |
| Trilho mobile | idle, focus-visible, scrolling, start, end |
| Imagem/grid desktop | default; entrada opcional não interativa |

Não há disabled, loading ou error porque nenhuma ação usa reserva ou rede real.

## 10. Mobile e teclado

- O menu modal substitui a navegação inline.
- CTAs de hero empilham quando necessário e preservam alvo mínimo de 48 px.
- Galeria oferece touch e teclado sem depender de hover.
- Mudança de rota fecha menu e move foco ao H1.
- Teclado virtual não interfere, pois não existe formulário nesta fase.
- Reduced motion remove entradas e suavização de scroll.

## 11. Critérios de aceite Tavola 27

- As cinco rotas possuem destino e estado ativo.
- `Conhecer o menu` sempre chega à página Menu.
- Todo `Reservar mesa` termina em aviso demonstrativo claro.
- Nenhum dado de reserva é coletado ou enviado.
- Galeria funciona sem hover, autoplay, lightbox ou carrossel pesado.
- Nenhum endereço, telefone ou restaurante real é aberto.
