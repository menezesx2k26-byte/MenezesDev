import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const wranglerExecutable = resolve(
  root,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "wrangler.cmd" : "wrangler",
);

if (!existsSync(wranglerExecutable)) {
  console.error(`FAIL Studio seed check — executável Wrangler ausente: ${wranglerExecutable}`);
  process.exit(1);
}

const query = `
  SELECT
    (SELECT COUNT(*) FROM studio_state WHERE site_id = 'menezesdev') AS state_count,
    (SELECT COUNT(*) FROM studio_versions WHERE site_id = 'menezesdev') AS version_count,
    (SELECT COUNT(*) FROM audit_events WHERE site_id = 'menezesdev' AND event_type = 'studio_initialized') AS audit_count,
    (SELECT draft_revision FROM studio_state WHERE site_id = 'menezesdev') AS draft_revision,
    (SELECT published_version_number FROM studio_state WHERE site_id = 'menezesdev') AS published_version_number,
    (SELECT source_revision FROM studio_versions WHERE site_id = 'menezesdev' AND version_number = 1) AS source_revision,
    (SELECT published_by FROM studio_versions WHERE site_id = 'menezesdev' AND version_number = 1) AS published_by,
    (SELECT actor_subject FROM audit_events WHERE site_id = 'menezesdev' AND event_type = 'studio_initialized' ORDER BY id DESC LIMIT 1) AS audit_actor,
    (SELECT json_extract(draft_json, '$.schemaVersion') FROM studio_state WHERE site_id = 'menezesdev') AS draft_schema_version,
    (SELECT json_extract(snapshot_json, '$.schemaVersion') FROM studio_versions WHERE site_id = 'menezesdev' AND version_number = 1) AS version_schema_version,
    (SELECT CASE WHEN s.draft_json = v.snapshot_json THEN 1 ELSE 0 END
       FROM studio_state s
       JOIN studio_versions v
         ON v.site_id = s.site_id
        AND v.version_number = 1
      WHERE s.site_id = 'menezesdev') AS snapshots_match;
`;

const result = spawnSync(
  wranglerExecutable,
  [
    "d1",
    "execute",
    "menezesdev-studio-local",
    "--local",
    "--json",
    "--command",
    query,
  ],
  {
    cwd: root,
    encoding: "utf8",
    shell: process.platform === "win32",
  },
);

if (result.status !== 0) {
  console.error(`FAIL Studio seed check — Wrangler encerrou com código ${result.status}.`);
  if (result.stderr?.trim()) console.error(result.stderr.trim());
  process.exit(1);
}

let payload;
try {
  payload = JSON.parse(result.stdout);
} catch {
  console.error("FAIL Studio seed check — Wrangler não retornou JSON válido.");
  process.exit(1);
}

const entries = Array.isArray(payload) ? payload : [payload];
const rows = entries.flatMap((entry) => entry.results ?? []);
const row = rows[0];
const expected = {
  state_count: 1,
  version_count: 1,
  audit_count: 1,
  draft_revision: 0,
  published_version_number: 1,
  source_revision: 0,
  published_by: "local-seed",
  audit_actor: "local-seed",
  draft_schema_version: 1,
  version_schema_version: 1,
  snapshots_match: 1,
};

const failures = [];
if (!row) {
  failures.push("consulta não retornou estado do Studio.");
} else {
  for (const [key, value] of Object.entries(expected)) {
    if (row[key] !== value) failures.push(`${key}: recebido ${JSON.stringify(row[key])}, esperado ${JSON.stringify(value)}.`);
  }
}

if (failures.length) {
  console.error(`\nFAIL Studio seed check (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  "PASS Studio seed check — estado único, versão 1 publicada, draft idêntico e audit local-seed confirmados.",
);
