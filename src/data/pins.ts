import { useEffect, useState } from 'react';
import type { MapPin } from './schema';

/**
 * Map pins are about 2 MB, so they live in their own file that loads after the app opens.
 * Home and the other pages appear right away; the map, search and tracker fill in when pins arrive.
 */
let cache: MapPin[] | null = null;
let index: Map<string, MapPin> | null = null;
let pending: Promise<MapPin[]> | null = null;
const listeners = new Set<(p: MapPin[]) => void>();

export function loadPins(): Promise<MapPin[]> {
  if (cache) return Promise.resolve(cache);
  pending ??= import('@data/map_pins.json').then((m) => {
    cache = (m.default ?? m) as unknown as MapPin[];
    index = new Map(cache.map((p) => [p.id, p]));
    listeners.forEach((fn) => fn(cache!));
    return cache;
  });
  return pending;
}

/** Pins if they have loaded, otherwise null. */
export const pinsIfLoaded = (): MapPin[] | null => cache;
export const pinById = (id: string): MapPin | undefined => index?.get(id);

export function onPinsLoaded(fn: (p: MapPin[]) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** React hook: null while loading, then the pins. Starts the load on first use. */
export function usePins(): MapPin[] | null {
  const [pins, setPins] = useState<MapPin[] | null>(cache);
  useEffect(() => {
    let live = true;
    if (!cache) loadPins().then((p) => { if (live) setPins(p); });
    return () => { live = false; };
  }, []);
  return pins;
}
