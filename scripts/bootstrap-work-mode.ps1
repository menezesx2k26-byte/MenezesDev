[CmdletBinding()]
param(
    [switch]$InstallOmniRoute,
    [switch]$InstallHeadroom
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Has-Command([string]$Name) {
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Show-Command([string]$Name) {
    if (Has-Command $Name) {
        try {
            $version = & $Name --version 2>$null | Select-Object -First 1
            Write-Host ("[OK] {0}: {1}" -f $Name, $version)
        }
        catch {
            Write-Host ("[OK] {0}: encontrado" -f $Name)
        }
    }
    else {
        Write-Host ("[--] {0}: não encontrado" -f $Name)
    }
}

Write-Host ""
Write-Host "MenezesDev Work Mode 4.5"
Write-Host "========================"
Write-Host ""

Show-Command "git"
Show-Command "codex"
Show-Command "node"
Show-Command "npm"
Show-Command "omniroute"
Show-Command "uv"
Show-Command "py"
Show-Command "headroom"

if ($InstallOmniRoute) {
    Write-Host ""
    Write-Host "Instalando OmniRoute..."

    if (-not (Has-Command "npm")) {
        throw "npm não está disponível. Instale uma versão compatível do Node.js antes do OmniRoute."
    }

    & npm install -g omniroute
    if ($LASTEXITCODE -ne 0) {
        throw "A instalação do OmniRoute falhou com exit code $LASTEXITCODE."
    }

    Write-Host "[OK] OmniRoute instalado."
}

if ($InstallHeadroom) {
    Write-Host ""
    Write-Host "Instalando Headroom..."

    if (Has-Command "uv") {
        & uv tool install --python 3.13 "headroom-ai[all]"
        if ($LASTEXITCODE -ne 0) {
            throw "A instalação do Headroom via uv falhou com exit code $LASTEXITCODE."
        }
    }
    elseif (Has-Command "py") {
        & py -m pip install --user "headroom-ai[all]"
        if ($LASTEXITCODE -ne 0) {
            throw "A instalação do Headroom via Python falhou com exit code $LASTEXITCODE."
        }
    }
    else {
        throw "Nem uv nem o launcher py foram encontrados. Instale um deles antes do Headroom."
    }

    Write-Host "[OK] Comando de instalação do Headroom concluído."
    Write-Host "Se 'headroom' ainda não aparecer no PATH, reabra o PowerShell e rode o doctor."
}

Write-Host ""
Write-Host "Nenhuma configuração do Codex foi sobrescrita por este script."
Write-Host "Próximo passo: .\scripts\work-mode-doctor.ps1"
