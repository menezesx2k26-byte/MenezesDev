[CmdletBinding()]
param(
    [switch]$Learn,

    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$CodexArgs
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command headroom -ErrorAction SilentlyContinue)) {
    throw "Headroom não foi encontrado. Rode bootstrap-work-mode.ps1 -InstallHeadroom ou instale manualmente."
}

if (-not (Get-Command codex -ErrorAction SilentlyContinue)) {
    throw "Codex CLI não foi encontrado no PATH."
}

$wrapArgs = @("wrap", "codex")

if ($Learn) {
    $wrapArgs += "--learn"
}

if ($CodexArgs -and $CodexArgs.Count -gt 0) {
    $wrapArgs += "--"
    $wrapArgs += $CodexArgs
}

& headroom @wrapArgs
exit $LASTEXITCODE
