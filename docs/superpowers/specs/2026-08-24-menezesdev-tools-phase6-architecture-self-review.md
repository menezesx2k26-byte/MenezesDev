# MenezesDev Tools — Phase 6 Architecture Self-Review

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Reviewed spec:** `docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-design.md`  
**Superpowers step:** architectural spec self-review  
**Result:** **PASS FOR USER REVIEW — PHASE 6 NOT CLOSED**

---

# 1. Placeholder scan

Fresh scans of the committed spec found:

- `TODO`: 0 matches;
- `TBD`: 0 matches;
- obsolete executable `ToolBoundaryDefinition` catalog binding: 0 matches;
- obsolete duplicate-authoring `ToolSeoDefinition` model: 0 matches.

No incomplete placeholder is being carried into user review.

---

# 2. Internal consistency review

Checked the design against:

- `docs/tools/IMMUTABLE_WORKFLOW.md` in full;
- binding autonomous-growth workflow addendum;
- `docs/tools/SECURITY_POLICY.md`;
- deployment portability/fallback addendum;
- `docs/tools/TOOLS_SCOPE.md`;
- frozen Launch 50;
- Capability Map;
- approved Phase-5 SEO/IA design;
- the current implemented Astro base on `feat/phase-10-implementation`.

No conflict was found with the higher-precedence browser-first, security, SEO, privacy, cost, branch or portability rules.

The design preserves:

- 0 ordinary MenezesDev backend-processing requests for frozen Launch-50 operations;
- explicit `validate -> bound -> sanitize/canonicalize -> process -> safe output` boundary semantics;
- strict separation of commercial/demo and monetized Tools surfaces;
- exact Phase-5 route/canonical/hreflang authority;
- dependency admission states;
- provider-neutral browser engines;
- post-launch autonomous-growth hard-stop boundaries.

---

# 3. Ambiguities found and corrected before review

## 3.1 Catalog boundary ownership

Initial draft risk:

A `ToolDefinition` field could be read as storing an executable boundary function/object, contradicting the data-only registry objective.

Correction applied:

- catalog now stores `ToolBoundaryBinding` with allowlisted `boundaryId` + security profile id;
- executable boundary implementations live in code/loader registries;
- user input cannot select arbitrary module paths.

## 3.2 Localized SEO copy ownership

Initial draft risk:

Localized `title`/`description` could appear to be authored both in locale content and a global SEO definition.

Correction applied:

- localized title/H1/description are authored only in `ToolLocaleContent`;
- catalog contains structural `ToolSeoPolicy` only;
- build-time resolver derives `ResolvedToolSeo` from route + locale content + structural policy + relations;
- there is no second authoring source for localized SEO copy.

---

# 4. Scope review

The Phase-6 spec is focused on one subsystem boundary: the Tools application/SDK/runtime architecture inside the existing Astro site.

It deliberately does not implement or fully design later-phase responsibilities:

- Phase 7 owns concrete threat-model/resource enforcement and CSP matrix;
- Phase 8 owns Traffic Guard/Cost Guard classification and policy;
- Phase 9 owns exact implementation files/tasks/commands/commit boundaries;
- Phase 14 owns actual AdSense placement/provider behavior;
- Phase 18 owns telemetry transport/storage;
- Phase 21+ owns autonomous-growth runtime systems.

The design is therefore scoped appropriately for a single architecture spec without swallowing later workflow phases.

---

# 5. Existing-app reconciliation review

The existing app was rechecked on `feat/phase-10-implementation`.

Current facts incorporated into the spec:

- Astro 7.2.4 static output;
- current `build.format: "file"`;
- current `trailingSlash: "never"`;
- current `BaseLayout` hardcodes `pt-BR` document language and derives canonical from `Astro.url.pathname`;
- current site config is commercial/PT-BR oriented;
- current route validation is a static 16-route list;
- current sitemap excludes Tools because Tools do not yet exist in that branch.

The Phase-6 design addresses those as focused integration seams rather than proposing unrelated commercial-site refactoring.

---

# 6. Astro documentation revalidation

Official Astro documentation was rechecked on 2026-08-24 for version-sensitive design assumptions.

Confirmed current behavior:

- static dynamic routes require `getStaticPaths()`;
- `build.format` supports `file`, `directory`, `preserve`;
- `preserve` retains source-file output form;
- `trailingSlash` supports `always`, `never`, `ignore`;
- for prerendered pages, production trailing-slash routing is hosting-platform behavior;
- build format changes build-time `Astro.url` path representation.

Therefore the spec correctly treats explicit canonical-path data as authoritative and leaves prerendered slash normalization to deploy/preflight policy.

These facts must be revalidated if Astro is materially upgraded before implementation.

---

# 7. Security review

The spec does not weaken the Security Policy.

It specifically ensures:

- every applicable tool has an explicit boundary binding;
- every input class can carry resource/security metadata;
- engines have no generic network client;
- Workers support cancellation/termination;
- heavy dependencies are isolated;
- output sinks remain safe by class;
- analytics types exclude private user content;
- errors exclude stacks/secrets/raw input;
- conditional dependencies remain conditional;
- CSP requirements are deferred to Phase 7 rather than weakened here.

---

# 8. Economic/portability review

The spec preserves browser-first economics and provider portability:

- frozen Launch 50 `serverRequired=false` for ordinary operations;
- Cloudflare APIs stay outside core engine logic;
- Ads/analytics are optional side effects;
- PWA/service worker is not introduced prematurely;
- one static artifact remains the target;
- at least one approved fallback host must be proven before release;
- canonical origin remains MenezesDev regardless of provider hostname.

---

# 9. Testing completeness review

The design defines test layers for:

- catalog invariants;
- engine correctness/property tests;
- boundary limits;
- Worker timeout/cancellation;
- hostile fixtures;
- generated route/SEO behavior;
- browser interaction;
- accessibility;
- bundle isolation;
- no-backend-operation economics;
- provider-neutral static smoke tests.

Phase 7 may add stronger security tests without changing the architecture.

---

# 10. Remaining gate

Superpowers written-spec user-review gate remains open.

Until Gabriel reviews/approves the written Phase-6 package:

- Phase 6 stays **ACTIVE**;
- no Phase-6 closure record is created;
- Phase 7 does not begin;
- `writing-plans` is not invoked;
- no runtime code/dependency installation begins.

**Self-review result: PASS FOR USER REVIEW.**
