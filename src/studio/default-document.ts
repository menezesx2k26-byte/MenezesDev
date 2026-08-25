import { siteConfig } from "../config/site";
import {
  capabilities,
  faqs,
  plans,
  processSteps,
  services,
  socialComparison,
  trustItems,
} from "../data/home";
import { projects } from "../data/projects";
import { SITE_DOCUMENT_SCHEMA_VERSION } from "./types";
import type { MediaReference, SiteDocument, StudioSocialLink } from "./types";

const slugify = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const repositoryMedia = (
  id: string,
  source: { src: string; width: number; height: number; alt: string },
): MediaReference => ({
  id,
  kind: "repository",
  src: source.src,
  width: source.width,
  height: source.height,
  alt: source.alt,
});

const startingPriceCents = (priceLabel: string): number | null => {
  const match = priceLabel.match(/R\$\s*([\d.]+)/);
  if (!match?.[1]) return null;
  return Number(match[1].replace(/\./g, "")) * 100;
};

const studioSocialLinks = (
  links: ReadonlyArray<{ label: string; href: string }>,
): StudioSocialLink[] =>
  links.map((link) => ({
    id: `social-${slugify(link.label)}`,
    label: link.label,
    href: link.href,
  }));

export const createDefaultSiteDocument = (): SiteDocument => {
  const studioProjects = projects.map((project) => {
    const cover = repositoryMedia(`media-${project.slug}-cover`, project.cover);

    return {
      id: `project-${project.slug}`,
      slug: project.slug,
      name: project.name,
      category: project.category,
      disclosure: project.label,
      headline: project.headline,
      description: project.description,
      tags: [...project.tags],
      planLabel: project.plan,
      demoHref: project.demoHref,
      cover,
      strip: project.strip.map((image, index) =>
        repositoryMedia(`media-${project.slug}-strip-${index + 1}`, image),
      ),
      context: [...project.context],
      approach: [...project.approach],
      features: [...project.features],
      visible: true,
      showOnHome: true,
      layout: "default" as const,
      seo: {
        title: `${project.name} — Projeto MenezesDev`,
        description: `${project.headline} ${project.description}`,
        shareImage: repositoryMedia(`media-${project.slug}-share`, project.cover),
      },
    };
  });

  return {
    schemaVersion: SITE_DOCUMENT_SCHEMA_VERSION,
    brand: {
      name: siteConfig.brandName,
      tagline: siteConfig.tagline,
      locale: siteConfig.locale,
    },
    navigation: siteConfig.navigation.map((item) => ({
      id: `nav-${slugify(item.label)}`,
      label: item.label,
      href: item.href,
      visible: true,
    })),
    home: {
      hero: {
        visible: true,
        layout: "default",
        eyebrow: "DESENVOLVIMENTO WEB PARA NEGÓCIOS",
        title: "Seu negócio merece um site à altura.",
        lead: "Sites rápidos, modernos e profissionais para empresas que querem transformar presença digital em mais credibilidade, contatos e oportunidades.",
        primaryCtaLabel: "Quero meu site",
        secondaryCtaLabel: "Ver projetos",
        secondaryCtaHref: "/#projetos",
        microcopy:
          "Projetos a partir de R$600. Design profissional · Responsivo · SEO técnico · HTTPS",
        media: [
          repositoryMedia("media-home-m47-hero", {
            src: "/assets/demos/m47/m47-hero.webp",
            width: 1536,
            height: 960,
            alt: "Conceito M47 Barber",
          }),
          repositoryMedia("media-home-tavola27-hero", {
            src: "/assets/demos/tavola27/tavola27-hero.webp",
            width: 1536,
            height: 960,
            alt: "Conceito Tavola 27",
          }),
          repositoryMedia("media-home-prismae-hero", {
            src: "/assets/demos/prismae/prismae-hero-graphic.svg",
            width: 960,
            height: 720,
            alt: "Conceito gráfico Prismae",
          }),
        ],
      },
      trust: {
        visible: true,
        layout: "default",
        items: trustItems.map((item) => ({
          id: `trust-${slugify(item.title)}`,
          title: item.title,
          text: item.text,
        })),
      },
      problem: {
        visible: true,
        layout: "default",
        eyebrow: "PRESENÇA DIGITAL",
        title: "Ter Instagram não é ter presença digital completa.",
        lead: "Redes sociais são importantes, mas pertencem a plataformas de terceiros.",
        paragraphs: [
          "Um site próprio organiza sua marca, apresenta seus serviços e oferece ao cliente um lugar profissional para encontrar tudo o que precisa.",
        ],
        emphasis: "Seu site funciona como a sede digital do seu negócio.",
        comparisons: [
          {
            id: "comparison-social",
            title: "Apenas redes sociais",
            items: [...socialComparison.social],
          },
          {
            id: "comparison-website",
            title: "Com um site próprio",
            items: [...socialComparison.website],
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
        projectIds: studioProjects.map((project) => project.id),
        ctaTitle: "Quer um projeto com a identidade do seu negócio?",
        ctaLabel: "Solicitar orçamento",
      },
      services: {
        visible: true,
        layout: "default",
        eyebrow: "SERVIÇOS",
        title: "Do primeiro clique ao site publicado.",
        lead: "Desenvolvimento completo, da estrutura visual à publicação.",
        items: services.map((service) => ({
          id: `service-${slugify(service.title)}`,
          title: service.title,
          text: service.text,
          ...(service.microcopy ? { microcopy: service.microcopy } : {}),
          visible: true,
        })),
      },
      process: {
        visible: true,
        layout: "default",
        eyebrow: "COMO FUNCIONA",
        title: "Seu novo site em quatro etapas.",
        lead: "Um processo simples, claro e organizado do início ao lançamento.",
        steps: processSteps.map((step) => ({
          id: `process-${step.number}`,
          number: step.number,
          title: step.title,
          text: step.text,
        })),
        note: "Você acompanha o projeto e possui até duas rodadas de revisão dentro do escopo contratado.",
      },
      capabilities: {
        visible: true,
        layout: "default",
        eyebrow: "POR DENTRO",
        title: "Bonito por fora. Bem construído por dentro.",
        lead: "Um site profissional precisa fazer mais do que simplesmente parecer bom.",
        body: "A estrutura técnica também influencia velocidade, experiência, manutenção e presença nos mecanismos de busca.",
        emphasis: "Desenvolvido para ser rápido.",
        items: capabilities.map((item) => ({
          id: `capability-${slugify(item.title)}`,
          title: item.title,
          text: item.text,
        })),
      },
      plans: {
        visible: true,
        layout: "default",
        eyebrow: "PLANOS",
        title: "Um site para cada momento do seu negócio.",
        lead: "Comece com o que sua empresa precisa hoje e evolua quando fizer sentido.",
        note: "Todos os valores representam preços iniciais e podem variar conforme o escopo.",
        items: plans.map((plan) => ({
          id: `plan-${slugify(plan.name)}`,
          name: plan.name,
          startingPriceCents: startingPriceCents(plan.price),
          priceLabel: plan.price,
          description: plan.description,
          highlight: plan.highlight,
          includes: [...plan.includes],
          ctaLabel: plan.cta,
          recommended: "recommended" in plan ? Boolean(plan.recommended) : false,
          visible: true,
        })),
        custom: {
          title: "Precisa de algo além de um site convencional?",
          text: "Também desenvolvemos projetos com banco de dados, dashboards, áreas administrativas, autenticação, integrações e outras funcionalidades específicas.",
          priceLabel: "Projetos personalizados a partir de R$2.500.",
          ctaLabel: "Contar sobre meu projeto",
        },
        disclaimer:
          "Domínio, serviços pagos de terceiros e funcionalidades fora do escopo podem gerar custos adicionais. Nenhum serviço externo será contratado sem alinhamento prévio.",
      },
      faq: {
        visible: true,
        layout: "default",
        eyebrow: "DÚVIDAS FREQUENTES",
        title: "Antes de começar, talvez você queira saber.",
        items: faqs.map((item) => ({
          id: `faq-${slugify(item.question)}`,
          question: item.question,
          answer: [...item.answer],
          visible: true,
        })),
      },
      contact: {
        visible: true,
        layout: "default",
        eyebrow: "VAMOS COMEÇAR?",
        title: "Sua empresa já existe. Agora faça ela existir na internet.",
        lead: "Conte um pouco sobre seu negócio e o que você precisa.",
        body: "A partir disso, analisamos o projeto e indicamos a solução mais adequada.",
        emphasis: "Orçamento sem compromisso.",
        primaryCtaLabel: "Falar pelo WhatsApp",
        secondaryCtaLabel: "Ver planos",
        secondaryCtaHref: "/#planos",
      },
    },
    projects: studioProjects,
    commercial: {
      whatsappUrl: siteConfig.commercial.whatsappUrl,
      whatsappMessage: siteConfig.commercial.whatsappMessage,
      socialLinks: studioSocialLinks(siteConfig.socialLinks),
    },
    seo: {
      titleTemplate: "%s",
      defaultTitle: siteConfig.metadata.title,
      defaultDescription: siteConfig.metadata.description,
      ogTitle: siteConfig.metadata.ogTitle,
      ogDescription: siteConfig.metadata.ogDescription,
      defaultShareImage: null,
      demosIndexable: false,
    },
    presentation: {
      density: "comfortable",
      sectionLayout: "default",
      imageTreatment: "natural",
    },
  };
};
