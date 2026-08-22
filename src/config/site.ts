import type { SiteConfig } from "../types";

const configuredSiteUrl = import.meta.env.PUBLIC_SITE_URL?.trim();
const requestedEnvironment = import.meta.env.PUBLIC_DEPLOY_ENV;
const deployEnvironment =
  requestedEnvironment === "production" || requestedEnvironment === "preview"
    ? requestedEnvironment
    : "development";
const approvedWhatsappUrl: string | null = null;
const approvedCloudflareToken: string | null = null;

export const siteConfig = {
  brandName: "MenezesDev",
  tagline: "Sites que impulsionam negócios.",
  locale: "pt-BR",
  baseUrl: new URL(configuredSiteUrl || "http://localhost:4321"),
  canonicalConfigured: Boolean(configuredSiteUrl),
  deployEnvironment,
  navigation: [
    { label: "Projetos", href: "/#projetos", match: "location" },
    { label: "Serviços", href: "/#servicos", match: "location" },
    { label: "Processo", href: "/#processo", match: "location" },
    { label: "Planos", href: "/#planos", match: "location" },
    { label: "FAQ", href: "/#faq", match: "location" },
  ],
  socialLinks: [],
  commercial: {
    whatsappUrl: approvedWhatsappUrl,
    whatsappMessage:
      "Olá! Vi o site da MenezesDev e gostaria de solicitar um orçamento para um site.",
  },
  metadata: {
    title: "MenezesDev | Criação de Sites Profissionais",
    description:
      "Sites profissionais, rápidos e responsivos para empresas e negócios. Landing pages e sites institucionais a partir de R$600.",
    ogTitle: "MenezesDev — Sites que impulsionam negócios.",
    ogDescription:
      "Sites modernos, rápidos e profissionais para empresas que querem fortalecer sua presença digital.",
  },
  analytics: {
    cloudflareToken: approvedCloudflareToken,
  },
} as const satisfies SiteConfig;

export function canonicalUrl(path: string): string {
  return new URL(path, siteConfig.baseUrl).toString();
}
