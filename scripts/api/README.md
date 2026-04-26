# scripts/api/

Thin curl wrappers over Google official APIs. SKILLs invoke these via Bash.

## Auth

One-time login with your personal Google account (the one with GA4 + Search Console access):

```bash
gcloud auth application-default login
```

Saves a refresh token to `~/.config/gcloud/application_default_credentials.json`. No service account, no JSON files in the repo.

## Setup

```bash
cp scripts/api/.env.example scripts/api/.env
# Fill in GA4_PROPERTY_ID (numeric, from GA4 Admin → Property Settings)
chmod +x scripts/api/*.sh
```

## Usage

Skills load the env first:

```bash
set -a; source scripts/api/.env; set +a
bash scripts/api/ga-query.sh '{"dateRanges":[{"startDate":"yesterday","endDate":"yesterday"}],"metrics":[{"name":"activeUsers"}]}'
```

## APIs

- `ga-query.sh` → [GA4 Data API runReport](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport)
- `sc-query.sh` → [Search Console Search Analytics query](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)

If a 401 comes back, the access token expired — re-run `gcloud auth application-default login`.
