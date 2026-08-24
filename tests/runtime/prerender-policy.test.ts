import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const prerenderDeclaration = /export\s+const\s+prerender\s*=\s*true\s*;/;

const staticPages = [
  "src/pages/demo/m47.astro",
  "src/pages/demo/prismae/contact.astro",
  "src/pages/demo/prismae/index.astro",
  "src/pages/demo/prismae/solutions/index.astro",
  "src/pages/demo/prismae/solutions/indicators.astro",
  "src/pages/demo/prismae/solutions/processes.astro",
  "src/pages/demo/prismae/solutions/strategy.astro",
  "src/pages/demo/tavola27/contact.astro",
  "src/pages/demo/tavola27/gallery.astro",
  "src/pages/demo/tavola27/index.astro",
  "src/pages/demo/tavola27/menu.astro",
  "src/pages/demo/tavola27/storia.astro",
  "src/pages/404.astro",
] as const;

const runtimePages = [
  "src/pages/index.astro",
  "src/pages/projetos/m47.astro",
  "src/pages/projetos/prismae.astro",
  "src/pages/projetos/tavola-27.astro",
] as const;

describe("Astro prerender policy", () => {
  it.each(staticPages)("keeps %s explicitly prerendered", (path) => {
    expect(read(path)).toMatch(prerenderDeclaration);
  });

  it.each(runtimePages)("keeps %s available to the server runtime", (path) => {
    expect(read(path)).not.toMatch(prerenderDeclaration);
  });
});
