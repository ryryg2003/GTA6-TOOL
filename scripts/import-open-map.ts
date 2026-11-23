/**
 * Import Open GTA 6 Map locations (CC BY 4.0) into data/map_pins.json, add their categories,
 * and rebuild data/areas.json on the real map. Safe to re-run: earlier imports are replaced.
 *   npm run import:map              (downloads from the published site)
 *   npm run import:map -- <folder>  (reads a local copy of their public/data folder)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { importOpenMap, mergeCategories, OGM_BASE, type OgmCategory, type OgmLocation } from '../src/data/openMap';
import type { Category, ChangelogEntry, MapPin } from '../src/data/schema';
import { validateAll } from '../src/data/validate';
import { readAllDataFiles } from './validate';

async function load<T>(src: string | undefined, file: string): Promise<T> {
  if (src) return JSON.parse(readFileSync(join(src, file), 'utf8'));
  const res = await fetch(`${OGM_BASE}/data/${file}`);
  if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

const src = process.argv[2];
const today = new Date().toISOString().slice(0, 10);
const [locations, cats, labels, places] = await Promise.all([
  load<OgmLocation[]>(src, 'locations.json'),
  load<{ kinds: OgmCategory[] }>(src, 'categories.json'),
  load<{ name: string; x: number; y: number }[]>(src, 'labels.json'),
  load<{ name: string; x: number; y: number }[]>(src, 'places.json'),
]);

const files = readAllDataFiles('data');
const r = importOpenMap(files.map_pins as MapPin[], locations, labels, places.filter((p) => typeof p.x === 'number'), today);
files.map_pins = r.pins;
files.categories = mergeCategories(files.categories as Category[], cats.kinds);
files.areas = r.areas.map((a) => ({ id: a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), ...a }))
  .filter((a, i, all) => a.id && all.findIndex((b) => b.id === a.id) === i);
files.changelog = [...(files.changelog as ChangelogEntry[]),
  { date: today, section: 'map_pins', added: [`Imported ${r.imported} locations from Open GTA 6 Map (CC BY 4.0)`], updated: [] }];

const v = validateAll(files);
if (!v.ok) {
  console.error('Import refused. Nothing was written. Problems:');
  for (const e of v.errors.slice(0, 30)) console.error('  - ' + e);
  process.exit(1);
}
for (const f of ['map_pins', 'categories', 'areas', 'changelog']) writeFileSync(`data/${f}.json`, JSON.stringify(files[f], null, 2) + '\n');
console.log(`Imported ${r.imported} locations. ${r.unplaced} of our own pins have no known spot yet.`);
