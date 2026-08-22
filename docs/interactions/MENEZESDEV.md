# Interações — MenezesDev

## 1. Escopo

Este contrato cobre a Home comercial e o template editorial das páginas `/projetos/<slug>`. A estrutura permanece a definida em `docs/wireframes/MENEZESDEV.md`.

## 2. Navbar e menu mobile

### Desktop

- Header sticky, sempre visível e com altura constante de 80 px.
- Marca leva a `/`.
- Projetos, Serviços, Processo, Planos e FAQ usam as âncoras canônicas na mesma aba.
- `Solicitar orçamento` abre o WhatsApp real aprovado em nova aba.
- A seção ativa segue o contrato global de `aria-current="location"`.
- Ao navegar a partir de uma página de case, links de seção levam para `/#destino`.

### Mobile

- O acionador abre o painel modal global e informa estado expandido.
- Ordem: Projetos → Serviços → Processo → Planos → FAQ → `Falar pelo WhatsApp`.
- A ação de WhatsApp encerra o painel antes de abrir a nova aba.
- Fechamento, foco, Escape, clique fora e scroll lock seguem `docs/interactions/README.md`.

## 3. Destino comercial real

O repositório não contém atualmente número ou URL de WhatsApp aprovados. O contrato é:

- a Fase 8 fornece uma única URL real e validada para todas as ações comerciais da MenezesDev;
- a URL inclui a mensagem aprovada: `Olá! Vi o site da MenezesDev e gostaria de solicitar um orçamento para um site.`;
- nenhuma informação pessoal adicional é pré-preenchida;
- o link abre em nova aba e preserva a página comercial;
- se a URL não estiver configurada, a Home falha no critério de publicação; não usar `#`, número fictício, link genérico do WhatsApp ou CTA silenciosamente inativo;
- nenhum valor de contato deve ser copiado para os demos fictícios.

## 4. Matriz completa de CTAs da Home

| Texto | Contexto | Destino | Aba | Comportamento/fallback |
|---|---|---|---|---|
| `Solicitar orçamento` | navbar desktop | WhatsApp aprovado | nova | bloqueia publicação se ausente |
| `Falar pelo WhatsApp` | menu mobile | WhatsApp aprovado | nova | fecha menu antes de abrir |
| `Quero meu site` | hero | WhatsApp aprovado | nova | feedback de pressão; sem spinner |
| `Ver projetos` | hero | `/#projetos` | mesma | scroll com offset e foco no H2 |
| `Ver projeto` | card M47 | `/projetos/m47` | mesma | card inteiro é um único link |
| `Ver projeto` | card Tavola 27 | `/projetos/tavola-27` | mesma | card inteiro é um único link |
| `Ver projeto` | card Prismae | `/projetos/prismae` | mesma | card inteiro é um único link |
| `Solicitar orçamento` | pós-portfólio | WhatsApp aprovado | nova | mesma mensagem aprovada |
| `Quero começar` | plano Essencial | WhatsApp aprovado | nova | nenhum dado de plano é anexado à mensagem |
| `Solicitar orçamento` | plano Profissional | WhatsApp aprovado | nova | badge recomendado não altera destino |
| `Quero gerar mais contatos` | plano Negócio | WhatsApp aprovado | nova | sem promessa de resultado |
| `Contar sobre meu projeto` | personalizado | WhatsApp aprovado | nova | sem formulário intermediário |
| `Falar pelo WhatsApp` | CTA final | WhatsApp aprovado | nova | CTA primário da seção |
| `Ver planos` | CTA final | `/#planos` | mesma | scroll e foco no H2 |
| `Solicitar orçamento` | footer | WhatsApp aprovado | nova | mesmo contrato comercial |

Não existem CTAs adicionais implícitos nos indicadores, serviços, processo ou diferenciais técnicos.

## 5. Cards dos projetos

### Semântica e clique

- Cada card é um único link que contém imagem, label `Conceito demonstrativo`, nome, categoria, headline, descrição, tags, correspondência comercial e o texto `Ver projeto`.
- Não criar link aninhado no título ou CTA. O texto de CTA funciona como indicação visual dentro do mesmo link.
- O nome do projeto identifica acessivelmente o card; a imagem usa o alt definido pelo asset quando informativa.
- O label demonstrativo fica sempre visível em desktop e mobile.

### Desktop

- Hover pode elevar o card em no máximo 4 px e ampliar a imagem até 1.02.
- A mudança dura 180–240 ms e não altera o tamanho ocupado no grid.
- Título e CTA ganham indicação coerente de clicabilidade; nenhuma descrição aparece somente no hover.
- Focus-visible aplica o mesmo destaque espacial do hover mais anel de foco independente.
- Active remove a elevação por 80–120 ms.

### Mobile

- Card inteiro mantém alvo clicável; nenhum gesto extra revela CTA ou tags.
- Não há hover, flip, overlay de leitura obrigatória ou ação por swipe.
- Active usa apenas resposta curta de superfície/pressão.
- O foco por teclado segue M47 → Tavola 27 → Prismae.

## 6. Indicadores, serviços, processo e diferenciais

### Indicadores do hero e barra de confiança

- São conteúdo informativo e não recebem cursor de link, `tabindex`, tooltip ou expansão.
- Entrada pode usar o motion global uma única vez, sem contagem numérica.

### Serviços

- Os cinco blocos não são links enquanto não existirem páginas de serviço aprovadas.
- Hover pode ajustar superfície de maneira sutil, mas não pode sugerir navegação; preferir ausência de elevação.
- Nenhum texto é truncado ou revelado sob interação.

### Processo

- As etapas 01–04 são informativas e seguem a ordem do wireframe.
- Entrada opcional em desktop usa grupo único ou stagger de até 60 ms entre no máximo quatro itens.
- Mobile apresenta a sequência vertical sem accordion e sem scroll horizontal.
- A observação sobre duas rodadas de revisão permanece sempre visível.

### Diferenciais técnicos

- São informativos, sem modal de detalhes ou métricas animadas.
- `Desenvolvido para ser rápido.` não é botão nem badge acionável.

## 7. Planos e preços

### Desktop

- Listas `Inclui` permanecem visíveis e não são accordions.
- Somente os CTAs de cada plano entram na ordem de Tab.
- O card Profissional usa `RECOMENDADO` como informação estática. Não pulsa, não altera preço e não seleciona opções automaticamente.
- Cards inteiros não são clicáveis.

### Mobile

- Cada área `Inclui` é um disclosure fechado inicialmente.
- Vários planos podem permanecer abertos.
- O botão do disclosure possui alvo mínimo de 44 px, `aria-expanded`, indicador visual e texto `Inclui` já aprovado.
- Abrir/recolher segue o motion do accordion e reduced motion global.
- O CTA do plano permanece fora do painel recolhível e sempre visível.
- Ao alternar de mobile para desktop, todas as listas aparecem. Ao retornar ao mobile na mesma sessão, o estado anterior pode ser preservado.

### Estados

- Preço e ressalvas nunca ficam em tooltip.
- Hover/focus no CTA não muda preço, escopo ou badge.
- Não existe seleção de plano, comparação dinâmica, desconto, urgência ou contador.

## 8. FAQ

- Implementa exatamente o accordion global.
- As onze perguntas começam fechadas.
- Várias respostas podem ficar abertas para comparação.
- A ordem da copy é preservada.
- O hash não muda a cada abertura; FAQ continua sendo uma interação local.
- Abertura não dispara analytics nesta fase.
- Respostas nunca são resumidas, carregadas sob demanda ou truncadas.

## 9. CTA final, contato e footer

### CTA final

- `Falar pelo WhatsApp` segue o destino comercial real.
- `Ver planos` volta para `#planos` na mesma aba.
- Não há CTA flutuante, popup de saída ou captura de lead adicional.

### Footer

- Marca leva a `/`.
- Projetos, Serviços, Processo, Planos e FAQ levam às âncoras da Home.
- Os nomes Landing Pages, Sites institucionais, Catálogos, Integrações e Projetos personalizados permanecem texto informativo até existirem rotas aprovadas; não criar cinco links falsos para a mesma seção.
- `Solicitar orçamento` abre o WhatsApp aprovado.
- Links sociais só são renderizados quando houver URL real aprovada. Como nenhuma existe hoje, o grupo social é omitido por completo, sem ícones desabilitados.

## 10. Página reutilizável de case

### Navegação e mídia

- Usa o header MenezesDev e as mesmas regras de menu.
- Cover e faixa de assets são passivos; não há lightbox nesta fase.
- A seção de screenshots não existe no DOM enquanto capturas reais não estiverem disponíveis.
- Se screenshots reais forem adicionados depois, comportamento de zoom/lightbox exige nova decisão; não inferir a partir da galeria.

### CTA do case

| Case | Destino do `Ver projeto` |
|---|---|
| M47 | `/demo/m47` |
| Tavola 27 | `/demo/tavola27` |
| Prismae | `/demo/prismae` |

- Abre na mesma aba porque permanece no ecossistema MenezesDev.
- Se a rota da demo ainda não existir na Fase 8, o CTA não deve ser publicado; não usar página vazia, screenshot ou URL externa provisória.
- CTAs comerciais da MenezesDev presentes no fechamento da página seguem o WhatsApp real.

## 11. Estados aplicáveis

| Elemento | Estados |
|---|---|
| Link de navegação | default, hover, focus-visible, active, current |
| Menu mobile | closed, opening, open, closing |
| CTA WhatsApp | default, hover, focus-visible, active; sem loading |
| Card de case | default, hover, focus-visible, active |
| Disclosure de plano | collapsed, expanded, focus-visible |
| FAQ | collapsed, expanded, focus-visible |
| Conteúdo informativo | default; sem estado interativo |

## 12. Critérios de aceite MenezesDev

- Todos os CTAs da copy aprovada constam na matriz.
- O caminho hero → projetos/WhatsApp, projetos → case e planos → WhatsApp é direto.
- Nenhum bloco informativo parece link sem destino.
- Cards funcionam integralmente sem hover.
- FAQ e disclosures funcionam por teclado e reduced motion.
- Nenhuma URL social ou de WhatsApp fictícia é publicada.
- Páginas de case não mostram screenshots ausentes.
