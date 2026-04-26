#!/usr/bin/env bash
# GA4 Data API runReport wrapper.
# Usage: ga-query.sh '{"dateRanges":[...],"metrics":[...],"dimensions":[...]}'
# Requires: GA4_PROPERTY_ID env var (numeric, not measurement G-...)
#           gcloud auth application-default login
set -euo pipefail

PROPERTY_ID="${GA4_PROPERTY_ID:?set GA4_PROPERTY_ID env var (numeric property id, e.g. 123456789)}"
BODY="${1:?pass JSON body as first arg}"

TOKEN="$(gcloud auth application-default print-access-token)"

curl -sS \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -X POST \
  "https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport" \
  -d "$BODY"
