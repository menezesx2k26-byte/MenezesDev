# MenezesDev Tools — Autonomous Growth Engine Design

**Date:** 2026-08-24  
**Status:** approved design, implementation not started  
**Superpowers path:** architectural  
**Authority:** Gabriel Menezes  
**Parent scope:** `docs/tools/TOOLS_SCOPE.md`  
**Workflow:** `docs/tools/IMMUTABLE_WORKFLOW.md` + `docs/tools/workflow-addenda/2026-08-24-autonomous-growth-autopilot.md`  
**Security:** `docs/tools/SECURITY_POLICY.md` + `docs/tools/AUTONOMOUS_GROWTH_SECURITY.md`

---

# 1. Design goal

Create a low-maintenance, self-feeding growth system for MenezesDev Tools that can operate for long periods without routine human intervention while remaining constrained by immutable product/security/cost policy.

The system should:

- observe real search/product/revenue signals;
- discover timely opportunities from structured trend/news sources;
- decide whether to improve, create or prune;
- use AI only when a qualified editorial opportunity exists;
- automatically publish only low-risk pre-authorized work;
- stop individual risky tasks without stopping unrelated safe work;
- keep ordinary public Tools processing browser-first;
- avoid content-calendar spam;
- learn from 7/28/90/180-day outcomes;
- keep cost bounded even if external sources or models misbehave.

The intended user experience for the owner is close to **configure once, monitor by exception**.

---

# 2. Non-goals

This subsystem is not:

- a general breaking-news site;
- a web-wide unrestricted crawler;
- an LLM with unrestricted repository/deployment credentials;
- a replacement for the Tool SDK security gates;
- a way to bypass Launch 50 quality requirements;
- a system that publishes because a clock fired;
- a mass doorway-page generator;
- a server-side processing backend for tools that can run locally;
- a license/security decision maker with authority to approve unknown dependencies.

---

# 3. Architectural strategy

Chosen approach: **policy-gated autonomous flywheel**.

```text
                  ┌─────────────────────────────┐
                  │    FIRST-PARTY SIGNALS      │
                  │ Search Console / product /  │
                  │ revenue / site performance  │
                  └──────────────┬──────────────┘
                                 │
                  ┌──────────────▼──────────────┐
                  │         TREND RADAR         │
                  │ feeds/APIs/RSS → whitelist │
                  │ crawler only when needed    │
                  └──────────────┬──────────────┘
                                 │
                         normalized signals
                                 │
                  ┌──────────────▼──────────────┐
                  │      OPPORTUNITY ENGINE     │
                  │ score + choose action       │
                  └───────┬─────────┬───────────┘
                          │         │
             improve page│         │new intent
                          │         │
                  ┌───────▼───┐ ┌──▼──────────────┐
                  │ Optimizer │ │ Editorial/Tool  │
                  │ existing  │ │ candidate path  │
                  └───────┬───┘ └──┬──────────────┘
                          │         │
                          └────┬────┘
                               ▼
                  ┌─────────────────────────────┐
                  │ POLICY / QUALITY / SECURITY │
                  │ / COST / SEO GATES          │
                  └──────────────┬──────────────┘
                                 │
                     fail/stop   │   pass
                         ┌───────┴───────┐
                         │               ▼
                         │        Git / CI / publish
                         │               │
                         │               ▼
                         └──────► measurement ledger
                                         │
                                         └──────↺
```

---

# 4. Component boundaries

## 4.1 Scheduler / Orchestrator

Purpose:

- start lightweight observation cycles;
- resume/retry durable multi-step runs;
- prevent overlapping expensive runs;
- enforce run-level budgets;
- record run state.

Preferred implementation direction when this phase is reached: Cloudflare-native orchestration, likely Workflows/scheduled triggers or equivalent current capability.

The exact Cloudflare API/product choices, limits and pricing must be revalidated during the implementation phase.

The scheduler does not invent work. It asks the Opportunity Engine whether qualified work exists.

## 4.2 Signal Ingestors

Independent adapters ingest normalized signals from approved sources.

Signal classes:

- Search Console queries/pages/countries/devices/positions/CTR/impressions/clicks;
- product telemetry (`tool_start`, `tool_success`, errors, runtime, missing-search aggregates);
- revenue/ad-performance aggregates where safely available;
- Cloudflare traffic/security/performance aggregates;
- Trend Radar feed/news/trend signals.

Each adapter exposes a bounded schema. Provider-specific payloads do not leak through the rest of the system.

## 4.3 Trend Radar

Purpose:

- detect velocity/freshness around topics related to approved Tools clusters;
- find emerging user questions;
- distinguish short spike from potentially durable opportunity;
- provide source packs rather than content copies.

Source hierarchy:

1. structured first-party signals;
2. RSS/Atom/API feeds;
3. approved public trend/news indexes;
4. whitelisted crawler fallback.

The Trend Radar does not directly publish.

## 4.4 Whitelist Crawler

Purpose:

- retrieve bounded context from explicitly approved public sources when structured feeds are insufficient.

Input:

- source URL produced by an approved connector/domain policy, never arbitrary public-user input.

Output:

- normalized source metadata;
- bounded factual/context extract;
- hash/fingerprint;
- source timestamps;
- crawl evidence/errors.

The crawler has no authority to change the whitelist.

## 4.5 Opportunity Engine

Purpose:

- merge first-party and trend signals;
- choose **one of: ignore, observe, improve, editorial candidate, tool candidate, prune/consolidate candidate**;
- produce reason codes and an evidence packet.

A possible score combines:

```text
expected useful demand
× monetization/repeat value
× ranking opportunity
× topical fit
× security/implementation confidence
-
implementation cost
-
backend marginal cost
-
duplication/cannibalization risk
-
editorial/legal risk
```

This is intentionally not a fixed formula forever. The scoring weights may evolve using measured outcomes, but policy gates cannot be learned away.

## 4.6 Brief / Fact-Pack Builder

Purpose:

Convert an opportunity into a machine-verifiable editorial/tool brief.

Editorial brief fields should include, where applicable:

- target intent;
- cluster;
- related tool IDs;
- approved internal links;
- verified formulas/constants;
- worked-example inputs/outputs from deterministic engines;
- source references and freshness dates;
- claims permitted/prohibited;
- locale;
- content type;
- target reader problem;
- cannibalization check result;
- required disclosure/limitations.

This boundary is the main hallucination-control layer.

## 4.7 AI Editorial Engine

Purpose:

- turn approved structured briefs into useful natural-language drafts;
- revise/critique drafts;
- propose headings/examples only within the supplied factual envelope.

The model does not receive unrestricted repository write/deploy authority.

Provider/model access sits behind a replaceable gateway/adapter so the platform can switch models based on quality/cost without restructuring the editorial domain.

Model tiers may be used:

- inexpensive model: clustering, intent classification, brief cleanup, critic;
- stronger model: final prose for qualified high-value opportunities;
- deterministic validators: facts, formulas, links, schema, build checks.

## 4.8 Editorial Validator

Checks generated drafts before repository write.

Minimum checks:

- schema/frontmatter completeness;
- unique intent / no thin duplicate;
- formula/example recomputation;
- source existence/freshness rules;
- unsupported claims;
- prohibited high-stakes language;
- links allowlisted/valid;
- no prompt/system leakage;
- no dangerous HTML/script;
- language/locale quality;
- plagiarism/overlap risk using bounded similarity checks where practical;
- no artificial word-count padding.

## 4.9 Tool Factory Low-Risk Path

Future post-Launch-50 component.

Can autonomously create a tool only if the request maps exactly to pre-approved building blocks.

Allowed candidate profile:

```text
existing Tool SDK
+ existing approved engine
+ existing approved dependency set
+ no new secret
+ no new backend processing path
+ deterministic test oracle
+ existing security input class
+ existing UI primitives
+ independent useful intent
```

Otherwise the Tool Factory produces a hard-stop proposal rather than code/publish.

## 4.10 Policy Gate

Central deterministic gate that decides whether the action is eligible for automatic execution.

Inputs:

- action type;
- changed files/classes;
- dependencies;
- runtime/cost class;
- source whitelist status;
- content risk class;
- test evidence;
- security metadata;
- provider cost budget;
- workflow phase.

Outputs:

- `ALLOW_AUTONOMOUS`;
- `HARD_STOP_REVIEW`;
- `REJECT`.

The LLM cannot override this decision.

## 4.11 Git / CI Publisher

Purpose:

- write only approved file classes;
- create attributable commit/PR/run metadata;
- run typecheck/lint/tests/build/SEO checks;
- deploy only after gates pass;
- preserve rollback.

Autonomous writes are denied for governance/security files.

## 4.12 Measurement Ledger

Records the history needed for self-correction.

Suggested logical entities:

```text
opportunity
signal_snapshot
source_reference
editorial_run
model_usage
publication
publication_metric_snapshot
decision
policy_stop
cost_record
```

Do not store private end-user tool content.

---

# 5. Data flow: editorial opportunity

Example:

```text
Search Console detects growing impressions for "margin vs markup"
                           +
Trend Radar sees sustained business/finance discussion
                           ↓
Opportunity Engine checks existing URLs/intents
                           ↓
independent informational intent confirmed
                           ↓
Fact Pack uses tested Margin + Markup engines
                           ↓
source pack added for non-deterministic contextual facts
                           ↓
AI produces guide draft
                           ↓
validator recomputes examples and checks claims/links
                           ↓
Policy Gate: approved cluster, no new dependency/backend/cost class
                           ↓
CI/build
                           ↓
/autonomous guide publish
                           ↓
7/28/90/180-day measurement
```

If the query can be served by improving the existing Margin Calculator page, the system should prefer that over creating another URL.

---

# 6. Data flow: hot-news trigger

Example:

```text
approved feeds/GDELT detect rapid increase in interest-rate coverage
                           ↓
Trend Radar classifies entities/topic
                           ↓
cluster match: mortgage / loan / compound interest
                           ↓
Opportunity Engine asks:
  - search demand changing?
  - existing page can answer?
  - timely guide useful beyond headline copying?
                           ↓
if qualified: create evidence-backed scenario/explainer
if not qualified: ignore
```

The final editorial may explain the practical calculator consequence of a rate change; it must not impersonate a newswire or reproduce source articles.

---

# 7. Data flow: autonomous new tool

Future flow after Tool Factory prerequisites:

```text
missing-search + Search Console + cluster evidence
                        ↓
independent tool intent detected
                        ↓
Capability Map lookup
                        ↓
existing approved engine/security/runtime only?
      ├─ no → HARD_STOP_REVIEW
      └─ yes
           ↓
generate Tool SDK definition + engine binding/content
           ↓
deterministic correctness tests
           ↓
security metadata/limits tests
           ↓
SEO thin-intent/cannibalization gate
           ↓
CI/build
           ↓
autopublish
```

No package addition is allowed on the low-risk automatic path.

---

# 8. Trend scoring and decay

Trend signals must decay so that temporary spikes do not permanently dominate the opportunity queue.

Conceptually:

- 0–24h: strongest freshness signal;
- 1–3 days: high;
- 3–7 days: medium;
- 7–30 days: retain only with supporting search/product evidence;
- 30+ days: treat as evergreen evidence or discard as stale trend signal.

Exact decay weights are implementation details and should be calibrated rather than treated as immutable constants.

---

# 9. Source whitelist model

Versioned source policy should track:

```text
sourceId
domain/host
sourceType: api | rss | html
purpose
robotsPolicyStatus
termsReviewDate
rateLimit
maxResponseBytes
retentionClass
allowedPaths/blockedPaths
killSwitch
notes
```

Adding a new crawler domain is a human-review hard stop under the approved autonomy model.

---

# 10. Cost model

The public utility plane and the autonomous-growth control plane have different economics.

## Utility plane

Default cost per ordinary deterministic operation: approximately zero backend compute because processing runs locally.

## Growth control plane

Cost-bearing operations may include:

- external API requests;
- crawler traffic/storage;
- AI inference;
- scheduled orchestration;
- CI/build/deploy activity.

Each run must have bounded budgets.

Required controls before unattended production:

- AI spend ceiling;
- crawl request/byte ceiling;
- retry ceiling;
- run concurrency ceiling;
- publication count ceiling per run/window;
- kill switches;
- per-action cost recording where practical.

A source cannot recursively cause new crawling/model calls without a bounded queue/depth.

---

# 11. Failure behavior

Failures are intentionally asymmetric toward doing less.

Examples:

- source unavailable → skip source / no article;
- robots denial → do not crawl;
- feed malformed → reject item;
- model timeout → retry within budget, otherwise defer;
- fact validation failure → do not publish;
- source conflict → hard stop/defer;
- CI failure → no deploy;
- cost ceiling reached → pause generation;
- dependency requirement discovered → hard stop;
- duplicate/cannibalizing intent → improve/consolidate instead of new URL;
- ambiguous high-stakes claim → omit or hard stop.

Cadence never justifies weakening a gate.

---

# 12. Publication strategy

The system starts with high-quality Launch 50 tool pages plus a small deliberate set of pillar editorials/golden examples.

Post-launch publication is opportunity-driven.

No fixed requirement such as "two articles every week" is allowed to force creation.

A scheduled run may publish zero items.

Over two years, successful clusters may naturally accumulate many tools/guides. Counts are outcomes, not quotas.

---

# 13. SEO and content-quality safeguards

Before a new URL:

1. confirm independent intent;
2. search for an existing page that could be improved instead;
3. run cannibalization/near-duplicate checks;
4. ensure the page contains unique utility or explanation;
5. ensure internal links are contextually justified;
6. avoid mass permutations of the same template;
7. ensure a clear owner/purpose/source methodology where trust-sensitive;
8. use current source dates when claims are time-sensitive;
9. never change `lastmod`/dates merely to simulate freshness;
10. prune/consolidate when data shows weak independent value.

---

# 14. Security model

`docs/tools/AUTONOMOUS_GROWTH_SECURITY.md` is binding.

Primary threats include:

- prompt injection through crawled pages/feeds;
- SSRF/open redirect through extracted URLs;
- crawler abuse/denial to third parties;
- recursive cost amplification;
- malicious model output;
- supply-chain expansion through generated code;
- repository/governance tampering;
- copyrighted content over-retention/reproduction;
- YMYL hallucination;
- secret leakage;
- retry storms;
- compromised/poisoned source feeds.

Control principle: autonomous components receive narrow capabilities and fail closed.

---

# 15. Testing strategy

Implementation plan must include at minimum:

## Unit tests

- scoring/decay;
- source URL whitelist/redirect validation;
- policy-gate allow/hard-stop/reject matrix;
- content schema;
- fact-pack deterministic calculations;
- budget accounting;
- duplicate/cannibalization heuristics;
- state transitions.

## Security tests

- private/loopback/link-local URL attempts;
- redirect-to-private target;
- feed/HTML prompt injection;
- oversized responses;
- redirect loops;
- malformed XML/JSON/HTML;
- crawler rate-limit/backoff;
- recursive-link/cost bomb;
- LLM output with scripts/unsafe links;
- generated diff attempting dependency/governance changes;
- source claiming authority to modify system policy.

## Integration tests

- Search Console fixture → opportunity;
- trend feed fixture → source pack;
- opportunity → brief → draft → validation;
- zero-qualified-opportunity run produces no AI publication;
- budget exhaustion produces safe pause;
- CI failure blocks publish;
- autonomous approved-engine tool path;
- hard-stop task does not block unrelated low-risk task.

## Production checks

- kill switches;
- cost alerts/limits;
- source whitelist audit;
- robots behavior;
- attribution/run IDs;
- rollback;
- no private user content in logs/storage.

---

# 16. Observability

Provide enough observability to answer:

- why was this opportunity selected?
- what evidence/source caused it?
- which model/provider was used?
- what did it cost?
- what gates passed/failed?
- what files/URLs were published?
- what happened 7/28/90/180 days later?
- did the action increase traffic/RPM/internal navigation?
- was content later improved/consolidated/pruned?

Observability stores decision metadata, not private tool payloads.

---

# 17. Cloudflare deployment direction

Preferred future control-plane direction:

- Cloudflare Worker/Workflow for orchestration;
- D1 or the smallest justified durable store for decision/measurement state;
- AI Gateway or equivalent adapter/gateway for provider portability, analytics and cost controls;
- existing Cloudflare edge/security controls for platform endpoints;
- GitHub as versioned publication/audit source.

This is a **design direction**, not permission to create infrastructure now.

During implementation, current Cloudflare product limits/pricing/API contracts must be checked again before freezing exact topology.

---

# 18. Governance

Policy precedence remains:

1. explicit current authorization from Gabriel Menezes;
2. immutable workflow and binding workflow addenda;
3. security contracts;
4. approved specs;
5. implementation plans;
6. code/configuration.

The growth engine itself cannot change items 1–4.

---

# 19. Rollout sequence

The subsystem is designed now but implemented later.

Recommended rollout after Launch 50 is stable:

1. **observe-only** — ingest signals and rank opportunities, no writes;
2. **draft-only** — generate proposed editorials, no publish;
3. **autonomous editorial low-risk** — whitelist + CI + rollback;
4. **Trend Radar crawler fallback** — after source whitelist/security checks;
5. **autonomous optimization/pruning**;
6. **Tool Factory low-risk path** — only after SDK/engines prove stable;
7. expand autonomy only from measured reliability.

This staged rollout does not require routine human approval once a stage and its policy are explicitly enabled; it exists to validate the automation before broader authority is granted.

---

# 20. Current project phase

This spec is a future architectural design artifact only.

Current Tools workflow state remains:

- Phase 1 — Global Market Intelligence: ACTIVE;
- Phase 2 — OSS Capability Audit: ACTIVE;
- Phase 3 — Capability Map: NOT STARTED;
- Phase 4 — Freeze Launch 50: NOT STARTED;
- Tools implementation: not started under this workflow.

No implementation, infrastructure, crawler, AI provider or schedule is created by this spec.
