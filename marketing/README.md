# marketing/

Outputs versionados das skills de growth marketing.

## Estrutura

- `ad-experiments.md` — memória append-only dos sub-agents (headline-agent + description-agent). Cada rodada de criativo vira um bloco com hipótese, variações testadas, resultado, aprendizado. **Não editar blocos antigos**, só adicionar no final.
- `weekly-reports/` — gerado por `/relatorio-semanal`. Um arquivo por execução, formato `YYYY-MM-DD.md`.
- `campaign-drafts/` — gerado por `/nova-campanha`. Drafts pra Val revisar antes de subir no Google Ads. Formato `YYYY-MM-DD-<slug>.md`.

## Como roda

Tudo é orquestrado por skills em `.claude/skills/`, que chamam helpers em `scripts/api/`. Auth é via `gcloud auth application-default login` (sua conta Google pessoal, sem service account).

Veja `CLAUDE.md` na raiz pro contexto rápido + skills disponíveis.
