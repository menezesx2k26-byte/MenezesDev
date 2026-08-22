# Decision Log

## D-001 — Codex remains the primary agent
**Status:** accepted  
**Date:** 2026-08-22

The project will not require Claude Code or a second paid coding-agent subscription. Existing Codex remains the principal agent.

## D-002 — Native execution is the default
**Status:** accepted  
**Date:** 2026-08-22

Optional proxies/routers must have separate launchers. The project's normal Codex setup must remain usable without OmniRoute or Headroom.

## D-003 — Project memory is explicit and versionable
**Status:** accepted  
**Date:** 2026-08-22

Use `AGENTS.md`, `STATE.md`, `DECISIONS.md`, and `HANDOFF.md` as the baseline cross-session memory. This avoids making project continuity depend on one plugin.

## D-004 — OmniRoute is optional
**Status:** accepted  
**Date:** 2026-08-22

Use OmniRoute when free-tier/fallback routing is useful. Never describe it as free unlimited official Codex/OpenAI inference.

## D-005 — Headroom is an optimization, not a dependency
**Status:** accepted  
**Date:** 2026-08-22

Headroom may be tested for compression/memory benefits but must not be required to develop or deploy the site.

## D-006 — Claude-Mem is deferred
**Status:** accepted  
**Date:** 2026-08-22

Do not include Claude-Mem in the baseline until its Codex integration passes a clean test on the actual Windows environment.

## D-007 — Secrets never enter Git
**Status:** accepted  
**Date:** 2026-08-22

Real API keys, tokens, cookies, certificates, and `.env` files are excluded. Examples may document variable names with blank values only.

## D-008 — Image generation uses a local MCP pipeline
**Status:** superseded by D-009
**Date:** 2026-08-22

Raster image generation/editing is exposed to Codex through a local STDIO MCP server in `tools/mcp-image`. The server must read approved project briefings, keep native Codex as the execution path, support cost-free `dry_run`, protect the workspace, and never require an API key for validation-only runs. Paid OpenAI Image API calls remain explicit and opt-in.

This entry is retained as historical context only. Its implementation is no longer active.

## D-009 — Raster generation uses native Codex ImageGen
**Status:** accepted
**Date:** 2026-08-22

The official raster workflow is repository briefing → `$menezesdev-image-director` → `$imagegen` native → visual review → repository asset. It must not depend on `OPENAI_API_KEY`, separate OpenAI API billing, Image API endpoints, an image MCP, or browser automation. `tools/mcp-image` remains historical and disconnected.

Canva is reserved for later editable compositions. Screenshots come only from the real implementation. Logos, marks, charts, diagrams, exact geometry and exact UI use SVG or frontend.

## D-010 — Phase 6 wireframes are the canonical composition contract
**Status:** accepted
**Date:** 2026-08-22

Responsive composition is specified in `docs/wireframes/`. These documents define hierarchy, grids, section order, responsive reordering, asset use and conditional content without starting frontend implementation. Later phases may refine micro-aesthetics and interaction, but must preserve this structural contract or record a new decision.

## D-011 — Final demo identities supersede legacy Home case names
**Status:** accepted
**Date:** 2026-08-22

M47 Barber, Tavola 27 and Prismae are the final identities because they are established in `docs/DEMO_CASES.md` and the approved asset tree. They replace the provisional Atlas Barber, Casa Nostra and Nexa Consultoria names in Home case slots. Headlines, descriptions, tags, CTA and label from the approved Home copy remain unchanged unless a later copy approval explicitly replaces them.

## D-012 — Missing real screenshots remove the module
**Status:** accepted
**Date:** 2026-08-22

The reusable project page contains a conditional desktop/mobile screenshot module. Until real implementations and captures exist, the module is not rendered. Fictional UI, browser frames, mock screenshots and placeholders are not acceptable substitutes.

## D-013 — Phase 7 interaction contracts are canonical
**Status:** accepted
**Date:** 2026-08-22

Navigation, CTA behavior, states, motion, forms, accessibility and functional mobile differences are specified in `docs/interactions/`. These contracts complement, but do not replace, the Phase 6 composition in `docs/wireframes/`. Phase 8 must translate both into technical decisions; Phase 10 must implement both or record a new explicit decision.

## D-014 — Public routes use the repository path architecture
**Status:** accepted
**Date:** 2026-08-22

MenezesDev case pages use `/projetos/m47`, `/projetos/tavola-27` and `/projetos/prismae`. Initial demos use `/demo/m47`, `/demo/tavola27` and `/demo/prismae`, with the documented child routes for Tavola 27 and Prismae. Internal navigation stays in the same tab.

## D-015 — Demo commercial actions are local-only
**Status:** accepted
**Date:** 2026-08-22

M47 scheduling/location, Tavola 27 reservation and Prismae diagnosis submission cannot contact a real or fictitious business. M47 and Tavola actions show local demonstrative status. Prismae validates locally, briefly processes a demonstration state, displays the approved success message and sends or persists no data.

## D-016 — MenezesDev WhatsApp requires an approved real destination
**Status:** accepted
**Date:** 2026-08-22

All MenezesDev commercial CTAs share one real approved WhatsApp URL and the approved prefilled message. The repository currently has no approved URL. Phase 8 defines one nullable central configuration value and a production build gate; publication remains blocked until the real URL is approved and configured. Fake numbers, `#`, generic WhatsApp links and silent disabled fallbacks are forbidden.

## D-017 — Prismae About is conditional on approved copy
**Status:** accepted
**Date:** 2026-08-22

The Phase 6 navigation slot and route `/demo/prismae/about` remain reserved, but no public link or page is rendered until expanded institutional copy is approved. Do not substitute history, team, credentials, clients, metrics or a redirect to another section.

## D-018 — Phase 8 technical specification is canonical
**Status:** accepted
**Date:** 2026-08-22

`docs/TECHNICAL_SPEC.md` is the architecture contract for Phase 10. It resolves runtime, hosting, routes, data, assets, accessibility, performance, security, SEO and quality tooling without creating implementation files. Phase 9 may add measurable acceptance criteria but must not silently replace this baseline.

## D-019 — Initial delivery is Astro static on Cloudflare Pages
**Status:** accepted
**Date:** 2026-08-22

Use Astro 7 with static output and publish `dist` from GitHub `main` through Cloudflare Pages. Do not add `@astrojs/cloudflare`, Pages Functions, Workers runtime or SSR while the site has no runtime backend requirement. Revisit only when an API, server-side form, authentication, runtime storage, middleware or SSR becomes concrete.

## D-020 — Runtime and presentation stack are deliberately small
**Status:** accepted
**Date:** 2026-08-22

The implementation baseline is Node.js 24 LTS, pnpm 11, strict TypeScript, Tailwind CSS 4 through `@tailwindcss/vite`, Lucide and local CSS. React, Vue, Svelte, a client router and heavy animation libraries are excluded because the approved interactions can use native HTML, CSS and small vanilla TypeScript controllers.

## D-021 — Fonts are local and route-scoped
**Status:** accepted
**Date:** 2026-08-22

Use licensed WOFF2 font files with Astro's local Fonts API, only the approved families and weights required per identity, `font-display: swap`, and selective hero preload. Runtime Google Fonts or Fontsource requests are not part of the baseline.

## D-022 — Fictitious demos are excluded from search indexing
**Status:** accepted
**Date:** 2026-08-22

The MenezesDev Home and `/projetos/*` case pages are indexable. Every `/demo/**` route is `noindex, nofollow, noarchive` and excluded from the sitemap so M47, Tavola 27 and Prismae are not presented as real businesses in search. Do not emit `LocalBusiness` for them.

## D-023 — Initial release has no backend or transmitted demo data
**Status:** accepted
**Date:** 2026-08-22

M47 and Tavola commercial interactions are local demonstration states. Prismae validates and completes locally without network, endpoint, persistence or anti-spam integration. Any future real submission reopens the backend, privacy, abuse-prevention and Cloudflare runtime decisions.

## D-024 — Analytics covers only the real production surface
**Status:** accepted
**Date:** 2026-08-22

Plan Cloudflare Web Analytics at the edge for the canonical production host only. Exclude `/demo/**`, development and preview hosts; do not add Google Analytics or a client analytics package. The technical collection behavior is documented without making a legal consent conclusion.

## D-025 — Global commercial values have one source of truth
**Status:** accepted
**Date:** 2026-08-22

Brand name, canonical base URL, default metadata, navigation, approved social links and the MenezesDev WhatsApp URL belong in one typed site configuration. The WhatsApp value starts null and must block production publication until approved; it cannot be copied as a placeholder across pages.

## D-026 — Phase 9 acceptance matrix is canonical
**Status:** accepted
**Date:** 2026-08-22

`docs/ACCEPTANCE_CRITERIA.md` converts the approved contracts into 115 stable, auditable criteria: 97 HARD GATES, 10 RELEASE GATES and 8 TARGETS. Phase 10 is complete only against this matrix; changing a gate requires an explicit decision rather than silently weakening the test.

## D-027 — Completion and release are separate states
**Status:** accepted
**Date:** 2026-08-22

`IMPLEMENTATION DONE` requires every HARD GATE to pass. `PRODUCTION READY` additionally requires every RELEASE GATE, including real WhatsApp, domain/TLS and Cloudflare environment checks. `VISUAL PORTFOLIO COMPLETE` comes later and requires real screenshots and derived mockups. A missing production input must not be replaced by fake data merely to mark implementation complete.

## D-028 — Lighthouse SEO target excludes deliberately noindex demos
**Status:** accepted
**Date:** 2026-08-22

The aggregate Lighthouse SEO target applies only to `/` and `/projetos/*`. Applying it to `/demo/**` would contradict D-022 because the audit penalizes intentional noindex. Demos instead pass explicit hard gates for `noindex, nofollow, noarchive`, sitemap exclusion, factual metadata and safe structured data.

## D-029 — Accessibility acceptance uses WCAG 2.2 AA plus the stronger project touch baseline
**Status:** accepted
**Date:** 2026-08-22

WCAG 2.2 AA is the conformance target, with zero automated critical/serious findings and manual keyboard, focus, reflow and reduced-motion checks. Although WCAG 2.2 defines a 24×24 CSS px minimum target with formal exceptions, the project retains 44×44 CSS px as a hard gate for mobile controls and prefers 48 px for primary controls.
