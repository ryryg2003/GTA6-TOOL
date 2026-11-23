# Sorting GTA VI's launch-week facts from rumors

Grand Theft Auto VI shipped on schedule on **Nov 19, 2026, for PS5 and Xbox Series X|S only, as a single-player game with no PC version and no online mode**. Three days later the usable data for a companion app is surprisingly deep, but it is unevenly trustworthy. The strongest data comes from the game's own **Progress Database** (Map > Progress), which guide sites have copied into counts: 130 stunt jumps, 125 Cocaine Flamingos, 18 meditation spots, 55 trophies and 61 unlockable cheats. Rockstar itself has published almost nothing structured. There are **no official patch notes** for either update (01.002.000 and 01.002.001), no official vehicle or weapon list, and no map coordinates anywhere. Weapon and vehicle stats exist on a 0-10 menu scale, but they come from fan databases that agree with each other to the decimal, which could mean they read the same menu or that they copied each other. The biggest accuracy risk for the app is old data leaking in: GTA V cheat codes, GTA Online top speeds and prices, and pre-launch "leaked" trophy lists all still rank high in search. For the daily automated researcher, PowerPyx (RSS), the Fandom wiki API and GTABase are open to automation, while IGN, MapGenie, GameRant, GTAForums, GameFAQs and PSNProfiles explicitly forbid it and must be link-only. Every claim below keeps its CONFIRMED, LIKELY or RUMOR tag, its source link and its date. Conflicts are shown side by side, not resolved silently.

## How to read the tags and tables in this report

Every fact carries one of three confidence tags, carried over unchanged from the research notes. **CONFIRMED** means Rockstar or a platform holder said it, or at least two independent sources agree. **LIKELY** means one reputable source, or several guides that mostly agree. **RUMOR** (also written RUMOR/LEAK or THEORY) means forums, leaks, pre-launch speculation, a single low-reputation site, or sources that contradict each other. A fourth label, **HOAX**, marks claims that have been shown to be false, and these should live in their own tab in the app so nobody mistakes them for tips. The research team used one firm rule worth copying into the app: a fact only becomes CONFIRMED when two or more *independent source types* agree, such as a guide plus a wiki, or a guide plus a video's chapter markers. Two copycat sites repeating the same list do not count as two sources.

A note on freshness. Many guide pages are dated Nov 18, one day before launch, which points to review or early access. PowerPyx itself marks several trophy requirements "still undergoing confirmation" ([PowerPyx trophy guide](https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/)). Treat every number here as "as of Nov 22, 2026" and store a `last_verified` date on every row.

Spoiler warning: the mission, trophy and character sections name story missions and one possible cameo. The app should hide these behind a spoiler toggle.

## Release status: on time, $79.99, about 210 GB, and two silent patches

The launch itself is the best-documented part of the game. Rockstar's launch press release says the game is out on PS5 and Xbox Series X|S, rated M, and it does not mention PC or online play ([Business Wire via Finviz, Nov 19](https://finviz.com/news/425095/rockstar-games-announces-grand-theft-auto-vi-now-available)). The PlayStation Blog named the **six regions of Leonida** the day before ([PlayStation Blog, Nov 18](https://blog.playstation.com/2026/11/18/grand-theft-auto-vi-launches-tomorrow-november-19/)). Reviews landed around 99 on both OpenCritic and Metacritic, with IGN, GameSpot and Eurogamer all giving perfect scores on Nov 18 ([OpenCritic](https://opencritic.com/game/15398/grand-theft-auto-vi/reviews)). Critics' recurring complaints are useful app content too: Kotaku and DualShockers mention clunky controls and a back half that loses steam, and Digital Foundry (as relayed on ResetEra) reports base PS5 drops to about 25-27 fps in heavy destruction while the PS5 Pro holds 30 ([GTAForums review hub](https://gtaforums.com/topic/1008028-spoilers-grand-theft-auto-vi-review-hub-and-discussion/); [ResetEra OT](https://www.resetera.com/threads/grand-theft-auto-vi-ot-miami-vice.1689615/page-47)).

| Field | Value | Tag | Source and date |
|---|---|---|---|
| Release date | Nov 19, 2026, unlocked at local midnight (12:00 AM ET = 9:00 PM PT Nov 18 in the US) | CONFIRMED (date); LIKELY (unlock time) | [Business Wire, Nov 19](https://finviz.com/news/425095/rockstar-games-announces-grand-theft-auto-vi-now-available); [GTA Boss](https://www.gtaboss.gg/gta-6/guides/gta-6-release-date) |
| Platforms | PS5, Xbox Series X\|S; Xbox One via Xbox Cloud Gaming | CONFIRMED; LIKELY (cloud) | [PlayStation Blog](https://blog.playstation.com/2026/11/18/grand-theft-auto-vi-launches-tomorrow-november-19/); [Wikipedia citing Windows Central, Nov 10](https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI) |
| PC | Not announced. Q1 2027 is a RUMOR from industry reports | CONFIRMED (not announced) | [Wikipedia](https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI) |
| GTA VI Online | Not launched, no date. A 2027 date traces to remarks by Twitch's CEO, not Rockstar | CONFIRMED (single-player at launch); RUMOR (2027) | [Business Wire](https://finviz.com/news/425095/rockstar-games-announces-grand-theft-auto-vi-now-available); [Shattered.io](https://shattered.io/gta-6-online-q1-2027-report-zero-rockstar-dates/) |
| Standard Edition | $79.99 (CA$109.99, A$129.95) | CONFIRMED (USD); LIKELY (regional) | [Forbes, Oct 30](https://www.forbes.com/sites/brianmazique/2026/10/30/what-gta-vis-20-ultimate-edition-upgrade-actually-buys-you/) |
| Ultimate Edition | $99.99 (CA$139.99, A$159.95). Adds '95 Grotti Cheetah, '67 Vapid Dominator Buggy, Shitzu Squalo boat, Classic Car Collection, Hawk and Little Morgan revolvers, personalized ES9 and K17 pistols, 5 exclusive shops, 50+ FAILE tattoos. Item counts differ between sources | CONFIRMED (price, Forbes + Vice + Dot Esports); LIKELY (contents) | [Forbes](https://www.forbes.com/sites/brianmazique/2026/10/30/what-gta-vis-20-ultimate-edition-upgrade-actually-buys-you/); [Vice](https://www.vice.com/en/article/gta-6-pre-order-bonuses-ultimate-edition/); [Dot Esports](https://dotesports.com/gta/guides/gta-6-ultimate-edition-gta-plus-bonuses) |
| Pre-order bonus | Vintage Vice City Pack: '55 Vapid Stanier with its own garage, two outfits, a weapon pattern. Cutoff given as Nov 19 or Nov 20 (conflict) | LIKELY | same as above |
| Install size | About 210-212 GB; no official figure. The viral "677 GB" claim is fake | LIKELY; HOAX (677 GB) | [GamesRadar](https://www.gamesradar.com/games/grand-theft-auto/gta-6-gb-size/); [dLcompare, Nov 20](https://www.dlcompare.com/gaming-news/gta-6-day-one-patch-two-silent-updates-and-a-psn-outage) |
| Frame rate | 30 FPS lock, no performance/quality toggle in the 12 display options | LIKELY (Wikipedia + ViceManual screenshot + Outputlag) | [Wikipedia](https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI); [ViceManual](https://vicemanual.com/gta-6-screenshots); [Outputlag](https://outputlag.com/featured-slider/gta-6-review-roundup/) |
| Build string | 930.048.020 shown in game menu (internal, separate from store version) | LIKELY (screenshot) | [ViceManual, Nov 18](https://vicemanual.com/gta-6-screenshots) |
| Microtransactions | None at launch, no generative AI | LIKELY | [Wikipedia citing Kinda Funny](https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI) |
| Launch outage | PSN login and license failures evening of Nov 18 into launch morning, resolved that afternoon; Xbox unaffected | LIKELY | [dLcompare](https://www.dlcompare.com/gaming-news/gta-6-day-one-patch-two-silent-updates-and-a-psn-outage) |
| Sales | 32.5M pre-release copies; about $3.79B first-24-hour revenue | LIKELY | [Wikipedia](https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI) |

The patch picture is thin and should be displayed honestly. Both known updates shipped **before** launch, both are required, and Rockstar has published **no notes** for either. Outlets call 01.002.001 the "day-one patch", but Rockstar never used that label ([Vice](https://www.vice.com/en/article/gta-6-second-day-one-patch-ps5-xbox/); [TechTimes, Nov 17](https://www.techtimes.com/articles/330886/20261117/gta-6-gets-second-pre-launch-update-602-mb-ps5-16-gb-xbox-still-no-patch-notes.htm)). Claims that the update touched story or script files come only from community datamining ([gta6db.io](https://gta6db.io/patch-notes)). A viral X post promising a Nov 25 performance fix carries a community note and has no Rockstar backing.

| Version | Date | PS5 size | Xbox size | Official notes | Tag | Source |
|---|---|---|---|---|---|---|
| 01.002.000 | Nov 13, 2026 | about 1.07 GB | about 2.18 GB (conflict: other reports say "about 1 GB more than PS5") | None | LIKELY | [dLcompare](https://www.dlcompare.com/gaming-news/gta-6-day-one-patch-two-silent-updates-and-a-psn-outage); [Vice](https://www.vice.com/en/article/gta-6-day-one-patch-ps5-version-1002/) |
| 01.002.001 | Nov 16, 2026 | 602.5 MB | about 1.6 GB (1.59 GB) | None | CONFIRMED (sizes, missing notes); LIKELY (date) | [Forbes, Nov 17](https://www.forbes.com/sites/brianmazique/2026/11/17/gta-6-just-got-a-second-update-before-anyone-can-play-it-and-rockstar-still-isnt-saying-what-it-changes/); [Beebom tracker](https://beebom.com/gta-6-patch-notes-updates-tracker/) |
| PS5 system software 26.07-14.23.00 | Nov 18 (one note says Nov 17, conflict) | required to start | n/a | n/a | LIKELY | [dLcompare](https://www.dlcompare.com/gaming-news/gta-6-day-one-patch-two-silent-updates-and-a-psn-outage) |
| Unknown post-launch update | Unknown | Unknown | Unknown | Unknown | UNVERIFIED: RockstarINTEL headline "New GTA VI update released and not everyone has gotten it", fetch was rate-limited | [RockstarINTEL](https://rockstarintel.com/new-gta-vi-update-released-and-not-everyone-has-gotten-it-heres-why/) |
| "Nov 25 fix" | Nov 25 | n/a | n/a | n/a | RUMOR (X post, no Rockstar statement) | [dLcompare](https://www.dlcompare.com/gaming-news/gta-6-day-one-patch-two-silent-updates-and-a-psn-outage) |

## Two leads, three trainable stats, and a six-star police system

The game has two playable protagonists. **Jason Duval** (voiced by Dylan Rourke) grew up around grifters, served in the army and works for drug runners in the Leonida Keys. **Lucia Caminos** (voiced by Manni L. Perez) was taught to fight by her father and served time in the Leonida Penitentiary ([Rockstar People page](https://www.rockstargames.com/VI/people); [Wikipedia](https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI)). A ViceManual screenshot of the stats tab shows Jason with a "Hardened" criminal profile, **6 ft 1 in and 217 lb** ([ViceManual](https://vicemanual.com/gta-6-screenshots)). Jason keeps a pet snake named **Dolores** that gives a small Focus buff when fed ([Red Bull, Nov 19](https://www.redbull.com/int-en/gta-6-beginners-guide)). No source gives either character a GTA V-style special ability. The game has **multiple endings**; after the credits it returns you to just before the final choice, but earlier chapters cannot be replayed ([Wikipedia citing Vice and Kotaku](https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI)).

Character switching is a live conflict the app should show as disputed. KeenGamer says free switching unlocks in Chapter 2 after "Breakfast Run" using **hold D-pad right + R1/RB** ([KeenGamer](https://www.keengamer.com/articles/guides/how-to-switch-between-jason-and-lucia-in-gta-6/)), while GameSpot says **L1/LB** after about 30% of the story ([GameSpot](https://www.gamespot.com/articles/how-to-switch-between-jason-and-lucia-in-gta-6/)). The difference may come from control-scheme settings. Partner controls are firmer: D-pad right then Circle/B passes stash bags, and Triangle/Y on a map icon invites the other character to a robbery (CONFIRMED, Red Bull + [BGR, Nov 20](https://www.bgr.com/2322599/gta-6-new-heat-system-cop-memory-explained/)).

| Supporting character | Role (pre-release, official) | Voice actor | Tag |
|---|---|---|---|
| Cal Hampton | Jason's conspiracy-minded friend; fishing rival (trophy "Baited My Tackle") | Bobby Moynihan | CONFIRMED (role); LIKELY (actor) |
| Boobie Ike | Vice City strip club and music label owner | Mike Forbs | CONFIRMED; LIKELY |
| Dre'Quan Priest | Rapper and label boss tied to Boobie | Naiqui Macabroad | CONFIRMED; LIKELY |
| Real Dimez (Bae-Luxe, Roxy) | Rap duo | Hood Brat, Krissy Celess | CONFIRMED; LIKELY |
| Raul Bautista | Veteran bank robber | Manny Pérez | CONFIRMED; LIKELY |
| Brian Heder | Keys drug runner, Jason's landlord | Stephen Root | CONFIRMED; LIKELY |
| Mia Caminos | Lucia's mother | Roselyn Sánchez | LIKELY |
| Aldo Méndez, Giorgio Gallo, Danica Howard, Abe Gonzalez, Mattia, Kordell Grant, Valentina | Listed, roles not stated | not named | LIKELY |
| Niko Bellic (SPOILER) | Cameo from GTA IV, Michael Hollick returning | Michael Hollick | LIKELY, Wikipedia only; confirm before showing |

Sources: [Rockstar People](https://www.rockstargames.com/VI/people); [Wikipedia](https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI). Anitta, Bad Bunny, RaiNao and Barbie Ferreira have voice roles with unstated characters (same source).

### Character stats: three bars, four levels each

GTA VI drops GTA V's seven skills. Each protagonist has **Strength (max health), Cardio (max stamina) and Focus (slow-motion aiming time), each capped at Level 4**. This is CONFIRMED by four independent sources ([Dexerto](https://www.dexerto.com/wikis/gta-6/workout-guide/); [Push Square](https://www.pushsquare.com/guides/gta-6-workouts-explained-and-why-to-do-them); [Red Bull](https://www.redbull.com/int-en/gta-6-beginners-guide); [ViceManual screenshot](https://vicemanual.com/gta-6-screenshots)). Strength and Cardio have timed "Workout Windows" and drop if you keep missing them; Focus never drops. Any guide listing Shooting, Driving, Flying, Stealth or Lung Capacity stats is describing GTA V or GTA Online.

| Stat | Icon | Effect | How to train | Decays? | Tag |
|---|---|---|---|---|---|
| Strength | pink heart | Max health, visible muscle | Weights on Jason's terrace (Ch1), paid gym memberships | Yes, if Workout Windows are missed | CONFIRMED |
| Cardio | green bolt | Max stamina | Punching bag at Jason's house, treadmills and bikes, running, cycling, swimming, kayaking | Yes | CONFIRMED |
| Focus | purple eye | Slow-motion aiming time; Combat Focus (click both sticks) also highlights objectives and safe codes | Shooting ranges (Rodgers Ranch, Kelly County, is fast), golf, pool, fishing, feeding Dolores | No, permanent | CONFIRMED (stat); LIKELY (training spots) |
| Hunger and Body Composition | Fitness app | Weight follows calories; overeating at Marbles fast food gives "Overweight" | Eating, sleeping and showering give temporary buffs | n/a | LIKELY ([Push Square](https://www.pushsquare.com/guides/gta-6-workouts-explained-and-why-to-do-them)) |

Down on the D-pad shows the stat meters during play. Partner workouts unlock later and train both characters at once. Exact XP per level is not published.

### Wanted level, Heat and Criminal Profile

The wanted meter goes up to **six stars**, one more than GTA V (CONFIRMED, BGR + ViceManual HUD screenshot). Police only react to crimes someone witnesses. Under the stars sit **Heat icons** that show what police know about you, and each has its own fix (CONFIRMED by BGR, Red Bull, [GameLeap](https://www.gameleap.com/articles/gta-6-wanted-level-heat-system-explained) and [Game Rant](https://gamerant.com/gta-6-all-heat-icons-explained-lose-avoid)). Separately, a long-term **Criminal Profile** tracks how violent you are, and losing your stars does not reset it.

| Heat icon | Meaning | How to clear |
|---|---|---|
| Hanger | Your clothing | Change outfit (shop items tagged "Will remove outfit heat"; car trunk holds 5 outfits) |
| Single silhouette | Your face | Haircut, mask or helmet |
| Double silhouette | You two together | Split up |
| Handgun | Your weapon | Stow it |
| Camera | CCTV footage | Destroy camera or stop witnesses escaping |
| Car | Your vehicle | Swap cars or use Pay 'n' Spray |

| Criminal Profile tier (Red Bull order) | Color | Notes | Tag |
|---|---|---|---|
| Professional | yellow | Limb shots reportedly keep you here (video only, RUMOR) | LIKELY |
| Hardened | orange | Seen on Jason's stats screenshot | CONFIRMED |
| Violent | purple | | LIKELY |
| Psycho | light grey | You can no longer surrender | LIKELY |
| Irredeemable | dark grey | Permanent, reached by staying Psycho too long | LIKELY |

Conflict: older previews used the tier name "Aggressive", which clashes with "Hardened" ([G2A News](https://www.g2a.com/news/gta-6-news/gta-6-criminal-profiles-explained/); [Red Bull](https://www.redbull.com/int-en/gta-6-beginners-guide)). Forum posters believe running over animals and killing on missions worsens the profile and may affect the ending (RUMOR, [ResetEra](https://www.resetera.com/threads/gta-vi-tips-and-tricks-thread-mark-spoilers-or-keep-them-vague.1693481/page-5)).

### Phone and loadout basics

The phone opens with **up on the D-pad** and carries about ten apps, CONFIRMED across Red Bull, KeenGamer's trophy list and the ViceManual screenshots: WhatUp (messages), RydeMe (ride-hail, $100 extra to skip the ride), WAiNK (photo scans; shows a car's security, value and registration cost), Scooter Bros (delivers a registered car), Fitness, Weather, News (Weazel News, The Leonida Journal, Vice City Horn), a social feed (Snapmatic per Wikipedia), BuckMe (bank) and a Vice City Real Estate app for garages. You carry **two sidearms and two long guns** (LIKELY, GTABase + video); the rest go in the car trunk ([Wikipedia citing TechRadar](https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI)). Pocket cash is lost on death or arrest until you open a bank account in the mission "Buck Me" ([Red Bull](https://www.redbull.com/int-en/gta-6-beginners-guide)). Armor values are still unconfirmed.

## Leonida has six regions and about 750 store and service pins

Rockstar names six regions: **Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga National Park** (CONFIRMED, [PlayStation Blog](https://blog.playstation.com/2026/11/18/grand-theft-auto-vi-launches-tomorrow-november-19/)). Edge magazine, visiting Rockstar North, reports the map is roughly **twice GTA V's**, and several outlets repeat that figure from Rockstar, making it CONFIRMED ([TweakTown on Edge, Oct 29](https://www.tweaktown.com/news/114382/gta-6s-map-is-roughly-twice-gta-5s-and-almost-as-big-as-gta-4-gta-5-and-rdr2-combined/index.html)). No official square-kilometer figure exists; the circulating 83 km² comes from the 2022 leak ([Dexerto](https://www.dexerto.com/wikis/gta-6/leonida-map-size/)). The whole map is technically open from the start, but roughly the first 30-35% of the story keeps you in the Keys, and unexplored areas sit under fog of war rather than being locked ([SVG, Nov 18](https://www.svg.com/2321164/gta-6-map-limitation/); [games.gg](https://games.gg/grand-theft-auto-vi/guides/grand-theft-auto-6-map-unlock-how-to-reveal-full-map/)). **No source publishes in-game x/y coordinates**, so every pin location below is a landmark description.

Counties are real in-game labels (LIKELY, two post-launch sources): PowerPyx groups flamingos under Mariana County and Vice City ([PowerPyx](https://www.powerpyx.com/gta-6-all-cocaine-flamingo-locations/)), and a stunt jump video uses Vice-Dale, Leonard, Mariana and Kelly counties ([YouTube uq5T0aZgjFA, Nov 20](https://www.youtube.com/watch?v=uq5T0aZgjFA)). Lummox County appears in the 2022 leak and in PowerPyx's aircraft guide ("far-north Lummox County"). How counties map onto the six regions is not official, so the app should use the six regions as its top level and counties as optional sub-tags.

| Region (official) | Sub-areas named post-launch (grouping is an inference from video chapter order) | Tag |
|---|---|---|
| Vice City | Balsero, Bayside, Bluegrass, Crosstown, Dalton Island, Decor District, Downtown, Hamlet, La Perle, Little Cuba, Ocean Beach, Penmarch Isle, Port VC, Salton, Southside, Tequesta, Tequesta Retreat, VCIA and VCIA Terminals, Washington Beach, South/West Vice-Dale County; also Starfish Island, Belville, Capri, Vespucci Island | LIKELY (names); grouping is inference |
| Leonida Keys | Key Lento, Abismo Key, Corsair Key, Breakwater Quarry, Mile Zero Air Station, Permit Keys, Riquezas Key | LIKELY |
| Grassrivers | Grassrivers (wetlands) | LIKELY |
| Mariana and Leonard counties (region placement unclear) | North Mariana County, Belpoint, Watson Bay, Mount Hailes Country Club, North/South Leonard County, Richard Barebone National Park, Waning Sands | LIKELY |
| Ambrosia and Port Gellhorn | Ambrosia, Port Gellhorn, Gellhorn, Draper Island, Emerald Springs, Frogswater, Manifest Canyon, North/South Kelly County, Thrillbilly Mud Club, Wild Hog Point, Bonanza, Dawson Dam, Grayson | LIKELY |
| Mount Kalaga National Park | Kalaga National Park, MacAlister Gold Mine, Millport, Moreau, Kalaga Reservoir | LIKELY |

Source: [YouTube uq5T0aZgjFA chapters](https://www.youtube.com/watch?v=uq5T0aZgjFA) (derived from MapGenie data, so not independent of MapGenie); [The Big Lead, Nov 18](https://www.thebiglead.com/gta-6-collectibles-guide-cards-styles-meteorite-chunks-landmark-scans/). Hamlet, Key Lento, Port Gellhorn, Watson Bay and Draper Island are CONFIRMED as place names by two sources each. Do not treat Capri as a seventh region ([games.gg](https://games.gg/grand-theft-auto-vi/guides/grand-theft-auto-6-map-unlock-how-to-reveal-full-map/)).

### Store and service pin counts

PowerPyx's reading of the in-game Progress Database is the only full source for store counts ([PowerPyx Progress Database, Nov 18](https://www.powerpyx.com/gta-6-collectible-guide/)). Every row is LIKELY (single reputable source reading the game's own tracker) unless noted. The research notes describe the total as "about 690", but the listed figures add up to **751** by my arithmetic (722 without banks and payday loans), so the app should sum the rows itself rather than trust a quoted total.

| Group | Category | Count | Tag and notes |
|---|---|---|---|
| Vehicle services | Mod Shops | 14 | LIKELY; each shop specializes in one vehicle type |
| Vehicle services | Pay 'n' Sprays | 19 | LIKELY |
| Vehicle services | Gas Stations | 57 | LIKELY |
| Vehicle services | Car Washes | 6 | LIKELY |
| Vehicle services | Garages | 13 | LIKELY (conflict: GameRant counts 14 garages plus a GTA+ 15th, see Properties) |
| Weapons | Ammu-Nations | 24 | CONFIRMED (PowerPyx + video [tjsYTsPPYQE](https://www.youtube.com/watch?v=tjsYTsPPYQE) at 03:43); 6 are "expanded" stores |
| Travel | Train Stations | 25 | LIKELY |
| Travel | Ferry Terminals | 2 | LIKELY |
| Retail | Clothing Stores | 67 | LIKELY; same-brand stores share stock |
| Retail | Footwear | 17 | LIKELY |
| Retail | Hair and Beauty Salons | 18 | LIKELY |
| Retail | Tattoo Studios | 11 | LIKELY |
| Retail | Electronics | 15 | LIKELY |
| Retail | Convenience Stores | 72 | LIKELY; all robbable |
| Retail | Liquor Stores | 14 | LIKELY; all robbable |
| Food and drink | Fast Food | 21 | LIKELY (conflict: robbery list says 23 fast food joints) |
| Food and drink | Cafes and Takeout | 87 | LIKELY |
| Food and drink | Bars | 122 | LIKELY |
| Food and drink | Street Food Vendors | 118 | LIKELY |
| Other | Robbable Payday Loans | 7 | LIKELY |
| Other | Banks | 22 bank jobs (14 small, 8 large vaults) | LIKELY |
| Not counted | Hospitals, police stations, fire stations, airports, marinas, ATMs | unknown | RUMOR (GTA Boss fan map uses estimated positions); no ATM source at all |

Named examples: an Ammu-Nation in Hamlet with a collectible card on its billboard ([GTABoom](https://www.gtaboom.com/gta-6-collectibles)); Chuck's Tackle & Shot in Key Lento is the first gun shop, reached in the mission "Gear Up" (video V 02:21). Expanded gun stores named by eGamers citing PowerPyx are Big Shots (Hamlet), Woodhatch (Capri), Phil's, Black Eagle, Iron & Oak (Vice City area) and Prestige Firearms (Ocean Beach); the article says five but names six (LIKELY, [eGamers](https://egamers.io/gta-6-weapons-guide-every-class-launcher-and-sniper-prices-and-which-ammu-nation-stores-sell-them/)). Store tier names conflict: PowerPyx/eGamers say limited, standard, hunting, expanded, while the video's map filter says every day, premium, hunting, pawn (RUMOR on names).

Fast travel was unresolved in the map notes, but PowerPyx's tips say **taxi fast travel costs $100 or more**, which matches RydeMe's $100 skip fee (LIKELY, [PowerPyx tips](https://www.powerpyx.com/gta-6-tips-tricks/); [Red Bull](https://www.redbull.com/int-en/gta-6-beginners-guide)).

## Collectibles: about 3,000 tracked entries, with counts the app can verify

GTA VI's in-game tracker reportedly holds about 3,000 entries, and most of the app's collectible counts should come from it. Two caveats matter. First, a site showing a lower number (The Big Lead's 14 flamingos or 91 cards) is usually showing "found so far", not a real conflict. Second, some items count toward 100% only above a threshold, so the app needs both a `total` and a `required` field. GTA V categories like signal jammers, money bags and spaceship parts have no source in GTA VI; Cocaine Flamingos fill the hidden-package role.

| Category | Total | 100% requires | Tag | Conflicts and notes | Source |
|---|---|---|---|---|---|
| Collectible Cards | 480 in 18 sets (12-36 per set) | 15 of 18 sets | LIKELY | Sets themed on Vice City, Liberty City, Los Santos; sell at pawn shops (GTA Boss). Videos confirm a 36-card Jack of Hearts set and 18-card Delights set | [PowerPyx](https://www.powerpyx.com/gta-6-collectible-guide/) |
| WAiNK Scans | 108 (Landmarks 31, Curiosities 35, Sculptures 23, Peewee's Billboards 4, No Flusher Tags 15) | 100 | CONFIRMED for 31/35/23 (GTA Boss agrees) | GTABoom says 112 in 4 categories | [PowerPyx](https://www.powerpyx.com/gta-6-collectible-guide/); [GTA Boss](https://www.gtaboss.gg/gta-6/collectibles) |
| Ahol Street Art | 112 in 11 trash-themed types | not listed | LIKELY | | PowerPyx |
| 1010 Murals | 5 | not listed | CONFIRMED | All five unlock the "1010 Cheetah" car and a garage (LIKELY) | PowerPyx; GTA Boss |
| Underwater Discoveries | 33 | 33 | CONFIRMED | | PowerPyx; GTA Boss |
| Magazines, Books and Comics | 27 | 30 of 34 | CONFLICT | PowerPyx collectible guide 27; PowerPyx 100% list 34; GTA Boss list shows 29 | [PowerPyx 100%](https://www.powerpyx.com/gta-6-100-completion-checklist-guide/) |
| Book Swaps | 7 | not listed | CONFIRMED | | PowerPyx; GTA Boss |
| Meditation Spots | 18 | 15 | CONFIRMED (PowerPyx, GTA Boss, three videos) | Trophy "Positive Mental Attitude" needs all 18 | PowerPyx |
| Cocaine Flamingos | 125 | 100 | CONFIRMED (PowerPyx, GTABoom, video title) | Shoot it, collect the cocaine package, sell to a fence. GTABase's "Hidden Packages" layer shows 63 or 74 (RUMOR) | [PowerPyx flamingos](https://www.powerpyx.com/gta-6-all-cocaine-flamingo-locations/) |
| Unique Playlists | 2 | 2 | LIKELY | GTA Boss says "7 found so far" | PowerPyx |
| Styles | 79 (Jason's Magazine 13, Lucia's Magazine 15, Magazine Tattoos 17, Luxury Watches 34) | 70 | LIKELY | | PowerPyx |
| Wyman's Cars | 5 | n/a | LIKELY | Ultimate Edition only | PowerPyx |
| Kenton's Treasures | 7 sunken wrecks | 5 | LIKELY | Finder's fee plus bonus for the right buyer; e.g. 10 doubloons at the Nuestra Señora del Ocio wreck off Key Lento | [GTA Boss](https://www.gtaboss.gg/gta-6/collectibles) |
| Meteorite chunks | about 26 | n/a | LIKELY | Glow at night; 5 in Selkie Hole tunnels; may sit inside another category | [The Big Lead](https://www.thebiglead.com/gta-6-collectibles-guide-cards-styles-meteorite-chunks-landmark-scans/) |
| Stunts | 397 (Stunt Jumps 130, Under the Bridge 202, Knife Flights 40, Base Jumps 25) | 300 | CONFIRMED (130 jumps, PowerPyx + video); LIKELY (rest) | Trophy "Cunning Stunts" needs 250 | PowerPyx |
| Wildlife | 255 (Hunts 61, Fish 35, Birds 60, Cats and Dogs 34, Mammals 18, Aquatic 18, Reptiles 6, Other 23) | 100 | LIKELY | Pre-launch "170+ species" claim is RUMOR | PowerPyx |
| Vehicles | 557 (277 base, 280 Standout) | 200 of 277 scanned | LIKELY | Use the checklist's 277 for 100% | PowerPyx |
| Weapons | 196 in tracker | 50 of 66 | CONFLICT | Dexerto ranks 136, GTABase lists 206 | PowerPyx |
| Equipment | 12 | n/a | LIKELY | | PowerPyx |
| Contacts | 10 | n/a | LIKELY | | PowerPyx |
| Gangs | 9 (39 gang operations) | 39 of 39 | LIKELY | Operations respawn slowly | PowerPyx |
| Challenges | 80 | 70 | LIKELY | 8 categories: Survival, Combat, Sports, Vehicle, Shopping, Criminal, Exploration, Fitness ([VICE](https://www.vice.com/en/article/gta-6-cheat-codes-list/)) | PowerPyx |
| Cheats | 61 | n/a | LIKELY | Unlocked after the story via challenges | PowerPyx |

The full 100% checklist has 35 items in three groups (Story and Tasks 12, Exploration and Activities 20, Discovery 3), tracked at Progress > Stats > 100% Completion, and **PowerPyx says nothing is permanently missable for 100%** ([PowerPyx 100%](https://www.powerpyx.com/gta-6-100-completion-checklist-guide/)). Other thresholds: 100 optional tasks, Bank Jobs 22/22, Payday Loans 7/7, Smash 'n' Grabs 34/35, Stick Ups 50/91, Vaults 8/8, fence $100k narcotics + $100k jewelry + $250k marked bills + $200k vehicles, races 30/40, race challenge golds 10/13, shooting golds 42/42, video games 4/4, pool 5/7, mini golf 2/3, hoops 90/100, drone trials 42/42, Bret decks 15/15.

| Activity | Count | Tag | Conflict |
|---|---|---|---|
| Basketball hoops | 100 | LIKELY | |
| Golf | 5 courses (King Gator, Frontier, Dino, Leaf Links, Mount Hailes) in the collectible guide | CONFLICT | 100% guide says mini golf 3 |
| Pool opponents | 7 | LIKELY | |
| Fishing | 35 species | LIKELY | catch-and-release (RUMOR, pre-launch) |
| Hunting | 15 Bret's Target Decks | LIKELY | |
| Shooting ranges | 14 challenges, 42 gold medals; $5 waiver | LIKELY | |
| Races | 40 unique in 6 groups; 13 race challenges | LIKELY | |
| Drone races | 42 time trials at 14 locations | LIKELY | |
| Arcade games | 4 (two named: "Tenebra Lux" per video, "Street Trash Dezombifier III") | LIKELY | "Tenebra Lux" in the video chapter vs "Tenebrae Lux" in GameRant |
| Activity types | 9 | CONFIRMED (Beebom + PowerPyx; trophy "Master of None") | |

### Stunt jump locations by area (130 total, CONFIRMED count)

This breakdown comes from the chapter markers of a stunt jump video (LIKELY, and derived from MapGenie, so it is not independent of MapGenie; use it as a checklist, not as ingested pin data) ([YouTube uq5T0aZgjFA, JFL VIDEOS, Nov 20](https://www.youtube.com/watch?v=uq5T0aZgjFA)). Vice City holds jumps 1-54, about 42% of the total.

| Video time | Area | Jumps |
|---|---|---|
| 0:00 | Balsero, Bayside, Bluegrass | 1-4 |
| 0:28 | Crosstown, Dalton Island, Decor District | 5-8 |
| 0:54 | Downtown | 9-11 |
| 1:14 | Hamlet | 12-13 |
| 1:27 | La Perle | 14-16 |
| 1:46 | Little Cuba | 17-18 |
| 1:59 | Ocean Beach + Penmarch Isle | 19-31 |
| 3:24 | Port VC + Salton | 32-34 |
| 3:43 | South Vice-Dale County + Southside | 35-38 |
| 4:09 | Tequesta + Tequesta Retreat | 39-42 |
| 4:35 | VCIA | 43-48 |
| 5:14 | VCIA Terminals + Washington Beach | 49-51 |
| 5:34 | West Vice-Dale County | 52-54 |
| 5:53 | Abismo Key | 55-56 |
| 6:06 | Breakwater Quarry + Corsair Key | 57-61 |
| 6:39 | Grassrivers | 62-64 |
| 6:58 | Key Lento | 65-66 |
| 7:11 | Mile Zero Air Station | 67-69 |
| 7:31 | North Mariana County + Mount Hailes Country Club | 70-72 |
| 7:50 | North Leonard County | 73-74 |
| 8:03 | Richard Barebone National Park | 75-76 |
| 8:16 | South Leonard County | 77-80 |
| 8:42 | Waning Sands | 81-83 |
| 9:02 | Ambrosia | 84-88 |
| 9:34 | Draper Island | 89-90 |
| 9:47 | Emerald Springs | 91-92 |
| 10:00 | Frogswater | 93-94 |
| 10:13 | Gellhorn | 95-100 |
| 10:52 | Manifest Canyon | 101-103 |
| 11:12 | North Kelly County | 104-106 |
| 11:31 | Port Gellhorn | 107-109 |
| 11:51 | South Kelly County, Thrillbilly Mud Club, Wild Hog Point, Bonanza, Dawson Dam, Grayson | 110-117 |
| 12:43 | Kalaga National Park | 118-122 |
| 13:15 | MacAlister Gold Mine | 123-127 |
| 13:48 | Millport + Moreau | 128-130 |

### Example pin locations (landmark descriptions, no coordinates)

| Item | Category | Location | Tag | Source |
|---|---|---|---|---|
| Juan Carlos Garcia card | Card | Box inside a garage, Key Lento | LIKELY | [The Big Lead](https://www.thebiglead.com/gta-6-collectibles-guide-cards-styles-meteorite-chunks-landmark-scans/) |
| Card on Ammu-Nation billboard | Card | Climb the billboard tower behind the Hamlet Ammu-Nation | LIKELY | [GTABoom](https://www.gtaboom.com/gta-6-collectibles) |
| Nine1Nine card | Card | Warehouse office, Draper Island restricted area | LIKELY | The Big Lead (search snippet) |
| Trigger Happy #99 | Magazine | House in north-central Key Lento | LIKELY | The Big Lead |
| Gellhorn Funfair | WAiNK scan | Big Ferris wheel, Port Gellhorn | LIKELY | The Big Lead |
| Sunset Blush makeup | Style | Magazine in a Key Lento bedroom | LIKELY | The Big Lead |
| Flamingo | Cocaine Flamingo | Garden of an eccentric house, central Key Lento | LIKELY | The Big Lead |
| 6 flamingos | Cocaine Flamingo | Mariana County, Belpoint: SE docks; two burning-flamingo houses (big white, small white); inside the burning container on the beach; by the beach fire next to a body and chair; on a yellow container in the water | LIKELY | [PowerPyx](https://www.powerpyx.com/gta-6-all-cocaine-flamingo-locations/) |
| 1 flamingo | Cocaine Flamingo | Watson Bay, SW corner of a motel on the eastern edge, among trash | LIKELY | PowerPyx |
| 1 flamingo | Cocaine Flamingo | La Perle, ground level in the C-shaped building NW of Tyrone's apartment | LIKELY | PowerPyx |
| Basketball hoop | Activity | Front garden of a Starfish Island mansion | LIKELY | The Big Lead |
| Wyman kit car | Vehicle | Garage in Capri | LIKELY | The Big Lead |
| Patriarch DRX pistol | Weapon | Underwater by a sunken car, south of Kalaga Reservoir | LIKELY | The Big Lead |
| Festive Poodle, Cartoon Labrador | Unique dogs | not given | LIKELY | The Big Lead |

## Safe codes, secrets and mysteries need three separate shelves

The safest rule for safes is CONFIRMED across three sources: **ordinary store and robbery safes use randomized codes every time**, and only story or unique safes have fixed codes ([PC Gamer](https://www.pcgamer.com/games/grand-theft-auto/gta-6-safe-codes-combinations/); [YouTube -eLZbZSZizU](https://www.youtube.com/watch?v=-eLZbZSZizU); [xboxplay.games](https://xboxplay.games/gta-6/gta-6-safe-codes-robberies-guide-all-combinations-77421)). For random safes, the app should give methods, not codes: interrogate a cashier, owner or fence; find the note on site; use Focus (L3+R3) to highlight clues; pick small safes; open lockboxes with a Snap Gun; or blow the safe with a sticky bomb, which worsens your standing with police ([PlayNews](https://www.playnews.gg/en/guides/gta-6-safe-codes-where-to-find-them-and-what-to-do-without-them)).

| Code | Location / context | Tag | Sources |
|---|---|---|---|
| 7700 | Brian's lockup (mission "Lab Fees") | CONFIRMED | [Roonby, Nov 19](https://roonby.com/2026/11/19/gta-6-safe-codes-all-known-combinations-and-how-to-find-them/amp/); [Beebom](https://beebom.com/gta-6-safe-codes/); [YouTube -eLZbZSZizU](https://www.youtube.com/watch?v=-eLZbZSZizU) |
| 0420 | Key Lento lab door ("Lab Fees"). Roonby labels it "Moonstone Boutique room" | LIKELY (code matches, label conflicts) | Roonby; video |
| 6823 | Brooks Boatworks, Kolt and Associates hideout, Port Gellhorn | CONFIRMED | video; xboxplay.games |
| 2008 | Delights club office, Port Gellhorn ("Afternoon Delight") | LIKELY (single video) | video |
| 1680 | Casa de Empeño (Yasmani's Jewelry Jobs) | LIKELY (single video) | video |
| 6815 | Richardson Jewelry (Yasmani's Jewelry Jobs) | LIKELY (single video) | video |
| 0104 | Donovan Banks and Co. (Yasmani's Jewelry Jobs); keep the leading zero | LIKELY (single video) | video |
| 0072 | Pelican Valley crab research outpost safe | LIKELY (single video) | video |
| 0212 | Pelican Valley boat garage keypad; note is inside the 0072 safe | LIKELY (single video) | video |
| 6969 | La Cascara Motel | RUMOR (search snippet only) | xboxplay.games |
| 0300 | Kingpin Bowling | RUMOR; the video says use a sticky bomb on the NE office safe instead | xboxplay.games |
| 44017 | Cottonmouth Lake trailer | RUMOR (one cluster of copycat sites) | Roonby; Beebom |
| 7777 | Nova Auto Junkyard | RUMOR | Roonby; Beebom |
| 010317 | President Russo Bunker 1 door, Sharktooth Island (Russo's birthday) | CONFIRMED | [GameRant, Nov 21](https://gamerant.com/gta-6-president-bunker-location-all-codes/); [Beebom, Nov 22](https://beebom.com/gta-6-free-tank-secret-bunker-location/); [YouTube lrSeYhS5aJA](https://www.youtube.com/watch?v=lrSeYhS5aJA) |
| 2341 | "Protocol #2" clue inside Bunker 1 (orders the radio numbers) | CONFIRMED | same |
| 2975 | Bunker 1 safe | CONFIRMED | same |
| 085355 | Bunker 2 tree-hatch keypad ("OBSESS" on a seven-segment display) | CONFIRMED | same |
| Tenebrae Lux phone code | **Randomized per playthrough.** Guide examples 416643# and 424345# are NOT universal codes | CONFIRMED (randomization) | [GameRant, Nov 18](https://gamerant.com/gta-6-tenebrae-lux-phone-puzzle-solution/) |

A video lists "All 14 Safe Codes From Illegal Operations (Kingpin Bowling, Sunrise RV and more)" and others cover Janjak Garage, the Burned Houses trailer, Chatfield Storage and Logistics, and La Cascara Motel; none have been reviewed ([_bM4rxLlmp8](https://www.youtube.com/watch?v=_bM4rxLlmp8); [357HrnAdP_M](https://www.youtube.com/watch?v=357HrnAdP_M); [rPM5EVlsSl8](https://www.youtube.com/watch?v=rPM5EVlsSl8); [JBRUQw47ZKw](https://www.youtube.com/watch?v=JBRUQw47ZKw); [Ew_tcjbaN_4](https://www.youtube.com/watch?v=Ew_tcjbaN_4)). These are high-priority transcription targets.

### Random events: unmarked, possibly one-time

Random events are not shown on the map; you find them by moving slowly, listening for shouts or gunfire, and using Focus to point toward the source (LIKELY, [Insider Gaming, Nov 19](https://insider-gaming.com/gta-6-early-game-locations-make-money/)). Claims of "about 500 ambient events across 12,500 locations" and "1,000+ encounters" are unverified secondhand developer quotes, and GTABase's fan map shows 181 locations (RUMOR, [timesaver.gg](https://timesaver.gg/blog/gta-6-random-events); [GTABase map](https://www.gtabase.com/gta-6/map/?feature=random-event)). Reports that interactive encounters never respawn are RUMOR, but the app should still let users mark events done.

| Event | Where | What happens | Tag | Source |
|---|---|---|---|---|
| Manatee Motel tiger | SW of Hamlet, above Shoeless Keys (Ch1) | Tiger has killed most of a gang; shotgun behind the building; cash inside; 3-4 gang members arrive after | LIKELY | [Insider Gaming](https://insider-gaming.com/gta-6-early-game-locations-make-money/) |
| Ocean stilt house | Northernmost stilt house NE of Corsair Key, by boat | Dead gang, cash and cocaine; Focus reveals a floorboard stash | LIKELY | Insider Gaming |
| Dog on a jet ski | At sea when stranded | Goggled dog rescues you | CONFIRMED | [GamingBible, Nov 20](https://www.gamingbible.com/news/gta-6-easter-eggs-778903-20261120); [GTA Codex](https://www.gtacodex.com/discover/gta-6-random-events) |
| Abandoned car with alarm | Roadside, Ch2 | Leads into the woods to a body and an apparent alien abduction | LIKELY | GamingBible |
| Keys liquor store parrots | Leonida Keys | Fight while parrots cheer; one reveals cash near a generator | LIKELY | GamingBible |
| Tempesta repo fight | NE 3rd St | Owner fighting a repo man; steal the car from the tow truck (Randy's list) | LIKELY | [Push Square](https://www.pushsquare.com/guides/gta-6-randys-wish-list-vehicle-locations) |
| Crashed drug plane | not given | Drugs to sell | RUMOR | GTA Codex |
| Criminal interceptions | anywhere | Reported $1,000-$15,000 | RUMOR (payout) | [gamerbolt](https://www.gamerbolt.com/gta-6-money-guide/) |
| Police stun gun | Ch1 random chase | Incapacitate an officer to get a stun gun | RUMOR (one forum post) | [ResetEra](https://www.resetera.com/threads/gta-vi-tips-and-tricks-thread-mark-spoilers-or-keep-them-vague.1693481/) |

### Easter eggs and secret locations that hold up

| Secret | Where | What | Tag | Source |
|---|---|---|---|---|
| President Russo's bunkers | Start: veteran Jose Bermudez at Friends of Freedom, Catalan Blvd, eastern Downtown Vice City; his Little Cuba apartment (salmon building, Cuban flags). Bunker 1: Sharktooth Island, north of Waning Sands. Bunker 2: conflict, GameRant says south of the highway Ammu-Nation in southern North Mariana County, Beebom says NW of Grassrivers left of Big Pine | Russo's 1922 Pistol (legendary), Hauners Ridgway tank (respawns, cannot be registered), Cold War 556 rifle (legendary), then a secret assassination side mission | CONFIRMED (bunkers, codes, rewards); LIKELY (side mission); UNRESOLVED (Bunker 2 location) | [GameRant](https://gamerant.com/gta-6-president-bunker-location-all-codes/); [Beebom](https://beebom.com/gta-6-free-tank-secret-bunker-location/); [YouTube lrSeYhS5aJA](https://www.youtube.com/watch?v=lrSeYhS5aJA) |
| Tenebrae Lux puzzle game | JoySystem console in Jason's house | Six dated rooms with anomalies become a randomized phone code; a ruins-and-bridge symbol puzzle (three wrong steps reshuffle); 11 notebook pages open a door at the end of a pier to a cabin with two monitors (secret ending) | CONFIRMED (game and puzzles); LIKELY (ending reward, Outputlag only) | [GameRant phone](https://gamerant.com/gta-6-tenebrae-lux-phone-puzzle-solution/); [GameRant bridge, Nov 19](https://gamerant.com/gta-6-tenebrae-lux-ruins-bridge-symbols-puzzle/); [Outputlag](https://outputlag.com/guides/gta-6-tenebrae-lux/) |
| Mount Chiliad conversation | Outside the bar where Jason meets Donnie and Brian, early story | Two patrons discuss Chiliad and a bunker with jetpacks and eggs | CONFIRMED | [GamingBible, Nov 20](https://www.gamingbible.com/news/gta-6-gta-5-mount-chiliad-mystery-easter-egg-802897-20261120) |
| Bigfoot / Skunk Ape | Woods near Cottonmouth Lake | Chase leads to a foul-smelling effigy; matches Kirk's "Search for the Skunk Ape" quest (night only) | CONFIRMED | GamingBible; [PowerPyx S&F](https://www.powerpyx.com/gta-6-all-strangers-freaks-side-missions/) |
| UFO easter egg | not given | A trophy "The Truth Is Out There" exists for it | LIKELY (trophy list) | [PowerPyx trophies](https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/) |
| Bird's nest eggs | Top of a communications tower (about a 7-minute climb) | Throwing an egg triggers a cutscene; nods to GTA Vice City | LIKELY | GamingBible |
| Dexter's apartment lookalike | Vice City | Not enterable | LIKELY | GamingBible |
| Hidden barn loot | South Vice-Dale County warehouse NE of Hamlet near Lucia's former prison | No enemies; weapons, cash, cocaine, a $6,000 baseball card | LIKELY | [Insider Gaming](https://insider-gaming.com/gta-6-early-game-locations-make-money/) |
| Three Sheets Liquor back room | Via Shirley's errand (Ch1) | 4-5 guards, cash | LIKELY | Insider Gaming |
| Map color legend | Map | Dark-blue buildings are enterable with loot; light-blue are scenery; full-color are hideouts or friends; red Focus doors need a special lockpick | LIKELY (several forum posters, no press) | [ResetEra p.5](https://www.resetera.com/threads/gta-vi-tips-and-tricks-thread-mark-spoilers-or-keep-them-vague.1693481/page-5) |

### Theories and unverified claims (keep in a "Theories" tab)

| Claim | Status | Source |
|---|---|---|
| Horse monument "Chiliad 2.0" near Manifest Canyon, north of Port Gellhorn: four stallions with star-chart symbols, one wearing a traffic cone; placard reads "Leonidan Supremacy", dated 1982; controller vibrates and beeps | Monument EXISTS (CONFIRMED by TheGamer, GamingBible, VGTimes). Mystery is THEORY. A mundane explanation is that it is a WAiNK scan point, since WAiNK shows a "nearby scan detected" cue (RUMOR) | Original post [r/GTA6 u/akspree](https://www.reddit.com/r/GTA6/comments/1y02wt7/i_may_have_found_gta_6s_version_of_mount_chiliad/); [TheGamer, Nov 19](https://www.thegamer.com/gta-6-symbols-mount-chiliad-mystery/); [VGTimes](https://vgtimes.com/gaming-news/175119-gta-6-mystery-grows-around-strange-symbols-near-manifest-canyon.html) |
| Conspiracy truck with an eye symbol | RUMOR | [Outputlag](https://outputlag.com/guides/gta-6-easter-eggs/) |
| Teleporting, invincible night NPC after you aim a sniper at it | RUMOR, possibly a glitch (Reddit u/seepa-man via press) | [GamingBible](https://www.gamingbible.com/news/gta-6-easter-eggs-778903-20261120) |
| South Park nod at "Skeeter's bar" | THEORY | [GameRant](https://gamerant.com/gta-6-south-park-easter-egg/) |
| Michael's boat from GTA V | RUMOR (paywalled snippet) | [Game8](https://game8.co/games/GTA-6/archives/638651) |
| Chapter 3 safehouse laptop password unlocks a free garage and car | RUMOR (one forum post) | [ResetEra p.5](https://www.resetera.com/threads/gta-vi-tips-and-tricks-thread-mark-spoilers-or-keep-them-vague.1693481/page-5) |
| WAiNK magazine scans unlock hairstyles | RUMOR | ResetEra p.5 |
| "SAW" easter egg | RUMOR (video title only) | [YouTube l8Zci0mICVA](https://www.youtube.com/watch?v=l8Zci0mICVA) |

### Hoaxes and do-not-publish items

| Claim | Why it fails | Source |
|---|---|---|
| GTA V-style cheat strings (PAINKILLER, TURTLE) and viral 28-code lists | Recycled GTA V codes; real GTA VI cheats are D-pad sequences on the phone and must be unlocked first | [gtabites](https://www.gtabites.com/cheats); [Sportskeeda](https://www.sportskeeda.com/esports/news-have-gta-6-cheat-codes-leaked-online-ahead-release-viral-rumor-debunked) |
| Pre-launch "leaked" trophy list ("Welcome to Vice", "Car Collector", "Treasure Hunter") | Names do not match the launch list | [X post](https://x.com/venkymama100/status/2119246300835414214); [Gamebyte](https://www.gamebyte.com/gta-6-trophies-list/) |
| 677 GB install size | Fake | [GamesRadar](https://www.gamesradar.com/games/grand-theft-auto/gta-6-gb-size/) |
| "Niko, Trevor, Michael and Franklin still alive?!" | Clickbait title, no corroboration | [YouTube a8fK-RLK4qM](https://www.youtube.com/watch?v=a8fK-RLK4qM) |
| Playable GTA 1/2 port in a data dump | Unverified | [ResetEra spoiler thread](https://www.resetera.com/threads/grand-theft-auto-6-spoiler-thread-unmarked-spoilers.1682483/) |
| "Ghost of Vice City" treasure hunt | Page written about 160 days before launch | [games.gg](https://games.gg/grand-theft-auto-vi/guides/grand-theft-auto-6-easter-eggs-and-secrets-known-clues/) |
| "Code generator" and sign-in pages | Scams | [Malwarebytes, Nov 2026](https://www.malwarebytes.com/blog/scams/2026/11/gta-6-scams-could-cost-you-your-account-money-or-crypto) |
| Thrax price $2,325,000; "123.75 mph" speeds; Itali GTO 117 mph | GTA Online / GTA V figures | [retrogems](https://retrogems.fr/en/gta-6/vehicles/thrax/); [RankedBoost](https://rankedboost.com/gta/fastest-cars/) |
| dLcompare "PvP 32 players / Co-op 4" | Store metadata contradicting single-player launch | [dLcompare](https://www.dlcompare.com/gaming-news/gta-6-day-one-patch-two-silent-updates-and-a-psn-outage) |

## Weapons use four 0-10 menu stats, cross-checked for about 50 guns

Shop menus rate every gun on **Damage, Accuracy, Handling and Range, out of 10 with one decimal**. There is no fire-rate stat; fire style (semi, burst, full auto) appears instead. Dexerto, NiaMeowDB (M) and Playday.one (P) report identical numbers for most guns ([Dexerto K17](https://www.dexerto.com/wikis/gta-6/weapons/pistols/klose-k17/); [NiaMeowDB, Nov 22](https://meowdb.com/gta6/weapons); [Playday, Nov 18](https://playday.one/2026/11/18/all-weapons-in-gta-6/)). None of these sites names its data source, so agreement to the decimal could be copying, and even CONFIRMED stat rows are weaker than a stat-screen screenshot would be. M and P disagree mostly on scoped weapons, where P is consistently lower on Accuracy and Range and higher on Handling; the cause (scope attachment, or a pre-launch build) is unknown. Price data also comes from eGamers quoting PowerPyx (E) and a narrated video guide (V, [YouTube tjsYTsPPYQE, vAnother Level, Nov 18](https://www.youtube.com/watch?v=tjsYTsPPYQE)).

Total weapon count conflicts: **136** (Dexerto ranks), **196** (PowerPyx tracker and the video), **206** (GTABase, including 120+ unique variants), and the 100% checklist asks for 50 of 66 ([GTABase](https://www.gtabase.com/weapons/gta-6/)). The community wiki lists about 85 base entries ([gta.wiki](https://gta.wiki/w/Weapons_in_GTA_VI%2Ftable)).

| Weapon | Class | Dmg / Acc / Hnd / Rng | Stat tag | Mag | Price | Store | Price tag |
|---|---|---|---|---|---|---|---|
| Scorpio Nipper .38 | Pistol (.380) | 2.8 / 3.0 / 9.0 / 3.0 | LIKELY | 8 | $550 | Chuck's Tackle & Shot | LIKELY |
| Klose K17 | Pistol (9mm, semi) | 4.0 / 4.2 / 8.5 / 3.8 | CONFIRMED | 17 | $975 | Chuck's; Big Shots (D); Prestige (M) | CONFIRMED |
| Duke 1922 | Pistol | 5.5 / 4.8 / 8.0 / 4.6 | LIKELY | 8 | $1,050 | Chuck's | RUMOR |
| Girardi ES9 | Pistol | 4.2 / 5.2 / 8.4 / 4.4 | LIKELY | 15 | $700 | Chuck's | LIKELY |
| Girardi ES18 | Pistol (3-round burst) | M 4.2/4.6/7.7/4.8 vs P 4.2/4.4/8.2/4.8 | RUMOR (conflict) | 30 | $1,550 | Prestige Firearms | RUMOR |
| Klose K17 MCD | Pistol (full auto) | 4.0 / 3.2 / Hnd M 7.7 vs P 8.0 / 4.2 | RUMOR (conflict) | 24 | $1,700 | Prestige | RUMOR |
| Fairview Kalinga .50 | Pistol (.50) | 7.0 / 4.0 / 7.8 / 5.0 | LIKELY | 7 | $3,100 | Prestige | RUMOR |
| Hawk & Little .38 | Revolver | 2.5 / 5.0 / 8.6 / 4.5 | LIKELY | 6 | $1,075 | Iron & Oak | RUMOR |
| Duke Mustang .357 | Revolver | 5.7 / 4.5 / 8.0 / 5.5 | LIKELY | 6 | $1,800 | Iron & Oak | RUMOR |
| Wortham WCR1 | Revolver | 2.2 / 3.8 / 9.0 / 4.5 | LIKELY | 5 | $600 | Martez Empeños | RUMOR |
| Scorpio Akulus | Revolver (.44 Magnum) | 7.0 / 4.2 / 7.6 / 6.0 | CONFIRMED | 6 | $3,000 | Big Shots (D); Iron & Oak (M) | CONFIRMED (price) |
| Hawk & Little Morgan | Revolver (Ultimate Edition) | 5.7 / 5.4 / 7.8 / 6.0 | LIKELY | 6 | edition reward | n/a | n/a |
| Vom Feuer VF5 | SMG | 4.2 / 5.0 / 6.7 / 4.5 | LIKELY | 30 | $2,325 | Iron & Oak | RUMOR |
| Wortham W-10 | SMG | 4.2 / 3.2 / 7.5 / 3.5 | LIKELY | 20 | $825 | Big Shots | RUMOR |
| Zhang Wu Type 9 | SMG | 4.2 / 3.8 / 7.8 / 3.5 | LIKELY | 10 (looks low, unverified) | $1,100 | Iron & Oak | RUMOR |
| Deever Tech DSG | SMG | 4.2 / 4.2 / 6.9 / 4.0 | LIKELY | 30 | $1,950 | Iron & Oak | RUMOR |
| Vom Feuer VF5C | SMG | M 4.2/4.0/7.9/4.0 vs P 4.2/5.0/6.9/4.0 | RUMOR (conflict) | 30 | $2,600 | Iron & Oak | RUMOR |
| Schlamm DW-9 | SMG | 4.2 / 4.5 / 6.8 / 4.0 | LIKELY | 30 | $1,750 | Iron & Oak | RUMOR |
| BZI Vatra | SMG | 4.2 / 3.8 / 6.5 / 4.0 | LIKELY | 20 | $1,200 | Iron & Oak | RUMOR |
| ADB PD-90 | SMG | 4.2 / 4.8 / 6.6 / 4.2 | LIKELY (P spells "PD-80") | 30 | $3,350 | Iron & Oak | RUMOR |
| Fortune & Son Moreland 850 | Shotgun (pump) | 7.5 / 4.2 / 5.6 / 2.5 | LIKELY | 5 | M $700 vs V $350 (V is the "Gear Up" mission shop, maybe a mission price) | Chuck's | RUMOR (conflict) |
| Fortune & Son Gorse 425 | Shotgun | 7.5 / 3.8 / 6.2 / 2.0 | LIKELY | 5 | $850 | Big Shots | RUMOR |
| Girardi Verro | Shotgun | 7.4 / 3.9 / 6.5 / 2.0 | LIKELY | 5 | $2,700 | Iron & Oak | RUMOR |
| Girardi AZ1200 | Shotgun | 7.4 / 4.5 / 5.8 / 2.5 | LIKELY | 5 | $2,300 | Iron & Oak | RUMOR |
| Girardi Super400 | Shotgun | 7.4 / 4.2 / 5.3 / 2.5 | LIKELY | 7 | $2,825 | Iron & Oak | RUMOR |
| Shrewsbury Drifter | Shotgun | 8.0 / 4.1 / 5.0 / 2.5 | LIKELY | 2 | $1,150 | Chuck's | RUMOR |
| Shrewsbury Hobo (sawed-off) | Shotgun | 8.0 / 3.6 / 6.4 / 2.0 | LIKELY | 2 | $1,325 | Chuck's (M); Big Shots (V) | LIKELY |
| Mason & Keen Longshot | Shotgun | 8.0 / 4.1 / 5.0 / 2.5 | LIKELY | 2 | $1,425 | Iron & Oak | RUMOR |
| Mason & Keen Shortstraw | Shotgun | 8.0 / 3.6 / 6.4 / 2.0 | LIKELY | 2 | $1,625 | Iron & Oak | RUMOR |
| Goodwin Comshot 12 | Shotgun | 7.7 / 4.2 / 4.0 / 2.5 | LIKELY | 7 | $3,825 | Iron & Oak | RUMOR |
| Kozlov KVGA-12 | Shotgun (full auto) | 7.2 / 4.5 / 5.1 / 2.5 | LIKELY | 8 | $3,650 | Iron & Oak | RUMOR |
| Duke 556 | Assault rifle (5.56, full auto) | 5.0 / 6.0 / 5.8 / 6.2 | CONFIRMED | 30 | $1,450 (needs bank account) | Chuck's; Big Shots | CONFIRMED |
| Kozlov KZ-59 | Assault rifle (AK-style) | 5.4 / 5.2 / 5.2 / 6.5 | LIKELY | 30 | $1,250 | Big Shots | RUMOR |
| Kozlov Hind | Assault rifle | M 5.4/3.5/7.1/4.5 vs P 5.4/4.5/6.1/4.5 | RUMOR (conflict) | 30 | $1,700 | n/a | RUMOR |
| Hillinger Heathen | Assault rifle | 5.0 / 6.2 / 5.8 / 6.2 | LIKELY | unknown (P says 3, likely a typo) | $2,450 | Big Shots | RUMOR |
| Vom Feuer VF-G1 | Assault rifle | 5.0 / 6.2 / 5.8 / 6.5 | LIKELY | 30 | $3,700 | Iron & Oak | RUMOR |
| ADB FRA | Battle rifle | 5.8 / 5.0 / 5.3 / 6.9 | LIKELY | 20 | $2,900 | Big Shots | RUMOR |
| Hawk & Little Mediator | Tactical rifle | 4.8 / 7.8 / 5.6 / 7.0 | LIKELY | 17 | $900 | Martez Empeños | RUMOR |
| Wortham W-14 | Tactical rifle | 5.8 / 7.5 / 5.2 / 7.2 | LIKELY | 20 | $1,400 | Chuck's | RUMOR |
| Hillinger M306 | Tactical rifle | 6.2 / 7.5 / 4.8 / 7.5 | LIKELY | 20 | $2,375 | Big Shots | RUMOR |
| Hillinger M306 TMR | Tactical rifle | 6.2 / 7.8 / 5.5 / 7.5 | LIKELY | 20 | $2,550 | Iron & Oak | RUMOR |
| Wortham W-22 | Tactical rifle (.22) | P 1.5/8.0/5.8/7.0 (M lists only modded variants) | RUMOR | 15 | Hunting-inventory stores only | n/a | LIKELY ([games.gg](https://games.gg/grand-theft-auto-vi/guides/grand-theft-auto-6-secret-weapons-locations-unlocks/)) |
| Fortune & Son Laird 350 | Sniper | M 6.5/8.8/3.6/8.4 vs P 6.5/8.0/4.5/7.5 | RUMOR (conflict) | 5 | $950 | Chuck's (M); expanded (E) | CONFIRMED (M + E + V) |
| Shrewsbury SM-69 | Sniper | M 6.8/8.4/3.1/8.4 vs P 6.8/7.6/4.0/7.5 | RUMOR (conflict) | 5 | $1,850 | Iron & Oak | LIKELY |
| Shrewsbury SMS-01 | Sniper | 6.8 / 8.6 / 3.3 / 8.4 (M only) | RUMOR | unknown | $2,150, or free from Bret's 9th hunt | Iron & Oak | LIKELY |
| Fairview FF-SR | Sniper | M 8.0/8.3/2.9/8.4 vs P 8.0/7.5/3.8/7.5 | RUMOR (conflict) | 10 | $2,950 | Iron & Oak | LIKELY |
| Fairview FF-50 | Sniper (anti-materiel) | M 8.5/7.8/2.5/8.5 vs P 8.5/7.0/3.5/7.5 | RUMOR (conflict) | 5 | $3,975 | Iron & Oak | CONFIRMED |
| ADB M350 | LMG | 6.5 / 3.0 / 3.2 / 6.2 | LIKELY | 100 | $10,000 | Iron & Oak | RUMOR |
| Goodwin LMG 6 | LMG | 6.8 / 2.8 / 2.8 / 6.5 (P only) | RUMOR | 100 | unknown | unknown | n/a |
| Hillinger Boomer | Grenade launcher | 9.2 / 5.0 / 6.0 / 4.0 | LIKELY | 1 | $12,000 | expanded | CONFIRMED |
| Deever Tech GLR40 | Grenade launcher | 9.2 / 6.0 / 5.0 / 4.0 | LIKELY | 6 | $15,500 | expanded | LIKELY |
| Hauners H-AT | Rocket launcher | 9.6 / 4.5 / 3.0 / 8.0 | LIKELY (damage, Metaforge agrees); RUMOR (rest) | 1 | $16,000 | expanded | CONFIRMED |

Unique variants from shop display cases come from NiaMeowDB alone, so all are RUMOR (single fan database). Every store reportedly has at least one variant sold nowhere else (video V at 04:00), and GTABase says unique variants cannot be modified.

| Unique variant | Base | Dmg / Acc / Hnd / Rng | Price | Store |
|---|---|---|---|---|
| Mahi Nipper .38 | Nipper .38 | 2.8 / 3.0 / 9.0 / 3.0 | $1,160 | Chuck's Tackle & Shot |
| Sand Storm ES9 | ES9 | 4.2 / 5.2 / 8.4 / 4.4 | $1,470 | Big Shots |
| The Silver 1922 | Duke 1922 | 5.5 / 5.1 / 8.1 / 4.6 | $2,210 | Big Shots |
| Darknite Drifter (modded) | Drifter | 8.0 / 4.7 / 4.7 / 2.5 | $2,420 | Gellhorn Outfitters |
| Nightmare KZ-59 | KZ-59 | 5.4 / 6.3 / 4.8 / 5.9 | $2,630 | Rodgers Ranch |
| Backdoor Hobo | Hobo | 8.0 / 3.6 / 6.4 / 2.0 | $2,780 | Zenon's Pawn Shop |
| Pocketblast DSG (modded) | DSG | 4.2 / 5.2 / 5.9 / 4.4 | $2,840 | Griffin Shooting Range |
| Star Spangled 556 (modded) | Duke 556 | 5.0 / 6.6 / 5.3 / 6.2 | $3,050 | Phil's Ammu-Nation |
| Honky Tonk Mustang .357 (modded) | Mustang .357 | 5.7 / 5.0 / 7.2 / 5.9 | $3,780 | Phil's Ammu-Nation |
| Vice City Heathen (modded) | Heathen | 5.0 / 7.4 / 5.1 / 6.2 | $5,150 | Prestige Firearms |
| Bruiser Super400 | Super400 | 7.4 / 4.2 / 5.3 / 2.5 | $5,930 | Vice City Gun & Pawn |

| Free or hidden weapon | How to get it | Stats (M, * = modded) | Tag | Source |
|---|---|---|---|---|
| Assassin Nipper .38 | Derelict spy vessel, Permit Keys | 2.8/3.5/8.7/2.7* | LIKELY | [games.gg](https://games.gg/grand-theft-auto-vi/guides/grand-theft-auto-6-assassin-pistol-smuggler-shotgun-locations/) |
| Smuggler's Gorse 425 | Abandoned smuggler boat, northernmost Permit Keys island | 7.5/3.8/6.2/2.0 | LIKELY | games.gg |
| Marabunta Grande Hobo | Industrial storage building south of Hamlet | 8.0/3.6/6.4/2.0 | RUMOR | games.gg (snippet) |
| Type 9 SMG and Duke 556 | South Vice-Dale County warehouse; Type 9 right of the entrance | base stats | RUMOR | [NoobFeed](https://www.noobfeed.com/articles/gta-6-early-game-guns) |
| Kingfisher W-22 and Kingfisher's Laird 350 | Gated Kingfisher compound, Grassrivers | 1.5/8.4/5.4/6.7; 6.5/7.8/4.8/7.5* | RUMOR | fan guides |
| Hunter's Laird 350 | Conflict: abandoned motel south of Hamlet, or random encounter in western Grassrivers | 6.5/8.8/4.0/8.0* | RUMOR (conflict) | [games.gg sniper](https://games.gg/grand-theft-auto-vi/guides/grand-theft-auto-6-secret-sniper-location/) |
| Killtelligence SM-69 | Bret's first hunting quest | 6.8/8.4/2.7/8.4 | CONFIRMED (video + eGamers) | [eGamers](https://egamers.io/gta-6-weapons-guide-every-class-launcher-and-sniper-prices-and-which-ammu-nation-stores-sell-them/); [V](https://www.youtube.com/watch?v=tjsYTsPPYQE) |
| Shrewsbury SMS-01 | Bret's 9th hunting quest | 6.8/8.6/3.3/8.4 | CONFIRMED (unlock) | same |
| Tranquilizer rifle | Final mission of Kirk's Sasquatch questline | unknown | RUMOR | [GamesFuze](https://gamesfuze.com/guides/how-to-unlock-sniper-rifle-in-gta-6-sasquatch-quest/) |
| Duval Signature ES9 | Ultimate Edition, Jason's locker from Ch1 | 4.2/5.5/8.2/4.7* | LIKELY | games.gg; V 07:32 |
| Caminos Signature K17 | Ultimate Edition, given to Lucia in Ch2 | 4.0/4.5/8.4/3.8* | LIKELY | same |
| Russo's 1922 Pistol, Cold War 556 | President's bunkers | unknown | CONFIRMED | [GameRant](https://gamerant.com/gta-6-president-bunker-location-all-codes/) |
| Patriarch DRX | Underwater south of Kalaga Reservoir | unknown | LIKELY | The Big Lead |
| Black Eagle Import M306 TMR | not given | 6.2/9.5/4.1/7.5* (highest accuracy in M) | RUMOR | NiaMeowDB |

Loadout and shop rules: carry two sidearms and two long guns (LIKELY, GTABase + video); the melee and explosives slots are RUMOR, and one pre-launch source said two long guns, one pistol and one melee (RUMOR, [AllThingsHow](https://allthings.how/gta-6-weapon-system-how-the-new-loadout-limit-works/)). Snipers, launchers and reportedly LMGs and their ammo sell only at expanded stores. Some guns need a bank account (CONFIRMED, Dexerto + video). Attachments (grips, magazines, optics, muzzles, tactical, suppressors, lights, stocks) fit at Ammu-Nation; suppressors and flashlights come off in the field (LIKELY, [Insider Gaming](https://insider-gaming.com/gta-6-full-weapons-guide-types-and-how-to-buy/)). Ammo types are reported as Pistol, Shotgun, Heavy, Spear and Rockets, which conflicts with per-caliber listings. Attachment prices and ammo caps are unpublished, and no weapon balance changes have been reported.

## Vehicles: 0-10 bars, no mph, and no dealerships

GTA VI shows vehicle stats as **0-10 bars for Speed, Acceleration, Asphalt Handling, Off-Road Handling and Strength**, plus derived Road and Off-Road ratings in the hundreds. **There are no mph figures and no Braking stat in the game**, and as of Nov 21 nobody had published a measured top speed ([gtaaddict](https://gtaaddict.com/gta-6/vehicles/fastest/)). Dexerto's HVY Wastelander page matches meowdb exactly, which CONFIRMS the format ([Dexerto](https://www.dexerto.com/wikis/gta-6/vehicles/cars/off-road-vehicles/hvy-wastelander/); [meowdb](https://meowdb.com/gta6/best-cars)). meowdb's road rating formula is 20.9 x Speed + 40.7 x Accel + 37.9 x Asphalt + 7.4 (LIKELY). Hold LEFT on the D-pad while driving to see stats (LIKELY, [GTABase](https://www.gtabase.com/articles/gta-6/gta-6-fuel-system-explained-how-vehicle-refuelling-works)). Vehicle totals conflict wildly, from 94 to 641; GTABase's own page says both 641 and "around 300", and PowerPyx's tracker says 557 (277 base plus 280 Standout variants).

Rows below are from meowdb (tuning-menu values, updated Nov 22, page marked work in progress). Five rows match the timesaver.gg aggregator exactly (drawing on GTABase, IGN and nettoge), which upgrades them to CONFIRMED ([timesaver.gg, Nov 21](https://timesaver.gg/tools/gta-6/cars/fastest)). "Modded" means parts were fitted. Real-world lookalikes from The Tab are RUMOR and omitted here, because that list mixes in GTA V manufacturer names ([The Tab](https://thetab.com/2026/11/19/every-single-car-in-gta-6-and-their-real-life-equivalents-from-supercars-to-classics)).

| Vehicle | Class | Spd | Acc | Asph | Off | Str | Road | Off-road | Tag |
|---|---|---|---|---|---|---|---|---|---|
| Pegassi '96 Infernus (Modded) | Super | 8.6 | 8.4 | 6.9 | 3.6 | 3.0 | 789 | 239 | LIKELY (stock 7.1/7.3/6.5 per timesaver) |
| Pegassi Vitello | Super | 8.2 | 8.4 | 8.2 | 3.8 | 3.0 | 832 | 297 | CONFIRMED |
| Bravado Gauntlet Hellfire | Muscle | 7.8 | 7.8 | 5.7 | 3.6 | 3.0 | 705 | 240 | CONFIRMED |
| Piccia Furia | Super | 7.8 | 8.2 | 7.3 | 3.6 | 3.0 | 781 | 239 | CONFIRMED |
| Pegassi Tempesta | Super | 7.6 | 7.8 | 6.9 | 3.8 | 3.0 | 748 | 284 | CONFIRMED |
| Granforma Zorrusso | Super | 7.5 | 7.8 | 7.1 | 3.8 | 3.0 | 749 | 301 | CONFIRMED |
| Nagasaki SFB 1000 | Motorcycle | 7.1 | 8.1 | 8.1 | 2.3 | 4.0 | 796 | 121 | CONFIRMED (may share an upstream source) |
| Pfister Neon | EV sports | 7.1 | 7.4 | 5.9 | 3.9 | 3.0 | 683 | 357 | CONFIRMED (same caveat) |
| Albany V-STR | Sedan | 7.0 | 7.2 | 4.5 | 4.5 | 3.0 | 616 | 373 | LIKELY |
| Invetero Coquette D10 | Sports | 7.0 | 7.5 | 6.5 | 3.6 | 3.0 | 707 | 238 | LIKELY |
| Coil Raiden | EV | 6.7 | 7.7 | 4.7 | 4.5 | 3.0 | 636 | 445 | LIKELY |
| Declasse Vigero ZX Convertible | Muscle | 6.6 | 6.8 | 5.4 | 3.9 | 3.0 | 627 | 272 | LIKELY |
| Ocelot Jugular (Modded) | Sedan | 6.5 | 7.3 | 5.8 | 4.5 | 3.0 | 661 | 394 | LIKELY |
| Übermacht Cypher | Sports | 6.5 | 7.2 | 4.9 | 4.5 | 3.0 | 622 | 369 | LIKELY |
| Grotti Carbonizzare | Sports | 6.3 | 7.1 | 6.0 | 3.6 | 3.0 | 657 | 236 | LIKELY |
| Vapid Dominator GT | Muscle | 6.3 | 6.8 | 5.7 | 3.9 | 3.0 | 631 | 283 | LIKELY |
| Invetero Coquette | Sports | 6.1 | 6.8 | 5.5 | 3.9 | 3.0 | 621 | 272 | LIKELY |
| Benefactor Schafter V12 | Sedan | 6.0 | 6.6 | 4.5 | 4.5 | 3.0 | 571 | 376 | LIKELY |
| Buckingham Windsor Drop | Coupe | 6.0 | 6.9 | 4.7 | 4.3 | 3.0 | 590 | 366 | LIKELY |
| Pegassi Toros | SUV | 6.0 | 7.0 | 4.6 | 5.1 | 3.0 | 594 | 472 | LIKELY |
| Schyster PMP 700 | Car | 5.8 | 6.4 | 4.3 | 4.5 | 3.0 | 551 | 353 | LIKELY |
| Vapid Dominator ASP | Muscle | 5.7 | 6.2 | 4.6 | 4.4 | 3.0 | 552 | 337 | LIKELY |
| Vapid Dominator | Muscle | 5.6 | 6.0 | 4.4 | 3.9 | 3.0 | 537 | 275 | LIKELY |
| Annis '90 Elegy | Sports | 5.5 | 6.4 | 4.8 | 3.9 | 3.0 | 565 | 286 | LIKELY |
| Bravado '19 Buffalo | Muscle | 5.5 | 6.4 | 4.7 | 4.4 | 3.0 | 557 | 358 | LIKELY |
| Pfister Growler | Sports | 5.5 | 6.3 | 6.8 | 3.9 | 3.0 | 635 | 280 | LIKELY |
| Buckingham Jubilee | SUV | 5.4 | 6.1 | 4.4 | 5.1 | 3.0 | 538 | 440 | LIKELY |
| Fathom FR36 | Coupe | 5.3 | 5.8 | 4.2 | 4.5 | 3.0 | 510 | 321 | LIKELY |
| Gallivanter Baller ST-D | SUV | 5.3 | 6.4 | 4.2 | 5.0 | 3.0 | 540 | 441 | LIKELY |
| Pfister Astron | SUV | 5.3 | 6.5 | 5.1 | 4.5 | 3.0 | 576 | 352 | LIKELY |
| Dinka Chavos XS | Car | 5.2 | 5.7 | 3.9 | 4.2 | 3.0 | 497 | 315 | LIKELY |
| Maibatsu '97 Penumbra FF | Tuner | 5.1 | 5.5 | 4.4 | 4.3 | 3.0 | 504 | 314 | LIKELY |
| Vapid '65 Dominator | Classic muscle | 5.1 | 5.6 | 3.7 | 4.5 | 3.0 | 481 | 343 | LIKELY |
| '67 Vapid Dominator Buggy | Off-road | 5.0 | 6.1 | 3.5 | 6.7 | 3.0 | 493 | 672 | LIKELY |
| Declasse '72 Tulip | Muscle | 5.0 | 4.8 | 3.3 | 3.9 | 3.0 | 434 | 260 | LIKELY |
| Dinka Sugoi | Hatch | 5.0 | 5.8 | 4.3 | 4.3 | 3.0 | 511 | 317 | LIKELY |
| Karin '98 Feroci | Sedan | 5.0 | 5.4 | 4.0 | 4.5 | 3.0 | 487 | 336 | LIKELY |
| Emperor Sultan | Sedan | 4.9 | 6.1 | 4.4 | 4.5 | 3.0 | 528 | 352 | LIKELY |
| Obey Tailgater S | Sedan | 4.8 | 5.9 | 4.4 | 4.5 | 3.0 | 516 | 344 | LIKELY |
| Benefactor Dubsta | SUV | 4.7 | 5.5 | 3.9 | 5.0 | 3.0 | 479 | 398 | LIKELY |
| Albany Cavalcade XL | SUV | 4.7 | 5.8 | 4.2 | 5.0 | 3.0 | 503 | 409 | LIKELY |
| Vapid Ganado | Truck | 4.7 | 5.3 | 3.6 | 4.5 | 3.0 | 458 | 330 | LIKELY |
| Canis Mesa | Off-road SUV | 4.4 | 5.4 | 3.2 | 6.7 | 3.0 | 441 | 623 | LIKELY |
| Vapid Caracara 4X4 | Off-road truck | 4.2 | 5.1 | 3.3 | 6.7 | 3.0 | 428 | 611 | LIKELY |
| Karin '84 Rebel (Modded) | Truck | 3.9 | 4.4 | 3.5 | 5.9 | 5.7 | 401 | 473 | LIKELY |
| Maibatsu Sanchez | Dirt bike | 3.9 | 5.9 | 5.2 | 7.7 | 4.0 | 524 | 715 | LIKELY |
| Maibatsu Manchez | Dirt bike | 3.9 | 5.8 | 5.2 | 7.7 | 4.0 | 520 | 711 | LIKELY |
| BF '77 Bandito (Modded) | Off-road | 3.7 | 6.3 | 3.5 | 7.6 | 3.5 | 471 | 726 | LIKELY |
| Mer-Can Outlaw | UTV | 3.3 | 5.8 | 3.2 | 8.4 | 3.5 | 433 | 727 | LIKELY |
| HVY Wastelander | Off-road truck | 3.1 | 3.8 | 2.6 | 7.0 | 3.5 | 328 | 535 | CONFIRMED (Dexerto match) |
| Mer-Can Blast | Special | 2.0 | 3.4 | 2.5 | 6.5 | 3.5 | 283 | 516 | LIKELY |
| Bravado Swamp Blaster | Airboat-type | 1.7 | 2.9 | 2.1 | 5.9 | 3.5 | 240 | 459 | LIKELY |

Extra rows from timesaver.gg only (Speed / Accel / Handling): Progen Emerus 8.3/8.3/8.4 (LIKELY), Pfister Comet S2 7.7/8.0/7.6 (RUMOR, single source), Grotti Itali RSX 7.5/8.1/7.0 (LIKELY), Principe Alvino V1 6.9/7.9/7.9 (RUMOR), Nagasaki Carbon RS 6.7/7.7/7.6 (LIKELY). A stock Truffade Thrax at 8.7 Speed is RUMOR ([tech2geek](https://www.tech2geek.net/gta-6-fastest-cars-top-10-vehicles-ranked-by-speed/)). The Infernus gap between stock 7.1 and modded 8.6 shows tuning raises the Speed bar a lot, so the app must store stock and modded values separately. No boat or aircraft stats exist in any source.

### How you actually get cars

There are **no conventional dealerships** (CONFIRMED, several guides, [GameRant, Nov 21](https://gamerant.com/gta-6-store-cars-garage-little-boxes/)). You steal a car without a tracker, then **register** it with Moses in Port Gellhorn (from Chapter 2) or at a Pay 'n' Spray (from Chapter 3) (CONFIRMED). Registration reportedly starts free and tops $20,000 for high-end cars (LIKELY/RUMOR, [Game8](https://game8.co/games/GTA-6/archives/639287)). Exceptions are Status Auto Imports in Bayside during the Chapter 4 mission "Company Cars" and Wyman's Classic Cars (Ultimate Edition) (LIKELY). Fuel and EV charge are real systems: you can push an empty car, and gas stations only fix light damage (CONFIRMED, GTABase + [Beebom](https://beebom.com/how-to-refuel-cars-bikes-in-gta-6/)). The widely shared "$32 refuel / $2,429 repair" numbers come from old leaked footage (RUMOR). Personal vehicles are reportedly impounded at the end of Chapter 2 and recoverable through Scooter Bros (LIKELY, several ResetEra posters).

Randy's Wish List, unlocked by the Chapter 3 mission "Clonin' Keys, Makin' GS" (CONFIRMED, video + aggregator), is the structured route to the fastest cars. Payout is $30,000+ (PowerPyx) or $35,000+ (GTABase/FandomWire) per car, reduced by damage (amount LIKELY, condition rule CONFIRMED). The list length is unresolved at 15, 16, 18 or 22 cars. Finishing it earns "Supply & Demand" ([timesaver.gg](https://timesaver.gg/tools/gta-6/money/randy-wish-list); [Push Square](https://www.pushsquare.com/guides/gta-6-randys-wish-list-vehicle-locations); [Perfect Score video](https://www.youtube.com/watch?v=doFaJV-CNLw)).

| Wish List car | Location / method (Push Square unless noted) | Membership tag |
|---|---|---|
| Pegassi Vitello | Villa on Flamingo Pkwy, Waning Sands (east of Belville); Clone Key at nearest garage | CONFIRMED |
| Bravado Banshee | Outside Sweetbay Inn, East Buckley Dr, Capri (about 3 AM) | CONFIRMED |
| Ascot Paragon | Outside The Banana Hole bar, Shore Dr, Vice Beach (about 6 PM); has a tracker | CONFIRMED |
| Piccia Furia | Mansion on Palladia Ln, Peacock Estates; over the hedge, through the garage | CONFIRMED |
| Bravado Gauntlet Hellfire | Back of M7 junkyard east of Boone Speedway, off Galerina St, Hamlet | CONFIRMED (location too) |
| Pegassi '96 Infernus | Crosstown Police Station parking, NW 9th St, level 7 | CONFIRMED |
| Pegassi Tempesta | Random event on NE 3rd St (owner vs repo man) | CONFIRMED |
| Mamba GT | Leaf Links mansion, Vice Beach; key in a bowl behind the sofa; via "¡Dale Mamba!" | LIKELY |
| Granforma Zorrusso, Invetero Coquette D10 | Mission-based | LIKELY |
| Buckingham Windsor Drop | Status Auto Imports (Bayside), Capri, Y Hotel, Lake Tallaloko | CONFIRMED |
| Ocelot Jugular | Belville garage north of Druthers State Bank; The Vault nightclub | CONFIRMED |
| Buckingham Jubilee | Driveways in Belville, Rialto Islands, Starfish Island | CONFIRMED |
| Pegassi Toros | Pegassi Residences, Paradise Wines Vineyard Bar, Capri | CONFIRMED |
| Pfister Growler | Northern Capri, Vice Beach car parks | CONFIRMED |
| Grotti Itali RSX, Übermacht Cypher, Grotti Carbonizzare, Gallivanter Baller ST-D, Benefactor Dubsta, Pfister Neon | not given | LIKELY (Perfect Score video only) |
| Truffade Thrax (final job "Thrax Mansion") | Ferry Waxman Island to Dalton Island, car park behind Dalton Island Club, deliver to Bayside Drive Garage; about $18,000; cannot keep it | CONFIRMED (job); LIKELY (payout) ([Cultured Vultures, Nov 19](https://culturedvultures.com/gta-6-where-to-find-the-truffade-thrax/)) |

Rare standouts worth tracking as RUMOR until pinned: Royal Ruby Emerus (Vespucci Island garage, existence CONFIRMED, spot conflicts), Bloodbath Phoenix (Slator Towing, Salton), '97 Penumbra FF (Vespucci Island, existence CONFIRMED), Charred Toros (gold, Casanova Island), and a GTA+ bonus "Venturas BLVD Elegy" ([EGW](https://egamersworld.com/blog/gta-6-standout-vehicles-all-rare-car-types-and-whe-dha39M0YT8); [Detonated](https://detonated.com/gta-6-best-car-locations/); [YouTube lP_qmubhm1E](https://www.youtube.com/watch?v=lP_qmubhm1E)). Aircraft: Brian's seaplane at the end of "Gone Fishing", unguarded airstrips and helipads spawn aircraft with no wanted level, and military aircraft at Mile Zero Air Station bring 5 stars (CONFIRMED, [PowerPyx](https://www.powerpyx.com/gta-6-helicopter-plane-locations/) + TheGamer).

## Missions, trophies, activities and properties

### Story missions: a Prologue plus five chapters

The story runs Prologue plus Chapters 1-5, with Chapter 1 titled "Just Like Paradise" (CONFIRMED, PowerPyx + Fandom). PowerPyx lists **149 entries** (Prologue 1, Ch1 34, Ch2 27, Ch3 38, Ch4 39, Ch5 10), about 30 optional, with heist setups counted separately; Beebom counts Ch1 as 25 (LIKELY, [PowerPyx walkthrough](https://www.powerpyx.com/gta-6-full-walkthrough-all-missions/)). There are **no gold medals, no mission replay, no difficulty settings and no New Game+** (LIKELY, PowerPyx + [GTABase](https://www.gtabase.com/gta-6/achievements)). Story length is about 60-80 hours. Two walkthrough videos' chapter markers independently match PowerPyx and Fandom for the Ch1-Ch3 mission names, upgrading those to CONFIRMED; Ch4 and Ch5 names remain LIKELY except the final mission, "The End of the Road", which is CONFIRMED ([YouTube ou4vff0wxhM, Nov 19](https://www.youtube.com/watch?v=ou4vff0wxhM); [YouTube 9DFDdPQjraU, Nov 21](https://www.youtube.com/watch?v=9DFDdPQjraU); [KeenGamer](https://www.keengamer.com/articles/guides/gta-6-walkthrough-all-chapters-and-story-missions-in-order/)). Order is flexible: both videos play "Unwanted Attention" before "Lab Fees", while PowerPyx lists them the other way.

| Chapter | Missions in PowerPyx order ("Opt" = optional; J/L = character lock) | Tag |
|---|---|---|
| Prologue | Prologue | CONFIRMED |
| 1 "Just Like Paradise" | Gone Fishing; Gear Up; Lab Fees; Just a Scratch; Unwanted Attention; Pipework; Opt Get Shirley's Rum (missable); Opt Steal the Scooter (missable); Hey Arnold!; Island Dreams; Feng Shui; Opt Pick Up/Drop Off Groceries; Opt Buy Flowers; Opt Buy Lucia a Necklace; Opt Get The Chop; Opt Get Lucia's Clothes; Coming Home; Clean Up After Donnie; Buck Me; Down to Earth; Deposit Cash Into BuckMe; Save for the Future; Opt Find the Lost Drugs; Day Release; Opt Clock Out; Clear Skies; Building a Life; Swamped; Don Gone; Donnie's Lost Drugs; Recalibration; Tourist Trap; Home Sweet Home; Discharge Time | Main names CONFIRMED (video + wiki + guide); optional LIKELY |
| 2 ("Paradise Lost" title card in video) | What's in the Bag?; Take Care of Jason; Overnight Charges; Just Moved In; Girl's Trip; Opt Pick Up A Gun; Moses; New Look; How Do I Look?; Painkiller Supplier; Ambulance Chaser; Opt Check Out McKittrick Farm; Behind on Payments; Slam Dunk; Opt Collect Chemicals for Kyle; Daily Driver; Breakfast Run; Coffee Break; Opt Thrillbillies; Opt Twist Wrist, Smash, Grab; Opt Hit Avery Pawn; Opt Hit Kingpin Bowling; Opt Impounded Vehicle; Prepare for Vice City; Opt Veteran Hunted (J); Afternoon Delight; Checking Out | Video-matched names CONFIRMED; rest LIKELY |
| 3 | Welcome to Vice City; Dealer's Choice (J); Dubious Provenance; Mami Knows Best (L); Opt Get Your Wheels; Opt Join a Street Race; Here, Kitty Kitty (J); Send Money to Lorena; Encrypted Hard Drive; Boobie Time (J); Opt Buddy?; Meet the Heders; Yasmani's Jewelry Jobs; Opt Bumper to Bumper (J); Car Service (L); Send More Money to Lorena; Top Billing; First Impressions; Crosstown Traffic; Credit Check; Clonin' Keys, Makin' GS; Ride Or Die (J); Raul's Next Job; Opt Race Against Yago (missable); Cartel Heist: Sinfrontera National Bank, Security Expert, Heist Planning, Company Property, Safe Word, The Missing Link (L), Hidden Charges, The Cartel Heist; interleaved: Caught Slipping; Opt Mall Rats; Opt Brother To Brother; Cooties; Bricked Up; South Leonida Real Estate (L) | Video-matched names CONFIRMED; rest LIKELY |
| 4 | Ocean Beach; Another Life; Pool Day; Company Cars; Lawyer Up; Heavy Lifting; Opt It's A Date!; Party Hard; Pay Abe's Fee; Photo/Shoot; Opt Bad Driver!; Opt Attend Eddie Acosta's Party; VCIA Takedown: Making Gainz, Blood Sweat and Gear, Too Much Baggage, Amateur Hour, Call Nate, Cash Injections, Dirty Work, Nate Will Be in Touch, Power Play, Close Surveillance, Delivery Method, Team Building, Fully Catered, Heist Plans in Place, VCIA Takedown; interleaved: Watch It; Adventures in Babysitting; Rafa's Kidnapping; Fresh Evidence; Child's Play; Opt This is a Free Call From… (L, missable); Headliners; Tie Up Loose Ends; Opt That's Where The Money Is…; Call Valentina Back; Sunset; Starting From Zero | LIKELY |
| 5 | Bird in the Hand; Taking Liberties; Doggie Bag; VC Baby; Operation Savage Glory; Honest Abe; Unfinished Business; Pay Abe's Fee (also in Ch4, dedupe); Protective Custody; The End of the Road (final) | LIKELY; final mission CONFIRMED |

Missables: "Get Shirley's Rum" and "Steal the Scooter" (Ch1), "Race Against Yago" (Ch3, timed; one guide says Ch1, conflict) and "This is a Free Call From…" / "Pick Up Shayna" (Ch4, Lucia). An hourglass map icon marks timed missions, and missing them affects neither trophies nor 100% (LIKELY, [PowerPyx](https://www.powerpyx.com/gta-6-full-walkthrough-all-missions/); [cutscenewire](https://cutscenewire.com/games/gta-6/trophies/gta-6-missable-trophies-collectibles-and-content/)). No source gives per-mission cash rewards.

Strangers and Freaks side quests (LIKELY, [PowerPyx, Nov 18](https://www.powerpyx.com/gta-6-all-strangers-freaks-side-missions/)): any chapter, Dr. Merle "The Final Flush" (Frank's Waffles) and Freddie "Retest Freddie's Defenses"; Ch1, Shirley (missable), Kenton (dive sites), Cal ("Catch a Bigger Fish"), Kirk (Skunk Ape, Tree Effigies, Mr. Mangrove; night only, Mr. Mangrove Lucia-only); Ch2, Kyle (McKittrick Farm, "Buddy?"), Moses (steal vehicles), Bret Vogel ("Veteran Hunted" Jason-only; hunting decks), Billy (Thrillbillies Mud Club, Mall Rats, The Impaler, "Hometown Heroes"); Ch3, Yago (races), Andy (Cellerica, Lucia-only, "Puff Puff Pass"), Yasmani (jewelry, ATM, payday loan jobs, security van), Randy (Wish List), Tyrone (Kitty Litter Labs), Dunk (robbery tips), Papa Audacity ("The Unknown Stuntman"); Ch4, Eddie Acosta, Pilot Pete (Jason-only), Shayna (Lucia-only, missable). Eight strands count toward the Strangers and Freaks trophy, and follow-ups can take weeks of in-game time to appear.

### Trophies: 55 total, about 200 hours to Platinum

There are **55 trophies: 1 Platinum, 2 Gold, 6 Silver, 46 Bronze**, and 55 achievements worth 1,000G on Xbox with a "Mythic" counterpart to the Platinum (CONFIRMED, [PowerPyx](https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/) + GTABase + [GGRecon, Nov 19](https://www.ggrecon.com/articles/gta-6-trophies-achievements-list-platinum/)). All are single-player with no online or DLC trophies. Difficulty is about 4/10 and the Platinum takes about 200 hours in one playthrough (LIKELY). Hidden count conflicts: **28 hidden** per Insider Gaming and GGRecon versus **2** per KeenGamer. The name list is CONFIRMED at the name level by PowerPyx, GTABase and Game-Checklists ([Game-Checklists, updated Nov 22](https://game-checklists.com/gta6/achievements-checklist/)). Using cheats blocks trophies for that session.

| Trophy | Grade | Requirement (paraphrased) | Category | Tag |
|---|---|---|---|---|
| Vice Got A Price! | Platinum | All other trophies | Platinum | CONFIRMED (name) |
| A Long Road | Gold | 100% completion (hardest trophy) | Completion | CONFIRMED |
| You Gotta Know When to Get Off | Gold | Final mission (SPOILER) | Story | LIKELY |
| Cunning Stunts | Silver | 250 stunts | Activity | LIKELY |
| The Shootist | Silver | Gold in every shooting range challenge | Activity | LIKELY |
| Strangers & Freaks | Silver | 8 questline strands | Character quest | LIKELY |
| Don't Touch My Deck | Silver | 3 card sets | Collectible | CONFIRMED |
| You WAiNKer! | Silver | 100 WAiNK scans | Collectible | LIKELY |
| Maximum Withdrawal | Silver | Rob 5 bank vaults | Crime | LIKELY |
| Just Like Paradise | Bronze | First Ch1 mission | Story | LIKELY |
| Paradise Lost | Bronze | Finish Ch1 | Story | LIKELY |
| T**s Ass Drug Money | Bronze | Ch2 | Story | LIKELY |
| Vice City, Baby! | Bronze | Ch3 | Story | LIKELY |
| Top Of The World, Ma | Bronze | Ch4 | Story | LIKELY |
| Trust | Bronze | Breakfast Run | Story | LIKELY |
| Break the Bank | Bronze | The Cartel Heist | Story | LIKELY |
| Family Matters | Bronze | Child's Play | Story | LIKELY |
| DWNFALL | Bronze | Headliners | Story | LIKELY |
| Hi-Jacked | Bronze | VCIA Takedown | Story | LIKELY |
| Snow Storm | Bronze | Operation Savage Glory | Story | LIKELY |
| Master of None | Bronze | Try all 9 activity types | Activity | CONFIRMED |
| Top Fun | Bronze | Win a drone race at every location | Activity | LIKELY |
| Earn Cash, Not Kudos | Bronze | Win 20 different races | Activity | CONFIRMED |
| Baited My Tackle | Bronze | Beat Cal at fishing | Activity | LIKELY |
| Stick Fiddler | Bronze | Finish all levels of one arcade game | Activity | LIKELY |
| One Last Thing | Bronze | 50 challenges | Activity | LIKELY |
| Road to Rehabilitation | Bronze | Andy's quest ("Puff Puff Pass") | Character quest | LIKELY |
| This Was No Boat Accident | Bronze | Kenton's quest | Character quest | LIKELY |
| The Lone Rider | Bronze | Billy's quest ("Hometown Heroes") | Character quest | LIKELY |
| Supply & Demand | Bronze | Randy's Wish List | Character quest | CONFIRMED (name) |
| Spin On This! | Bronze | Tyrone's quest | Character quest | LIKELY |
| Fair Game | Bronze | Unique animal for Bret | Character quest | LIKELY |
| Positive Mental Attitude | Bronze | Meditate at all 18 spots; possibly missable (see conflict) | Collectible | CONFIRMED (name) |
| Whip It Good | Bronze | Discover 100 vehicles | Collectible | CONFIRMED (name) |
| The Goodtime State | Bronze | Clear fog from the whole map | Collectible | LIKELY |
| Hot Together | Bronze | Escape 4 stars with your partner | Crime | LIKELY |
| Retail Therapy | Bronze | 3 shop robberies in a row without losing the wanted level | Crime | LIKELY |
| Sneakthief | Bronze | Undetected jewelry store robbery | Crime | LIKELY |
| A Classic Blitz Play | Bronze | Rob an armored truck | Crime | LIKELY |
| Pest Control | Bronze | One illegal operation per gang (9 gangs) | Crime | LIKELY |
| Let's Go Bowling | Bronze | Kingpin Bowling valuables | Crime | LIKELY |
| Bad Luck, I Guess | Bronze | Rob Payday Loans again and escape on foot | Crime | LIKELY |
| Dime on the Dollar | Bronze | Launder $250k in marked bills | Crime | LIKELY |
| Actions Speak Louder | Bronze | 500 Criminal Profile actions | Crime | LIKELY |
| Gunslinger | Bronze | 5 kills in one Combat Focus | Misc | LIKELY |
| Catch Me If You Can | Bronze | Steal a passenger plane from VCIA | Misc | LIKELY |
| Challenging Tank | Bronze | Requirement not captured | Misc | LIKELY (name only) |
| In The Beginning… | Bronze | Cocktail at Ocean Beach | Misc | LIKELY |
| Capital Offense | Bronze | Drive a specific car through a showroom window | Misc | LIKELY |
| Personal Best | Bronze | Max Strength for both characters (Push Square says reach "Overweight", conflict) | Misc | LIKELY (disputed) |
| The Truth Is Out There | Bronze | UFO easter egg | Misc | LIKELY |
| Ten Pin | Bronze | Kick 10 pedestrians in a melee drive-by within 60 seconds | Misc | LIKELY |
| Treat Yo Self | Bronze | Spend $100k in shops | Misc | LIKELY |
| Little Boxes | Bronze | Buy all 8 garages | Misc | CONFIRMED (name) |
| On the Spot | Bronze | Register 10 vehicles with Scooter Bros | Misc | CONFIRMED (name) |

Grades marked Bronze are inferred from the 1P/2G/6S/46B split: the six Silvers and two Golds are named in the notes, so the remaining 46 must be Bronze. Missable dispute on Positive Mental Attitude: Game-Checklists said on Nov 21 it is "no longer considered missable", while PowerPyx and GTABase still say it may be tied to a Chapter 1 meditation at Jason's house (GTABase calls it Lucia's balcony). Safe advice: do that meditation anyway. Rarity percentages could not be collected because TrueAchievements, PlayStationTrophies and PSNProfiles blocked access.

### Properties, garages and shops

Safehouses come from the story and are not bought. There are **8 buyable garages** (trophy "Little Boxes") sold through the Vice City Real Estate app, which unlocks in the Chapter 2 mission "Daily Driver" (CONFIRMED). Each garage holds one car. The price conflict between guides resolves neatly: **every GTABase price is exactly 80% of GameRant's**, and GameRant says buying all eight costs $200,000, or $160,000 with the 20% BuckMe Gold discount (which needs a $100k deposit). So GTABase is quoting discounted prices and GameRant list prices. That is my inference from the arithmetic, not a stated fact, but it fits every row ([GameRant](https://gamerant.com/gta-6-store-cars-garage-little-boxes/); [GTABase](https://www.gtabase.com/gta-6/articles/how-to-unlock-garages-in-gta-6); [Mobalytics](https://mobalytics.gg/gamebase/guides/grand-theft-auto-6-garages-locations-prices)). No business ownership, passive income or stock market is confirmed in story mode.

| Garage | List price (GameRant, Mobalytics) | GTABase price (= 80%) | Unlock | Tag |
|---|---|---|---|---|
| Mitchell Auto Center | $5,000 | $4,000 | After "Daily Driver" | LIKELY |
| Persistence Road | $9,500 | $7,600 | | LIKELY |
| 7th Avenue | $15,000 | $12,000 | | LIKELY |
| Store 'N' Bolt | $21,000 | $16,800 | After "Dubious Provenance" (Ch3) | LIKELY |
| Wyatt Motors | $27,000 | $21,600 | | LIKELY |
| Vela Rota Drive | $30,000 | $24,000 | | LIKELY |
| Bonita Court | $42,500 | $34,000 | | LIKELY |
| Atlantic Court | $50,000 | $40,000 | | LIKELY |
| Port Gellhorn Station | Free | Free | "Daily Driver" (Ch2) | LIKELY |
| Thompson Court | Free | Free | "Company Cars" (Ch4) | LIKELY |
| NE 15th Street | Free | Free | "Operation Savage Glory" (Ch5) | LIKELY |
| Pegassi Residences | Free | Free | Ch5 (GTABase); unlock not listed (GameRant) | LIKELY |
| Paradise Garage | Free | Free | Ultimate Edition | LIKELY |
| Shore Court | Free | Free | Pre-order bonus | LIKELY |
| GTA+ Crosstown | Free | Free | GTA+ | LIKELY |

Mod shops (LIKELY, [GTA Boss, Nov 20](https://www.gtaboss.gg/gta-6/guides/gta-6-car-customization)): Coastal Auto Care (retro, early), Wasteland Off-Road, Dirt Merchants (motorcycles), Rideout Customs and One-Eyed Willie's (both Ultimate Edition). Example prices include Ganado Engine Stage 1 $900, Cliffhanger Off-Road Build $2,055 / $7,445 / $13,305, Remove Livery $50 and Restore Finish $185. Other Ultimate-only shops reportedly include Electric Fang Tattoo, Sara's Unisex Salon and Stock 305; regular tattoo parlors include The Inked Mermaid (Key Lento) and Cross My Heart Tattoos (Vice City) (LIKELY/partly RUMOR, [Gfinity](https://www.gfinityesports.com/article/gta-6-in-game-stores-are-locked-behind-ultimate-edition)). Clothing, haircut and tattoo prices are unpublished.

## Money, cheats and exploits, ranked by how sure we are

Money comes from crime. The best-supported progression is Chapter 1 hidden stashes, then Moses car thefts and criminal interceptions in Chapter 2, Yasmani's jewelry and ATM jobs in Chapter 3, and bank vaults and heists late game. Most dollar figures beyond Insider Gaming's $6,000 card are fan-site estimates and should display as such. BuckMe pays for anything over $1,000, and money put in "family savings" can never be withdrawn but raises the checking limit (LIKELY, [PowerPyx tips](https://www.powerpyx.com/gta-6-tips-tricks/)). Collectibles and vehicles can be sold for income, since cheat unlocks reference "$250,000 from collectible sales" and "$500,000 from vehicle sales" ([VICE, Nov 19](https://www.vice.com/en/article/gta-6-cheat-codes-list/)). Fences buy narcotics, jewelry and marked bills; Yasmani in Little Cuba takes jewelry and marked bills, Tyrone takes narcotics ([Red Bull](https://www.redbull.com/int-en/gta-6-beginners-guide)).

| Method | When | Reported payout | Tag | Source |
|---|---|---|---|---|
| South Vice-Dale warehouse baseball card | Ch1 | $6,000 (likely best single item in first 12-16 h) | LIKELY | [Insider Gaming](https://insider-gaming.com/gta-6-early-game-locations-make-money/) |
| Manatee Motel, stilt house, Three Sheets Liquor | Ch1 | cash, amounts not stated | LIKELY | Insider Gaming |
| Barn respawn loop (see Exploits) | from Ch2 advised | $8,000-$11,000 per run; LADbible says about $10k per 10 minutes (about $60k/hr by my arithmetic) | CONFIRMED (exists) | [TweakTown, Nov 22](https://www.tweaktown.com/news/114814/gta-6-already-has-an-infinite-money-glitch-but-many-players-are-skipping-it/index.html); [Beebom](https://beebom.com/gta-6-unlimited-money-glitch/); [LADbible, Nov 21](https://www.ladbible.com/entertainment/gaming/gta-6-infinite-money-glitch-jason-994211-20261121) |
| Steal cars for Moses | Ch2+ | $1,000-$20,000 per car; one video shows $20,000+ from 4 cars | CONFIRMED (activity); LIKELY (amount) | [PowerPyx S&F](https://www.powerpyx.com/gta-6-all-strangers-freaks-side-missions/); [YouTube 5zym0IC44UU](https://www.youtube.com/watch?v=5zym0IC44UU) |
| Gang Operations | early | not stated; called a good early earner | LIKELY | [PowerPyx tips](https://www.powerpyx.com/gta-6-tips-tricks/) |
| Store robberies | mid Ch3+ | bag capped at $3,200 (RUMOR) | LIKELY (good earner) | PowerPyx tips; [meowdb](https://meowdb.com/gta6/glitches) |
| Stick-ups | any | pay poorly | LIKELY | PowerPyx tips |
| Randy's Wish List | Ch3+ | $30,000+ or $35,000+ per car | LIKELY | [timesaver.gg](https://timesaver.gg/tools/gta-6/money/randy-wish-list) |
| Jewelry stores | Ch3+ | $10,000-$25,000 | RUMOR | [gta6heists.com](https://www.gta6heists.com/money) |
| Large bank vault | end of Ch4+ | up to $205,000 (about 5 min for experienced runs, RUMOR) | LIKELY (PowerPyx) | [PowerPyx 100%](https://www.powerpyx.com/gta-6-100-completion-checklist-guide/) |
| Tracker car to Pay 'n' Spray | any | about $2,500+ | LIKELY | PowerPyx 100% |
| Ambrosia Raceway derby | any | $3,800-$6,300 per win | RUMOR | [leonidaverse](https://leonidaverse.com/en/codex/gta-6-money) |
| Street race / dive tour / perfect hunt | any | $3,000 / $400 / $500 | RUMOR | gta6heists.com |
| Story heists | story | Cartel Heist $150,000; VCIA $250,000; Coast Guard $50,000 | RUMOR; GrindMap says no outlet has published payouts (conflict) | [gta6heists.com](https://www.gta6heists.com/heists); [GrindMap](https://grindmap.com/guides/gta-6-heists-money-guide) |
| Van storage "$500k/hour" | any | creator claim | RUMOR | [YouTube ZrtuF9Gx9Bk](https://www.youtube.com/watch?v=ZrtuF9Gx9Bk); [moneymeta.gg](https://moneymeta.gg/money/) |
| "1 million / 5 million per hour" glitches | any | clickbait | RUMOR | [YouTube U7iUvczxwcQ](https://www.youtube.com/watch?v=U7iUvczxwcQ) |

Chapter 1 cash has a catch: forum posters say not to keep cash at home in Act 1, but to deposit it or retrieve your stash after Chapter 1, which likely explains the rumor that Chapter 1 money "doesn't carry over" (LIKELY, [ResetEra](https://www.resetera.com/threads/gta-vi-tips-and-tricks-thread-mark-spoilers-or-keep-them-vague.1693481/)). Any "$412k/hr" style tables are modeled from pre-release material and should be excluded.

### Cheats: unlocked by challenges, entered on the phone

Cheats must be **unlocked** before they work; the tracker reports **61** (VICE says 61 but tabulates 59; Fandomwire claims no sequences are found yet, which conflicts). With the phone open (D-pad Up), hold **L1+R1 (PS5) or LB+RB (Xbox)** and enter the arrows; the arrows are the same on both consoles. Some guides word it as "hold L1 and press R1". Using a cheat disables saving and trophies for that session, and the $250,000 cheat money does not carry into your save ([VICE, Nov 19](https://www.vice.com/en/article/gta-6-cheat-codes-list/); [Rare Thief](https://rarethief.com/all-gta-vi-cheat-codes/); [Gamer Tweak](https://gamertweak.com/cheat-codes-gta-6/)).

| Cheat | Unlock condition | D-pad sequence | Tag |
|---|---|---|---|
| $250,000 | Complete campaign | Up, Right, Down, Left, Up, Left, Down, Right | CONFIRMED |
| Unlimited Focus | Complete campaign | Down, Up, Up, Down, Up, Down, Up, Down, Up, Right | CONFIRMED |
| Body Armor | 100 workouts | Down, Up, Left, Up, Up, Up, Up, Up, Down, Down | CONFIRMED |
| Attack Force | Complete campaign | Down, Up, Left, Left, Right, Down, Down, Up, Down | CONFIRMED ([Digitaloft](https://digitaloft.net/game/gta-vi/guide/gta-6-cheat-codes-ps5-xbox-complete-list-2026/)) |
| Max Ammo | 25 range medals bronze+ | Down, Up, Right, Down, Left, Left, Up, Up, Down, Left | LIKELY |
| Infinite Ammo | 25 range medals silver+ | Down, Up, Right, Down, Left, Left, Up, Down, Down, Down | LIKELY |
| No Reload | 25 gold range medals | Down, Up, Right, Down, Left, Left, Up, Down, Down, Up | LIKELY |
| Raise Heat Level | Escape 3 stars 25 times | Left, Down, Right, Down, Up, Down, Up | LIKELY |
| Raise Wanted Level | Escape 3 stars 50 times | Left, Down, Right, Down, Up, Right, Up | LIKELY |
| Exploding Balls | Explosive damage to 20 enemies | Down, Up, Left, Left, Right, Down, Down, Up, Right | LIKELY |
| Vehicle Force | Kill 25 enemies with a vehicle | Down, Up, Left, Left, Right, Down, Left, Up, Down | LIKELY |
| HVY Bulldozer | Discover it (Progress menu) | Left, Up, Right, Down, Left, Right, Right, Down | LIKELY |
| MTL Pumper fire truck | Discover it | Left, Up, Right, Down, Left, Right, Right, Up | LIKELY |
| Maibatsu Boomazoom | 5 Shopping challenges | Left, Up, Right, Down, Left, Left, Up, Left | LIKELY |
| Cycle Weather | Complete campaign | Down, Right, Up, Down, Right, Up, Right | LIKELY |
| Cataclysm filter | Discover Martha's Vamos | Down, Down, Up, Right, Right, Up, Left, Left, Right, Right | LIKELY |
| Dollhouse filter | 8 hours with partner | Down, Down, Up, Right, Right, Up, Left, Left, Down, Right | LIKELY |
| Faded Glory filter | Rob 50 stores with partner | Down, Down, Up, Right, Right, Up, Left, Left, Left, Right | LIKELY |

Unlock conditions known but sequences still missing (LIKELY, VICE): Drunk ($2,500 on alcohol), No Fall Damage (20 freefalls of 40 ft), Parachute (50 skydives or BASE jumps of 300+ ft), Repair Vehicle (10 wins each at Gellhorn Raceway, Thrillbilly Mud Club and Boone Speedway), Unlimited Nitrous (50 stunt jumps), All Explosive Weapons (100 grenades), Exploding Bottles (100 Molotovs), Move Time Forward (10 watches), Pause Time (20 watches), plus Explosive Shotgun, Hauners H-AT, Incendiary Ammo, about 17 vehicle spawns (including Rhino Tank, Hauners P-996 Lazer, Inflatable Flamingo, Progen Emerus, Truffade Thrax) and 13 more screen filters. About 40 sequences remain undiscovered. No PC keyboard method exists yet, and no phone-number cheats are documented.

### Exploits and glitches (patch status checked Nov 22, 2026)

No post-launch title update had shipped as of Nov 22, so every exploit below is listed as unpatched. Single-player exploits carry no ban risk, but Rockstar historically patches economy exploits, as with GTA Online's Salvage Yard glitch in Feb 2024 ([Sportskeeda](https://www.sportskeeda.com/gta/news-salvage-yard-money-glitch-patched-gta-online-background-update-report)).

| Exploit | Platform | How it works | Status | Tag | Source |
|---|---|---|---|---|---|
| Barn respawning loot | All | Red barn warehouse NE/E of Hamlet, South Vice-Dale County: loot the stash bags into the trunk, drive away and back (or save and reload), loot respawns, fence it (e.g. Brian's Lockup). Some cash later becomes "restricted" in the story | Unpatched | CONFIRMED (exists); games.gg dissents | [TweakTown](https://www.tweaktown.com/news/114814/gta-6-already-has-an-infinite-money-glitch-but-many-players-are-skipping-it/index.html); [Beebom](https://beebom.com/gta-6-unlimited-money-glitch/); [games.gg](https://games.gg/grand-theft-auto-vi/guides/grand-theft-auto-6-money-glitch-what-works-and-what-to-avoid/) |
| First-person free camera | PS5 only | Set touchpad to camera in Settings > Controller; in a vehicle, open the phone and rapidly press Circle and touchpad; camera locks in first person, undo by reloading | Unpatched | CONFIRMED | [Dexerto, Nov 19](https://dexerto.com/gta/gta-6-glitch-lets-players-access-first-person-mode-3430025); [GamesRadar](https://www.gamesradar.com/games/grand-theft-auto/gta-6-glitch-adds-the-first-person-mode-that-rockstar-skipped/) |
| Native first-person aiming | All | R3 while aiming, or hold L2 and click R3; no movement | n/a (feature) | RUMOR (forum) | [ResetEra](https://www.resetera.com/threads/gta-vi-tips-and-tricks-thread-mark-spoilers-or-keep-them-vague.1693481/) |
| Free vehicle repair | All | Manual save and reload repairs your car | n/a | LIKELY | [PowerPyx tips](https://www.powerpyx.com/gta-6-tips-tricks/) |
| Store-reset bag overfill | All | Bag capped at $3,200 reportedly holds $4,000; another player says extra pays nothing | Unknown | RUMOR (disputed) | [meowdb](https://meowdb.com/gta6/glitches) |
| Exit car at speed with no damage | All | Physics bug | Unknown | RUMOR | [DualShockers](https://www.dualshockers.com/glitches-and-bugs-plaguing-gta-6-at-launch/) |
| Vehicles popping in and despawning | All | Minor bug | Unknown | RUMOR | [beatcopgame](https://beatcopgame.com/gta-6-bugs-tracker-all-bugs-weve-spotted-so-far/) |

## Where sources disagree: the conflict register

Rather than pick winners silently, the app should carry a `disputed` flag and show both values for each of these. Most conflicts come from one of three causes: a pre-launch page still ranking in search, a "found so far" count, or a price shown with and without a discount.

| Topic | Value A | Value B (and more) | Best current reading |
|---|---|---|---|
| Character switch | Hold D-pad right + R1/RB after "Breakfast Run" ([KeenGamer](https://www.keengamer.com/articles/guides/how-to-switch-between-jason-and-lucia-in-gta-6/)) | L1/LB after about 30% of story ([GameSpot](https://www.gamespot.com/articles/how-to-switch-between-jason-and-lucia-in-gta-6/)) | Disputed; may be a control-scheme setting |
| Hidden trophies | 28 (Insider Gaming, GGRecon) | 2 (KeenGamer) | Disputed |
| Positive Mental Attitude | No longer missable (Game-Checklists, Nov 21) | Possibly missable (PowerPyx, GTABase) | Do the Ch1 meditation anyway |
| Personal Best | Max Strength for both (KeenGamer, PowerPyx) | Reach Overweight (Push Square) | Disputed |
| Race Against Yago | Ch3 (PowerPyx) | Ch1 (cutscenewire) | Ch3 more likely (PowerPyx) |
| Mission order | Lab Fees before Unwanted Attention (PowerPyx) | Unwanted Attention first (two videos) | Order is flexible |
| Garage prices | GameRant list prices | GTABase 80% prices | Both right: discount explains the gap |
| Total garages | 13 (PowerPyx tracker) | 14 + GTA+ 15th (GameRant) | Disputed |
| Bunker 2 location | South of highway Ammu-Nation, North Mariana County (GameRant) | NW of Grassrivers, left of Big Pine (Beebom) | Unresolved; codes agree |
| Weapon count | 136 (Dexerto) | 196 (PowerPyx, video); 206 (GTABase); 50 of 66 for 100% | Use in-game tracker value per category |
| Vehicle count | 557 (277 + 280) | 641 or about 300 (GTABase); 258 | Use 277 base for 100% |
| Magazines | 27 | 34; GTA Boss list 29 | Disputed |
| Golf | 5 courses | mini golf 3 | Possibly two different things |
| WAiNK | 108 | 112 (GTABoom) | 108 (subcategories confirmed) |
| Fast food | 21 store pins | 23 robbable joints | Disputed |
| Sniper stats | NiaMeowDB values | Playday values | Show both until a screenshot settles it |
| Moreland 850 price | $700 | $350 (mission shop) | Possibly a mission discount |
| Carry limit | 2 sidearms + 2 long guns (GTABase, video) | 2 long + 1 pistol + 1 melee (pre-launch) | 2 + 2 |
| Gun store tiers | limited / standard / hunting / expanded | every day / premium / hunting / pawn | Disputed names |
| Criminal Profile names | Professional, Hardened, Violent, Psycho, Irredeemable | "Aggressive" in older previews | Red Bull list (Hardened confirmed) |
| Randy payout / size | $30k+ vs $35k+; 15, 16, 18 or 22 cars | | Unresolved |
| Piccia Furia lookalike | Ferrari 488 Pista (The Tab) | Pininfarina Battista (Perfect Score) | Both RUMOR |
| Cheat count | 61 | 59 tabulated (VICE); "none found" (Fandomwire) | 61 |
| PS5 firmware date | Nov 18 | Nov 17 | Minor |
| Pre-load start | Nov 10 | Nov 12 | Nov 12 more often cited |
| Pre-order cutoff | Nov 19 | Nov 20 | Minor |
| Heist payouts | Fan-site figures | "No outlet has published" (GrindMap) | Unconfirmed |
| Arcade game name | "Tenebra Lux" (video chapter) | "Tenebrae Lux" (GameRant) | Tenebrae Lux |

## Which sources the daily researcher can read and which stay link-only

The team tested robots.txt files and access paths directly on Nov 22. A robots.txt file is not a license, and nobody read the full terms of use for Fandom, PowerPyx or GTABase, so the "ingest" column means "technically allowed by robots.txt and reachable; check terms before any commercial use". Whatever is ingested should be stored as derived facts in the app's own words (a short summary, a count, a code) with a source link, never as copied text or transcripts.

| Source | Type | Access result (Nov 22) | Verdict | Best for |
|---|---|---|---|---|
| PowerPyx | guide | robots `Allow: /`; RSS at `/feed/` with several GTA VI posts a day | Ingest (poll RSS, diff titles) | Trophies, walkthroughs, 100% checklist, collectible counts |
| Fandom GTA Wiki | wiki | HTML behind Cloudflare, but `/api.php` returns JSON; `recentchanges` shows edits within minutes | Ingest via API; attribute (CC BY-SA, not re-verified) | Mission lists, characters, change detection |
| GTABase | guide/database | robots blocks only admin/search/user; publishes `/llms.txt` listing GTA VI databases | Ingest | Vehicles, weapons, properties, map layers |
| YouTube channel RSS | video metadata | `feeds/videos.xml?channel_id=` works, no key | Ingest metadata | New official trailers and guide uploads |
| YouTube chapter markers | video | yt-dlp `--dump-single-json` gives chapters | Ingest derived names and timestamps only; check YouTube ToS | Corroborating mission names and pin areas |
| YouTube transcripts | video | Mostly blocked by "Sign in to confirm you're not a bot" and HTTP 429/403 | Manual or local transcription only; store derived facts | Spoken prices, spawn spots, codes |
| Reddit r/GTA6 | forum | RSS 429, JSON 403 | Official API only under Reddit's terms; signals, never facts | Early warnings on patches, glitches, missables |
| Rockstar Newswire, VI hub, Support | official | Newswire HTML 200, no RSS (404); robots disallows ClaudeBot, GPTBot and others; Support timed out | Link-only for automated AI fetching; track via YouTube RSS and press coverage | Patch notes, announcements |
| NiaMeowDB, Playday, timesaver.gg, Game-Checklists, GMTreks, Metaforge | fan DB | Reachable; terms and robots not checked | Candidate; verify terms first; never sole source for CONFIRMED | Stats, missable status changes |
| Dexerto, Push Square, Red Bull, Beebom, VICE, Insider Gaming, GamingBible, TweakTown | news/guide | Readable; robots not checked | Candidate for headline monitoring; link plus own-words summary | Cross-checks, easter eggs, money, cheats |
| ViceManual screenshots | screenshot | Readable | Manual review only | UI facts (menus, stats tab) |
| Exophase | trophy mirror | robots only blocks `/search`, but Cloudflare challenge | Manual | Official trophy data |
| GamesRadar | news | Blocks several AI crawlers (Claude not named in the part read) | Link-only to be safe | Reviews, news |
| Game8 | guide | Blocks GPTBot and Google-Extended; 402 paywall | Link-only | Maps, guides |
| IGN | guide/map | robots forbids scraping, TDM, RAG, datasets | **Link-only** | Deep links |
| MapGenie | map | Same Ziff Davis ban; blocks anthropic-ai; map at `/grand-theft-auto-6/maps/leonida` | **Link-only, never ingest** | Deep links to the map |
| GameRant | guide | Valnet ban on scraping and RAG; blocks ClaudeBot | **Link-only** | Secrets, puzzles |
| GTAForums | forum | robots disallows Claude bots; Cloudflare 403 | **Link-only** | Review hub, mapping thread |
| GameFAQs | forum/guide | `ai-train=no, use=reference`; blocks Claude bots | **Link-only** | Q&A |
| PSNProfiles | trophy | `ai-train=no, use=reference`; blocks ClaudeBot; Cloudflare 403 | **Link-only** | Rarity |
| TrueAchievements, PlayStationTrophies | trophy | Cloudflare blocked | **Link-only / manual** | Guides, rarity |
| GameSpot | news/guide | HTTP 403 | Link-only | Guides |
| X, TikTok | social | Login required; leak-heavy | Link-only, never auto-CONFIRMED | Signals |

Sources: [PowerPyx robots](https://www.powerpyx.com/robots.txt); [Fandom API](https://gta.fandom.com/api.php?action=query&list=recentchanges&rclimit=3&format=json); [GTABase llms.txt](https://www.gtabase.com/llms.txt); [IGN robots](https://www.ign.com/robots.txt); [MapGenie robots](https://mapgenie.io/robots.txt); [GameRant robots](https://gamerant.com/robots.txt); [GTAForums robots](https://gtaforums.com/robots.txt); [GameFAQs robots](https://gamefaqs.gamespot.com/robots.txt); [PSNProfiles robots](https://psnprofiles.com/robots.txt); [Rockstar robots](https://www.rockstargames.com/robots.txt); [Exophase robots](https://www.exophase.com/robots.txt); [GamesRadar robots](https://www.gamesradar.com/robots.txt); [Game8 robots](https://game8.co/robots.txt).

The researcher should follow a simple promotion rule. A new fact enters as RUMOR. It becomes LIKELY with one reputable guide, and CONFIRMED only when two independent source *types* agree (for example guide + wiki, guide + video chapters, or official + anything). Social posts and leak screenshots never auto-promote, as the fake pre-launch trophy list on X proves.

## Recommended data field schema

Every record shares a common block, then adds type-specific fields. Keep stat fields nullable, because many values are unknown or disputed, and keep stock and modded values in separate rows.

```yaml
common:            # on every record
  id, name, slug
  summary_own_words        # <= 280 chars, never copied text
  sources[]:               # one per source
    url, source_type       # official|guide|wiki|review|news|fan_db|video_chapters|transcript|screenshot|forum|social_leak
    publish_date, retrieved_at
  independent_source_count
  confidence               # CONFIRMED | LIKELY | RUMOR | THEORY | HOAX
  disputed (bool), dispute_note, alt_values[]   # keep both sides of a conflict
  spoiler (bool), edition_exclusive (none|ultimate|preorder|gta_plus)
  game_version             # e.g. 01.002.001
  first_seen, last_verified

patch:        version, date, platforms[], size_mb {ps5, xbox}, official_notes_url (nullable), notes_status (none_published|published), source_type (rockstar|press|datamine)
character:    full_name, voice_actor, playable (bool), role, criminal_profile_tier, height, weight, first_mission_id
stat:         character, stat (strength|cardio|focus), level (0-4), decays (bool), training_methods[]
region:       official_region (one of 6), county (nullable), sub_area, fog_default (bool)
map_pin:      category, subcategory, region, county, sub_area, landmark_description, coords {x,y} (nullable), map_provider_ref (link only), character_lock, requires_chapter, respawns (bool), one_time (bool), done (user flag)
collectible:  category, set_name, index_in_set, total_in_category, required_for_100, reward, location_pin_id
safe_code:    code (string, keep leading zeros), location, mission_id (nullable), fixed (bool), randomized_per_playthrough (bool), alt_method (pick|snap_gun|sticky_bomb|interrogate)
random_event: name, region, trigger_hint, reward, respawns (bool, nullable), chapter_min
secret:       type (easter_egg|puzzle|mystery|hidden_location), steps[], rewards[], status (CONFIRMED|THEORY|HOAX), tab (secrets|theories|hoaxes)
weapon:       class, base_weapon, is_unique_variant, modded_preset (bool), damage, accuracy, handling, range (0-10, 1 decimal), fire_style, caliber, mag_size, price, stores[], shop_tier_required, requires_bank_account, how_to_get, stats_source_ids[], stats_as_of
vehicle:      class, manufacturer, base_model (bool), standout_variant_of, modded (bool), speed_bar, accel_bar, asphalt_handling, offroad_handling, strength (0-10), road_rating, offroad_rating, top_speed_mph (nullable, measured only), braking (nullable), has_tracker, registrable, register_cost, where_found, wish_list (bool)
mission:      chapter (0=Prologue..5), order_index, order_disputed, type (story|optional|heist_setup|stranger|character_quest), character_lock (jason|lucia|either|solo), heist_group (cartel|vcia|null), missable, time_sensitive, unlocks[], prerequisites[], linked_trophy_id, reward_cash (nullable), video_evidence[] {video_id, channel, upload_date, chapter_title_raw, start_time_s}
trophy:       platform_names {psn, xbox}, grade (P|G|S|B), grade_inferred (bool), gamerscore, hidden (bool, disputed), category, requirement_text, requirement_count, missable (true|false|possibly), related_entity_ids[], rarity_pct (nullable)
checklist_item: group (story_tasks|exploration_activities|discovery), required, total, unit
activity:     type, locations_count, medals, unlocks_cheat_id, linked_trophy_id
property:     kind (garage|safehouse|business), acquisition (purchase|story|edition|preorder|gta_plus), list_price, discounted_price, capacity, region, unlock_mission_id
money_method: chapter_min, payout_min, payout_max, payout_basis (measured|creator_claim|estimate), repeatable, risk, patch_status, last_checked
cheat:        name, unlock_condition, sequence[] (U|D|L|R), sequence_known (bool), disables_trophies (true), effect
exploit:      platform[], steps[], patch_status (unpatched|patched|unknown), last_checked, version_tested
source:       name, domain, source_type, robots_status, terms_checked (bool), ingest_policy (ingest|ingest_api|manual|link_only), feed_url, last_polled
```

## What is still unknown and what to research next

Several gaps block a complete app today. Rockstar has published **no patch notes**, and the RockstarINTEL headline about a new update could not be verified, so the first daily check should be Rockstar Support plus press coverage of any title update after 01.002.001. **No source has in-game coordinates**, so every pin is a landmark description; the only clean fix is player-contributed pins checked against the in-game Progress counts, since MapGenie and IGN data must not be ingested. Per-item location lists exist for only a handful of collectibles (8 of 125 flamingos on PowerPyx so far). Armor values, ammo caps, attachment prices, clothing and tattoo prices, per-mission cash rewards, boat and aircraft stats, measured top speeds, the full random-event list, the full Strangers and Freaks list, trophy rarity, heist payouts, Bunker 2's location, Randy's list length, and the switching controls are all unresolved. Whether hospitals, police stations and ATMs appear as map pins is unknown. PC and GTA VI Online have no dates.

Video is the richest untapped source. Spoken YouTube transcripts were mostly blocked by YouTube's "Sign in to confirm you're not a bot" check and HTTP 429 errors, and transcript websites returned 403 or empty pages. What the team did obtain was chapter markers and descriptions for many videos, plus auto-captions for a few: the vAnother Level weapons guide was the one narrated transcript with usable facts (timestamps cited above), the BeardBear walkthrough's captions held only story dialogue, and the JFL stunt video was music only. **You can supply video links or downloaded files for local transcription** (for example with ffmpeg plus a Whisper model), which sidesteps the bot check. In priority order, the most valuable targets are the Illegal Operations safe codes video ([_bM4rxLlmp8](https://www.youtube.com/watch?v=_bM4rxLlmp8)), the weapon tier list ([Z3XMnmhj7xY](https://www.youtube.com/watch?v=Z3XMnmhj7xY)) and Ammu-Nation showcase ([ESoMYxEE7Jw](https://www.youtube.com/watch?v=ESoMYxEE7Jw)) to settle sniper stats, the easter-egg compilations from T5G ([V9JgeA64VYE](https://www.youtube.com/watch?v=V9JgeA64VYE)), ZacCoxTV ([bCKm934JnY0](https://www.youtube.com/watch?v=bCKm934JnY0)) and Zancudo's rare random events ([JnTgyd4DIlg](https://www.youtube.com/watch?v=JnTgyd4DIlg)), the Randy's Wish List spawn video ([doFaJV-CNLw](https://www.youtube.com/watch?v=doFaJV-CNLw), no captions), rare-car videos from Nerpah ([8Ost1vByu3s](https://www.youtube.com/watch?v=8Ost1vByu3s)), T5G ([RMGdwkZ5VFw](https://www.youtube.com/watch?v=RMGdwkZ5VFw)) and LunarGaming ([z7ORZ1xC35s](https://www.youtube.com/watch?v=z7ORZ1xC35s)), the "things the game doesn't tell you" videos from gameranx ([1yBSK22csvI](https://www.youtube.com/watch?v=1yBSK22csvI)), outsidexbox ([QkCskWtn3kQ](https://www.youtube.com/watch?v=QkCskWtn3kQ)) and MrDalekJD ([5Z7T-ppd0gY](https://www.youtube.com/watch?v=5Z7T-ppd0gY)), and the Cocaine Flamingo full route ([tzCkxqF9tI0](https://www.youtube.com/watch?v=tzCkxqF9tI0)). A single stat-screen screenshot of a sniper rifle and of a car's tuning menu would also settle more conflicts than any further web search.

## Conclusion

The most useful insight for building the app is that GTA VI ships with its own answer key. The Progress Database, the 100% checklist and the trophy list let a player verify almost every count on their own console, so the app should be designed around "expected total vs found" rather than around third-party pin maps it cannot legally ingest. The second insight is that most conflicts are not really disagreements: they are discounts (garages at exactly 80%), "found so far" partial counts, stock versus modded stats, or pre-launch pages that never got updated. Modeling those causes as fields (`discounted_price`, `modded`, `publish_date` before Nov 19) will clear a large share of the disputes automatically.

The real danger is contamination, not scarcity. GTA V cheat strings, GTA Online car prices and test speeds, GTA V skill stats and a fake pre-launch trophy list are all still circulating with GTA 6 in the title. A researcher that only promotes facts after two independent source types agree, and that treats any value matching a GTA V or GTA Online number as suspect, will protect the app's accuracy far better than one that simply reads more sites. Expect the first real title update to change the barn money loop, possibly weapon and vehicle stats, and the missable status of a trophy or two, which is why every row needs a `game_version` and a `last_verified` date from day one.
