# Nutri-Val — Progress

## Current Status
**Phase**: Growth prep — influencer campaign incoming
**Last Updated**: 2026-04-17
**Live URL**: https://valeriaschumann.com.br (custom domain) / https://pietrobelluno.github.io/nutri-val/

## In Progress
- [ ] Meta Pixel install (waiting on Val to create + send Pixel ID)
- [ ] Domain verification in Meta Business (needs DNS TXT record after Pixel)
- [ ] LGPD cookie notice (minimal footer line, or banner with opt-out)

## Next Session Should
- Drop Meta Pixel ID in head + fire `Contact`/`Lead` events on WhatsApp click
- Build UTM link for influencer post before she posts
- Verify GA4 real-time shows events after deploy propagates
- Consider adding lazy loading audit

---

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
**Commits**: 89f9b1a

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
