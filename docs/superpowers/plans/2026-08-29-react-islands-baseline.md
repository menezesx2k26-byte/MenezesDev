# React Islands Baseline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add selective React + Motion islands to MenezesDev while preserving Astro static output and minimal hydration.

**Architecture:** Astro stays authoritative for routes/content/layout. React is enabled through `@astrojs/react`, and only isolated components hydrate with explicit client directives.

**Tech Stack:** Astro 7.2.4, React 19, `@astrojs/react`, Motion, Tailwind CSS 4, TypeScript strict, pnpm 11.

**Spec:** `docs/superpowers/specs/2026-08-29-react-islands-design.md`

## Global Constraints

- `output: "static"` remains unchanged.
- No client router or SPA shell.
- No shadcn/GSAP/Lenis baseline dependency.
- React islands require explicit hydration directives.
- Motion must respect reduced-motion preferences.

---

### Task 1: Update architecture contracts and gates

**Files:** `docs/TECHNICAL_SPEC.md`, `docs/ACCEPTANCE_CRITERIA.md`, `docs/context/DECISIONS.md`, `docs/context/STATE.md`, `scripts/check-acceptance.mjs`

- [ ] Replace the blanket React prohibition with the selective-islands policy.
- [ ] Update `JS-003` to detect client routers/unbounded framework hydration instead of React itself.
- [ ] Run the acceptance checker and confirm it fails until dependencies/integration are added where expected.
- [ ] Commit contract/gate changes.

### Task 2: Install and configure React/Motion

**Files:** `package.json`, `pnpm-lock.yaml`, `astro.config.mjs`

- [ ] Add exact React integration/runtime dependencies with pnpm.
- [ ] Add `react()` to Astro integrations while preserving sitemap/static output.
- [ ] Run `pnpm check` and `pnpm build`.
- [ ] Commit dependency/configuration changes.

### Task 3: Add one visible-hydration proof island

**Files:** create `src/components/islands/MotionReveal.tsx`; modify `src/pages/index.astro`; modify relevant CSS only if needed.

- [ ] Add a semantic wrapper component with reduced-motion handling.
- [ ] Hydrate it with `client:visible` on one home-page presentation block.
- [ ] Keep page copy and links server-rendered/semantic.
- [ ] Run `pnpm validate` and acceptance checks.
- [ ] Commit proof-of-capability change.
