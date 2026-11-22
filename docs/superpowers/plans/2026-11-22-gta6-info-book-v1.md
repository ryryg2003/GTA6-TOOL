# GTA 6 Info Book v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a phone-first static web app (PWA) that browses GTA 6 info in five sections (Map, Progress Tracker, Weapons, Cars, Missions & Guides). A Claude Code research job keeps its data fresh by committing JSON files.

**Architecture:** The front end is a static site that reads JSON from `data/`. It has no server or database. Personal progress and map pin corrections live in `localStorage`. Research is a scheduled Claude Code cloud session that follows `research/instructions.md`, writes new entries, merges them with `npm run merge`, validates them with `npm run validate`, and commits. Every push redeploys the site to a free static host.

**Tech Stack:** Vite, React 18, TypeScript, React Router (HashRouter), Leaflet + react-leaflet (CRS.Simple), Fuse.js, Zod, vite-plugin-pwa, Vitest + Testing Library + jsdom, and tsx for scripts.

**Spec:** `docs/superpowers/specs/2026-11-22-gta6-info-book-design.md`

## Global Constraints

- No server, no database, no accounts, no ads, no analytics. The site is static only.
- Monthly cost about $0. Free static host. Research runs on the owner's Claude **Pro** plan, every other day, covering 1–2 sections per run.
- Every entry has these base fields: `id, name, section, summary, details?, confidence, sources[], last_verified, image?`.
- `confidence` is one of `confirmed | likely | unverified`, and the rules come from spec 9.3.
- Unknown stats are `null`, never guessed.
- Facts are stored in our own words with source links. Never paste whole articles.
- No Rockstar logos. Map art lives behind one swappable path (`public/map/`).
- UI: dark theme by default, tap targets at least 44px, body text at least 16px, at most 3 taps from home to any entry.
- The map coordinate space is a 1000×1000 square (`MAP_SIZE = 1000`), and pins use `x, y` in `[0, 1000]`.
- The research job must not commit data that fails `npm run validate`.

## Review Focus

1. **`localStorage` is unavailable, full or corrupted** (private browsing, cleared data, bad import file). The app still loads, shows a one-line warning, and refuses a bad import without wiping current progress. Tests: Task 6.
2. **Entries with missing data** (stat `null`, no image, no details). Show "Unknown", put nulls last when sorting either direction, and never crash. Tests: Task 4.
3. **A research run writes bad or duplicate data.** Validation fails, nothing is committed, and the deploy build also fails on invalid data, so a bad commit never reaches the phone. Tests: Tasks 2 and 9.
4. **Stale data.** An entry whose `last_verified` is more than 30 days old shows a "may be outdated" note. The 30 days is my call, since the spec only says to show the date. Tests: Task 3.
5. **Progress or a pin correction points to an id that later disappears** (research renamed or removed an entry). Orphaned ids are ignored in percentages and on the map, are never shown as errors, and are kept in storage in case the id comes back. Tests: Tasks 6 and 8.

---

## File Structure

```
CLAUDE.md                       standing instructions for every Claude Code session
data/
  weapons.json vehicles.json missions.json map_pins.json trophies.json
  categories.json areas.json changelog.json
research/
  instructions.md sources.md rotation.json incoming/   (incoming = staging, gitignored)
scripts/
  validate.ts                   CLI: validate all data files
  merge.ts                      CLI: merge research/incoming/*.json into data/
src/
  main.tsx App.tsx theme.css
  data/schema.ts                Zod schemas + TS types
  data/load.ts                  typed access to all data files
  data/validate.ts              validateAll() used by script + tests
  data/merge.ts                 mergeEntries() pure function
  search/search.ts              Fuse index
  ui/ConfidenceBadge.tsx SourceList.tsx EntryMeta.tsx SearchBar.tsx
  sections/Home.tsx
  sections/stats/StatList.tsx StatDetail.tsx Compare.tsx sortEntries.ts
  sections/missions/MissionList.tsx MissionDetail.tsx
  sections/progress/ProgressPage.tsx progressSummary.ts
  sections/map/MapPage.tsx PinSheet.tsx pins.ts
  progress/store.ts             localStorage progress + overrides + backup
public/map/placeholder.svg      1000×1000 placeholder map with region names
tests/                          mirrors src/ and scripts/
```

---

### Task 1: Project skeleton, home screen, CLAUDE.md

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/theme.css`, `src/sections/Home.tsx`, `CLAUDE.md`, `.gitignore`
- Test: `tests/sections/Home.test.tsx`

**Interfaces:**
- Produces: the route paths `/`, `/map`, `/progress`, `/weapons`, `/weapons/:id`, `/vehicles`, `/vehicles/:id`, `/compare/:section/:a/:b`, `/missions`, `/missions/:id`, `/search?q=`, and `/settings`, all under HashRouter. It also produces the npm scripts `dev`, `build` (which runs `validate` first, then `vite build`), `test`, `validate` and `merge`.

- [ ] **Step 1: Scaffold.** Run `npm create vite@latest . -- --template react-ts`, then install `react-router-dom leaflet react-leaflet fuse.js zod` and the dev dependencies `vitest @testing-library/react @testing-library/jest-dom jsdom vite-plugin-pwa tsx @types/leaflet`. Configure Vitest for jsdom. Add vite-plugin-pwa with `registerType: 'autoUpdate'` and app name "GTA 6 Info Book", and make it cache `data/*.json` for offline use.
- [ ] **Step 2: Write the failing test** `Home renders the five v1 sections as links`. It asserts links named Map, Progress Tracker, Weapons, Cars and Missions & Guides with hrefs `#/map`, `#/progress`, `#/weapons`, `#/vehicles` and `#/missions`, plus a search box with role `searchbox`.
- [ ] **Step 3: Run `npm test`.** Expected: FAIL (Home not found).
- [ ] **Step 4: Implement `Home(): JSX.Element`** and the router in `App.tsx`. Unbuilt routes render a "Coming soon" placeholder. `theme.css` sets the dark palette, 16px base text and a 44px minimum height on links and buttons.
- [ ] **Step 5: Run `npm test`.** Expected: PASS. Then run `npm run dev` and open the page at phone width in Playwright; the five sections should be visible without scrolling.
- [ ] **Step 6: Write `CLAUDE.md`.** It covers a one-paragraph project summary, a link to the spec and plan, the Global Constraints above, the confidence rules (spec 9.3), "run `npm test` and `npm run validate` before every commit", "research sessions: follow `research/instructions.md`", and "the owner is a beginner: explain changes in plain English and give copy-paste commands".
- [ ] **Step 7: Commit.** `git add -A && git commit -m "feat: project skeleton, home screen, CLAUDE.md"`

### Task 2: Data schema and validator

**Files:**
- Create: `src/data/schema.ts`, `src/data/validate.ts`, `scripts/validate.ts`, all `data/*.json` files with 2–3 sample entries each (each sample's `summary` starts with "SAMPLE:"), `data/categories.json` (drugs, collectible-cards, money-bags, stores, paint-spray, mechanics, garages, safe-codes), `data/areas.json` (placeholder regions with `id, name, x, y`), and `data/changelog.json` (`[]`).
- Test: `tests/data/validate.test.ts`

**Interfaces:**
- Produces:
  - Types `Base`, `Weapon`, `Vehicle`, `Mission`, `MapPin`, `Trophy`, `Category`, `Area`, `ChangelogEntry` and `Confidence = 'confirmed'|'likely'|'unverified'`.
  - Zod schemas `WeaponSchema`, `VehicleSchema`, `MissionSchema`, `MapPinSchema`, `TrophySchema` with fields exactly as spec 9.3. `Trophy` is `{...Base, how_to_unlock: string, missable: boolean}`. `ChangelogEntry` is `{date: string, section: string, added: string[], updated: string[]}`.
  - `validateAll(files: Record<string, unknown>): { ok: boolean; errors: string[] }`. `scripts/validate.ts` reads `data/`, calls it, prints the errors and exits with code 1 on failure.

- [ ] **Step 1: Write the failing tests:**
  - `accepts the sample data files`: `validateAll` on the real `data/` gives `ok === true`.
  - `rejects an entry with empty sources`: an error message contains the entry id and `sources`.
  - `rejects confidence "rumor"`.
  - `rejects duplicate ids across all files`: the error contains `duplicate id`.
  - `allows null weapon stats` (`damage: null` is valid).
  - `rejects a map pin with x = 1001 or a category not in categories.json`.
  - `rejects last_verified that is not YYYY-MM-DD`.
- [ ] **Step 2: Run `npm test tests/data`.** Expected: FAIL.
- [ ] **Step 3: Implement the schemas and `validateAll`.** Stats are `z.number().min(0).max(100).nullable()` for bar-style stats. `top_speed_mph` and `price` are `z.number().nonnegative().nullable()`.
- [ ] **Step 4: Run `npm test` and `npm run validate`.** Expected: both pass, and validate prints `All data valid (N entries)`.
- [ ] **Step 5: Commit.** `git commit -am "feat: data schema and validator"`

### Task 3: Data loading, search and shared entry UI

**Files:**
- Create: `src/data/load.ts`, `src/search/search.ts`, `src/ui/ConfidenceBadge.tsx`, `src/ui/SourceList.tsx`, `src/ui/EntryMeta.tsx`, `src/ui/SearchBar.tsx`, and the search results page in `src/sections/SearchPage.tsx`
- Test: `tests/search/search.test.ts`, `tests/ui/EntryMeta.test.tsx`

**Interfaces:**
- Consumes: the types from Task 2.
- Produces:
  - `getSection<T>(section: 'weapons'|'vehicles'|'missions'|'map_pins'|'trophies'): T[]`, `getById(id: string): Base | undefined`, `getCategories(): Category[]`, `getAreas(): Area[]`.
  - `search(query: string, limit = 20): Base[]` (Fuse over `name`, `summary` and `section`, threshold 0.4).
  - `isStale(lastVerified: string, today: Date): boolean` (more than 30 days).
  - The components `<ConfidenceBadge confidence>`, `<SourceList sources>` and `<EntryMeta entry>`. EntryMeta renders the badge, "Last checked {date}" and, when stale, "May be outdated".
  - `routeFor(entry: Base): string`, which maps an entry to its detail route.

- [ ] **Step 1: Write the failing tests:**
  - `search("stingr")` returns the sample entry named "Stinger" first.
  - `search("")` returns `[]`.
  - `isStale("2026-10-01", new Date("2026-11-22"))` is `true`, and `isStale("2026-11-01", …)` is `false`.
  - EntryMeta for an `unverified` entry shows the text "Unverified".
  - EntryMeta for a stale entry shows "May be outdated".
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement.** Import the data with static JSON imports so Vite bundles it. Search results link through `routeFor`. Put `<SearchBar>` in a header in `App.tsx`, so it appears on every screen (spec section 6), not only on Home.
- [ ] **Step 4: Run `npm test`.** Expected: PASS.
- [ ] **Step 5: Commit.** `git commit -am "feat: data loading, search, entry meta UI"`

### Task 4: Weapons and Cars (list, detail, compare)

**Files:**
- Create: `src/sections/stats/sortEntries.ts`, `StatList.tsx`, `StatDetail.tsx`, `Compare.tsx`
- Test: `tests/sections/stats/sortEntries.test.ts`, `tests/sections/stats/StatList.test.tsx`

**Interfaces:**
- Consumes: `getSection` and `EntryMeta` from Task 3.
- Produces:
  - `sortEntries<T>(items: T[], key: keyof T, dir: 'asc'|'desc'): T[]`, which puts nulls last in both directions.
  - `STAT_FIELDS: Record<'weapons'|'vehicles', {key: string; label: string; unit?: string}[]>`, with weapons covering damage, fire_rate, range, accuracy, clip_size and price, and vehicles covering top_speed_mph, acceleration, handling, braking, seats and price.
  - `<StatList section>` mounted at `/weapons` and `/vehicles`, `<StatDetail section>` at `/:section/:id`, and `<Compare>` at `/compare/:section/:a/:b`.

- [ ] **Step 1: Write the failing tests:**
  - `sortEntries` by `damage` desc on `[40, null, 80]` gives `[80, 40, null]`, and asc gives `[40, 80, null]`.
  - StatList renders a sort control. Choosing "Damage" reorders the rows.
  - Each row has a "Compare" checkbox. Ticking two enables a "Compare" link to `#/compare/weapons/{a}/{b}`.
  - StatDetail with `damage: null` and no image shows "Unknown" and does not crash.
  - Compare shows both names and highlights the higher value on each stat row. For `price`, lower wins.
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement.** Bar stats render as horizontal bars out of 100. Detail pages use the same layout for every entry in a section (spec 9.7).
- [ ] **Step 4: Run `npm test`.** Expected: PASS. Also check at phone width that a weapon detail page is 2 taps from home.
- [ ] **Step 5: Commit.** `git commit -am "feat: weapons and cars list, detail, compare"`

### Task 5: Missions & Guides

**Files:**
- Create: `src/sections/missions/MissionList.tsx`, `MissionDetail.tsx`
- Test: `tests/sections/missions/Missions.test.tsx`

**Interfaces:**
- Consumes: `getSection('missions')` and `EntryMeta`. The "Mark done" toggle uses `useProgress` from Task 6, so build Task 6 first if you are working in order (otherwise stub it).
- Produces: `<MissionList>` (Story tab sorted by `order`, Side tab sorted by name) and `<MissionDetail>` (objective, numbered steps, tips, a highlighted "Missable" box when `missables.length > 0`, rewards, unlock links and a "Mark done" toggle).

- [ ] **Step 1: Write the failing tests.** The Story tab lists the sample missions in `order`. The detail page shows a "Missable" box only when there are missables. Clicking "Mark done" makes the list row show a checkmark.
- [ ] **Step 2: Run.** Expected: FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4: Run `npm test`.** Expected: PASS.
- [ ] **Step 5: Commit.** `git commit -am "feat: missions and guides section"`

### Task 6: Progress storage and backup

**Files:**
- Create: `src/progress/store.ts`, `src/sections/Settings.tsx`
- Test: `tests/progress/store.test.ts`

**Interfaces:**
- Produces:
  - Storage key `gta6-info-book:v1`, holding `{ done: Record<string, true>, pinOverrides: Record<string, {x:number;y:number}>, lastBackup: string | null }`.
  - `loadState(): ProgressState` (returns an empty state when storage is unavailable or the JSON is corrupt) and `saveState(s): boolean` (returns false on failure).
  - `useProgress(): { isDone(id), toggle(id), setPinOverride(id, x, y), clearPinOverride(id), overrides, storageOk: boolean }`.
  - `exportBackup(): string` (JSON with a `version: 1` field). `importBackup(json: string): { ok: true } | { ok: false; error: string }`, which leaves the current state unchanged on failure.
  - `needsBackupReminder(lastBackup: string | null, today: Date): boolean` (true when there has been no backup in 14 days and there is at least one done item).
  - `<Settings>` with Export (downloads `gta6-progress-YYYY-MM-DD.json`) and Import buttons. A reminder banner appears on Home when `needsBackupReminder` is true.

- [ ] **Step 1: Write the failing tests:**
  - Toggle, then reload with a fresh `loadState`, and the id is still done.
  - Storage whose `setItem` throws gives `storageOk === false`, and toggling still works in memory with no exception.
  - Corrupt stored JSON makes `loadState` return an empty state.
  - `importBackup("not json")` returns `ok: false` and leaves the existing done ids in place.
  - Export followed by import round-trips exactly.
  - `needsBackupReminder(null, …)` is true when there is 1 done item and false when there are 0. A backup 13 days ago gives false, and 15 days ago gives true.
  - Unknown ids in `done` are preserved through save and load (Review Focus 5).
- [ ] **Step 2: Run.** Expected: FAIL.
- [ ] **Step 3: Implement.** Wrap every storage call in try/catch. When `storageOk` is false, Home shows "Progress can't be saved in this browser."
- [ ] **Step 4: Run `npm test`.** Expected: PASS.
- [ ] **Step 5: Commit.** `git commit -am "feat: progress storage, backup and restore"`

### Task 7: Progress Tracker page

**Files:**
- Create: `src/sections/progress/progressSummary.ts`, `ProgressPage.tsx`
- Test: `tests/sections/progress/progressSummary.test.ts`

**Interfaces:**
- Consumes: `getSection`, `getCategories` and `useProgress`.
- Produces:
  - `summarize(groups: {label: string; ids: string[]}[], isDone: (id) => boolean): {label; done; total; percent}[]`, where `percent` is rounded down and is 0 when `total` is 0.
  - `<ProgressPage>` with groups for Story missions, Side missions, Trophies and one group per collectible map category (collectible-cards, money-bags, safe-codes, drugs). Each group expands to a checklist that links to the entry, and to the map pin for map items.

- [ ] **Step 1: Write the failing tests.** 1 of 3 done gives `percent: 33`. Total 0 gives `percent: 0` and no NaN. A done id that isn't in any group doesn't change any count.
- [ ] **Step 2: Run.** Expected: FAIL.
- [ ] **Step 3: Implement.** Ticking a pin here is the same `toggle(id)` the map uses, so the two stay linked.
- [ ] **Step 4: Run `npm test`.** Expected: PASS.
- [ ] **Step 5: Commit.** `git commit -am "feat: progress tracker page"`

### Task 8: Map

**Files:**
- Create: `src/sections/map/pins.ts`, `MapPage.tsx`, `PinSheet.tsx`, `public/map/placeholder.svg` (1000×1000, region names drawn at the `areas.json` positions)
- Test: `tests/sections/map/pins.test.ts`

**Interfaces:**
- Consumes: `getSection('map_pins')`, `getCategories`, `getAreas` and `useProgress`.
- Produces:
  - `MAP_IMAGE = '/map/placeholder.svg'`, the single swap point.
  - `visiblePins(pins: MapPin[], opts: {enabled: Set<string>; hideFound: boolean; isDone}) : MapPin[]`.
  - `applyOverrides(pins, overrides): (MapPin & {corrected: boolean})[]`, which ignores overrides for ids that aren't in `pins`.
  - `<MapPage>`, a Leaflet `CRS.Simple` map with bounds `[[0,0],[1000,1000]]`, a category filter drawer, a "Hide found" switch, and markers colored and iconed per category. Approximate pins have a dashed outline. Tapping a pin opens `<PinSheet>`, a bottom sheet with EntryMeta, how_to_reach, code, image, sources, a "Found it" toggle and a "Fix location" button. That button makes the marker draggable, and the drop calls `setPinOverride`; this is spec 9.5's long-press, done as a button for reliability on touch screens, which is my call. Filter state is saved per device under `gta6-info-book:mapFilters`.

- [ ] **Step 1: Write the failing tests:**
  - With only the `safe-codes` category enabled, `visiblePins` returns only safe-code pins.
  - `hideFound` removes done pins.
  - `applyOverrides` moves a pin to its override position and sets `corrected: true`.
  - An override for a missing id is ignored without throwing.
- [ ] **Step 2: Run.** Expected: FAIL.
- [ ] **Step 3: Implement.** Test the Leaflet rendering by hand, not in jsdom.
- [ ] **Step 4: Run `npm test`.** Expected: PASS. Then, in Playwright at phone width: the map loads, toggling categories hides and shows pins, tapping a pin opens the sheet, and "Found it" followed by "Hide found" hides that pin.
- [ ] **Step 5: Commit.** `git commit -am "feat: interactive map with filters and pin corrections"`

### Task 9: Research pipeline (merge script and instructions)

**Files:**
- Create: `src/data/merge.ts`, `scripts/merge.ts`, `research/instructions.md`, `research/sources.md`, `research/rotation.json`, and a `research/incoming/` entry in `.gitignore`
- Test: `tests/data/merge.test.ts`

**Interfaces:**
- Consumes: the schemas and `validateAll` from Task 2.
- Produces:
  - `mergeEntries<T extends Base>(existing: T[], incoming: T[], today: string): { merged: T[]; added: string[]; updated: string[] }`. It replaces an entry by `id`, keeps existing entries that aren't in `incoming`, sorts by `id`, merges `sources` by URL with no duplicates, and sets `last_verified = today` on every incoming entry.
  - `scripts/merge.ts`, which reads each `research/incoming/<section>.json`, merges it into `data/<section>.json`, appends a `ChangelogEntry`, runs `validateAll`, and **writes nothing and exits 1** if validation fails.
  - `research/rotation.json`: `{"order": ["missions","weapons","vehicles","map_pins","trophies"], "next": 0}`.

- [ ] **Step 1: Write the failing tests:**
  - New id → `added`.
  - Same id → `updated`, with the new values winning.
  - An existing entry not in `incoming` is kept.
  - Duplicate source URLs collapse to one.
  - A merge whose result fails validation leaves `data/` byte-for-byte unchanged (test against a temp directory).
- [ ] **Step 2: Run.** Expected: FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4: Write `research/instructions.md`.** This file is the research session's real prompt. It must say:
  1. Read `CLAUDE.md`, `research/sources.md` and `research/rotation.json`.
  2. Research the next 1–2 sections in rotation, plus a 5-search "what's new" sweep (patches, newly found secrets). Use at most about 25 searches and 25 page reads per run.
  3. Follow robots.txt. Don't read login or paywalled pages. Write summaries in your own words.
  4. Apply the confidence rules from spec 9.3. Note conflicts in `details`. Use `null` for unknown stats.
  5. Place map pins with only a text location at the matching `areas.json` center with `location_precision: "approximate"`.
  6. Write the results to `research/incoming/<section>.json`, then run `npm run merge`, `npm run validate` and `npm test`.
  7. Only if all three pass: advance `rotation.next`, commit with `data: research run YYYY-MM-DD (<sections>)`, and push to `main`.
  8. If anything fails, commit nothing and end with a short report.
  9. Remove any `SAMPLE:` entries in the section being researched.
- [ ] **Step 5: Write `research/sources.md`.** It ranks the sources with trust levels: Rockstar Newswire and official channels as official; the major outlets (IGN, GameSpot, PCGamesN, GamesRadar) and the GTA Fandom wiki as reputable; r/GTA6 and GameFAQs as community, which yields `unverified` unless corroborated.
- [ ] **Step 6: Run `npm test`.** Expected: PASS. Then do a dry run: put a hand-written `research/incoming/weapons.json` with one entry in place, run `npm run merge`, and check that `data/weapons.json` gains the entry and `changelog.json` gains one line.
- [ ] **Step 7: Commit.** `git commit -am "feat: research merge pipeline and instructions"`

### Task 10: Deploy and schedule (needs the owner)

**Files:**
- Create: `.github/workflows/check.yml`, which runs `npm ci && npm test && npm run validate` on every push.
- Modify: `CLAUDE.md` (add the live URL and the scheduled task's name)

- [ ] **Step 1: Add the check workflow and push.** Expected: the GitHub Actions run is green.
- [ ] **Step 2: Owner steps (give them copy-paste instructions).** The owner creates a free Cloudflare Pages project connected to `ryryg2003/GTA6-TOOL` with build command `npm run build` and output folder `dist`, then opens the URL on their phone and uses "Add to Home Screen". Expected: the app opens full screen. Because `build` runs `validate` first, invalid data fails the deploy (Review Focus 3).
- [ ] **Step 3: Create the scheduled task.** It is a fresh session per run, every other day, at a time outside 6–9 AM Pacific, in this repo's environment. The prompt is: "Follow research/instructions.md in this repository." Confirm with the owner first, and tell them it uses their Pro usage.
- [ ] **Step 4: First fill.** Run the research session by hand 3–5 times over a few days (spec 9.4) until every v1 section has real entries and no `SAMPLE:` entries remain. Check: `grep -r "SAMPLE:" data/` returns nothing.
- [ ] **Step 5: Commit.** `git commit -am "chore: deploy check workflow and live URL"`
