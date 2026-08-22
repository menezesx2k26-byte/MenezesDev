# Current State

Last updated: 2026-08-22

## Repository

- Project: MenezesDev.
- Work Mode stage: 4.5 bootstrap.
- Primary coding agent: Codex.
- Claude Code subscription: not required.
- Mandatory additional AI API cost target: R$ 0.
- Native Codex must remain the default/rollback path.

## Work Mode

- Repository-level memory: enabled through `AGENTS.md` + `docs/context/`.
- OmniRoute: optional, not assumed installed.
- Headroom: optional, not assumed installed.
- Claude-Mem: deferred from baseline pending a clean Windows/Codex smoke test.
- Secrets: must remain outside Git.

## Next logical step

1. Run `scripts/work-mode-doctor.ps1` on the development machine.
2. Confirm native Codex works.
3. Install/test OmniRoute separately.
4. Test Headroom separately only after native + OmniRoute paths are known-good.
5. Continue the MenezesDev site build using this operational layer.
