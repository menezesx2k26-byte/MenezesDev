# MenezesDev — Agent Operating Contract

## Mission

Work on this repository as a production-oriented engineering agent. Keep the site shippable, the architecture understandable, and the operating cost low.

## Before changing anything

Read, in this order:

1. `docs/context/STATE.md`
2. `docs/context/DECISIONS.md`
3. `docs/context/HANDOFF.md`
4. `docs/WORK_MODE_4_5.md`

Then inspect the repository and verify assumptions from code before editing.

## Operating rules

- **Codex native is the default execution path.**
- Never silently switch the project to OmniRoute, Headroom, Claude Code, or another provider.
- OmniRoute and Headroom are opt-in launch modes only.
- Do not make Claude Code or any paid AI subscription a project requirement.
- Prefer free/open-source or already-paid infrastructure when it is technically adequate.
- Never commit API keys, tokens, passwords, cookies, private certificates, `.env` files, or customer secrets.
- If an operation is clearly low-risk and logically superior, execute it and report what changed instead of asking for needless confirmation.
- Ask for a decision only when the choice is genuinely ambiguous, destructive, paid, privacy-sensitive, or materially changes product scope.
- Do not invent success. Run relevant tests/builds/lints when available and report failures precisely.
- Avoid unrelated refactors while implementing a focused task.
- Preserve rollback paths for infrastructure changes.

## Project memory

At the end of a meaningful session:

- Update `docs/context/STATE.md` with the current factual state.
- Add durable architectural/product choices to `docs/context/DECISIONS.md`.
- Replace `docs/context/HANDOFF.md` with a concise handoff containing:
  - completed,
  - current state,
  - next logical step,
  - blockers/risks,
  - commands/tests run.

Do not put transient chatter in `DECISIONS.md`.

## Tooling policy

### Image assets

Quando um asset raster definido no briefing não existir, use `$menezesdev-image-director` e `$imagegen`. Não use OpenAI Image API, `OPENAI_API_KEY`, MCP de imagem, navegador, stock genérico, gradientes, blobs ou placeholders como substituto. Logos, diagramas, gráficos e UI exata devem ser construídos como SVG ou frontend. Screenshots devem vir da implementação real.

### Native Codex
Use by default:
`./scripts/codex-native.ps1`

### OmniRoute
Use only when free-tier routing/fallback is intentionally desired:
`./scripts/codex-omniroute.ps1`

Do not rewrite the user's normal Codex config merely to use OmniRoute. Prefer the zero-config launcher.

### Headroom
Treat as optional until validated on the current Windows/Codex installation:
`./scripts/codex-headroom.ps1`

### Claude-Mem
Not part of the baseline. Recent Windows/Codex integration issues justify keeping it deferred until an isolated smoke test passes.

## Quality gate

Before declaring a task complete, check the relevant subset of:

- typecheck
- lint
- unit/integration tests
- production build
- broken links/routes
- responsive layout
- accessibility basics
- secrets accidentally staged in Git
- Cloudflare/GitHub deployment configuration when touched
