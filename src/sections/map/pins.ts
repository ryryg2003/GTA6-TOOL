import { MAP_SIZE, type Category, type MapPin } from '../../data/schema';
import type { PinOverride } from '../../progress/store';

import { OGM_BASE } from '../../data/openMap';

/** Base map tiles from Open GTA 6 Map (CC BY 4.0). The one place to swap the map art. */
export const TILE_URL = `${OGM_BASE}/tiles/night/{z}/{z},{y},{x}.webp`;
export const MAP_CREDIT = '<a href="https://github.com/fbritoferreira/gta6" target="_blank" rel="noopener">Open GTA 6 Map</a> (CC BY 4.0), pins adapted';

/** Map units (y grows south) to Leaflet CRS.Simple, matching Open GTA 6 Map: lat = -y. */
export const toLatLng = (x: number, y: number): [number, number] => [-y, x];
const clamp = (v: number) => Math.round(Math.min(MAP_SIZE, Math.max(0, v)) * 10) / 10;
export const fromLatLng = (ll: { lat: number; lng: number }) => ({ x: clamp(ll.lng), y: clamp(-ll.lat) });

export type View = { minX: number; maxX: number; minY: number; maxY: number; zoom?: number };

/** Zoomed out, pins are coloured dots (fast and readable); from this zoom up they are full icons. */
export const ICON_ZOOM = 3;
export const pinStyle = (zoom: number): 'dot' | 'icon' => (zoom >= ICON_ZOOM ? 'icon' : 'dot');
/** Only pins inside the visible area (plus a margin) get drawn, so thousands of pins stay fast on a phone. */
export function inView<T extends { x: number; y: number }>(pins: T[], v: View, margin: number): T[] {
  return pins.filter((p) => p.x >= v.minX - margin && p.x <= v.maxX + margin && p.y >= v.minY - margin && p.y <= v.maxY + margin);
}

export const unplacedPins = <T extends MapPin>(pins: T[]): T[] => pins.filter((p) => p.location_precision === 'unknown');

export const defaultEnabled = (cats: Pick<Category, 'id' | 'collectible'>[]) => new Set(cats.filter((c) => c.collectible).map((c) => c.id));
const FILTER_KEY = 'gta6-info-book:mapFilters';

export type Filters = { enabled: Set<string>; hideFound: boolean };
export type ShownPin = MapPin & { corrected: boolean };

export function visiblePins<T extends MapPin>(pins: T[], opts: Filters & { isDone: (id: string) => boolean }): T[] {
  return pins.filter((p) => p.location_precision !== 'unknown' && opts.enabled.has(p.category) && !(opts.hideFound && opts.isDone(p.id)));
}

export function applyOverrides(pins: MapPin[], overrides: Record<string, PinOverride>): ShownPin[] {
  return pins.map((p) => {
    const o = overrides[p.id];
    return o ? { ...p, x: o.x, y: o.y, corrected: true } : { ...p, corrected: false };
  });
}

export function loadFilters(defaultIds: string[]): Filters {
  const fallback: Filters = { enabled: new Set(defaultIds), hideFound: false };
  try {
    const raw = JSON.parse(localStorage.getItem(FILTER_KEY) ?? 'null');
    if (!raw || !Array.isArray(raw.enabled)) return fallback;
    return { enabled: new Set(raw.enabled.filter((c: unknown) => typeof c === 'string')), hideFound: raw.hideFound === true };
  } catch {
    return fallback;
  }
}

export function saveFilters(f: Filters): void {
  try { localStorage.setItem(FILTER_KEY, JSON.stringify({ enabled: [...f.enabled], hideFound: f.hideFound })); } catch { /* per-device convenience only */ }
}
