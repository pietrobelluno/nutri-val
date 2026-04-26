#!/usr/bin/env bash
# Search Console Search Analytics query wrapper.
# Usage: sc-query.sh '{"startDate":"...","endDate":"...","dimensions":[...]}'
# Requires: SC_SITE_URL env var (default: https://valeriaschumann.com.br)
#           gcloud auth application-default login
set -euo pipefail

SITE_URL="${SC_SITE_URL:-https://valeriaschumann.com.br}"
BODY="${1:?pass JSON body as first arg}"

TOKEN="$(gcloud auth application-default print-access-token)"
SITE_ENC="$(python3 -c 'import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1],safe=""))' "$SITE_URL")"

curl -sS \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -X POST \
  "https://searchconsole.googleapis.com/webmasters/v3/sites/${SITE_ENC}/searchAnalytics/query" \
  -d "$BODY"
