import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

const home = read("src/pages/index.astro");
const css = read("src/styles/menezesdev.css");
const globalCss = read("src/styles/global.css");
const motion = read("src/components/islands/MotionReveal.tsx");
const homeData = read("src/data/home.ts");
const failures = [];
const passes = [];
const check = (condition, message) =>
  condition ? passes.push(message) : failures.push(message);

const theme = globalCss.match(/\[data-theme="menezesdev"\]\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
const planBlock = css.match(/\.md-plans\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

check(!/radial-gradient\(/i.test(css), "sem orbe radial na identidade MenezesDev");
check(!/linear-gradient\(/i.test(css), "sem gradiente decorativo dominante na identidade MenezesDev");
check(!/#(?:8d47ff|a66bff|e83fa9|f44fb2)\b/i.test(theme + css), "paleta MenezesDev não usa roxo/pink genérico");
check(!/\bInter\b/.test(theme), "tipografia MenezesDev não depende de Inter por default");
check(!/repeat\(\s*3\s*,/i.test(planBlock), "planos não são três cards iguais em fileira");
check(!/<Check\b/.test(home), "Home não usa checkmarks Lucide como decoração repetitiva");
check(!/halo|orb/i.test(motion), "ilha Motion não recria halo/orb decorativo");
check(!/box-shadow\s*:\s*0\s+0\s+4rem/i.test(css), "sem glow genérico de 4rem");
check(!/\.button:hover\s*\{[^}]*transform\s*:/is.test(globalCss), "hover de botão não depende de translate/scale performático");
check(!/não é\s+[^.]{1,100}\s+é\s+/i.test(home + homeData), "copy evita fórmula 'não é X, é Y'");

for (const message of passes) console.log(`PASS UI-VIBE — ${message}`);
if (failures.length) {
  console.error(`\nFAIL UI-VIBE (${failures.length})`);
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}
console.log(`\nPASS UI-VIBE — ${passes.length} verificações anti-template concluídas.`);
