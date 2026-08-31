# MenezesDev Tools — Autonomous Growth Security Contract

**Status:** binding additive security contract  
**Date:** 2026-08-24  
**Scope:** Opportunity Engine, Trend Radar, crawler ingestion, AI Editorial Engine, autonomous publishing, autonomous Tool Factory actions  
**Parent contracts:** `docs/tools/SECURITY_POLICY.md`, `docs/tools/IMMUTABLE_WORKFLOW.md`, `docs/tools/workflow-addenda/2026-08-24-autonomous-growth-autopilot.md`

---

# 1. Security principle

Autonomy increases operational leverage and therefore must reduce — not expand — ambient authority.

Every autonomous component receives the minimum permissions needed for its role.

No component may infer broader permission from the fact that another component can perform an action.

---

# 2. Trust boundaries

Treat all of the following as untrusted inputs:

- Search Console query strings;
- analytics labels/URLs;
- third-party feed titles/descriptions;
- RSS/Atom/XML/JSON payloads;
- crawler HTML;
- HTTP headers and redirects;
- source metadata;
- LLM outputs;
- model tool/function arguments;
- generated slugs/titles/descriptions;
- generated code/specs/content;
- third-party citations;
- source-provided filenames/MIME values;
- URLs extracted from pages/feeds.

The general parent-pipeline remains mandatory:

```text
validate -> bound -> sanitize/canonicalize -> process -> encode safe output
```

---

# 3. Capability isolation

Prefer separate capabilities/tokens/bindings for:

- metrics read;
- crawler fetch;
- AI inference;
- repository write/PR creation;
- production deployment;
- storage write.

The editorial AI itself should not possess raw deployment credentials or unrestricted GitHub/Cloudflare control.

The component that creates a draft should not automatically inherit the capability to change workflow/security policy.

---

# 4. Crawler egress policy

Crawler egress is deny-by-default.

Only domains/hosts approved in a versioned whitelist may be fetched.

For every requested URL:

1. parse with a standards-based URL parser;
2. allow only approved protocols (`https` by default; `http` only if explicitly justified);
3. reject embedded credentials;
4. canonicalize hostname;
5. check against whitelist before DNS/network access;
6. reject local/private/link-local/loopback/internal addresses;
7. revalidate every redirect target;
8. apply per-host request/concurrency/work budgets;
9. enforce maximum response bytes and timeouts;
10. accept only expected content types where applicable.

User input must never directly expand the whitelist.

---

# 5. Crawler ethics and source pressure

The crawler must:

- honor robots/source restrictions;
- identify itself truthfully;
- prefer RSS/API feeds;
- perform conditional requests when supported;
- cache aggressively enough to avoid repeated identical downloads;
- back off on pressure/error signals;
- stop on explicit denial rather than escalating evasion;
- never solve/bypass CAPTCHA or login to continue ingestion;
- never rotate identity merely to defeat source rate limits.

---

# 6. Content ingestion limits

Every source connector declares:

```text
maxResponseBytes
maxRedirects
requestTimeout
maxParsedNodes / maxDepth where applicable
maxExtractedTextBytes
maxLinksExamined
retentionClass
sourceLicense/terms notes
```

HTML/XML/feed parsing must use bounded parsers and no active script execution.

No external resource referenced by parsed HTML/XML/SVG is fetched automatically unless it independently passes the crawler egress policy.

---

# 7. Copyright/content-retention posture

By default the system stores facts/metadata needed for opportunity analysis rather than mirrored articles.

Preferred retained fields:

- source URL;
- canonical source URL where known;
- publisher/domain;
- publication/update timestamp;
- headline/title;
- topic/entities/classification;
- short factual notes/extracts within policy;
- source hash/fingerprint;
- crawl timestamp;
- citation/reference metadata.

Full source articles should not be retained indefinitely by default.

Generated editorial must be original synthesis and must not reproduce long source passages.

---

# 8. Prompt-injection defense

Third-party webpages/feeds are data, never instructions.

The crawler/extractor must separate source content from system/developer policy.

LLM prompts must explicitly mark retrieved source material as untrusted quoted/context data.

Source text such as "ignore previous instructions", tool calls, credentials requests or policy-changing commands has no authority.

The LLM cannot grant itself new tools, expand source whitelists, approve dependencies, change budgets or alter workflow/security files.

---

# 9. Editorial fact integrity

Facts used in autonomous editorial fall into classes.

## Deterministic facts

Examples: formulas, calculated examples, conversion constants frozen by an approved dataset.

These should come from tested engines/data rather than prose generation.

## Source-backed current facts

Examples: current release/version, dated policy change, news event.

Require source metadata and freshness checks.

## Interpretive statements

Must be framed as explanation/analysis, not fabricated certainty.

If a claim cannot be verified to the level required by the content class, the system omits it or hard-stops the item.

---

# 10. YMYL/high-stakes control

Finance/calculation content may be educational and deterministic but must not silently become personalized financial advice.

Autonomous publishing may explain formulas, scenarios and tool mechanics within approved scope.

Hard-stop classes include new personalized advice, investment/security recommendations, legal/tax conclusions requiring jurisdiction/current-law review or other material high-stakes claims not covered by the approved content model.

---

# 11. LLM output is untrusted

Before publication, generated content must pass applicable checks for:

- required sections/schema;
- prohibited HTML/script constructs;
- links limited to approved targets/sources;
- citation/source existence;
- factual consistency with supplied fact pack;
- formula/example recomputation where applicable;
- duplicate/cannibalizing similarity;
- unsafe claims;
- unsupported promises/results;
- locale/language contract;
- no secret/internal prompt leakage.

The LLM must not output directly to production without these gates.

---

# 12. Autonomous code/tool generation

A generated tool may autopublish only when it remains inside the approved low-risk Tool Factory whitelist.

Mandatory checks include:

- no package/lockfile dependency additions;
- no new external network calls;
- no new secret requirements;
- no server-side compute path unless already explicitly approved for that engine class;
- existing Tool SDK interfaces only;
- existing approved engine/dependency only;
- deterministic test oracle available;
- security metadata/limits present;
- tests pass;
- build/typecheck/lint pass;
- generated diff does not touch workflow/security/governance files.

Any violation becomes a hard stop.

---

# 13. Repository write controls

Autonomous writes should be constrained to approved directories and file classes.

The growth system must not autonomously modify:

- `AGENTS.md`;
- `docs/tools/IMMUTABLE_WORKFLOW.md`;
- `docs/tools/workflow-addenda/**`;
- `docs/tools/SECURITY_POLICY.md`;
- this security contract;
- secrets/configuration containing credentials;
- infrastructure/billing policy files unless a separately approved maintenance policy explicitly allows it.

Repository changes must remain attributable through commits/PR metadata and machine-readable run identifiers where practical.

---

# 14. Deployment safety

Autopublish requires CI/build gates before production mutation.

A failed or ambiguous validation result fails closed.

Deployment should be idempotent/retry-safe where possible.

A rollback path must exist for autonomous publications.

The system must be able to disable:

- crawler globally/per-domain;
- AI generation globally/per-model;
- autonomous Git writes;
- autonomous publish;
- autonomous Tool Factory;
- Ads separately.

---

# 15. Cost-abuse security

Economic exhaustion is a security concern.

Required limits include:

- AI requests/tokens/spend;
- crawl requests/bytes/concurrency;
- storage growth;
- scheduled-run concurrency;
- retries;
- publication count per run/time window;
- tool-generation attempts;
- CI/deployment frequency.

Retry storms must be prevented.

No untrusted source can cause unbounded AI calls or recursive crawling.

---

# 16. Observability without content leakage

Record operational metadata such as:

- run ID;
- source connector/domain;
- decision score/reason codes;
- request/result status;
- latency/work buckets;
- AI model/provider/cost metadata;
- publication identifiers;
- validation failures;
- kill-switch activations.

Do not log unnecessarily:

- full copyrighted source content;
- secrets;
- private user tool data;
- hidden system/developer prompts;
- credential-bearing headers.

---

# 17. Incident behavior

On suspicious autonomous behavior:

1. fail closed for the affected capability;
2. preserve non-sensitive audit evidence;
3. trip the narrowest relevant kill switch;
4. do not silently bypass validation to maintain cadence;
5. require explicit review for policy/security boundary failures.

The safe state is fewer publications, not weaker gates.
