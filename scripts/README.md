# Scripts

| Script | Função |
|---|---|
| `bootstrap-work-mode.ps1` | Detecta pré-requisitos e instala camadas opcionais somente quando solicitado. |
| `work-mode-doctor.ps1` | Diagnóstico sem expor segredos. |
| `codex-native.ps1` | Abre Codex sem proxy/roteador. |
| `codex-omniroute.ps1` | Abre Codex através do launcher zero-config do OmniRoute. |
| `codex-headroom.ps1` | Abre Codex através do Headroom; opcional. |

## Ordem segura de teste

1. `.\scripts\work-mode-doctor.ps1`
2. `.\scripts\codex-native.ps1`
3. Instalar/iniciar OmniRoute e testar `codex-omniroute.ps1`
4. Só depois testar Headroom.
