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

Navigation, CTA behavior, states, motion, forms, accessibility and functional mobile differences are specified in `docs/interactions/`. These contracts complement, but do not replace, the Phase 6 composition in `docs/wireframes/`. Phase 8 must implement both or record a new explicit decision.

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

All MenezesDev commercial CTAs share one real approved WhatsApp URL and the approved prefilled message. The repository currently has no approved URL. Publication is blocked until Phase 8 configures it; fake numbers, `#`, generic WhatsApp links and silent disabled fallbacks are forbidden.

## D-017 — Prismae About is conditional on approved copy
**Status:** accepted
**Date:** 2026-08-22

The Phase 6 navigation slot and route `/demo/prismae/about` remain reserved, but no public link or page is rendered until expanded institutional copy is approved. Do not substitute history, team, credentials, clients, metrics or a redirect to another section.
