import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const host = "127.0.0.1";
const port = Number(process.env.STUDIO_SEED_PORT || 4324);
const origin = `http://${host}:${port}`;
const healthUrl = `${origin}/api/runtime-health`;
const seedUrl = `${origin}/api/runtime-studio-seed`;
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
  console.error(`FAIL Studio seed — executável Astro ausente: ${astroExecutable}`);
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
      if (response.status === 200) return;
    } catch {
      // O dev server/workerd ainda está inicializando.
    }

    await delay(250);
  }

  throw new Error("timeout aguardando runtime local saudável.");
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

try {
  await waitForHealth();
  const response = await fetch(seedUrl, {
    method: "POST",
    redirect: "manual",
    headers: {
      "X-MenezesDev-Local-Seed": "1",
    },
  });
  const body = await response.text();

  if (response.status === 201) {
    const payload = JSON.parse(body);
    if (payload?.status !== "initialized" || payload?.versionNumber !== 1) {
      throw new Error(`resposta de inicialização inesperada: ${body}`);
    }
    console.log("PASS Studio seed — D1 local inicializado com versão publicada 1.");
  } else if (response.status === 409) {
    console.error("REFUSED Studio seed — D1 local já está inicializado; nenhuma escrita aplicada.");
    process.exitCode = 2;
  } else {
    throw new Error(`endpoint respondeu HTTP ${response.status}: ${body}`);
  }
} catch (error) {
  console.error(`FAIL Studio seed — ${error instanceof Error ? error.message : error}`);
  if (devLog.trim()) console.error(`\n--- astro dev log ---\n${devLog.trim()}`);
  process.exitCode = 1;
} finally {
  await stopDev();
}
