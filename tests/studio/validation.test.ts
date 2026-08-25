import { describe, expect, it } from "vitest";

type ValidationModule = typeof import("../../src/studio/validation");

let validationModule: ValidationModule | null = null;
try {
  validationModule = await import("../../src/studio/validation");
} catch {
  validationModule = null;
}

const requireValidation = () => {
  expect(
    validationModule,
    "src/studio/validation.ts must implement the SiteDocument validation contract",
  ).not.toBeNull();
  return validationModule as ValidationModule;
};

const validDocument = () => ({
  schemaVersion: 1,
  brand: {
    name: "MenezesDev",
    tagline: "Sites que impulsionam negócios.",
    locale: "pt-BR",
  },
  navigation: [
    { id: "nav-projects", label: "Projetos", href: "/#projetos", visible: true },
    { id: "nav-services", label: "Serviços", href: "/#servicos", visible: true },
  ],
  home: {
    hero: {
      visible: true,
      layout: "default",
      eyebrow: "DESENVOLVIMENTO WEB PARA NEGÓCIOS",
      title: "Seu negócio merece um site à altura.",
      lead: "Sites rápidos, modernos e profissionais.",
      primaryCtaLabel: "Quero meu site",
      secondaryCtaLabel: "Ver projetos",
      secondaryCtaHref: "/#projetos",
      microcopy: "Projetos a partir de R$600.",
      media: [
        {
          id: "hero-m47",
          kind: "repository",
          src: "/assets/demos/m47/m47-hero.webp",
          alt: "Conceito M47 Barber",
          width: 1536,
          height: 960,
        },
      ],
    },
    trust: {
      visible: true,
      layout: "default",
      items: [{ id: "trust-fast", title: "Rápido", text: "Experiência leve e otimizada." }],
    },
    problem: {
      visible: true,
      layout: "split",
      eyebrow: "PRESENÇA DIGITAL",
      title: "Ter Instagram não é ter presença digital completa.",
      lead: "Redes sociais são importantes, mas pertencem a plataformas de terceiros.",
      paragraphs: ["Um site próprio organiza sua marca."],
      emphasis: "Seu site funciona como a sede digital do seu negócio.",
      comparisons: [
        {
          id: "social-only",
          title: "Apenas redes sociais",
          items: ["informações espalhadas"],
        },
        {
          id: "own-site",
          title: "Com um site próprio",
          items: ["sua marca em um endereço próprio"],
        },
      ],
    },
    projects: {
      visible: true,
      layout: "default",
      eyebrow: "PROJETOS",
      title: "Sites que parecem caros. Sem precisar custar uma fortuna.",
      lead: "Design profissional não deveria ser exclusividade de grandes empresas.",
      body: "Cada projeto é desenvolvido para combinar identidade, clareza e desempenho.",
      projectIds: ["project-m47"],
      ctaTitle: "Quer um projeto com a identidade do seu negócio?",
      ctaLabel: "Solicitar orçamento",
    },
    services: {
      visible: true,
      layout: "split",
      eyebrow: "SERVIÇOS",
      title: "Do primeiro clique ao site publicado.",
      lead: "Desenvolvimento completo, da estrutura visual à publicação.",
      items: [
        {
          id: "service-institutional",
          title: "Sites institucionais",
          text: "Apresente sua empresa e seus serviços.",
          microcopy: "Ideal para empresas e profissionais.",
          visible: true,
        },
      ],
    },
    process: {
      visible: true,
      layout: "default",
      eyebrow: "COMO FUNCIONA",
      title: "Seu novo site em quatro etapas.",
      lead: "Um processo simples, claro e organizado.",
      steps: [
        {
          id: "process-briefing",
          number: "01",
          title: "Briefing",
          text: "Entendemos seu negócio e seus objetivos.",
        },
      ],
      note: "Você acompanha o projeto.",
    },
    capabilities: {
      visible: true,
      layout: "split",
      eyebrow: "POR DENTRO",
      title: "Bonito por fora. Bem construído por dentro.",
      lead: "Um site profissional precisa fazer mais do que parecer bom.",
      body: "A estrutura técnica também influencia velocidade e manutenção.",
      emphasis: "Desenvolvido para ser rápido.",
      items: [
        {
          id: "capability-performance",
          title: "Performance",
          text: "Arquitetura leve e carregamento rápido.",
        },
      ],
    },
    plans: {
      visible: true,
      layout: "default",
      eyebrow: "PLANOS",
      title: "Um site para cada momento do seu negócio.",
      lead: "Comece com o que sua empresa precisa hoje.",
      note: "Todos os valores representam preços iniciais.",
      items: [
        {
          id: "plan-essential",
          name: "Essencial",
          startingPriceCents: 60000,
          priceLabel: "A partir de R$600",
          description: "Para quem precisa colocar o negócio na internet.",
          highlight: "Landing page completa",
          includes: ["uma página", "design responsivo"],
          ctaLabel: "Quero começar",
          recommended: false,
          visible: true,
        },
      ],
      custom: {
        title: "Precisa de algo além de um site convencional?",
        text: "Também desenvolvemos projetos personalizados.",
        priceLabel: "Projetos personalizados a partir de R$2.500.",
        ctaLabel: "Contar sobre meu projeto",
      },
      disclaimer: "Serviços pagos de terceiros podem gerar custos adicionais.",
    },
    faq: {
      visible: true,
      layout: "split",
      eyebrow: "DÚVIDAS FREQUENTES",
      title: "Antes de começar, talvez você queira saber.",
      items: [
        {
          id: "faq-price",
          question: "Quanto custa um site?",
          answer: ["Projetos começam em R$600."],
          visible: true,
        },
      ],
    },
    contact: {
      visible: true,
      layout: "default",
      eyebrow: "VAMOS COMEÇAR?",
      title: "Sua empresa já existe. Agora faça ela existir na internet.",
      lead: "Conte um pouco sobre seu negócio e o que você precisa.",
      body: "A partir disso, analisamos o projeto.",
      emphasis: "Orçamento sem compromisso.",
      primaryCtaLabel: "Falar pelo WhatsApp",
      secondaryCtaLabel: "Ver planos",
      secondaryCtaHref: "/#planos",
    },
  },
  projects: [
    {
      id: "project-m47",
      slug: "m47",
      name: "M47 Barber",
      category: "Barbearia · Landing Page",
      disclosure: "Conceito demonstrativo",
      headline: "Presença forte para uma marca de personalidade.",
      description: "Website desenvolvido como conceito para uma barbearia moderna.",
      tags: ["Landing Page", "Mobile First"],
      planLabel: "Essencial — a partir de R$600",
      demoHref: "/demo/m47",
      cover: {
        id: "m47-cover",
        kind: "repository",
        src: "/assets/demos/m47/m47-hero.webp",
        alt: "Barbeiro finalizando um corte.",
        width: 1536,
        height: 960,
      },
      strip: [],
      context: ["Landing page compacta para uma barbearia urbana."],
      approach: ["Hero cinematográfico e hierarquia responsiva."],
      features: ["Landing page"],
      visible: true,
      showOnHome: true,
      layout: "default",
      seo: {
        title: "M47 Barber | Projeto MenezesDev",
        description: "Conceito demonstrativo de landing page para barbearia.",
        shareImage: null,
      },
    },
  ],
  commercial: {
    whatsappUrl: null,
    whatsappMessage:
      "Olá! Vi o site da MenezesDev e gostaria de solicitar um orçamento para um site.",
    socialLinks: [],
  },
  seo: {
    titleTemplate: "%s | MenezesDev",
    defaultTitle: "MenezesDev | Criação de Sites Profissionais",
    defaultDescription: "Sites profissionais, rápidos e responsivos para empresas e negócios.",
    ogTitle: "MenezesDev — Sites que impulsionam negócios.",
    ogDescription: "Sites modernos, rápidos e profissionais.",
    defaultShareImage: null,
    demosIndexable: false,
  },
  presentation: {
    density: "comfortable",
    sectionLayout: "default",
    imageTreatment: "natural",
  },
});

const issuePaths = (result: { issues: Array<{ path: string }> }) =>
  result.issues.map((issue) => issue.path);

describe("validateSiteDocument", () => {
  it("accepts a valid bounded Studio document in draft and publish modes", () => {
    const { validateSiteDocument } = requireValidation();
    expect(validateSiteDocument(validDocument(), { mode: "draft" })).toEqual({
      ok: true,
      issues: [],
    });
    expect(validateSiteDocument(validDocument(), { mode: "publish" })).toEqual({
      ok: true,
      issues: [],
    });
  });

  it("rejects a missing or unsupported schemaVersion", () => {
    const { validateSiteDocument } = requireValidation();
    const missing = validDocument() as Record<string, unknown>;
    delete missing.schemaVersion;
    expect(issuePaths(validateSiteDocument(missing, { mode: "draft" }))).toContain("schemaVersion");

    const unsupported = validDocument();
    unsupported.schemaVersion = 99;
    expect(issuePaths(validateSiteDocument(unsupported, { mode: "draft" }))).toContain(
      "schemaVersion",
    );
  });

  it("rejects duplicate project ids and slugs", () => {
    const { validateSiteDocument } = requireValidation();
    const candidate = validDocument();
    candidate.projects.push({ ...candidate.projects[0] });
    const paths = issuePaths(validateSiteDocument(candidate, { mode: "draft" }));
    expect(paths).toContain("projects[1].id");
    expect(paths).toContain("projects[1].slug");
  });

  it("rejects executable URL schemes from navigation, commercial and project links", () => {
    const { validateSiteDocument } = requireValidation();
    const candidate = validDocument();
    candidate.navigation[0].href = "javascript:alert(1)";
    candidate.commercial.whatsappUrl = "data:text/html,<script>alert(1)</script>";
    candidate.projects[0].demoHref = "javascript:alert(1)";
    const paths = issuePaths(validateSiteDocument(candidate, { mode: "draft" }));
    expect(paths).toContain("navigation[0].href");
    expect(paths).toContain("commercial.whatsappUrl");
    expect(paths).toContain("projects[0].demoHref");
  });

  it("rejects unsupported layout and presentation presets", () => {
    const { validateSiteDocument } = requireValidation();
    const candidate = validDocument();
    candidate.home.hero.layout = "freeform";
    candidate.presentation.sectionLayout = "arbitrary-css";
    const paths = issuePaths(validateSiteDocument(candidate, { mode: "draft" }));
    expect(paths).toContain("home.hero.layout");
    expect(paths).toContain("presentation.sectionLayout");
  });

  it("rejects negative or non-integer structured prices", () => {
    const { validateSiteDocument } = requireValidation();
    const negative = validDocument();
    negative.home.plans.items[0].startingPriceCents = -1;
    expect(issuePaths(validateSiteDocument(negative, { mode: "draft" }))).toContain(
      "home.plans.items[0].startingPriceCents",
    );

    const fractional = validDocument();
    fractional.home.plans.items[0].startingPriceCents = 600.5;
    expect(issuePaths(validateSiteDocument(fractional, { mode: "draft" }))).toContain(
      "home.plans.items[0].startingPriceCents",
    );
  });

  it("rejects any attempt to make fictitious demos indexable", () => {
    const { validateSiteDocument } = requireValidation();
    const candidate = validDocument();
    candidate.seo.demosIndexable = true;
    expect(issuePaths(validateSiteDocument(candidate, { mode: "draft" }))).toContain(
      "seo.demosIndexable",
    );
  });

  it("rejects oversized strings and lists at documented bounds", () => {
    const { validateSiteDocument, STUDIO_LIMITS } = requireValidation();
    const candidate = validDocument();
    candidate.home.hero.title = "x".repeat(STUDIO_LIMITS.longText + 1);
    candidate.projects[0].tags = Array.from(
      { length: STUDIO_LIMITS.listItems + 1 },
      (_, index) => `tag-${index}`,
    );
    const paths = issuePaths(validateSiteDocument(candidate, { mode: "draft" }));
    expect(paths).toContain("home.hero.title");
    expect(paths).toContain("projects[0].tags");
  });

  it("blocks publication when required hero or SEO copy is missing", () => {
    const { validateSiteDocument } = requireValidation();
    const candidate = validDocument();
    candidate.home.hero.title = "";
    candidate.seo.defaultDescription = "";

    const publishPaths = issuePaths(validateSiteDocument(candidate, { mode: "publish" }));
    expect(publishPaths).toContain("home.hero.title");
    expect(publishPaths).toContain("seo.defaultDescription");
  });

  it("rejects executable content fields that are not part of the bounded schema", () => {
    const { validateSiteDocument } = requireValidation();
    const candidate = validDocument() as ReturnType<typeof validDocument> & {
      customCss?: string;
      customHtml?: string;
      customScript?: string;
    };
    candidate.customCss = "body { display:none }";
    candidate.customHtml = "<script>alert(1)</script>";
    candidate.customScript = "alert(1)";
    const paths = issuePaths(validateSiteDocument(candidate, { mode: "draft" }));
    expect(paths).toContain("customCss");
    expect(paths).toContain("customHtml");
    expect(paths).toContain("customScript");
  });
});
