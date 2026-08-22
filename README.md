# MenezesDev

Repositório principal do site e do ambiente de trabalho da MenezesDev.

## Work Mode 4.5

Este repositório usa uma camada operacional pensada para manter o **Codex como agente principal**, sem exigir Claude Code pago e sem adicionar custo obrigatório de API.

Princípios:

- Codex nativo é o caminho padrão.
- OmniRoute é opcional e nunca substitui o Codex silenciosamente.
- Headroom é opcional e entra somente em sessões explicitamente iniciadas com ele.
- Segredos ficam fora do Git (`.env`, chaves e tokens nunca entram no repositório).
- Memória de projeto fica em arquivos explícitos e auditáveis dentro de `docs/context/`.
- Ferramentas experimentais só entram depois de teste e rollback simples.
- Nenhuma dependência paga vira requisito sem aprovação explícita.

Leia `docs/WORK_MODE_4_5.md` antes de alterar a infraestrutura de agentes.
