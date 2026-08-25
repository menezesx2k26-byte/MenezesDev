import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const host = "127.0.0.1";
const port = Number(process.env.STUDIO_DEV_HEALTH_PORT || 4323);
const origin = `http://${host}:${port}`;
const healthUrl = `${origin}/api/runtime-health`;
const astroExecutable = resolve(
  root,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "astro.cmd" : "astro",
);
let devLog = "";

const delay = (milliseconds) =>
  new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
const appendLog = (chunk) => {
  devLog = `${devLog}${chunk.toString()}`.slice(-20000);
};

if (!existsSync(astroExecutable)) {
  console.error(`FAIL runtime health dev — executável Astro ausente: ${astroExecutable}`);
  process.exit(1);
}

const dev = spawn(astroExecutable, ["dev", "--host", host, "--port", String(port)], {
  cwd: root,
  env: {
    ...process.env,
    PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL || origin,
  },
  shell: process.platform === "win32",
  stdio: ["ignore", "pipe", "pipe"],
});

dev.stdout?.on("data", appendLog);
dev.stderr?.on("data", appendLog);

const waitForHealth = async () => {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (dev.exitCode !== null) {
      throw new Error(`astro dev encerrou com código ${dev.exitCode}.`);
    }

    try {
      const response = await fetch(healthUrl, { redirect: "manual" });
      if (response.status > 0) return response;
    } catch {
      // O dev server/workerd ainda está inicializando.
    }

    await delay(250);
  }

  throw new Error("timeout aguardando /api/runtime-health em astro dev.");
};

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

const failures = [];

try {
  const response = await waitForHealth();
  const body = await response.text();

  if (response.status !== 200) {
    failures.push(`health respondeu HTTP ${response.status}, esperado 200.`);
  }

  const cacheControl = response.headers.get("cache-control") ?? "";
  if (!cacheControl.toLowerCase().includes("no-store")) {
    failures.push(`Cache-Control sem no-store: ${cacheControl || "ausente"}.`);
  }

  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    failures.push("health não retornou JSON válido.");
  }

  const expected = {
    status: "healthy",
    checks: {
      database: "ok",
      media: "ok",
    },
  };

  if (payload && JSON.stringify(payload) !== JSON.stringify(expected)) {
    failures.push(`payload inesperado: ${JSON.stringify(payload)}.`);
  }

  if (/SELECT|Authorization|Bearer|password|secret|object[-_ ]?key/i.test(body)) {
    failures.push("health expôs material diagnóstico sensível.");
  }
} catch (error) {
  failures.push(`smoke indisponível: ${error instanceof Error ? error.message : error}`);
} finally {
  await stopDev();
}

if (failures.length) {
  console.error(`\nFAIL runtime health dev (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  if (devLog.trim()) console.error(`\n--- astro dev log ---\n${devLog.trim()}`);
  process.exit(1);
}

console.log(
  "PASS runtime health dev — /api/runtime-health respondeu 200, no-store e healthy com DB/R2 locais.",
);
