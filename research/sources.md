# Research sources

Ranked by trust. Start here, then use web search to go wider. Trust level decides confidence:
**official** alone → `confirmed`. **reputable** alone → `likely` (two *independent* reputable sources agreeing → `confirmed`).
**community** alone → `unverified` (community + a reputable source agreeing → `likely`).

| Source | Trust | Good for | Watch out for |
|---|---|---|---|
| rockstargames.com/VI, Rockstar Newswire, Rockstar Support, Rockstar credits page | official | release/platforms, edition bonuses, official character bios, credited cast | Promo pages show things, they don't give stats, prices or map positions. Edition bonuses are not proof an item is in the base game. |
| PlayStation / Xbox store and trophy pages | official | trophies, edition contents | |
| GTA Playbook (gtaplaybook.com) | reputable | weapon store menus (bars, prices, lock text) | Each row links its own PS5 v1.002.001 screenshot. Store states ("sold out", "buy 3 more guns") depend on that save. |
| The Leonida (theleonida.com) | reputable | weapon menus, prices, unlock text | States it checks a retail PS5 copy. Its map uses the official poster, so its pin positions don't fit our map. |
| Dexerto GTA 6 wiki (dexerto.com/wikis/gta-6/…) | reputable | one page per weapon | Cite the page for *that* weapon. A page's sidebar names other weapons; that is not a source for them. |
| PC Gamer, VGC (videogameschronicle.com), GamesRadar, IGN, GameSpot, Polygon, GameRant, Push Square | reputable | mission lists, safe codes, location guides | Launch-week pages get edited; GamesRadar has printed at least one wrong digit (Kingpin 0330). |
| PowerPyx | reputable | mission walkthroughs (giver, requirement, reward, objectives), trophies, missables | GTABase and several smaller sites copy PowerPyx. They are the same source, not a second one. |
| GTABase | reputable for item pages | unique weapons/vehicles, menu bars | Its achievements page is **not** a mission source. Its mission and Strangers & Freaks lists credit PowerPyx. |
| GTA.ZONE / negentropy.studio | community (game-file data) | raw file fields, magazine sizes | Decoded from Xbox v1.0.2.1 files by an unofficial parser. Units are partly guessed. Never show a raw "damage per projectile" as HP or a top speed as a road test. |
| NiaMeowDB (meowdb.com), Playday.one, other fan databases | community | first leads on stats | They don't say where their numbers come from. |
| r/GTA6 and r/GTA on Reddit | community | newly found secrets, safe codes, early stats | One player's report. |
| GameFAQs boards and guides | community | stats, walkthroughs | |
| YouTube video descriptions/titles (not the videos) | community | collectible locations with timestamps | Check the video is GTA VI, not GTA V or a mod. |
| Pro Game Guides, GTABible-style "top speed" tables | do not use for numbers | | Their mph figures appear to be copied from GTA V/Online. |

## Independence: what counts as a second source
- Two pages are independent only if each one observed the fact itself (played the game, read the menu, opened the safe).
- **Two outlets may trace to the same clue; that is not independent corroboration.** Example: the Brooks Boatworks wall map prints the Kingpin, La Cascara and Boatworks codes. Every guide that copied codes from that board counts as one chain. Keep those codes at `likely` until someone shows the keypad opening, or an official source confirms.
- Sites that credit or copy another guide (GTABase ← PowerPyx, translated guides, aggregators like "all codes" lists) count as the original, once.
- A page that only *mentions* the item in a menu, sidebar or "related" list is not a source for it.

## Conflicts
- Keep the best-supported value, set confidence to at most `likely`, and say in `details` who says what (e.g. "PC Gamer and VGC: 0300. GamesRadar: 0330.").
- Prefer a source that shows its evidence (screenshot, video timestamp, "when we robbed it") over one that just lists a value.
- Pre-launch pages (before Nov 19, 2026) lose to post-launch first-hand pages.

## Kinds of numbers: never mix them
- **Menu bars** (weapon Damage/Accuracy/Handling/Range; vehicle Speed/Acceleration/Handling/Strength) are 0–10 ratings. Store as 0–100 (×10) bar fields. They are not damage per shot and not mph.
- **Measured values** (mph, 0–60 time, shots to kill) need a real test with stated conditions. None exist yet, so `top_speed_mph` stays `null`.
- **Game-file values** stay in `details`, labelled as decoded file data.
- **Money**: purchase price, registration fee and sell value are three different numbers. Only the purchase price goes in `price`.
- An ammo box size is not a magazine size.

## Safe codes
Some codes are fixed, some are randomized per playthrough (e.g. Avery Pawn: threaten an employee for it). Don't store a randomized code as if it worked for everyone; say "randomized" in the summary and keep `code` `null`.

## Rules
Follow robots.txt, skip pages behind a login or paywall, keep it to roughly one request per second
per site, and never copy article text: write the fact in your own words and link the page.
Short in-game text (an objective label like "Rob Delights safe", a mission's in-game description) may be quoted.
Check every entity is GTA VI, not GTA V, GTA Online, a mod, or a pre-release trailer guess.
