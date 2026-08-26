# MenezesDev Tools — Session Handoff

**Date:** 2026-08-26  
**Branch:** `feat/tools-oss-catalog`

---

# Canonical workflow state

- Phase 0: CLOSED.
- Phase 1: CLOSED.
- Phase 2: CLOSED.
- Phase 3: CLOSED.
- Phase 4: CLOSED / Launch 50 frozen.
- Phase 5: CLOSED / SEO-IA written contract approved.
- Phase 6: CLOSED / Tools architecture written contract approved.
- Phase 7: CLOSED / security-threat-model written contract approved.
- Phase 8: **ACTIVE — Traffic Guard / Cost Guard architectural design cycle**.
- Phase 9+: NOT STARTED.
- Tools runtime: NOT STARTED.

Git remains the source of truth. Before every future Tools action, reread the exact-ref workflow, binding addenda, security policy, Tools state/decisions/handoff and relevant approved specs.

---

# Phase 7 closure

Gabriel approved the committed Phase-7 written package with:

> `Segue`

Created:

`docs/tools/PHASE7_CLOSURE.md`

Canonical Phase-7 package:

- `docs/superpowers/specs/2026-08-26-menezesdev-tools-phase7-security-design.md`;
- `docs/superpowers/specs/2026-08-26-menezesdev-tools-phase7-security-self-review.md`;
- `docs/tools/PHASE7_CLOSURE.md`.

Phase 8 is now legally unblocked.

---

# Phase-8 current classification

Superpowers path: **Architectural**.

Parent workflow requires Phase 8 to define:

- Cloudflare-primary edge protection;
- bot/traffic classification inputs;
- verified crawler handling;
- rate-limit policy by route/cost class;
- Turnstile/challenge triggers;
- `adsEligible` contract;
- cost-class taxonomy;
- expensive-operation quota policy;
- global/per-route ad kill switches;
- abuse observability;
- provider-neutral fallback behavior.

No Phase-8 spec has been written yet.

---

# Fresh Cloudflare revalidation — 2026-08-26

Current official Cloudflare documentation was rechecked before Phase-8 design.

Important current facts:

- custom WAF rules are available on all plans;
- current rate-limiting rules are available on all plans, but rule count/fields/counting windows vary by plan;
- `cf.client.bot` (known good/verified crawler signal) is available to all customers;
- the richer `cf.bot_management.score` 1–99 signal remains Enterprise Bot Management only;
- Bot Fight Mode on Free is domain-wide and cannot be customized/skipped through WAF rules;
- Super Bot Fight Mode provides more control on Pro/Business;
- Managed Challenge can be triggered by WAF/rate-limit policy;
- Turnstile requires server-side Siteverify validation for security; therefore it should not be added to ordinary local Launch-50 tool operations merely as a client-only checkbox;
- Cloudflare Pages static responses support `_headers`; Pages Functions responses do not inherit `_headers` automatically;
- fallback portability remains binding and cannot assume Cloudflare-only signals exist.

Design implication: Phase 8 must have a plan-agnostic/free baseline and may consume stronger paid/Enterprise signals only as optional enhancements.

---

# Current recommended Phase-8 design — NON-BINDING UNTIL CHAT APPROVAL

Recommended model: **layered edge Traffic Guard + route/cost metadata + separate ad-bootstrap capability + fail-closed Cost Guard for any future backend compute**.

Core direction:

1. verified/known good bots (`cf.client.bot`) receive content and bypass custom challenge/block rules that could hurt SEO;
2. ordinary Launch-50 tool computation stays local and never depends on a TrafficDecision;
3. suspicious/hostile requests are mitigated at the edge with WAF/rate-limit/Managed Challenge according to available plan capabilities;
4. Bot Fight Mode is not a required baseline because Free-plan behavior is domain-wide and not granular enough for the canonical design;
5. Enterprise bot scores may strengthen classification when available but cannot be required for correctness/monetization architecture;
6. content delivery and ad loading are separate capabilities;
7. eligible Tools HTML does not make Ads part of tool correctness; a first-party fixed ad-bootstrap asset/path controls provider loading;
8. known bots are explicitly denied the ad-bootstrap path while still receiving content;
9. ad bootstrap is subject to edge abuse/rate policy independently from page content;
10. `adsEligible` resolves from route monetization class + global/category/route policy + consent/privacy state + traffic eligibility;
11. global ad emergency kill can block the fixed ad-bootstrap path at the edge without breaking Tools;
12. category/route kill state lives in a generated static `AdPolicyManifest` (cheap CDN/static delivery, no backend compute), with normal deploy as the durable control plane;
13. future ad providers such as native/ad-discovery networks inherit the same AdProvider/TrafficDecision contract instead of bypassing it;
14. cost taxonomy separates C0 local/static, C1 tiny bounded coordination, C2 cheap server compute and C3 expensive server compute;
15. all Launch-50 tool operations remain C0;
16. C0 local tool use remains available even when traffic is suspicious, unless the request itself is blocked for site protection; no server cost exists to exploit;
17. any future C2/C3 endpoint must declare cost class, payload cap, execution timeout, rate/quota policy, challenge policy and unavailable/fallback behavior before publication;
18. C3 requires strong pre-clearance/Turnstile-or-equivalent proof plus server-side verification, quotas and hard kill switch;
19. Turnstile is therefore reserved for server-bound/high-value actions, not ordinary local calculators/converters;
20. fallback hosts default to `trafficConfidence=unknown/restricted`, keep local utilities working, disable Ads when ad/consent integrity is not proven, and never expose C2/C3 compute without equivalent Cost Guard;
21. abuse observability records route/cost/action/reason/count buckets but never tool input/file/text/private output;
22. app telemetry does not copy raw security payloads or long-term raw IP data merely because Cloudflare can see network metadata at the edge.

---

# Phase-8 gate

Present the concrete Phase-8 design in chat and obtain approval of that specific design.

Only then may the Phase-8 written spec be committed and self-reviewed.

Do not invoke Phase-9 `writing-plans`, install dependencies, create `feat/tools-platform`, implement Tool SDK/runtime/tools, or configure production Cloudflare security rules yet.
