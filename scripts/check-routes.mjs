import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import {
  blockedRoutes,
  canonicalRoutes,
  runtimeRoutes,
  staticRoutes,
  staticRouteFile,
} from "./route-contract.mjs";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const clientDist = join(dist, "client");
const failures = [];
const pass = (message) => console.log(`PASS ${message}`);
const fail = (message) => failures.push(message);

if (!existsSync(dist)) fail("dist/ não existe; execute a build antes da auditoria de rotas.");
if (!existsSync(clientDist))
  fail("dist/client não existe; o build Cloudflare server não materializou a saída cliente.");

for (const route of staticRoutes) {
  const file = staticRouteFile(clientDist, route);
  if (!existsSync(file)) {
    fail(`Rota prerender ausente: ${route} (${relative(root, file)})`);
    continue;
  }

  const html = readFileSync(file, "utf8");
  for (const required of [
    "<title>",
    'name="description"',
    'rel="canonical"',
    'property="og:title"',
    'name="twitter:card"',
  ]) {
    if (!html.includes(required)) fail(`${route}: metadata ausente (${required}).`);
  }

  if (!html.includes('content="noindex, nofollow, noarchive"'))
    fail(`${route}: política noindex completa ausente.`);
}

const materializedRuntimeRoutes = runtimeRoutes.filter((route) =>
  existsSync(staticRouteFile(clientDist, route)),
);
if (materializedRuntimeRoutes.length)
  fail(`Rotas runtime foram prerenderizadas por engano: ${materializedRuntimeRoutes.join(", ")}.`);

const materializedStaticRoutes = staticRoutes.filter((route) =>
  existsSync(staticRouteFile(clientDist, route)),
);
if (materializedStaticRoutes.length === staticRoutes.length && !materializedRuntimeRoutes.length)
  pass(
    `ROUTE-001 — ${canonicalRoutes.length} rotas canônicas classificadas: ${staticRoutes.length} prerender + ${runtimeRoutes.length} runtime`,
  );

const notFoundFile = join(clientDist, "404.html");
if (existsSync(notFoundFile)) pass("ROUTE-005 — página 404 prerenderizada");
else fail("Página 404 prerenderizada ausente.");

for (const blockedRoute of blockedRoutes) {
  if (!existsSync(staticRouteFile(clientDist, blockedRoute)))
    pass(`ROUTE-004 — ${blockedRoute} ausente`);
  else fail(`Rota bloqueada ${blockedRoute} foi publicada.`);
}

const htmlFiles = [];
const walk = (directory) => {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory)) {
    const file = join(directory, entry);
    if (statSync(file).isDirectory()) walk(file);
    else if (extname(file) === ".html") htmlFiles.push(file);
  }
};
walk(clientDist);

const validRoutes = new Set([...canonicalRoutes, "/404"]);
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  if (/href=(?:"|')#(?:"|')/i.test(html) || /javascript:/i.test(html))
    fail(`${relative(root, file)} contém href vazio/javascript:.`);
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(html))
    fail(`${relative(root, file)} contém request runtime ao Google Fonts.`);

  const attributes = [...html.matchAll(/(?:href|src)=(?:"|')([^"']+)(?:"|')/gi)].map(
    (match) => match[1],
  );

  for (const raw of attributes) {
    if (!raw?.startsWith("/") || raw.startsWith("//")) continue;
    const pathname = raw.split(/[?#]/, 1)[0] || "/";
    if (
      pathname.startsWith("/_astro/") ||
      pathname.startsWith("/assets/") ||
      pathname === "/sitemap-index.xml"
    ) {
      const assetPath = join(clientDist, pathname.slice(1));
      if (!existsSync(assetPath))
        fail(`${relative(root, file)} referencia asset ausente: ${pathname}`);
      continue;
    }
    if (!validRoutes.has(pathname))
      fail(`${relative(root, file)} referencia rota interna não canônica: ${pathname}`);
  }
}

if (!failures.some((item) => item.includes("asset ausente")))
  pass("ASSET-002 — referências estáticas resolvem em dist/client");
if (!failures.some((item) => item.includes("rota interna")))
  pass("LINK-001 — links internos resolvem para rotas canônicas");

const sitemapPath = join(clientDist, "sitemap-0.xml");
if (!existsSync(sitemapPath)) {
  fail("Sitemap de conteúdo ausente em dist/client/sitemap-0.xml.");
} else {
  const sitemap = readFileSync(sitemapPath, "utf8");
  const sitemapPaths = ["/projetos/m47", "/projetos/tavola-27", "/projetos/prismae"];
  if (sitemap.includes("/demo/")) fail("Sitemap contém rota demo.");
  for (const path of sitemapPaths) if (!sitemap.includes(path)) fail(`Sitemap não contém ${path}.`);
  if (!failures.some((item) => item.includes("Sitemap")))
    pass("SEO-005 — sitemap contém somente Home e cases indexáveis");
}

if (failures.length) {
  console.error(`\nFAIL check:routes (${failures.length})`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log(
  `\nPASS check:routes — ${staticRoutes.length} rotas prerenderizadas, ${runtimeRoutes.length} rotas runtime classificadas e ${htmlFiles.length} documentos HTML auditados.`,
);
