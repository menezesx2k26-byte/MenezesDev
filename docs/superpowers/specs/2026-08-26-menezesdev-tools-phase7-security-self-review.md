# MenezesDev Tools — Phase 7 Security Spec Self-Review

**Date:** 2026-08-26  
**Branch:** `feat/tools-oss-catalog`  
**Reviewed spec:** `docs/superpowers/specs/2026-08-26-menezesdev-tools-phase7-security-design.md`  
**Superpowers step:** architectural spec self-review  
**Result:** **PASS FOR USER REVIEW — PHASE 7 NOT CLOSED**

---

# 1. Placeholder scan

Fresh searches against the committed Phase-7 spec found:

- `TODO`: 0 matches;
- `TBD`: 0 matches;
- `PLACEHOLDER`: 0 matches.

No unresolved placeholder is being carried into user review.

---

# 2. Governing-document consistency

The spec was checked against the exact-ref versions of:

- `AGENTS.md`;
- `docs/context/TOOLS_STATE.md`;
- `docs/context/TOOLS_DECISIONS.md`;
- `docs/context/TOOLS_HANDOFF.md`;
- `docs/tools/IMMUTABLE_WORKFLOW.md` in full;
- `docs/tools/workflow-addenda/2026-08-24-autonomous-growth-autopilot.md`;
- `docs/tools/SECURITY_POLICY.md`;
- `docs/tools/addenda/2026-08-24_DEPLOYMENT_PORTABILITY_AND_FALLBACK.md`;
- `docs/tools/TOOLS_SCOPE.md`;
- `docs/tools/CAPABILITY_MAP.md`;
- `docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-design.md`.

No higher-precedence rule is weakened.

The design preserves:

- browser-first ordinary execution;
- zero ordinary Launch-50 MenezesDev backend-processing requests;
- the mandatory input boundary pipeline;
- Launch-50 conditional dependency gates;
- security-over-slot-preservation behavior;
- provider-neutral browser engines;
- telemetry content prohibition;
- Phase-8 ownership of traffic/cost policy;
- Phase-9 ownership of the executable implementation plan.

---

# 3. Capability Map limit reconciliation

The hard profile values in the Phase-7 spec were cross-checked against the Phase-3 Capability Map.

Confirmed profile limits include:

- `N-FIN`: token 128 chars, 32 fields, 1,200 schedule/output rows;
- `N-MATH`: token 128 chars, 64 scalar inputs, 1 MiB output;
- `N-LIST`: 2 MiB, 100,000 numbers, 2 MiB output;
- `T-TEXT`: 2 MiB input, 4 MiB output;
- `T-DIFF`: 1 MiB each side, 3 s, 5 MiB result;
- `S-JSON`: 2 MiB, depth 128, 200,000 nodes, 5 MiB output;
- `S-XML`: 2 MiB, DOCTYPE reject, depth 128, 200,000 nodes, 5 MiB output;
- `S-CSV`: 10 MiB, 200,000 rows, 256 columns, 1 MiB field, 25 MiB output;
- `M-MARKDOWN`: 1 MiB, 3 s, 4 MiB generated HTML;
- `F-HTML`: 1 MiB, 3 s, 4 MiB output;
- `R-REGEX`: 10 KiB pattern, 1 MiB subject, 1.5 s, 10,000 results;
- `C-SECRET`: 4,096 generated chars;
- `H-HASH`: 10 MiB text / 100 MiB file;
- `I-RASTER`: 25 MiB encoded, 12,000 x 12,000, 80 MP, 50 MiB output;
- `I-META`: 25 MiB input, 5 MiB metadata output;
- `I-SVG`: 5 MiB input, 20 MP raster, 5 s, 50 MiB output;
- `A-ZIP-CREATE`: 100 MiB total source, 1,000 entries, 50 MiB/entry, 150 MiB output;
- `P-PDF`: 75 MiB compressed input, 500 pages, 100 MiB output, 15 s;
- `D-DATE`: civil years 1..9999, 1,000 generated segments.

No profile was loosened during Phase 7.

---

# 4. Architecture consistency with Phase 6

Phase 6 established:

- data-only ToolDefinition metadata;
- allowlisted executable boundaries/engines;
- pure engines;
- main-thread / Worker / WASM-worker execution classes;
- strict result/error normalization;
- local output rendering;
- no generic network client in engines;
- Ads/analytics as optional seams;
- provider-neutral static output.

Phase 7 strengthens those boundaries without changing their ownership.

The new `ResolvedSecurityPolicy` is a build/runtime policy object, not executable logic stored in the catalog.

Per-tool overrides tighten rather than silently widen profile caps.

---

# 5. Threat-model completeness check

The spec explicitly addresses the Phase-7 workflow task list:

- byte/work/resource budgets — covered;
- hostile fixture strategy — covered;
- file sniffing/format detection — covered;
- worker isolation — covered;
- CSP requirements — covered;
- future SSRF controls — covered without creating a URL-fetch path;
- archive traversal/bomb posture — covered, while Launch remains create-only;
- parser timeout/work budget — covered;
- safe output encoding — covered.

Additional required risk areas are also explicit:

- image dimensions/decode bombs;
- catastrophic regex;
- active PDF content;
- rich Markdown/HTML;
- output Blob/Object URL lifecycle;
- filename sanitization;
- parser-error sanitization;
- telemetry content prohibition;
- service-worker non-activation;
- third-party provider separation.

---

# 6. CSP review

The design distinguishes three different controls instead of conflating them:

1. Astro-generated meta CSP/hash support for page scripts/styles;
2. HTTP security headers for directives such as `frame-ancestors`;
3. Worker-resource CSP for code executing in normal Worker contexts.

This prevents a false claim that one Astro meta element secures all contexts.

Baseline `connect-src 'none'` and `worker-src 'self'` apply before later approved Ads/analytics/provider expansions.

Phase 14/18 may add explicit provider requirements but may not silently weaken the input/output trust model.

---

# 7. Network-authority review

The spec keeps normal network authority out of:

- `src/tools/engines/**`;
- `src/tools/boundaries/**`;
- `src/tools/workers/**`.

This is compatible with the frozen Launch 50 because ordinary operations are local.

Future network behavior is forced into dedicated reviewed adapters instead of becoming ambient engine capability.

The future server-side arbitrary URL fetch state is explicitly `FORBIDDEN_UNTIL_REVIEW`.

---

# 8. Worker containment review

Hard termination is required where hostile work may stop cooperating.

The design correctly distinguishes:

- cooperative `AbortSignal` for clean cancellation;
- parent-owned watchdog;
- `Worker.terminate()` for hard timeout/cancel containment.

No automatic retry follows a hard timeout.

Regex jobs are disposable rather than pooled by default.

---

# 9. PDF conditional-gate review

Phase 7 does not promote the conditional PDF dependency.

Merge/Split remain admissible only if implementation proves:

- bounded compressed input/pages/output;
- decompression protection;
- dedicated Worker + watchdog;
- encrypted input rejection;
- hostile malformed fixtures;
- active-content safe reject/strip behavior;
- tested preservation claims.

Failure triggers reserve substitution rather than weakening security.

This remains consistent with the frozen Launch-50 governance.

---

# 10. Output-safety review

The spec defines ordinary output as text-safe or local binary output.

Only one privileged rich-output path is contemplated for Launch behavior: reviewed sanitized Markdown preview.

HTML Formatter output remains text only.

JSON/XML/CSV/diff/metadata output does not become executable markup.

Remote Markdown media is disabled by default to prevent pasted content from silently creating third-party requests.

---

# 11. Telemetry/privacy review

The telemetry contract remains a narrow typed allowlist.

The spec explicitly rejects generic `details: any` payloads and prohibits raw parser messages, files, text, financial values, secrets, regex content, metadata and private outputs.

Phase 18 may choose transport/storage but cannot broaden the content boundary without a new privacy/security decision.

---

# 12. Provider/fallback review

Application-level security remains provider-neutral.

Cloudflare may strengthen the primary edge path, but fallback does not automatically downgrade to a weaker security baseline.

If required response headers or Ads/consent integrity cannot be preserved, the safe behavior is to choose another fallback or disable/degrade the affected feature/Ads.

This matches the portability addendum.

---

# 13. External-reference freshness review

On 2026-08-26 current authoritative guidance was rechecked for the version-sensitive claims used by the design:

- OWASP Input Validation Cheat Sheet;
- OWASP File Upload Cheat Sheet;
- OWASP SSRF Prevention Cheat Sheet;
- MDN `Worker.terminate()`;
- MDN `worker-src`;
- MDN `frame-ancestors`;
- MDN Web Worker CSP behavior;
- current Astro CSP configuration documentation.

No version-sensitive claim in the design relies only on stale memory.

---

# 14. Ambiguity review

Potential ambiguity: can a ToolDefinition loosen a profile with a special local override?

Resolution: **no**. Ordinary ToolDefinition overrides are tightening-only. A profile relaxation is a reviewed security-policy/design action, not a data-row convenience.

Potential ambiguity: does `networkAuthority: none` prohibit future Ads/analytics?

Resolution: it applies to security-sensitive tool engines/boundaries/workers. Ads/analytics are separate adapters owned by later phases and are never required for tool correctness.

Potential ambiguity: does CSP replace output sanitization?

Resolution: explicitly no. CSP is defense in depth; sink safety remains mandatory.

Potential ambiguity: does Worker execution make a parser safe?

Resolution: explicitly no. Workers provide responsiveness/killable containment while parser/input/output limits remain mandatory.

Potential ambiguity: can fallback security use a lowest-common-denominator policy?

Resolution: explicitly no. Fallback must preserve the required application security or safely degrade/disable affected behavior.

---

# 15. Scope review

The Phase-7 spec remains focused on security design and threat-model consolidation.

It does not swallow:

- Phase 8 Traffic Guard/Cost Guard classification;
- Phase 9 exact implementation task planning;
- Phase 10 branch/worktree creation;
- Phase 11 SDK implementation;
- Phase 14 AdSense provider/placement implementation;
- Phase 18 analytics transport;
- Phase 21+ autonomous-growth runtime.

The scope is appropriate for one architectural security package.

---

# 16. Self-review result

**PASS FOR USER REVIEW.**

The written spec is complete enough to present for the mandatory Superpowers written-spec review gate.

Phase 7 remains **OPEN** until that review is explicitly approved.

Until then:

- do not create `PHASE7_CLOSURE.md`;
- do not start Phase 8;
- do not invoke Phase-9 `writing-plans`;
- do not create `feat/tools-platform`;
- do not install dependencies or implement runtime/tools.
