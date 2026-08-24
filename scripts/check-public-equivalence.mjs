import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

export const PUBLIC_EQUIVALENCE_ROUTES = [
  "/",
  "/projetos/m47",
  "/projetos/tavola-27",
  "/projetos/prismae",
];

const BASELINE_COMMIT = "152fab910296f29cfae2e07bf6ccc2c69f0ce0df";
const root = resolve(import.meta.dirname, "..");
const fixturePath = resolve(root, "tests/fixtures/public-equivalence-phase10.json");
const semanticTags = new Set([
  "header",
  "nav",
  "main",
  "section",
  "article",
  "footer",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "details",
  "summary",
  "strong",
  "small",
  "button",
  "dialog",
]);
const voidTags = new Set(["img"]);

const decodeEntities = (value) =>
  value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));

const normalizeText = (value) => decodeEntities(value).replace(/\s+/g, " ").trim();

const attribute = (tag, name) => {
  const match = tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return match ? decodeEntities(match[1] ?? match[2] ?? match[3] ?? "") : null;
};

const extractTitle = (html) => normalizeText(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");

const extractDescription = (html) => {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    if ((attribute(match[0], "name") ?? "").toLowerCase() === "description") {
      return normalizeText(attribute(match[0], "content") ?? "");
    }
  }
  return "";
};

const meaningfulAttributes = (tagName, tag) => {
  const names = ["id", "aria-label", "aria-disabled"];
  if (tagName === "a") names.push("href");
  if (tagName === "img") names.push("src", "alt", "width", "height");
  if (tagName === "button") names.push("type", "aria-haspopup", "aria-controls");
  if (tagName === "dialog") names.push("id", "aria-labelledby");

  const values = {};
  for (const name of names) {
    const value = attribute(tag, name);
    if (value !== null) values[name] = value;
  }
  return values;
};

export const normalizePublicHtml = (html, path = "") => {
  const title = extractTitle(html);
  const description = extractDescription(html);
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  const cleaned = body
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  const tokens = [];

  for (const match of cleaned.matchAll(/<[^>]+>|[^<]+/g)) {
    const token = match[0];
    if (!token.startsWith("<")) {
      const text = normalizeText(token);
      if (text) tokens.push({ kind: "text", value: text });
      continue;
    }

    if (/^<!/i.test(token)) continue;
    const tagMatch = token.match(/^<\/?\s*([a-z0-9-]+)/i);
    if (!tagMatch) continue;
    const tag = tagMatch[1].toLowerCase();
    if (!semanticTags.has(tag)) continue;

    if (/^<\//.test(token)) {
      if (!voidTags.has(tag)) tokens.push({ kind: "close", tag });
      continue;
    }

    const attrs = meaningfulAttributes(tag, token);
    tokens.push({ kind: "open", tag, ...(Object.keys(attrs).length ? { attrs } : {}) });
  }

  return { path, title, description, tokens };
};

const staticFileForRoute = (distRoot, route) =>
  route === "/" ? join(distRoot, "index.html") : join(distRoot, `${route.slice(1)}.html`);

const captureStatic = (distRoot, outputPath) => {
  const routes = PUBLIC_EQUIVALENCE_ROUTES.map((route) => {
    const file = staticFileForRoute(distRoot, route);
    if (!existsSync(file)) throw new Error(`Baseline HTML ausente para ${route}: ${file}`);
    return normalizePublicHtml(readFileSync(file, "utf8"), route);
  });

  const fixture = {
    baselineCommit: BASELINE_COMMIT,
    capturedFrom: "Phase 10 static Astro output",
    routes,
  };
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(fixture, null, 2)}\n`);
  console.log(`PASS public equivalence baseline — ${routes.length} rotas capturadas em ${outputPath}.`);
};

const delay = (milliseconds) => new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));

const firstDifference = (expected, actual) => {
  if (expected.title !== actual.title) return `title: ${JSON.stringify(expected.title)} != ${JSON.stringify(actual.title)}`;
  if (expected.description !== actual.description) {
    return `description: ${JSON.stringify(expected.description)} != ${JSON.stringify(actual.description)}`;
  }

  const length = Math.max(expected.tokens.length, actual.tokens.length);
  for (let index = 0; index < length; index += 1) {
    const left = JSON.stringify(expected.tokens[index]);
    const right = JSON.stringify(actual.tokens[index]);
    if (left !== right) {
      return `token ${index}: baseline=${left ?? "<missing>"} atual=${right ?? "<missing>"}`;
    }
  }
  return null;
};

const checkRuntime = async () => {
  if (!existsSync(fixturePath)) {
    throw new Error(`Fixture Phase 10 ausente: ${fixturePath}`);
  }

  const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
  if (fixture.baselineCommit !== BASELINE_COMMIT) {
    throw new Error(`Fixture usa baseline inesperado: ${fixture.baselineCommit ?? "ausente"}`);
  }

  const host = "127.0.0.1";
  const port = Number(process.env.STUDIO_EQUIVALENCE_PORT || 4324);
  const origin = `http://${host}:${port}`;
  const astroExecutable = resolve(
    root,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "astro.cmd" : "astro",
  );
  if (!existsSync(astroExecutable)) throw new Error(`Executável Astro ausente: ${astroExecutable}`);

  let devLog = "";
  const appendLog = (chunk) => {
    devLog = `${devLog}${chunk.toString()}`.slice(-20000);
  };
  const dev = spawn(astroExecutable, ["dev", "--host", host, "--port", String(port)], {
    cwd: root,
    env: {
      ...process.env,
      PUBLIC_SITE_URL: origin,
      PUBLIC_DEPLOY_ENV: "development",
    },
    shell: process.platform === "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });
  dev.stdout?.on("data", appendLog);
  dev.stderr?.on("data", appendLog);

  const stopDev = async () => {
    if (dev.exitCode !== null) return;
    dev.kill("SIGTERM");
    await Promise.race([
      once(dev, "exit"),
      delay(2000).then(() => {
        if (dev.exitCode === null) dev.kill("SIGKILL");
      }),
    ]);
  };

  try {
    let ready = false;
    for (let attempt = 0; attempt < 120; attempt += 1) {
      if (dev.exitCode !== null) throw new Error(`astro dev encerrou com código ${dev.exitCode}.`);
      try {
        const response = await fetch(`${origin}/api/runtime-health`, { redirect: "manual" });
        if (response.status === 200) {
          ready = true;
          break;
        }
      } catch {
        // workerd ainda está inicializando.
      }
      await delay(250);
    }
    if (!ready) throw new Error("timeout aguardando runtime local saudável.");

    const failures = [];
    for (const route of PUBLIC_EQUIVALENCE_ROUTES) {
      const response = await fetch(`${origin}${route}`, { redirect: "manual" });
      if (response.status !== 200) {
        failures.push(`${route}: HTTP ${response.status}, esperado 200.`);
        continue;
      }
      const actual = normalizePublicHtml(await response.text(), route);
      const expected = fixture.routes.find((entry) => entry.path === route);
      if (!expected) {
        failures.push(`${route}: baseline ausente.`);
        continue;
      }
      const difference = firstDifference(expected, actual);
      if (difference) failures.push(`${route}: ${difference}`);
    }

    if (failures.length) {
      throw new Error(`equivalência pública falhou (${failures.length})\n- ${failures.join("\n- ")}`);
    }
  } catch (error) {
    if (devLog.trim()) console.error(`\n--- astro dev log ---\n${devLog.trim()}`);
    throw error;
  } finally {
    await stopDev();
  }

  console.log(
    `PASS public equivalence — ${PUBLIC_EQUIVALENCE_ROUTES.length} rotas preservam texto, semântica, links e imagens do Phase 10 ${BASELINE_COMMIT.slice(0, 7)}.`,
  );
};

const [command, arg1, arg2] = process.argv.slice(2);

try {
  if (command === "capture-static") {
    if (!arg1 || !arg2) {
      throw new Error("Uso: node scripts/check-public-equivalence.mjs capture-static <dist-root> <output.json>");
    }
    captureStatic(resolve(arg1), resolve(arg2));
  } else if (command) {
    throw new Error(`Comando desconhecido: ${command}`);
  } else {
    await checkRuntime();
  }
} catch (error) {
  console.error(`FAIL public equivalence — ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
