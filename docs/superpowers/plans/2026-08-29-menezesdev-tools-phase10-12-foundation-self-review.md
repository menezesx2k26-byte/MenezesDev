# MenezesDev Tools Phase 10–12 Plan Self-Review

**Date:** 2026-08-29  
**Branch:** `feat/tools-oss-catalog`  
**Reviewed plan:** `docs/superpowers/plans/2026-08-29-menezesdev-tools-phase10-12-foundation.md`  
**Result:** **PASS FOR USER REVIEW — EXECUTION NOT STARTED**

This review is part of the Phase-9 plan package. The implementation worker must read the plan and this review together. The clarifications below are mandatory execution details discovered by adversarial review; they narrow/complete the plan and do not alter any approved Phase-5/6/7/8 architecture.

---

## 1. Placeholder scan

Fresh searches against the committed plan found:

- `TODO`: 0 matches;
- `TBD`: 0 matches;
- `placeholder`: 0 matches.

The plan does not rely on unresolved marker text.

---

## 2. Scope review

The plan is intentionally bounded to Phases 10–12:

1. integration branch/worktree;
2. Tool SDK foundation;
3. four-tool reference proof set.

It does not absorb:

- Phase 13 final visual design system;
- Phase 14 production Ads/consent/provider activation;
- Phase 15 mass Launch-50 waves;
- Phase 17 final PT-BR localization;
- Phase 18 analytics providers;
- Phase 19 production preflight;
- Phase 21 autonomous growth;
- Phase 22 Tool Factory.

This is the largest cohesive implementation package that can be executed/reviewed without mixing later architectural/creative gates.

---

## 3. Fresh implementation-base reconciliation

Planning-time commercial implementation head was re-read as:

```text
feat/phase-10-implementation
@ a98be87db3863505397ba9f2e80d9b656228d750
```

Its parent is the previously designed runtime base `152fab910296f29cfae2e07bf6ccc2c69f0ce0df`; the new head updates README/manual preview status.

The plan correctly treats this SHA as an observation, not a permanent pin. Phase 10 must fetch and revalidate the branch immediately before creating `feat/tools-platform`.

---

## 4. Worktree/baseline ordering clarification

Task 1's semantic requirement is:

```text
fresh commercial ref
-> isolated workspace
-> commercial baseline validation
-> merge Tools docs/history
-> merged baseline validation
```

If the execution harness is already in an isolated checkout of the commercial ref, run the baseline there before creating another worktree.

If it is not isolated, invoke `superpowers:using-git-worktrees` first and create the `feat/tools-platform` workspace from the fresh commercial ref, then run the **pre-merge** commercial baseline inside that workspace.

Do not mutate a dirty primary checkout merely to satisfy the textual Step-2/Step-3 ordering in the plan.

---

## 5. Preserve-mode output-artifact review

The first draft incorrectly assumed every legacy non-root route would remain a flat `.html` artifact under `build.format: "preserve"`.

The committed plan was corrected before this review.

Binding target mapping includes:

```text
/demo/tavola27             -> demo/tavola27/index.html
/demo/prismae              -> demo/prismae/index.html
/demo/prismae/solutions    -> demo/prismae/solutions/index.html
```

while flat source files such as:

```text
/projetos/m47              -> projetos/m47.html
/demo/tavola27/menu        -> demo/tavola27/menu.html
```

remain flat artifacts.

`src/data/routes.ts` gains explicit target `outputFile` metadata before `astro.config.mjs` switches to `preserve`, and `scripts/check-routes.mjs` consumes that metadata in the same task as the format switch.

This removes the false assumption that canonical URL shape and output-file shape are the same concept.

---

## 6. Executable-loader validation review

The first draft attempted to require loader existence before loader maps existed.

The committed plan was corrected:

- Task 3 validates catalog structure, ids and security-profile references;
- Task 5 creates literal boundary/engine loader maps;
- Task 5 `check-tools` then enforces that every catalog definition resolves to known executable loaders.

No user-controlled module path is introduced.

---

## 7. Localized-content registry — mandatory completion detail

The plan lists per-tool locale files but the first draft did not name the shared registry that the page/SEO/search pipeline uses.

Add this exact foundation file during Task 4:

```text
src/tools/content/index.ts
```

Add the content contract to `src/tools/core/types.ts`:

```ts
export interface ToolLocaleContent {
  readonly locale: ToolLocale;
  readonly toolId: string;
  readonly title: string;
  readonly h1: string;
  readonly description: string;
  readonly purpose: string;
  readonly inputLabels: Readonly<Record<string, string>>;
  readonly resultLabels: Readonly<Record<string, string>>;
  readonly errorMessages: Readonly<Partial<Record<ToolErrorCode, string>>>;
  readonly aliases: readonly string[];
  readonly keywords: readonly string[];
  readonly privacyCopy?: string;
}
```

`src/tools/content/index.ts` owns a literal build-time map keyed by `${locale}:${toolId}` and exports:

```ts
export function getToolContent(toolId: string, locale: ToolLocale): ToolLocaleContent | undefined;
export function requireToolContent(toolId: string, locale: ToolLocale): ToolLocaleContent;
```

Rules:

- the registry contains only authored locale content;
- no runtime translation service;
- no duplicated title/description in ToolDefinition;
- missing content for a declared route is a build/check failure;
- EN-only tools do not receive fabricated PT-BR content.

Task 4 starts with an empty content registry because the catalog has no proof definitions yet.

Task 6 registers:

```text
en:percentage-calculator
pt-BR:percentage-calculator
```

Task 7 registers:

```text
en:json-formatter
```

Task 8 registers:

```text
en:image-resizer
```

Task 9 registers:

```text
en:regex-tester
```

`resolveToolSeo`, dynamic page generation and `buildSearchIndex` must consume this registry rather than import locale files by user-derived path.

---

## 8. Renderer dispatch — mandatory fail-closed detail

Add this exact foundation file during Task 4:

```text
src/tools/ui/ToolRenderer.astro
```

During Task 4 the catalog is intentionally empty, so `ToolRenderer.astro` may be a fail-closed dispatcher with no supported runtime renderer yet. The dynamic tool page can be complete structurally while `getStaticPaths()` returns no tool routes.

When the first definition lands in Task 6, update the dispatcher in the **same red-green task** to support:

```text
generic -> GenericToolForm.astro
```

Task 8 extends the same dispatcher:

```text
image-resizer -> ImageResizer.astro
```

Task 9 extends it:

```text
regex-tester -> RegexTester.astro
```

Unknown renderer ids must fail the build/runtime mounting path explicitly; they never fall back silently to a generic form.

The dynamic route template:

```text
src/pages/tools/[category]/[slug]/index.astro
```

and its PT-BR counterpart must consume `ToolRenderer.astro` once real definitions exist.

This keeps routing/catalog authoritative while preserving specialized UI escape hatches from the Phase-6 design.

---

## 9. JSON ownership review

The committed plan was corrected so the JSON boundary—not the engine—owns raw parsing/security work.

Canonical sequence:

```text
raw JSON text
-> UTF-8 byte cap
-> lexical depth preflight
-> JSON.parse
-> iterative node cap
-> canonical JsonFormatterInput { value, indent }
-> pure JSON.stringify engine
-> UTF-8 output cap
```

This avoids giving the pure engine an unvalidated raw string.

---

## 10. Sitemap honesty review

The Phase-5 final sitemap contract is not silently redefined by this proof plan.

Phases 10–12 preserve the existing commercial sitemap behavior and prove route/canonical/locale generation for the proof set.

The proof report must explicitly state that final Launch sitemap grouping/inclusion remains a later Launch implementation/preflight deliverable. No claim that Phase-5 SEO is fully implemented is allowed merely because proof routes build.

---

## 11. Proof-root indexing review

The proof set is deliberately too small to justify launch-quality category hubs.

The committed plan therefore fixes proof-stage behavior to:

```text
/tools/                                noindex,follow
/pt-br/ferramentas/                   noindex,follow
proof category hubs                   noindex,follow
```

Phase 13/15 may promote complete/substantial hubs according to the approved Phase-5 rules. Do not create filler merely to reach a count.

---

## 12. Dependency review

No new package is necessary for the proof set.

The plan reuses:

- Node 24 built-in test runner;
- native JSON parser/stringifier;
- native RegExp inside a killable browser Worker;
- native browser file/image/canvas APIs;
- existing Astro/TypeScript/Tailwind stack.

Conditional dependencies remain untouched.

This directly satisfies the user's standing repo-reuse/browser-first preference and the Phase-2/6 dependency policy.

---

## 13. Security review

The plan preserves all approved hard boundaries:

- exact profile hard caps;
- tightening-only override rule;
- zero network authority in protected engine/boundary/Worker directories;
- no generic details/exception telemetry;
- no server fallback after local timeout;
- no service worker;
- no Ads provider script;
- no Cloudflare provider-specific code inside local engines;
- no arbitrary server URL fetch;
- no conditional PDF/HTML/image-compression dependency in the proof set.

Proof-set hostile representatives are concrete and bounded.

---

## 14. Economic review

All four proof tools are C0:

```text
Percentage Calculator -> main-thread local
JSON Formatter        -> local structured processing
Image Resizer         -> browser file/canvas local
Regex Tester          -> browser Worker local
```

The Phase-12 evidence step requires observing **zero MenezesDev processing API requests** during successful operations.

No per-operation TrafficDecision, metering or ad-policy request is introduced.

---

## 15. Review conclusion

With the clarifications in Sections 4, 7 and 8 treated as mandatory execution detail, the plan is sufficiently concrete to execute without inventing architecture during implementation.

It contains:

- concrete base/ref procedure;
- exact target files;
- explicit core interfaces;
- TDD red/green commands;
- exact hard security values;
- exact proof routes;
- exact reference tools;
- exact build/validation commands;
- explicit commit boundaries;
- final evidence/review requirements.

**Self-review result:** PASS FOR USER REVIEW.

Phase 9 remains open until Gabriel approves the written plan package. No Phase-10 branch/worktree/runtime implementation begins before that approval.
