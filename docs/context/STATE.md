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

## Image pipeline — Etapa 4.5 / Fase 2

- MCP transport: local STDIO.
- Runtime: Node.js 22+ / TypeScript / ESM / pnpm.
- Tools implemented: `generate_hero_image`, `edit_image_asset`.
- Default real-generation model: `gpt-image-2`.
- `dry_run` works without `OPENAI_API_KEY` and must be used before the first paid call of a category.
- Workspace safety includes allowlisted paths, path-traversal protection, SVG blocking, overwrite protection, transactional writes and SHA-256 metadata.
- `gpt-image-2` transparency is blocked by the current implementation because the current API contract rejects transparent backgrounds.
- No paid generation has been executed yet.

## Next logical step

1. On the development machine, run `scripts/work-mode-doctor.ps1` and confirm native Codex works.
2. In `tools/mcp-image`, run `pnpm install` and `pnpm check`.
3. Copy `.codex/config.example.toml` to `.codex/config.toml` and set the absolute repository path.
4. Set `IMAGEGEN_WORKSPACE_ROOT` to the same repository root.
5. Execute the first `generate_hero_image` with `dry_run: true` for `public/assets/demos/m47/m47-hero.webp`.
6. Review `prompt_preview` before authorizing any paid generation.
