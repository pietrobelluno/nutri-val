# Nutri-Val — Claude Code context

Site da Valéria Schumann, nutricionista em Caxias do Sul (RS). Estático (HTML/CSS/JS), GitHub Pages → `valeriaschumann.com.br`. Versões PT (`/`) e EN (`/en/`).

## Conversão = clique no WhatsApp

Número: `+55 54 99606-0202` (`5554996060202` no link `wa.me`).
Evento GA4: `outbound_click` com dimensões `destination`, `link_url`, `link_text`, `link_location`. Disparado em `js/main.js:352-379` pra qualquer link de WhatsApp ou Instagram.

## Analytics

- GA4 measurement ID: `G-0MT8F76G0W` (snippet em `index.html:34-41` e `en/index.html:35-42`)
- GA4 numeric property ID (pra Data API): em `scripts/api/.env` (variável `GA4_PROPERTY_ID`). Não é o measurement.
- Search Console: `https://valeriaschumann.com.br`

### Auth (uma vez)

```bash
brew install --cask google-cloud-sdk    # se não tiver
gcloud auth application-default login   # login com a conta Google que tem acesso ao GA4 da Val
gcloud services enable analyticsdata.googleapis.com searchconsole.googleapis.com
```

Sem service account. Refresh token fica em `~/.config/gcloud/application_default_credentials.json`.

### Helpers

- `scripts/api/ga-query.sh '<JSON body>'` → GA4 Data API runReport
- `scripts/api/sc-query.sh '<JSON body>'` → Search Console searchAnalytics.query

Skills carregam env antes: `set -a; source scripts/api/.env; set +a`.

## Persona / tom da Val

- Mulheres 25-45, Caxias do Sul + região (e online pro mundo todo)
- Querem nutrição sustentável, sem dieta restritiva
- Tom acolhedor, ciência + comida real, sem promessa milagrosa
- CRN2 12907P (registro real)
- Casual but professional — pode falar primeira pessoa, sem ser infantil

## Skills disponíveis

- `/analise-pico [data]` — analisa pico de tráfego (default ontem) vs baseline 7d. Caso de uso: "influencer marcou Val no Insta — quem veio? converteu?"
- `/relatorio-semanal` — snapshot semanal (GA4 + Search Console), salva em `marketing/weekly-reports/`
- `/oportunidade-seo` — queries do Search Console em pos 5-15 com sugestões on-page
- `/nova-campanha [keyword]` — orquestra `headline-agent` + `description-agent`, salva draft em `marketing/campaign-drafts/` e atualiza memória em `marketing/ad-experiments.md`

## Sub-agents

- `headline-agent` — escreve headlines Google Ads PT-BR ≤30 chars
- `description-agent` — escreve descriptions Google Ads PT-BR ≤90 chars

Ambos leem `marketing/ad-experiments.md` antes de gerar (memória append-only) pra não repetir o que não performou.

## Outputs versionados

- `marketing/ad-experiments.md` — memória dos sub-agents (append-only)
- `marketing/weekly-reports/YYYY-MM-DD.md`
- `marketing/campaign-drafts/YYYY-MM-DD-<slug>.md`

## Code style

- Vanilla HTML/CSS/JS — sem build, sem deps. Mantenha assim.
- Edições no PT (`index.html`) **espelhar no EN** (`en/index.html`) e vice-versa, salvo o switcher e i18n strings.
- Imagens em `assets/images/` PNG; lazy loading nos não-críticos.

## Fora de escopo dessa iteração (próximas)

- Google Ads API (write) — espera ela investir em mídia paga; Developer Token leva 1-2 dias úteis
- Meta Pixel + Meta Marketing API — Pixel ID pendente da Val
- BigQuery export do GA4 — abre quando tiver histórico que justifique SQL pesado
- Google Business Profile — paralelo, fora do Claude
