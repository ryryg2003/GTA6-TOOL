# GTA 6 Info Book

A private, phone-first companion app for GTA 6 (owner's personal use, not a public site).
Static React web app (PWA) that reads JSON from `data/`. A scheduled Claude Code session
researches the web every other day and commits new data. Progress lives in the phone's
browser storage.

- Design (the authority): `docs/superpowers/specs/2026-11-22-gta6-info-book-design.md`
- Build plan: `docs/superpowers/plans/2026-11-22-gta6-info-book-v1.md`

## Rules
- Static only: no server, database, accounts, ads or analytics. ~$0/month.
- Research runs on the owner's Claude **Pro** plan: every other day, 1–2 sections per run.
- Every entry has `id, name, section, summary, details?, confidence, sources[], last_verified, image?`.
- Confidence: `confirmed` = official Rockstar source or 2+ independent sources agree;
  `likely` = one reputable source (major outlet or well-kept wiki); `unverified` = single forum/social post.
  Conflicting sources → keep the best-supported value, max `likely`, note the conflict in `details`.
- Unknown stats are `null`. Never guess a number.
- Write facts in our own words with source links. Never paste whole articles.
- Respect robots.txt; no login-only or paywalled pages.
- No Rockstar logos. Base map tiles come from Open GTA 6 Map (CC BY 4.0) via `TILE_URL` in `src/sections/map/pins.ts`; keep its on-map credit visible.
- UI: dark theme, tap targets ≥44px, text ≥16px, ≤3 taps from home to any entry.
- Map coordinates: Open GTA 6 Map units, a 1024 square with y growing south; pins use `x, y` in [0, 1024].
  `location_precision: "unknown"` pins are listed, not drawn. Re-import their locations with `npm run import:map`.

## Before every commit
Run `npm test` and `npm run validate`. Never commit data that fails validation.

## Research sessions
Follow `research/instructions.md` exactly.

## The owner
A beginner who builds with AI. Explain changes in plain English, give copy-paste commands,
and say how to check each thing worked.

## Working preferences
- Before treating something as blocked or impossible, research deeper (extended web search, GitHub for open-licensed data and tools, alternative sources) for a way to do what was asked.
