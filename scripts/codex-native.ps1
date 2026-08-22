[CmdletBinding()]
param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$CodexArgs
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command codex -ErrorAction SilentlyContinue)) {
    throw "Codex CLI não foi encontrado no PATH."
}

& codex @CodexArgs
exit $LASTEXITCODE
