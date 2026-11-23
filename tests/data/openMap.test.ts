import {
  buildAreaIndex, CATEGORY_MAP, convertLocation, extractCode, importOpenMap, mergeCategories, placeExisting,
  type OgmCategory, type OgmLocation,
} from '../../src/data/openMap';
import type { Category, MapPin } from '../../src/data/schema';

const loc = (over: Partial<OgmLocation> = {}): OgmLocation => ({
  id: 'safe-007', kind: 'safe', x: 390.7, y: 243.8, name: 'Safe - Fleeca', type: 'Safe',
  description: 'Safe inside the Fleeca bank. Code: 1747.', screenshot: 'screenshots/safe-007.jpg',
  area: 'Vice City', region: 'vice', confidence: 'community', source_urls: [], ...over,
});

test('extractCode finds a code but not a dollar amount', () => {
  expect(extractCode('Safe inside the Fleeca bank. Code: 1747.')).toBe('1747');
  expect(extractCode('Safe code: 7869.')).toBe('7869');
  expect(extractCode('a safe box with $1000')).toBeNull();
  expect(extractCode('')).toBeNull();
});

test('convertLocation makes a valid exact pin with credit, code, image and mapped category', () => {
  const p = convertLocation(loc(), '2026-11-23');
  expect(p).toMatchObject({
    id: 'pin-ogm-safe-007', section: 'map_pins', category: 'safe-codes', x: 390.7, y: 243.8,
    location_precision: 'exact', area_name: 'Vice City', code: '1747', confidence: 'unverified',
    image: 'https://fbritoferreira.github.io/gta6/screenshots/safe-007.jpg', last_verified: '2026-11-23',
  });
  expect(p.sources[0].url).toBe('https://fbritoferreira.github.io/gta6/?id=safe-007');
  expect(p.sources[0].title).toMatch(/Open GTA 6 Map.*CC BY 4\.0/);
});

test('convertLocation falls back to a summary when there is no description, and keeps only https source urls', () => {
  const p = convertLocation(loc({ description: '', area: undefined, screenshot: null, kind: 'meteorite', type: 'Meteorite',
    source_urls: ['https://www.reddit.com/r/GTA6/x', 'http://insecure.example/y'] }), '2026-11-23');
  expect(p.summary).toBe('Meteorite.');
  expect(p.category).toBe('meteorite');
  expect(p.image).toBeUndefined();
  expect(p.sources.map((s) => s.url)).toEqual(['https://fbritoferreira.github.io/gta6/?id=safe-007', 'https://www.reddit.com/r/GTA6/x']);
});

test('mergeCategories keeps ours, maps overlaps, adds new kinds with collectible = pinnable', () => {
  const ours: Category[] = [{ id: 'safe-codes', label: 'Safe codes', icon: 'lock', color: '#ffd400', collectible: true }];
  const theirs: OgmCategory[] = [
    { key: 'safe', name: 'Safes', colour: '#111111', icon: '🔐', group: 'Crime', pinnable: true },
    { key: 'meteorite', name: 'Meteorites', colour: '#222222', icon: '☄️', group: 'Collectibles', pinnable: true },
    { key: 'bank', name: 'Banks', colour: '#333333', icon: '🏦', group: 'Places', pinnable: false },
  ];
  const r = mergeCategories(ours, theirs);
  expect(r.map((c) => c.id)).toEqual(['safe-codes', 'meteorite', 'bank']);
  expect(r[1]).toEqual({ id: 'meteorite', label: 'Meteorites', icon: '☄️', color: '#222222', collectible: true });
  expect(r[2].collectible).toBe(false);
  expect(CATEGORY_MAP.safe).toBe('safe-codes');
});

test('buildAreaIndex averages locations per area and adds labels and places, case-insensitive', () => {
  const idx = buildAreaIndex(
    [loc({ area: 'Hamlet', x: 100, y: 200 }), loc({ area: 'Hamlet', x: 300, y: 400 })],
    [{ name: 'Vice City', x: 500, y: 490 }],
    [{ name: 'Cottonmouth Lake', x: 410, y: 300 }],
  );
  expect(idx.get('hamlet')).toEqual({ name: 'Hamlet', x: 200, y: 300 });
  expect(idx.get('vice city')).toEqual({ name: 'Vice City', x: 500, y: 490 });
  expect(idx.get('cottonmouth lake')).toEqual({ name: 'Cottonmouth Lake', x: 410, y: 300 });
});

const ourPin = (area: string | null): MapPin => ({
  id: 'pin-x', name: 'X', section: 'map_pins', summary: 's', confidence: 'likely',
  sources: [{ url: 'https://a.example', title: 'A', accessed: '2026-11-22' }], last_verified: '2026-11-22',
  category: 'secrets', x: 1, y: 1, location_precision: 'approximate', area_name: area, how_to_reach: null, code: null,
});

test('placeExisting moves a pin to its area centre, or marks it unknown when the area is not known', () => {
  const idx = buildAreaIndex([], [{ name: 'Hamlet', x: 200, y: 300 }], []);
  expect(placeExisting(ourPin('Hamlet'), idx)).toMatchObject({ x: 200, y: 300, location_precision: 'approximate' });
  expect(placeExisting(ourPin('Unknown (placed at Vice City center)'), idx).location_precision).toBe('unknown');
  expect(placeExisting(ourPin(null), idx).location_precision).toBe('unknown');
});

test('placeExisting leaves exact pins alone', () => {
  const p = { ...ourPin('Nowhere'), location_precision: 'exact' as const, x: 5, y: 6 };
  expect(placeExisting(p, buildAreaIndex([], [], []))).toEqual(p);
});

test('importOpenMap replaces earlier imported pins and keeps our own', () => {
  const existing = [ourPin('Hamlet'), { ...ourPin('Hamlet'), id: 'pin-ogm-old-001' }];
  const r = importOpenMap(existing, [loc()], [], [], '2026-11-23');
  expect(r.pins.map((p) => p.id).sort()).toEqual(['pin-ogm-safe-007', 'pin-x']);
});

test('buildAreaIndex learns sub-areas from places whose area lists "Sub, Area"', () => {
  const idx = buildAreaIndex([], [], [
    { name: 'Vice Regal', x: 550, y: 420, area: 'Washington Beach, Vice Beach' },
    { name: 'Other', x: 560, y: 430, area: 'Washington Beach, Vice Beach' },
  ]);
  expect(idx.get('washington beach')).toEqual({ name: 'Washington Beach', x: 555, y: 425 });
});
