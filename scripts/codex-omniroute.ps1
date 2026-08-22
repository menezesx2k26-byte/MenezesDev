[CmdletBinding()]
param(
    [string]$Profile = "gemini-gemini-2-5-flash",

    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$CodexArgs
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

if (-not (Get-Command omniroute -ErrorAction SilentlyContinue)) {
    throw "OmniRoute não foi encontrado. Instale com: npm install -g omniroute"
}

if (-not (Get-Command codex -ErrorAction SilentlyContinue)) {
    throw "Codex CLI não foi encontrado no PATH."
}

# Load the persistent user-level key into the current process if needed.
if (-not $env:OMNIROUTE_API_KEY) {
    $persistedKey = [Environment]::GetEnvironmentVariable("OMNIROUTE_API_KEY", "User")
    if ($persistedKey) {
        $env:OMNIROUTE_API_KEY = $persistedKey
    }
}

if (-not $env:OMNIROUTE_API_KEY) {
    throw "OMNIROUTE_API_KEY não está definida. Salve-a uma vez com: setx OMNIROUTE_API_KEY \"SUA_CHAVE\""
}

function Test-OmniRouteHealth {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:20128/api/monitoring/health" -UseBasicParsing -TimeoutSec 2
        return $response.StatusCode -eq 200
    }
    catch {
        return $false
    }
}

# Start OmniRoute silently in the background when it is not already running.
if (-not (Test-OmniRouteHealth)) {
    Write-Host "OmniRoute não está rodando. Iniciando em background..."
    & omniroute serve --daemon --no-open | Out-Host

    $ready = $false
    for ($i = 0; $i -lt 30; $i++) {
        Start-Sleep -Seconds 1
        if (Test-OmniRouteHealth) {
            $ready = $true
            break
        }
    }

    if (-not $ready) {
        throw "OmniRoute não ficou saudável em até 30 segundos. Rode 'omniroute serve' manualmente para ver os logs."
    }
}

Write-Host "Repo: $repoRoot"
Write-Host "Perfil OmniRoute: $Profile"

$launchArgs = @("launch-codex", "--profile", $Profile)

# Free-provider profiles may inherit reasoning settings unsupported upstream.
$defaultCodexArgs = @("-c", 'model_reasoning_effort="none"')

if ($CodexArgs -and $CodexArgs.Count -gt 0) {
    $defaultCodexArgs += $CodexArgs
}

$launchArgs += "--"
$launchArgs += $defaultCodexArgs

& omniroute @launchArgs
exit $LASTEXITCODE
