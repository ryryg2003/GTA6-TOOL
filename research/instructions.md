# Research run instructions

You are the researcher for the GTA 6 Info Book. Each run you find new or better GTA 6 facts on the web and
add them to `data/`. Read `CLAUDE.md` first; its rules apply. The owner is not watching, so do not ask questions.

## 1. Plan the run
- Read `research/rotation.json`. This run covers `order[next]` and `order[next + 1]` (wrap around).
- Read the current `data/<section>.json` for those sections so you know what already exists.
- Read `research/sources.md` for where to look and how much to trust each source.
- Budget: about **25 web searches and 25 page reads** in total. The owner is on Claude Pro. Stop early when the budget is spent.

## 2. Research
- For each of the two sections: fill gaps first (entries with `null` fields, `unverified` entries, sections with few entries), then look for new entries.
- Then spend at most **5 searches** on a "what's new" sweep: recent patches, newly found secrets, safe codes, collectible locations. Put findings in whichever section they belong to (they may be outside this run's two sections; that's fine).
- Follow robots.txt. No login or paywalled pages. Write every summary, step and tip **in your own words**. Never paste article text.

- Before citing a page, open it and check it really states the fact for *this* entry. Never reuse one page (say, one weapon's wiki page or an achievements list) as a source for other entries.
- Count sources the way `research/sources.md` says: copies of one guide, or several outlets reading the same in-game clue, are one source, not two.
- `research/reference/` holds the owner's research handoffs. Use them only as leads (what to look for, which sources to try, known conflicts). Never cite them, never copy their text, never show them in the app. Every fact still needs its own fetched web source.

## 3. Write entries
Write each section's new or changed entries as a JSON array to `research/incoming/<section>.json`.
Only include entries you are adding or changing; the merge keeps everything else. The shape of every field is in
`src/data/schema.ts`. Key rules:
- `id`: lowercase-dashed and stable, prefixed by type: `weapon-…`, `vehicle-…`, `mission-…`, `pin-…`, `trophy-…`.
  Reuse the existing id when updating an entry. Never rename ids, because the owner's progress is keyed by them.
- `confidence`: follow the rules in `CLAUDE.md` and `research/sources.md`. The validator enforces that `confirmed` has 2+ sources or one official source (rockstargames.com, playstation.com, xbox.com). When sources disagree, keep the best-supported value, use at most `likely`, and explain the conflict in `details`.
- Unknown stats are `null`. Never estimate a number. Bar stats are 0–100: the game's 0–10 menu rating × 10. Menu bars are not mph or damage per shot; keep game-file and measured numbers out of bar fields (see `research/sources.md`).
- `sources`: every source you used, with `accessed` set to today.
- Missions: `order` is the story order (`null` for side missions). List missable items in `missables`. Fill `giver`, `objective` (the in-game description, or a one-line summary in your own words), `steps` (the in-game objective names, in order), `rewards`, and put requirements and who can start it in `details`. Missions run partly in parallel; treat `order` as a guide's display order, not a strict sequence. Every id in `unlocks` must be an existing entry id (add that entry first, or leave it out).
- Links: source URLs must start with `https://`. `image` must be an `https://` link or a `/site/path`.
- Unknown fields: send `null`. The merge never lets a `null` erase a value already known, and only lowers `confidence` when you bring a new source.
- Map pins: first run `npm run import:map` to pull the latest Open GTA 6 Map locations (CC BY 4.0, exact positions); don't re-add those by hand. `category` must be an id from `data/categories.json`. If a source gives only a text location, set `x`/`y` to the matching area's center in `data/areas.json`, `location_precision: "approximate"`, and `area_name`. Use `exact` only when a source gives a precise map position. A safe's combination goes in `code`. If guides say the code is randomized per playthrough, leave `code` `null` and explain how to get it in `how_to_reach`. If guides disagree on a code, use the best-supported one, `likely` at most, and name the conflict in `details`.
- Trophies: `missable: true` only if a source says it can be permanently missed.

## 4. Merge, check, commit
Run, in order:
```
npm run merge
npm run validate
npm test
```
- If all three pass: set `research/rotation.json` `next` to `(next + 2) % order.length`, then commit
  `data/` and `research/rotation.json` with the message `data: research run YYYY-MM-DD (<sections>)`, and push to `main`.
- If any fails: fix your incoming files and retry, at most twice. If it still fails, commit nothing. Delete
  `research/incoming/*.json` and end with a short report of what went wrong.

## 5. Report
End with 3–6 lines: sections covered, entries added/updated (from the merge output), anything notable (a new
secret or safe code), and anything you could not verify.
