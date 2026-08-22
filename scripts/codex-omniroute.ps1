[CmdletBinding()]
param(
    [string]$Profile,

    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$CodexArgs
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command omniroute -ErrorAction SilentlyContinue)) {
    throw "OmniRoute não foi encontrado. Instale com: npm install -g omniroute"
}

if (-not (Get-Command codex -ErrorAction SilentlyContinue)) {
    throw "Codex CLI não foi encontrado no PATH."
}

$launchArgs = @("launch-codex")

if ($Profile) {
    $launchArgs += @("--profile", $Profile)
}

if ($CodexArgs -and $CodexArgs.Count -gt 0) {
    $launchArgs += "--"
    $launchArgs += $CodexArgs
}

& omniroute @launchArgs
exit $LASTEXITCODE
