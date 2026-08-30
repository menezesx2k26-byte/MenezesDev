# Current State

Last updated: 2026-08-22

## Repository

- Project: MenezesDev.
- Current delivery phase: 10 — implementation completed on `feat/phase-10-implementation`; production release remains blocked.
- Work Mode: 4.5.
- Primary coding agent: Codex.
- Claude Code subscription: not required.
- Mandatory additional AI API cost target: R$ 0 for the baseline.
- Native Codex must remain the default/rollback path.

## Work Mode

- Repository-level memory: enabled through `AGENTS.md` + `docs/context/`.
- OmniRoute: optional, not assumed installed.
- Headroom: optional, not assumed installed.
- Claude-Mem: deferred from baseline pending a clean Windows/Codex smoke test.
- Secrets: must remain outside Git.

## Image pipeline — Etapa 4.5

- Official architecture remains repository briefing → `$menezesdev-image-director` → `$imagegen` native → visual review → repository asset.
- Native ImageGen is available without `OPENAI_API_KEY` or separate OpenAI API billing.
- The historical image MCP remains disconnected and outside the active workflow.
- Phase 5 asset production did not modify the agent architecture, Codex configuration, migration documentation, MCP history or `tools/mcp-image/`.

## Phase 5 assets

- M47: the existing `m47-hero.webp` was preserved byte-for-byte. Six editorial gallery WebPs, six prompt/metadata sidecar pairs, `m47-logo.svg` and `m47-mark.svg` now exist under `public/assets/demos/m47/`.
- Tavola 27: the hero, four food images, three space images, two detail images, ten prompt/metadata sidecar pairs and `tavola27-logo.svg` now exist under `public/assets/demos/tavola27/`.
- Tavola 27 uses one coherent fictional restaurant across the full photographic set. The initial `tavola27-detail-01` candidate required one targeted edit to correct an unsafe guiding-hand position; the edited asset passed review.
- Prismae: `prismae-hero-graphic.svg`, `prismae-process.svg` and `prismae-logo.svg` now exist under `public/assets/demos/prismae/`.
- `prismae-office-01.webp` was intentionally not generated because the case has no concrete photographic need and is designed around grid, data and deterministic SVG/frontend visuals.
- Every generated raster remains at status `generated`; no asset has been promoted to `approved` or `in-use` without implementation review.
- No screenshot, browser automation, Canva generation, stock asset, OpenAI Image API call or image MCP was used.

## Phase 6 wireframes

- Canonical responsive wireframes now exist under `docs/wireframes/` for the MenezesDev Home, reusable MenezesDev project page, M47 landing page, Tavola 27 Home/internal structure and Prismae Home/internal structure.
- The wireframes define desktop/mobile grids, gutters, section order and height, text/media proportions, CTA positions, asset positions, crop behavior, reordering and mobile simplification.
- The Home maps every approved copy section from `HOME_COPY.md — MenezesDev.md`; no testimonials, client logos, metrics or results were added.
- Final demo identities M47 Barber, Tavola 27 and Prismae replace only the legacy placeholder names Atlas Barber, Casa Nostra and Nexa Consultoria in the Home case cards. The remaining approved card copy stays source-bound.
- Existing final assets were inspected and assigned a concrete function. No raster, SVG, prompt or metadata sidecar was modified.
- The MenezesDev hero uses a pure editorial composition of existing case assets, without fictional browser UI or screenshots.
- Project-page screenshot sections are conditional and remain absent until real implemented pages can be captured.
- No component, frontend framework or browser validation was started during Phase 6.

## Phase 7 interactions

- Canonical interaction contracts now exist under `docs/interactions/` for global navigation/motion/accessibility, MenezesDev, M47, Tavola 27 and Prismae.
- Internal destinations are fixed under `/projetos/*` and `/demo/*`; all internal routes and anchors remain in the same tab.
- Mobile navigation uses an accessible modal panel with Escape, outside click, focus trap, focus restoration and document scroll lock.
- FAQ and mobile plan disclosures start closed, allow multiple open panels, support keyboard navigation and respect reduced motion.
- Project cards are single links with no nested controls or hover-only content. Informational services, process blocks, images and data graphics remain non-interactive.
- Motion is limited to short feedback, navigation, disclosure and one-time section entry; there is no parallax, scroll hijacking, autoplay or continuous decoration.
- MenezesDev commercial CTAs require one real approved WhatsApp URL. No approved number/URL currently exists in the repository, so production remains blocked until it is approved and configured.
- M47 scheduling/location and Tavola 27 reservation actions are local demonstrative states; they open no external service.
- Prismae validates its form locally, uses the approved success copy and sends/persists no data. Anti-spam remains a technical Phase 8 requirement only for any future real form.
- Prismae `/about` remains reserved and absent from public navigation until expanded institutional copy is approved.
- No frontend, component, package, asset, screenshot, backend or Phase 8 implementation has started.

## Phase 8 technical specification

- `docs/TECHNICAL_SPEC.md` is the canonical architecture contract for the future Phase 10 implementation.
- Baseline: Astro 7 static output, strict TypeScript, Tailwind CSS 4 through `@tailwindcss/vite`, pnpm 11, Node.js 24 LTS, Lucide, semantic HTML, CSS-first, minimal vanilla JavaScript and selective React/Motion islands with explicit hydration.
- Cloudflare Pages is sufficient for the initial static scope. GitHub `main` is the production source, pull requests may receive previews, the build command is `pnpm build`, and the output directory is `dist`.
- No Cloudflare adapter, SPA/client router, global framework hydration, backend, persistence, external demo submission, real demo booking/reservation or frontend secret is part of the baseline.
- All 16 public routes from Phase 7 are fixed. `/demo/prismae/about` remains absent until approved expanded copy exists.
- MenezesDev and its three portfolio case pages are indexable. All `/demo/**` routes are `noindex, nofollow, noarchive` and excluded from the sitemap because the businesses are fictitious.
- Cloudflare Web Analytics is planned only for the canonical production host and real MenezesDev/portfolio routes; demos, previews and development are excluded.
- Fonts are self-hosted as licensed WOFF2 files with route-scoped weights. Images and SVGs use only the approved asset set.
- The real MenezesDev WhatsApp URL remains unresolved. It will have one nullable central configuration value, and a production build must fail while that required destination is absent.
- No package, `src/`, framework scaffold, asset, screenshot, Cloudflare configuration or implementation was created in Phase 8.

## Phase 9 acceptance criteria

- `docs/ACCEPTANCE_CRITERIA.md` is the canonical PASS/FAIL contract for the future implementation and release audit.
- The matrix contains 115 stable criteria: 97 HARD GATES, 10 RELEASE GATES and 8 TARGETS.
- All 16 canonical routes, the deliberate absence of `/demo/prismae/about`, the 404 fallback, 17 distinct CTA labels and 23 final assets are explicitly mapped.
- `IMPLEMENTATION DONE`, `PRODUCTION READY` and `VISUAL PORTFOLIO COMPLETE` are separate states. A release blocker cannot be disguised as implementation failure or bypassed with a placeholder.
- WCAG 2.2 AA is the accessibility target. Automated audits require zero critical and zero serious findings; the project retains the stronger 44×44 CSS px mobile-control baseline.
- Lighthouse targets use the median of three mobile production-like runs. The SEO score target applies only to `/` and `/projetos/*`; demos are deliberately noindex and use explicit SEO gates instead.
- The WhatsApp URL, canonical domain/TLS and any required Brand Kit materialization are production blockers. Prismae About and real screenshots are post-implementation items and do not block the current 16-route implementation.
- No package, lockfile, `src/`, frontend, asset, screenshot, Cloudflare configuration or deploy was created in Phase 9.

## Phase 10 implementation

- Astro 7.2.4 static output, strict TypeScript 6.0.3, Tailwind CSS 4.3.3, pnpm 11.22.0 and Node.js 24.19.0 are materialized with a versioned lockfile.
- All 16 canonical routes plus a real 404 are implemented. `/demo/prismae/about` remains absent.
- MenezesDev Home/cases, M47, Tavola 27 and Prismae preserve their canonical copy, assets, responsive composition and interaction contracts.
- The 23 final demo assets are used without regeneration, recompression or byte changes. Five licensed WOFF2 families are self-hosted.
- MenezesDev WhatsApp remains a single central `null` value; commercial controls expose the pending state without fake links. The negative release guard fails as required.
- Demo actions are local-only. Prismae sends and persists no data.
- Development/preview are noindex; production indexation is conditional on an approved canonical URL. Demos are always noindex and absent from the sitemap.
- Automated QA passed 97/97 hard gates, 16/16 route checks, 99 source/build assertions, 92 responsive combinations and axe-core on all 16 routes with zero violations.
- Twenty-one Lighthouse reports were produced. Performance medians are 95–100 and accessibility medians are 100. Best Practices/CSP, production SEO and two Tavola LCP measurements remain documented target exceptions/blockers, not hard-gate failures.
- `IMPLEMENTATION DONE`: yes. `PRODUCTION READY`: no. `VISUAL PORTFOLIO COMPLETE`: no.
- Full evidence is in `docs/PHASE_10_IMPLEMENTATION_REPORT.md`.

## Git and worktree

- M47 asset commit: `265bcc814534d924dfff024db8a919dd08d058f0`.
- Tavola 27 asset commit: `c375d1c163f4f2a4e0b9f61422d8a460c28c0218`.
- Prismae asset commit: `1378c19a96b44af5a57c87e63744af55fef8cba0`.
- Phase 6 wireframe commit: `0d8d310d79fd306c90c00cf7cb7dce3cad868386`.
- Phase 7 interaction commit: `fa7d92a1a726299bca279b80a20af810d95b5470`.
- Phase 8 technical specification commit: `03ae135eca6754b5c828f2682d9f514621de9d0a`.
- Phase 10 foundation commit: `3c9c5d3`.
- MenezesDev implementation commit: `dc5fb08`.
- M47 implementation commit: `6c4d2b9`.
- Tavola 27 implementation commit: `6a4753a`.
- Prismae implementation commit: `884744c`.
- Responsive/accessibility QA commit: `927d5c3`.
- Automated acceptance checks commit: `4129d9b`.
- FAQ keyboard completion commit: `4a4e15c`.
- Global-pnpm-independent validation commit: `22cdd04`.
- Two pre-existing user changes remain uncommitted and untouched in `tools/mcp-image/src/core/promptBuilder.ts` and `tools/mcp-image/tests/workspace-prompt.test.mjs`.

## Next logical step

Do not start a new phase or merge automatically. Review the feature branch and, when the external values are available, approve the real WhatsApp URL, canonical domain/TLS and Cloudflare Pages configuration. Real portfolio screenshots/mockups remain a later explicit task.
