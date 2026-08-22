[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"

function Has-Command([string]$Name) {
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Check-Command([string]$Name) {
    if (-not (Has-Command $Name)) {
        Write-Host ("[MISSING] {0}" -f $Name)
        return $false
    }

    try {
        $version = & $Name --version 2>$null | Select-Object -First 1
        if ($version) {
            Write-Host ("[OK] {0}: {1}" -f $Name, $version)
        } else {
            Write-Host ("[OK] {0}: encontrado" -f $Name)
        }
    }
    catch {
        Write-Host ("[OK] {0}: encontrado" -f $Name)
    }
    return $true
}

Write-Host ""
Write-Host "MenezesDev Work Mode Doctor"
Write-Host "==========================="
Write-Host ""

$gitOk = Check-Command "git"
$codexOk = Check-Command "codex"
$nodeOk = Check-Command "node"
$npmOk = Check-Command "npm"
$omniOk = Check-Command "omniroute"
$headroomOk = Check-Command "headroom"

Write-Host ""
if ($env:OMNIROUTE_API_KEY) {
    Write-Host "[OK] OMNIROUTE_API_KEY está definida (valor oculto)."
} else {
    Write-Host "[INFO] OMNIROUTE_API_KEY não está definida."
}

if ($omniOk) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:20128" -UseBasicParsing -TimeoutSec 2
        Write-Host ("[OK] OmniRoute local respondeu em localhost:20128 (HTTP {0})." -f $response.StatusCode)
    }
    catch {
        Write-Host "[INFO] OmniRoute está instalado, mas o dashboard local não respondeu em localhost:20128."
        Write-Host "       Se quiser usá-lo, abra outro PowerShell e rode: omniroute"
    }
}

if ($headroomOk) {
    Write-Host ""
    Write-Host "Headroom detectado. Doctor do Headroom:"
    try {
        & headroom doctor
    }
    catch {
        Write-Host "[WARN] headroom doctor não concluiu com sucesso."
    }
}

Write-Host ""
Write-Host "Resumo"
Write-Host "------"

if ($codexOk) {
    Write-Host "[READY] Codex nativo pode ser o caminho padrão."
} else {
    Write-Host "[BLOCKED] Codex CLI não foi encontrado."
}

if ($omniOk) {
    Write-Host "[OPTIONAL] OmniRoute disponível."
} else {
    Write-Host "[OPTIONAL] OmniRoute ainda não instalado."
}

if ($headroomOk) {
    Write-Host "[OPTIONAL] Headroom disponível para smoke test."
} else {
    Write-Host "[OPTIONAL] Headroom ainda não instalado."
}

Write-Host ""
Write-Host "Claude-Mem: propositalmente fora do baseline."
Write-Host "Este doctor não imprime segredos nem altera config do Codex."
