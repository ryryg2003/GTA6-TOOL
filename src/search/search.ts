import Fuse, { type IFuseOptions } from 'fuse.js';
import { allEntries } from '../data/load';
import { onPinsLoaded, pinsIfLoaded } from '../data/pins';
import type { AnyEntry, MapPin } from '../data/schema';

const OPTIONS: IFuseOptions<AnyEntry> = {
  keys: [{ name: 'name', weight: 3 }, { name: 'summary', weight: 1 }, { name: 'section', weight: 0.5 }],
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: true,
};

const main = new Fuse(allEntries, OPTIONS);
let pinFuse: Fuse<AnyEntry> | null = null;
const buildPins = (p: MapPin[]) => { pinFuse = new Fuse(p as AnyEntry[], OPTIONS); };
if (pinsIfLoaded()) buildPins(pinsIfLoaded()!);
onPinsLoaded(buildPins);

/** Searches everything. Map pins are included once they have loaded. */
export function search(query: string, limit = 20): AnyEntry[] {
  const q = query.trim();
  if (!q) return [];
  const hits = [...main.search(q, { limit }), ...(pinFuse?.search(q, { limit }) ?? [])];
  return hits.sort((a, b) => (a.score ?? 1) - (b.score ?? 1)).slice(0, limit).map((r) => r.item);
}
