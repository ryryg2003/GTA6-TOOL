# GTA 6 Info Book: Design

Date: 2026-11-22
Status: approved by owner 2026-11-22
Repo: github.com/ryryg2003/GTA6-TOOL (private)

## 1. Intent

A private, phone-first companion app for Grand Theft Auto VI that the owner uses while playing. It gathers guides, stats, map locations, missions, codes and secrets from across the web into one clickable "info book". It also tracks the owner's own progress, which public guide sites can't do.

The owner first wanted an ad and affiliate site. They changed it to a personal app after we found that rewritten scraped content breaks Google's "scaled content abuse" policy and ad network approval rules. This is a personal tool, not a business, and nothing here is published to attract traffic.

Context: GTA 6 was scheduled for release on November 19, 2026, on PS5 and Xbox Series X|S. PC is rumored for 2027. Community knowledge will grow quickly over the first weeks, so the data has to keep updating.

## 2. Goals

- Answer "where is X / how do I do Y / which gun or car is best" in a few taps, one-handed on a phone.
- Cover the game broadly. Version 1 has five sections, and the rest are added in later versions (section 6).
- Update itself daily with no manual work from the owner.
- Show where every fact came from, and how sure we are of it.
- Track personal progress: missions done, collectibles found, trophies earned.

## 3. Non-goals

- Not a public website. No SEO, ads, affiliate links, sign-up or user accounts.
- No real-time updates. Daily is enough.
- No game modding, memory reading, save-file editing or anything that touches the game itself.
- No GTA Online content in v1. It launches separately.

## 4. Anti-goals (the project counts as a failure if these happen, even if the code works)

- **Confident wrong info.** A single unverified forum claim shown as fact sends the owner on a wild goose chase. Uncertainty must be visible.
- **Stale data with no warning.** Every entry shows when it was last checked.
- **Lost progress.** The owner loses their checkmarks to a cleared browser with no backup option.
- **Hard to use mid-game.** The owner needs more than three taps to reach a common answer, or the text is too small to read on a phone.
- **Maintenance burden.** The owner is a beginner, so the system must not need regular code fixes to keep working.

## 5. Constraints

- The owner is a beginner who builds with AI. Prefer simple, popular tools over clever ones.
- Budget: close to $0 a month. Hosting must be free. Research runs on the owner's existing Claude plan, not a pay-per-use API key.
- Research must stay inside the plan's usage limits (section 9.4).
- Polite web access: follow each site's robots.txt rules, stay out of login-only and paywalled pages, and keep request rates low.
- Store facts as short summaries in our own words, with a link to the source. Never paste whole articles. This is good practice even for a private app, and it keeps the data compact.
- No Rockstar logos. In-game map art and screenshots are acceptable for this private app, but must be easy to swap out.

## 6. Sections

### Version 1
1. **Map:** a zoomable game map with pin categories that toggle on and off: drugs, collectible cards, money bags, stores, paint and spray shops, mechanics, garages and safe codes. The category list is data-driven, so new categories need no code changes.
2. **Progress Tracker:** checklists of missions, collectibles and trophies, with completion percentages. It is linked to the map, so checking a pin there checks it here too.
3. **Weapons:** a sortable list (damage, fire rate, range, accuracy, clip, price) and a detail page with where to get each weapon. Any two weapons can be compared side by side.
4. **Cars:** the same pattern as weapons: top speed, acceleration, handling, braking, seats, price, where to find, and comparison.
5. **Missions & Guides:** story missions in order, plus side missions. Each gets an objective, a short walkthrough, tips, any missable items, and its rewards.

### Later versions (in rough priority order)
Trophies & Achievements, Money Methods (sortable by estimated dollars per hour), Secret Events, Character Stats, Properties & Businesses, Beginner Tips, Cheats (if the game has them), Clothing & Customization, Characters, Activities & Side Hustles, Easter Eggs & Mysteries (theories kept separate from confirmed secrets), Updates & Patch Notes, and GTA Online.

### Present everywhere
- A search bar on every screen covering all sections, with typo-tolerant matching ("stingr" finds Stinger).
- Every entry shows its confidence badge, its last-checked date, and links to its sources.

## 7. Approaches considered

| | Approach | Trade-off | Decision |
|---|---|---|---|
| **A** | **Claude Code as researcher.** A daily scheduled Claude Code cloud session searches the web, reads pages, cross-checks facts and commits clean data files to the repo. The app only displays those files. | No extra bill, and it handles messy pages well. Limited by the Claude plan's usage, and updates daily rather than live. | **Chosen by owner** |
| B | Custom Python scraper plus Claude API, run on a timer. | Independent of the plan, but about $2–$10/month in API costs, and it breaks when sites change their layout. Too much maintenance for a beginner. | Rejected |
| C | Owner pastes links, Claude organizes them. | Cheapest, but far too slow for broad coverage. | Rejected |

## 8. Decided parts of the how

- **Data approach A** (above), chosen by the owner.
- **Phone-first web app** that can be added to the home screen (a PWA). This was my proposal and the owner accepted it.
- **Browse-first navigation** with a section list on the home screen. The owner asked for "a clickable guide with different sections".
- **The section list and map categories in section 6**, as the owner listed them.
- **Progress is stored on the device**, with a backup and restore button (section 9.5).

## 9. Design detail

### 9.1 Architecture

```
 Daily scheduled Claude Code session (cloud)
   │  reads research/instructions.md + research/sources.md
   │  web search + fetch → extract facts → cross-check
   │  writes data/*.json, appends data/changelog.json
   └─ commits to main
          │
          ▼
 GitHub repo (private) ── auto-deploy on push ──▶ Free static host
                                                     │
                                                     ▼
                                          Owner's phone (PWA)
                                          progress saved on the device
```

There is no server and no database server. The app is a static site that reads JSON files checked into the repo.

### 9.2 Tech stack (builder's call, chosen for beginner-friendliness)
- Vite + React + TypeScript.
- Leaflet with `CRS.Simple` for an image-based zoomable map.
- Fuse.js for typo-tolerant search.
- A PWA plugin so the app works offline once loaded, which also helps with weak console-room Wi-Fi.
- Hosting: a free static host that deploys from a private GitHub repo (Cloudflare Pages, Vercel or Netlify). GitHub Pages is ruled out because free accounts need a public repo for it.

### 9.3 Data model

Every entry, in every section, shares these base fields:

```json
{
  "id": "weapon-pistol-mk1",
  "name": "Pistol",
  "section": "weapons",
  "summary": "One or two sentences in our own words.",
  "details": "Optional longer text, our own words.",
  "confidence": "confirmed | likely | unverified",
  "sources": [{ "url": "https://...", "title": "...", "accessed": "2026-11-22" }],
  "last_verified": "2026-11-22",
  "image": "optional path or URL"
}
```

On top of the base fields, each section has its own:
- **weapon:** category, damage, fire_rate, range, accuracy, clip_size, price, unlock_how. A stat is a 0–100 number when the game shows bars. A field is `null` when it is unknown; the field is never guessed.
- **vehicle:** class, top_speed_mph, acceleration, handling, braking, seats, price, where_to_find.
- **mission:** type (story/side), order, giver, objective, steps[], tips[], missables[], rewards, unlocks[].
- **map_pin:** category, x, y, location_precision (`exact` | `approximate`), area_name, how_to_reach, code (for safes).
- **trackable items:** any entry the Progress Tracker can check off (missions, pins, trophies) has a stable `id`, and progress is stored by that id.

One JSON file per section lives in `data/`. `data/categories.json` defines map pin categories (id, label, icon, color). `data/changelog.json` records what each research run added or changed.

**Confidence rules:**
- `confirmed`: an official Rockstar source, or two or more independent sources that agree.
- `likely`: one reputable source, such as a major outlet or a well-maintained wiki.
- `unverified`: a single forum or social post. Shown with a visible warning badge.
- When sources conflict, keep the most-supported value, set confidence to at most `likely`, and note the conflict in `details`.

### 9.4 Research job

- **Instructions** live in the repo at `research/instructions.md`. That file is the scheduled task's real prompt, so the owner can tune behavior without touching the scheduled task itself.
- **Source list** in `research/sources.md`: a ranked short list (for example Rockstar Newswire, the GTA Fandom wiki, r/GTA6, GameFAQs, and the major guide outlets) plus permission to use web search beyond it. Each source is marked by trust level.
- **Rotation to stay inside usage limits:** each run covers one or two sections plus a quick "what's new" sweep, cycling through all sections over the week. The interval is configurable, and runs drop to every other day if limits are hit.
- **Each run:** reads existing data, searches, extracts facts, merges by `id` without duplicates, updates `last_verified` on re-confirmed entries, validates JSON against the schema, appends to the changelog, then commits. A run that fails validation commits nothing.
- **First fill (builder's call):** before the daily rotation starts, one larger research pass seeds all five v1 sections, plus the trophy list the Progress Tracker needs. It may be split across several sessions.
- **Validation:** a small script (`npm run validate`) checks every data file against the schema. The research job must run it before committing.

### 9.5 Map

- **Base image:** the builder's call. Use the best available full-map image (a community-assembled map or one stitched from screenshots), cut into tiles if it's large. Until one exists, use a placeholder map with named regions so pins can still be placed approximately.
- **Coordinates problem:** web sources usually describe locations in words ("behind the gas station in Port Gellhorn"), not coordinates. The research job places these at the center of the named area with `location_precision: approximate`, and the app draws them with a dashed outline. Sources with real coordinates or map screenshots get `exact`.
- **Owner correction (builder's call):** the owner can long-press a pin to drag it to the right spot. The correction is saved on the device, so pins get more accurate as the owner plays.
- **Pin tap:** a bottom sheet shows the name, confidence badge, how to reach it, any code, an image, sources, and a "found it" toggle.
- **Filters:** a category toggle list and a "hide found" switch.

### 9.6 Progress storage
- Saved in the browser's local storage on the device, keyed by entry `id`.
- **Backup and restore** in settings: export progress as a file, and import it back. A banner reminds the owner to back up if they haven't in 14 days.
- No accounts and no cloud sync in v1.

### 9.7 UI rules
- Large tap targets and readable text at arm's length. Dark theme by default, for TV rooms.
- At most three taps from the home screen to any entry.
- List screens get sort and filter controls. Detail screens use the same layout within a section.

## 10. What's left to the builder
- The exact file and folder layout, component structure, and styling.
- Which free static host to use, from the three listed.
- Map image sourcing and tiling.
- Exact stat scales where the game's UI is unclear.
- The rotation schedule details.

## 11. Owner answers
- Repo: `ryryg2003/GTA6-TOOL`.
- Claude plan: **Pro**. Research runs **every other day** by default, one or two sections per run. If runs hit usage limits, narrow each run before cutting frequency further. The first fill (9.4) is split across several sessions spread over a few days.
