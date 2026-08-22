# Interações — Prismae

## 1. Escopo

Prismae é uma demo multipágina sob `/demo/prismae`. Navegação, soluções, dados e formulário seguem `docs/wireframes/PRISMAE.md`. Nenhuma ação envia dados para uma Prismae real ou para qualquer endpoint.

## 2. Rotas e navegação

| Item | Destino | Estado |
|---|---|---|
| Logo | `/demo/prismae` | ativo |
| Soluções | `/demo/prismae/solutions` | ativo |
| Metodologia | `/demo/prismae#metodologia` | ativo |
| Sobre | `/demo/prismae/about` | reservado; oculto até aprovação de copy |
| Contato | `/demo/prismae/contact` | ativo |
| Estratégia | `/demo/prismae/solutions/strategy` | ativo |
| Processos | `/demo/prismae/solutions/processes` | ativo |
| Indicadores | `/demo/prismae/solutions/indicators` | ativo |

- Rotas abrem na mesma aba.
- `aria-current="page"` identifica a rota; Soluções permanece o item pai ativo nas três subpáginas.
- Metodologia usa `aria-current="location"` somente na Home quando a seção está ativa.
- Header sticky mantém 76 px desktop e 64 px mobile.

### Incompatibilidade justificada — `/about`

O wireframe reserva Sobre no header, mas não existe copy institucional pública suficiente. Um link ativo levaria a conteúdo inventado ou incompleto. Portanto:

- a posição continua reservada no contrato estrutural;
- o item não é renderizado na navegação pública enquanto a copy não for aprovada;
- não usar link disabled, tooltip, página vazia ou redirecionamento para metodologia;
- quando a copy existir, Sobre retorna à posição entre Metodologia e Contato sem alterar os outros comportamentos.

## 3. Menu mobile

- Ordem enquanto `/about` estiver pendente: Soluções → Metodologia → Contato → `Solicitar diagnóstico`.
- Após aprovação de copy: Soluções → Metodologia → Sobre → Contato → CTA.
- O CTA fecha o painel e navega para `/demo/prismae/contact#diagnostico`.
- Focus trap, Escape, clique fora, retorno de foco, scroll lock e rota ativa seguem o contrato global.

## 4. CTAs e cards de solução

| Texto/controle | Contexto | Destino | Comportamento |
|---|---|---|---|
| `Solicitar diagnóstico` | header | `/demo/prismae/contact#diagnostico` | mesma aba; foca heading do formulário |
| `Solicitar diagnóstico` | hero | `/demo/prismae/contact#diagnostico` | mesma aba |
| `Conhecer soluções` | hero | `/demo/prismae/solutions` | mesma aba; foca H1 |
| Estratégia | card de solução | `/demo/prismae/solutions/strategy` | card inteiro é um link |
| Processos | card de solução | `/demo/prismae/solutions/processes` | card inteiro é um link |
| Indicadores | card de solução | `/demo/prismae/solutions/indicators` | card inteiro é um link |
| `Solicitar diagnóstico` | fim de Soluções | `/demo/prismae/contact#diagnostico` | uma ação por seção |
| `Solicitar diagnóstico` | Metodologia | `/demo/prismae/contact#diagnostico` | depois dos quatro passos |
| `Solicitar diagnóstico` | CTA intermediário/final | `/demo/prismae/contact#diagnostico` | sem popup ou captura adicional |
| `Solicitar diagnóstico` | formulário | submit local | valida e simula somente interface |

### Cards de solução

- Cada card é um único link com título e descrição; não contém CTA aninhado.
- Hover eleva no máximo 3 px e não revela benefício, número ou copy adicional.
- Focus-visible aplica anel independente e o mesmo destaque estrutural.
- Mobile exibe todo o conteúdo sem hover; active oferece resposta curta.

## 5. Hero, problema e metodologia

### Hero

- CTAs ficam disponíveis imediatamente.
- `prismae-hero-graphic.svg` é passivo, não recebe hover, zoom ou link.
- O gráfico não conta valores nem reage ao cursor.

### Problema

- Os cinco itens são informativos; não usam accordion, tooltip ou severidade interativa.
- Não entram individualmente com stagger longo.

### Metodologia

- Desktop: `prismae-process.svg` é passivo.
- Mobile: quatro blocos HTML permanecem passivos, na ordem 01–04.
- Não transformar os passos em wizard, tabs ou processo clicável.
- O CTA posterior é o único controle da seção.

## 6. Dados ilustrativos

- Gráficos são frontend/SVG passivos e mantêm `Dados ilustrativos.` em cada módulo.
- Não há tooltip de valores, filtro, hover de série, download, animação de contagem ou comparação temporal.
- Se um gráfico exigir descrição adicional, ela fica em texto visível; não depende de hover.
- Entrada opcional revela o módulo como unidade, sem desenhar linhas progressivamente ou sugerir resultado alcançado.
- Mobile empilha módulos; nenhum gesto horizontal é necessário.

## 7. Formulário demonstrativo

### Transparência antes do submit

Próximo ao início do formulário deve ficar visível o aviso: `Demonstração de interface. Nenhum dado será enviado.`

Esse aviso não substitui a mensagem de sucesso aprovada e não fica escondido em tooltip ou política externa.

### Contrato dos campos

| Campo | Obrigatório | Tipo/comportamento | Validação e mensagem |
|---|---|---|---|
| Nome | sim | texto; autofill `name`; 2–80 caracteres após trim | `Informe seu nome.` |
| Empresa | sim | texto; autofill `organization`; 2–120 caracteres | `Informe sua empresa.` |
| E-mail | sim | e-mail; autofill `email` | vazio: `Informe seu e-mail.`; inválido: `Informe um e-mail válido.` |
| WhatsApp | não | telefone; autofill `tel`; ajuda visível `DDD + número` | se preenchido e inválido: `Informe um telefone válido com DDD.` |
| Principal desafio | sim | texto livre; 3–160 caracteres; sem opções inventadas | `Descreva seu principal desafio.` |
| Mensagem | não | textarea; máximo 1000 caracteres | excesso: `Use no máximo 1000 caracteres.` |

- Labels permanecem visíveis; os campos não precisam de placeholder.
- WhatsApp aceita formatação digitada, mas valida de 10 a 15 dígitos após normalização.
- Limites impedem envio inválido, mas não apagam automaticamente o que foi digitado.
- Nenhum campo contém valor inicial, exemplo empresarial ou dado pessoal fictício.

### Submit inválido

1. Evita submit local.
2. Preserva todos os valores.
3. Marca campos com `aria-invalid` e conecta mensagens por descrição acessível.
4. Atualiza uma mensagem geral em região viva educada com a quantidade de campos a corrigir.
5. Move foco ao primeiro campo inválido na ordem Nome → Empresa → E-mail → WhatsApp → Principal desafio → Mensagem.
6. Revalida o campo em blur e novamente no próximo submit; não mostra erro antes da primeira tentativa ou saída do campo.

### Estado enviando/loading

- Após validação bem-sucedida, o formulário entra em `aria-busy` e o botão mantém sua largura.
- O rótulo temporário é `Processando demonstração…`, não `Enviando…`, porque nenhuma transmissão ocorre.
- Controles ficam indisponíveis por um ciclo local curto, suficiente para a mudança ser anunciada e nunca maior que aproximadamente 400 ms.
- Não criar atraso artificial longo, spinner contínuo ou request de rede.
- Submits adicionais são ignorados enquanto o estado está ativo.

### Sucesso

O formulário é substituído pelo conteúdo aprovado:

`Recebemos sua solicitação.`

`Em um projeto real, os dados seriam enviados ao fluxo comercial configurado para a empresa.`

`Como este é um conceito demonstrativo, nenhuma solicitação comercial será encaminhada à Prismae.`

- O heading de sucesso recebe foco programático.
- Valores são removidos da interface e da memória local; nada é salvo em localStorage, analytics ou rede.
- Não criar número de protocolo, e-mail de confirmação ou prazo de resposta.
- Não há erro de servidor, pois não existe servidor nesta fase.

### Teclado

- Tab segue a ordem visual dos campos e do CTA.
- Enter em campo de linha única tenta submit; Enter em Mensagem cria nova linha.
- Foco visível permanece dentro do campo e não é coberto pelo header/teclado virtual.

## 8. Anti-spam conceitual

A Fase 8 deve especificar proteção somente se um formulário real for criado em outro contexto. Requisitos mínimos futuros:

- validação no servidor;
- limitação de frequência;
- campo-armadilha ou mecanismo equivalente não exposto ao usuário;
- verificação sem bloquear tecnologia assistiva;
- nenhum dado pessoal em logs de analytics;
- mensagem de erro recuperável.

Nenhum provedor, binding, captcha ou backend é escolhido na Fase 7. A demo Prismae não precisa de anti-spam porque não transmite dados.

## 9. Páginas internas

### `/solutions`

- Os três cards navegam para suas subpáginas.
- Processo permanece passivo.
- CTA leva ao formulário demonstrativo.

### `/solutions/strategy`, `/processes`, `/indicators`

- A rota pai Soluções permanece marcada como atual.
- Diagramas e gráficos são passivos.
- Não há tabs entre páginas; navegação ocorre por links explícitos do shell/overview.
- Conteúdo não aprovado não é revelado por accordion ou tooltip.
- CTA leva a `/demo/prismae/contact#diagnostico`.

### `/about`

- Não é navegável até a copy ser aprovada.
- Não criar história, equipe, credenciais, clientes ou resultados.

### `/contact`

- Contato é a rota atual.
- `#diagnostico` posiciona e foca o heading do formulário.
- O formulário usa exclusivamente o fluxo local descrito na seção 7.

## 10. Footer

- Logo leva à Home Prismae.
- Soluções e Contato usam rotas canônicas; Metodologia volta à âncora da Home.
- Sobre é omitido enquanto a copy estiver pendente.
- Não renderizar endereço, telefone, CNPJ, clientes, certificações ou redes sociais.
- Aviso obrigatório de conceito fictício permanece visível.

## 11. Estados aplicáveis

| Elemento | Estados |
|---|---|
| Link de rota | default, hover, focus-visible, active, current |
| Card de solução | default, hover, focus-visible, active |
| Menu mobile | closed, opening, open, closing |
| Campo | default, hover, focus-visible, filled, invalid, disabled durante loading |
| Submit | default, hover, focus-visible, active, loading, success |
| Formulário | pristine, attempted, invalid, busy, success |
| Gráfico/processo | default; entrada opcional não interativa |

## 12. Mobile

- Menu usa painel modal e omite Sobre enquanto pendente.
- Cards, dados e campos empilham sem alterar a ordem.
- CTA pode ocupar largura total.
- Erros aparecem imediatamente abaixo do campo e não deslocam o foco para fora da viewport.
- Durante teclado virtual, não há CTA sticky cobrindo Mensagem ou submit.
- Process graphic usa HTML equivalente, sem trilho horizontal.
- Nenhuma interação depende de hover.

## 13. Critérios de aceite Prismae

- Todas as rotas aprovadas possuem destino e estado ativo.
- Sobre permanece ausente até existir copy, com a posição documentada.
- CTAs de diagnóstico chegam ao formulário demonstrativo.
- Validação cobre labels, required, formato, erros, foco, preservação, loading, sucesso e múltiplos submits.
- Nenhum dado sai do navegador ou é persistido.
- Mensagem de sucesso é exatamente a aprovada.
- Dados ilustrativos não ganham números, tooltips ou animações enganosas.
- Anti-spam permanece requisito técnico futuro, sem provedor escolhido.
