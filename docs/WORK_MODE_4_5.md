# Work Mode 4.5 — Codex-native, zero mandatory extra cost

## Goal

Build a reliable development environment around Codex without requiring Claude Code or a second paid coding-agent subscription.

## Architecture

```text
                         MenezesDev
                             |
                    +--------+--------+
                    |                 |
             DEFAULT PATH        OPTIONAL PATHS
                    |                 |
              Codex native      +-----+------------------+
                    |           |                        |
                    |       OmniRoute                Headroom
                    |       free/fallback            compression/
                    |       routing                  memory layer
                    |           |                        |
                    +-----------+------------------------+
                                |
                   AGENTS.md + docs/context/
                     explicit project memory
```

The key design choice is separation: optional routing/compression must never make native Codex unavailable.

## Baseline — always enabled

The repository itself provides durable project context through:

- `AGENTS.md` — operating contract.
- `docs/context/STATE.md` — current factual state.
- `docs/context/DECISIONS.md` — durable decisions.
- `docs/context/HANDOFF.md` — session-to-session handoff.

This works with no third-party memory plugin and remains human-auditable.

## Mode A — Native Codex (default)

Run:

```powershell
.\scripts\codex-native.ps1
```

Nothing is proxied. This should remain the known-good path.

## Mode B — OmniRoute (optional free-tier routing)

### Why

OmniRoute exposes an OpenAI-compatible endpoint and supports a Codex launcher that injects the provider for that process instead of replacing the user's normal Codex configuration.

### Install

```powershell
npm install -g omniroute
```

Start it in a separate terminal:

```powershell
omniroute
```

Then open the local dashboard at:

```text
http://localhost:20128
```

Connect only providers you are comfortable sending project context to.

### Launch Codex through OmniRoute

```powershell
.\scripts\codex-omniroute.ps1
```

Optional named OmniRoute profile:

```powershell
.\scripts\codex-omniroute.ps1 -Profile "my-profile"
```

Codex arguments can be passed after the script parameters:

```powershell
.\scripts\codex-omniroute.ps1 "inspect this repository"
```

The wrapper uses `omniroute launch-codex`, keeping the native Codex path separate.

### Privacy rule

Do not route customer secrets, credentials, private keys, proprietary source, or sensitive client data through arbitrary free providers. Free inference is not the same thing as a uniform privacy policy.

## Mode C — Headroom (optional)

Keep Headroom optional until the current Windows environment passes a smoke test.

Preferred install if `uv` is available:

```powershell
uv tool install --python 3.13 "headroom-ai[all]"
```

Fallback with Python:

```powershell
py -m pip install --user "headroom-ai[all]"
```

Check:

```powershell
headroom doctor
```

Launch:

```powershell
.\scripts\codex-headroom.ps1
```

Enable Headroom learning only intentionally:

```powershell
.\scripts\codex-headroom.ps1 -Learn
```

If anything behaves strangely, return immediately to:

```powershell
.\scripts\codex-native.ps1
```

## Claude-Mem status

Claude-Mem is intentionally **not installed by this baseline**.

Reason: recent Windows/Codex integration issues justify keeping it out of the default path until an isolated smoke test passes on the actual development machine.

The project already has durable context through `docs/context`, so Claude-Mem is an optimization, not a dependency.

## Bootstrap

To inspect prerequisites without installing anything:

```powershell
.\scripts\bootstrap-work-mode.ps1
```

To install OmniRoute:

```powershell
.\scripts\bootstrap-work-mode.ps1 -InstallOmniRoute
```

To install Headroom too:

```powershell
.\scripts\bootstrap-work-mode.ps1 -InstallHeadroom
```

Or both:

```powershell
.\scripts\bootstrap-work-mode.ps1 -InstallOmniRoute -InstallHeadroom
```

## Diagnosis

```powershell
.\scripts\work-mode-doctor.ps1
```

The doctor checks presence/versions of Git, Codex, Node/npm, OmniRoute, Headroom, the local OmniRoute endpoint, and whether the OmniRoute environment variable exists. It never prints the secret value.

## Cost policy

Mandatory additional API cost for the baseline: **R$ 0**.

Important distinction: this does **not** make official OpenAI/Codex API inference unlimited or free. OmniRoute can aggregate free or promotional inference from other providers, subject to each provider's current limits and terms.

## Security checklist

Before enabling any external provider:

1. Read its current data-retention/privacy terms.
2. Never store a real key in Git.
3. Prefer environment variables or OS credential storage.
4. Start with non-sensitive repositories.
5. Verify which model/provider actually served a request.
6. Keep native Codex available as rollback.
