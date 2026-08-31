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

### MenezesDev Tools — mandatory workflow verification gate

For **every** MenezesDev Tools task, the legacy commercial-site context above is not sufficient. Before any Tools decision, research action, dependency selection, specification, plan, code change, review, merge, deployment, autonomous-system change or status claim, read in this order from the exact branch/ref being worked on:

1. `docs/context/TOOLS_STATE.md`
2. `docs/context/TOOLS_DECISIONS.md`
3. `docs/context/TOOLS_HANDOFF.md`
4. `docs/tools/IMMUTABLE_WORKFLOW.md` **in full**
5. every binding file under `docs/tools/workflow-addenda/` in chronological/lexical order
6. `docs/tools/SECURITY_POLICY.md` when security, inputs, dependencies, runtime, traffic, Ads or compute cost are involved
7. `docs/tools/AUTONOMOUS_GROWTH_SECURITY.md` when Opportunity Engine, AI editorial, crawling, autonomous publication or Tool Factory behavior is involved
8. `docs/tools/TOOLS_SCOPE.md` and the relevant approved spec/audit documents for the task

Then:

1. verify the current Tools phase, its status, prerequisites and exit gate from the workflow itself;
2. verify repository/branch state instead of relying on chat history, memory, previous summaries or legacy MenezesDev phase numbering;
3. check the proposed action against all higher-precedence workflow invariants;
4. identify which Tools workflow phase/gate authorizes the action before performing it.

**No memory-only execution is permitted for MenezesDev Tools.** Git is the source of truth. If the workflow/addenda cannot be read or their current state is ambiguous, stop the conflicting/uncertain action and report the problem instead of guessing.

Do not confuse the historical commercial-site `Phase 9/10` in `docs/context/STATE.md` with the independent MenezesDev Tools workflow phases.

If a requested action belongs to a later Tools phase whose prerequisites are not closed, do not silently skip ahead.

#### Autonomous-growth authority boundary

The approved Option B allows low-risk autonomous work only inside the explicit whitelist/policy gates recorded in the binding workflow addendum. It does **not** allow an agent or autonomous subsystem to grant itself broader authority.

Autonomous systems may not modify without explicit human authorization:

- `docs/tools/IMMUTABLE_WORKFLOW.md`;
- `docs/tools/workflow-addenda/**`;
- `docs/tools/SECURITY_POLICY.md`;
- `docs/tools/AUTONOMOUS_GROWTH_SECURITY.md`;
- this `AGENTS.md` authority model;
- dependency/license/backend/cost/provider/security boundaries defined as hard stops.

This verification gate is additive and may not be removed, weakened or bypassed for convenience without explicit authorization from Gabriel Menezes.

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

- Update `docs/context/STATE.md` with the current factual state for the legacy/general MenezesDev project when that state materially changed.
- Add durable legacy/general architectural/product choices to `docs/context/DECISIONS.md` when relevant.
- Replace `docs/context/HANDOFF.md` when the legacy/general MenezesDev workstream materially changed.
- For MenezesDev Tools work, update the Tools-specific equivalents instead:
  - `docs/context/TOOLS_STATE.md`
  - `docs/context/TOOLS_DECISIONS.md`
  - `docs/context/TOOLS_HANDOFF.md`

Do not put transient chatter in durable decision logs.

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
