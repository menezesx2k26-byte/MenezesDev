# MenezesDev — Briefing de Refinamento e Exportação da Logo

## Objetivo

Refinar a identidade visual MenezesDev existente sem realizar um redesign.

O conceito, composição geral e linguagem do monograma já estão aprovados.

O trabalho deve consistir em:

- limpeza geométrica;
- padronização;
- remoção de efeitos incorporados;
- melhoria de leitura;
- criação das variações oficiais;
- vetorização;
- preparação dos arquivos de produção.

---

# 1. Elementos que devem ser preservados

Preservar obrigatoriamente:

- conceito do monograma MD;
- leitura visual de M + D;
- faixa diagonal central;
- contraste entre elementos neutros e gradiente;
- personalidade geométrica;
- wordmark MenezesDev;
- uso destacado de “Dev”;
- direção violeta-magenta.

Não substituir o símbolo por um novo conceito.

Não transformar a marca em:

- `</>`;
- terminal;
- cursor;
- código;
- hexágono;
- monitor;
- planeta;
- circuito.

O objetivo é preservar a identidade própria já criada.

---

# 2. Refinamento do monograma

O símbolo atual deve ser redesenhado em vetor utilizando geometria limpa.

A estrutura deve permitir leitura clara de:

**M + D**

A faixa diagonal deve conectar visualmente os dois elementos sem parecer uma terceira letra independente.

## Atenção

Atualmente a faixa pode, em determinados tamanhos, sugerir visualmente um V.

O refinamento deve reduzir essa ambiguidade sem eliminar o elemento diagonal.

A alteração deve ser conservadora.

Não redesenhar completamente a marca.

---

# 3. Geometria

Todas as bordas devem ser:

- limpas;
- intencionais;
- vetoriais;
- alinhadas;
- sem irregularidades de rasterização.

Padronizar:

- espessuras;
- ângulos;
- alinhamentos;
- alturas;
- curvas;
- encontros entre elementos.

Evitar pequenas pontas ou interseções acidentais.

---

# 4. Forma do D

O D deve continuar sendo o maior elemento de fechamento do monograma.

A curva externa precisa ser limpa e estável.

O espaço negativo interno deve permanecer suficientemente aberto para boa leitura em tamanhos reduzidos.

Evitar deixar o D pesado demais em relação ao M.

---

# 5. Forma do M

O M deve permanecer claramente identificável.

Simplificar interseções quando necessário.

O espaço negativo entre suas hastes deve continuar visível mesmo em aproximadamente 32 px.

---

# 6. Faixa diagonal

A faixa diagonal é a assinatura da marca.

Manter aproximadamente o ângulo atual.

O elemento deve:

- atravessar a composição;
- criar movimento;
- utilizar o gradiente oficial;
- permanecer reconhecível isoladamente.

Não aplicar:

- blur;
- drop shadow;
- glow;
- textura;
- ruído.

O vetor deve ser completamente limpo.

---

# 7. Gradiente

Utilizar:

`#6F16FF → #E13EFF`

Pode utilizar um ponto intermediário:

`#9827FF`

Gradiente recomendado:

```text
#6F16FF
↓
#9827FF
↓
#E13EFF
```

O gradiente deve acompanhar a direção natural da faixa.

Não utilizar:

- verde;
- azul ciano;
- amarelo;
- vermelho;
- efeitos rainbow.

---

# 8. Monograma para fundo escuro

Criar:

`logo-mark-dark.svg`

Características:

- partes neutras em branco ou quase branco;
- faixa diagonal com gradiente oficial;
- fundo transparente.

Cor neutra recomendada:

`#F7F7FA`

---

# 9. Monograma para fundo claro

Criar:

`logo-mark-light.svg`

Características:

- partes neutras em preto ou quase preto;
- faixa diagonal com gradiente oficial;
- fundo transparente.

Cor neutra recomendada:

`#08080D`

---

# 10. Wordmark

Criar wordmark independente:

**MenezesDev**

A tipografia deve se aproximar da linguagem Manrope usada na identidade.

Características:

**Menezes**
- peso forte;
- cor neutra.

**Dev**
- peso equivalente;
- gradiente da marca.

Evitar diferença exagerada de espessura entre as duas palavras.

---

# 11. Wordmark dark

Arquivo:

`wordmark-dark.svg`

Uso:

fundos escuros.

Configuração:

- Menezes: `#F7F7FA`
- Dev: gradiente oficial
- fundo transparente.

---

# 12. Wordmark light

Arquivo:

`wordmark-light.svg`

Uso:

fundos claros.

Configuração:

- Menezes: `#08080D`
- Dev: gradiente oficial
- fundo transparente.

---

# 13. Logo horizontal completa

Construir:

**monograma + MenezesDev**

Manter alinhamento vertical consistente.

A distância entre símbolo e wordmark deve ser suficientemente ampla para preservar a leitura, mas sem parecer que são duas marcas distintas.

Criar:

- `logo-dark.svg`
- `logo-light.svg`

---

# 14. Tagline

Texto:

**Sites que impulsionam negócios.**

A tagline não deve fazer parte estrutural da logo principal.

Criar apenas uma assinatura estendida opcional para materiais institucionais.

Evitar letter-spacing exagerado.

A tagline deve permanecer visualmente secundária.

---

# 15. Efeitos

Remover completamente do arquivo-base:

- sombras;
- glow;
- blur;
- luz verde;
- halos;
- reflexos;
- ruído;
- textura;
- fundos.

Os efeitos podem ser recriados posteriormente no CSS ou na composição visual.

Nunca incorporá-los ao SVG mestre.

---

# 16. Fundos

Todos os arquivos oficiais devem possuir:

**fundo transparente.**

Não exportar logo oficial sobre:

- preto;
- branco;
- gradiente;
- imagem.

Essas aplicações podem existir apenas como previews.

---

# 17. SVG

Os SVGs precisam:

- utilizar `viewBox`;
- possuir dimensões proporcionais corretas;
- não depender de fontes externas;
- converter texto para paths quando necessário;
- possuir gradientes internos definidos;
- não conter imagens raster embutidas;
- não conter filtros desnecessários;
- não conter máscaras complexas quando geometria simples resolver;
- ser otimizados.

---

# 18. SVG e web

Verificar que:

- funciona no Chrome;
- funciona no Firefox;
- funciona no Safari;
- funciona no Edge;
- mantém transparência;
- mantém o gradiente;
- não produz clipping.

---

# 19. Favicons

O favicon deve ser construído a partir do monograma.

Em tamanhos extremamente pequenos, simplificações são permitidas.

Prioridade:

**leitura > fidelidade absoluta.**

Criar:

- `favicon.svg`
- `favicon-16.png`
- `favicon-32.png`
- `apple-touch-icon.png`

---

# 20. Apple Touch Icon

Tamanho:

`180 × 180`

Pode utilizar:

- fundo `#08080D`;
- monograma branco;
- faixa em gradiente.

Manter margem de proteção confortável.

---

# 21. Favicon 16 × 16

A 16 px, testar se o MD completo continua legível.

Caso não continue, utilizar versão simplificada do monograma.

A faixa violeta-magenta deve permanecer identificável.

---

# 22. Favicon 32 × 32

Utilizar preferencialmente o monograma completo.

---

# 23. Testes obrigatórios

Testar a marca em:

- 16 px;
- 24 px;
- 32 px;
- 48 px;
- 64 px;
- 128 px;
- 512 px.

Testar sobre:

- `#08080D`;
- branco puro;
- cinza claro;
- fotografia clara;
- fotografia escura.

---

# 24. Teste monocromático

Criar uma visualização temporária 100% preta e outra 100% branca.

A leitura de MD deve continuar existindo sem depender do gradiente.

Se o símbolo deixar de funcionar sem o gradiente, revisar a geometria.

---

# 25. Espaço de proteção

Criar margem de segurança equivalente aproximadamente à espessura da haste principal do M.

Nenhum elemento externo deve entrar nessa área.

---

# 26. Exportações finais

Entregar:

```text
brand/
├── logo-dark.svg
├── logo-light.svg
├── logo-mark-dark.svg
├── logo-mark-light.svg
├── wordmark-dark.svg
├── wordmark-light.svg
├── favicon.svg
├── favicon-16.png
├── favicon-32.png
├── apple-touch-icon.png
└── preview/
    ├── logo-dark-preview.png
    ├── logo-light-preview.png
    ├── mark-preview.png
    └── favicon-preview.png
```

---

# 27. Critérios de aprovação

O refinamento só está concluído quando:

- MD é legível;
- D está claramente reconhecível;
- M está claramente reconhecível;
- diagonal não parece uma letra separada;
- não existem glows incorporados;
- não existem sombras incorporadas;
- não existe verde;
- light e dark usam exatamente a mesma geometria;
- SVG é completamente vetorial;
- favicon funciona em 16 e 32 px;
- wordmark mantém boa leitura;
- arquivos possuem fundo transparente;
- proporções permanecem consistentes.

---

# 28. Regra final

Não reinterpretar a identidade.

Este é um trabalho de:

**refinamento, limpeza, vetorização e sistematização.**

O conceito já está aprovado.