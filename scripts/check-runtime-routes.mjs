import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { blockedRoutes, canonicalRoutes } from "./route-contract.mjs";
import {
  validateBlockedResponse,
  validateCanonicalResponse,
} from "./runtime-route-probe.mjs";

const root = resolve(import.meta.dirname, "..");
const host = "127.0.0.1";
const port = Number(process.env.STUDIO_PREVIEW_PORT || 4322);
const origin = `http://${host}:${port}`;
const astroExecutable = resolve(
  root,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "astro.cmd" : "astro",
);
const failures = [];
let previewLog = "";

const delay = (milliseconds) => new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
const appendLog = (chunk) => {
  previewLog = `${previewLog}${chunk.toString()}`.slice(-20000);
};

if (!existsSync(resolve(root, "dist", "server", "entry.mjs"))) {
  console.error("FAIL runtime routes — dist/server/entry.mjs ausente; execute a build antes do probe.");
  process.exit(1);
}

if (!existsSync(astroExecutable)) {
  console.error(`FAIL runtime routes — executável Astro ausente: ${astroExecutable}`);
  process.exit(1);
}

const preview = spawn(astroExecutable, ["preview", "--host", host, "--port", String(port)], {
  cwd: root,
  env: {
    ...process.env,
    PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL || origin,
  },
  shell: process.platform === "win32",
  stdio: ["ignore", "pipe", "pipe"],
});

preview.stdout?.on("data", appendLog);
preview.stderr?.on("data", appendLog);

const waitForPreview = async () => {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (preview.exitCode !== null) {
      throw new Error(`astro preview encerrou com código ${preview.exitCode}.`);
    }

    try {
      const response = await fetch(`${origin}/`, { redirect: "manual" });
      if (response.status > 0) return;
    } catch {
      // O workerd ainda está inicializando.
    }

    await delay(250);
  }

  throw new Error("timeout aguardando o astro preview/workerd responder.");
};

const stopPreview = async () => {
  if (preview.exitCode !== null) return;
  preview.kill("SIGTERM");
  await Promise.race([
    once(preview, "exit"),
    delay(2000).then(() => {
      if (preview.exitCode === null) preview.kill("SIGKILL");
    }),
  ]);
};

try {
  await waitForPreview();

  for (const route of canonicalRoutes) {
    try {
      const response = await fetch(`${origin}${route}`, { redirect: "manual" });
      const html = await response.text();
      failures.push(...validateCanonicalResponse(route, response.status, html));
    } catch (error) {
      failures.push(`${route}: falha de rede no probe (${error instanceof Error ? error.message : error}).`);
    }
  }

  for (const route of blockedRoutes) {
    try {
      const response = await fetch(`${origin}${route}`, { redirect: "manual" });
      failures.push(...validateBlockedResponse(route, response.status));
    } catch (error) {
      failures.push(`${route}: falha de rede no probe (${error instanceof Error ? error.message : error}).`);
    }
  }
} catch (error) {
  failures.push(`preview indisponível: ${error instanceof Error ? error.message : error}`);
} finally {
  await stopPreview();
}

if (failures.length) {
  console.error(`\nFAIL check:runtime-routes (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  if (previewLog.trim()) console.error(`\n--- astro preview log ---\n${previewLog.trim()}`);
  process.exit(1);
}

console.log(
  `PASS check:runtime-routes — ${canonicalRoutes.length}/${canonicalRoutes.length} rotas canônicas responderam HTTP 200 e ${blockedRoutes.length}/${blockedRoutes.length} rota bloqueada respondeu 404 via workerd.`,
);
