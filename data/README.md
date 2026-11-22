# GTA 6 Info Book data (seed, launch week)

This folder holds the app's data. Any Claude Code session working on this repo can load these files directly.

- **Built:** 2026-11-22, game version 01.002.001 (the game came out 2026-11-19).
- **Built from:** `reports/GTA 6 launch data for tool.md`, using the research notes in `research_notes/GTA 6 launch data for tool/`.
- **Rebuild:** run `python3 research/tools/build_seed_data.py` from the repo root. It overwrites only the files listed below.
- **Spec:** [`docs/superpowers/specs/2026-11-22-gta6-info-book-design.md`](../docs/superpowers/specs/2026-11-22-gta6-info-book-design.md), section 9.3.
- **Plan:** [`docs/superpowers/plans/2026-11-22-gta6-info-book-v1.md`](../docs/superpowers/plans/2026-11-22-gta6-info-book-v1.md).

## Files

### v1 sections (spec 9.3 schema)

| File | Entries | What it holds |
|---|---|---|
| `weapons.json` | 77 | 52 shop guns, 11 unique display-case variants and 14 free or hidden pickups |
| `vehicles.json` | 57 | Tuning-menu stat bars, with stock and modded versions as separate entries, plus Randy's Wish List locations |
| `missions.json` | 148 | Prologue plus Chapters 1-5 in PowerPyx order, with optional missions, character locks and heist setups |
| `trophies.json` | 55 | Every trophy, with grade, requirement and a missable flag |
| `map_pins.json` | 116 | Safe codes, secrets, random events, free weapons, Wish List cars, stunt-jump groups and example collectibles |
| `categories.json` | 18 | Pin categories: the 8 spec defaults plus 10 added from research |
| `areas.json` | about 80 | 6 official regions, a "Mariana and Leonard counties" group and about 70 sub-areas |
| `changelog.json` | 1 | The seed run |

### `later/`: sections for later app versions

These files use the same base fields, plus their own extra fields.

| File | What it holds |
|---|---|
| `release.json` | Launch date, platforms, prices, editions, install size and reviews |
| `patches.json` | The two silent pre-launch updates and the required PS5 firmware |
| `characters.json` | 9 supporting characters with roles and voice actors |
| `character_stats.json` | Strength, Cardio and Focus (4 levels each), training methods and decay |
| `heat_icons.json` | The 6 Heat icons and how to clear each one |
| `criminal_profile.json` | The 5 profile tiers, Professional through Irredeemable |
| `pin_counts.json` | In-game totals for 22 store and service categories |
| `collectible_counts.json` | 23 collectible categories, with the total and the amount 100% requires |
| `activities.json` | Activity counts: hoops, golf, pool and more |
| `random_events.json` | 9 random events (also mirrored as map pins) |
| `secrets.json` | 10 confirmed or likely secrets (the "Secrets" tab) |
| `theories.json` | 8 unproven claims (the "Theories" tab); always `unverified` |
| `hoaxes.json` | 9 fakes, with `is_hoax: true`. **Never show these as fact.** |
| `money_methods.json` | 16 methods with reported payouts and the chapter each becomes available |
| `cheats.json` | 18 cheats: unlock condition, D-pad sequence and `sequence_known`. All cheats disable trophies. |
| `exploits.json` | 7 glitches with patch status as of Nov 22 |
| `properties.json` | 15 garages, each with its list price and BuckMe Gold discounted price |
| `conflicts.json` | 28 topics where sources disagree, with both values and the best current reading |
| `sources.json` | 23 sites, each marked `ingest` or `link_only` for the daily researcher |

## Conventions every session must keep

- **Confidence** is `confirmed`, `likely` or `unverified`:
  - The report's CONFIRMED became `confirmed`, LIKELY became `likely`, and RUMOR, THEORY and HOAX became `unverified`.
  - When one row had several tags, the entry takes the **most cautious** one.
  - The report's original tag text is kept in `details`.
  - Weapons also carry `stats_confidence` and `price_confidence`, so a gun with likely stats and a rumored price shows both.
- **Stats use a 0-100 scale.** The game shows 0-10 with one decimal, and the files store that value times 10. For example, the K17's damage of 4.0 is stored as `40`. Each entry's `details` keeps the raw 0-10 values. Divide by 10 to display them the way the game does.
- **`null` means unknown, never zero.** Every vehicle has `top_speed_mph`, `braking`, `seats` and `price` set to `null`. The game shows no mph and has no braking stat, and car prices are not known. Weapons have `fire_rate: null` because no fire-rate stat exists.
- **Vehicles carry extra stat fields**: `speed`, `offroad_handling`, `strength`, `road_rating`, `offroad_rating` and `modded`. The spec's vehicle schema has no Speed field, but Speed is the main stat players compare, so the Task 2 schema should add `speed`.
- **Map coordinates are placeholders.**
  - No source publishes in-game coordinates.
  - Every pin is `location_precision: "approximate"` and sits at its sub-area's placeholder position in `areas.json`. All areas carry `placeholder_position: true`.
  - The region layout is a rough guess at the geography. When a real map image is added, move the `areas.json` points; pins move with them on the next rebuild.
  - 36 pins whose text names no known place sit near the Vice City center, with `area_name` starting "Unknown". Fix those first.
- **Safe codes:**
  - Ordinary robbery safes get a new code every time.
  - The Tenebrae Lux phone code is randomized per playthrough, so its `code` is `null` and it carries `randomized: true`.
  - Keep codes as strings, because leading zeros matter (`0420`).
- **Sources:**
  - Each entry has at least one `{url, title, accessed}` source.
  - Where a table row named a site without a link, the builder matched it to that site's link in the same report section. Where a row named no source at all, it used that section's main links. Treat those matches as "the section's sources," not proof that a specific page states that exact row.
- **Spoilers:** missions from Chapter 3 on, and some trophies, carry `spoiler: true`.
- **IDs:** each ID is the section prefix plus a slug of the name, such as `weapon-klose-k17`, `mission-lab-fees` or `trophy-a-long-road`. Progress tracking keys off these IDs, so never rename one without a migration.

## Notes for the plan's Task 2 (schema and validator)

- **Keep the real data.** Task 2 says to create sample files whose summaries start with "SAMPLE:". Those samples are not needed now, so don't overwrite these files with samples.
- **Allow extra keys.** Use Zod's `.passthrough()`, or at least don't use `.strict()`, so the extra fields survive.
- **Allow nulls in missions.** `giver`, `objective` and `rewards` are `null` for every mission, because no source gives them yet.
- **Validate `later/` loosely.** Check the base fields only, until those sections get their own schemas.

## What's weakest, and what research should check next

1. **Weapon stats** come from two fan databases that don't name their source. Only 6 weapons are `confirmed`. Replace them with in-game stat-screen screenshots when possible.
2. **Vehicle stats** come mostly from one fan site (meowdb), and only 8 are `confirmed`. No measured top speeds exist yet.
3. **Missions from Chapter 3 on** come from PowerPyx alone. None of them has cash rewards, objectives or steps.
4. **Map positions:** all are placeholders, as described under Conventions.
5. **Patches:** no notes have been published. The daily run should check for a 1.003 update.
6. **Video transcripts** were mostly blocked by YouTube's bot check. The report's last section lists about 15 priority videos to transcribe. The owner can supply links or files for local transcription.
