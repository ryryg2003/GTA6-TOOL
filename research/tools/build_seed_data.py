#!/usr/bin/env python3
"""Build the app's seed data files from the launch-week research report.

Reads:  reports/GTA 6 launch data for tool.md
Writes: data/*.json (v1 sections, spec 9.3 schema) and data/later/*.json

Run from the repo root:  python3 research/tools/build_seed_data.py
It is safe to re-run; it overwrites the files it owns and nothing else.
"""
import json, re, os, sys
from collections import OrderedDict

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
REPORT = os.path.join(ROOT, "reports", "GTA 6 launch data for tool.md")
DATA = os.path.join(ROOT, "data")
LATER = os.path.join(DATA, "later")
TODAY = "2026-11-22"
GAME_VERSION = "01.002.001"

lines = open(REPORT, encoding="utf-8").read().split("\n")

# ---------------------------------------------------------------- parsing
LINK = re.compile(r"\[([^\]]+)\]\((https?://[^)\s]+)\)")
MONTHS = {"Oct": "10", "Nov": "11", "Dec": "12"}


def split_row(l):
    l = l.strip()
    if l.startswith("|"):
        l = l[1:]
    if l.endswith("|") and not l.endswith("\\|"):
        l = l[:-1]
    parts = re.split(r"(?<!\\)\|", l)
    return [p.replace("\\|", "|").strip() for p in parts]


tables, sections = [], []  # sections: (heading, start, end)
cur, heading, sec_start = None, "", 0
for i, l in enumerate(lines):
    m = re.match(r"^(#{2,4}) (.*)", l)
    if m:
        sections.append((heading, sec_start, i))
        heading, sec_start = m.group(2), i
    if l.startswith("|"):
        if cur is None:
            cur = {"line": i, "section": heading, "header": split_row(l), "rows": []}
        elif re.match(r"^\|[\s:\-|]+\|?$", l):
            pass
        else:
            cur["rows"].append(split_row(l))
    elif cur is not None:
        tables.append(cur)
        cur = None
sections.append((heading, sec_start, len(lines)))


def section_links(line_no):
    """All links in the prose of the section that contains line_no, plus the parent ## section."""
    out = []
    for h, s, e in sections:
        if s <= line_no < e:
            out += LINK.findall("\n".join(lines[s:e]))
    # parent level-2 section
    for j in range(line_no, -1, -1):
        if lines[j].startswith("## "):
            k = j + 1
            while k < len(lines) and not lines[k].startswith("## "):
                k += 1
            out += LINK.findall("\n".join(lines[j:k]))
            break
    return out


def accessed_from(title):
    m = re.search(r"\b(Oct|Nov|Dec) (\d{1,2})\b", title)
    if m:
        return "2026-%s-%02d" % (MONTHS[m.group(1)], int(m.group(2)))
    return TODAY


def mk_source(title, url):
    return OrderedDict(url=url, title=re.sub(r"\s+", " ", title).strip(), accessed=accessed_from(title))


def sources_for(text, line_no, max_fallback=2):
    """Links in the row; bare names resolved against the section's links; else section fallback."""
    found = [mk_source(t, u) for t, u in LINK.findall(text)]
    pool = section_links(line_no)
    plain = LINK.sub("", text)
    for t, u in pool:
        key = t.split(",")[0].split(" (")[0].strip()
        if len(key) >= 4 and key.lower() in plain.lower() and all(s["url"] != u for s in found):
            found.append(mk_source(t, u))
    if not found:
        seen = set()
        for t, u in pool:
            if u not in seen:
                found.append(mk_source(t, u))
                seen.add(u)
            if len(found) >= max_fallback:
                break
    # de-dupe by url
    uniq, seen = [], set()
    for s in found:
        if s["url"] not in seen:
            uniq.append(s)
            seen.add(s["url"])
    return uniq


RANK = {"confirmed": 3, "likely": 2, "unverified": 1}


def confidence(*tags):
    """Most cautious reading of one or more report tags (spec 9.3)."""
    best = None
    for tag in tags:
        if not tag:
            continue
        t = tag.upper()
        found = []
        for word, val in (("CONFIRMED", "confirmed"), ("LIKELY", "likely"), ("RUMOR", "unverified"),
                          ("THEORY", "unverified"), ("HOAX", "unverified"), ("UNRESOLVED", "unverified"),
                          ("CONFLICT", "likely"), ("DISPUTED", "likely")):
            if word in t:
                found.append(val)
        if not found:
            continue
        low = min(found, key=lambda v: RANK[v])
        best = low if best is None else min(best, low, key=lambda v: RANK[v])
    return best or "likely"


def slug(s):
    s = s.lower().replace("'", "").replace("’", "").replace("$", "")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s[:60].strip("-")


def strip_links(s):
    return LINK.sub(lambda m: m.group(1), s).replace("**", "").strip()


def money(s):
    m = re.search(r"\$([\d,]+)", s or "")
    return int(m.group(1).replace(",", "")) if m else None


def num(s):
    try:
        return float(s)
    except (TypeError, ValueError):
        return None


def bar100(v):
    """Game shows 0-10 with one decimal; spec stores bars as 0-100."""
    return None if v is None else round(v * 10, 1)


def base(id_, name, section, summary, conf, sources, details=None, **extra):
    e = OrderedDict(id=id_, name=name, section=section, summary=summary.strip())
    if details:
        e["details"] = details.strip()
    e["confidence"] = conf
    e["sources"] = sources
    e["last_verified"] = TODAY
    e.update(extra)
    return e


def table(header_start):
    for t in tables:
        if t["header"][0].startswith(header_start):
            return t
    raise SystemExit("table not found: " + header_start)


def uniq_id(entries, id_):
    ids = {e["id"] for e in entries}
    if id_ not in ids:
        return id_
    n = 2
    while "%s-%d" % (id_, n) in ids:
        n += 1
    return "%s-%d" % (id_, n)


# ---------------------------------------------------------------- areas
REGION_POS = OrderedDict([
    ("vice-city", ("Vice City", 760, 640)),
    ("leonida-keys", ("Leonida Keys", 560, 910)),
    ("grassrivers", ("Grassrivers", 500, 650)),
    ("port-gellhorn", ("Port Gellhorn", 180, 330)),
    ("ambrosia", ("Ambrosia", 420, 320)),
    ("mount-kalaga", ("Mount Kalaga National Park", 640, 130)),
    ("mariana-leonard", ("Mariana and Leonard counties", 700, 420)),
])
ROW_TO_REGION = {
    "Vice City": ["vice-city"], "Leonida Keys": ["leonida-keys"], "Grassrivers": ["grassrivers"],
    "Mariana and Leonard": ["mariana-leonard"], "Ambrosia and Port Gellhorn": ["ambrosia", "port-gellhorn"],
    "Mount Kalaga": ["mount-kalaga"],
}
areas, subarea_region = [], {}
t = table("Region (official)")
for rid, (name, x, y) in REGION_POS.items():
    areas.append(OrderedDict(id=rid, name=name, x=x, y=y, kind="region",
                             official=rid != "mariana-leonard", placeholder_position=True))
for row in t["rows"]:
    regs = next(v for k, v in ROW_TO_REGION.items() if row[0].startswith(k))
    names = []
    for n in re.split(r",|;", row[1].replace("also ", "")):
        n = n.strip()
        m = re.match(r"^(North|South|West|East)/(North|South|West|East) (.*)$", n)
        if m:
            names += [m.group(1) + " " + m.group(3), m.group(2) + " " + m.group(3)]
        elif " and " in n and n.startswith("VCIA"):
            names += ["VCIA", "VCIA Terminals"]
        else:
            names.append(n)
    for k, n in enumerate([n.strip() for n in names if n.strip()]):
        rid = regs[0]
        if n in ("Port Gellhorn", "Gellhorn", "Draper Island", "Wild Hog Point", "Frogswater"):
            rid = "port-gellhorn" if "port-gellhorn" in regs else rid
        _, rx, ry = REGION_POS[rid]
        ang = k * 2.39996
        import math
        x = int(max(5, min(995, rx + math.cos(ang) * (25 + 6 * (k % 8)))))
        y = int(max(5, min(995, ry + math.sin(ang) * (25 + 6 * (k % 8)))))
        aid = "area-" + slug(n)
        if any(a["id"] == aid for a in areas):
            continue
        areas.append(OrderedDict(id=aid, name=n, x=x, y=y, kind="sub_area", region=rid,
                                 placeholder_position=True))
        subarea_region[n.lower()] = aid
# extra place names seen in pin text
for n, rid in [("Vice Beach", "vice-city"), ("Peacock Estates", "vice-city"), ("Waxman Island", "vice-city"),
               ("Sharktooth Island", "mariana-leonard"), ("Shoeless Keys", "leonida-keys"),
               ("Cottonmouth Lake", "grassrivers"), ("Big Pine", "grassrivers"), ("Hamlet", "vice-city")]:
    if n.lower() not in subarea_region:
        _, rx, ry = REGION_POS[rid]
        aid = "area-" + slug(n)
        areas.append(OrderedDict(id=aid, name=n, x=rx + 30, y=ry - 30, kind="sub_area", region=rid,
                                 placeholder_position=True))
        subarea_region[n.lower()] = aid
AREA_BY_ID = {a["id"]: a for a in areas}
REGION_WORDS = {"vice city": "vice-city", "keys": "leonida-keys", "grassrivers": "grassrivers",
                "port gellhorn": "port-gellhorn", "ambrosia": "ambrosia", "kalaga": "mount-kalaga",
                "mariana": "mariana-leonard", "leonard": "mariana-leonard"}


def locate(text):
    """Return (area, area_name). Longest sub-area name match wins, then region words."""
    low = text.lower()
    best = None
    for n, aid in subarea_region.items():
        if re.search(r"\b" + re.escape(n) + r"\b", low) and (best is None or len(n) > len(best[0])):
            best = (n, aid)
    if best:
        a = AREA_BY_ID[best[1]]
        return a, a["name"]
    for w, rid in REGION_WORDS.items():
        if w in low:
            a = AREA_BY_ID[rid]
            return a, a["name"]
    a = AREA_BY_ID["vice-city"]
    return a, "Unknown (placed at Vice City center)"


def jitter(a, k):
    return (max(0, min(1000, a["x"] + (k * 7) % 23 - 11)), max(0, min(1000, a["y"] + (k * 11) % 23 - 11)))


# ---------------------------------------------------------------- categories
categories = [
    # spec v1 defaults first
    ("drugs", "Drug stashes", "pill", "#e05252"),
    ("collectible-cards", "Collectible cards", "card", "#f2b84b"),
    ("money-bags", "Money and cash stashes", "cash", "#4caf50"),
    ("stores", "Stores", "bag", "#5aa9e6"),
    ("paint-spray", "Pay 'n' Spray", "spray", "#b36ae2"),
    ("mechanics", "Mod shops", "wrench", "#ff8a3d"),
    ("garages", "Garages", "garage", "#9aa5b1"),
    ("safe-codes", "Safe and keypad codes", "lock", "#ffd400"),
    # added from launch research
    ("ammu-nation", "Ammu-Nation", "gun", "#c0392b"),
    ("gas-stations", "Gas stations", "fuel", "#7f8c8d"),
    ("clothing", "Clothing stores", "shirt", "#e84393"),
    ("collectibles", "Other collectibles", "star", "#ffe066"),
    ("stunt-jumps", "Stunt jumps", "ramp", "#00bcd4"),
    ("weapons", "Free and unique weapons", "crosshair", "#ff5252"),
    ("secrets", "Secrets and easter eggs", "eye", "#8e44ad"),
    ("random-events", "Random events", "alert", "#ff9800"),
    ("rare-vehicles", "Rare and Wish List vehicles", "car", "#26c6da"),
    ("activities", "Activities", "flag", "#66bb6a"),
]
categories = [OrderedDict(id=i, label=l, icon=ic, color=c) for i, l, ic, c in categories]
CAT_IDS = {c["id"] for c in categories}

# ---------------------------------------------------------------- weapons
weapons = []
t = table("Weapon")
for row in t["rows"]:
    name, cls, stats, stag, mag, price, store, ptag = (row + [""] * 8)[:8]
    vals = [num(v.strip()) for v in re.sub(r"\(.*?\)", "", stats).split("/")]
    vals = (vals + [None] * 4)[:4]
    conf = confidence(stag, ptag if ptag != "n/a" else None)
    notes = []
    if "(" in stats:
        notes.append("Stat note: " + re.search(r"\((.*?)\)", stats).group(1))
    notes.append("In-game menu values (0-10): Damage %s, Accuracy %s, Handling %s, Range %s." %
                 tuple("?" if v is None else v for v in vals))
    notes.append("Report tags: stats %s; price %s." % (stag, ptag))
    if conf != "confirmed":
        notes.append("Stats from fan databases NiaMeowDB and Playday.one, which do not name their data source.")
    e = base("weapon-" + slug(name), strip_links(name), "weapons",
             "%s. Magazine %s, %s at %s." % (cls, mag, price if price != "unknown" else "price unknown", store),
             conf, sources_for(" ".join(row), t["line"]), " ".join(notes),
             category=cls.split(" (")[0], damage=bar100(vals[0]), fire_rate=None, range=bar100(vals[3]),
             accuracy=bar100(vals[1]), clip_size=int(mag) if mag.isdigit() else None, price=money(price),
             unlock_how="Buy at %s" % store if store not in ("unknown", "") else None,
             handling=bar100(vals[2]), stats_scale_note="0-100 = in-game 0-10 x 10",
             is_unique_variant=False, stats_confidence=confidence(stag),
             price_confidence=confidence(ptag) if ptag not in ("n/a", "") else None, game_version=GAME_VERSION)
    weapons.append(e)

t = table("Unique variant")
for row in t["rows"]:
    name, b, stats, price, store = (row + [""] * 5)[:5]
    vals = (([num(v) for v in stats.split("/")]) + [None] * 4)[:4]
    e = base(uniq_id(weapons, "weapon-" + slug(name)), name, "weapons",
             "Unique display-case variant of the %s, sold at %s for %s." % (b, store, price), "unverified",
             sources_for(" ".join(row), t["line"]),
             "Single fan database (NiaMeowDB). Unique variants reportedly cannot be modified (GTABase).",
             category="Unique variant", damage=bar100(vals[0]), fire_rate=None, range=bar100(vals[3]),
             accuracy=bar100(vals[1]), clip_size=None, price=money(price), unlock_how="Buy at " + store,
             handling=bar100(vals[2]), base_weapon=b, is_unique_variant=True,
             modded_preset="modded" in name.lower(), game_version=GAME_VERSION)
    weapons.append(e)

hidden_weapons = []
t = table("Free or hidden weapon")
for row in t["rows"]:
    name, how, stats, tag, src = (row + [""] * 5)[:5]
    vals = (([num(v.strip("* ")) for v in stats.split("(")[0].split("/")]) + [None] * 4)[:4]
    e = base(uniq_id(weapons, "weapon-" + slug(name)), name, "weapons", "Free pickup: " + how + ".",
             confidence(tag), sources_for(" ".join(row), t["line"]),
             ("Stats shown with parts fitted. " if "*" in stats else "") + "Stats field from source: " + stats,
             category="Free or hidden", damage=bar100(vals[0]), fire_rate=None, range=bar100(vals[3]),
             accuracy=bar100(vals[1]), clip_size=None, price=0, unlock_how=how, handling=bar100(vals[2]),
             is_unique_variant=True, game_version=GAME_VERSION)
    weapons.append(e)
    hidden_weapons.append((e, how))

# ---------------------------------------------------------------- vehicles
vehicles = []
wish = {}
t = table("Wish List car")
for row in t["rows"]:
    for n in row[0].split(","):
        n = re.sub(r"\(.*?\)", "", n).strip()
        wish[n] = (row[1], row[2], t["line"], row)
VEH_SRC = [mk_source("meowdb GTA 6 vehicle stats, Nov 22", "https://meowdb.com/gta6/best-cars")]
VEH_CONFIRM = [mk_source("timesaver.gg fastest cars, Nov 21", "https://timesaver.gg/tools/gta-6/cars/fastest")]
t = table("Vehicle")
for row in t["rows"]:
    name, cls, spd, acc, asph, off, strn, road, offr, tag = (row + [""] * 10)[:10]
    modded = "(modded)" in name.lower()
    clean = re.sub(r"\s*\((?i:modded)\)", "", name).strip()
    w = wish.get(clean)
    det = ["In-game bars (0-10): Speed %s, Acceleration %s, Asphalt handling %s, Off-road handling %s, Strength %s. "
           "Road rating %s, off-road rating %s." % (spd, acc, asph, off, strn, road, offr),
           "Report tag: %s." % tag, "Source: meowdb tuning-menu values (Nov 22, page marked work in progress)."]
    if w:
        det.append("Randy's Wish List car. Location: %s" % strip_links(w[0]))
    e = base("vehicle-" + slug(name), name, "vehicles",
             "%s class%s. Speed bar %s/10, acceleration %s/10." % (cls, ", stats with parts fitted" if modded else "",
                                                                  spd, acc),
             confidence(tag), VEH_SRC + (VEH_CONFIRM if "CONFIRMED" in tag else [])
             + ([] if not w else sources_for(" ".join(w[3]), w[2])),
             " ".join(det), **{"class": cls}, top_speed_mph=None, acceleration=bar100(num(acc)),
             handling=bar100(num(asph)), braking=None, seats=None, price=None,
             where_to_find=strip_links(w[0]) if w else "Steal one, then register it with Moses or at a Pay 'n' Spray",
             speed=bar100(num(spd)), offroad_handling=bar100(num(off)), strength=bar100(num(strn)),
             road_rating=int(road) if road.isdigit() else None, offroad_rating=int(offr) if offr.isdigit() else None,
             modded=modded, wish_list=bool(w), stats_scale_note="0-100 = in-game 0-10 x 10",
             game_version=GAME_VERSION)
    e["sources"] = list({s["url"]: s for s in e["sources"]}.values())
    vehicles.append(e)
# extra rows quoted in prose
extra_line = next(i for i, l in enumerate(lines) if l.startswith("Extra rows from timesaver.gg only"))
for m in re.finditer(r"([A-Z][\w' ]+?) (\d\.\d)/(\d\.\d)/(\d\.\d) \((LIKELY|RUMOR)", lines[extra_line]):
    name = m.group(1).replace("Speed / Accel / Handling): ", "").strip()
    name = re.sub(r"^.*?: ", "", name)
    if any(v["name"] == name for v in vehicles):
        continue
    w = wish.get(name)
    vehicles.append(base(uniq_id(vehicles, "vehicle-" + slug(name)), name, "vehicles",
                         "Speed bar %s/10, acceleration %s/10, handling %s/10 (single aggregator)." % m.group(2, 3, 4),
                         confidence(m.group(5)), sources_for(lines[extra_line], extra_line)[:2],
                         "From timesaver.gg only." + (" Randy's Wish List car." if w else ""),
                         **{"class": "Unknown"}, top_speed_mph=None, acceleration=bar100(num(m.group(3))),
                         handling=bar100(num(m.group(4))), braking=None, seats=None, price=None,
                         where_to_find=strip_links(w[0]) if w and w[0] != "not given" else None,
                         speed=bar100(num(m.group(2))), modded=False, wish_list=bool(w), game_version=GAME_VERSION))

# ---------------------------------------------------------------- missions
missions = []
t = table("Chapter")
order = 0
for row in t["rows"]:
    chap_raw, names, tag = row[:3]
    chapter = 0 if chap_raw.startswith("Prologue") else int(chap_raw[0])
    parts = re.split(r";\s*", names)
    expanded = []
    for p in parts:
        p = p.replace("interleaved: ", "").strip()
        m = re.match(r"(Cartel Heist|VCIA Takedown): (.*)", p)
        if m:
            for q in m.group(2).split(", "):
                expanded.append((q.strip(), m.group(1)))
        elif p:
            expanded.append((p, None))
    for name, heist in expanded:
        if "dedupe" in name:
            continue
        optional = name.startswith("Opt ")
        name = name[4:] if optional else name
        missable = "missable" in name
        lock = None
        mm = re.search(r"\((J|L)(?:, missable)?\)", name)
        if mm:
            lock = {"J": "jason", "L": "lucia"}[mm.group(1)]
        final = "(final)" in name
        name = re.sub(r"\s*\((?:J|L|missable|final|J, missable|L, missable)\)", "", name).strip()
        order += 1
        conf = confidence(tag)
        if chapter in (1, 2, 3) and optional:
            conf = "likely" if conf == "confirmed" else conf
        if chapter == 5 and final:
            conf = "confirmed"
        if chapter in (0, 1) and not optional:
            conf = "confirmed"  # report: Ch1 main names matched across video + wiki + guide
        if chapter in (2, 3) and "Video-matched" in tag:
            conf = "likely"  # report only marks an unnamed video-matched subset confirmed; stay cautious
        mid = uniq_id(missions, "mission-" + slug(name))
        missables = ["Optional mission is time-limited and can be missed"] if missable else []
        e = base(mid, name, "missions",
                 "%s %s mission%s%s." % ("Prologue" if chapter == 0 else "Chapter %d" % chapter,
                                        "optional" if optional else "story",
                                        " (%s setup)" % heist if heist else "",
                                        ", %s only" % lock.title() if lock else ""),
                 conf, sources_for(" ".join(row), t["line"])[:3],
                 "Order follows PowerPyx and may differ slightly from play order. Report tag: %s. Contains story spoilers by name." % tag,
                 type="side" if optional else "story", order=order, giver=None, objective=None, steps=[], tips=[],
                 missables=missables, rewards=None, unlocks=[], chapter=chapter, character_lock=lock,
                 heist_group=heist, spoiler=chapter >= 3, game_version=GAME_VERSION)
        missions.append(e)

# ---------------------------------------------------------------- trophies
trophies = []
t = table("Trophy")
for row in t["rows"]:
    name, grade, req, cat, tag = (row + [""] * 5)[:5]
    miss = "missable" in (req + tag).lower()
    trophies.append(base("trophy-" + slug(name), name, "trophies", req, confidence(tag),
                         sources_for(" ".join(row), t["line"])[:3],
                         ("Possibly missable: sources disagree. Safe play: do it as soon as it's available. " if miss else "")
                         + "Report tag: %s." % tag,
                         how_to_unlock=req, missable=miss, grade=grade, category=cat,
                         spoiler="SPOILER" in req.upper(), game_version=GAME_VERSION))

# ---------------------------------------------------------------- map pins
pins = []


def add_pin(name, cat, where, summary, conf, srcs, details=None, code=None, precision="approximate", **extra):
    a, aname = locate(where + " " + name)
    x, y = jitter(a, len(pins))
    pins.append(base(uniq_id(pins, "pin-" + slug(name)), name, "map_pins", summary, conf, srcs, details,
                     category=cat, x=x, y=y, location_precision=precision, area_name=aname,
                     how_to_reach=strip_links(where), code=code, game_version=GAME_VERSION, **extra))


CAT_MAP = {"card": "collectible-cards", "weapon": "weapons", "activity": "activities", "stash": "money-bags",
           "cash": "money-bags", "drug": "drugs", "flamingo": "drugs", "vehicle": "rare-vehicles"}
t = table("Item")
for row in t["rows"]:
    item, cat, loc, tag, src = (row + [""] * 5)[:5]
    c = next((v for k, v in CAT_MAP.items() if k in cat.lower()), "collectibles")
    add_pin(item, c, loc, "%s: %s." % (cat, loc), confidence(tag), sources_for(" ".join(row), t["line"]))

t = table("Code")
for row in t["rows"]:
    code, ctx, tag, src = (row + [""] * 4)[:4]
    randomized = "random" in (code + ctx).lower()
    cval = None if randomized or not re.match(r"^[\d#]+$", code) else code
    nm = ("Safe code %s" % code) if cval else strip_links(code)
    add_pin(nm + (" - " + strip_links(ctx).split(".")[0][:50] if cval else ""), "safe-codes", ctx,
            strip_links(ctx) + ".", confidence(tag), sources_for(" ".join(row), t["line"]),
            ("Randomized per playthrough: no fixed code exists. " if randomized else "")
            + "Ordinary robbery safes get a new code every time; only story and landmark codes are fixed.",
            code=cval, randomized=randomized)

t = table("Event")
for row in t["rows"]:
    ev, where, what, tag, src = (row + [""] * 5)[:5]
    add_pin(ev, "random-events", where, what + ".", confidence(tag), sources_for(" ".join(row), t["line"]),
            "Random events are not marked on the in-game map and may not repeat once done (unverified).")

t = table("Secret")
for row in t["rows"]:
    sname, where, what, tag, src = (row + [""] * 5)[:5]
    codes = re.findall(r"\b0\d{3,5}\b|\b\d{4,6}\b", what + " " + where)
    add_pin(sname, "secrets", where, strip_links(what) + ".", confidence(tag), sources_for(" ".join(row), t["line"]),
            "Report tag: %s." % tag, code=", ".join(codes) if codes and "bunker" in sname.lower() else None)

for e, how in hidden_weapons:
    add_pin(e["name"], "weapons", how, "Free weapon pickup: %s." % how, e["confidence"], e["sources"],
            weapon_id=e["id"])

for n, (loc, tag, ln, row) in wish.items():
    if loc == "not given":
        continue
    vid = next((v["id"] for v in vehicles if v["name"] == n or v["name"].startswith(n)), None)
    add_pin("Wish List: " + n, "rare-vehicles", loc, strip_links(loc) + ".", confidence(tag),
            sources_for(" ".join(row), ln), "Randy's Wish List unlocks after Chapter 3 mission \"Clonin' Keys, Makin' GS\".",
            vehicle_id=vid)

t = table("Video time")
for row in t["rows"]:
    vt, area, jumps = row[:3]
    a_names = [x.strip() for x in re.split(r",| and ", area) if x.strip()]
    add_pin("Stunt jumps %s (%s)" % (jumps, area[:40]), "stunt-jumps", area,
            "Stunt jumps %s are in %s. Video timestamp %s." % (jumps, area, vt), "likely",
            sources_for(" ".join(row), t["line"])[:2],
            "Grouping from a stunt-jump video's chapters, which draws on MapGenie. Total count of 130 is confirmed.")

# ---------------------------------------------------------------- later sections
later = {}


def simple(section, tname, name_col, summary_fn, tag_col=None, extra_fn=None, prefix=None):
    t = table(tname)
    out = []
    for row in t["rows"]:
        row = row + [""] * 8
        name = strip_links(row[name_col])
        tag = row[tag_col] if tag_col is not None else ""
        e = base(uniq_id(out, (prefix or section) + "-" + slug(name)), name, section, summary_fn(row),
                 confidence(tag) if tag_col is not None else "likely", sources_for(" ".join(row), t["line"])[:3],
                 ("Report tag: %s." % tag) if tag else None)
        if extra_fn:
            e.update(extra_fn(row))
        out.append(e)
    return out


later["release"] = simple("release", "Field", 0, lambda r: strip_links(r[1]), 2, prefix="release")
later["patches"] = simple("patches", "Version", 0,
                          lambda r: "Released %s. PS5 %s, Xbox %s. Official notes: %s." % (r[1], r[2], r[3], r[4]), 5,
                          lambda r: {"version": r[0], "date": r[1], "ps5_size": r[2], "xbox_size": r[3],
                                     "official_notes": r[4]}, prefix="patch")
later["characters"] = simple("characters", "Supporting character", 0, lambda r: strip_links(r[1]), 3,
                             lambda r: {"voice_actor": r[2], "playable": False}, prefix="character")
later["character_stats"] = simple("character_stats", "Stat", 0,
                                  lambda r: "%s. Train: %s. Decays: %s." % (r[2], r[3], r[4]), 5,
                                  lambda r: {"icon": r[1], "max_level": 4, "decays": not r[4].lower().startswith("no")},
                                  prefix="stat")
later["heat_icons"] = simple("heat_icons", "Heat icon", 0, lambda r: "%s. Clear it: %s." % (r[1], r[2]),
                             prefix="heat")
later["criminal_profile"] = simple("criminal_profile", "Criminal Profile tier", 0,
                                   lambda r: "%s tier. %s" % (r[1], strip_links(r[2])), 3,
                                   lambda r: {"color": r[1]}, prefix="profile")
later["pin_counts"] = simple("pin_counts", "Group", 1, lambda r: "%s: %s in the game (%s)." % (r[1], r[2], r[0]), 3,
                             lambda r: {"group": r[0], "count": int(re.sub(r"\D", "", r[2]) or 0) or None},
                             prefix="count")
later["collectible_counts"] = simple("collectible_counts", "Category", 0,
                                     lambda r: "%s total; 100%% needs %s. %s" % (r[1], r[2], strip_links(r[4])), 3,
                                     lambda r: {"total": r[1], "required_for_100": r[2]}, prefix="collectible")
later["activities"] = simple("activities", "Activity", 0, lambda r: "Count: %s. %s" % (strip_links(r[1]), r[3]), 2,
                             prefix="activity")
later["random_events"] = simple("random_events", "Event", 0, lambda r: "%s: %s" % (r[1], r[2]), 3, prefix="event")
later["secrets"] = simple("secrets", "Secret", 0, lambda r: strip_links(r[2]), 3,
                          lambda r: {"tab": "secrets", "where": strip_links(r[1])}, prefix="secret")
later["theories"] = simple("theories", "Claim", 0, lambda r: strip_links(r[1]), 1,
                           lambda r: {"tab": "theories"}, prefix="theory")
for e in later["theories"]:
    e["confidence"] = "unverified"
hx = simple("hoaxes", "Claim", 0, lambda r: "Do not publish as fact. " + strip_links(r[1]), None,
            lambda r: {"tab": "hoaxes"}, prefix="hoax")
for e in hx:
    e["confidence"] = "unverified"
# the hoax table is the second 'Claim' table
t_h = [t for t in tables if t["header"][0] == "Claim"][1]
hx = []
for row in t_h["rows"]:
    row = row + [""] * 3
    hx.append(base(uniq_id(hx, "hoax-" + slug(strip_links(row[0]))), strip_links(row[0]), "hoaxes",
                   "Do not publish as fact. " + strip_links(row[1]), "unverified",
                   sources_for(" ".join(row), t_h["line"])[:3], None, tab="hoaxes", is_hoax=True))
later["hoaxes"] = hx
later["money_methods"] = simple("money_methods", "Method", 0,
                                lambda r: "%s. Reported payout: %s." % (r[1], strip_links(r[2])), 3,
                                lambda r: {"chapter_min": r[1], "payout_text": strip_links(r[2]),
                                           "payout_min": money(r[2])}, prefix="money")
later["cheats"] = simple("cheats", "Cheat", 0, lambda r: "Unlock: %s. Enter on phone: %s." % (r[1], r[2]), 3,
                         lambda r: {"unlock_condition": r[1],
                                    "sequence": [s.strip() for s in r[2].split(",")] if "," in r[2] else [],
                                    "sequence_known": "," in r[2], "disables_trophies": True}, prefix="cheat")
later["exploits"] = simple("exploits", "Exploit", 0, lambda r: "%s. %s" % (r[1], strip_links(r[2])), 4,
                           lambda r: {"platform": r[1], "patch_status": r[3], "last_checked": TODAY},
                           prefix="exploit")
later["properties"] = simple("properties", "Garage", 0,
                             lambda r: "Garage. List price %s; %s with BuckMe Gold discount (GTABase)." % (r[1], r[2]), 4,
                             lambda r: {"kind": "garage", "list_price": money(r[1]), "discounted_price": money(r[2]),
                                        "unlock": r[3] or None}, prefix="garage")
later["conflicts"] = simple("conflicts", "Topic", 0,
                            lambda r: "Best current reading: %s" % strip_links(r[3]), None,
                            lambda r: {"value_a": strip_links(r[1]), "value_b": strip_links(r[2])}, prefix="conflict")
later["sources"] = simple("sources", "Source", 0, lambda r: "%s. Verdict: %s. Best for: %s." % (
    strip_links(r[2]), r[3], r[4]), None, lambda r: {"source_type": r[1], "verdict": r[3],
                                                     "ingest_policy": "link_only" if "link" in r[3].lower() else "ingest"},
                          prefix="source")
for k in ("conflicts", "sources", "heat_icons"):
    for e in later[k]:
        e["confidence"] = "likely"

# ---------------------------------------------------------------- validate + write
ALL_V1 = {"weapons": weapons, "vehicles": vehicles, "missions": missions, "map_pins": pins, "trophies": trophies}
errors = []
for sec, entries in list(ALL_V1.items()) + list(later.items()):
    ids = [e["id"] for e in entries]
    if len(ids) != len(set(ids)):
        errors.append("%s: duplicate ids %s" % (sec, sorted({i for i in ids if ids.count(i) > 1})))
    for e in entries:
        if not e["sources"]:
            errors.append("%s: %s has no sources" % (sec, e["id"]))
        if e["confidence"] not in RANK:
            errors.append("%s: %s bad confidence" % (sec, e["id"]))
        for k in ("damage", "range", "accuracy", "handling", "acceleration", "speed", "strength"):
            v = e.get(k)
            if v is not None and not 0 <= v <= 100:
                errors.append("%s: %s %s out of range" % (sec, e["id"], k))
for p in pins:
    if p["category"] not in CAT_IDS or not (0 <= p["x"] <= 1000 and 0 <= p["y"] <= 1000):
        errors.append("pin %s bad category/coords" % p["id"])
if errors:
    print("\n".join(errors))
    sys.exit(1)

os.makedirs(LATER, exist_ok=True)


def dump(path, obj):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
        f.write("\n")


for sec, entries in ALL_V1.items():
    dump(os.path.join(DATA, sec + ".json"), sorted(entries, key=lambda e: e["id"]))
dump(os.path.join(DATA, "categories.json"), categories)
dump(os.path.join(DATA, "areas.json"), areas)
for sec, entries in later.items():
    dump(os.path.join(LATER, sec + ".json"), entries)
counts = {k: len(v) for k, v in ALL_V1.items()}
counts.update({"later/" + k: len(v) for k, v in later.items()})
dump(os.path.join(DATA, "changelog.json"), [OrderedDict(
    date=TODAY, section="all",
    added=["Seed data built from reports/GTA 6 launch data for tool.md: " +
           ", ".join("%s %d" % kv for kv in counts.items())],
    updated=[])])
print(json.dumps(counts, indent=1))
