import type { Category, MapPin, Source } from './schema';

/** Open GTA 6 Map (https://github.com/fbritoferreira/gta6), CC BY 4.0. Same map units as ours. */
export const OGM_BASE = 'https://fbritoferreira.github.io/gta6';
export const OGM_CREDIT = 'Open GTA 6 Map (fbritoferreira), CC BY 4.0';

export type OgmLocation = {
  id: string; kind: string; x: number; y: number; name: string; type: string;
  description?: string | null; screenshot?: string | null; area?: string | null; region?: string | null;
  confidence?: string; source_urls?: string[];
};
export type OgmCategory = { key: string; name: string; colour: string; icon: string; group: string; pinnable: boolean };
export type Named = { name: string; x: number; y: number };

/** Their kinds that match categories we already had. Everything else keeps its own key as a new category. */
export const CATEGORY_MAP: Record<string, string> = {
  card: 'collectible-cards', safe: 'safe-codes', stunt: 'stunt-jumps', event: 'random-events',
  weapon: 'weapons', vehicle: 'rare-vehicles',
};
const catId = (kind: string) => CATEGORY_MAP[kind] ?? kind;

export function extractCode(text: string | null | undefined): string | null {
  const m = /\b(?:code|combination)\s*(?:is|:)?\s*(\d{3,6})\b/i.exec(text ?? '');
  return m ? m[1] : null;
}

export function convertLocation(l: OgmLocation, today: string): MapPin {
  const sources: Source[] = [{ url: `${OGM_BASE}/?id=${l.id}`, title: `${OGM_CREDIT}: ${l.name}`, accessed: today }];
  for (const u of l.source_urls ?? []) if (u.startsWith('https://')) sources.push({ url: u, title: 'Community source', accessed: today });
  const description = (l.description ?? '').trim();
  const pin: MapPin = {
    id: `pin-ogm-${l.id}`,
    name: l.name,
    section: 'map_pins',
    summary: description || `${l.type}${l.area ? ` in ${l.area}` : ''}.`,
    confidence: 'unverified',
    sources,
    last_verified: today,
    category: catId(l.kind),
    x: l.x,
    y: l.y,
    location_precision: 'exact',
    area_name: l.area ?? null,
    how_to_reach: null,
    code: extractCode(description),
  };
  if (l.screenshot) pin.image = `${OGM_BASE}/${l.screenshot}`;
  return pin;
}

export function mergeCategories(ours: Category[], theirs: OgmCategory[]): Category[] {
  const out = [...ours];
  const have = new Set(ours.map((c) => c.id));
  for (const k of theirs) {
    const id = catId(k.key);
    if (have.has(id)) continue;
    have.add(id);
    out.push({ id, label: k.name, icon: k.icon, color: k.colour, collectible: k.pinnable });
  }
  return out;
}

export function buildAreaIndex(locations: OgmLocation[], labels: Named[], places: (Named & { area?: string | null })[]) {
  const idx = new Map<string, Named>();
  const sums = new Map<string, { name: string; x: number; y: number; n: number }>();
  const add = (name: string, x: number, y: number) => {
    const k = name.toLowerCase();
    const s = sums.get(k) ?? { name, x: 0, y: 0, n: 0 };
    s.x += x; s.y += y; s.n += 1;
    sums.set(k, s);
  };
  for (const l of locations) if (l.area) add(l.area, l.x, l.y);
  // Places list their area as "Sub-area, Area": both parts are useful names to place pins by.
  for (const p of places) for (const part of (p.area ?? '').split(',').map((s) => s.trim()).filter(Boolean)) add(part, p.x, p.y);
  const round = (v: number) => Math.round(v * 10) / 10;
  for (const [k, s] of sums) idx.set(k, { name: s.name, x: round(s.x / s.n), y: round(s.y / s.n) });
  for (const n of [...labels, ...places]) if (!idx.has(n.name.toLowerCase())) idx.set(n.name.toLowerCase(), { name: n.name, x: n.x, y: n.y });
  return idx;
}

/** Our own pins were placed on the old placeholder map. Move them to their area on the real map, or mark them unplaced. */
export function placeExisting(pin: MapPin, idx: Map<string, Named>): MapPin {
  if (pin.location_precision === 'exact') return pin;
  const hit = pin.area_name ? idx.get(pin.area_name.toLowerCase()) : undefined;
  return hit
    ? { ...pin, x: hit.x, y: hit.y, location_precision: 'approximate' }
    : { ...pin, x: 0, y: 0, location_precision: 'unknown' };
}

export function importOpenMap(existing: MapPin[], locations: OgmLocation[], labels: Named[], places: Named[], today: string) {
  const idx = buildAreaIndex(locations, labels, places);
  const ours = existing.filter((p) => !p.id.startsWith('pin-ogm-')).map((p) => placeExisting(p, idx));
  const imported = locations.map((l) => convertLocation(l, today));
  const pins = [...ours, ...imported].sort((a, b) => a.id.localeCompare(b.id));
  return { pins, areas: [...idx.values()], imported: imported.length, unplaced: ours.filter((p) => p.location_precision === 'unknown').length };
}
