import type { APIRoute } from "astro";

const configuredSiteUrl = import.meta.env.PUBLIC_SITE_URL?.trim();

export const GET: APIRoute = () => {
  const lines = ["User-agent: *", "Allow: /"];

  if (configuredSiteUrl) {
    lines.push("", `Sitemap: ${new URL("/sitemap-index.xml", configuredSiteUrl).toString()}`);
  }

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
