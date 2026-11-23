import type { MapPin } from '../../data/schema';
import type { PinOverride } from '../../progress/store';

/** The one place to swap the map art. Coordinates are a 1000×1000 square, y grows downward. */
export const MAP_IMAGE = `${import.meta.env.BASE_URL}map/placeholder.svg`;
const FILTER_KEY = 'gta6-info-book:mapFilters';

export type Filters = { enabled: Set<string>; hideFound: boolean };
export type ShownPin = MapPin & { corrected: boolean };

export function visiblePins<T extends MapPin>(pins: T[], opts: Filters & { isDone: (id: string) => boolean }): T[] {
  return pins.filter((p) => opts.enabled.has(p.category) && !(opts.hideFound && opts.isDone(p.id)));
}

export function applyOverrides(pins: MapPin[], overrides: Record<string, PinOverride>): ShownPin[] {
  return pins.map((p) => {
    const o = overrides[p.id];
    return o ? { ...p, x: o.x, y: o.y, corrected: true } : { ...p, corrected: false };
  });
}

export function loadFilters(allCategoryIds: string[]): Filters {
  const fallback: Filters = { enabled: new Set(allCategoryIds), hideFound: false };
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
