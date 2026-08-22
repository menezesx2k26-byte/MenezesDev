# Current State

Last updated: 2026-08-22

## Repository

- Project: MenezesDev.
- Work Mode stage: 4.5.
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
- MenezesDev commercial CTAs require one real approved WhatsApp URL. No approved number/URL currently exists in the repository, so publication must fail until Phase 8 supplies it.
- M47 scheduling/location and Tavola 27 reservation actions are local demonstrative states; they open no external service.
- Prismae validates its form locally, uses the approved success copy and sends/persists no data. Anti-spam remains a technical Phase 8 requirement only for any future real form.
- Prismae `/about` remains reserved and absent from public navigation until expanded institutional copy is approved.
- No frontend, component, package, asset, screenshot, backend or Phase 8 implementation has started.

## Git and worktree

- M47 asset commit: `265bcc814534d924dfff024db8a919dd08d058f0`.
- Tavola 27 asset commit: `c375d1c163f4f2a4e0b9f61422d8a460c28c0218`.
- Prismae asset commit: `1378c19a96b44af5a57c87e63744af55fef8cba0`.
- Phase 6 wireframe commit: `0d8d310d79fd306c90c00cf7cb7dce3cad868386`.
- Two pre-existing user changes remain uncommitted and untouched in `tools/mcp-image/src/core/promptBuilder.ts` and `tools/mcp-image/tests/workspace-prompt.test.mjs`.

## Next logical step

Phase 8 may define technical architecture and implementation details only when explicitly requested. Site implementation, Astro/Tailwind setup, browser validation and real screenshots have not started.
