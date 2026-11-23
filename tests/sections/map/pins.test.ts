import { applyOverrides, loadFilters, saveFilters, visiblePins } from '../../../src/sections/map/pins';
import { getSection } from '../../../src/data/load';

const pins = getSection('map_pins');
const allCats = new Set(['drugs', 'collectible-cards', 'money-bags', 'stores', 'paint-spray', 'mechanics', 'garages', 'safe-codes']);

test('only enabled categories are visible', () => {
  const v = visiblePins(pins, { enabled: new Set(['safe-codes']), hideFound: false, isDone: () => false });
  expect(v.map((p) => p.category)).toEqual(['safe-codes']);
});

test('hideFound removes done pins', () => {
  const v = visiblePins(pins, { enabled: allCats, hideFound: true, isDone: (id) => id === 'pin-sample-card-1' });
  expect(v.find((p) => p.id === 'pin-sample-card-1')).toBeUndefined();
  expect(v.length).toBe(pins.length - 1);
});

test('applyOverrides moves a pin and marks it corrected', () => {
  const r = applyOverrides(pins, { 'pin-sample-mechanic': { x: 11, y: 22 } });
  const m = r.find((p) => p.id === 'pin-sample-mechanic')!;
  expect([m.x, m.y, m.corrected]).toEqual([11, 22, true]);
  expect(r.find((p) => p.id === 'pin-sample-card-1')!.corrected).toBe(false);
});

test('override for a missing id is ignored without throwing', () => {
  expect(() => applyOverrides(pins, { ghost: { x: 1, y: 1 } })).not.toThrow();
  expect(applyOverrides(pins, { ghost: { x: 1, y: 1 } })).toHaveLength(pins.length);
});

test('filters round-trip through storage and default to all categories on', () => {
  expect(loadFilters([...allCats]).enabled.size).toBe(allCats.size);
  saveFilters({ enabled: new Set(['drugs']), hideFound: true });
  const f = loadFilters([...allCats]);
  expect([...f.enabled]).toEqual(['drugs']);
  expect(f.hideFound).toBe(true);
});

test('corrupt saved filters fall back to defaults', () => {
  localStorage.setItem('gta6-info-book:mapFilters', '{oops');
  expect(loadFilters(['drugs', 'stores']).enabled.size).toBe(2);
});

import { defaultEnabled, fromLatLng, inView, toLatLng, unplacedPins } from '../../../src/sections/map/pins';

test('map units convert to Leaflet coordinates the way Open GTA 6 Map does (lat = -y) and back', () => {
  expect(toLatLng(500, 300)).toEqual([-300, 500]);
  expect(fromLatLng({ lat: -300.4, lng: 500.6 })).toEqual({ x: 500.6, y: 300.4 });
  expect(fromLatLng({ lat: 50, lng: -5 })).toEqual({ x: 0, y: 0 });
});

test('unplaced pins are never drawn but are listed', () => {
  const unknown = { ...pins[0], id: 'u', location_precision: 'unknown' as const };
  const all = [...pins, unknown];
  expect(visiblePins(all, { enabled: allCats, hideFound: false, isDone: () => false }).some((p) => p.id === 'u')).toBe(false);
  expect(unplacedPins(all).map((p) => p.id)).toEqual(['u']);
});

test('inView keeps only pins inside the visible area plus a margin', () => {
  const view = { minX: 100, maxX: 200, minY: 100, maxY: 200 };
  const p = (x: number, y: number) => ({ ...pins[0], x, y });
  expect(inView([p(150, 150), p(205, 150), p(400, 400)], view, 10).map((q) => q.x)).toEqual([150, 205]);
});

test('by default only collectible categories are on, so 3,000+ shops and services do not flood the map', () => {
  const cats = [{ id: 'safe-codes', collectible: true }, { id: 'bank', collectible: false }] as any;
  expect([...defaultEnabled(cats)]).toEqual(['safe-codes']);
});

import { pinStyle } from '../../../src/sections/map/pins';
test('pins are small dots when zoomed out and full icons when zoomed in', () => {
  expect(pinStyle(0)).toBe('dot');
  expect(pinStyle(2.5)).toBe('dot');
  expect(pinStyle(3)).toBe('icon');
  expect(pinStyle(6)).toBe('icon');
});
