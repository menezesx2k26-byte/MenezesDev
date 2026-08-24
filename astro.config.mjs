import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

const configuredSite = process.env.PUBLIC_SITE_URL?.trim() || "http://localhost:4321";

const cloudflareDevOptimizer = {
  name: "menezesdev-cloudflare-dev-optimizer",
  configEnvironment(environment) {
    if (environment === "client") return;

    return {
      optimizeDeps: {
        include: ["astro/assets/services/noop"],
      },
    };
  },
};

export default defineConfig({
  site: configuredSite,
  output: "server",
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  session: false,
  outDir: "dist",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  markdown: {
    syntaxHighlight: false,
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, "") || "/";
        return pathname === "/" || pathname.startsWith("/projetos/");
      },
    }),
  ],
  vite: {
    plugins: [cloudflareDevOptimizer, tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Manrope",
      cssVariable: "--font-manrope",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/manrope-latin.woff2"],
            weight: "400 800",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-inter",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/inter-latin.woff2"],
            weight: "400 600",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Archivo",
      cssVariable: "--font-archivo",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/archivo-latin.woff2"],
            weight: "700 800",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Cormorant Garamond",
      cssVariable: "--font-cormorant",
      fallbacks: ["serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/cormorant-garamond-latin.woff2"],
            weight: "500 600",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Plus Jakarta Sans",
      cssVariable: "--font-jakarta",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/plus-jakarta-sans-latin.woff2"],
            weight: "600 700",
            style: "normal",
          },
        ],
      },
    },
  ],
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "form-action 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
      ],
    },
  },
});
