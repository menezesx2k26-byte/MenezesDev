import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const config = readFileSync(resolve(root, "src/config/site.ts"), "utf8");
const blockers = [];

if (/approvedWhatsappUrl:\s*string\s*\|\s*null\s*=\s*null/.test(config)) {
  blockers.push("URL comercial real do WhatsApp MenezesDev permanece null.");
}
if (!process.env.PUBLIC_SITE_URL?.trim())
  blockers.push("Domínio canônico PUBLIC_SITE_URL não foi confirmado.");
if (process.env.PUBLIC_DEPLOY_ENV !== "production")
  blockers.push("PUBLIC_DEPLOY_ENV não está definido como production.");

if (blockers.length) {
  console.error("RELEASE BLOCKED");
  blockers.forEach((blocker) => console.error(`- ${blocker}`));
  process.exit(1);
}

console.log("PASS release guard — configuração comercial e ambiente de produção aprovados.");
