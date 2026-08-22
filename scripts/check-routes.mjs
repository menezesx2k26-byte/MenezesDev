import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const routes = [
  "/",
  "/projetos/m47",
  "/projetos/tavola-27",
  "/projetos/prismae",
  "/demo/m47",
  "/demo/tavola27",
  "/demo/tavola27/menu",
  "/demo/tavola27/storia",
  "/demo/tavola27/gallery",
  "/demo/tavola27/contact",
  "/demo/prismae",
  "/demo/prismae/solutions",
  "/demo/prismae/solutions/strategy",
  "/demo/prismae/solutions/processes",
  "/demo/prismae/solutions/indicators",
  "/demo/prismae/contact",
];

const failures = [];
const pass = (message) => console.log(`PASS ${message}`);
const fail = (message) => failures.push(message);
const routeFile = (route) =>
  route === "/" ? join(dist, "index.html") : join(dist, `${route.slice(1)}.html`);

if (!existsSync(dist)) fail("dist/ não existe; execute a build antes da auditoria de rotas.");

for (const route of routes) {
  const file = routeFile(route);
  if (!existsSync(file)) {
    fail(`Rota ausente: ${route} (${relative(root, file)})`);
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
  if (route.startsWith("/demo/") && !html.includes('content="noindex, nofollow, noarchive"')) {
    fail(`${route}: política noindex completa ausente.`);
  }
}

if (routes.filter((route) => existsSync(routeFile(route))).length === 16)
  pass("ROUTE-001 — 16/16 rotas canônicas materializadas");
if (existsSync(join(dist, "404.html"))) pass("ROUTE-005 — página 404 materializada");
else fail("Página 404 ausente.");
if (!existsSync(routeFile("/demo/prismae/about"))) pass("ROUTE-004 — /demo/prismae/about ausente");
else fail("Rota bloqueada /demo/prismae/about foi publicada.");

const htmlFiles = [];
const walk = (directory) => {
  for (const entry of readdirSync(directory)) {
    const file = join(directory, entry);
    if (statSync(file).isDirectory()) walk(file);
    else if (extname(file) === ".html") htmlFiles.push(file);
  }
};
walk(dist);

const validRoutes = new Set([...routes, "/404"]);
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
      const assetPath = join(dist, pathname.slice(1));
      if (!existsSync(assetPath))
        fail(`${relative(root, file)} referencia asset ausente: ${pathname}`);
      continue;
    }
    if (!validRoutes.has(pathname))
      fail(`${relative(root, file)} referencia rota interna não canônica: ${pathname}`);
  }
}

if (!failures.some((item) => item.includes("asset ausente")))
  pass("ASSET-002 — referências estáticas resolvem em dist");
if (!failures.some((item) => item.includes("rota interna")))
  pass("LINK-001 — links internos resolvem para rotas canônicas");

const sitemap = readFileSync(join(dist, "sitemap-0.xml"), "utf8");
const sitemapPaths = ["/projetos/m47", "/projetos/tavola-27", "/projetos/prismae"];
if (sitemap.includes("/demo/")) fail("Sitemap contém rota demo.");
for (const path of sitemapPaths) if (!sitemap.includes(path)) fail(`Sitemap não contém ${path}.`);
if (!failures.some((item) => item.includes("Sitemap")))
  pass("SEO-005 — sitemap contém somente Home e cases indexáveis");

if (failures.length) {
  console.error(`\nFAIL check:routes (${failures.length})`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log(
  `\nPASS check:routes — ${routes.length} rotas, ${htmlFiles.length} documentos HTML e links/assets auditados.`,
);
