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
