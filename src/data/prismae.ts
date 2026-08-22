export const prismaeNav = [
  { label: "Soluções", href: "/demo/prismae/solutions" },
  { label: "Metodologia", href: "/demo/prismae#metodologia" },
  { label: "Contato", href: "/demo/prismae/contact" },
] as const;

export const prismaeProblems = [
  "decisões sem dados",
  "processos pouco claros",
  "retrabalho",
  "responsabilidades confusas",
  "indicadores que chegam tarde",
] as const;

export const prismaeSolutions = [
  {
    slug: "strategy",
    title: "Estratégia",
    description: "Planejamento e prioridades que transformam objetivos em ações.",
  },
  {
    slug: "processes",
    title: "Processos",
    description: "Fluxos mais claros para reduzir atrito e retrabalho.",
  },
  {
    slug: "indicators",
    title: "Indicadores",
    description: "Informação organizada para apoiar decisões melhores.",
  },
] as const;

export const prismaeSteps = [
  { number: "01", title: "Diagnóstico", description: "Entendimento do cenário atual." },
  {
    number: "02",
    title: "Priorização",
    description: "Identificação do que precisa mudar primeiro.",
  },
  {
    number: "03",
    title: "Implementação",
    description: "Construção das soluções junto à operação.",
  },
  { number: "04", title: "Acompanhamento", description: "Indicadores para acompanhar evolução." },
] as const;

export const prismaeDataModules = [
  { title: "Evolução hipotética", bars: [36, 52, 47, 68] },
  { title: "Eficiência operacional fictícia", bars: [64, 44, 71, 57] },
  { title: "Distribuição de atividades", bars: [54, 73, 39, 62] },
] as const;
