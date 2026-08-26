# MenezesDev Tools — Phase 8 Traffic Guard and Cost Guard Design

**Date:** 2026-08-26  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 8 — Traffic Guard and Cost Guard design  
**Superpowers path:** Architectural  
**Status:** **WRITTEN SPEC — AWAITING USER REVIEW**  
**Parent workflow:** `docs/tools/IMMUTABLE_WORKFLOW.md`  
**Binding security:** `docs/tools/SECURITY_POLICY.md`  
**Binding portability:** `docs/tools/addenda/2026-08-24_DEPLOYMENT_PORTABILITY_AND_FALLBACK.md`  
**Approved architecture:** `docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-design.md`  
**Approved security design:** `docs/superpowers/specs/2026-08-26-menezesdev-tools-phase7-security-design.md`  
**Frozen launch portfolio:** `docs/tools/LAUNCH50_FROZEN.md`

**Approval record:** the concrete Phase-8 design was presented in chat before this file existed. Gabriel approved that presented design with `Segue` on 2026-08-26. That approval authorizes writing and self-reviewing this spec. It does not approve this subsequently written spec, Phase 9, dependencies, production Cloudflare configuration, or runtime implementation in advance.

---

# 1. Purpose

Define a concrete, testable traffic, advertising-eligibility and server-cost protection architecture for MenezesDev Tools.

Phase 8 converts the parent workflow's conceptual Traffic Guard / Cost Guard into an implementation contract that:

- protects legitimate search crawlers from accidental mitigation;
- keeps ordinary Launch-50 tools usable without trusting the visitor;
- prevents suspicious/automated sessions from being intentionally treated as ordinary ad-eligible humans;
- keeps all frozen Launch-50 ordinary operations local/browser-side;
- prevents future backend endpoints from being published without finite cost controls;
- uses Cloudflare strongly on the primary deployment without coupling core tool correctness to Cloudflare-only signals;
- preserves a safe degraded mode on fallback hosts;
- provides global/category/route ad kill switches;
- provides typed, privacy-safe abuse observability.

Phase 8 does **not** configure production WAF rules, create Cloudflare resources, enable AdSense, enable Taboola/native providers, create a backend endpoint, install dependencies, create `feat/tools-platform`, or implement runtime code.

---

# 2. Governing invariants

The following are non-negotiable:

1. ordinary frozen Launch-50 computation remains browser-local;
2. no local-capable tool may require a traffic classification round trip before computing;
3. passing Traffic Guard never weakens Phase-7 input security;
4. trusted traffic still submits untrusted files/text;
5. verified/known-good crawlers must not be accidentally challenged by custom anti-abuse policy intended for hostile traffic;
6. suspicious/automated traffic must not intentionally enter the ordinary monetized-human path;
7. Ads are optional capability, never tool correctness;
8. Cost Guard is fail-closed for future server compute;
9. no future expensive server endpoint may be publicly unmetered;
10. Cloudflare-specific signals are enhancements, not requirements for portable browser-tool correctness;
11. fallback hosting may keep C0/local tools working even when Cloudflare signals disappear;
12. if ad/consent integrity cannot be proven on fallback, Ads are disabled;
13. if equivalent Cost Guard cannot be proven on fallback, C2/C3 compute is unavailable;
14. security/abuse telemetry never includes user tool contents.

---

# 3. Considered approaches

## Option A — Enterprise bot score as canonical trust source

Depend on Cloudflare Bot Management's granular 1–99 bot score for every classification decision.

**Rejected as the canonical baseline.** It creates an Enterprise dependency for a primarily static/browser-local product and weakens provider portability.

It may be used later as an optional signal when available.

## Option B — application-only JavaScript bot heuristics

Classify visitors primarily with client fingerprinting, local behavioral heuristics and browser-side logic.

**Rejected.** It is easy to evade, increases privacy surface, risks SEO mistakes, and creates complexity without protecting server compute better than edge controls.

## Option C — layered provider-neutral policy + Cloudflare-primary enforcement

Use finite route/cost metadata and application-level invariants everywhere, then use Cloudflare WAF/rate/challenge/known-bot signals as the primary deployment's enforcement layer.

**Selected.** It keeps product correctness portable while allowing strong edge protection when running on Cloudflare.

---

# 4. High-level architecture

```text
incoming request
      ↓
provider edge
      ↓
known-good crawler exception
      ↓
Traffic Guard
  ├── verified-crawler → content; Ads path suppressed
  ├── eligible         → content; Ads may become eligible
  ├── restricted       → content/local tools; Ads off
  ├── unknown          → content/local tools; Ads off by default
  └── hostile          → challenge / rate-limit / block
                              ↓
                         Cost Guard
                              ↓
      C0 local/static ────────┤→ browser/static path
      C1 tiny bounded server ─┤→ finite budget
      C2 server compute ──────┤→ quota + stronger proof
      C3 expensive ───────────┘→ proof + quota + hard kill
```

For Launch 50 ordinary operations:

```text
tool operation → C0 → browser → zero MenezesDev processing request
```

---

# 5. Route/capability classes

Traffic policy is applied by capability class, not by creating one bespoke edge rule for every tool.

Canonical classes:

```text
PUBLIC_STATIC
TOOLS_PAGE
GUIDE_PAGE
ADS_BOOTSTRAP
C1_API
C2_API
C3_API
```

`TOOLS_PAGE` and `GUIDE_PAGE` describe public content delivery.

`ADS_BOOTSTRAP` is the fixed first-party path used to decide whether an advertising provider may load.

`C1_API` through `C3_API` are future server capabilities and do not imply that such endpoints exist at Launch.

---

# 6. Cost-class taxonomy

```ts
type CostClass = "C0" | "C1" | "C2" | "C3"
```

## C0 — static/local

Examples:

- HTML/CSS/static assets;
- local TypeScript;
- browser Web Workers;
- local WASM;
- local file/image/PDF processing that passes Phase-7 gates.

Properties:

- no MenezesDev server processing per operation;
- no server quota required for the tool operation;
- traffic classification cannot be a correctness prerequisite;
- all frozen Launch-50 ordinary operations are C0.

## C1 — tiny bounded coordination

Future examples may include a small first-party telemetry/configuration request or similarly negligible coordination path.

Requirements before publication:

- explicit request/payload cap;
- explicit response cap;
- finite timeout;
- finite rate policy;
- no user tool content unless separately approved;
- bounded marginal cost documented;
- safe fallback state.

## C2 — server compute

A future server-required operation that performs material application work.

Requirements before publication:

- proof local execution is inadequate;
- explicit finite payload/output limits;
- finite execution timeout;
- finite per-client/session/route quota policy;
- Traffic Guard integration;
- Cost Guard decision server-side;
- rate limiting;
- kill switch;
- cost estimate/classification;
- fallback behavior;
- abuse tests.

## C3 — expensive server compute

Examples may include future high-cost AI or other expensive compute.

Requirements before publication:

- all C2 requirements;
- stronger proof/challenge gate where user-facing;
- server-side challenge-token verification;
- strict quota/spend ceiling;
- provider/runtime kill switch;
- economic telemetry;
- explicit unavailable/degraded behavior;
- no anonymous unlimited execution.

No C1/C2/C3 public endpoint is created by this phase.

---

# 7. Launch-50 cost declaration

Every frozen Launch-50 ordinary tool operation resolves to:

```text
costClass = C0
serverRequired = false
```

Therefore repeated tool usage may consume the visitor's browser resources but must not create per-operation MenezesDev backend compute cost.

A future implementation test must prove that successful ordinary tool operations do not call a MenezesDev processing API.

---

# 8. Traffic classes

```ts
type TrafficClass =
  | "verified-crawler"
  | "eligible"
  | "restricted"
  | "unknown"
  | "hostile"
```

Semantics:

- `verified-crawler` — known-good crawler/bot recognized by approved provider signal;
- `eligible` — ordinary request with no current policy reason to suppress monetization or require mitigation;
- `restricted` — request may receive public content and local tool capability, but Ads are suppressed and server-cost ceiling is constrained;
- `unknown` — insufficient confidence; fail-safe equivalent to restricted for monetization/server compute;
- `hostile` — active abuse/mitigation condition; challenge/rate-limit/block may apply.

Traffic classification is not an identity system and does not create a persistent user account.

---

# 9. TrafficDecision contract

Conceptual contract:

```ts
interface TrafficDecision {
  trafficClass: TrafficClass
  adsEligible: boolean
  maxCostClass: CostClass | "DENY"
  challenge: "none" | "managed" | "turnstile"
  reasonCodes: readonly TrafficReasonCode[]
}
```

This object is an internal policy result.

A browser-supplied `TrafficDecision` is never trusted by a server endpoint.

Any future C1/C2/C3 server handler evaluates or verifies its own decision from trusted server/edge inputs.

Default ceiling semantics:

- `verified-crawler` → public content/C0 only unless a separately approved automated-client API contract exists;
- `eligible` → route-declared maximum, but C2/C3 still require their explicit proof/quota policy;
- `restricted` → C0 by default;
- `unknown` → C0 by default;
- `hostile` → `DENY` for protected server compute.

---

# 10. Decision-source separation

Traffic Guard consumes safe request/session facts.

Possible primary-deployment inputs include:

- known-good crawler signal;
- route/capability class;
- request method/path;
- provider WAF/security action state where available;
- rate-limit state;
- challenge state/result where applicable;
- optional higher-plan bot signals when available;
- application ad-policy manifest;
- consent/privacy state for Ads.

Traffic Guard must not consume:

- user file contents;
- pasted text;
- tool result values;
- financial values;
- generated secrets;
- document metadata;
- arbitrary fingerprinting data merely to improve ad eligibility.

---

# 11. Cloudflare baseline versus optional enhancements

## Baseline

The canonical primary-deployment baseline may use Cloudflare features available without requiring Enterprise Bot Management:

- `cf.client.bot` / known-good crawler classification;
- WAF custom rules;
- rate limiting within the active plan's limits;
- Managed Challenge where supported by the chosen rule/action;
- Pages/static response security headers.

## Optional enhancements

Higher plans may add stronger signals/features such as:

- Super Bot Fight Mode;
- richer bot analytics;
- Enterprise Bot Management scores/tags;
- more rate-limit rules/fields/counting characteristics.

Optional enhancement failure/unavailability must not break tool correctness.

---

# 12. Known-good crawler first rule

Custom challenge/block/rate policies that could harm SEO must explicitly account for known-good crawlers first.

Primary Cloudflare design uses the known-good crawler signal (`cf.client.bot`) as the portable-to-plan baseline inside the Cloudflare implementation.

Conceptual ordering:

```text
known-good crawler?
  yes → preserve content access / bypass relevant custom mitigation
  no  → continue normal Traffic Guard evaluation
```

Known-good crawler status does **not** mean Ads should be loaded.

Crawler content access and advertising eligibility are separate decisions.

---

# 13. Bot Fight Mode policy

Cloudflare Bot Fight Mode is **not** a canonical requirement.

Reason:

- it applies broadly at domain level;
- it is not granular enough to be the only policy layer;
- it cannot be reliably skipped through ordinary WAF custom rules;
- enabling it may affect API/automated clients outside the Tools design.

It may be enabled operationally only after compatibility review.

Super Bot Fight Mode or Enterprise Bot Management may provide stronger/granular controls on eligible plans, but remain optional enhancements.

---

# 14. Suspicious traffic and local tools

A restricted/unknown session may continue using C0 local tools if the page request itself is allowed.

Reason:

```text
restricted user
   ↓
calculator/image/text tool
   ↓
local browser CPU
   ↓
no MenezesDev processing bill
```

Traffic Guard should not manufacture a backend dependency merely to stop a visitor from consuming their own CPU.

The edge may still challenge/rate-limit/block abusive request patterns that threaten availability, bandwidth, security or ad integrity.

---

# 15. Advertising is a separate capability

The tool page may be useful and fully functional without any provider advertising script.

Conceptual loading path:

```text
page content + tool
      ↓
route monetization class
      ↓
AdPolicyManifest
      ↓
consent/privacy eligibility
      ↓
first-party ad bootstrap request
      ↓
edge Traffic Guard may allow/suppress bootstrap
      ↓
AdProvider
```

There is **no required per-page TrafficDecision API call** for C0 pages.

Static/client code can determine only the route/policy/consent candidate state. The primary edge remains the authoritative enforcement point for traffic-based suppression of the fixed ad-bootstrap path.

If the bootstrap is suppressed, blocked, unavailable or disabled, no provider loads and the tool remains functional.

---

# 16. Fixed ad-bootstrap boundary

Phase 8 reserves a fixed first-party bootstrap capability/path such as:

```text
/ads/bootstrap.js
```

The exact source filename/path belongs to Phase 9 planning, but the architectural property is binding:

- one narrow first-party loading boundary;
- easy to disable globally;
- separate from tool engine/runtime chunks;
- known crawlers do not need it;
- provider failure does not break tools;
- third-party providers do not receive direct control over tool correctness;
- edge traffic policy can suppress this path without dynamically rendering each tool page.

---

# 17. AdPolicyManifest

Durable ad-policy state is build/version controlled.

Conceptual data:

```ts
interface AdPolicyManifest {
  globalEnabled: boolean
  categories: Record<ToolCategory, boolean>
  routes: Partial<Record<ToolId, boolean>>
  providers: Record<AdProviderId, boolean>
}
```

Properties:

- static/CDN-delivered;
- no per-operation backend compute;
- versioned in Git/build artifacts;
- route/category values may only further restrict the product's approved monetization class;
- it cannot convert an inherently ad-free commercial/demo route into monetized content;
- future providers use the same eligibility contract.

---

# 18. Ad eligibility resolution

A page/session may load Ads only when all applicable gates pass:

```text
surface is monetizable
AND route monetization class allows Ads
AND global policy enabled
AND category/route policy enabled
AND provider enabled
AND consent/privacy requirements satisfied
AND edge traffic policy allows the ad-bootstrap capability
```

Known-good crawlers, restricted/unknown traffic, and hostile traffic do not intentionally receive the ordinary ad-provider path.

Phase 14 owns actual AdSense scripts, placement and consent implementation.

---

# 19. Advertising kill switches

Required controls before monetized production scale:

1. global durable switch;
2. category switch;
3. route/tool switch;
4. provider switch;
5. emergency edge kill of the fixed ad-bootstrap capability/path.

Global emergency kill must leave page content and tool functionality intact.

A provider incident must not require taking Tools offline.

---

# 20. Future native-ad providers

A future provider such as Taboola/native discovery may be evaluated only in the appropriate later monetization phase or through a separate explicit authorization.

It is **not** silently added to the Phase-14 AdSense launch scope merely because the provider abstraction exists.

If later approved, it must use the same:

- route monetization rules;
- traffic eligibility;
- consent/privacy controls;
- kill switches;
- provider abstraction;
- performance/security review.

No provider receives a parallel path that bypasses the first-party eligibility boundary.

This design does not assert provider approval, contract, eligibility or revenue.

---

# 21. Managed Challenge policy

For suspicious public traffic on the primary Cloudflare path, Managed Challenge is preferred over adding a bespoke client CAPTCHA to ordinary C0 tools.

Challenge is used when request-level abuse warrants it; it is not a prerequisite for local tool correctness.

Challenge policy must preserve known-good crawlers.

---

# 22. Turnstile policy

Turnstile is reserved for actions where a server must verify proof before consuming protected resources.

It is **not** added to ordinary C0 calculators/converters merely to classify visitors.

Reason:

- secure Turnstile use requires server-side Siteverify token validation;
- adding Turnstile to a purely local tool would create a server dependency without protecting backend compute.

Future C2/C3 user-facing operations may require Turnstile or an equivalent approved proof mechanism.

For such use:

- secret remains server-side;
- token is verified with Siteverify;
- replay/expiry semantics are respected;
- a client-only "passed" flag is not trusted;
- server handler still enforces quota/cost limits after proof succeeds.

A valid challenge does not mean unlimited compute.

---

# 23. Rate-limiting architecture

Do not allocate one Cloudflare rate-limit rule per Launch-50 tool.

Policy groups by capability/cost class:

```text
public static/content
ads bootstrap
future C1 APIs
future C2 APIs
future C3 APIs
```

Reason:

- plan limits differ;
- Free currently provides a very small rule budget;
- tool operations are local and do not need individual server protection;
- group-level rules preserve portability and reduce configuration drift.

Known-good crawlers are excluded from custom rate policies when the policy could otherwise harm legitimate crawling.

---

# 24. Rate thresholds

Phase 8 does not invent fixed request-per-minute numbers for server endpoints that do not exist.

Instead, every future C1/C2/C3 endpoint must define before publication:

- matching capability/route;
- counting characteristic available on the active plan/provider;
- finite request threshold;
- finite counting period;
- finite mitigation/challenge behavior;
- known-good crawler exception if relevant;
- test load above and below threshold;
- economic justification.

`unlimited` is not a valid C1/C2/C3 policy.

Thresholds are selected from observed legitimate workload and provider capabilities during implementation/preflight.

---

# 25. Cost Guard server contract

Conceptual server-side policy:

```ts
interface CostPolicy {
  costClass: Exclude<CostClass, "C0">
  maxRequestBytes: number
  maxResponseBytes: number
  timeoutMs: number
  quotaPolicyId: QuotaPolicyId
  challengePolicy: "none" | "managed" | "turnstile"
  killSwitchId: string
  fallback: "unavailable" | "degraded" | "approved-alternate"
}
```

A future server route with missing cost metadata fails build/release validation.

---

# 26. Server-side enforcement rule

For C1/C2/C3:

```text
request
  ↓
server/edge derives trusted route/cost policy
  ↓
Traffic Guard decision
  ↓
challenge proof verification if required
  ↓
quota/rate/cost decision
  ↓
request-size check
  ↓
bounded server work
  ↓
response-size check
```

Client metadata may request an operation but may not grant itself a cheaper cost class, higher quota or trusted traffic state.

---

# 27. C2/C3 hard stops

A C2/C3 endpoint is forbidden from production when any applicable item is missing:

- documented reason browser execution is inadequate;
- finite input/output caps;
- finite timeout;
- finite rate/quota policy;
- trusted server-side cost classification;
- challenge policy when required;
- kill switch;
- abuse observability;
- marginal cost visibility;
- fallback/unavailable state;
- tests proving rejection above limits.

---

# 28. C3 economic controls

C3 requires explicit economic controls in addition to security controls.

Minimum:

- per-operation work cap;
- per-client/session/anonymous quota strategy appropriate to the capability;
- daily/monthly provider or product spend ceiling when paid compute is involved;
- provider kill switch;
- safe degradation when budget is exhausted;
- no automatic retry storm;
- cost visibility at the finest practical non-private level.

These rules align future user compute with the autonomous-growth AI cost guard without making the two subsystems identical.

---

# 29. Fallback host behavior

Fallback lacks assumed Cloudflare-specific trust signals.

Canonical degraded state:

```text
traffic confidence = unknown/restricted
Ads = off unless consent/ad integrity is explicitly proven
C0 local tools = available
C1 = only if equivalent bounded implementation exists
C2/C3 = unavailable unless equivalent Cost Guard is verified
```

Fallback must not expose an expensive primary-backend endpoint through an unprotected alternate path.

Provider portability is not permission to lower security/cost controls.

---

# 30. Application-level invariants on every provider

Regardless of host:

- route/cost metadata remains version controlled;
- C0 tools remain local;
- Ads remain optional;
- ad policy can default off;
- server routes, if any, require finite cost metadata;
- user content does not enter traffic telemetry;
- tool input security remains Phase-7 governed;
- canonical domain does not become the fallback hostname.

---

# 31. Cloudflare static security/config boundary

Cloudflare Pages static responses may receive versioned headers through the provider's static-header mechanism.

If a path is later served by Pages Functions/Workers, headers required for that response must be attached by that runtime rather than assuming static `_headers` coverage.

This reinforces Phase 7's requirement to verify effective production headers rather than only checking source files.

---

# 32. Ads bootstrap and CSP

Phase 7's baseline CSP remains authoritative before provider scripts are introduced.

Phase 14 may extend CSP narrowly for approved advertising providers.

Requirements:

- no broad `unsafe-inline`/`unsafe-eval` merely for ad integration;
- third-party script origins explicit;
- tool engines/boundaries/workers retain no ambient provider/network authority;
- provider script failure does not break tools;
- content-sensitive routes may remain ad-free when privacy/security cannot be preserved.

---

# 33. Abuse observability

The application may record aggregate/safe operational events such as:

```text
traffic_action
reason_class
route_class
cost_class
ad_suppressed_reason
challenge_outcome
rate_limit_bucket
count/time bucket
```

Allowed values are enums/coarse buckets.

No generic raw request dump enters product telemetry.

---

# 34. Privacy boundary for abuse telemetry

Product telemetry must not copy:

- tool input;
- files;
- pasted text;
- private outputs;
- generated secrets;
- regex source/subject;
- financial values;
- document metadata;
- raw parser payloads;
- raw security-event bodies.

Cloudflare may process network metadata at the edge as part of its security service, but that does not justify duplicating raw IP/device data into a permanent first-party product profile.

Retention/transport details belong to Phase 18 and provider configuration.

---

# 35. Traffic reason codes

Use a finite typed vocabulary rather than free-form strings.

Representative classes:

```text
KNOWN_GOOD_CRAWLER
NORMAL
POLICY_ADS_DISABLED
CONSENT_NOT_ELIGIBLE
RATE_RESTRICTED
CHALLENGE_REQUIRED
CHALLENGE_FAILED
SECURITY_MITIGATION
COST_CLASS_EXCEEDED
COST_QUOTA_EXCEEDED
FALLBACK_RESTRICTED
PROVIDER_SIGNAL_UNAVAILABLE
```

Exact enum names may be refined in Phase 9 while preserving finite/typed semantics.

---

# 36. No persistent identity requirement

Traffic Guard is not authorization/authentication.

Launch 50 still requires no account.

Do not add persistent fingerprint identity merely to make anonymous ad/cost classification more precise.

If a later product introduces authenticated quotas, that is a separate account/privacy architecture decision.

---

# 37. Search crawler safety tests

Production-like tests must verify:

- known-good crawler policy does not receive custom Managed Challenge/Block on indexable public content;
- sitemap/robots/public tool pages remain reachable under expected crawler classification;
- known-good crawler does not enter ordinary ad-bootstrap flow;
- route/canonical behavior is unchanged by traffic classification;
- fallback/no-Cloudflare mode remains crawlable according to the approved SEO contract.

---

# 38. Ad eligibility tests

Test matrix includes:

- global Ads off;
- category Ads off;
- route Ads off;
- provider off;
- known-good crawler;
- restricted traffic;
- unknown/fallback traffic;
- eligible traffic;
- consent/privacy failure;
- provider/bootstrap failure;
- edge suppression of the fixed bootstrap path.

Every negative case must leave tool correctness intact.

---

# 39. Cost Guard tests

For future server endpoints, tests must prove:

- missing cost policy fails validation;
- client cannot self-upgrade cost/trust class;
- request above cap rejected before expensive work;
- quota exceeded rejects work;
- timeout interrupts/bounds work;
- challenge proof is verified server-side when required;
- invalid/expired/replayed proof is rejected as defined by provider semantics;
- kill switch denies work;
- fallback cannot bypass the primary Cost Guard;
- C0 tool path does not call server compute.

---

# 40. Rate-limit tests

Where a provider rule exists, test or preflight evidence must cover:

- below-threshold legitimate requests;
- above-threshold mitigation;
- known-good crawler exception where relevant;
- mitigation/challenge action;
- provider-plan compatibility;
- no accidental blanket rule that blocks static indexable Tools content.

Exact provider rule IDs/config paths belong to implementation/deployment.

---

# 41. Kill-switch tests

Before Ads or server compute become production dependencies, prove:

- global ad kill disables provider loading without breaking Tools;
- route/category kill restricts only intended surfaces;
- provider kill disables one provider independently;
- emergency edge ad-bootstrap block works;
- C2/C3 kill denies server compute cleanly;
- fallback activation can disable Ads independently.

---

# 42. Static validation

Build/release validation must reject:

- monetized route with no known monetization class;
- ad bootstrap outside the approved first-party boundary;
- provider path bypassing the first-party eligibility boundary;
- C1/C2/C3 endpoint with no finite CostPolicy;
- C2/C3 endpoint marked unlimited;
- server route trusting client-supplied traffic/cost class;
- fallback config exposing C2/C3 without equivalent controls;
- tool engine importing traffic/provider-specific logic;
- commercial/demo route accidentally made ad-eligible;
- C0 page requiring a per-page traffic-classification API call for tool correctness or ad eligibility candidate calculation.

---

# 43. Provider-neutral validation

The implementation plan must separate:

```text
application policy
+
provider adapter/config
```

Application policy remains testable without Cloudflare.

Cloudflare-specific expressions/rules are validated against current plan capability before production deployment.

At least one fallback behavior is tested with Cloudflare-only signals absent.

---

# 44. Cloudflare version/plan revalidation rule

Cloudflare product availability, plan limits, fields and behavior are version-sensitive.

Before Phase-9 implementation details or production configuration rely on them, revalidate current official Cloudflare documentation.

Do not freeze paid-plan assumptions as permanent product invariants.

---

# 45. Current Cloudflare facts used by this design

Official Cloudflare documentation was rechecked on 2026-08-26.

Facts used:

- known-good crawler field `cf.client.bot` identifies known good bots/crawlers and is available to all customers according to current WAF documentation;
- granular bot score `cf.bot_management.score` is an Enterprise Bot Management feature;
- WAF custom rules are available across plans, with limits varying by plan;
- rate limiting rules are available across plans, with rule count/fields/windows varying materially by plan; current Free availability is one rule;
- Bot Fight Mode is broad/domain-level and cannot be skipped by WAF custom rules;
- Super Bot Fight Mode provides more configurable behavior on eligible paid plans;
- Managed Challenge can be used in WAF/rate policy;
- Turnstile requires server-side Siteverify validation for a secure implementation;
- Pages `_headers` applies to static asset responses and does not automatically apply to Pages Functions responses.

These facts are implementation inputs, not immutable product guarantees. Revalidate before configuration.

Reference URLs:

- `https://developers.cloudflare.com/waf/troubleshooting/faq/`
- `https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.client.bot/`
- `https://developers.cloudflare.com/bots/concepts/bot-score/`
- `https://developers.cloudflare.com/waf/rate-limiting-rules/`
- `https://developers.cloudflare.com/bots/get-started/bot-fight-mode/`
- `https://developers.cloudflare.com/turnstile/get-started/`
- `https://developers.cloudflare.com/pages/configuration/headers/`

---

# 46. Phase-6 compatibility

This design refines the Phase-6 seam without contradicting it.

Phase 6 reserved:

```text
adsEligible
challengeRequired
costClass
```

Phase 8 expands those semantics into finite typed classes and policy resolution.

Frozen local tools still do not require TrafficDecision to compute.

---

# 47. Phase-7 compatibility

Traffic trust never bypasses Phase-7 security.

Even an `eligible` request still receives:

- input limits;
- format sniffing;
- Worker watchdogs;
- active-content controls;
- safe output rendering;
- telemetry privacy.

Traffic Guard protects request/ad/cost surfaces; it does not turn hostile files into trusted files.

---

# 48. Phase-14 handoff

Phase 14 may implement AdSense provider behavior only after consuming this contract.

It must preserve:

- fixed first-party bootstrap boundary;
- traffic-based suppression at the edge where available;
- kill switches;
- route monetization classes;
- provider-independent tool correctness;
- consent/privacy gating;
- crawler suppression;
- CSP/security review.

Other native-ad providers remain later monetization work unless separately authorized.

---

# 49. Phase-18 handoff

Phase 18 may implement product telemetry/analytics transport while preserving:

- typed traffic/reason enums;
- content-free abuse observations;
- no raw tool inputs/outputs;
- no unnecessary persistent identity;
- separation from provider security logs.

---

# 50. Future autonomous-growth handoff

Phase-21/22 AI/crawler systems use the same economic principle but do not reuse public TrafficDecision as an authorization token.

Autonomous backend jobs require their own explicit provider budgets, domain/request limits and kill switches under the binding autonomous-growth addendum.

A future Tool Factory may create only C0 browser-local tools autonomously inside its low-risk whitelist unless a new backend/cost hard-stop receives explicit review.

---

# 51. Implementation module implications

Phase 9 planning should create focused responsibilities equivalent to:

```text
src/tools/traffic/types.ts
src/tools/traffic/resolve-decision.ts
src/tools/ads/policy.ts
src/tools/ads/bootstrap.client.ts
src/tools/cost/types.ts
src/tools/cost/resolve-policy.ts
scripts/validate-tools-traffic-cost.mjs
tests/tools/traffic/**
tests/tools/cost/**
public/_headers
```

Provider-specific Cloudflare rule/config files may be included in the plan if reproducible and compatible with the chosen deployment mechanism.

Exact filenames are illustrative until Phase 9.

---

# 52. Build-time invariants

Validation fails when:

- a public tool lacks a surface/monetization class;
- an ad-eligible route bypasses global/category/route/provider policy;
- commercial/demo surfaces can become ad-eligible through Tools metadata;
- C1/C2/C3 route has no finite CostPolicy;
- a server route accepts client-declared trust/cost class as authority;
- a C2/C3 capability has no kill switch/fallback state;
- a future provider bypasses the first-party eligibility boundary;
- fallback exposes server compute without equivalent protection;
- Launch-50 tool operation becomes server-required without a new approved architecture/cost decision.

---

# 53. Release hard stops

A release fails Phase-8-derived gates when any applicable condition is true:

1. known-good crawlers can be accidentally challenged by custom public-content mitigation policy;
2. suspicious/automated traffic is intentionally treated as ordinary ad-eligible human traffic;
3. Ads are required for tool correctness;
4. global ad kill switch is missing;
5. granular route/category/provider ad control is missing where applicable;
6. future C1/C2/C3 route has no finite quota/rate policy;
7. C2/C3 compute can be consumed anonymously without its declared proof/quota controls;
8. client-supplied traffic/cost metadata grants server authority;
9. fallback exposes expensive compute without equivalent Cost Guard;
10. fallback serves Ads when policy/consent integrity is not verified;
11. abuse telemetry captures user tool content;
12. a Cloudflare Enterprise-only feature becomes a requirement for ordinary Tools correctness;
13. Launch-50 C0 operations make MenezesDev processing requests;
14. static C0 pages add a classification backend request solely to decide whether ordinary local tool use may proceed.

---

# 54. Acceptance criteria for Phase 8 gate

The parent workflow gate is:

> bots cannot cheaply create uncontrolled backend cost or intentionally enter the ad-monetized path as ordinary trusted sessions.

The design side is satisfied when the written package is approved and explicitly defines:

- traffic classes;
- known-good crawler handling;
- Cloudflare baseline versus optional stronger signals;
- C0–C3 cost taxonomy;
- Launch-50 C0 declaration;
- suspicious/local-tool behavior;
- Ads as separate optional capability;
- first-party ad-bootstrap boundary;
- no per-page traffic-classification API requirement for C0;
- global/category/route/provider kill switches;
- deterministic route/policy/consent eligibility plus edge bootstrap enforcement;
- future provider non-bypass rule;
- Managed Challenge versus Turnstile policy;
- server-side Turnstile validation requirement;
- rate-limit grouping and finite-threshold rule;
- server CostPolicy contract;
- C2/C3 fail-closed controls;
- fallback restricted behavior;
- abuse observability/privacy;
- static/provider/browser/economic test invariants.

---

# 55. Non-goals

Phase 8 does not:

- create WAF/rate-limit rules in production;
- enable Bot Fight Mode/Super Bot Fight Mode/Bot Management;
- create Turnstile widgets/secrets;
- enable AdSense/Taboola/native providers;
- create consent/CMP configuration;
- create backend C1/C2/C3 endpoints;
- define arbitrary rate numbers for nonexistent endpoints;
- implement Tool SDK/runtime;
- create `feat/tools-platform`;
- install dependencies;
- invoke Phase-9 implementation planning before written-spec approval;
- change Launch 50;
- change the Phase-7 security contract;
- merge partial Tools work to `main`.

---

# 56. Phase-8 gate state

The concrete Phase-8 architecture was approved in chat before this file was written.

This file now requires the Superpowers **written-spec user review** before Phase 8 may close.

Until the written review is approved:

- Phase 8 remains open;
- `PHASE8_CLOSURE.md` is not created;
- Phase 9 `writing-plans` is not invoked;
- no implementation plan is treated as approved;
- no integration branch is created;
- no runtime/dependency/provider configuration begins.
