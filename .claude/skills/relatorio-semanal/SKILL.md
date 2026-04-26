---
name: relatorio-semanal
description: Gera relatório semanal do site Valéria Schumann — puxa GA4 + Search Console dos últimos 7 dias, compara com a semana anterior, e grava em marketing/weekly-reports/YYYY-MM-DD.md. Use quando pedirem "relatório da semana", "como foi a semana", "/relatorio-semanal".
---

# /relatorio-semanal

Snapshot semanal: tráfego, fontes, conversões (clique WhatsApp), top queries de busca. Salva em `marketing/weekly-reports/`.

## Setup

```bash
cd <repo root>
set -a; source scripts/api/.env; set +a
```

## Passo 1 — Definir janelas

- `END = ontem` (`date -v-1d +%Y-%m-%d`)
- `START = END - 6 dias` (7 dias inclusive)
- `PREV_END = START - 1 dia`, `PREV_START = PREV_END - 6 dias` (semana anterior pra comparação)
- `REPORT_DATE = hoje` (vai no nome do arquivo)

## Passo 2 — Queries GA4 (semana atual)

**Visão geral**:
```bash
bash scripts/api/ga-query.sh '{
  "dateRanges":[{"startDate":"<START>","endDate":"<END>"}],
  "metrics":[
    {"name":"activeUsers"},
    {"name":"sessions"},
    {"name":"screenPageViews"},
    {"name":"engagementRate"}
  ]
}'
```

**Por fonte**:
```bash
bash scripts/api/ga-query.sh '{
  "dateRanges":[{"startDate":"<START>","endDate":"<END>"}],
  "metrics":[{"name":"activeUsers"},{"name":"sessions"}],
  "dimensions":[{"name":"sessionSource"},{"name":"sessionMedium"}],
  "orderBys":[{"metric":{"metricName":"activeUsers"},"desc":true}],
  "limit":20
}'
```

**Conversões (cliques WhatsApp)**:
```bash
bash scripts/api/ga-query.sh '{
  "dateRanges":[{"startDate":"<START>","endDate":"<END>"}],
  "metrics":[{"name":"eventCount"}],
  "dimensions":[{"name":"eventName"},{"name":"sessionSource"}],
  "dimensionFilter":{
    "filter":{"fieldName":"eventName","stringFilter":{"value":"outbound_click"}}
  }
}'
```

**Top páginas**:
```bash
bash scripts/api/ga-query.sh '{
  "dateRanges":[{"startDate":"<START>","endDate":"<END>"}],
  "metrics":[{"name":"screenPageViews"}],
  "dimensions":[{"name":"pagePath"}],
  "orderBys":[{"metric":{"metricName":"screenPageViews"},"desc":true}],
  "limit":10
}'
```

## Passo 3 — Queries GA4 (semana anterior, mesma estrutura)

Reusa os bodies do Passo 2 trocando `<START>`/`<END>` por `<PREV_START>`/`<PREV_END>`. Suficiente repetir só visão geral + conversões pra ter os números de comparação.

## Passo 4 — Search Console

```bash
bash scripts/api/sc-query.sh '{
  "startDate":"<START>",
  "endDate":"<END>",
  "dimensions":["query"],
  "rowLimit":15
}'
```

E por página:
```bash
bash scripts/api/sc-query.sh '{
  "startDate":"<START>",
  "endDate":"<END>",
  "dimensions":["page"],
  "rowLimit":10
}'
```

## Passo 5 — Gerar relatório

Calcule % variação semana atual vs anterior pra: visitors, sessions, engagement rate, total cliques WhatsApp.

Escrever `marketing/weekly-reports/<REPORT_DATE>.md`:

```markdown
# Relatório semanal — semana de <START> a <END>

## Resumo
- **Visitantes**: N (vs N-1 → ±X%)
- **Sessões**: N (vs N-1 → ±X%)
- **Pageviews**: N
- **Engagement rate**: X% (vs X% → ±Y pp)
- **Cliques WhatsApp**: N (vs N-1 → ±X%) — taxa de conversão Y%

## Fontes que mais trouxeram gente
| Fonte / Medium | Visitantes | Cliques WhatsApp | Taxa conv |
|---|---:|---:|---:|
| google / organic | ... | ... | ...% |
| (direct) | ... | ... | ...% |
| instagram / referral | ... | ... | ...% |

## Top páginas
1. / — N views
2. /en/ — N views
...

## Queries do Google que trouxeram tráfego
| Query | Clicks | Impressões | CTR | Posição |
|---|---:|---:|---:|---:|
| nutricionista caxias do sul | ... | ... | ...% | X.X |
...

## 3 ações sugeridas pra próxima semana
1. ...
2. ...
3. ...
```

As "3 ações sugeridas" devem ser concretas e curtas — o que dá pra fazer essa semana, não roadmap eterno. Exemplos típicos:
- "Query X em pos 8.2 com 120 impressões — refinar título da página `/sobre`"
- "Instagram não trouxe ninguém essa semana — postar 1 vez sobre [tema da query top]"
- "Conversão caiu de Y% pra X% — checar se o link do WhatsApp tá funcionando em mobile"

## Erros comuns

- **401**: re-rodar `gcloud auth application-default login`
- **Search Console retorna vazio**: domínio talvez não verificado lá, ou propriedade configurada como `https://valeriaschumann.com.br/` (com barra) vs sem. Tentar variantes.
