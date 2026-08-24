# MenezesDev Studio — Admin Experience & Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete owner-facing MenezesDev Studio UI — dashboard, Home editor, projects, services, plans, SEO, settings, history and real responsive preview — with autosave, 40-state undo/redo, section reset and conflict recovery.

**Architecture:** Keep Astro + semantic HTML + small vanilla TypeScript controllers. Do not add React/Vue/Svelte or a client router. Server routes render the admin shell and initial state; JavaScript enhances editing, autosave, sorting and preview. Editors modify a single local `SiteDocument` draft and submit revision-checked saves through the admin API.

**Tech Stack:** Astro, TypeScript, Tailwind/local CSS, Lucide Astro, vanilla browser APIs, existing MenezesDev Manrope/Inter font assets, Vitest.

**Spec:** `docs/superpowers/specs/2026-08-23-menezesdev-studio-design.md`

## Global UX constraints

- The admin follows MenezesDev branding, not Punctum's photographic skin.
- Dark-first, high contrast, restrained violet/magenta, minimal glow.
- No glassmorphism-everywhere, no cyberpunk, no dashboard made of dozens of decorative cards.
- Common operations use plain Portuguese; technical details use progressive disclosure.
- Every primary action works by keyboard and tap, not hover-only.
- Minimum mobile target remains 44×44 CSS px.
- No raw CSS, arbitrary HTML, arbitrary font names, RGB fields or unbounded layout controls.
- Small screens use focused screens/modes rather than squeezing a three-column desktop UI.

---

## Task 1 — Create admin design tokens, layout and navigation shell

**Files:**
- Create: `src/layouts/AdminLayout.astro`
- Create: `src/styles/admin.css`
- Create: `src/components/admin/AdminSidebar.astro`
- Create: `src/components/admin/AdminTopbar.astro`
- Create: `src/components/admin/AdminStatus.astro`
- Create: `src/pages/admin/index.astro`
- Create: `tests/admin/navigation.test.ts`

- [ ] **1.1 Write source/IA tests first**

Test that the admin navigation exposes exactly the intended primary areas:
- Visão geral
- Studio
- Projetos
- Serviços
- Planos
- Mídia
- SEO
- Configurações

Also require `noindex`, no public-site navigation reuse, and a visible save/publish status region.

- [ ] **1.2 Build `AdminLayout.astro`**

Responsibilities:
- always noindex/noarchive;
- load Manrope/Inter locally;
- render skip link;
- render responsive sidebar/topbar;
- expose slots for title, actions and content;
- provide `aria-live` save/status region;
- never include Cloudflare/DB technical internals in ordinary navigation.

- [ ] **1.3 Implement admin CSS**

Use existing brand tokens where practical, but namespace admin-specific layout classes. Desktop may use a compact sidebar around 240–280 px; mobile converts navigation into an accessible modal/drawer pattern using the same focus-trap/focus-restoration discipline already proven in Phase 10.

- [ ] **1.4 Create functional dashboard skeleton**

`/admin` reads actual state summary, not fake metrics:
- published version;
- last publish;
- draft dirty/clean status;
- project count;
- media count/storage summary when media layer exists;
- health summary;
- Continue editing / Preview / Publish actions where allowed.

Unknown/unavailable values display a clear unavailable state, not zero unless zero is factual.

- [ ] **1.5 Run tests/check**

```bash
corepack pnpm test -- tests/admin/navigation.test.ts
corepack pnpm check
```

- [ ] **1.6 Commit**

```bash
git add src/layouts/AdminLayout.astro src/styles/admin.css src/components/admin src/pages/admin/index.astro tests/admin/navigation.test.ts
git commit -m "feat(studio): add branded admin shell"
```

---

## Task 2 — Build a framework-free draft store with 40-state undo/redo

**Files:**
- Create: `src/studio/client/draft-store.ts`
- Create: `src/studio/client/path.ts`
- Create: `tests/admin/draft-store.test.ts`

- [ ] **2.1 Write draft-store tests first**

Cover:
- initializes from server document/revision;
- meaningful edit pushes prior state;
- no-op edit does not consume history;
- undo restores previous document;
- redo reapplies;
- new edit after undo clears redo branch;
- history caps at 40 document states;
- reset section restores its supplied baseline section only;
- server save acknowledgement updates revision but does not create undo state;
- conflict state freezes autosave until resolved.

- [ ] **2.2 Implement immutable update helpers**

Do not mutate nested server object in place. Provide bounded path helpers for known schema paths, not an `eval`/arbitrary path executor.

- [ ] **2.3 Implement `DraftStore`**

Suggested API:

```ts
createDraftStore({ document, revision, baseline })
store.update(mutatorOrPatch)
store.undo()
store.redo()
store.resetSection(sectionKey)
store.markSaving()
store.acknowledgeSave(newRevision)
store.markConflict(serverRevision)
store.resolveConflict(strategy)
store.subscribe(listener)
```

- [ ] **2.4 Run tests — GREEN**

```bash
corepack pnpm test -- tests/admin/draft-store.test.ts
```

- [ ] **2.5 Commit**

```bash
git add src/studio/client tests/admin/draft-store.test.ts
git commit -m "feat(studio): add undoable draft state store"
```

---

## Task 3 — Implement debounced autosave and conflict recovery

**Files:**
- Create: `src/studio/client/autosave.ts`
- Create: `src/components/admin/ConflictDialog.astro`
- Create: `tests/admin/autosave.test.ts`

- [ ] **3.1 Write autosave tests with fake timers/fetch adapter**

Cover:
- edits debounce into one save;
- latest document + known revision sent;
- 200 acknowledgement updates revision;
- 409 enters conflict and stops further automatic writes;
- network failure retains local content and shows retry state;
- navigating away while unsaved triggers normal browser dirty warning only when necessary;
- save queue cannot reorder acknowledgements.

- [ ] **3.2 Implement autosave controller**

Use `AbortController`/sequence IDs carefully so stale responses cannot overwrite a newer acknowledged revision.

- [ ] **3.3 Implement conflict dialog**

Offer only safe actions:
- reload server draft after explicit acknowledgement that local unsaved changes will be replaced;
- keep local changes available for copying/recovery;
- compare summary if a deterministic local diff can be produced.

Do not implement silent merge or last-write-wins.

- [ ] **3.4 Run tests**

```bash
corepack pnpm test -- tests/admin/autosave.test.ts
```

- [ ] **3.5 Commit**

```bash
git add src/studio/client/autosave.ts src/components/admin/ConflictDialog.astro tests/admin/autosave.test.ts
git commit -m "feat(studio): add autosave and conflict recovery"
```

---

## Task 4 — Build the Home Studio editor

**Files:**
- Create: `src/pages/admin/studio.astro`
- Create: `src/components/admin/studio/StudioShell.astro`
- Create: `src/components/admin/studio/SectionNavigator.astro`
- Create: `src/components/admin/studio/PropertyPanel.astro`
- Create: `src/components/admin/studio/editors/HeroEditor.astro`
- Create: `src/components/admin/studio/editors/ProjectsSectionEditor.astro`
- Create: `src/components/admin/studio/editors/ServicesSectionEditor.astro`
- Create: `src/components/admin/studio/editors/ProcessEditor.astro`
- Create: `src/components/admin/studio/editors/PlansSectionEditor.astro`
- Create: `src/components/admin/studio/editors/FaqEditor.astro`
- Create: `src/components/admin/studio/editors/ContactEditor.astro`
- Create: `src/studio/client/studio-controller.ts`
- Create: `tests/admin/studio-form.test.ts`

- [ ] **4.1 Write editor binding tests**

For each editor, assert visible inputs map to specific schema paths and enforce documented max lengths/options. Ensure no free-form styling inputs appear.

- [ ] **4.2 Implement Studio composition**

Desktop:
1. section navigation;
2. property/editor panel;
3. preview panel.

Tablet/mobile:
- editor and preview become switchable modes;
- section navigation becomes compact list/select/dialog;
- no page-level horizontal scrolling.

- [ ] **4.3 Implement section controls**

Only expose:
- copy fields;
- allowed media references;
- section visibility where safe;
- curated layout preset select;
- allowed ordering;
- Reset section.

- [ ] **4.4 Add undo/redo controls and keyboard shortcuts**

Shortcuts are scoped to the Studio root and must not intercept native editing shortcuts while focus is in editable inputs. Provide visible buttons as the primary accessible mechanism.

- [ ] **4.5 Wire autosave**

Every validated local mutation updates preview immediately and queues revision-safe autosave.

- [ ] **4.6 Run tests/check**

```bash
corepack pnpm test -- tests/admin/studio-form.test.ts tests/admin/draft-store.test.ts tests/admin/autosave.test.ts
corepack pnpm check
```

- [ ] **4.7 Commit**

```bash
git add src/pages/admin/studio.astro src/components/admin/studio src/studio/client/studio-controller.ts tests/admin/studio-form.test.ts
git commit -m "feat(studio): build Home visual editor"
```

---

## Task 5 — Build Projects editor with safe slug lifecycle

**Files:**
- Create: `src/pages/admin/projetos/index.astro`
- Create: `src/pages/admin/projetos/[id].astro`
- Create: `src/components/admin/projects/ProjectList.astro`
- Create: `src/components/admin/projects/ProjectEditor.astro`
- Create: `src/components/admin/projects/SlugChangeDialog.astro`
- Create: `tests/admin/projects.test.ts`

- [ ] **5.1 Write project editor tests**

Cover create/edit/reorder/archive, Home visibility, unique slug validation and explicit warning before slug changes.

- [ ] **5.2 Implement project list**

Provide move up/down accessible controls in addition to any drag interaction. Never make drag the only ordering method.

- [ ] **5.3 Implement project editor fields**

Identity, slug, category/labels, summary/headline, context/challenge, approach/solution, features, visual refs, demo/internal links where permitted, SEO and curated presentation variant.

- [ ] **5.4 Preserve case disclosure invariants**

Existing initial demos remain labeled as concepts. Admin cannot remove mandatory fictitious-disclosure behavior for those demo-linked records unless a future explicit product migration makes a case real.

- [ ] **5.5 Run and commit**

```bash
corepack pnpm test -- tests/admin/projects.test.ts
git add src/pages/admin/projetos src/components/admin/projects tests/admin/projects.test.ts
git commit -m "feat(studio): add project case management"
```

---

## Task 6 — Build Services and Plans editors

**Files:**
- Create: `src/pages/admin/servicos.astro`
- Create: `src/pages/admin/planos.astro`
- Create: `src/components/admin/services/ServicesEditor.astro`
- Create: `src/components/admin/plans/PlansEditor.astro`
- Create: `tests/admin/services-plans.test.ts`

- [ ] **6.1 Write tests for business rules**

Cover:
- order controls;
- visibility;
- empty required section prevented;
- structured plan starting price in cents;
- display label generated/validated deliberately;
- at most one recommended plan unless design later explicitly allows multiple;
- CTA cannot be empty on visible plan.

- [ ] **6.2 Implement simple list editors**

Avoid spreadsheet-like complexity. Each entry opens focused fields; common reorder/visibility controls remain immediately visible.

- [ ] **6.3 Run and commit**

```bash
corepack pnpm test -- tests/admin/services-plans.test.ts
git add src/pages/admin/servicos.astro src/pages/admin/planos.astro src/components/admin/services src/components/admin/plans tests/admin/services-plans.test.ts
git commit -m "feat(studio): add services and plans management"
```

---

## Task 7 — Build SEO and Settings editors

**Files:**
- Create: `src/pages/admin/seo.astro`
- Create: `src/pages/admin/configuracoes.astro`
- Create: `src/components/admin/seo/SeoEditor.astro`
- Create: `src/components/admin/settings/SettingsEditor.astro`
- Create: `tests/admin/seo-settings.test.ts`

- [ ] **7.1 Write validation/presentation tests**

Require:
- title/description character guidance but no misleading guarantee;
- canonical environment status is read-only operational info, not arbitrary editor text;
- demos cannot become indexable;
- WhatsApp accepts only a validated approved-style HTTPS wa.me/API destination or remains empty according to central URL policy;
- no fake default number inserted;
- social links enforce http/https allowlist.

- [ ] **7.2 Build SERP/social preview components**

These are visual approximations labeled as previews; do not claim exact Google/social rendering.

- [ ] **7.3 Build settings**

Common: commercial contact, WhatsApp message, social links, navigation labels/order, contact copy, presentation preset.
Advanced/System: separate read-only diagnostics link.

- [ ] **7.4 Run and commit**

```bash
corepack pnpm test -- tests/admin/seo-settings.test.ts
git add src/pages/admin/seo.astro src/pages/admin/configuracoes.astro src/components/admin/seo src/components/admin/settings tests/admin/seo-settings.test.ts
git commit -m "feat(studio): add SEO and commercial settings"
```

---

## Task 8 — Build real draft preview with shared public renderer

**Files:**
- Refactor/Create: `src/components/menezesdev/HomePage.astro`
- Reuse/Modify: `src/components/ProjectCasePage.astro`
- Modify: `src/pages/index.astro`
- Create: `src/pages/admin/preview/index.astro`
- Create: `src/pages/admin/preview/projetos/[id].astro`
- Create: `src/components/admin/PreviewFrame.astro`
- Create: `src/studio/preview.ts`
- Create: `tests/admin/preview.test.ts`

- [ ] **8.1 Write renderer-sharing test**

Assert live Home and preview import the same public renderer component; case preview and live case also share the same renderer. Reject copied preview markup as architectural drift.

- [ ] **8.2 Extract Home renderer without changing output**

Move current Home markup into a component receiving a `SiteDocument`/view model. Live route supplies published document. Preview supplies draft document.

- [ ] **8.3 Implement protected preview routes**

Preview routes:
- read draft only;
- set `noindex, nofollow, noarchive`;
- `Cache-Control: private, no-store`;
- display a small unmistakable Draft Preview banner outside/around the rendered surface where it cannot be mistaken for live content;
- suppress real commercial side effects.

- [ ] **8.4 Implement viewport frame controls**

Desktop/tablet/mobile buttons resize an iframe/container to documented widths. They do not spoof user-agent-dependent behavior; label this as responsive viewport preview.

- [ ] **8.5 Add live preview refresh**

After local draft edits, refresh/reload preview in a debounced, controlled way or use same-origin postMessage with a validated message schema. Do not expose draft JSON through a public global or query string.

- [ ] **8.6 Run tests and equivalence**

```bash
corepack pnpm test -- tests/admin/preview.test.ts
node scripts/check-public-equivalence.mjs
corepack pnpm check
```

- [ ] **8.7 Commit**

```bash
git add src/components/menezesdev src/components/ProjectCasePage.astro src/pages/index.astro src/pages/admin/preview src/components/admin/PreviewFrame.astro src/studio/preview.ts tests/admin/preview.test.ts
git commit -m "feat(studio): add shared-renderer draft preview"
```

---

## Task 9 — Build publication history UI

**Files:**
- Create: `src/pages/admin/historico.astro`
- Create: `src/components/admin/history/VersionList.astro`
- Create: `src/components/admin/history/RestoreDialog.astro`
- Create: `tests/admin/history.test.ts`

- [ ] **9.1 Write tests**

Require version number/date/actor/note, restore confirmation, `restored_from` indicator, and no delete/history rewrite action.

- [ ] **9.2 Implement history list and restore flow**

Restore loads selected snapshot into draft through the revision-checked API. UI must say it creates a draft; it is not live until Publish.

- [ ] **9.3 Add history entry point without bloating primary nav**

History may be accessible from dashboard/topbar/version status if product hierarchy remains clearer than adding a ninth primary nav item.

- [ ] **9.4 Run/commit**

```bash
corepack pnpm test -- tests/admin/history.test.ts
git add src/pages/admin/historico.astro src/components/admin/history tests/admin/history.test.ts
git commit -m "feat(studio): add version history and restore UI"
```

---

## Admin/preview plan completion gate

Complete only when:

- owner can edit Home, projects, services, plans, SEO and settings without source code;
- autosave is revision-safe;
- undo/redo retains max 40 meaningful states;
- section reset works;
- conflict cannot silently overwrite;
- real preview uses the exact public renderers;
- preview works in desktop/tablet/mobile viewport modes;
- publication/history/restore actions are understandable without technical knowledge;
- admin is keyboard/mobile usable and noindex;
- no arbitrary page-builder capability has slipped into scope.
