# MenezesDev Tools — Session Handoff

**Date:** 2026-08-26  
**Branch:** `feat/tools-oss-catalog`

---

# Mandatory verification completed

Before this pass, the exact-ref Tools governance and current Superpowers skills were reread from Git/resources, including:

- `AGENTS.md`;
- `docs/context/TOOLS_STATE.md`;
- `docs/context/TOOLS_DECISIONS.md`;
- previous `TOOLS_HANDOFF.md`;
- `docs/tools/IMMUTABLE_WORKFLOW.md` in full;
- binding workflow addenda;
- `docs/tools/SECURITY_POLICY.md`;
- deployment portability/fallback addendum;
- `docs/tools/TOOLS_SCOPE.md`;
- frozen Launch 50;
- Capability Map;
- approved Phase-5 spec;
- Phase-6 written design + self-review;
- current commercial implementation state/base.

Superpowers `using-superpowers` and `brainstorming` were invoked.

No workflow/security/privacy/cost gate was weakened.

---

# README refreshed

`README.md` on `feat/tools-oss-catalog` was rewritten to represent both active workstreams accurately:

- commercial Phase-10 implementation branch and release state;
- Tools workflow, Launch 50, browser-first economics, SEO, security, Tool SDK, AdSense, autonomous-growth sequencing, deployment portability and canonical docs.

Latest README status now states Phase 6 CLOSED and Phase 7 ACTIVE.

---

# Phase 6 closed

Gabriel's instruction after the Phase-6 written review gate was:

> `Vai e pode seguir pra parse 7`

In context this approves the committed Phase-6 written package and authorizes entry into Phase 7; it does not approve unseen Phase-7 architecture.

Created:

`docs/tools/PHASE6_CLOSURE.md`

Result:

- Phase 6 gate: PASS;
- Phase 6: CLOSED;
- Phase 7: legally unblocked.

`TOOLS_STATE.md` was updated accordingly.

---

# Phase 7 current classification

Superpowers path: **Architectural**.

The immutable workflow requires Phase 7 to turn the security policy into concrete testable SDK/runtime gates covering:

- resource budgets;
- hostile fixtures;
- format sniffing;
- worker isolation;
- CSP;
- future SSRF boundary;
- archive defenses;
- parser work budgets;
- safe output encoding.

No Phase-7 spec has been written yet.

---

# Current Phase-7 recommended design — NON-BINDING UNTIL CHAT APPROVAL

Recommended model: **profile-driven security boundary compiler + per-tool tightening + specialized hostile-input gates**.

Core direction prepared for presentation:

1. catalog tool definitions reference finite security profile ids; executable boundaries remain allowlisted code;
2. a build-time resolver produces a `ResolvedSecurityPolicy` and fails on missing/incompatible limits;
3. per-tool overrides may tighten limits by default; loosening a profile cap requires explicit security review;
4. raw user input crosses a pre-parse size/work guard before parser/engine code;
5. filename/extension/`File.type` are hints only; binary formats use explicit signature/header checks;
6. raster images preflight supported signatures/dimensions before expensive decode where possible;
7. PDF/regex/HTML formatter and other hostile/heavy classes use killable dedicated browser Workers with hard watchdogs;
8. timeouts terminate the Worker rather than relying only on cooperative cancellation;
9. tool engine/boundary/worker code has no network authority by default; future networking is isolated to approved adapters;
10. CSP must be enforced with HTTP headers on production/fallback where directives require headers; Astro meta CSP is defense-in-depth but is not sufficient for `frame-ancestors`;
11. Workers need their own CSP/network policy because worker contexts generally do not inherit the parent document CSP;
12. no blob/data Worker source by default; use same-origin bundled module workers;
13. rich HTML rendering exists only through one reviewed sanitizer/safe-rich-output wrapper;
14. Markdown raw HTML is disabled, output sanitized, and remote media does not auto-fetch from pasted Markdown;
15. HTML Formatter output is text only and never executed;
16. JSON/XML/CSV/metadata/diff outputs render through text-safe sinks unless an explicit rich-output profile exists;
17. PDF structural operations keep the conditional admission gate: encrypted inputs rejected, decompression guard preserved, active-content hostile fixtures mandatory; failure to prove safe reject/strip behavior triggers frozen-slot replacement rather than weakening security;
18. ZIP creation sanitizes entry names and bounds source/output size; archive extraction remains a separate future profile with traversal/bomb defenses and is not silently added;
19. output downloads use deterministic sanitized filenames/content types, bounded Blob output and object-URL revocation;
20. production errors map to typed public error codes; raw parser errors/user content never enter telemetry;
21. telemetry remains a typed allowlist with no arbitrary `details` payload and no user content;
22. CI includes profile validation, hostile fixtures, forbidden-network API checks, unsafe-sink checks, dependency allowlist/pin checks, browser CSP/network tests and max/max+1 boundary tests;
23. no service worker is enabled for Launch 50; future PWA activation requires its own update/cache security review;
24. third-party Ads/analytics scripts remain outside tool correctness and receive a Phase-14/18 privacy review before being allowed on content-sensitive interaction surfaces.

---

# Current authoritative external security references rechecked

The Phase-7 proposal was cross-checked against current authoritative guidance:

- OWASP Input Validation / file validation guidance;
- OWASP CSP Cheat Sheet;
- OWASP SSRF Prevention Cheat Sheet;
- OWASP XSS Prevention guidance;
- MDN CSP and `connect-src` behavior;
- MDN `frame-ancestors` header-only constraint;
- MDN Worker `terminate()` behavior;
- MDN worker CSP behavior;
- Astro 7.2 CSP documentation.

Important current facts carried into the design:

- allowlist validation is preferred where formats are constrained;
- file size/type validation must occur before expensive processing;
- denylist-only SSRF controls are bypass-prone; allowlists/network egress controls are preferred;
- `Worker.terminate()` provides a hard browser-side kill primitive;
- `connect-src` governs fetch/XHR/WebSocket/EventSource/sendBeacon;
- `frame-ancestors` is not supported via CSP meta;
- Workers generally require CSP on the worker resource itself;
- Astro 7 CSP can hash processed inline scripts/styles but a meta policy cannot replace all host-level headers.

---

# Workflow state

- Phase 0: CLOSED.
- Phase 1: CLOSED.
- Phase 2: CLOSED.
- Phase 3: CLOSED.
- Phase 4: CLOSED.
- Phase 5: CLOSED.
- Phase 6: CLOSED.
- Phase 7: **ACTIVE — design approval pending**.
- Phase 8+: NOT STARTED.
- runtime implementation: NOT STARTED.
- autonomous-growth runtime: NOT STARTED.

---

# Current gate

Present the concrete Phase-7 design in chat and obtain approval of that specific design.

Only then may the Phase-7 written spec be committed and self-reviewed.

Do not start Phase 8, invoke `writing-plans`, install dependencies, create `feat/tools-platform`, or implement runtime/tools before the appropriate later gates.

Git remains the source of truth.
