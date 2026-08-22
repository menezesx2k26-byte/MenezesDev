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

## Git and worktree

- M47 asset commit: `265bcc814534d924dfff024db8a919dd08d058f0`.
- Tavola 27 asset commit: `c375d1c163f4f2a4e0b9f61422d8a460c28c0218`.
- Two pre-existing user changes remain uncommitted and untouched in `tools/mcp-image/src/core/promptBuilder.ts` and `tools/mcp-image/tests/workspace-prompt.test.mjs`.

## Next logical step

Phase 6 can implement the three demos with real HTML/frontend, consume these assets responsively and validate the implemented pages on desktop/mobile. Phase 6 was not started in this session.
