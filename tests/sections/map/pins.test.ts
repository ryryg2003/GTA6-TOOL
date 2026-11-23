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
