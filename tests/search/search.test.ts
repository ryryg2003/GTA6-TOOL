import { search } from '../../src/search/search';
import { getById, getSection, routeFor } from '../../src/data/load';
import { loadPins } from '../../src/data/pins';

test('search("stingr") returns Stinger first', () => {
  expect(search('stingr')[0]?.name).toBe('Stinger');
});

test('search("") returns nothing', () => {
  expect(search('')).toEqual([]);
  expect(search('   ')).toEqual([]);
});

test('getSection and getById return typed entries', () => {
  expect(getSection('weapons').length).toBeGreaterThan(0);
  expect(getById('vehicle-sample-stinger')?.name).toBe('Stinger');
  expect(getById('nope')).toBeUndefined();
});

test('routeFor maps entries to detail routes', async () => {
  await loadPins();
  expect(routeFor(getById('weapon-sample-pistol')!)).toBe('/weapons/weapon-sample-pistol');
  expect(routeFor(getById('pin-sample-card-1')!)).toBe('/map?pin=pin-sample-card-1');
  expect(routeFor(getById('trophy-sample-first')!)).toBe('/trophies/trophy-sample-first');
});

test('map pins load separately and then join search', async () => {
  await loadPins();
  expect(search('card').some((e) => e.section === 'map_pins')).toBe(true);
});
