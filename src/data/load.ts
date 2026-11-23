import weapons from '@data/weapons.json';
import vehicles from '@data/vehicles.json';
import missions from '@data/missions.json';
import trophies from '@data/trophies.json';
import categories from '@data/categories.json';
import areas from '@data/areas.json';
import changelog from '@data/changelog.json';
import type { AnyEntry, Area, Base, Category, ChangelogEntry, MapPin, Mission, SectionName, Trophy, Vehicle, Weapon } from './schema';
import { pinById } from './pins';

type SectionMap = { weapons: Weapon; vehicles: Vehicle; missions: Mission; map_pins: MapPin; trophies: Trophy };
/** Sections bundled with the app. Map pins (about 2 MB) load separately; see ./pins. */
export type BundledSection = Exclude<SectionName, 'map_pins'>;

const DATA = { weapons, vehicles, missions, trophies } as unknown as { [K in BundledSection]: SectionMap[K][] };

export function getSection<K extends BundledSection>(section: K): SectionMap[K][] {
  return DATA[section];
}

export const allEntries: AnyEntry[] = Object.values(DATA).flat() as AnyEntry[];
const byId = new Map<string, AnyEntry>(allEntries.map((e) => [e.id, e]));

/** Finds any entry. Map pins are found only once they have loaded (loadPins). */
export function getById(id: string): AnyEntry | undefined {
  return byId.get(id) ?? pinById(id);
}

export function getCategories(): Category[] {
  return categories as Category[];
}

export function getAreas(): Area[] {
  return areas as Area[];
}

export function getChangelog(): ChangelogEntry[] {
  return changelog as ChangelogEntry[];
}

export function routeFor(entry: Base): string {
  switch (entry.section) {
    case 'map_pins': return `/map?pin=${entry.id}`;
    default: return `/${entry.section}/${entry.id}`;
  }
}

export const SECTION_LABELS: Record<SectionName, string> = {
  weapons: 'Weapon', vehicles: 'Car', missions: 'Mission', map_pins: 'Map', trophies: 'Trophy',
};
