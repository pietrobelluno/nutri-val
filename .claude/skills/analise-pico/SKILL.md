---
name: analise-pico
description: Analisa um pico de tráfego no site — compara um dia X com o baseline dos 7 dias anteriores, mostra fontes que explodiram (ex.: post de influencer no Instagram), top páginas, hora de pico, e taxa de conversão (cliques no WhatsApp). Use quando alguém pedir "analisa o pico de [data]" ou "ontem teve influencer, quanta gente veio".
---

# /analise-pico [data]

Caso de uso típico: alguém marcou Val no Instagram ontem; queremos saber se trouxe gente, de onde, e se converteu.

## Setup (uma vez)

```bash
cd <repo root>
set -a; source scripts/api/.env; set +a
```

Se `scripts/api/.env` não existe, copiar de `.env.example` e preencher `GA4_PROPERTY_ID` (numeric, do GA4 Admin → Property Settings).

## Passo 1 — Definir datas

- Se o usuário deu data explícita (`/analise-pico 2026-04-25`), use essa
- Se não, default = **ontem** (`date -v-1d +%Y-%m-%d` em macOS, `date -d 'yesterday' +%Y-%m-%d` em Linux)
- `BASELINE_END = DATA - 1 dia`, `BASELINE_START = DATA - 7 dias`

## Passo 2 — Query do dia X

```bash
bash scripts/api/ga-query.sh '{
  "dateRanges":[{"startDate":"<DATA>","endDate":"<DATA>"}],
  "metrics":[
    {"name":"activeUsers"},
    {"name":"sessions"},
    {"name":"screenPageViews"}
  ],
  "dimensions":[
    {"name":"sessionSource"},
    {"name":"sessionMedium"}
  ]
}'
```

Em paralelo, pegue conversões (cliques no WhatsApp) do dia:

```bash
bash scripts/api/ga-query.sh '{
  "dateRanges":[{"startDate":"<DATA>","endDate":"<DATA>"}],
  "metrics":[{"name":"eventCount"}],
  "dimensions":[
    {"name":"eventName"},
    {"name":"customEvent:destination"}
  ],
  "dimensionFilter":{
    "filter":{
      "fieldName":"eventName",
      "stringFilter":{"value":"outbound_click"}
    }
  }
}'
```

E hora de pico + páginas mais vistas:

```bash
bash scripts/api/ga-query.sh '{
  "dateRanges":[{"startDate":"<DATA>","endDate":"<DATA>"}],
  "metrics":[{"name":"activeUsers"}],
  "dimensions":[{"name":"hour"},{"name":"pagePath"}]
}'
```

## Passo 3 — Query do baseline

Mesmas três queries, mas com `"startDate":"<BASELINE_START>","endDate":"<BASELINE_END>"`. Divida totais por 7 pra ter média diária.

## Passo 4 — Análise

Compute:
- **Total visitantes dia X** vs **média diária baseline** → % de variação
- **Por fonte**: pra cada `sessionSource/sessionMedium`, dia X vs média baseline. Marque com 🔥 quando dia X ≥ 3× baseline (provável "pico de fonte")
- **Sinal de influencer**: se `referral / l.instagram.com` ou `social / instagram` explodiu, destaque explicitamente "→ provável post de influencer no Instagram"
- **Conversão**: cliques `outbound_click` com `destination=whatsapp` ÷ activeUsers do dia
- **Comparação de conversão**: a taxa do dia X bate com a taxa média do baseline?

## Passo 5 — Output

Imprimir resumo no chat (não criar arquivo a menos que peçam):

```
## Análise — <DATA>

**Tráfego**: X visitantes (vs média 7d: Y) → +Z%
**Hora de pico**: HH:00 (N usuários nessa hora)

**Fontes** (vs baseline):
🔥 instagram / referral — 142 (vs 8 média) — 17.7×  ← provável post de influencer
   google / organic — 23 (vs 25 média) — −8%
   (direct) — 15 (vs 12 média) — +25%

**Top páginas hoje**:
1. / — 89 views
2. /en/ — 34 views

**Conversão**:
12 cliques WhatsApp / 180 visitantes = 6.7% (vs baseline 4.2% → +60%)

**Insight**: post da @influencer trouxe ~140 visitantes extras, com conversão acima do normal — vale dar um abraço/repostar.
```

## Erros comuns

- **401 Unauthorized**: token expirou → `gcloud auth application-default login`
- **403 Permission denied**: sua conta Google não tem acesso à property GA4 → adicionar como Viewer no GA4 Admin
- **Custom dimension `customEvent:destination` não retorna**: a dimension precisa estar registrada como custom dimension no GA4 Admin → Custom definitions. Se não estiver, a query acima não filtra por `destination=whatsapp` — fallback: contar todos os `outbound_click` e mostrar nota.
