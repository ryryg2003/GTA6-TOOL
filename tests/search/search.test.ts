import { search } from '../../src/search/search';
import { getById, getSection, routeFor } from '../../src/data/load';

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

test('routeFor maps entries to detail routes', () => {
  expect(routeFor(getById('weapon-sample-pistol')!)).toBe('/weapons/weapon-sample-pistol');
  expect(routeFor(getById('pin-sample-card-1')!)).toBe('/map?pin=pin-sample-card-1');
  expect(routeFor(getById('trophy-sample-first')!)).toBe('/progress');
});
