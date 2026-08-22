import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const failures = [];
const passes = [];
const check = (condition, id, message) =>
  condition ? passes.push(`${id} — ${message}`) : failures.push(`${id} — ${message}`);
const read = (path) => readFileSync(join(root, path), "utf8");

const packageJson = JSON.parse(read("package.json"));
const expected = {
  dependencies: { astro: "7.2.4", "@astrojs/sitemap": "3.7.3", "lucide-astro": "0.556.0" },
  devDependencies: {
    typescript: "6.0.3",
    tailwindcss: "4.3.3",
    "@tailwindcss/vite": "4.3.3",
    "@astrojs/check": "0.9.10",
    prettier: "3.9.6",
    "prettier-plugin-astro": "0.14.1",
  },
};
for (const [section, dependencies] of Object.entries(expected)) {
  for (const [name, version] of Object.entries(dependencies))
    check(packageJson[section]?.[name] === version, "BUILD-001", `${name} fixado em ${version}`);
}
check(packageJson.packageManager === "pnpm@11.22.0", "BUILD-001", "packageManager fixado");
check(
  existsSync(join(root, "pnpm-lock.yaml")),
  "BUILD-001",
  "pnpm-lock.yaml versionado no workspace",
);
check(packageJson.engines?.node === ">=24.19.0 <25", "BUILD-001", "Node 24.19.x declarado");
check(
  !["react", "vue", "svelte", "solid-js"].some(
    (name) => packageJson.dependencies?.[name] || packageJson.devDependencies?.[name],
  ),
  "JS-003",
  "nenhum framework cliente instalado",
);

const finalAssets = [
  ...[
    "hero",
    "gallery-01",
    "gallery-02",
    "gallery-03",
    "gallery-04",
    "gallery-05",
    "gallery-06",
  ].map((name) => `public/assets/demos/m47/m47-${name}.webp`),
  "public/assets/demos/m47/m47-logo.svg",
  "public/assets/demos/m47/m47-mark.svg",
  ...[
    "hero",
    "food-01",
    "food-02",
    "food-03",
    "food-04",
    "space-01",
    "space-02",
    "space-03",
    "detail-01",
    "detail-02",
  ].map((name) => `public/assets/demos/tavola27/tavola27-${name}.webp`),
  "public/assets/demos/tavola27/tavola27-logo.svg",
  "public/assets/demos/prismae/prismae-hero-graphic.svg",
  "public/assets/demos/prismae/prismae-process.svg",
  "public/assets/demos/prismae/prismae-logo.svg",
];
const sourceText = readdirSync(join(root, "src"), { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(astro|ts|css)$/.test(entry.name))
  .map((entry) => readFileSync(join(entry.parentPath, entry.name), "utf8"))
  .join("\n");
check(finalAssets.length === 23, "ASSET-001", "catálogo contém 23 assets finais");
for (const asset of finalAssets) {
  check(existsSync(join(root, asset)), "ASSET-001", `${asset} existe`);
  check(
    sourceText.includes(asset.replace("public", "")),
    "ASSET-001",
    `${asset} possui função implementada`,
  );
}

const ctaLabels = [
  "Solicitar orçamento",
  "Falar pelo WhatsApp",
  "Quero meu site",
  "Ver projetos",
  "Ver projeto",
  "Quero começar",
  "Quero gerar mais contatos",
  "Contar sobre meu projeto",
  "Ver planos",
  "Agendar horário",
  "Ver serviços",
  "Abrir localização",
  "Agendar pelo WhatsApp",
  "Conhecer o menu",
  "Reservar mesa",
  "Solicitar diagnóstico",
  "Conhecer soluções",
];
for (const label of ctaLabels)
  check(sourceText.includes(label), "CTA-001", `CTA ${label} implementado`);
check(!/href=["']#["']/i.test(sourceText), "CTA-002", "nenhum href vazio");
check(!/javascript:/i.test(sourceText), "CTA-002", "nenhum javascript: em links");

const formSource = read("src/components/PrismaeForm.astro");
check(
  !/\bfetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket/i.test(formSource),
  "FORM-006",
  "formulário não contém transporte de rede",
);
check(
  !/localStorage|sessionStorage|indexedDB|document\.cookie/i.test(formSource),
  "FORM-007",
  "formulário não persiste lead",
);
check(!/<form[^>]+action=/i.test(formSource), "FORM-006", "formulário não possui action");
for (const field of ["Nome", "Empresa", "E-mail", "WhatsApp", "Principal desafio", "Mensagem"])
  check(formSource.includes(field), "FORM-001", `campo ${field} presente`);

const fontNames = ["inter", "manrope", "archivo", "cormorant-garamond", "plus-jakarta-sans"];
for (const font of fontNames)
  check(
    existsSync(join(root, `src/assets/fonts/${font}-latin.woff2`)),
    "FONT-001",
    `${font} WOFF2 self-hosted`,
  );
check(
  !/fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(sourceText),
  "FONT-001",
  "nenhum request runtime ao Google Fonts",
);

check(
  !sourceText.includes("/demo/prismae/about"),
  "ROUTE-004",
  "Prismae About ausente de páginas e navegação",
);
check(
  !/LocalBusiness|aggregateRating/.test(sourceText),
  "SEO-006",
  "nenhum schema fictício proibido",
);
check(
  !/OPENAI_API_KEY|images\.generate|images\.edit/.test(sourceText),
  "SEC-001",
  "frontend não depende de chave/API de imagem",
);

const staged = execFileSync("git", ["diff", "--cached", "--name-only"], {
  cwd: root,
  encoding: "utf8",
});
for (const protectedPath of [
  "tools/mcp-image/src/core/promptBuilder.ts",
  "tools/mcp-image/tests/workspace-prompt.test.mjs",
]) {
  check(
    !staged.split(/\r?\n/).includes(protectedPath),
    "SAFETY",
    `${protectedPath} não está staged`,
  );
}

for (const item of passes) console.log(`PASS ${item}`);
if (failures.length) {
  console.error(`\nFAIL check:acceptance (${failures.length})`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}
console.log(`\nPASS check:acceptance — ${passes.length} verificações automatizadas concluídas.`);
