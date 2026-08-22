export const tavolaNav = [
  { label: "Menu", href: "/demo/tavola27/menu" },
  { label: "Nossa história", href: "/demo/tavola27/storia" },
  { label: "Galeria", href: "/demo/tavola27/gallery" },
  { label: "Contato", href: "/demo/tavola27/contact" },
] as const;

export const tavolaDishes = [
  {
    name: "Tagliatelle al Ragù",
    description: "Massa fresca, ragù cozido lentamente e parmigiano.",
    image: {
      src: "/assets/demos/tavola27/tavola27-food-01.webp",
      width: 1200,
      height: 1500,
      alt: "Tagliatelle artesanal com ragù servido em prato de cerâmica sobre mesa de madeira.",
    },
  },
  {
    name: "Ravioli di Zucca",
    description: "Abóbora assada, manteiga, sálvia e queijo curado.",
    image: {
      src: "/assets/demos/tavola27/tavola27-food-02.webp",
      width: 1536,
      height: 1024,
      alt: "Ravioli artesanal de abóbora com manteiga dourada e folhas de sálvia.",
    },
  },
  {
    name: "Tiramisù della Casa",
    description: "Mascarpone, café e cacau.",
    image: {
      src: "/assets/demos/tavola27/tavola27-food-03.webp",
      width: 1200,
      height: 1500,
      alt: "Porção de tiramisù com camadas de mascarpone, café e cacau em mesa de madeira.",
    },
  },
] as const;

export const tavolaImages = [
  {
    src: "/assets/demos/tavola27/tavola27-hero.webp",
    width: 1536,
    height: 960,
    alt: "Mesa de restaurante italiano contemporâneo com massa, vinho e interior em tons quentes.",
  },
  ...tavolaDishes.map((dish) => dish.image),
  {
    src: "/assets/demos/tavola27/tavola27-food-04.webp",
    width: 1536,
    height: 1024,
    alt: "Peixe assado servido com feijões cannellini, tomates e ervas em prato de cerâmica.",
  },
  {
    src: "/assets/demos/tavola27/tavola27-space-01.webp",
    width: 1536,
    height: 960,
    alt: "Salão do Tavola 27 com paredes creme e verdes, mesas de madeira e luz natural.",
  },
  {
    src: "/assets/demos/tavola27/tavola27-space-02.webp",
    width: 1536,
    height: 1024,
    alt: "Cozinha aberta do restaurante vista pelo passe, com cozinheiros trabalhando de forma natural.",
  },
  {
    src: "/assets/demos/tavola27/tavola27-space-03.webp",
    width: 1200,
    height: 1500,
    alt: "Mesa para duas pessoas junto à janela em canto íntimo do restaurante Tavola 27.",
  },
  {
    src: "/assets/demos/tavola27/tavola27-detail-01.webp",
    width: 1536,
    height: 1024,
    alt: "Mãos cortando massa fresca em tiras sobre bancada enfarinhada na cozinha.",
  },
  {
    src: "/assets/demos/tavola27/tavola27-detail-02.webp",
    width: 1536,
    height: 1024,
    alt: "Louça artesanal, linho, ervas, farinha e azeite preparados para o serviço.",
  },
] as const;
