import weapons from '../../data/weapons.json';
import vehicles from '../../data/vehicles.json';
import missions from '../../data/missions.json';
import map_pins from '../../data/map_pins.json';
import trophies from '../../data/trophies.json';
import categories from '../../data/categories.json';
import areas from '../../data/areas.json';
import type { AnyEntry, Area, Base, Category, MapPin, Mission, SectionName, Trophy, Vehicle, Weapon } from './schema';

type SectionMap = { weapons: Weapon; vehicles: Vehicle; missions: Mission; map_pins: MapPin; trophies: Trophy };

const DATA = { weapons, vehicles, missions, map_pins, trophies } as unknown as { [K in SectionName]: SectionMap[K][] };

export function getSection<K extends SectionName>(section: K): SectionMap[K][] {
  return DATA[section];
}

export const allEntries: AnyEntry[] = Object.values(DATA).flat() as AnyEntry[];
const byId = new Map<string, AnyEntry>(allEntries.map((e) => [e.id, e]));

export function getById(id: string): AnyEntry | undefined {
  return byId.get(id);
}

export function getCategories(): Category[] {
  return categories as Category[];
}

export function getAreas(): Area[] {
  return areas as Area[];
}

export function routeFor(entry: Base): string {
  switch (entry.section) {
    case 'map_pins': return `/map?pin=${entry.id}`;
    case 'trophies': return '/progress';
    default: return `/${entry.section}/${entry.id}`;
  }
}

export const SECTION_LABELS: Record<SectionName, string> = {
  weapons: 'Weapon', vehicles: 'Car', missions: 'Mission', map_pins: 'Map', trophies: 'Trophy',
};
