export type ThemeName = "menezesdev" | "m47" | "tavola" | "prismae";

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
  readonly match?: "page" | "location";
}

export interface RouteDefinition {
  readonly path: string;
  readonly title: string;
  readonly project: "menezesdev" | "case" | "m47" | "tavola27" | "prismae";
  readonly indexable: boolean;
}

export interface LinkDefinition {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface ImageMetadata {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface Project {
  readonly slug: "m47" | "tavola-27" | "prismae";
  readonly name: string;
  readonly category: string;
  readonly label: "Conceito demonstrativo";
  readonly headline: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly plan: string;
  readonly demoHref: string;
  readonly cover: ImageMetadata;
  readonly strip: readonly ImageMetadata[];
  readonly context: readonly string[];
  readonly approach: readonly string[];
  readonly features: readonly string[];
}

export interface Plan {
  readonly name: string;
  readonly price: string;
  readonly description: string;
  readonly highlight: string;
  readonly includes: readonly string[];
  readonly cta: string;
  readonly recommended?: boolean;
}

export interface FAQItem {
  readonly question: string;
  readonly answer: readonly string[];
}

export interface PageMetadata {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly indexable: boolean;
  readonly ogTitle?: string;
  readonly ogDescription?: string;
  readonly image?: string;
}

export interface DemoConfig {
  readonly name: string;
  readonly prefix: string;
  readonly theme: Exclude<ThemeName, "menezesdev">;
  readonly notice: string;
  readonly navigation: readonly NavigationItem[];
}

export interface FormFieldConfig {
  readonly id: string;
  readonly label: string;
  readonly required: boolean;
  readonly type: "text" | "email" | "tel" | "textarea";
  readonly autocomplete?: string;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly help?: string;
}

export interface SocialLink extends LinkDefinition {
  readonly external: true;
}

export interface SiteConfig {
  readonly brandName: string;
  readonly tagline: string;
  readonly locale: "pt-BR";
  readonly baseUrl: URL;
  readonly canonicalConfigured: boolean;
  readonly deployEnvironment: "development" | "preview" | "production";
  readonly navigation: readonly NavigationItem[];
  readonly socialLinks: readonly SocialLink[];
  readonly commercial: {
    readonly whatsappUrl: string | null;
    readonly whatsappMessage: string;
  };
  readonly metadata: {
    readonly title: string;
    readonly description: string;
    readonly ogTitle: string;
    readonly ogDescription: string;
  };
  readonly analytics: {
    readonly cloudflareToken: string | null;
  };
}
