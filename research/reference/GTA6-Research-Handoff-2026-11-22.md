# GTA VI Research Handoff — 2026-11-22

Claude: This file contains research findings, not automatically verified application data. Inspect the latest project, preserve stable IDs and personal progress compatibility, map supported findings to the existing schemas, and run the project’s required checks before applying changes.

## 1. Research date, scope, and verified game status

**Research cutoff:** November 22, 2026 (America/New_York).  
**Scope:** Read-only research for the personal, phone-first companion app at https://github.com/ryryg2003/GTA6-TOOL. No repository files, code, or data were changed. This is a bounded launch-week handoff, not comprehensive game coverage.

### Verified status

Rockstar announced that Grand Theft Auto VI became available worldwide on **November 19, 2026** for **PlayStation 5 and Xbox Series X|S**. Rockstar’s official platform/editions page checked November 22 lists those platforms and does not announce a PC version. Rockstar’s official printable Leonida map is available as a separate map resource; it is not a documented coordinate dataset or a basemap registered in this app.

The latest relevant Rockstar Newswire item located in the official VI listing was the November 20 item “Grand Theft Auto VI: The Album Now Available.” No official title update notes were located in the official pages checked through this cutoff; this means only that none were found in the sources searched.

**Official sources**

| Source | URL | Publication / access | Supports | Limit |
|---|---|---|---|---|
| Rockstar Newswire, “Grand Theft Auto VI Now Available” | https://www.rockstargames.com/newswire/article/39akk424a9oo53/grand-theft-auto-vi-now-available | Nov. 19, 2026 / accessed Nov. 22 | Release date, worldwide availability, PS5 and Xbox Series X|S, printable Leonida map, link to IGN guide | Does not establish detailed locations, stats, mission steps, or app coordinates |
| Rockstar Support, “Grand Theft Auto VI Platform Editions and Versions” | https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions | Last updated Nov. 18, 2026 / accessed Nov. 22 | Listed platforms; Ultimate Edition included-content entitlement | No PC platform listed on this page; absence here is not a permanent platform announcement |
| Rockstar VI “Out Now” | https://www.rockstargames.com/VI/out-now | Accessed Nov. 22 | Official launch status | Status page, not a gameplay reference |
| Rockstar VI Newswire listing | https://www.rockstargames.com/newswire?tag=vi | Accessed Nov. 22 | Checked latest relevant official news item | Listing is not a full patch-history API |
| Rockstar screenshots | https://www.rockstargames.com/VI/media/screenshots | Accessed Nov. 22 | Officially published visual material | Visuals support only visible observations, not exact locations or gameplay statistics |
| Rockstar “Only in Leonida” | https://www.rockstargames.com/VI/only-in-leonida | Accessed Nov. 22 | Official Leonida setting and names/context | Promotional material, not an in-game atlas |

The Rockstar Newswire points players to an IGN companion guide. The official downloadable map and screenshot gallery are valuable primary material for later visual indexing, but no reliable transformation from those assets to this repository’s current map coordinates was established.

## 2. Findings grouped by app section

### Map pins and safe codes

The findings below are launch-week guide reports. Two outlets may independently publish a code while tracing it to the same in-game clue/map; that is corroboration of reporting, not necessarily two independent discoveries. No app x/y coordinates are supplied: the repository currently has a placeholder map, not the actual map asset, and none of the reviewed sources documents a transform into its 0–1000 coordinate space.

#### Likely findings

| Suggested stable ID | Name / section | Practical finding | Confidence and limitation |
|---|---|---|---|
| pin-safe-kingpin-bowling | Kingpin Bowling Alley safe / Map pin, safe code | Port Gellhorn. The strongest source consensus gives keypad code **0300**. A clue is available at Brooks Boatworks; VGC reports the safe can be opened without first collecting the clue and notes a sticky-bomb alternative. Leave exact map coordinates unknown. | **Likely, disputed.** VGC, PC Gamer, Destructoid and other guides report 0300. GamesRadar prints 0330. Do not encode the code as confirmed until the keypad is independently checked in the retail game or additional direct evidence resolves the discrepancy. |
| pin-safe-brooks-boatworks | Brooks Boatworks warehouse safe / Map pin, safe code | Port Gellhorn. Code **6823** applies to the coded warehouse safe. PC Gamer places it in a room with a pool table and says the clue map is in a small two-storey building; a Clunker carbine is reported in that smaller building. Reports also describe a second safe that opens without this code. Keep the code scoped to the warehouse safe only. | **Likely.** VGC and PC Gamer agree on 6823, but they may derive from the same in-game wall map. “Office” and “pool-table room” descriptions may refer to the same space. |
| pin-safe-la-cascara-motel | La Cascara Motel safe / Map pin, safe code | Port Gellhorn. Code **6969**; the safe is reported on the top floor. A clue is available at Brooks Boatworks. Preserve the in-game spelling “La Cascara.” | **Likely.** VGC and PC Gamer agree; coordinates not mapped. A GamesRadar heading misspells it as “La Cascera.” |
| pin-safe-nova-auto-junkyard | Nova Auto Junkyard safe / Map pin, safe code | Reported in the southeast Hamlet area near a school bus, inside the office behind a white shutter. Code **7777**. Treat “near a school bus” and “white shutter” as navigation clues, not coordinates. | **Likely, single specialist guide in this pass.** Destructoid provides the detailed directions and code; direct retail-game confirmation and independent corroboration remain desirable. |
| pin-safe-cottonmouth-trailer | Abandoned Cottonmouth trailer safe / Map pin, safe code | Reported south of Hamlet near Cottonmouth Lake, in Grassrivers. Code **44017** (five digits). Guides describe postcards/wall clues. Coordinates unknown. | **Likely, single-chain pending.** Destructoid and GamesRadar include this code, but source ancestry and direct keypad verification were not established. |

**Brooks Boatworks clue relationship:** VGC and PC Gamer say its map/clue board gives codes for multiple safes, including Kingpin and La Cascara. This is useful as a route-planning note, but the underlying clue should be checked in-game before using it as proof that every published code or spelling is correct.

#### Additional leads, not app-ready

Destructoid’s all-codes page also lists Lab Fees door codes 0420 and 7700; Pelican Valley outpost safe code 0072 and dock door code 0212; and Delights Cabaret safe code 2008. These were not individually traced to primary evidence or independently checked in this research pass. Keep in the lead queue, not verified app records.

#### Map coordinate and dataset investigation

- Rockstar’s printable Leonida map is official visual reference but no coordinate documentation was found for the app’s placeholder map.
- GTAMap.io (https://gtamap.io/?m=permit-keys) exposes a user-mark backup format and GeoJSON import. That establishes data import/backup capability, not that its current public layers are an authoritative downloadable POI dataset.
- GTAMap.io credits GTADB / Yanis community layers under CC BY 4.0. Navanem’s Leonida Atlas repository (https://github.com/navanem/gta6-leonida-atlas/blob/main/README.md) says its public catalog derives from GTADB / Map GTA under CC BY 4.0. Treat those as a related ancestry chain, not independent location corroboration; verify license obligations and attribution before reuse.
- GTADB API documentation is at https://api.gtadb.org/; the API is described as experimental and terms/licensing were not established in this pass.
- https://github.com/gta6map/gta6map.github.io describes map data/tiles as public-domain/reusable, but its independence from the GTADB-derived layers was not established.
- Do not translate any community map coordinates into app coordinates until the app’s actual basemap and coordinate transform are identified and validated.

### Weapons

| Suggested stable ID | Name / section | Practical finding | Confidence and limitation |
|---|---|---|---|
| weapon-clunker-556 | Duke Arms Clunker 556 / Weapons | A Clunker 556 is reported at Brooks Boatworks, in a case in the second-floor office of the smaller building. This is a useful location/acquisition lead. VGC calls it an assault rifle; PC Gamer calls it a carbine. | **Likely.** GTABase, PC Gamer, and VGC provide related reporting, but the exact in-game category/variant name needs a retail-game check. All combat stats, price, ammunition capacity, ammo types, and unlock requirements remain **Unknown**. Do not convert GTABase’s 0–10 bars into the app’s 0–100 values without a verified mapping. Do not infer the variant’s magazine capacity from another firearm. |

Sources:

- GTABase, “Clunker 556”: https://www.gtabase.com/gta-6/weapons/clunker-556 (accessed Nov. 22). Supports item identity, location and displayed bars; bars are not measured values and the scale is not compatible without conversion evidence.
- PC Gamer, Brooks Boatworks safe guide: https://www.pcgamer.com/games/grand-theft-auto/gta-6-brooks-boatworks-safe-code/ (published Nov. 21; accessed Nov. 22). Supports Clunker placement in the smaller building and the warehouse safe details.
- VGC, Brooks Boatworks guide: https://www.videogameschronicle.com/guide/gta-6-brooks-boatworks-safe-code-and-location-how-to-find-and-open-the-safe/ (published Nov. 21; accessed Nov. 22). Supports the Boatworks location context and related valuables.

### Vehicles

| Suggested stable ID | Name / section | Practical finding | Confidence and limitation |
|---|---|---|---|
| vehicle-smuggler-caracara | Vapid Smuggler Caracara / Vehicles | Reported at Brooks Boatworks. Useful as a location/acquisition lead for a vehicle comparison entry. | **Likely.** VGC and GTABase report the vehicle/location. Top speed, acceleration, braking, handling, price, seat count, exact acquisition conditions, and unlock requirements remain **Unknown** for this handoff. Do not infer exact performance from the model name, trailer appearance, or GTABase bars. |

Sources:

- GTABase, “Smuggler Caracara”: https://www.gtabase.com/gta-6/vehicles/smuggler-caracara (accessed Nov. 22). Supports identity and listed location/vehicle class; displayed bars are qualitative, not measured performance.
- VGC, Brooks Boatworks guide: https://www.videogameschronicle.com/guide/gta-6-brooks-boatworks-safe-code-and-location-how-to-find-and-open-the-safe/ (published Nov. 21; accessed Nov. 22). Supports vehicle listed among Boatworks valuables.

### Missions

| Suggested stable ID | Name / section | Practical finding | Confidence and limitation |
|---|---|---|---|
| mission-prologue | Prologue / Missions | The Prologue is reported as the first story mission. This is an ordering anchor only. | **Likely.** VGC and PC Gamer list the Prologue first, but both pages predate the public launch (Nov. 18), so confirm against retail gameplay before treating the mission record as final. |

- VGC Prologue walkthrough: https://www.videogameschronicle.com/guide/gta-6-prologue-mission-walkthrough/
- PC Gamer mission list: https://www.pcgamer.com/games/grand-theft-auto/gta-6-mission-list/ (published Nov. 18; accessed Nov. 22).

A mission walkthrough hub is available at https://www.videogameschronicle.com/news/grand-theft-auto-6-complete-walkthrough-hub/. It lists Chapter 1 and optional/story guides. The mission-count sources disagree: PC Gamer reports five chapters and 91 story missions; the VGC hub’s displayed chapter counts differ, including Chapter 2 (13 listed by VGC versus 11 in the PC Gamer page). Publication timing, guide coverage, and whether optional jobs are included may explain some difference; this research did not reconcile it. Do not seed a complete mission order or total from these counts.

Objectives, prerequisites, step-by-step walkthroughs, rewards, unlocks, tips, branching outcomes, and missable content have not been researched sufficiently for app entry.

### Trophies and achievements

| Suggested stable ID | Name / section | Practical finding | Confidence and limitation |
|---|---|---|---|
| trophy-positive-mental-attitude | Positive Mental Attitude / Trophies | Trophy guides describe 18 meditation locations. There is a disputed report that a Chapter 1 meditation opportunity may be missable; Reddit commenters say the trophy can still be earned after Chapter 2. | **Unverified / conflicting.** No primary trophy counter, achievement record, or direct gameplay verification was obtained. Do not set the schema’s missable boolean to true or false from this evidence. |

Sources:

- Push Square trophy guide: https://www.pushsquare.com/guides/gta-6-trophy-guide-and-roadmap (accessed Nov. 22). Supports the reported 18 meditation locations.
- PowerPyx trophy guide: https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/ (accessed Nov. 22). Supports the caution about a Chapter 1 meditation prompt; guide’s claim needs gameplay verification.
- GamesRadar trophy/achievement guide: https://www.gamesradar.com/games/grand-theft-auto/gta-6-trophy-achievement-list/ (accessed Nov. 22). Also raises the missable concern; likely not an independent source if following the same early guide reporting.
- Public Reddit discussion: https://www.reddit.com/r/GTA/comments/1y0qeec/positive_mental_attitude_trophy_isnt_missable/ (accessed Nov. 22). Commenters report earning it after skipping the first prompt and meditating after Chapter 2 “Coffee Break”; no screenshot or trophy timeline was checked.
- TrueTrophies entry: https://www.truetrophies.com/t1155330/positive-mental-attitude-trophy (accessed Nov. 22). Potential corroborating lead, but page access was blocked (HTTP 402) in this research pass; its content was not relied on.

Practical note for a player: if convenient, meditate when prompted while the missability dispute is unresolved. This is a precaution, not evidence that the trophy is missable.

### Other official edition content

Rockstar Support’s Ultimate Edition listing includes entitlement bonuses such as a ’95 Grotti Cheetah and Hawk & Little Morgan Revolvers. These are edition-specific bonuses, not proof of general in-game purchase price, ordinary unlock conditions, or standard-edition availability. Keep edition/platform entitlement separate from app records for normally obtainable vehicles and weapons.

## 3. Corrections and improvements to existing entries

Repository review found every current section record labeled or structured as sample/placeholder data. None is factual evidence. Prioritize these corrections:

| Existing record | Current issue | Recommended handoff action |
|---|---|---|
| pin-sample-safe-vice | Contains sample safe code 00-00-00 and placeholder map position | Do not overwrite this ID with a real safe; create a new stable ID only after evidence and real basemap mapping. |
| pin-sample-card-1 | Sample collectible | No collectible replacement was verified in this pass; preserve as sample until the app owner decides how to handle seed data. |
| pin-sample-mechanic | Sample mechanic point | No real mechanic/garage locations verified here. |
| weapon-sample-pistol, weapon-sample-carbine, weapon-sample-shotgun | Sample stats/prices/ammo, including invented-looking values | Do not treat the stats as data. Clunker 556 is a separate, sourced acquisition lead; its numeric fields remain Unknown. |
| vehicle-sample-stinger, vehicle-sample-pickup | Sample price/speed and other values | Do not treat the stats as factual. Smuggler Caracara is a separate location lead; performance and price remain Unknown. |
| mission-sample-intro, mission-sample-second, mission-sample-side | Sample mission records | Prologue is the only ordering anchor found here; avoid reusing sample IDs or claiming complete story order. |
| trophy-sample-first, trophy-sample-missable | Sample requirements and missable flags | No trophy sample value is evidence. The Positive Mental Attitude missability remains unresolved, so do not set a boolean. |

**Stable-ID and progress compatibility:** The repository uses stable IDs as progress keys. Keep user completion/collection records intact. Do not repurpose sample IDs for unrelated live-game entities, and do not discard unrecognized saved progress while replacing sample content. The findings above suggest IDs only; Claude should inspect the current project and verify schema before applying anything.

**Schema fit:** Safe codes can fit map-pin details/categories, but coordinates cannot be responsibly supplied. Numeric weapon/vehicle statistics should be null/Unknown until supported. Preserve the safe code’s leading zero for 0300 and the five-digit form 44017. Store disagreement notes rather than selecting a disputed value as confirmed.

## 4. Evidence ledger, conflicts, and unknowns

### Claim-level evidence ledger

| Claim | Original source evidence | Corroboration / ancestry | Conflict | Confidence and limitation |
|---|---|---|---|---|
| GTA VI launched Nov. 19, 2026 for PS5 and Xbox Series X|S | Rockstar Newswire “Now Available,” Nov. 19 | Rockstar Support platform/editions page | None found | **Confirmed official.** Applies to stated launch status at cutoff. |
| Kingpin Bowling safe code is 0300 | VGC and PC Gamer safe guides, Nov. 21 | Destructoid also reports 0300; outlets may rely on same in-game clue/early guide chain | GamesRadar reports 0330 | **Likely, disputed.** Direct keypad check needed. Preserve leading zero. |
| Brooks Boatworks warehouse safe code is 6823 | VGC and PC Gamer Boatworks guides, Nov. 21 | GTABase/general safe-code listings also report it | Exact room wording differs (“office” vs room with pool table) | **Likely.** Code scope must remain the coded warehouse safe. |
| La Cascara Motel safe code is 6969 | VGC and PC Gamer guides, Nov. 21 | GamesRadar lists same code | Guide spelling “La Cascera” appears in one heading | **Likely.** Use game spelling; top-floor location from guides. |
| Nova Auto Junkyard safe code is 7777 | Destructoid all-codes guide | GamesRadar all-codes list | No primary recording or keypad verification gathered | **Likely pending.** Single-chain level for this handoff. |
| Cottonmouth trailer safe code is 44017 | Destructoid and GamesRadar lists | GTABoom consolidated code guide | No direct keypad footage reviewed; source ancestry unclear | **Likely pending.** Five digits; map coordinates unknown. |
| Clunker 556 can be found at Brooks Boatworks | GTABase weapon entry and PC Gamer/VGC Boatworks guides | Guide pages overlap in location context | Naming/category varies: carbine vs assault rifle | **Likely.** Verify exact variant name/category in game. |
| Smuggler Caracara is at Brooks Boatworks | GTABase vehicle entry and VGC Boatworks guide | Same Boatworks guide chain | Performance/price/seat details not established | **Likely location lead.** Do not infer other vehicle fields. |
| Prologue is first story mission | VGC and PC Gamer mission references | Two editorial sources, both pre-launch | Counts/order beyond first mission not reconciled | **Likely.** Validate retail game. |
| Positive Mental Attitude may be missable | PowerPyx/GamesRadar caution about early meditation | Reddit commenters report later completion; TrueTrophies page inaccessible in pass | Direct conflict on whether later meditation works | **Unverified.** Keep missable status unknown. |

### What remains unknown or unavailable

- No reliable app-map coordinates for any discovered safe or item.
- No verified measured weapon or vehicle performance, prices, ammo capacities, prices, seat counts, or unlock prerequisites.
- No verified full mission sequence, mission objectives, rewards, branches, or missables.
- No settled trophy missability evidence.
- No comprehensive verified collectible list, cards, safes, garages, stores, mechanics, shops, or useful building catalog.
- No confirmed game patch version/platform-specific differences in the findings. Patch dependency is therefore Unknown.
- Official and community screenshots were identified, but this pass did not derive precise POI locations from frame-to-map alignment.
- YouTube research did **not** result in any video being watched, transcript read, or frame inspected. The following is only a lead: GridVids indexes a HarryNinetyFour “GTA 6 - Let’s Go Bowling Trophy / Achievement Guide” at https://gridvids.com/harryninetyfour/gta-6-lets-go-bowling-trophy-achievement-guide and lists 1:49–2:10 as keypad 0300/open safe. Its metadata contains the typo “GTA 6 (Grand Theft Auto IV),” so it is not evidence until the original video is inspected. Another trophy-video lead is https://youtu.be/10F0h-OArts; no transcript/timestamp was verified.
- Search snippets and translated pages were treated as leads, not proof. Spanish/French pages surfaced the same safe codes, but appeared likely to copy the same guide chain and were not counted as independent discovery.
- No evidence was found here for GTA V, GTA Online, mods, or concept footage as sources for GTA VI claims. Continue checking every entity/page title and in-game context because search results can mix franchises.

### Lead list for follow-up verification

Keep these separate from app-ready facts:

1. Directly photograph/record each keypad and surrounding landmark for 0300, 6823, 6969, 7777, and 44017; include platform, patch, and whether the clue was collected.
2. Open the original GridVids-linked video, confirm it is actually GTA VI, read accessible captions if available, and inspect the 1:49–2:10 frames before citing. Check its original creator upload for additional safe/landmark evidence.
3. Resolve the 0330 vs 0300 discrepancy with in-game keypad footage or a clear primary source; trace GamesRadar’s 0330 claim to its origin.
4. Verify whether the 6823 safe is described as an office or pool-table room, and separately document the second un-coded safe at Boatworks.
5. Directly test whether Positive Mental Attitude can be earned after Chapter 1; capture trophy progress or unlock evidence and platform/patch.
6. Trace the 7777, 44017, 0420, 7700, 0072, 0212, and 2008 entries back to original gameplay or in-game clue sources; test which are story/job-specific or variable.
7. Check GTAMap/GTADB/Map GTA documentation, public repository history, licensing, and export schemas. Identify whether any dataset exposes raw POI GeoJSON and whether those points can be independently matched to official map landmarks.
8. Record the retail-game version and test whether online guides’ pre-release and launch-week details still match current gameplay.

## 5. Future content

Useful future research areas beyond the app’s first-pass sections:

- **Official visual catalog:** Index Rockstar’s official screenshots by visible region, storefront, signage, vehicle silhouette, and named landmark. Record only readable/visible text or clear observations; visual resemblance alone is not precise map location evidence.
- **Leonida map alignment:** Obtain the actual app basemap, document coordinate transform, then match one or more unambiguous landmarks before mapping POIs. Preserve coordinates as Unknown until validated.
- **POI taxonomy:** Build verified store, garage, mechanic, safe, property, activity, landmark, and service catalogs with access restrictions and hours/availability if the game exposes them.
- **Edition entitlements:** Track edition-exclusive items separately from ordinary acquisition entries, with platform and entitlement conditions.
- **Game-version tracking:** Attach platform, patch/version, source publication date, and in-game verification date to facts likely to change.
- **Progress behavior:** Research missable collectibles/trophies, mutually exclusive branches, one-time events, and post-story cleanup opportunities; these directly affect the app’s personal-progress value.
- **Performance methodology:** For vehicles/weapons, collect reproducible in-game measurements with explicit units, test conditions, upgrades, character, and patch. Keep qualitative UI bars separate from measured stats.
- **Multilingual verification:** Search original in-game names and alternate spellings in Spanish, Portuguese, and other relevant languages, preserving original names alongside translations and tracing translated guides to their source.
- **Public map datasets:** Review repository history, schema, attribution, and license for GTADB, Map GTA, GTAMap.io, Navanem Atlas, and gta6map.github.io before considering data reuse.
- **Retail walkthrough verification:** The launch guides are useful discovery indexes, but their chapter totals, optional mission labels, and missable claims should be checked in retail gameplay.

## 6. Coverage summary and next research priorities

### Coverage table

| Topic | Information found | Missing fields | Sources checked | Next lead |
|---|---|---|---|---|
| Release/platform status | Launch Nov. 19, 2026; PS5 and Xbox Series X|S; official printable map | PC status beyond official page’s listed platforms; patch history | Rockstar Newswire, Support, VI status/news listing | Monitor Rockstar platform and title-update announcements |
| Safe codes and locations | 0300 disputed; 6823 and 6969 cross-listed; 7777 and 44017 reported | Exact app coordinates; direct keypad evidence; patch/platform; full access steps; resolve code conflict | VGC, PC Gamer, Destructoid, GamesRadar, GTABoom, community map leads | In-game verification, original video inspection, source ancestry tracing |
| Other map pins/collectibles | Community map ecosystem identified | Reliable store/garage/mechanic/collectible set; validated POI dataset; basemap transform | Rockstar map, GTAMap.io, GTADB docs, Navanem Atlas, gta6map repo | Inspect datasets and repository docs; align to actual app map |
| Weapons | Clunker 556 acquisition lead at Brooks Boatworks | Accurate stats, price, ammo, category, unlock, comparison data | GTABase, PC Gamer, VGC | Retail-game item inspection and controlled testing |
| Vehicles | Smuggler Caracara location lead at Brooks Boatworks | Performance, handling, seats, price, acquisition conditions/unlocks | GTABase, VGC | Retail-game access and reproducible tests |
| Missions | Prologue listed first; walkthrough hub exists | Complete order, prerequisites, objectives, rewards, unlocks, tips, missables; reconcile counts | VGC, PC Gamer | Record retail mission order and determine optional/story counting |
| Trophies | 18 meditation locations reported; missability dispute identified | Reliable completion method, later opportunity proof, platform/patch | Push Square, PowerPyx, GamesRadar, Reddit, TrueTrophies access attempt | Direct trophy unlock test; inspect achievement evidence |
| Video evidence | Timestamp lead for Bowling safe | No video watched/transcribed/frame-checked | GridVids index, YouTube lead | Inspect source videos and captions; correct metadata typo |
| Future/edition content | Ultimate Edition lists item entitlements | Gameplay acquisition and standard-edition availability | Rockstar Support | Separate edition grant from normal gameplay economy |

### Next priorities, in order

1. Resolve the Kingpin safe’s 0300/0330 disagreement with direct in-game evidence.
2. Obtain and validate the actual app basemap and coordinate transform before creating any map-pin coordinates.
3. Verify the five listed safe entries and trace each to original gameplay/in-game clues; identify job-specific or variable codes.
4. Inspect video transcripts and frames for the Boatworks/Bowling guides; document original upload, timestamps, and what the footage visibly demonstrates versus what narration claims.
5. Test Positive Mental Attitude trophy completion after Chapter 1 and document the exact method.
6. Replace weapon/vehicle sample stats only after reproducible retail-game measurements; keep Unknown fields null until then.
7. Continue the mission sequence and POI catalogs with retail-game evidence, recording version, platform, and missable conditions.

**Coverage statement:** This handoff contains a small set of actionable launch-week leads and source-backed status facts. It does not provide complete map, weapon, vehicle, mission, collectible, or trophy coverage. The largest remaining limitations are lack of direct gameplay verification, no validated app basemap coordinates, unresolved source conflicts, and no video transcript/frame inspection.

## 7. Addendum — expanded research for app data (Nov. 22, 2026)

This section materially expands the first pass. For Claude’s implementation work, use this addendum as the newer finding where an earlier section says a field is Unknown. Keep each field’s evidence type, unit/scale, platform, patch, and observation date attached. This is still research, not a merged dataset.

### Weapon comparisons: 47 retail-menu firearm records

The key distinction for the app is what “damage” means:

1. **In-game menu rating:** the weapon shop displays Damage, Accuracy, Handling, and Range ratings on a 0–10 scale. These are comparison bars, not measured HP removed per shot and not a time-to-kill result.
2. **Extracted game-file projectile value:** GTA.ZONE reports a weapon field named Damage per projectile from Xbox Series game files, version 1.0.2.1. The source says values are copied as found; its units and practical conversion to health are not specified. It also marks inferred units/meanings as interpreted. Preserve it as a raw game-file field in researcher notes if the current app schema has no matching field. Do not label it HP, DPS, or shots-to-kill.
3. **Empirical combat performance:** no controlled launch-week shots-to-kill, DPS, fire-rate-in-rounds-per-minute, recoil, or distance-falloff tests were found for the list below. Those remain Unknown.

**Best retail-menu source:** GTA Playbook, “How do you buy weapons and ammo in GTA 6, and what do they cost?” https://gtaplaybook.com/gta6/guides/buying-weapons-and-ammo/ (updated Nov. 19 and Nov. 21; accessed Nov. 22). The author states they personally read/captured menus at three stores on PS5, version 1.002.001, on Nov. 19; every row links to the screen capture. It lists 47 firearms, prices, four 0–10 bars, and the purchase-state text seen in that save. The article is a specialist’s own retail-game observation, not a Rockstar-published stat sheet. The Leonida’s 69-entry list https://www.theleonida.com/weapons and editorial policy https://www.theleonida.com/editorial-policy independently describe their own Nov. 19 retail PS5 observations; matching values provide useful second-editorial corroboration, while the precise independence of each screenshot is not established.

The tables below retain the source’s labels and displayed scale. Prices are GTA dollars. Captured purchase state is a Nov. 19 save/store observation, not necessarily a permanent gate: “sold out,” “not enough cash,” and “requires bank account” can depend on stock, wallet, progress, or state.

#### Pistols

| Suggested ID / name | Price | Damage /10 | Accuracy /10 | Handling /10 | Range /10 | State seen in source save |
|---|---:|---:|---:|---:|---:|---|
| weapon-girardi-es9 | owned; price not shown | 4.2 | 5.2 | 8.4 | 4.4 | Equipped |
| weapon-scorpio-nipper-38 | $550 | 2.8 | 3.0 | 9.0 | 3.0 | Seen at Chuck’s only |
| weapon-klose-k17 | $975 | 4.0 | 4.2 | 8.5 | 3.8 | Not enough cash |
| weapon-girardi-es18 | $1,550 | 4.2 | 4.6 | 7.7 | 4.8 | Currently sold out |
| weapon-duke-1922 | $1,050 | 5.5 | 4.8 | 8.0 | 4.6 | Requires a bank account |
| weapon-klose-k17-mcd | $1,700 | 4.0 | 3.2 | 7.7 | 4.2 | Currently sold out |
| weapon-schlamm-drx | $2,100 | 4.0 | 4.2 | 8.2 | 4.2 | Currently sold out |
| weapon-fairview-kalinga-50 | $3,100 | 7.0 | 4.0 | 7.8 | 5.0 | Currently sold out |

#### Revolvers

| Suggested ID / name | Price | Damage /10 | Accuracy /10 | Handling /10 | Range /10 | State seen in source save |
|---|---:|---:|---:|---:|---:|---|
| weapon-wortham-wcr1 | $600 | 2.2 | 3.8 | 9.0 | 4.5 | Buy 5 more guns to unlock |
| weapon-hawk-little-38 | $1,075 | 2.5 | 5.0 | 8.6 | 4.5 | Buy 5 more guns to unlock |
| weapon-duke-mustang-357 | $1,800 | 5.7 | 4.5 | 8.0 | 5.5 | Buy 3 more guns to unlock |
| weapon-scorpio-akulus | $3,000 | 7.0 | 4.2 | 7.6 | 6.0 | Currently sold out |

#### Submachine guns

| Suggested ID / name | Price | Damage /10 | Accuracy /10 | Handling /10 | Range /10 | State seen in source save |
|---|---:|---:|---:|---:|---:|---|
| weapon-wortham-w-10 | $825 | 4.2 | 3.2 | 7.5 | 3.5 | Currently sold out |
| weapon-zhang-wu-type-9 | $1,100 | 4.2 | 3.8 | 7.8 | 3.5 | Currently sold out |
| weapon-bzi-vatra | $1,200 | 4.2 | 3.8 | 6.5 | 4.0 | Currently sold out |
| weapon-deever-tech-dsg | $1,350 | 4.2 | 4.2 | 6.9 | 4.0 | Currently sold out |
| weapon-schlamm-dw-9 | $1,750 | 4.2 | 4.5 | 6.8 | 4.0 | Currently sold out |
| weapon-vom-feuer-vf5 | $2,325 | 4.2 | 5.0 | 6.7 | 4.5 | Currently sold out |
| weapon-vom-feuer-vf5c | $2,600 | 4.2 | 4.0 | 7.9 | 4.0 | Currently sold out |
| weapon-adb-pd-90 | $3,350 | 4.2 | 4.8 | 6.6 | 4.2 | Currently sold out |

#### Shotguns

| Suggested ID / name | Price | Damage /10 | Accuracy /10 | Handling /10 | Range /10 | State seen in source save |
|---|---:|---:|---:|---:|---:|---|
| weapon-fortune-son-moreland-850 | $700 | 7.5 | 4.2 | 5.6 | 2.5 | Currently sold out at Big Shots; Chuck’s showed $350 sale price from $700 |
| weapon-fortune-son-gorse-425 | $850 | 7.5 | 3.8 | 6.2 | 2.0 | Not enough cash |
| weapon-shrewsbury-drifter | $1,150 | 8.0 | 4.1 | 5.0 | 2.5 | Requires a bank account |
| weapon-shrewsbury-hobo | $1,325 | 8.0 | 3.6 | 6.4 | 2.0 | Requires a bank account |
| weapon-mason-keen-longshot | $1,425 | 8.0 | 4.1 | 5.0 | 2.5 | Buy 3 more guns to unlock |
| weapon-mason-keen-shortstraw | $1,625 | 8.0 | 3.6 | 6.4 | 2.0 | Buy 3 more guns to unlock |
| weapon-girardi-az1200 | $2,300 | 7.4 | 4.5 | 5.8 | 2.5 | Buy 5 more guns to unlock |
| weapon-girardi-verro | $2,700 | 7.4 | 3.9 | 6.5 | 2.0 | Buy 5 more guns to unlock |
| weapon-girardi-super400 | $2,825 | 7.4 | 4.2 | 5.3 | 2.5 | Currently sold out |
| weapon-kozlov-kvga-12 | $3,650 | 7.2 | 4.5 | 5.1 | 2.5 | Currently sold out |
| weapon-goodwin-comshot-12 | $3,825 | 7.7 | 4.2 | 4.0 | 2.5 | Currently sold out |

#### Assault rifles

| Suggested ID / name | Price | Damage /10 | Accuracy /10 | Handling /10 | Range /10 | State seen in source save |
|---|---:|---:|---:|---:|---:|---|
| weapon-kozlov-kz-59 | $1,250 | 5.4 | 5.2 | 5.2 | 6.5 | Buy 3 more guns to unlock |
| weapon-duke-556 | $1,450 | 5.0 | 6.0 | 5.8 | 6.2 | Requires a bank account |
| weapon-kozlov-hind | $1,700 | 5.4 | 3.5 | 7.1 | 4.5 | Currently sold out |
| weapon-hillinger-heathen | $2,450 | 5.0 | 6.2 | 5.8 | 6.2 | Currently sold out |
| weapon-adb-fra | $2,900 | 5.8 | 5.0 | 5.3 | 6.9 | Buy 3 more guns to unlock |
| weapon-vom-feuer-vf-g1 | $3,700 | 5.0 | 6.2 | 5.8 | 6.5 | Currently sold out |

#### Tactical rifles

| Suggested ID / name | Price | Damage /10 | Accuracy /10 | Handling /10 | Range /10 | State seen in source save |
|---|---:|---:|---:|---:|---:|---|
| weapon-hawk-little-mediator | $900 | 4.8 | 7.8 | 5.6 | 7.0 | Currently sold out |
| weapon-wortham-w-14 | $1,400 | 5.8 | 7.5 | 5.2 | 7.2 | Requires a bank account |
| weapon-hillinger-m306 | $2,375 | 6.2 | 7.5 | 4.8 | 7.5 | Buy 5 more guns to unlock |
| weapon-hillinger-m306-tmr | $2,550 | 6.2 | 7.8 | 5.5 | 7.5 | Get gold in all ranges |

#### Sniper rifles

| Suggested ID / name | Price | Damage /10 | Accuracy /10 | Handling /10 | Range /10 | State seen in source save |
|---|---:|---:|---:|---:|---:|---|
| weapon-fortune-son-laird-350 | $950 | 6.5 | 8.8 | 3.6 | 8.4 | Not enough cash |
| weapon-fairview-ff-sr | $2,950 | 8.0 | 8.3 | 2.9 | 8.4 | Currently sold out |
| weapon-fairview-ff-50 | $3,975 | 8.5 | 7.8 | 2.5 | 8.5 | Currently sold out |
| weapon-shrewsbury-sm-69 | $1,850 | 6.8 | 8.4 | 3.1 | 8.4 | Buy 3 more guns to unlock at Hamlet Traders |

#### Machine gun and launcher

| Suggested ID / name | Price | Damage /10 | Accuracy /10 | Handling /10 | Range /10 | State seen in source save |
|---|---:|---:|---:|---:|---:|---|
| weapon-adb-m350 | $10,000 | 6.5 | 3.0 | 3.2 | 6.2 | Currently sold out |
| weapon-hillinger-boomer | $12,000 | 9.2 | 5.0 | 6.0 | 4.0 | Currently sold out |

These are 47 firearm base entries in that guide’s store coverage, not the complete universe of melee weapons, explosives, unique variants, or weapons only found in the world. Other databases show larger totals because they count separate unique variants and additional categories differently. Do not treat counts as a settled total.

#### Unique-weapon correction: Duke 556 versus Clunker 556

Keep these as two records if the project tracks unique weapon variants:

- **weapon-duke-556 — Duke 556:** retail name “Duke 556”; gun-store type “Carbine rifle” under the Assault rifles store category. The Leonida reports 5.0 Damage, 6.0 Accuracy, 5.8 Handling, 6.2 Range; $1,450 at Big Shots; paid with BuckMe; in its PS5 save it was available without an additional gun-count unlock but required an account. Rockstar’s An Extended Look at 25:07 displays “Duke 556 Assault Rifle” over a dropped weapon, while the store labels it a carbine rifle. Record the retail store category and note the footage naming difference.
- **weapon-clunker-556 — Clunker 556 unique variant:** not a synonym for the base gun. GTA.ZONE’s Xbox Series game-file extract and GTABase identify it as a unique Duke 556 variant; GTA guides place it in a case upstairs in the smaller two-storey building at Brooks Boatworks during the illegal-operation robbery. GTA.ZONE reports menu bars Damage 5.0, Accuracy 5.8, Handling 6.8, Range 5.8, magazine 30, automatic fire, and 5.56×45 mm caliber. Do not copy the base Duke’s menu bars onto the Clunker variant.
- GTA.ZONE reports the base Duke 556 game-file “Damage per projectile” as 22, ammo type AMMO_RIFLE, with a rubber-rifle ammo value of 25 in its separate damage type. These are raw game-file fields without a validated health-point unit. Do not interpret the rubber value as more lethal or derive a shots-to-kill count from it.
- GTA.ZONE lists an interpreted base weapon range of 250 m and lock-on range 80 m. Do not enter those as confirmed real-world/meters effective range; the source labels units/meaning as interpretation.
- Attachments and bundles can change displayed bars. GTA Playbook observed KZ-59 bundle $3,620 vs $1,250 bare, ADB FRA $6,165 vs $2,900 bare, and AZ1200 $3,460 vs $2,300 bare. It explicitly shows mod-related stat changes on bundle panels. Keep base and modified stats separate.

#### Ammunition, carrying limits, store and unlock evidence

GTA Playbook directly captured these store ammo boxes/prices on PS5 version 1.002.001, Nov. 19. The displayed amounts per category are purchase box quantity, not magazine capacity:

| Ammo category | Box quantity | Price | Captured maximum carried |
|---|---:|---:|---:|
| Pistol ammo | 50 | $24 | 100 |
| Revolver ammo | 50 | $32 | Unknown |
| SMG ammo | 50 | $28 | Unknown |
| Shotgun ammo | 10 | $15 | 100 |
| Assault rifle ammo | 30 | $22 | 300 |
| Tactical rifle ammo | 30 | $36 | 120 |
| Sniper rifle ammo | 20 | $45 | 80 |
| Small game rifle ammo | 50 | $20 | Unknown |
| Machine gun ammo | 100 | $260 | Unknown |

One save at Big Shots/Chuck’s/Hamlet Traders showed different gates: Buy 3 or Buy 5 more guns; Requires a bank account; Get gold in all ranges (Hillinger M306 TMR); Not enough cash; Currently sold out; and Unavailable. These strings are useful app detail fields, but availability states should be verified as progress/stock-dependent and must not be recast as permanent unlock facts without testing. The store also displayed bundles with attached mods. The game labels bank money as BuckMe; cash and BuckMe are distinct payment sources.

#### Weapon source ledger

| Source | What it directly supports | Limits / independence |
|---|---|---|
| GTA Playbook firearm guide, https://gtaplaybook.com/gta6/guides/buying-weapons-and-ammo/ | 47 retail menu entries; 0–10 bars, prices, store names, purchase-state strings, nine ammo box quantities/prices, five category ammo caps; launch-day own PS5 capture, version 1.002.001 | One editorial capture chain; page updated Nov. 19/21. Store states may vary. Menu bars are not actual per-shot performance. |
| The Leonida weapon list, https://www.theleonida.com/weapons | 69 total list with categories, menu bars, prices, mods, unlock states; own PS5 retail copy checked Nov. 19 | Different list coverage; not Rockstar-authored. Its policy says “verified in-game” entries were retail-checked and rechecked after patches; individual overlap is corroboration, not necessarily an entirely independent observation. |
| The Leonida editorial policy, https://www.theleonida.com/editorial-policy | States that after Nov. 19 it reports retail PS5/Xbox observations, labels verification date/console, does not publish datamines as fact | Editorial policy is self-described methodology, not third-party audit |
| GTA.ZONE weapon dataset, https://negentropy.studio/weapons/ | Extracted menu fields, projectile-damage field, ammo, magazine, modifiers, unique variants, internal identifiers | Fan-made game-file analysis; not Rockstar documentation; Xbox Series version 1.0.2.1; some field meanings/units are interpreted and files may include unused/inherited fields |
| GTA.ZONE methodology, https://negentropy.studio/about/ | Says copy used is Xbox Series version 1.0.2.1, fields are copied as they appear, interpreted meanings/units are marked, and file presence does not prove use | Reverse-engineered dataset, patch-dependent; not empirical combat testing |
| Clunker 556 guide/database entry, https://www.gtabase.com/gta-6/weapons/clunker-556 | Variant identity/location lead at Brooks Boatworks | Do not use GTABase 0–10 bars as independent measurement if it draws on the same game/menu/database chain; verify exact interior and robbery context |
| Rockstar An Extended Look, https://www.youtube.com/watch?v=VQRLujxTm3c at 25:07 | Visible prompt text “Duke 556 Assault Rifle” and pickup/fire moment | Observation does not establish shop bar values, stats, price, or Clunker identity |

### Vehicles: comparison bars are not tested speed

Vehicle databases now provide useful app-comparison ratings, but not tested mph or acceleration times.

- GTADB says its vehicle data is based on GTABase with permission and cross-checked against wikis; therefore those fields are not an independent data chain from GTABase. It reports 348 catalogued entries and 76 with published ratings as of its current page. Do not use entry counts as complete game totals.
- Timesaver and The Gamers Hub explicitly say reliable tested top speeds are not published. Keep measured speed/time/distance fields Unknown.
- The game’s vehicle UI ratings are five separate bars: Speed, Acceleration, Asphalt Handling, Off-road Handling, Strength, each out of 10. Preserve these as UI ratings, not physical test units.
- For the Brooks Boatworks Smuggler Caracara, sources agree on location, but its financial/access fields conflict or remain single-source: one database claims four seats and six storage but had no screenshot available; one guide gives registration $5,855 and sell $5,550, while another gives registration $5,550 and sell $6,490. Those are registration fee and sell value, not ordinary purchase/MSRP. Leave disputed/single-source fields Unknown pending capture.
- Source leads: GTADB vehicle DB https://gtadb.gg/vehicles/; GTABase Caracara https://www.gtabase.com/gta-6/vehicles/smuggler-caracara; Timesaver https://timesaver.gg/tools/gta-6/cars; The Gamers Hub https://www.thegamershub.co/gta-6/vehicle-database/; OpenLeonida comparator explanation https://openleonida.com/tools/vehicle-comparator/?v=sandking-xl; GTA6Info Caracara https://gta6info.app/vehicles/vapid-smuggler-caracara; Leonida Players rare/standout vehicle guide https://leonidaplayers.com/guides/gta-6-standout-vehicles-rare-car-locations-list; MetaForge standout vehicle guide https://metaforge.app/gta-6/gta-6-standout-vehicles-locations.
- App note: keep UI ratings, measured performance, registration cost, sale value, ordinary purchase price, seats/storage, security/tracker state, and story unlocks as different facts. Do not backfill one field from another.

### Map findings: randomized safe codes and sourceable public maps

- Safe codes are not all fixed. VGC’s Avery Pawn guide reports a randomized code per playthrough; during Hit Avery Pawn, threaten an employee repeatedly until the “Safe Code?” option appears. The safe is in the back office beside the desk; the office also has CCTV/alarm controls. Killing/knocking out the employee removes that interrogation route. Do not save the observed code 3156 as a universal code. Source: https://www.videogameschronicle.com/guide/gta-6-avery-pawn-shop-safe-code-how-to-find-and-open-the-safe/ (published Nov. 21; accessed Nov. 22).
- PC Gamer reports the in-game map identifies whether establishments have safes and displays security level and approximate goods value; guides say some codes are static and some randomized. Source: https://www.pcgamer.com/games/grand-theft-auto/gta-6-safe-codes-combinations/ (updated Nov. 20). Treat the in-game interface behavior as a guide claim pending a captured screenshot.
- Additional fixed-code leads that were surfaced but not individually traced/verified: Sunrise RV Park dock warehouse 6769; Farm Fix Meth Lab 2121 (Chapter 5); Thirsty Wolf biker hideout 1982; Illegal Sneaker Trade 4124; Casa Guardia 1965; Saber Shipping Yard 8046; Leonida Carrier Warehouse 9256; Watson Bay Safehouse 1819; JanJak’s Garage 4444; Palmer Fishing Warehouse 1887. A secondary list has a conflicting 1886 typo for Palmer. Lead aggregator: https://gta6pocket.com/en/safe-codes/. Keep these in a verification queue, not live facts.
- A stronger small-location lead is Father Scrumpy’s Red Apple Orchard garage, code 360782. Reddit posts describe climbing a blue tractor, entering the large barn through a roof opening, and reading a magazine whose issue/month/year numbers form the code; GTA BOOM also lists the garage code and a Declasse Applesauce Bobcat reward. Sources: https://www.reddit.com/r/GTA6unmoderated/comments/1y225sh/i_solved_the_red_apple_orchard_garage_code_in_gta/; https://www.reddit.com/r/GTA/comments/1y1kvv6/code_for_apple_farm/; https://www.gtaboom.com/gta-6-safe-door-garage-codes-43af. **Likely community finding** pending original in-game screenshot/video verification; coordinates remain unknown.
- GTADB’s interactive map https://gtadb.net/gta-6-map/interactive/ has a documented in-game map layer with curated POIs, provenance/notes/photos, and a separate trailer/screenshot layer. It reports hundreds of POIs as of Nov. 22, but warns that map icons do not establish business name/interior, source strength varies, and some points are approximate.
- GTADB public repo https://github.com/rolux/gtadb.org says use its public Git repo rather than fetching live data/media from its site; code is MIT, data CC BY 4.0 with attribution to gtadb.org and contributors. Verify current license before reuse.
- Palm Underworld methodology https://www.gtavl.com/map/ describes a coordinate calibration on its specific YANIS V18 basemap (387 alignment points; median 5 m, maximum 13 m) and a separate IGN-to-game calibration for some findings (212 matches; median 0.04 m, max 0.7 m). This establishes that documented transforms exist for those particular maps, not for the app’s placeholder image.
- Mapheist https://mapheist.com/en/data/ offers JSON/CSV and documents its YANIS v16 grid (zoom 5, 1 px = 1 m) plus source labels and CC BY 4.0. It mainly tracks trailer/frame-derived landmarks and should be treated as a discovery dataset, not a verified retail POI set.
- The Leonida map https://www.theleonida.com/map is a useful discovery index with curated POIs, but its basemap is the official printable poster and no public export/coordinate transform was located. Do not copy its pin coordinates into this app without a validated transform.

### Missions and trophy corrections

- Represent mission ordering as a graph or prerequisite/branch relationships rather than a single total or rigid sequence. Launch guides disagree on whether the full story total is 91, 93, or 95, and on Chapter 2/3 counts; they split short interludes and optional steps differently. Chapter 1’s 22 named recap missions are more consistent, but several are parallel and can occur in different order. Sources include VGC hub, PC Gamer, GTACulture, PowerPyx and a count comparison at https://completionmap.com/gta-6-missions-by-chapter/. Do not make total mission count a progress ID.
- PowerPyx reports mission markers with hourglass/time-sensitive optional opportunities can be missed, but says they do not affect trophies/100% (https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/). Treat as a guide claim and verify individual records; the app should distinguish “missable optional content” from “required for trophy/100%.”
- Mission example leads from Chapter 1 walkthroughs: after Gone Fishing, missions 3–7 can be completed in varying order; Gear Up is reported to provide a longarm and unlock Ammu-Nation; Just a Scratch repairs/resprays; Buck Me introduces the bank account/ATM deposits; Discharge Time incurs a hospital bill from BuckMe. These are guide claims needing individual retail validation before promoting to confirmed.
- Positive Mental Attitude trophy: PowerPyx says 18 meditation spots across 10 locations; Jason and Lucia may each count at a location, and the tracker is Progress > Collections > Exploration > Meditations. PowerPyx warns the introductory meditation prompt may be missable because it increases the counter but is not marked as a “Meditation Spot.” Newer Reddit launch-week report says the author skipped/failed that scene and later unlocked the Xbox achievement after Chapter 2; commenter reports Lucia later offers meditation in Kelly County. Source: https://www.reddit.com/r/Trophies/comments/1y1kioi/gta_6_meditation_is_not_missable/ (published Nov. 20/21; accessed Nov. 22). This is a user report with an achievement-unlock image, not controlled verification. Correction to the first-pass note: do not characterize it as likely missable; status remains **Unresolved, with evidence leaning not missable**. Do not set missable true. Keep the exact route/requirements open until directly confirmed.
- Trophy guide also reports 55 PS5 trophies (1 Platinum, 2 Gold, 6 Silver, 46 Bronze, no online trophies in its guide copy), but it was published Nov. 18 before public launch. Treat totals as guide-reported, not official Rockstar specifications.

### App-oriented coverage update

| App area | Better supported fields now available | Still missing or unsafe to infer | Schema/implementation note for Claude |
|---|---|---|---|
| Weapons | 47 store firearm records with 0–10 menu bars, prices, some purchase gates; 9 ammo types and box prices; some category carry caps; extracted raw projectile parameter for selected weapons; one unique variant at a location | Actual HP damage per bullet, DPS/TTK, shots-to-kill, RPM, per-weapon magazine/capacity for all firearms, recoil tests, universal stock/availability, patch stability | Preserve scale and provenance. If schema uses 0–100 stats, inspect its documented semantics before converting a 0–10 display value. Do not silently multiply. Keep menuDamage and rawProjectileDamage conceptually distinct; if schema has no raw field, put it in notes or leave it unmapped. |
| Vehicles | UI rating axes out of 10; theft/access/registration and sale mechanics are emerging; Brooks Boatworks location | Measured mph/acceleration times, controlled handling, stable price/seat figures for Caracara | Store UI ratings separately from measured tests and sale/registration costs. |
| Map | Static vs randomized safe distinction; directions/interrogation details for Avery Pawn; public curated-map source docs and coordinate methods for specific known basemaps | App-basemap transform, many per-POI primary checks, reliable universal map coordinates | Code model should distinguish fixed/random, clue/interrogation, access condition, and per-run code. Do not persist run-specific values as global facts. |
| Missions | Branch/parallel order clues, a few acquisition/reward/unlock leads, optional hourglass missable distinction | Complete objectives/rewards/prerequisites validated on retail build; exact total/order | Model relationships and per-mission records; do not build progress on aggregate mission totals. |
| Trophies | Requirement and tracker path guide claims; post-Chapter-2 completion report | Direct controlled proof of whether early prompt is missable and exact recovery route | Keep missable unknown until replicated; source the platform/patch and do not conflate trophies with 100% requirements. |

**Revised next research priorities for the app**

1. Add the 47 launch-captured retail firearm bar/price records as research candidates with source platform, version, and Nov. 19 observation date; independently check current retail menus before treating statuses as current.
2. Decide whether the existing weapon schema has a native 0–10 bar scale. Preserve the source scale in notes if the schema cannot represent it without changing semantics.
3. Keep per-shot projectile field from game-file extraction isolated and explicitly unitless; design a later controlled validation test against target health/armor before presenting user-facing damage-per-shot, DPS, or TTK.
4. Extend unique weapon variants separately from base weapon IDs; retain Clunker 556 distinct from Duke 556 and compare its altered menu ratings.
5. Capture every weapon’s ammo category, magazine, reserve carry cap, reload, fire mode, attachments, and unlock state from retail UI; current sources only cover subsets.
6. Use GTADB/Palm/Mapheist/The Leonida maps as leads with provenance, but first obtain the app’s real basemap and verify a transform using known landmarks.
7. Verify safe randomization (Avery Pawn and other robberies) in multiple playthroughs; classify the stored data as static code, randomized code, per-run observation, or clue route.
8. Test the meditation trophy after the early scene and record screenshot, platform, version, chapter and exact unlock route; meanwhile leave the app’s missable status unknown.
9. Continue mission research as separate canonical entries with parallel prerequisites, rewards and missables; reconcile individual claims against the retail version instead of averaging total counts.
10. Perform a GTA V/Online contamination audit whenever importing large community datasets; preserve each dataset’s own provenance, coordinate system, license, patch and evidence tier.

**Revision note:** This addendum intentionally supersedes the first-pass statements that weapon stats/prices were wholly unavailable and that Positive Mental Attitude had meaningful evidence leaning toward missable. The supported state is more precise: menu comparison bars and launch prices exist; actual empirical combat damage/TTK remains unresolved; trophy missability evidence now leans toward not missable but is not directly replicated.

### 8. Schema alignment note for Claude

The live repository weapon schema was checked after drafting the previous addendum. Relevant constraints:

- Common fields: stable ID, name, section, summary/details, confidence enum, source records with HTTPS URL/title/access date, and last-verified date.
- Weapon fields: category; damage, fire_rate, range, accuracy each number-or-null constrained to 0–100; clip_size and price nonnegative number-or-null; unlock_how text-or-null.
- The schema documents those four bar fields as UI-style ratings. Therefore, where the source gives the game’s 0–10 store rating, the app’s 0–100 UI-bar field can be populated as rating × 10 while preserving the original 0–10 value in details/source notes. This is a schema scale conversion, not a conversion to actual damage or measured performance.
- The game menu exposes Damage, Accuracy, Handling, and Range. It does not expose a Fire Rate bar in the captured menu. Do not put Handling into the schema’s fire_rate field. For every firearm in the table, leave fire_rate null unless independent evidence supplies an actual fire-rate measure that matches the schema’s meaning.
- Example base Duke 556 schema mapping from the Nov. 19 PS5 menu: category “Carbine rifle” (in the store’s Assault rifles category); damage 50; accuracy 60; range 62; fire_rate null; clip_size 30 only if using the matching game-file record or another direct source; price 1450; unlock_how should preserve observed payment and availability wording with source-specific caveat. Put Handling 5.8/10 in details because there is no handling field.
- Example Clunker 556 unique variant: damage 50; accuracy 58; range 58; fire_rate null; clip_size 30 from the Xbox Series v1.0.2.1 game-file record; price null; acquisition text points to the Brooks Boatworks case as a guide-reported unique pickup, platform/source cited. Put Handling 6.8/10 in details. Do not reuse base Duke accuracy/handling/range for this variant.
- A category ammo box purchase quantity is not clip_size. The captured store box quantities and carry limits belong in details/Claude notes unless the current schema has an existing supported way to represent them; this research does not redesign the app.
- The base projectile-damage number 22 is not the same as schema damage=50. Store only in a clearly labeled details note if Claude decides that raw game-file data belongs in this app; do not populate the UI damage bar with it.

The existing sample weapon records have IDs weapon-sample-pistol, weapon-sample-carbine, and weapon-sample-shotgun. Their current statistics, prices, clip counts, and acquisition text are placeholders. Preserve progress compatibility by following the project’s ID rules: retain an ID when updating the same record in place, use new stable IDs for new distinct weapons/variants, and do not repurpose an ID to mean a different entity. Preserve progress data if a sample entry is removed or replaced.

### 9. Additional vehicle finding for the existing Caracara lead

The earlier handoff described the Smuggler Caracara only as a location lead. GTA.ZONE’s Xbox Series game-file database (version 1.0.2.1; accessed Nov. 22) reports a **standout Caracara 4x4 variant** tied to the Kolt docks with these in-game menu ratings: Speed 5.9/10, Acceleration 7.3/10, Asphalt Handling 3.0/10, Off-road Handling 7.6/10, Strength 4.2/10. Its availability text is “Discover in game.” Source: https://negentropy.studio/standout-vehicles/caracara4x4-cmp-kolt-docks-preset1/

The base Caracara 4x4 game-file record reports top speed 165.1 km/h, 0–60 in 7.65 s, 60–0 braking distance 43.1 m, estimated top speed 166.5 km/h, off-road speed 111.5 km/h, AWD front bias 0.33, six gears, and mass 2,340 kg. Source: https://negentropy.studio/vehicles/caracara4x4/

**Caution:** These are decoded game-file values from an unofficial parser, not independent road tests. GTA.ZONE labels some units/meanings as interpreted; check its current record’s per-field labels before mapping them. The standout Caracara is a modified variant; do not copy base-model performance onto it without confirming inheritance. No verified purchase price or seat count was located. Keep the game-menu five-bar ratings separate from speed/braking measurements and preserve the file version/platform.
## Mission deep-dive — complete reported rosters, order conflicts, and app-useful evidence

Research date: 2026-11-22. The user asked for every mission and its order. No official Rockstar full mission list/count was found. Guides count different entity types, so this handoff preserves the source-specific counts rather than inventing a canonical total.

### Count conflict

| Count | What that source counts | Chapter counts | Confidence/use |
|---|---|---|---|
| 91 | PC Gamer's broad story list | 22/11/26/25/7 | Good baseline roster; guide taxonomy only. |
| 93 | Press Start count reported as Story Recap; Vice Atlas says 91 plus two Billy jobs | 22/13/26/25/7 | Secondary report; original Press Start page inaccessible here. |
| 95 | VGC says list is in Story Recap order | 22/13/28/25/7 | Useful title/order, but includes Tyrone side-strand entries that PowerPyx calls optional. |
| 107 + 27 optional | GTABase separates short named tasks from optional records | Varying task-level categories | Useful discovery catalog; not comparable to broad-story counts. |
| 34+/27/38/39+/10 | PowerPyx sequence includes optional jobs, short tasks and map-start labels | Not a story total | Walkthrough index, not canonical count. |

VGC (Jordan Middler, 19 Nov 2026, https://www.videogameschronicle.com/guide/gta-6-chapters-and-mission-list-how-many-chapters-in-gta-6-spoiler-free/) supports the 95 and chapter counts and says its list follows Story Recap order. PC Gamer (Sean Martin/Christopher Livingston, 18 Nov 2026, https://www.pcgamer.com/games/grand-theft-auto/gta-6-mission-list/) supports 91 titles, chapter totals and short descriptions. GTABase's evolving mission index (https://www.gtabase.com/gta-6/missions/) expands named short tasks. PowerPyx's 18 Nov full walkthrough (https://www.powerpyx.com/gta-6-full-walkthrough-all-missions/) interleaves main, optional, short and map-trigger entries. Some sites credit/copy PowerPyx; count that as one evidence chain. All accessed 22 Nov 2026.

### Broad Story Recap roster

Summaries below are concise guide descriptions, not direct gameplay observations. Order means the cited list's display order, not a proven exclusive playable sequence. Suggested IDs are candidates only; reconcile with repo IDs and preserve personal progress. Repo audit found three sample mission records: mission-sample-intro, mission-sample-second, mission-sample-side.

#### Prologue and Chapter 1 — Just Like Paradise (22)

| # | Suggested ID — title | Practical purpose |
|---:|---|---|
| 0 | mission-prologue — Prologue | Lucia discusses her arrest/release with a prison counselor. |
| 1 | mission-gone-fishing — Gone Fishing | Jason and Donnie's smuggling run takes Jason into Kingfishers territory. |
| 2 | mission-gear-up — Gear Up | Jason buys a longarm. |
| 3 | mission-just-a-scratch — Just A Scratch | Jason takes his damaged Ganado for repair. |
| 4 | mission-lab-fees — Lab Fees | Jason collects rent for Brian. |
| 5 | mission-unwanted-attention — Unwanted Attention | Cal and Jason go to Hamlet over an impound/payment. |
| 6 | mission-pipework — Pipework | Jason collects rent from Mandy and fixes plumbing. |
| 7 | mission-hey-arnold — Hey Arnold! | Jason, Cal and Brian search for broker Arnold. |
| 8 | mission-island-dreams — Island Dreams | Jason leads a dive linked to Kenton's bachelor party and a shipwreck. |
| 9 | mission-feng-shui — Feng Shui | Jason and Cal rearrange/furnish Jason's home before Lucia arrives. |
| 10 | mission-coming-home — Coming Home | Jason picks Lucia up after prison release. |
| 11 | mission-buck-me — Buck Me | Jason and Lucia set up her bank account. |
| 12 | mission-clean-up-after-donnie — Clean Up After Donnie | Jason retrieves a lost package from Donnie's delivery. |
| 13 | mission-down-to-earth — Down to Earth | Jason and Lucia join Brian for a smuggling job. |
| 14 | mission-clear-skies — Clear Skies | Jason and Donnie visit the bikers. |
| 15 | mission-day-release — Day Release | Jason and Lucia go out with Mattia and Kat. |
| 16 | mission-swamped — Swamped | Jason, Brian and Lorrie encounter the Kingfishers. |
| 17 | mission-don-gone — Don Gone | Guide description: clean up Donnie's trailer; one list redacts title. |
| 18 | mission-recalibration — Recalibration | Jason and Lucia reconnect with Cal. |
| 19 | mission-tourist-trap — Tourist Trap | Jason and Lucia take a pickup job; guide-reported point of no return. |
| 20 | mission-home-sweet-home — Home Sweet Home | Lucia returns to Jason's home; chapter-end sequence continues. |
| 21 | mission-discharge-time — Discharge Time | Lucia checks on Jason at hospital; closes chapter. |

#### Chapter 2 — Paradise Lost (11 broad entries; some lists add two Billy jobs)

| # | Suggested ID — title | Practical purpose |
|---:|---|---|
| 1 | mission-whats-in-the-bag — What's in the Bag? | Arrive in Port Gellhorn; guide says Lucia becomes freely playable. |
| 2 | mission-ambulance-chaser — Ambulance Chaser | Lucia disposes of escape ambulance. |
| 3 | mission-just-moved-in — Just Moved In | Lucia shops for new place. |
| 4 | mission-girls-trip — Girls' Trip | Lucia makes a friend and seeks painkillers for Jason. |
| 5 | mission-moses — Moses | Lucia meets mechanic; guide reports Slim Jim and vehicle-service unlocks. |
| 6 | mission-daily-driver — Daily Driver | Lucia obtains Canis Crawler. |
| 7 | mission-slam-dunk — Slam Dunk | Lucia and Dunk arrange painkillers for Jason. |
| 8 | mission-breakfast-run — Breakfast Run | Jason and Lucia get breakfast. |
| 9 | mission-coffee-break — Coffee Break | They plan next move; guide reports free character-switch unlock. |
| 10 | mission-afternoon-delight — Afternoon Delight | Jason and Lucia rob Vicki's strip club. |
| 11 | mission-checking-out — Checking Out | Leave for Vice City after progression gates. |
| Optional | mission-thrillbillies — Thrillbillies | Billy's dirt-bike crew activity. |
| Optional | mission-twist-wrist-smash-grab — Twist Wrist, Smash, Grab | Billy's crew job. |

#### Chapter 3 — Tits Ass Drug Money (26 baseline; VGC 28)

| # | Suggested ID — title | Practical purpose |
|---:|---|---|
| 1 | mission-welcome-to-vice-city — Welcome to Vice City | Jason and Lucia return to Vice City. |
| 2 | mission-dealers-choice — Dealer's Choice | Meet Heders / establish jobs. |
| 3 | mission-meet-the-heders — Meet the Heders | Meet Heders; guide reports cut-off tool reward for orange SCOOP containers. |
| 4 | mission-dubious-provenance — Dubious Provenance | Begin Tyrone/Goods Drop Off thread. |
| 5 | mission-mami-knows-best — Mami Knows Best | Lucia handles personal/family matter. |
| 6 | mission-south-leonida-real-estate — South Leonida Real Estate | Property opportunity. |
| 7 | mission-tyrone — Tyrone | Advance Tyrone thread; source classification differs. |
| 8 | mission-here-kitty-kitty — Here, Kitty Kitty | Jason meets Tyrone; guide says Goods Drop Off unlocks. |
| 9 | mission-car-service — Car Service / Car Services | Meet/assist Real Dimez. |
| 10 | mission-top-billing — Top Billing | Follow Real Dimez. |
| 11 | mission-boobie-time — Boobie Time | Work connected with Boobie/Real Dimez. |
| 12 | mission-first-impressions — First Impressions | Meet Raul; guide reports $3,000. |
| 13 | mission-caught-slipping — Caught Slipping | Real Dimez event; guide says after Boobie Time and First Impressions. |
| 14 | mission-crosstown-traffic — Crosstown Traffic | Advance crew/robbery setup. |
| 15 | mission-credit-check — Credit Check | Meet Raul's crew; guide reports $6,000, Dye Pack Jammer, robbery targets. |
| 16 | mission-steal-zorrusso-for-randy — Steal the Zorrusso for Randy | Obtain a Zorrusso; aliases include Steal Zorrusso and Clonin' Keys, Makin' Gs. |
| 17 | mission-sinfrontera-national-bank — Sinfrontera National Bank | Cartel-heist preparation/execution. |
| 18 | mission-security-expert — Security Expert | Security preparation. |
| 19 | mission-ride-or-die — Ride or Die | Advance crew/heist story. |
| 20 | mission-company-property — Company Property | Secure property for heist preparation. |
| 21 | mission-the-missing-link — The Missing Link | Lucia-only prep; guide reports unique pistol pickup. |
| 22 | mission-safe-word — Safe Word | Practice safe; optional reward guide-reported. |
| 23 | mission-cooties — Cooties | Heist job; prerequisite named by Hidden Charges guide. |
| 24 | mission-bricked-up — Bricked Up | Advance cartel story. |
| 25 | mission-hidden-charges — Hidden Charges | Prepare explosives; guide says requires Company Property + Cooties. |
| 26 | mission-the-cartel-heist — The Cartel Heist | Execute cartel heist. |
| disputed | mission-kitty-litter-labs — Kitty Litter Labs / Take Out Kitty Litter | Tyrone strand: shut down labs. |
| disputed | mission-spin-on-this — Spin On This | Tyrone strand: shut down main synthetic-drug operation; VGC includes, PowerPyx calls optional. |

PC Gamer/Press Start list 26; VGC includes the two disputed entries. GTABase adds other short task records, so its expanded 28 is not the same 28. This is a category conflict, not a confirmed mistake in the game.

#### Chapter 4 — Vice City, Baby (25 broad entries)

1 Ocean Beach — open chapter story.
2 Another Life — continue undercover/property story.
3 Company Cars — obtain/handle company vehicles.
4 Lawyer Up — legal/cover arrangements.
5 Party Hard — infiltration/social event.
6 Heavy Lifting — handle heavy objective.
7 Photo/Shoot — photo assignment.
8 Making Gainz — gym/fitness undercover task.
9 Watch It — surveillance.
10 Cash Injections — money scheme.
11 Amateur Hour — advance operation.
12 Dirty Work — cleanup/crew work.
13 Too Much Baggage — baggage/logistics.
14 Adventures in Babysitting — protect/manage someone during job.
15 Fresh Evidence — retrieve/deal with evidence.
16 Power Play — advance operation plan.
17 Child's Play — continue undercover operation.
18 Headliners — coordinate targets/event.
19 Close Surveillance (VGC typo: Close Survelliance) — surveillance.
20 Delivery Method — arrange delivery.
21 Team Building — prepare crew.
22 Fully Catered — prepare/cover event.
23 VCIA Takedown — major operation; guide describes parallel preparation.
24 Sunset — late-chapter story beat.
25 Starting From Zero — VGC/GTABase title; another list redacts finale title. Confirm in recap.

#### Chapter 5 — Top of the World, Ma (7 broad entries)

1 Bird in the Hand — start endgame arc.
2 Taking Liberties — advance endgame story.
3 VC Baby — Chapter 5 story.
4 Doggie Bag — Chapter 5 story.
5 Operation Savage Glory — Chapter 5 operation.
6 Protective Custody — guide claims $150,000 Pay Abe's Fee gate.
7 The End of the Road — finale; ending count/thresholds conflict.

Expanded guides also list Honest Abe, Unfinished Business and Pay Abe's Fee. Check if actual UI records them separately or nests them as objectives. Community “12 endings” is unverified; do not encode.

### Optional records and strands found

GTABase's Strangers & Freaks catalog credits PowerPyx; overlapping records are one evidence family. The list may be updated after this date; “documented so far” is not a guarantee of completeness.

**Chapter 1 optional entries:** Get Shirley's Rum (Jason's neighbor; PowerPyx says Chapter 1-only); Steal the Scooter (Shirley; Chapter 1-only); Pick Up Groceries (buy food before Lucia arrives); Buy Flowers; Buy Lucia a Necklace at The Siren's Chest (price conflict $425/$475, leave Unknown); Get The Chop at Barnacle Beauties; Get Lucia's Clothes from Andy at Manatee's Rest; Catch a Bigger Fish (Cal's >2 lb stoplight parrotfish challenge); Meditate with Lucia; Find the Lost Drugs (four swamp packages; expiry timing conflicts); Clock Out (pick up Lucia before 4pm; reported time-sensitive); Ring the Bell! (get Cal home; guide links to Swamped); Donnie's Lost Drugs (recover boat cargo near Corsair Key).

**Chapter 2 optional:** Pick Up a Gun; Thrillbillies; Twist Wrist, Smash, Grab; Hit Avery Pawn; Hit Kingpin Bowling; Impounded Vehicle.

**Chapter 3 optional:** Get Your Wheels (method unknown); Yasmani's Jewelry Jobs; Race Against Yago (guide marks missable); Pick Up Shayna (Lucia pickup, guide marks missable).

**Chapter 4 optional:** Attend Eddie Acosta's Party; It's a Date!; Bad Driver! (track Felipe); That's Where the Money Is… (Yasmani/security van lead).

**S&F strand index:** Dr. Merle/No Flushers—The Final Flush; Freddie—Retest Freddie's Defenses; Shirley—Rum → Scooter; Kenton—Search the Dive Sites; Cal—Catch a Bigger Fish; Kirk/Skunk Ape/Mr. Mangrove—Search for Skunk Ape → Tree Effigies → Find Mr. Mangrove (guides report night-only for steps 1/3, Lucia-only step 3, strand crosses chapters); Kyle—Check Out McKittrick Farm → Collect Chemicals → Buddy?; Moses—Steal Vehicles → Collect Moses' Gift; Bret Vogel—Veteran Hunted (Jason-only) → Hunting Decks; Billy—Thrillbillies → Twist Wrist, Smash, Grab → Mall Rats → The Impaler → Hometown Heroes; Yago—Join a Street Race → Bumper to Bumper (Jason-only) → Race Against Yago (time-sensitive) → Brother to Brother (Jason-only); Andy/Cellerica—Climbing the Cellerichain → Pay Fee → Peach! → Read the Label → Puff Puff Pass (reported Lucia-only); Yasmani—Jewelry Jobs → ATM Jobs → Payday Loans → Tail the Security Van; Randy—Wish List; Tyrone—Take Out Kitty Litter → Spin On This; Dunk—Robbery Tips; Papa Audacity/Unknown Stuntman—The Unknown Stuntman; Pilot Pete—Passing the Torch → Backseat Pilot → Deliveries: Southpoint Airfield → Avery Allen & Co. → Deliver Packages; Eddie Acosta—party encounter.

PowerPyx says 8 strands count for the Strangers & Freaks trophy, names Kirk/Kyle/Yago/Pilot Pete as examples, lists separate strand trophies for Bret, Billy, Andy, Randy and Tyrone, and says missable entries do not count toward trophies/100%. These are guide claims; verify on current trophy UI.

### Claim-level evidence, prerequisites, and limitations

| Finding | Source claim / URL | Confidence and limitation |
|---|---|---|
| Tourist Trap is practical Chapter 1 point of no return; finish optional content first. | VGC warning https://www.videogameschronicle.com/guide/gta-6-chapter-1-warning-read-this-before-finishing-chapter-1-of-gta-6/; PowerPyx Tourist Trap/Home Sweet Home: https://www.powerpyx.com/gta-6-tourist-trap-take-up-mattias-offer-walkthrough/ and https://www.powerpyx.com/gta-6-home-sweet-home-walkthrough/ | Medium-high for cleanup warning. Reports of losing Key Lento house, cash and Jason's car are not controlled tests; exact assets not guaranteed. |
| Gone Fishing has optional money pickup in a trailer. | PowerPyx https://www.powerpyx.com/gta-6-gone-fishing-walkthrough/ | Low-medium, guide claim only. |
| Pipework follows Gear Up, Lab Fees, Just A Scratch and Unwanted Attention in flexible order; cigar pickup is optional. | PowerPyx https://www.powerpyx.com/gta-6-pipework-collect-mandys-rent-walkthrough/ | Medium guide claim; don't treat cigar as automatic reward. |
| Hey Arnold! follows Pipework and Brian call/wait trigger. | PowerPyx https://www.powerpyx.com/gta-6-hey-arnold-meet-brian-walkthrough/ | Medium-low; exact timer untested. |
| Shirley Rum is Jason-only/Chapter 1 exclusive, guide reports Focus/profile reward. | PowerPyx https://www.powerpyx.com/gta-6-get-shirleys-rum-walkthrough/ and Games Wiki https://thegameswiki.com/gta6/wiki/chapter-1-guide | Medium for warning; low-medium for reward. |
| Down to Earth requires Clean Up After Donnie + Buck Me. | PowerPyx https://www.powerpyx.com/gta-6-down-to-earth-walkthrough/ | Medium guide claim. |
| Clear Skies starts after a call following Down to Earth. | PowerPyx https://www.powerpyx.com/gta-6-clear-skies-join-donnie-on-a-job-walkthrough/ | Medium-low, no independent capture. |
| What's in the Bag? follows Discharge Time and opens Lucia free-roam. | PowerPyx https://www.powerpyx.com/gta-6-whats-in-the-bag-walkthrough/ | Medium guide claim. |
| Moses follows Girls' Trip; Slim Jim/Scooter Bros/registration services reported. | PowerPyx https://www.powerpyx.com/gta-6-moses-take-a-vehicle-to-moses-walkthrough/ and GTABase https://www.gtabase.com/gta-6/missions/moses | Medium for progression; low-medium service details, partly same guide chain. |
| Slam Dunk reportedly pays $1,700 via BuckMe the following day. | PowerPyx https://www.powerpyx.com/gta-6-slam-dunk-walkthrough/ | Low-medium, amount/timing uncorroborated. |
| Coffee Break unlocks free character switching. | PowerPyx https://www.powerpyx.com/gta-6-coffee-break-walkthrough/ | Medium guide claim. |
| Checking Out needs story progression and at least $15,000. | PowerPyx https://www.powerpyx.com/gta-6-checking-out-move-to-vice-city-walkthrough/ and https://www.powerpyx.com/gta-6-prepare-for-vice-city-walkthrough/; GTABase also lists Prepare for Vice City | Medium-high warning; exact cash/account context not tested. |
| Meet the Heders grants cut-off tool; First Impressions $3k; Credit Check $6k + Dye Pack Jammer. | PowerPyx pages https://www.powerpyx.com/gta-6-meet-the-heders-walkthrough/ ; https://www.powerpyx.com/gta-6-first-impressions-meeting-with-raul-walkthrough/ ; https://www.powerpyx.com/gta-6-credit-check-meet-rauls-crew-walkthrough/ | Medium guide claims; exact rewards lack independent HUD capture. |
| Here Kitty Kitty Jason-only/Goods Drop Off; Missing Link Lucia-only; Monty's 1992 Pistol pickup; Safe Word optional reward; Hidden Charges requires Company Property + Cooties. | PowerPyx pages https://www.powerpyx.com/gta-6-here-kitty-kitty-speak-with-tyrone-walkthrough/ ; https://www.powerpyx.com/gta-6-the-missing-link-meet-andrea-walkthrough/ ; https://www.powerpyx.com/gta-6-safe-word-steal-the-practice-safe-walkthrough/ ; https://www.powerpyx.com/gta-6-hidden-charges-walkthrough/ | Medium for actor/prerequisite claims; low-medium exact items/rewards; mostly one source family. |
| VCIA Takedown has parallel prep missions. | PowerPyx https://www.powerpyx.com/gta-6-vcia-takedown-walkthrough/ | Medium; full dependency DAG not yet gathered. |
| Protective Custody has $150,000 Pay Abe's Fee gate. | PowerPyx https://www.powerpyx.com/gta-6-protective-custody-walkthrough/ | Medium-low; numeric context untested. |
| Ending count/conditions unresolved. | GTABase https://www.gtabase.com/gta-6/missions/the-end-of-the-road ; PowerPyx https://www.powerpyx.com/gta-6/the-end-of-the-road-walkthrough/ ; PC Gamer https://www.pcgamer.com/games/grand-theft-auto/gta-6-endings-end-of-the-road-swim-for-it-no-surrender/ ; Reddit lead https://www.reddit.com/r/GTA/comments/1y1tgd2/gta_6_all_12_endings_explained_every_ending_how/ | Low for count/thresholds. Leave Unknown until repeated controlled saves. |
| S&F strand tasks may wait for calls and persist across chapters. | PowerPyx (18 Nov) https://www.powerpyx.com/gta-6-all-strangers-freaks-side-missions/; GTABase https://www.gtabase.com/side-missions/gta-6/strangers/ | Medium guide claim; GTABase credits PowerPyx, not independent. |

### Mission coverage table and next research

| Topic | Found | Gaps | Sources checked | Next lead |
|---|---|---|---|---|
| Main roster | Five chapters, 91/93/95 variants, broad summaries | Canonical count, redacted titles, Chapter 3 classification, direct game evidence | Rockstar, VGC, PC Gamer, GTABase, PowerPyx | Capture in-game Story Recap titles/order. |
| Short tasks | Deposit Cash Into BuckMe, Save for the Future, Play Nurse, Overnight Charges, New Look, Got Pills?, Prepare for Vice City, Honest Abe, Unfinished Business, Pay Abe's Fee | Separate UI record or nested objective? | GTABase, PowerPyx, GTA6Box | Inspect each linked guide and journal/map evidence. |
| Optional content | 27 optional index entries + strand list/restrictions | Exact triggers/stages/locations/rewards and post-launch completeness | GTABase (credits PowerPyx), PowerPyx, VGC, PC Gamer | Research every linked walkthrough and verify deadlines. |
| Dependency graph | Several concrete guide edges, parallel openings reported | Full DAG and call/time gates | PowerPyx individual guides, GTABase, community | Store edges separately from recap order. |
| Missables | Tourist Trap, Shirley tasks, Race Against Yago, Pick Up Shayna, Clock Out leads | Exact last trigger and trophy/100% impact | VGC, PowerPyx, Games Wiki, GTABase, player posts | Separate missable mission/item records and retest. |
| Rewards | Reported money/tools/weapon unlocks | Full list, choice/patch variance, direct confirmation | PowerPyx, GTABase | Require HUD/inventory capture or independent test. |
| Endings | Branching reported | Count, choices, thresholds, replay rules | GTABase, PowerPyx, PC Gamer, Reddit lead | Controlled saves; keep unknown pending. |

Schema audit: mission fields are id/name/section/summary/details/confidence/sources/last_verified/type/order/giver/objective/steps/tips/missables/rewards/unlocks. No dedicated chapter or prerequisite fields. Put chapter/taxonomy/prerequisites into details and do not invent unlock IDs. Keep unsupported steps empty and unavailable values null/Unknown. Preserve saved progress when replacing sample entries; reconcile IDs first.


## Vehicle research — confirmed systems, catalog limits, and app-ready records

Cutoff/access date: 2026-11-22. This is a vehicle research section for the app's car comparison and acquisition guides. It intentionally does not manufacture a complete car database from trailer sightings or recycled GTA V/Online stats.

### Confidence rules for vehicle records

Use separate evidence states: official_named (publisher names a vehicle), official_visible (shown in official footage/screenshots), gameplay_named (player or guide sees in-game name/UI), extracted_gamefile (decoded current-build data), and acquisition_verified (source demonstrates player can obtain/register/store it). These states are not interchangeable. Trailer appearance does not establish a game's exact model label, availability, price, spawn, stats or unlock.

No official Rockstar master vehicle catalogue, ordinary vehicle price list, spawn table, measured speed ranking, seat count table, or full handling comparison was found. Community catalog counts vary: 277 base / 280 standout (557) is reported as the in-game Progress Database breakdown by some guides; GTABase currently gives 590 including standout vehicles; GTA Playbook counted 146 appearances with 26 Rockstar/in-game confirmed names in its dated evidence index; GTA.ZONE reports 334 game-file rows for Xbox v1.0.2.1, not all player-available. These counts have different denominators. Do not show one as a definitive total without labeling method/build.

### Player-facing vehicle systems

| Finding | App-useful details | Evidence/confidence |
|---|---|---|
| WAiNK scan | The phone app is reported to show make/model, condition, security state (locked/alarmed/keyless/tracker), estimated sale value/registration cost, and five ratings: Speed, Acceleration, Asphalt Handling, Off-Road Handling, Strength. These are displayed game ratings, not measured road performance. | PC Gamer's Nov 18 firsthand guide, GTA6Map wiki update Nov19, GTABase guide updated Nov21. High for reported feature set; controls may differ by platform/settings. |
| WAiNK access | Guide says first tutorial scan occurs during Chapter 1's Unwanted Attention. | PC Gamer and GTA6Map wiki; high guide confidence, still not Rockstar confirmation. |
| Keep/register a stolen car | Guide reports vehicle registration unlock through Moses in Chapter 2 mission Moses, after Girls' Trip. Moses asks for an untracked vehicle; registration at his Port Gellhorn garage is reported as free for first car, with later fee/vehicle state dependent. | PowerPyx Nov18, GTABase Moses mission page, PC Gamer Nov18, GTA Playbook PS5 v1.002.001 test. Medium-high for unlock path; first-free terms should be attributed. |
| Slim Jim | Moses mission reportedly unlocks a slim-jim tool for opening locked cars. | PowerPyx/GTABase/PC Gamer, medium guide confidence. |
| Key cloning | Guide reports Key Cloner unlock after Chapter 3 mission Steal the Zorrusso for Randy / Clonin' Keys, Makin' Gs; needed for keyless cars. | PC Gamer Nov18; medium guide claim. |
| Tracker / theft state | Guides distinguish no tracker, standard tracker, advanced tracker. Standard/advanced security may restrict modification or alert police; WAiNK should be used before theft. One PS5 tested sample: GTA Playbook reports 41 cars scanned, 29 no tracker, 10 standard, 2 advanced. This is a sample, not population percentages. | GTABase Nov21, PC Gamer Nov18, GTA Playbook updated Nov21 with PS5 v1.002.001. Medium-high core mechanic; sample size explicitly limited. |
| Vehicle sales | Guides say Moses buys eligible untracked vehicles; Randy requests specific high-end cars via Wish List/Export Lists after Chapter 3. Vehicle registration fee, buyer sale offer, and in-game purchase price are separate concepts. | PowerPyx contacts Nov20, GTABase fence/mission pages, Push Square WIP. Medium unlock/method; exact spot/spawn and offers vary. |
| Stats and rankings | WAiNK's five 0–10 bars are UI ratings. Top speed, acceleration time, braking distance and lap time claims from game-file parsers or community tests need separate fields and units. As of Nov21, reviewed guides reported no measured top speed/lap-time leaderboard. | Timesaver Nov21; GTA.ZONE extracted data; GTA Playbook/Tracker.gg conflicts. High that bars are not mph. No validated overall fastest car. |

### Officially named or edition-dependent vehicle records

The following names have official support, but edition access is a prerequisite and does not itself establish ordinary free-roam availability. Avoid merging a bonus entitlement with a free base-game unlock.

| Suggested ID / vehicle | Officially supported fact | Acquisition / limitation |
|---|---|---|
| vehicle-vapid-stanier-1955 — '55 Vapid Stanier Sedan | Rockstar Support names it in Vintage Vice City Pack. | Pack applies to qualifying preorders/purchases before Nov 20 per Support page; current SKU/region access may differ. Spawn in Vice Beach is guide/map claim, not official. |
| vehicle-grotti-cheetah-1995 — '95 Grotti Cheetah | Rockstar Ultimate Edition page names it; described as mid-90s sports car. | Edition-dependent. No official price, exact stats, or free-roam claim method established here. |
| vehicle-vapid-dominator-buggy-1967 — '67 Vapid Dominator Buggy | Rockstar Support/edition material names it as an off-road buggy. | Ultimate Edition bonus; Paradise Garage is named on official PlayStation page in Watson Bay/Mount Kalaga context. Confirm current in-game directions/access before precise map pin. |
| vehicle-shitzu-squalo — Shitzu Squalo | Rockstar/PlayStation material names it as a boat; official content describes Washington Beach location and fishing/open-ocean context. | Ultimate Edition feature. Presence/location description does not establish stats, weapon function or general availability. |
| vehicle-dinka-enduro — Dinka Enduro | PlayStation Ultimate Edition page names it as a Jason safehouse vehicle. | Edition-specific safehouse benefit; generic spawn unknown. |
| vehicle-crest-kayak — Crest Kayak | PlayStation Ultimate Edition page names Jason's kayak. | Edition-specific safehouse benefit; broad access unknown. |
| vehicle-ganado-retro-build — Vapid Ganado Retro Build | Rockstar/PlayStation edition material names special mods for Jason's Ganado. | Ultimate Edition; don't assume all modifications are available to base-game owners. |
| vehicle-annis-venturas-blvd-elegy-1990 — '90 Annis Venturas BLVD Elegy | Rockstar GTA+ page identifies high-performance widebody vehicle in Crosstown District, claimable starting Chapter 3. | GTA+ subscription and Chapter 3 gate; benefit can change. No numeric stats or exact pin in official page. |
| vehicle-wymans-classic-car-collection — Wyman's Classic Car Collection | Official materials describe a collection/commission to find and restore classic cars. | Edition-specific according to current PlayStation page. Exact list and each clue/location require separately verified guide records. |

These official naming/entitlement claims come from Rockstar Support “Grand Theft Auto VI Platforms, Editions, and Versions,” last updated Nov18: https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions ; Rockstar Ultimate Edition page https://www.rockstargames.com/VI/add-ons/ultimate-edition ; Rockstar GTA+ page https://www.rockstargames.com/VI/gta-plus ; and PlayStation's official product page https://www.playstation.com/en-us/games/grand-theft-auto-vi/ (all accessed Nov22). Rockstar screenshot gallery https://www.rockstargames.com/VI/media/screenshots supports visible/officially labeled assets but not acquisition or performance.

### Numeric performance: preserve stat type and build

- WAiNK values are display ratings out of 10; they are not speed units or standardized road tests. For the app, store original scale (for example 5.9/10), observed platform/build and screenshot/source. Do not relabel a rating as mph or as empirical damage/handling measurement.
- GTA.ZONE (also called GTA.ZONE / Negentropy Studio) reports a game-file dataset from Xbox Series version 1.0.2.1; it separates Progress-menu rating fields from interpreted performance fields. Its parser is unofficial and can misinterpret units/fields. These data are useful as extracted_gamefile, not proof that a vehicle is obtainable or named as displayed in-game.
- Example lead: standout Smuggler Caracara (internal resource ID vehiclepreset_caracara4x4_cmp_kolt_docks_preset1) has extracted/menu bars Speed 5.9/10, Acceleration 7.3/10, Asphalt Handling 3.0/10, Off-road Handling 7.6/10, Strength 4.2/10, per page https://negentropy.studio/standout-vehicles/caracara4x4-cmp-kolt-docks-preset1/ (Xbox Series v1.0.2.1). Resource identifier suggests Kolt docks association but no verified world spawn is established by that string alone.
- Same source's base Caracara 4x4 page reports 165.1 km/h top speed, 0–60 in 7.65 s, 60–0 braking distance 43.1 m, estimated top speed 166.5 km/h, off-road speed 111.5 km/h, AWD front bias 0.33, 6 gears, 2,340 kg: https://negentropy.studio/vehicles/caracara4x4/. These are parser-derived estimates/fields, not independent road tests; don't map them into the WAiNK bars.
- Fastest-car claims conflict: Timesaver reported Emerus 8.3 as highest known stat bar, while Tracker.gg changelog (Nov22) says Thrax 8.7 > Emerus 8.3 > Vitello 8.2. Catalog coverage was incomplete and rapidly updated; no direct official or measured result confirms a “fastest” vehicle. Leave a single best-car recommendation Unknown until user-specific choice criteria and current-build scan records exist.
- Pro Game Guides/GTABible tables repeat mph values that appear to derive from GTA V/Online records or undocumented estimates. Independent auditor found the GTA Online Itali RSX top-speed figure overlaps a GTA VI rumor value and the GTA6Bible page contains GTA Online-era copy. Do not import GTA V/Online performance, pricing, upgrades or availability into GTA VI without new direct evidence.

### Map, acquisition and unique cars

- GTABase/PowerPyx list places Moses' garage in Port Gellhorn and describe registration/sale service after Moses mission. Treat as region-level directions until project basemap alignment supports pin coordinates.
- Randy's Wish List / Export List is guide-reported as opening after Chapter 3's Zorrusso/Key Cloner progression. Push Square's WIP says spawn locations can vary and may require waiting/reloading; don't encode deterministic coordinates until independently revisited.
- Rockstar's Paradise Garage is an official edition-related location lead, but not a universal base-game service point.
- Public community map datasets can help discover named landmarks but do not automatically prove exact vehicle spawns or player acquisition. GTADB.org says its landmark data is CC BY 4.0 and code MIT; GTA6Map publishes a public map repository; Leonida Atlas is derived from GTADB/map sources, so those are not independent evidence. Before adopting any coordinates, align against the actual project basemap and preserve source IDs/attribution.
- Community lead only: one Reddit post reports an “Annis Pixel Elegy” in a blocked container at Capri Construction Yard, requiring a truck to move obstacles: https://www.reddit.com/r/GTA6/comments/1y2rfnp/found_an_unlisted_rare_car_annis_pixel_elegy/ . One user/screenshot and unknown spawn conditions; do not create app-ready vehicle/location record until name panel, time, spawn and second independent visit are verified.

### Vehicle corrections and development handoff

Existing Caracara entry was previously only a map/location lead. Improve it with the separated base-vs-standout record above; keep five bar ratings distinct from parser-derived real units and don't claim the standout spawns at Kolt docks solely from its resource ID. Existing example weapon/vehicle sample data in repo is placeholder; do not treat as fact. Preserve existing stable IDs and the user's personal progress state.

Recommended vehicle schema mapping: WAiNK five bars can populate matching comparison fields if schema supports them, retaining original 0–10 values. If schema lacks Off-road Handling or Strength, keep them in details; don't force them into unrelated fields. Keep purchase price null when only a theft/registration/sale price is known. Maintain separate fields/notes for purchasePrice, registrationFee and saleOffer; do not confuse three money values. Seats, storage, exact handling, prices, and spawn location are Unknown unless an individual current-build record supports them.

### Vehicle coverage table and next leads

| Topic | Found | Missing/conflicted | Sources checked | Next lead |
|---|---|---|---|---|
| Catalog names | Official bonus names; 146 seen appearances indexed by GTA Playbook; gamefile rows by GTA.ZONE | Complete player-available catalog; naming for traffic; count scope | Rockstar, GTA Playbook, GTA.ZONE, GTABase, GTAScoop | Build per-vehicle evidence records; separate appearance from acquisition. |
| Performance | Five WAiNK bars; one extracted Caracara example | Measured top speed/acceleration/braking/laps; complete bars; conflicting Thrax/Emerus rank | Timesaver, Tracker.gg, GTA.ZONE, GTABase | Capture screenshots with game version; standardize test route and conditions before measured comparisons. |
| Prices | Some theft/registration/sell values indexed | Broad purchase prices; fee vs sell offer consistency | GTAFinder, Vice City Tracker, GTABase, GTAEconomy methodology | Record source quote per vehicle; unknown is not zero. |
| Unlocks/acquisition | WAiNK, Moses registration, Slim Jim, Key Cloner, Randy requests reported | every unlock, variant and spawn; reliability of soft spawn points | PC Gamer, PowerPyx, GTABase, GTA Playbook, Push Square | One vehicle page at a time; capture prompt, map, garage and version. |
| Seats and class | Class labels sometimes available | reliable seat counts/storage and handling for each model | scattered guide/database pages | Treat as Unknown until direct scan/UI evidence. |
| Map data | public landmarks and map repos exist | exact reliable vehicle pins on project map | GTADB, GTA6Map, Leonida Atlas | inspect repo data/provenance; project basemap alignment required. |


## Character biographies — official profiles, credited cast, and schema gap

Research date: 2026-11-22. This section follows the requested cars → characters sequence. Rockstar's current “Only in Leonida” page provides concise official bios for eight profile entries (nine named people because Real Dimez is a duo); the official credits page adds many cast/name pairs but not biographies. Do not expand short bios into inferred age, motive, family tree, criminal history, or future plot.

### Official biography records

These are original paraphrases of Rockstar's bios. Suggested IDs are provisional because repository audit found no character section/schema or character ID prefix in the current app. Keep them as research handoff content/future content; do not force them into weapon/vehicle/mission data.

| Suggested ID | Name / app section | Practical bio and confirmed relationships | Confidence |
|---|---|---|---|
| character-jason-duval | Jason Duval — Characters | Raised around grifters and crooks; served in the Army while trying to leave troubled adolescence behind; later worked for local drug runners in the Keys. Wants an easier life. Rockstar says meeting Lucia could go either way and Jason is unsure what the relationship will become. | Confirmed: Rockstar official bio. |
| character-lucia-caminos | Lucia Caminos — Characters | Her father taught her to fight from early childhood. Fighting for her family led to Leonida Penitentiary; she got out by luck, wants the better life her mother dreamed of after their time in Liberty City, and is committed to acting on her plan. Rockstar says a life with Jason could be her way out. | Confirmed: Rockstar official bio. |
| character-cal-hampton | Cal Hampton — Characters | Jason's friend and Brian's associate. He feels safest at home, monitoring Coast Guard communications; Rockstar characterizes him as paranoid and content with his place in life while Jason has bigger plans. Official credits shorten the role label to “Cal”; keep full name from bio. | Confirmed. |
| character-boobie-ike | Boobie Ike — Characters | Vice City figure who turned street experience into an empire spanning real estate, a strip club and a recording studio. His partnership with Dre'Quan on Only Raw Records is a priority. | Confirmed. |
| character-drequan-priest | Dre'Quan Priest — Characters | Hustler more than gangster; dealt on the street to support himself while pursuing music. Signed Real Dimez to Only Raw Records and is setting his sights on Vice City's music scene. | Confirmed. |
| character-real-dimez | Real Dimez — Characters | Duo Bae-Luxe and Roxy Rashad, friends since high school. They turned shaking down local dealers into rap tracks/social-media reach; an early hit with local rapper DWNPLY raised their profile. After five difficult years they are signed to Only Raw Records and seek another hit. | Confirmed as group bio; consider individual entries only if the app benefits and source-supported facts exist. |
| character-raul-bautista | Raul Bautista — Characters | Seasoned bank robber seeking talented people willing to take risks for bigger scores. Rockstar describes him as confident/charming/cunning, while his recklessness raises the stakes for his crew. | Confirmed. |
| character-brian-heder | Brian Heder — Characters | Veteran Keys drug runner from the older smuggling era, still moving product through his boatyard with third wife Lori. Lets Jason live rent-free at one of his properties if Jason helps with local shakedowns and visits Lori. | Confirmed. |
| character-lori-heder | Lori Heder — Characters | Official bio names her as Brian's third wife and mentions the condition that Jason stop by for her sangria. No standalone bio found. | Confirmed relationship/mention; biography Unknown. |

**Source for all nine names/bios:** Rockstar Games, “Only in Leonida,” current live page, accessed 2026-11-22: https://www.rockstargames.com/VI/only-in-leonida . Rockstar individual URLs include Jason https://www.rockstargames.com/VI/only-in-leonida/jason and Lucia https://www.rockstargames.com/VI/only-in-leonida/lucia; their text is also present in the hub. The page's rendered document repeats profile text, so deduplicate rather than creating duplicate entries. The exact claims above are supported in the relevant name heading and paragraph, not by trailer inference.

### Official credits: named cast index and known performance credit

Rockstar Games, official credits, current live credits page, accessed 2026-11-22: https://www.rockstargames.com/VI/credits . Its “Main Cast” section pairs character/role labels and credited performers. This is strong evidence for the credited mapping; the page does not specify “voice-only” versus motion/performance capture. Use “credited performer” unless another official source says more.

Confirmed lead/supporting pairs include Jason Duval—Dylan Rourke; Lucia Caminos—Manni L. Perez; Donnie—Brad Carter; Cal—Bobby Moynihan; Brian Heder—Stephen Root; Lori Heder—Orlagh Cassidy; Kenton Rees—Machel Montano; Andy—Mallory Wu; Katerina Rosselli—Edwina Rai; Mattia Tauro—Massi Pregoni; Pilot Pete—Carl Palmer; Captain Aldo Méndez—Chris McKinney; Linda—Lisa Emery; Vicki—Taryn Manning; Dunk—Brad Fleischer; Moses “Mo” Watkins—Aaron Morton; Wyman—David Stishan; Billy—Spenser Granese; Bret Vogel—Jariko Denman; Dre'Quan—Naiqui Macabroad; Bae-Luxe—Hood Brat; Roxy Rashad—Krissy Celess; Boobie Ike—Mike Forbs; Tyrone Russo—Taylor Novak; Mia Caminos—Roselyn Sanchez; Papa Audacity—Brian Furey; Yago Jiménez—Victor Almanzar; Yasmani Cabrera—Hiram Delgado; Randy Kozlov—Serge Didenko; Benedict Halifax—Ian Scott McGregor; Karim—Rafi Silver; Raul Bautista—Manny Perez; Andrea—Christine Spang; DWNPLY—Denzel Curry. The page contains many more cast names; treat it as an entity backlog, not evidence for biography.

Official credit evidence supports exact credited role-name pairing. It does **not** prove biography details, relationships, protagonist/playable status, age, mission order, or specific occupation for names absent from Rockstar bio/gameplay. For less prominent names, use Unknown until an official bio or clearly sourced in-game appearance supplies it.

### Biography evidence versus interpretation

- Official facts: the bios above state Jason's Army stint and Keys work, Lucia's prison/family background and goal, Cal's relationship to Jason/Brian and Coast Guard-radio habit, Boobie's businesses and partnership, Dre'Quan's music ambitions, Real Dimez's history, Raul's bank-robbing profile, Brian's boatyard/running product and Lori relationship.
- Official credit facts: the character-performer pairs listed above. These are credits, not biography.
- Inference not suitable as fact: “Jason and Lucia are a Bonnie-and-Clyde couple,” exact romantic status, who Lucia's parents are, ages, hometowns, diagnosed conditions, future betrayals, ending outcomes, personality claims extrapolated from one trailer line, and any secret/leaked identity. The bio says Lucia's mother dreamed of a good life after their days in Liberty City; it does not name her mother in that passage. Official credits list Mia Caminos, but the bio alone does not establish her as Lucia's mother. Lori is explicitly Brian's third wife; the bio does not provide her age/history.
- Community relationship-map post by u/Curious_Oil_748 (approx Sep 3 2026), https://www.reddit.com/r/GTA6/comments/1w5ypsn/the_seven_character_bios_on_rockstars_site_all/ , use only as an index to Rockstar text; its “you join an already intact network” line is the poster's interpretation, not a new source.
- GTA VI Forum's “Every GTA VI Character Rockstar Has Named,” https://gtaviforum.com/library/gta-vi-characters , describes a method separating official profiled names, passing mentions, edition names and radio hosts. Its prerelease casting caveat is superseded by Rockstar's launch credits. It is a useful taxonomy lead, not independent confirmation of the bios.
- Media articles/social posts about cast announcements can be used as leads. Rockstar's credit page is the primary mapping source, so repeated articles quoting those credits do not count as independent confirmation.

### Character section schema / stable ID caveat

Read-only audit of the current project found no characters JSON, no character entry placeholders, and no character enum in current sections. The design document lists Characters as a later-version section. The supported prefixes currently described are weapon-, vehicle-, mission-, pin- and trophy-; no character- prefix rule exists. Progress uses arbitrary stable IDs and preserves unknown IDs. Claude should decide how to add Characters in a later schema pass while retaining progress compatibility; do not silently shoehorn biographies into another app section. The provisional IDs above are suggestions for research tracking only, not existing repo IDs.

### Character coverage table and next leads

| Topic | Found | Missing/unknown | Sources checked | Next lead |
|---|---|---|---|---|
| Official bios | 8 Rockstar profile entries, including duo Real Dimez | No ages, birthdays, full family trees or extensive histories | Rockstar Only in Leonida | Keep the short bios source-attributed; update only when official/in-game evidence expands them. |
| Main cast credit mapping | Official credits pairs many named characters and cast | Credit type (voice vs performance capture) and biographies for most | Rockstar credits; AP/Vulture/creator posts as leads | Use credits as primary; add mission and role only after in-game or official bio support. |
| Supporting characters | Names include Donnie, Lori, Kenton, Andy, Katerina, Mattia, Pilot Pete, Aldo Méndez, Vicki, Dunk, Moses, Wyman, Billy, Bret, Tyrone, Mia, Papa Audacity, Yago, Yasmani, Randy, Raul, Andrea, DWNPLY and many more | Exact affiliations, arc, histories, unlocks and relevance for every cast name | Official credits; mission guides; current roster pages | Build a named-entity index then attach sourced mission appearances one at a time. |
| Character relations | Jason-Cal-Brian and Boobie-Dre'Quan-Real Dimez links explicitly described in official bio text | Mia-Lucia relation, other families, alliances and romance details beyond explicit copy | Rockstar profiles/credits; Reddit synthesis as lead | Use official story dialogue or exact in-game profile/mission context before recording inference. |
| Visual information | Rockstar screenshots/trailers show appearance/clothing/props | No verified age/trait/background from visuals alone | Rockstar screenshot and video galleries | If needed, record direct visible observation + source frame/time; do not narrate unseen motives. |


### Specialist post-launch additions for key characters (spoiler-marked)

These add practical context beyond Rockstar's brief bios. They are attributed specialist-guide claims, not official biographies. Use in a spoiler-aware UI; keep unsupported full names/relationships as notes until a second independent in-game source confirms them. The main specialist source is PowerPyx “GTA 6 All Characters,” accessed 2026-11-22: https://www.powerpyx.com/gta-6-all-characters/ (reports 133 story/side names in story appearance order, including aliases and one-off/shop-labeled names; not a complete official cast).

| Provisional ID | Character | Additional source-reported bio / story utility | Confidence / limits |
|---|---|---|---|
| character-donnie | Donnie (possible full name Donnie Carter) | Early Chapter 1 smuggling pilot/runner, associated with Brian and Jason; mission guides link him to Gone Fishing, Clear Skies, Swamped and Don Gone. PowerPyx says the surname appears in Contacts/Progress; Rockstar credits list only “Donnie.” | Likely for name/mission ties; medium. Prefer display name “Donnie”; record Carter as guide-reported full form/alias note until independent UI screenshot. Spoiler: fate is story content. Source: https://www.powerpyx.com/gta-6-donnie-carter-character/ |
| character-mia-caminos | Mia Caminos | Rockstar credits include Mia Caminos—Roselyn Sanchez. Specialist guides connect her to Lucia and Chapter 3 “Mami Knows Best”; exact mother relation should be attributed to in-game dialogue/guide, not inferred from surname alone. | Official name/credited performer confirmed; family relation likely, source-specific. See https://www.powerpyx.com/gta-6-lucia-caminos-character/ |
| character-moses-watkins | Moses “Mo” Watkins | Chapter 2 mechanic and vehicle buyer/registration contact; guide ties him to vehicle-registration and Slim Jim unlock after Moses mission. Credits give full role name; common display “Moses” and alias “Mo.” | Official name/credits confirmed; gameplay services medium guide claim. https://www.powerpyx.com/gta-6-moses-watkins-character/ ; https://www.powerpyx.com/gta-6-moses-take-a-vehicle-to-moses-walkthrough/ |
| character-randy-kozlov | Randy Kozlov | Vehicle request/export contact; PowerPyx says Wish List opens after Chapter 3 Zorrusso/key-cloning progression. Do not describe as a general car dealer without evidence. | Official name/credits confirmed; unlock/service medium guide claim. https://www.powerpyx.com/gta-6-randy-kozlov-character/ ; https://www.powerpyx.com/gta-6-all-contacts/ |
| character-bae-luxe | Bae-Luxe | Member of Real Dimez, the rap duo; Rockstar bio describes group's high-school friendship, dealer shake-downs, social-media/music rise and Only Raw signing. Guide places duo in Dealer's Choice, Top Billing, Cooties and later Headliners. | Bio/group relation confirmed; specific mission appearances likely guide claim. https://www.powerpyx.com/gta-6-bae-luxe-roxy-dimez-characters/ |
| character-roxy-rashad | Roxy Rashad / Rockstar profile name “Roxy” | Real Dimez member. Official credits spell performer role “Roxy Rashad”; Rockstar bio calls her Roxy within the duo. | Confirmed names; preserve both official profile and credits spellings as display/alias provenance, not separate people. Same guide as above plus Rockstar credits/profile. |
| character-drequan-priest | Dre'Quan Priest | Official bio supports music ambitions, Only Raw Records and signing Real Dimez. PowerPyx adds mission/meeting context, including Chapter 2/3 story role. | Core bio confirmed; exact mission appearance/relationship is guide-supported. https://www.powerpyx.com/gta-6-drequan-character/ |
| character-boobie-ike | Boobie Ike | Official bio confirms Vice City business interests and partnership with Dre'Quan; guide identifies him as a Chapter 3 mission giver. | Bio confirmed; giver/missions guide-reported. https://www.powerpyx.com/gta-6-boobie-mr-ike-character/ |
| character-lori-heder | Lori Heder | Officially Brian's third wife and mentioned in Jason's rent-free arrangement; PowerPyx links her to selected Chapter 1/3 events. | Relationship confirmed, appearances guide-reported. https://www.powerpyx.com/gta-6-lori-heder-character/ |
| character-jason-duval | Jason Duval | Official bio covers Army stint and Keys drug-running work. Specialist character page adds Army NCO, relationship/alias details, former Army contact Bret and a claimed child link with Lucia; do not adopt spoiler-heavy family/alias claims without direct dialogue and second-source verification. | Official bio confirmed; add-on claims medium/low and spoiler-sensitive. https://www.powerpyx.com/gta-6-jason-character/ |
| character-lucia-caminos | Lucia Caminos | Official bio covers prison/family goals. Specialist profile reports a longer “Lucia Maria Rivera Caminos” form, Puerto Rican identity, son Tommy/Tomás, mother Mia, aunt Lorena and “Mrs. Walker” alias. Rockstar profile/credits display “Lucia Caminos”; keep any full-form/family/alias details separately tagged to exact dialogue/guide and spoiler setting. | Core official bio confirmed; extra identity claims remain likely/unverified until independently verified in game. https://www.powerpyx.com/gta-6-lucia-caminos-character/ |
| character-cal-hampton | Cal (full bio calls him Cal Hampton; credits role label “Cal”) | Specialist guide calls him Jason's best friend and Donnie's close friend and associates him with Catch a Bigger Fish; Rockstar confirms Jason friendship/Brian association and Coast Guard-comms habit. | Core official profile confirmed; “best friend” and Donnie relation are guide-specific. https://www.powerpyx.com/gta-6-cal-character/ |

Additional credited cast with no reliable biography located in the checked materials: Donnie, Kenton Rees, Katerina Rosselli, Mattia Tauro, Pilot Pete, Captain Aldo Méndez, Linda, Vicki, Dunk, Wyman, Billy, Bret Vogel, Tyrone Russo, Papa Audacity, Yago Jiménez, Yasmani Cabrera, Benedict Halifax, Karim, Andrea, Raymond, Felipe, Valentina, Nicole Park, Abraham Gonzalez, Francisco “Cisco” Delgado, Nathan “Nate” Bozer, Raina Koleva, Kordell Grant, Andrés de León, Petra Navarro, César Navarro, Gustavo Herrera, KD, Rafa de León Navarro, Omar Dawoud and Dardan. Rockstar credits establish role labels/performer pairings only. Add a biography after a mission page or direct game evidence supports it.

**Character roster source limitations:** PowerPyx character index is a specialist guide and includes source-specific entity labels, aliases and minor characters; its count of 133 is not Rockstar's cast total. Leonida Waypoint’s cross-reference says 62 rows/53 names but includes 32 GTABase-only entries and some records inherited from guides; not an independent complete census: https://leonidawaypoint.com/database/characters . GTA Wiki is useful as a navigation index but should be validated against source text: https://gta.wiki/w/Characters_in_GTA_VI . GTA VI Forum's method note separates official profiles, passing mentions and edition/radio names: https://gtaviforum.com/library/gta-vi-characters . Avoid copying its prerelease actor uncertainty after Rockstar published launch credits.


### Post-launch biography corrections and spoiler facts

These update pre-release-era uncertainty. The following information is story-spoiler content; a companion app should give users a spoiler control. A post-launch first-hand reviewer reports the son and opening events; a separate 150-hour first-hand review confirms the relationship may be platonic or romantic depending on player choices.

| Finding | Evidence | Confidence / use |
|---|---|---|
| Jason and Lucia have a baby son named Tomás (also reported as Tommy), present early in the story. | Kenneth Shepard, Kotaku, “Rockstar Kept One Of GTA 6’s Biggest Early Spoilers Under Wraps For Years,” 19 Nov 2026: https://kotaku.com/grand-theft-auto-6-gta6-jason-lucia-tomas-kid-baby-non-lethal-ending-2000758396 . Reporter says he started the game at launch and describes the opening diner/arrest/release scene. | High for the reviewed English-language game/story fact. For full legal spelling, paternity dialogue and localization variants, preserve the exact in-game subtitle as primary evidence when available. Spoiler flag required. CBC review (18 Nov, ~70-hour playthrough) was reported as independently confirming son/custody, but the CBC page could not be opened in this session; keep it as a follow-up source, not a relied-on citation. |
| Lucia left Tomás at a diner during a payday-loan hold-up, was arrested, and seeks monitored release/reunion. | Same Kotaku launch-day first-hand account summarizes the opening sequence and Lucia's social-worker flashback. | High as that reviewer's direct report; spoiler-sensitive. Do not add moral/profile effects or endings from the article's personal interpretation. |
| Jason and Lucia are not necessarily a fixed romantic couple. | Zack Zwiezen, Kotaku, “Grand Theft Auto 6: The Kotaku Review,” 18 Nov 2026, reports that relationship can be platonic or romantic depending on player choices after 150+ hours on PS5 Pro: https://kotaku.com/grand-theft-auto-6-the-kotaku-review-2000757842 . | Medium-high reviewer evidence. Store relationship as choice-sensitive/conditional, not a fixed static “couple” label. This is one firsthand reviewer; seek another save/playthrough to map choices. |
| “Mia Caminos is Lucia's mother” and “Lorena is Tomás's aunt/caretaker” are guide/review claims, not established by the short Rockstar bio alone. | PowerPyx Lucia profile (subtitle/mission claim): https://www.powerpyx.com/gta-6-lucia-caminos-character/ ; independent CBC review lead: https://www.cbc.ca/news/entertainment/grand-theft-auto-vi-review-9.7425005 (could not access in this session). | Likely; attach each specific dialogue/scene and cite separately before mapping family edges. Surname similarity alone is not proof. |
| Official role “The Hitman” is not officially named Niko Bellic. | Rockstar credits list “The Hitman” with Michael Hollick. Kotaku reports Rockstar declined to confirm or deny “Little Sam” identity; for this character, reviewer/community identification relies on resemblance + actor/scene, not Rockstar name. Credits: https://www.rockstargames.com/VI/credits . | High that credit says The Hitman; low/medium for widely claimed Niko identity until on-screen name/dialogue or Rockstar confirmation. Do not merge GTA IV Niko biography into VI. |
| “Little Sam” is not confirmed as Sam Houser. | Rockstar producer Rob Nelson told Kotaku he could not confirm or deny; Kotaku “Rockstar Wouldn’t Confirm Or Deny If That’s Studio President Sam Houser In GTA 6,” 19 Nov 2026: https://kotaku.com/rockstar-wouldnt-confirm-or-deny-if-thats-studio-president-sam-houser-in-gta-6-2000758489 . | Unknown identity. Keep “Little Sam” as credited character; do not alias to real person. |
| Jimmy De Santa is credited in GTA VI, but that does not prove his father Michael or the rest of GTA V's De Santa family appears. | Rockstar credits: https://www.rockstargames.com/VI/credits . | Confirmed credit only. Do not import GTA V family appearances into GTA VI. |
| Valentina, if identified as the GTA Online character, is a visual continuity inference, not official bio text. | Rockstar credits name Valentina; Rockstar official footage/screenshots and game continuity are leads, but no official VI bio tying her to GTA Online was found. | Likely at best; separate VI credit from GTA Online identity. |
| Credits do not say whether a cast role is voice-only, performance-capture, or both. | Rockstar official credits page, Cast/Main Cast. | Confirmed limitation; use “credited performer.” |


## Continuation checkpoint — 2026-11-22

This addendum expanded missions, vehicles, and characters in the requested sequence. It is not complete game coverage.

- Missions: broad chapter roster and optional/S&F discovery list are included; the canonical count, exact full dependency graph, all mission steps/rewards/branches, precise missable deadlines and ending logic remain unresolved. Next, verify individual mission UI/Story Recap and walkthrough claims on the current retail build.
- Vehicles: acquisition systems, official edition names, a small game-file-derived Caracara example, catalog-source comparisons and schema cautions are included. No complete verified car-by-car data set exists here; next, collect individual WAiNK scans (bars/build), player acquisition, prices, seats and map locations one vehicle at a time. Do not rank measured performance without a repeatable test protocol.
- Characters: official bios for eight profile cards (nine people) and official credits are included, plus guide-reported key cast context and a post-launch child/relationship correction. The current app does not yet define a Characters schema; leave biographies as future content until Claude deliberately adds a stable progress-compatible section.
- Other app sections were not completed in this continuation: map POIs, safes/codes, weapons empirical damage/TTK, collectibles, full trophies/achievements and save-progress records still need separate claim-level coverage.
- Primary-source-first follow-up: Rockstar pages/credits, in-game screenshots or first-hand recordings, source-level dates and patch/build values. Specialist databases are discovery aids; copied guides are one evidence family. Keep leads separate from verified facts.


