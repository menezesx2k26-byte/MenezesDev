# MenezesDev Tools — Immutable Workflow

**Status:** canonical operational workflow  
**Created:** 2026-08-24  
**Repository:** `menezesx2k26-byte/MenezesDev`  
**Current documentation branch:** `feat/tools-oss-catalog`  
**Authority:** Gabriel Menezes  
**Change model:** append-only unless Gabriel Menezes gives explicit authorization to modify existing normative text.

---

# 0. Immutability contract

This document is the canonical workflow for MenezesDev Tools.

## 0.1 Default rule: append-only

Without explicit authorization from Gabriel Menezes, future work may only **append** compatible information to this document.

The following actions are forbidden without explicit authorization:

- deleting existing normative text;
- rewriting an existing requirement;
- weakening an existing hard gate;
- changing the meaning of an existing decision;
- renumbering phases in a way that changes their order;
- replacing one architectural choice with another;
- silently marking an unfinished phase as complete;
- shortening the workflow by removing detail;
- changing a security, monetization, privacy or cost invariant;
- changing Launch 50 criteria;
- changing the browser-first rule;
- changing the user-input sanitization contract;
- retroactively editing the historical record of decisions.

Allowed without further authorization:

- appending a new phase after the current final phase;
- appending a new hard gate that does not weaken an earlier gate;
- appending a new candidate dependency to an audit table or linked audit file;
- appending a new security finding;
- appending a new implementation note that is compatible with the existing contract;
- appending progress/status records;
- appending release evidence;
- appending an addendum that narrows or strengthens an existing rule.

## 0.2 What counts as authorization

Authorization must be explicit and attributable to Gabriel Menezes. Agents must not infer authorization from context, convenience, a code change, a later plan, or another document.

A valid authorization must clearly state that an existing rule may be changed, removed, replaced, reordered or weakened, and should identify the affected scope when practical.

If a requested change conflicts with this document and no explicit authorization exists, the agent must stop that conflicting change and report the conflict.

## 0.3 Conflict precedence

For MenezesDev Tools, precedence is:

1. explicit current instruction from Gabriel Menezes;
2. this immutable workflow;
3. `docs/tools/SECURITY_POLICY.md`;
4. approved design/spec documents;
5. approved implementation plans;
6. OSS audit documents;
7. implementation details.

A lower-precedence document may add detail but may not contradict a higher-precedence rule.

## 0.4 Historical integrity

Completed decisions remain recorded even if a later explicitly authorized change supersedes them. The preferred method for authorized change is to append a dated superseding addendum rather than rewrite history.

---

# 1. Product mission

Build a large, international, free web-tools platform inside MenezesDev whose primary economic model is sustainable advertising revenue, especially Google AdSense, while keeping operating cost extremely low.

The project must not depend on Workana, outbound prospecting or active client acquisition.

The economic objective is to create useful web utilities that acquire users primarily through organic search and direct/repeat usage.

The commercial MenezesDev site remains a separate experience from the ad-monetized Tools surface even though both share the same domain and repository.

---

# 2. Non-negotiable product decisions

## 2.1 Domain and repository

MenezesDev Tools lives inside the existing MenezesDev repository and primary domain.

Canonical direction:

```text
menezesdev.com/
├── /                        commercial site; no Ads
├── /projetos/...            portfolio; no Ads
├── /demo/...                demos; no Ads
├── /tools/...               primary English Tools surface; monetized
└── /pt-br/ferramentas/...   Brazilian Portuguese localization
```

No separate Tools brand or separate domain is required for Launch 50.

## 2.2 Language

- Primary language: international English (`en`).
- Secondary language: Brazilian Portuguese (`pt-BR`).
- English is authored as the canonical content, not generated as a mechanical translation of Portuguese.
- Region-specific variants such as `en-US` or `en-GB` are out of Launch 50 unless explicitly added later.
- Locale-specific tools may exist only in the locale where they make sense.

## 2.3 Monetization

Primary initial monetization: Google AdSense.

Future monetization may include Pro features, APIs or contextual affiliate revenue, but none of those may complicate Launch 50 without evidence that they are necessary.

Commercial/portfolio/demo pages remain ad-free.

## 2.4 Account model

Launch 50 has no required authentication.

Architecture must be account-ready but must not introduce auth, user accounts or persistent identity only for hypothetical future use.

---

# 3. Core economic architecture: browser-first

## 3.1 Mandatory execution preference

Every tool must answer the following questions in order:

1. Can it be done safely and correctly with a native browser API?
2. If not, can it be done safely and correctly client-side with JavaScript/TypeScript?
3. If not, can it be done safely and correctly in local WebAssembly?
4. Only if the above are inadequate may it use a Worker/backend execution path.

Canonical decision order:

```text
secure native browser API
        >
secure browser JS/TS
        >
secure local WASM
        >
Worker/backend only when necessary
```

## 3.2 Cost hard gate

A simple tool that performs a backend request per operation when the same operation could safely and reliably execute in the user's browser fails architecture review.

Backend compute is a scarce resource because unnecessary requests can convert traffic into cost instead of profit.

## 3.3 Tool runtime declaration

Every Tool SDK definition must declare an execution profile equivalent to:

```ts
execution: {
  preferred: "browser",
  fallback: "wasm" | "worker" | "none",
  serverRequired: boolean
}
```

The exact TypeScript interface may evolve during implementation, but the semantic requirement is immutable unless expressly changed.

## 3.4 Rust policy

Rust is preferred only when it materially improves one or more of:

- memory safety;
- hostile-file parsing safety;
- deterministic correctness;
- performance;
- WASM suitability;
- resource control.

Rust is not mandatory and is not an approval signal by itself.

A mature JavaScript/TypeScript/browser implementation may be preferred when it is safer, smaller, better maintained or avoids unnecessary complexity.

---

# 4. User-input security contract

Every user-controlled input is untrusted.

This includes text, files, metadata, filenames, URLs, query parameters, form values, document objects, archive members, dimensions, MIME strings and values returned by third-party parsers.

## 4.1 Mandatory boundary pipeline

Every applicable public input flow must implement:

```text
validate
   ↓
bound
   ↓
sanitize / canonicalize
   ↓
process
   ↓
encode safe output
```

This is a hard gate. No tool may bypass the boundary because its parser is popular, open source, written in Rust, runs in WASM or executes only in the browser.

## 4.2 Minimum security requirements

- no unbounded parser input;
- byte/character/page/dimension/depth/work limits as applicable;
- no trust in file extension or user-supplied MIME type;
- inspect actual format where relevant;
- protect against decompression bombs and pathological documents;
- protect against catastrophic regex behavior;
- no direct rendering of untrusted values with `innerHTML`;
- use safe text sinks or explicit sanitization when HTML rendering is a real feature;
- disable PDF JavaScript and equivalent active document features by default;
- disable SVG scripting/external active resources by default;
- no server-side fetch of arbitrary user URLs without a dedicated SSRF design;
- no leaking stack traces, secrets or infrastructure paths to users;
- user file/text contents must not be copied into telemetry.

Full details live in `docs/tools/SECURITY_POLICY.md` and are binding.

---

# 5. Traffic and cost protection

AdSense revenue must not be exposed unnecessarily to bot traffic or abusive compute.

## 5.1 Traffic Guard

Traffic Guard is a first-class subsystem.

Conceptual path:

```text
request/session
      ↓
Cloudflare edge security
      ↓
bot / abuse signals
      ↓
Traffic Guard
      ├── verified crawler → content; no ad eligibility requirement
      ├── eligible human   → content + Ads eligibility
      ├── suspicious       → content/no Ads; challenge when justified
      └── hostile          → rate limit/block
```

The implementation must not block legitimate search-engine crawling.

## 5.2 Cost Guard

Expensive server-side operations require a separate cost-control decision.

Conceptual path:

```text
operation request
      ↓
Traffic Guard
      ↓
Cost Guard
      ├── local-capable    → redirect execution to browser
      ├── cheap backend    → bounded execution
      ├── expensive        → quota/rate-limit/challenge
      └── suspicious       → deny compute
```

No expensive endpoint may be publicly unmetered merely because the site itself is free.

## 5.3 Advertising eligibility

Ad loading must be controlled by an eligibility layer.

The canonical relationship is:

```text
Traffic Guard
    ↓
adsEligible
    ↓
AdProvider
```

Suspicious/automated sessions should not be intentionally monetized as if they were trusted human traffic.

A global and granular advertising kill switch is required before monetized production scale.

---

# 6. AdSense architecture

## 6.1 Placement strategy

Use hybrid controlled monetization:

- manual ad slots around high-interaction tool surfaces;
- automated/experimental placement only in surfaces explicitly permitted by the design;
- no ad deliberately styled or positioned to resemble Tool controls;
- no ad immediately adjacent to Upload, Download, Convert, Calculate or equivalent primary actions in a way that could encourage accidental clicks;
- reserve layout space where appropriate to minimize CLS.

## 6.2 Ad-free surfaces

The following surfaces remain ad-free unless explicitly changed later:

- primary commercial sales pages;
- portfolio pages;
- demo sites/cases.

## 6.3 AdSense readiness gate

Before enabling production monetization, validate at minimum:

- privacy policy;
- required consent/CMP behavior by jurisdiction;
- `ads.txt`;
- placement safety;
- Core Web Vitals impact;
- Traffic Guard integration;
- ad kill switch;
- crawler behavior;
- no deceptive UI around ads.

---

# 7. Tool SDK

Tool SDK is mandatory from the MVP and is the foundation for scale.

The goal is that a new tool is primarily expressed as a typed definition plus a focused engine, not a fully bespoke page.

The SDK must eventually model, where applicable:

- stable tool id;
- locale content;
- category;
- title/description;
- aliases/keywords/intents;
- inputs;
- validation rules;
- execution profile;
- input resource limits;
- engine binding;
- output model;
- privacy statement;
- examples;
- explanation blocks;
- FAQ;
- related tools;
- SEO metadata;
- analytics events;
- advertising eligibility/placement metadata;
- error presentation.

The SDK must not become a speculative abstraction for thousands of hypothetical tools. It is shaped by the real Launch 50 requirements.

---

# 8. Open-source sourcing policy

The platform should reuse mature open-source software instead of reimplementing complex commodity parsers/codecs unnecessarily.

## 8.1 Audit before integration

No third-party candidate is integrated only because it is popular or open source.

Audit dimensions include:

- commercial-use license compatibility;
- exact license of code;
- exact license of bundled assets/models/fonts/data separately;
- recent maintenance/release activity;
- community feedback and issue quality;
- GitHub adoption signals;
- known vulnerabilities/advisories;
- unsafe defaults;
- transitive dependencies;
- browser/WASM/Worker fit;
- bundle cost;
- memory/resource behavior;
- malformed-input behavior;
- fuzzing/property-test evidence when relevant;
- capabilities unlocked across Launch 50.

## 8.2 Decision states

- `APPROVED`
- `CONDITIONAL`
- `HOLD`
- `REJECT`

Only `APPROVED` dependencies may be integrated without an additional dependency decision.

`CONDITIONAL` candidates require all listed conditions to be satisfied first.

## 8.3 Licensing preference

Permissive licenses are preferred, including MIT, Apache-2.0, BSD and ISC families.

Copyleft, dual-license or unclear-license dependencies require explicit review of the intended distribution path.

No-license/unclear-commercial-use code is not copied into the product.

## 8.4 Vendoring rule

No vendoring by default.

Prefer pinned package/crate dependencies. Vendor only for a concrete WASM/offline/build/supply-chain reason and preserve all required notices.

## 8.5 Native platform preference

If a browser standard API provides the same capability securely and reliably, prefer it over adding a dependency.

---

# 9. Search and discovery architecture

Launch search uses an inexpensive local index first.

Each tool should be able to declare:

- title;
- aliases;
- user-language intents;
- keywords;
- category.

Fuzzy matching may be used client-side.

Queries that produce no useful result may be recorded in anonymous aggregate form as `missing_search` to discover unmet demand.

Semantic/AI search is not a Launch 50 requirement and should be added only if observed data proves that the local index is insufficient.

---

# 10. Content and SEO policy

## 10.1 Utility-first

The tool itself is the primary product.

Do not bury the functional UI beneath long SEO prose.

Supporting content is adaptive to the query/tool and may include:

- how it works;
- formula or method;
- worked example;
- limitations;
- privacy behavior;
- FAQ;
- related tools.

There is no required word-count target.

## 10.2 URL quality gate

A new URL must represent a genuine user/search intent or a genuinely distinct tool experience.

Do not create thin doorway pages that differ only by a token, number, file extension or cosmetic wording when one stronger tool can serve the same intent.

Related operations should be consolidated when that creates a better utility.

## 10.3 Initial information architecture

Primary English:

```text
/tools/image/...
/tools/calculators/...
/tools/converters/...
/tools/text/...
/tools/developer/...
/tools/pdf/...
```

Secondary Portuguese:

```text
/pt-br/ferramentas/...
```

SEO implementation must include correct canonical and language-alternate handling for equivalent localized content.

---

# 11. Analytics and privacy

Use a hybrid analytics model:

- Search Console for search acquisition;
- AdSense reporting for ad revenue;
- Cloudflare for traffic/security/edge behavior;
- privacy-conscious first-party product telemetry for tool behavior.

Allowed telemetry examples:

- `tool_start`;
- `tool_success`;
- `tool_error`;
- processing duration bucket;
- runtime used;
- category;
- anonymous `missing_search` intent aggregates.

Prohibited telemetry includes:

- uploaded file contents;
- pasted text contents;
- document contents;
- extracted private metadata values;
- private generated output;
- unnecessary persistent identity.

---

# 12. Launch 50 portfolio rule

Launch target: **50 complete, functioning tools**.

The 50 are not chosen solely by implementation ease.

Selection principle:

- approximately 70% SEO/AdSense opportunity;
- approximately 20% architectural coverage;
- approximately 10% experimentation.

The exact category distribution may be refined by market/audit evidence without violating this principle.

The 50 must include enough variety to prove:

- trivial deterministic client tools;
- text/structured-data tools;
- image/file tools;
- local WASM where justified;
- at least representative hybrid/backend behavior if a Launch 50 capability truly requires it;
- localization pipeline;
- SEO/content model;
- analytics;
- Ad eligibility;
- Traffic Guard/Cost Guard integration where applicable.

A route does not count as a Launch 50 tool unless the utility itself is complete and passes applicable gates.

---

# 13. Development and branch strategy

Production `main` must not receive partial Tools implementation merely to show progress.

Canonical strategy:

```text
main
  └── production only

feat/tools-platform
  └── integration branch for approved Tools implementation

feature/worktree branches
  ├── SDK / infrastructure tasks
  ├── wave-specific tool tasks
  ├── security tasks
  └── other isolated work packages
```

The current OSS research is isolated in:

`feat/tools-oss-catalog`

During implementation, Superpowers worktree/TDD/review practices should be used where applicable.

Launch 50 may be built in internal waves, but those waves are engineering checkpoints, not automatic public releases.

---

# 14. Superpowers governance

The Superpowers workflow is the default engineering process for MenezesDev Tools.

For architectural work:

1. inspect current project context;
2. brainstorm/design before implementation;
3. obtain required approval gates;
4. write design/spec;
5. self-review the spec;
6. write implementation plan;
7. execute through isolated tasks/worktrees;
8. use TDD for implementation work;
9. request/review code changes;
10. verify before claiming completion.

No agent may use Superpowers as justification to contradict this immutable workflow.

This immutable workflow constrains downstream specs and plans.

---

# 15. Detailed execution workflow

## Phase 0 — Product constitution

**Status:** CLOSED.

Deliverables:

- same MenezesDev domain/repository;
- Tools separated logically from commercial site;
- AdSense-first monetization;
- international English primary;
- PT-BR secondary;
- no required account;
- utility-first product philosophy.

Gate: all items above recorded in canonical docs.

## Phase 1 — Global market intelligence

**Status:** ACTIVE / partially completed.

Tasks:

- map major international tool competitors;
- map English search intents by category;
- identify long-tail opportunities;
- estimate ranking difficulty qualitatively/quantitatively where data is available;
- estimate ad/commercial value where possible;
- build candidate universe substantially larger than Launch 50;
- avoid selecting tools purely by intuition.

Output:

- Market Map;
- candidate tool matrix;
- ranked opportunities.

Gate: sufficient evidence to select Launch 50 without arbitrary guessing.

## Phase 2 — OSS capability audit

**Status:** ACTIVE.

Tasks:

- map each candidate capability to native browser APIs first;
- search mature OSS alternatives;
- audit license;
- audit maintenance/community signals;
- audit advisories/security posture;
- audit bundle/runtime cost;
- audit hostile-input behavior;
- audit Rust/WASM alternatives when they materially improve safety/performance;
- classify each dependency;
- record exact conditions for conditional use.

Existing supporting docs:

- `docs/tools/OSS_CATALOG.md`;
- `docs/tools/RUST_OSS_AUDIT.md`;
- `docs/tools/RUST_OSS_AUDIT_BATCH3.md`;
- `docs/tools/SECURITY_POLICY.md`.

Gate: every Launch 50 capability has an implementation path or a documented reason to implement it internally.

## Phase 3 — Capability Map

**Status:** NOT STARTED.

For each candidate Launch 50 tool, record:

- tool id;
- category;
- primary search intent;
- locale scope;
- native/browser/JS/WASM/Worker execution decision;
- selected engine/dependency;
- license state;
- expected bundle impact;
- server request count per operation;
- expected marginal backend cost;
- security boundary class;
- input limits;
- telemetry events;
- monetization eligibility;
- rationale.

Gate: no Launch 50 tool lacks a concrete technical and economic execution path.

## Phase 4 — Freeze Launch 50

**Status:** NOT STARTED.

Tasks:

- select exactly 50 initial tools;
- verify 70/20/10 portfolio principle;
- verify category diversity;
- verify no thin/duplicate intent pages;
- verify browser-first compliance;
- verify OSS/license path;
- verify each tool can pass AdSense-quality expectations;
- identify tools requiring backend compute and challenge each one.

Gate: Launch 50 matrix approved.

## Phase 5 — Information architecture and international SEO spec

**Status:** NOT STARTED.

Tasks:

- route taxonomy;
- English canonical routes;
- PT-BR localization routes;
- categories;
- breadcrumbs;
- related-tool graph;
- canonical logic;
- `hreflang` logic;
- sitemap strategy;
- robots behavior;
- structured-data applicability;
- category-page requirements;
- index/noindex rules;
- page-title/meta rules;
- internal search indexing.

Gate: complete route/SEO contract before mass page generation.

## Phase 6 — Tools architecture design spec

**Status:** NOT STARTED.

Tasks:

- reconcile existing Astro static-first architecture with Tools;
- define Tools module boundaries;
- define Tool SDK interfaces;
- define runtime adapters;
- define browser/WASM/Worker boundaries;
- define shared security interfaces;
- define analytics interfaces;
- define ad interfaces;
- define locale/content interfaces;
- define error model;
- define testing layers;
- define dependency isolation/dynamic imports.

Gate: approved written design spec under Superpowers governance.

## Phase 7 — Security design and threat model consolidation

**Status:** PARTIALLY COMPLETE through policy; implementation design pending.

Tasks:

- convert `SECURITY_POLICY.md` into concrete SDK/runtime gates;
- define byte/work/resource budgets;
- define hostile fixture strategy;
- define file sniffing/format detection strategy;
- define worker isolation strategy;
- define CSP requirements;
- define SSRF controls for any future URL-fetch path;
- define archive bomb/path traversal defenses;
- define parser timeout/work budget model;
- define safe output encoding requirements.

Gate: every public input class has a testable boundary policy.

## Phase 8 — Traffic Guard and Cost Guard design

**Status:** NOT STARTED.

Tasks:

- Cloudflare edge protection design;
- bot classification inputs;
- verified crawler handling;
- rate-limit policy by route/cost class;
- Turnstile/challenge triggers;
- `adsEligible` contract;
- cost-class taxonomy;
- expensive-operation quota policy;
- global/per-route ad kill switches;
- abuse observability.

Gate: bots cannot cheaply create uncontrolled backend cost or intentionally enter the ad-monetized path as ordinary trusted sessions.

## Phase 9 — Tool SDK implementation plan

**Status:** NOT STARTED.

Use Superpowers `writing-plans` after the design spec is approved.

Plan must include exact files, interfaces, tests, commands, expected outcomes and commit boundaries.

Gate: executable implementation plan with no placeholders.

## Phase 10 — Integration branch/worktree setup

**Status:** NOT STARTED.

Tasks:

- create `feat/tools-platform` from the approved base;
- isolate work with worktrees/feature branches;
- preserve `main` production stability;
- ensure docs/specs travel with implementation branches;
- define merge/review checkpoints.

Gate: implementation can proceed without partially publishing Tools to production.

## Phase 11 — Tool SDK foundation

**Status:** NOT STARTED.

Tasks:

- implement typed tool registry;
- implement input model;
- implement execution runtime model;
- implement limits model;
- implement result/error model;
- implement locale model;
- implement SEO model;
- implement search aliases/intents;
- implement analytics events;
- implement ad metadata;
- implement related-tool metadata;
- implement dependency lazy-loading boundaries.

Gate: SDK supports representative tools without category-specific hacks.

## Phase 12 — Reference-tool proof set

**Status:** NOT STARTED.

Before mass implementation, build a deliberately varied proof set from Launch 50.

The proof set should demonstrate at minimum:

- a simple deterministic calculator/converter;
- a text/structured-data tool;
- an image/file tool;
- a WASM-backed tool if Launch 50 actually requires WASM;
- a hybrid/Worker tool only if Launch 50 actually requires server execution.

Gate: one SDK can support the real diversity of Launch 50.

This is an engineering validation subset and does not change the requirement that public Launch target is 50 tools.

## Phase 13 — Design system for Tools

**Status:** NOT STARTED.

Tasks:

- Tools-specific visual identity inside MenezesDev;
- mobile-first layout;
- accessibility;
- safe ad spacing;
- tool input/result components;
- file upload/drop surfaces;
- privacy/status messaging;
- category navigation;
- search UI;
- related-tools UI;
- error states;
- loading/progress states;
- clear differentiation from commercial MenezesDev pages without creating a separate brand.

Gate: mobile/desktop/accessibility/CWV-ready component system.

## Phase 14 — AdSense readiness implementation

**Status:** NOT STARTED.

Tasks:

- AdProvider abstraction;
- Traffic Guard eligibility binding;
- safe manual slots;
- optional controlled auto-ad surfaces;
- consent integration where required;
- `ads.txt`;
- layout reservation;
- kill switches;
- privacy policy updates;
- ad-free route enforcement.

Gate: formal AdSense readiness audit passes.

## Phase 15 — Launch 50 implementation waves

**Status:** NOT STARTED.

Internal engineering waves may be used, e.g. five groups of ten, but every tool remains subject to the same gates.

For every tool:

- engine implemented/integrated;
- dependencies approved;
- browser-first decision verified;
- input security limits implemented;
- hostile cases tested where applicable;
- result correctness tested;
- localization content complete as scoped;
- SEO metadata complete;
- related tools assigned;
- analytics events implemented;
- ad behavior validated;
- accessibility reviewed;
- performance checked;
- privacy behavior documented.

Gate: 50/50 complete tools.

## Phase 16 — English editorial QA

**Status:** NOT STARTED.

Tasks:

- international-English naturalness;
- search-intent alignment;
- technical correctness;
- non-duplicative explanations;
- examples;
- limitations;
- FAQ quality where applicable;
- no generated filler;
- no artificial word-count padding.

Gate: all English Launch 50 pages pass editorial QA.

## Phase 17 — PT-BR localization

**Status:** NOT STARTED.

Tasks:

- culturally/technically appropriate PT-BR localization;
- correct decimal/unit/currency conventions where applicable;
- route mapping;
- alternate/canonical metadata;
- no artificial PT-BR version for tools that are locale-specific to another market.

Gate: localized routes correctly linked and tested.

## Phase 18 — Product analytics implementation

**Status:** NOT STARTED.

Tasks:

- Search Console integration/verification;
- Cloudflare analytics/security visibility;
- product telemetry events;
- `missing_search` aggregation;
- privacy verification;
- revenue/AdSense reporting linkage where feasible without violating privacy.

Gate: data is sufficient to decide what to improve/build next without collecting user content.

## Phase 19 — Production preflight

**Status:** NOT STARTED.

Validate at minimum:

- build success;
- type checks;
- test suite;
- route generation;
- canonical/hreflang correctness;
- sitemap;
- robots;
- structured data where used;
- Core Web Vitals budgets;
- accessibility;
- client bundle isolation;
- no unnecessary backend calls;
- hostile-input tests;
- dependency advisories;
- third-party notices/licenses;
- Traffic Guard;
- Cost Guard;
- ad eligibility;
- ad kill switch;
- privacy/consent;
- 50/50 tools functioning.

Gate: production release candidate approved.

## Phase 20 — Launch

**Status:** NOT STARTED.

Launch is permitted only after Phase 19 gate passes.

`main` receives the approved production merge only after launch requirements are satisfied.

Launch is not defined as “routes exist”; Launch means the complete Launch 50 system meets product, security, SEO, cost and monetization gates.

## Phase 21 — Post-launch SEO/revenue flywheel

**Status:** NOT STARTED.

Use observed data:

```text
Search impressions/queries
        ↓
Search Console + product telemetry
        ↓
Opportunity analysis
        ↓
existing tool improvement OR new tool candidate
        ↓
security/license/cost review
        ↓
implementation
        ↓
measurement
```

Do not build new URLs only to increase page count.

## Phase 22 — Tool Factory automation

**Status:** FUTURE.

Only automate tool generation after the Tool SDK and Launch 50 prove stable.

Automation may assist with:

- opportunity intake;
- spec generation;
- engine integration;
- tests;
- content scaffolding;
- SEO metadata;
- PR generation.

Human/quality/security gates remain mandatory.

## Phase 23 — Revenue expansion

**Status:** FUTURE / DATA-GATED.

Potential additions:

- Pro / ad-free experience;
- batch limits/features;
- API access;
- affiliate integrations where contextually appropriate.

Do not add these merely because they are common SaaS features. Add only when usage/revenue data justifies them.

## Phase 24 — Scale beyond Launch 50

**Status:** FUTURE / DATA-GATED.

Potential milestones:

- 100 tools;
- 200 tools;
- 500+ tools.

Every new tool remains subject to the same intent, security, license, browser-first, cost and quality gates.

---

# 16. Hard gates summary

A tool or release fails if any applicable item below fails:

1. user intent is not genuinely distinct/useful;
2. dependency license is unclear/incompatible;
3. dependency/security posture is unacceptable;
4. browser-first decision is unjustified;
5. unnecessary backend request exists;
6. input is not validated/bounded/sanitized/canonicalized as applicable;
7. parser/resource limits are missing;
8. unsafe active document content is enabled without dedicated review;
9. user content leaks into telemetry;
10. output correctness is not tested;
11. accessibility requirements fail;
12. SEO/canonical/locale metadata is incorrect;
13. ad placement risks deceptive/accidental interaction;
14. suspicious traffic can directly consume uncontrolled expensive compute;
15. Launch 50 tool is only a page shell rather than a complete utility;
16. production merge occurs before release gates pass.

---

# 17. Current project state as of creation

At creation of this immutable workflow:

- product constitution: closed;
- macro architecture decisions: closed;
- browser-first/cost principle: closed;
- mandatory user-input security policy: closed;
- OSS audit: active;
- Launch 50 exact list: not frozen;
- Capability Map: not yet frozen;
- Tool SDK design: not yet written/frozen;
- implementation plan: not yet written;
- Tools code implementation: not started under this workflow;
- `main`: must remain free of partial Tools implementation;
- research branch: `feat/tools-oss-catalog`.

---

# 18. Required supporting artifacts

The workflow expects, over time, at least the following canonical supporting artifacts:

```text
docs/tools/IMMUTABLE_WORKFLOW.md
docs/tools/SECURITY_POLICY.md
docs/tools/OSS_CATALOG.md
docs/tools/RUST_OSS_AUDIT.md
docs/tools/RUST_OSS_AUDIT_BATCH3.md

docs/superpowers/specs/<tools-design-spec>.md
docs/superpowers/plans/<tools-implementation-plan>.md
```

Additional audit/spec/plan files may be appended as the project grows.

---

# 19. Append-only addenda protocol

Future additions to this workflow should be appended below this section using the following pattern:

```markdown
## Addendum YYYY-MM-DD — <title>

**Authority:** <source of decision>
**Type:** additive | strengthening | explicitly-authorized supersession
**Affects:** <phases/sections>

<new rule or clarification>
```

For `explicitly-authorized supersession`, preserve the previous text and state exactly which prior rule is superseded and why.

No agent may silently edit historical workflow text as a substitute for an addendum.

---

# Append-only addenda

_No addenda at initial creation._
