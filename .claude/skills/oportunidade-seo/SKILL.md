---
name: oportunidade-seo
description: Identifica queries no Search Console em posição 5-15 (página 2 do Google) com impressões relevantes — são as melhores oportunidades de SEO porque pequenos refinamentos de página podem empurrar pra topo. Use quando pedirem "oportunidades de SEO", "/oportunidade-seo", "o que dá pra otimizar".
---

# /oportunidade-seo

Mira nas queries que já trazem gente vendo a página, mas em posição que pouca gente clica (pos 5-15). Pequenos ajustes de título/conteúdo podem migrar pra posição 1-4 e multiplicar cliques.

## Setup

```bash
cd <repo root>
set -a; source scripts/api/.env; set +a
```

## Passo 1 — Janela de análise

Últimos 28 dias (período padrão do Search Console pra dados estáveis):
- `END = ontem`
- `START = END - 27 dias`

## Passo 2 — Pegar queries com posição + página

```bash
bash scripts/api/sc-query.sh '{
  "startDate":"<START>",
  "endDate":"<END>",
  "dimensions":["query","page"],
  "rowLimit":500
}'
```

## Passo 3 — Filtrar oportunidades

Filtrar rows onde:
- `position` entre **5.0 e 15.9** (página 2-ish)
- `impressions` ≥ 50 (ruído baixo, sinal real)
- excluir queries de marca pura (que contêm "valéria schumann", "valeriaschumann", "@valeria_schumann") — essas já estão tudo dominando

## Passo 4 — Ranquear

Pra cada query, calcular **ganho potencial estimado de cliques** se subir pra posição 3:

```
CTR_atual = clicks / impressions
CTR_pos3 ≈ 0.10 (heurística — varia por nicho, mas serve)
ganho_clicks = impressions × (CTR_pos3 − CTR_atual)
```

Ranquear por `ganho_clicks` desc.

## Passo 5 — Output (no chat, não em arquivo)

```
## Top oportunidades de SEO — últimos 28 dias

| Query | Página | Impr | Clicks | CTR | Pos | +cliques se chegar pos 3 |
|---|---|---:|---:|---:|---:|---:|
| nutricionista online | / | 480 | 19 | 4.0% | 7.8 | +29 |
| dieta sem restrição | / | 180 | 5 | 2.8% | 9.2 | +13 |
| nutricionista caxias rs | / | 120 | 8 | 6.7% | 5.4 | +4 |

### Sugestões por query

**"nutricionista online"** (pos 7.8 → potencial pos 3):
- A página `/` cita "online de qualquer lugar do mundo" no callout, mas o `<title>` é "Nutricionista em Caxias do Sul". Adicionar variante "online" no title ou criar landing dedicada `/online/`.
- Conteúdo: a seção atendimento online tem 3 linhas — expandir pra 1-2 parágrafos cobrindo FAQ típico (como funciona, plataforma, fuso, valor).
- Schema: adicionar `Service` JSON-LD com `serviceType: "Online nutrition consultation"`, `availableChannel: { OnlineConferenceAvailable }`.

**"dieta sem restrição"** (pos 9.2):
- Termo cobre intenção informacional (gente pesquisando o que é). Página atual é institucional, não educativa. Considerar criar post curto `/blog/dieta-sem-restricao` (mesmo num site estático, dá pra fazer página única).
...
```

Pra cada query no top 5, dê 2-4 sugestões **concretas e priorizáveis** (mexer em title, expandir conteúdo, schema, criar landing nova).

## Heurística de descarte

Se a página alvo é `/en/` (versão inglesa) e a query é em PT, sugerir corrigir hreflang/redirect — não é oportunidade de conteúdo, é bug de SEO.

## Erros comuns

- **Search Console retorna 403**: conta sem acesso à propriedade. Verificar em Search Console → Settings → Users.
- **Poucas queries com posição 5-15**: site ainda novo, pouco volume. Reportar honestamente que talvez não tenha sinal suficiente ainda; recomendar voltar em 30 dias.
