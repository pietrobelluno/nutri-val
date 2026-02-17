# Nutri-Val — Progress

## Current Status
**Phase**: Polish & refinements
**Last Updated**: 2026-02-17
**Live URL**: https://pietrobelluno.github.io/nutri-val/

## In Progress
- [ ] cat-quote.png background removal (user mentioned Gemini didn't remove it)

## Next Session Should
- Remove background from cat-quote.png
- Test Dynamic Island fix on real iPhone
- Consider adding lazy loading audit
- Any additional content/design tweaks from Val

---

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
