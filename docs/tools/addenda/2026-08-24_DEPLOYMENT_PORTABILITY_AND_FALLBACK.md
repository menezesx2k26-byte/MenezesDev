# MenezesDev Tools — Deployment Portability and Fallback Addendum

**Date:** 2026-08-24  
**Authority:** Gabriel Menezes — explicit instruction in current project conversation  
**Type:** additive / strengthening  
**Canonical parent:** `docs/tools/IMMUTABLE_WORKFLOW.md`  
**Affects:** Phase 6, Phase 8, Phase 19, Phase 20, Phase 21, Phase 22 and all deployment/release implementation plans  
**Branch:** `feat/tools-oss-catalog`

---

## 1. Decision

Cloudflare Pages is the **primary production host** for the public static MenezesDev Tools surface, but the public application must remain **provider-portable**.

The Git repository is the canonical source of truth. Cloudflare Pages is a deployment target, not the canonical copy of the product.

The public Tools application must be buildable into a provider-neutral static artifact that can be deployed elsewhere without rewriting tool engines or page logic.

Canonical relationship:

```text
GitHub repository — source of truth
        ↓
reproducible build
        ↓
provider-neutral static artifact (`dist/` or equivalent)
        ↓
┌──────────────────────┬──────────────────────┬──────────────────────┐
│ Cloudflare Pages     │ GitHub Pages         │ reserve providers    │
│ PRIMARY              │ static fallback      │ Netlify / Vercel     │
└──────────────────────┴──────────────────────┴──────────────────────┘
```

This addendum does not weaken the existing browser-first rule. It strengthens the cost architecture by requiring the ordinary public utility path to remain static/local wherever technically possible.

---

## 2. Hosting priority

Default deployment priority:

1. **Cloudflare Pages** — primary production delivery.
2. **GitHub Pages** — preferred zero-cost static mirror/fallback where compatible with the generated artifact and routing requirements.
3. **Netlify Free** — reserve deployment target, not a dependency of normal operation.
4. **Vercel Free/Hobby-compatible static deployment** — reserve/emergency deployment target where plan terms and project use remain compatible.

Fallback providers are resilience targets, not justification to create four provider-specific application implementations.

No feature may be duplicated into separate Cloudflare/GitHub/Netlify/Vercel code paths merely to satisfy this addendum.

---

## 3. Provider-neutral build hard gate

The Tools public build must satisfy all of the following unless Gabriel explicitly authorizes a provider-specific exception:

- one canonical source tree;
- one canonical build command or a thin deterministic wrapper around it;
- one generated static artifact usable by more than one static host;
- no ordinary tool operation coupled to Cloudflare Pages Functions when the same operation can run in the browser;
- no Cloudflare-only runtime API inside browser-capable tool engines;
- provider-specific deployment configuration remains outside core tool logic;
- environment-specific values are injected at build/deploy boundaries rather than hard-coded into engines;
- canonical URLs, `hreflang`, sitemap and robots generation must not depend on the temporary fallback hostname;
- fallback deployment must never silently become the SEO canonical origin;
- secrets must not be embedded in static output.

A tool that is browser-capable but becomes unusable outside Cloudflare because its normal operation was unnecessarily bound to a Cloudflare runtime fails architecture review.

---

## 4. Backend isolation rule

When server execution is genuinely necessary, it must remain an explicit bounded subsystem.

Canonical model:

```text
browser / static application
        │
        ├── local operation → browser JS/TS / WASM
        │
        └── server-required operation only
                    ↓
              bounded API adapter
                    ↓
          Cloudflare Worker / approved backend
```

The inability of a fallback static host to execute a genuinely server-required operation does not justify moving all tools to backend execution.

For each server-required tool, the Capability Map must record:

- why local execution is inadequate;
- backend provider dependency;
- cost class;
- rate/abuse controls;
- fallback behavior when the backend is unavailable;
- whether the tool should degrade gracefully, become temporarily unavailable, or use an approved alternate endpoint.

---

## 5. Static assets and user data

Where technically appropriate, files and text supplied to browser-first tools should remain on the user's device.

Preferred flow:

```text
user input
   ↓
browser validation + bounds
   ↓
local JS/TS or WASM processing
   ↓
local result
```

This reinforces the existing privacy and cost contracts:

- uploaded files are not sent to a server merely because a server exists;
- user content is not required to pass through Cloudflare Pages, Workers or another provider for browser-capable operations;
- no extra request is introduced merely for metering an otherwise local free tool;
- telemetry continues to exclude user file/text/document contents.

---

## 6. PWA / offline-capable architecture

The Tools architecture should be compatible with a PWA/service-worker layer where this improves repeat usage without introducing correctness or update hazards.

PWA/offline support is additive and must obey these constraints:

- never cache sensitive user-generated content by default;
- never make stale application code impossible to invalidate;
- cache versioning must be explicit;
- a broken service worker must not permanently trap users on a broken release;
- offline eligibility should be declared per tool or route;
- purely local deterministic tools are preferred candidates for offline use;
- server-required tools must clearly indicate that their server-dependent operation is unavailable offline;
- analytics/ad code must not be treated as necessary for tool correctness.

PWA support is not a Launch 50 completion requirement unless later promoted by evidence or explicit authorization.

---

## 7. Deployment workflow

Every production-capable implementation plan must preserve this conceptual workflow:

```text
feature/worktree
      ↓
tests + security + build gates
      ↓
feat/tools-platform integration
      ↓
release candidate
      ↓
reproducible static build
      ↓
Cloudflare Pages production
      ↓
post-deploy verification
```

The same release artifact or an artifact proven equivalent from the same commit must be capable of deployment to the approved fallback target.

The fallback target does **not** need to receive every production deployment automatically if doing so would create unnecessary build usage, operational complexity or cost. Readiness and reproducibility are mandatory; wasteful duplicate deployment is not.

---

## 8. Fallback activation

Fallback is intended for provider outage, account/platform incident, material pricing/limit change, deployment incompatibility, or an emergency migration.

Before activating a fallback as public traffic destination, verify:

- artifact corresponds to an approved commit;
- tool correctness smoke tests pass;
- static routes resolve correctly;
- asset paths/base paths are valid;
- canonical metadata continues to point to the intended MenezesDev canonical domain;
- no fallback hostname is accidentally indexed as canonical content;
- CSP/security headers are equivalent where the provider supports them;
- ads/consent behavior remains valid or advertising is disabled;
- server-required tools have an explicit degraded/fallback state;
- no secrets appear in generated assets;
- monitoring confirms the fallback is actually serving expected content.

If monetization or consent behavior cannot be guaranteed on the fallback, the safe default is to keep utilities available and disable ads rather than risk invalid advertising behavior.

---

## 9. DNS and canonical-domain principle

The user-facing canonical domain remains the product identity. Provider-generated hostnames are infrastructure details.

Deployment design should make changing the upstream/static host possible without changing public tool URLs.

No architecture should require rebuilding internal links or tool IDs merely because the hosting provider changes.

---

## 10. Phase amendments

### Phase 6 — Tools architecture design spec

Append to its required design decisions:

- provider-neutral static build boundary;
- deployment adapter/config boundary;
- fallback-host compatibility requirements;
- PWA/service-worker compatibility decision;
- explicit isolation of Cloudflare-specific backend code from portable browser tool engines.

### Phase 8 — Traffic Guard and Cost Guard design

Cloudflare remains the preferred edge/security environment for primary production, but security assumptions must distinguish:

- application-level invariants that remain required on every provider;
- Cloudflare-specific controls that strengthen the primary path;
- safe degraded behavior on fallback hosts.

A fallback must never expose expensive backend compute without equivalent Cost Guard controls.

### Phase 19 — Production preflight

Add mandatory checks:

- reproducible provider-neutral static build;
- no accidental provider-only dependency in browser-capable tools;
- fallback deployment compatibility smoke test or documented verified procedure;
- canonical-domain correctness under fallback configuration;
- service-worker/PWA update-safety test if enabled;
- proof that fallback activation can disable ads independently when required.

### Phase 20 — Launch

Launch remains Cloudflare Pages-first. Cloudflare is the primary deployment provider, not the sole recoverable copy of the application.

### Phase 21 — Post-launch SEO/revenue flywheel

Operational metrics should include provider/build health where useful, but hosting observability must remain low-cost and must not collect user tool contents.

### Phase 22 — Tool Factory automation

Any future automation that creates tools must generate provider-neutral browser logic by default and must not introduce Cloudflare-specific normal-operation dependencies unless the generated tool is explicitly classified as server-required.

---

## 11. New hard gates

The following additive hard gates are now binding:

1. **Source-of-truth gate:** Git is canonical; no production-only code/config may exist solely in a hosting dashboard when it is required to reproduce the application.
2. **Portability gate:** the normal static Tools surface must be rebuildable for at least one approved fallback host.
3. **Provider-coupling gate:** browser-capable tools may not depend on provider-specific backend execution without a documented necessity.
4. **Canonical-domain gate:** a fallback deployment may not create duplicate canonical SEO origins.
5. **Fallback-cost gate:** fallback design may not create uncontrolled backend/request costs.
6. **Fallback-ad-safety gate:** when advertising policy/consent integrity cannot be guaranteed during fallback, ads must be disabled rather than served unsafely.
7. **Reproducibility gate:** deployment state required for recovery must live in versioned code/config or documented secret/config inventory, not solely in human memory.

---

## 12. Implementation priority

This addendum does **not** require premature multi-cloud complexity.

Priority remains:

```text
browser-first correctness + security
        ↓
provider-neutral static artifact
        ↓
Cloudflare Pages primary
        ↓
verified cheap fallback capability
        ↓
automation only where it reduces real operational burden
```

Do not introduce load balancers, active-active multi-cloud, databases replicated across providers, or provider orchestration merely to satisfy fallback readiness for a primarily static Tools platform.

The objective is **cheap recoverability**, not infrastructure theater.
