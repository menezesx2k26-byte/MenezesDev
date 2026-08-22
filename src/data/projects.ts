import type { Project } from "../types";

export const projects = [
  {
    slug: "m47",
    name: "M47 Barber",
    category: "Barbearia · Landing Page",
    label: "Conceito demonstrativo",
    headline: "Presença forte para uma marca de personalidade.",
    description:
      "Website desenvolvido como conceito para uma barbearia moderna, reunindo serviços, localização, horários e contato em uma experiência visual direta e sofisticada.",
    tags: ["Landing Page", "Mobile First", "WhatsApp", "Localização"],
    plan: "Essencial — a partir de R$600",
    demoHref: "/demo/m47",
    cover: {
      src: "/assets/demos/m47/m47-hero.webp",
      width: 1536,
      height: 960,
      alt: "Barbeiro finalizando o corte de um cliente em uma barbearia contemporânea escura.",
    },
    strip: [
      {
        src: "/assets/demos/m47/m47-gallery-01.webp",
        width: 1200,
        height: 1500,
        alt: "Barbeiro realizando corte masculino com tesoura e pente.",
      },
      {
        src: "/assets/demos/m47/m47-gallery-05.webp",
        width: 1536,
        height: 960,
        alt: "Interior contemporâneo da barbearia M47 em luz quente.",
      },
      {
        src: "/assets/demos/m47/m47-gallery-06.webp",
        width: 1200,
        height: 1500,
        alt: "Retrato editorial masculino depois do atendimento.",
      },
    ],
    context: [
      "Landing page compacta para uma barbearia urbana, precisa, masculina e contemporânea.",
      "O projeto organiza serviços, ambiente, localização e uma ação demonstrativa de agendamento em uma narrativa direta.",
    ],
    approach: [
      "Hero cinematográfico com copy à esquerda e ação fotográfica à direita.",
      "Galeria editorial com seis cenas distintas do mesmo ensaio.",
      "Hierarquia linear e responsiva para sustentar uma decisão rápida.",
    ],
    features: [
      "Landing page",
      "Galeria editorial",
      "Navegação por âncoras",
      "Agendamento demonstrativo",
    ],
  },
  {
    slug: "tavola-27",
    name: "Tavola 27",
    category: "Restaurante · Site institucional",
    label: "Conceito demonstrativo",
    headline: "A experiência começa antes da primeira mesa.",
    description:
      "Conceito de website para restaurante, pensado para apresentar ambiente, cardápio, localização e canais de contato com uma linguagem visual marcante.",
    tags: ["Restaurante", "Cardápio", "Responsivo", "Contato"],
    plan: "Profissional — a partir de R$950",
    demoHref: "/demo/tavola27",
    cover: {
      src: "/assets/demos/tavola27/tavola27-hero.webp",
      width: 1536,
      height: 960,
      alt: "Mesa de restaurante contemporâneo com massa, vinho e interior em tons quentes.",
    },
    strip: [
      {
        src: "/assets/demos/tavola27/tavola27-food-01.webp",
        width: 1200,
        height: 1500,
        alt: "Tagliatelle ao ragu servido em louça artesanal.",
      },
      {
        src: "/assets/demos/tavola27/tavola27-space-01.webp",
        width: 1536,
        height: 960,
        alt: "Salão acolhedor do Tavola 27 com madeira natural.",
      },
      {
        src: "/assets/demos/tavola27/tavola27-detail-02.webp",
        width: 1536,
        height: 1024,
        alt: "Detalhe de massa fresca sendo preparada.",
      },
    ],
    context: [
      "Site institucional multipágina para um restaurante contemporâneo de cozinha italiana.",
      "A coleção fotográfica funciona como sistema editorial para comida, espaço, história e contato.",
    ],
    approach: [
      "Imagens grandes alternam com copy curta e serifada.",
      "As páginas internas mudam o ritmo e a seleção de imagens conforme a função.",
      "A reserva permanece inequivocamente demonstrativa e local.",
    ],
    features: ["Site multipágina", "Menu editorial", "Galeria", "Reserva demonstrativa"],
  },
  {
    slug: "prismae",
    name: "Prismae",
    category: "Consultoria · Site para geração de leads",
    label: "Conceito demonstrativo",
    headline: "Confiança também é construída no digital.",
    description:
      "Website institucional para uma empresa de serviços, com foco em autoridade, organização da informação e geração de contatos comerciais.",
    tags: ["Institucional", "Serviços", "Formulário", "SEO técnico"],
    plan: "Negócio — a partir de R$1.500",
    demoHref: "/demo/prismae",
    cover: {
      src: "/assets/demos/prismae/prismae-hero-graphic.svg",
      width: 960,
      height: 720,
      alt: "Sistema gráfico abstrato da Prismae sobre estratégia, processos e indicadores.",
    },
    strip: [
      {
        src: "/assets/demos/prismae/prismae-process.svg",
        width: 1280,
        height: 360,
        alt: "Processo em quatro etapas: diagnóstico, priorização, implementação e acompanhamento.",
      },
    ],
    context: [
      "Site institucional multipágina para uma consultoria fictícia de gestão e estratégia.",
      "A autoridade visual nasce de grid, tipografia, processos, dados ilustrativos e formulário — sem fotografia corporativa.",
    ],
    approach: [
      "Sistema visual determinístico construído com SVG e frontend.",
      "Soluções distribuídas em rotas específicas sem promessas empresariais inventadas.",
      "Formulário com validação e sucesso local, sem transmissão ou persistência.",
    ],
    features: [
      "Site multipágina",
      "Dados ilustrativos",
      "SVG responsivo",
      "Formulário demonstrativo",
    ],
  },
] as const satisfies readonly Project[];

export function getProject(slug: Project["slug"]): Project {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Projeto não encontrado: ${slug}`);
  return project;
}
