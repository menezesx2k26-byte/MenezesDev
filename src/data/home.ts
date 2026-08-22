import type { FAQItem, Plan } from "../types";

export const trustItems = [
  { title: "Rápido", text: "Experiência leve e otimizada." },
  { title: "Responsivo", text: "Perfeito em qualquer tela." },
  { title: "Seguro", text: "HTTPS e infraestrutura moderna." },
  { title: "Encontrável", text: "Base técnica preparada para SEO." },
] as const;

export const socialComparison = {
  social: [
    "informações espalhadas",
    "conteúdo depende da plataforma",
    "difícil apresentar todos os serviços",
    "pouca liberdade visual",
    "contato nem sempre é imediato",
  ],
  website: [
    "sua marca em um endereço próprio",
    "serviços organizados",
    "apresentação profissional",
    "contato direto",
    "presença permanente na web",
  ],
} as const;

export const services: ReadonlyArray<{ title: string; text: string; microcopy?: string }> = [
  {
    title: "Sites institucionais",
    text: "Apresente sua empresa, seus serviços e seus diferenciais em uma presença digital profissional.",
    microcopy: "Ideal para empresas e profissionais.",
  },
  {
    title: "Landing Pages",
    text: "Páginas objetivas para apresentar uma oferta, serviço, campanha ou negócio com clareza e foco em conversão.",
    microcopy: "A partir de R$600.",
  },
  {
    title: "Catálogos digitais",
    text: "Organize produtos ou serviços em uma experiência simples de navegar e fácil de compartilhar.",
  },
  {
    title: "Integrações",
    text: "WhatsApp, formulários, mapas, analytics e outras ferramentas conectadas ao seu site.",
  },
  {
    title: "Aplicações personalizadas",
    text: "Dashboards, bancos de dados, áreas administrativas e soluções web desenvolvidas conforme a necessidade do projeto.",
    microcopy: "Sob orçamento.",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Briefing",
    text: "Entendemos seu negócio, seus objetivos, seu público e o que o site precisa comunicar.",
  },
  {
    number: "02",
    title: "Direção visual",
    text: "Definimos estrutura, identidade, hierarquia visual, conteúdo e experiência de navegação.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    text: "O site é construído, adaptado para diferentes dispositivos e integrado às ferramentas necessárias.",
  },
  {
    number: "04",
    title: "Publicação",
    text: "Configuramos domínio, HTTPS, hospedagem e os últimos detalhes antes do lançamento.",
  },
] as const;

export const capabilities = [
  {
    title: "Performance",
    text: "Arquitetura leve, imagens otimizadas e carregamento pensado para uma experiência rápida.",
  },
  {
    title: "Responsividade",
    text: "A experiência é planejada para funcionar bem em celulares, tablets e computadores.",
  },
  {
    title: "SEO técnico",
    text: "Estrutura semântica, metadados e boas práticas para facilitar a indexação do site.",
  },
  { title: "Segurança", text: "HTTPS e boas práticas adequadas à arquitetura utilizada." },
  {
    title: "Infraestrutura moderna",
    text: "Projetos preparados para utilizar serviços modernos de distribuição, hospedagem e entrega de conteúdo.",
  },
  {
    title: "Código versionado",
    text: "O desenvolvimento utiliza Git para manter histórico e organização das alterações do projeto.",
  },
] as const;

export const plans: readonly Plan[] = [
  {
    name: "Essencial",
    price: "A partir de R$600",
    description: "Para quem precisa colocar o negócio na internet com uma presença profissional.",
    highlight: "Landing page completa",
    includes: [
      "uma página",
      "até 8 seções",
      "design responsivo",
      "botão de WhatsApp",
      "links para redes sociais",
      "localização",
      "SEO técnico básico",
      "HTTPS",
      "publicação",
      "2 rodadas de revisão",
    ],
    cta: "Quero começar",
  },
  {
    name: "Profissional",
    price: "A partir de R$950",
    description: "Para empresas que precisam de uma presença institucional completa.",
    highlight: "Site com até 5 páginas",
    includes: [
      "tudo do Essencial",
      "até 5 páginas",
      "formulário de contato",
      "proteção contra spam",
      "SEO técnico ampliado",
      "página 404",
      "analytics quando solicitado",
      "estrutura preparada para expansão",
      "2 rodadas de revisão",
    ],
    cta: "Solicitar orçamento",
    recommended: true,
  },
  {
    name: "Negócio",
    price: "A partir de R$1.500",
    description:
      "Para empresas que querem transformar o site em uma ferramenta ativa de geração de contatos.",
    highlight: "Estrutura orientada a conversão",
    includes: [
      "tudo do Profissional",
      "até 7 páginas",
      "formulários personalizados",
      "rastreamento de conversões",
      "Google Analytics",
      "integração com Meta Pixel quando solicitada",
      "páginas estratégicas",
      "CTAs orientados a conversão",
      "preparação para campanhas",
    ],
    cta: "Quero gerar mais contatos",
  },
];

export const faqs = [
  {
    question: "Quanto custa um site?",
    answer: [
      "Projetos começam em R$600 para uma landing page profissional.",
      "Sites institucionais completos começam em R$950 e projetos mais avançados são avaliados conforme o escopo.",
    ],
  },
  {
    question: "O domínio está incluído?",
    answer: [
      "O registro do domínio não está incluído no valor do desenvolvimento.",
      "A configuração e o apontamento podem ser feitos durante a publicação do projeto.",
      "O domínio deve preferencialmente ficar registrado em nome do cliente.",
    ],
  },
  {
    question: "Preciso pagar hospedagem todo mês?",
    answer: [
      "Nem sempre.",
      "Muitos sites institucionais conseguem operar em infraestruturas modernas com planos gratuitos ou de baixo custo.",
      "Caso o projeto ultrapasse esses limites ou precise de serviços adicionais, os possíveis custos são apresentados antes da contratação.",
    ],
  },
  {
    question: "Quanto tempo demora para o site ficar pronto?",
    answer: [
      "Uma landing page costuma levar entre 5 e 10 dias úteis após o recebimento do conteúdo necessário.",
      "Sites maiores podem levar de 7 a 20 dias úteis, dependendo do escopo.",
    ],
  },
  {
    question: "Preciso ter todos os textos e imagens prontos?",
    answer: [
      "Não necessariamente.",
      "Podemos ajudar a organizar o conteúdo e indicar soluções para imagens e elementos visuais.",
      "Produções mais extensas de texto ou material específico podem ser contratadas separadamente.",
    ],
  },
  {
    question: "Posso pedir alterações durante o projeto?",
    answer: [
      "Sim.",
      "Os pacotes incluem duas rodadas de revisão dentro do escopo contratado.",
      "Mudanças estruturais, novas páginas ou funcionalidades adicionais são avaliadas separadamente.",
    ],
  },
  {
    question: "O site funciona bem no celular?",
    answer: [
      "Sim.",
      "Todos os projetos são desenvolvidos para funcionar em celulares, tablets e computadores.",
    ],
  },
  {
    question: "Meu site vai aparecer em primeiro no Google?",
    answer: [
      "Nenhuma empresa séria pode garantir uma posição específica nos resultados de busca.",
      "O projeto inclui boas práticas técnicas de SEO para facilitar indexação, desempenho e compreensão do conteúdo pelos mecanismos de busca.",
    ],
  },
  {
    question: "Sou obrigado a contratar manutenção mensal?",
    answer: [
      "Não.",
      "Depois da entrega, você pode manter o site sem plano mensal e contratar alterações quando precisar.",
      "Também existem planos opcionais de manutenção para quem prefere acompanhamento contínuo.",
    ],
  },
  {
    question: "O projeto é meu depois da entrega?",
    answer: [
      "Após a quitação, os arquivos e o código do projeto podem ser entregues ao cliente, respeitando as licenças das tecnologias e serviços utilizados.",
    ],
  },
  {
    question: "Como funciona o pagamento?",
    answer: [
      "O modelo padrão é 50% para iniciar o projeto e 50% antes da publicação definitiva.",
      "Projetos maiores podem utilizar etapas intermediárias.",
    ],
  },
] as const satisfies readonly FAQItem[];
