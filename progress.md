# Nutri-Val — Progress

## Current Status
**Phase**: Live PT+EN, exploring marketing MCP stack for client acquisition
**Last Updated**: 2026-04-26
**Live URL**: https://valeriaschumann.com.br (PT) + https://valeriaschumann.com.br/en/ (EN)

## In Progress
- [ ] **Marketing MCP stack planning** — plan written at `~/.claude/plans/gostaria-que-o-site-spicy-taco.md`. Phased approach: GA4 + Search Console (free, read) → keyword research → Google Ads + Meta Ads (paid). Awaiting user decision on scope.
- [ ] Meta Pixel install (still pending — Val to send Pixel ID)
- [ ] Domain verification in Meta Business
- [ ] LGPD cookie notice
- [ ] sitemap.xml update to include `/en/`

## Next Session Should
- **Decide MCP scope**: free-only (Fase 1) vs full stack (Fases 1+2+3 incl. ads)
- If proceeding: install `surendranb/google-analytics-mcp`, set up GCP service account, grant Viewer on GA4 property `G-0MT8F76G0W`
- Verify Search Console ownership of `valeriaschumann.com.br`
- Consider Google Business Profile (no MCP, but #1 channel for local nutritionist)
- Update sitemap.xml to include `/en/` URL

---

### Session 4 (2026-04-26)
**Focus**: English version of site (i18n) + marketing MCP research
**Completed**:
- [x] `/en/index.html` — full English translation, idiomatic not literal, preserving Val's casual tone (cat mom, no food shaming, etc.)
- [x] Hreflang alternates added to both PT and EN pages (pt-BR, en, x-default)
- [x] Language switcher pill (PT|EN) added to navbar — `~20 lines CSS in components.css`, `aria-current="page"` marks active
- [x] EN metadata: title, description, og:locale=en_US, og:locale:alternate=pt_BR, JSON-LD with `inLanguage: en` + English description
- [x] All 4 WhatsApp data-whatsapp messages translated to English ("Hi, Val!" variants)
- [x] `js/main.js` DEFAULT_MESSAGE now lang-aware (reads `document.documentElement.lang`) — falls back to PT, switches to EN if lang starts with "en"
- [x] Marquee strip translated (real food, no food shaming, let's do this, so good, etc.)
- [x] Localization: "Caxias do Sul, Brazil" everywhere in EN (was just city)
- [x] 8 quality tweaks after first pass (e.g., "Shall we get started?" → "Ready to get started?", "highly accurate" → "super accurate")
- [x] Local server verification on port 8766 — both pages 200, all assets reachable
- [x] Pushed to `main` (`22d7452`), GitHub Pages auto-deploys
- [x] Marketing MCP research — found GA4, Google Ads, Search Console, Meta Ads MCPs
- [x] Plan written for phased MCP rollout
**Blockers**:
- Awaiting user decision on MCP scope (free-only vs full stack with ads)
- Context hit 81% mid-planning — session ended before MCP install
**Decisions**:
- **i18n approach**: duplicated HTML at `/en/index.html` (subdirectory) instead of JS-based i18n. Reasoning: static site, no build, hreflang SEO native, zero-JS switcher
- **Asset paths in /en/**: absolute (`/assets/`, `/css/`, `/js/`) so they resolve from root regardless of depth
- **Switcher placement**: in `.navbar__inner` (visible on desktop AND mobile, not hidden behind hamburger) — better UX for multi-language signaling
- **Marquee translated** (not kept in PT) — user choice for consistency over local flavor
- **WhatsApp default**: lang-aware in JS via `document.documentElement.lang` instead of duplicating main.js or hardcoding per page
- **MCP stack philosophy**: read-only/free MCPs first (GA4, Search Console), then keyword research, then paid ads — don't spend without baseline data
**Commits**: 22d7452 (feat: versão em inglês do site /en/ com switcher PT|EN)
**Next**: User answers scope question → install GA4 MCP first

### Session 3 (2026-04-17)
**Focus**: Atendimento online em destaque (pre-influencer campaign), CRN/Insta fixes, GA4 install
**Completed**:
- [x] Instagram URL fix: `valeria.schumann` → `valeria_schumann` (3 locations: JSON-LD, CTA btn, footer)
- [x] CRN2 12907P in footer + JSON-LD founder.identifier
- [x] Hero availability pill: "Presencial em Caxias do Sul ou online pro Brasil inteiro" (butter-light + dashed border + rotated)
- [x] Modality pills (`.modality-pill`) in #consultas and #retornos — Presencial (butter) + Online (black w/ green pulse dot)
- [x] Dedicated online callout block between #consultas and #retornos: "Mora longe? Não tem problema." with 3 cards
- [x] Card 3 emphasizes IA + validação científica + "100% segura" per Val's guidance
- [x] CTA subtitle: "(presencial ou online)" added
- [x] GA4 installed with ID `G-0MT8F76G0W`
- [x] Outbound click tracking in main.js (fires `outbound_click` event for WhatsApp/Instagram with destination/location)
- [x] Provided Val with full tutorial for GA4 + Meta Pixel + ads best practices
**Blockers**: None
**Decisions**:
- Online messaging uses layered approach (hero pill + modality badges + dedicated block + CTA mention) instead of one big new section — preserves page length
- Pulse dot on "Online" pill signals live/available availability without explicit text
- GA4 installed with standard snippet (not GTM) — 2 pixels doesn't warrant GTM complexity yet
- Meta Pixel identified as critical pre-influencer install for future ads optimization
**Commits**: 89f9b1a, 945da53, 6abca1f (Brasil→mundo), e1b8d7d (wording fix: "pro mundo todo" — avoids implying Val travels)

### Session 2 (2026-02-17)
**Focus**: GitHub Pages deploy, gender-neutral text, mobile fixes, image optimization, grammar audit
**Completed**:
- [x] GitHub Pages setup (repo + workflow + deploy)
- [x] Gender-neutral language (diva→bora, juntas→juntos, tranquila→tranquilo)
- [x] Mobile: consultation image above text, badges centered
- [x] Yellow continuity fix (about→cards gradient transition)
- [x] CTA subtitle rewritten (removed "prato dos sonhos")
- [x] Callouts: bold text, assessment cat on top + bigger (140px)
- [x] Removed false post-it about age restrictions
- [x] Fixed speech bubble "Bora!" being cut on mobile
- [x] OG image changed to anthropometric-calipers
- [x] cat-quote.png replaces SVG cat icon in About callout
- [x] Cat callout left-aligned on mobile
- [x] Image compression: 15MB → 2.5MB (removed unused cat.png, favicon.png)
- [x] Dynamic Island fix: body bg cream + viewport-fit cover + safe-area insets
- [x] theme-color → #fffdf5
- [x] Grammar audit: 3 fixes (article, consistency, lowercase)
**Blockers**: None
**Decisions**: Use viewport-fit=cover + env(safe-area-inset-top) for Dynamic Island; cat-quote.png instead of SVG
**Commits**: d06d03d → b516432 (12 commits)

### Session 1 (2026-02-17)
**Focus**: Full site build, accessibility, favicon, content iterations
**Completed**:
- [x] Complete site: HTML/CSS/JS, 9 sections, animations, responsive
- [x] Accessibility overhaul (WCAG): skip link, ARIA, focus trap, reduced motion
- [x] Cross-platform favicon (circular, transparent bg)
- [x] Text iterations (bafo, até 2h, assessment quote, cat callout)
- [x] Welcome-shrug moved to cards section
- [x] Cards responsive: single column until 768px
- [x] Logo text-transform: capitalize
