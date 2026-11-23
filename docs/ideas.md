# Ideas for later

Feature and section ideas, not yet built. Each needs its own sourced research before it ships.
Leads here came partly from the owner's research handoff in `research/reference/` (leads only, never a source).

## New sections
- **Characters / biographies.** Rockstar's "Only in Leonida" page has short official bios (Jason, Lucia, Cal, Boobie, Dre'Quan, Real Dimez, Raul, Brian) and the official credits page pairs characters with credited performers. Ids would use a new `character-` prefix. Needs a spoiler switch: post-launch reviews reveal family details early in the story. Keep "credited performer" wording (credits don't say voice vs motion capture). Don't merge GTA IV/V identities into VI characters without on-screen proof.
- **Edition and bonus content.** Ultimate Edition, Vintage Vice City Pack and GTA+ items ('95 Grotti Cheetah, '67 Dominator Buggy, Shitzu Squalo, Hawk & Little Morgan Revolvers, Caminos/Duval signature pistols, Wyman's car collection). Show them apart from normal items, with "needs edition X" on each.
- **Strangers & Freaks strands.** Each strand as a chain of steps with restrictions (night only, Jason only, time-limited). PowerPyx is the main source; GTABase copies it.
- **Robberies.** One entry per robbery with security level, safe type (fixed code, randomized, clue, interrogation, sticky bomb), loot and unique pickups.

## Better data models
- **Mission prerequisites as a graph**, not one number. Several missions run in parallel and guides disagree on totals (91 / 93 / 95). Fields: `chapter`, `requires[]`, `can_start_as`, `time_limited`.
- **Safe code type**: `fixed`, `randomized`, `clue`, `interrogation`, so the map can say "ask an employee" instead of showing a wrong code.
- **Vehicle money fields**: purchase price, registration fee and sell value kept apart. Add the five WAiNK bars (Speed, Acceleration, Asphalt handling, Off-road handling, Strength) as real fields instead of mapping them onto the old speed/handling/braking fields.
- **Weapon fields**: a Handling bar (the menu has one; there's no Fire-rate bar), ammo type, and unique-variant links (Clunker 556 → Duke 556).
- **Game version** on facts that patches can change.

## App features
- Spoiler switch (hide mission names after the current chapter, hide character spoilers).
- "Do before the point of no return" checklists per chapter (e.g. Chapter 1 cleanup before Tourist Trap).
- Missable vs "needed for 100%" kept as two separate flags.
- A tested-speed table only once someone measures speeds with stated conditions.
- Offline map tiles: let the owner pre-download tiles for an area.
