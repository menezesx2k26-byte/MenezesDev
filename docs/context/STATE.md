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

- Official architecture: repository briefing → `$menezesdev-image-director` → `$imagegen` native → visual review → repository asset.
- Repo-local art-direction skill: `.agents/skills/menezesdev-image-director/SKILL.md`.
- Native ImageGen is available and does not require `OPENAI_API_KEY` or separate OpenAI API billing.
- The project-local `menezesdev_image` MCP configuration and its versioned example are disabled.
- `tools/mcp-image/` remains as a clearly deprecated historical implementation and is outside the active workflow.
- Useful historical rules were preserved: briefing order, project identity, naming, negative space, references, overwrite protection, auditable prompts, metadata and desktop/mobile review.
- The first native asset exists at `public/assets/demos/m47/m47-hero.webp`, with `1536×960` dimensions, exact 16:10 ratio, WebP format and status `generated`.
- Sidecars exist at `m47-hero.prompt.md` and `m47-hero.meta.json`; SHA-256 is `02da87e3542740e62091ba3589ff989d106505e744f26babd7a1a10ecb0fce49`.
- One candidate was generated and passed high-detail review; no targeted edit was required.
- There is no M47 frontend component yet. A future 4:5 mobile crop should bias the image toward the center-right at approximately 65–70% horizontal position.
- No OpenAI Image API call, API key, browser automation, Canva generation, stock or placeholder was used.

## Next logical step

1. Implement the M47 hero component using the generated asset and HTML copy.
2. Set responsive image positioning to preserve the center-right action on mobile.
3. Validate the real page on desktop and mobile, then promote metadata from `generated` only when the layout passes.
