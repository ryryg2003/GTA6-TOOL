import { readAllDataFiles } from '../../scripts/validate';
import { validateAll } from '../../src/data/validate';

const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x));
const real = () => clone(readAllDataFiles('tests/fixtures/data'));

test('the live data/ folder is valid', () => {
  const r = validateAll(readAllDataFiles('data'));
  expect(r.errors).toEqual([]);
  expect(r.ok).toBe(true);
});

test('rejects an entry with empty sources', () => {
  const f = real();
  (f.weapons as any[])[0].sources = [];
  const r = validateAll(f);
  expect(r.ok).toBe(false);
  expect(r.errors.join('\n')).toMatch(new RegExp(`${(f.weapons as any[])[0].id}.*sources`));
});

test('rejects confidence "rumor"', () => {
  const f = real();
  (f.vehicles as any[])[0].confidence = 'rumor';
  expect(validateAll(f).ok).toBe(false);
});

test('rejects duplicate ids across all files', () => {
  const f = real();
  (f.vehicles as any[])[0].id = (f.weapons as any[])[0].id;
  const r = validateAll(f);
  expect(r.ok).toBe(false);
  expect(r.errors.join('\n')).toContain('duplicate id');
});

test('allows null weapon stats', () => {
  const f = real();
  (f.weapons as any[])[0].damage = null;
  expect(validateAll(f).ok).toBe(true);
});

test('rejects a map pin with x = 1001', () => {
  const f = real();
  (f.map_pins as any[])[0].x = 1001;
  expect(validateAll(f).ok).toBe(false);
});

test('rejects a map pin whose category is not in categories.json', () => {
  const f = real();
  (f.map_pins as any[])[0].category = 'unicorns';
  const r = validateAll(f);
  expect(r.ok).toBe(false);
  expect(r.errors.join('\n')).toContain('unicorns');
});

test('rejects last_verified that is not YYYY-MM-DD', () => {
  const f = real();
  (f.missions as any[])[0].last_verified = '11/22/2026';
  expect(validateAll(f).ok).toBe(false);
});

test('rejects a javascript: source url', () => {
  const f = real();
  (f.weapons as any[])[0].sources[0].url = 'javascript:alert(1)';
  expect(validateAll(f).ok).toBe(false);
});

test('rejects a javascript: image, accepts https and site paths', () => {
  const f = real();
  (f.weapons as any[])[0].image = 'javascript:alert(1)';
  expect(validateAll(f).ok).toBe(false);
  (f.weapons as any[])[0].image = 'https://example.com/a.png';
  expect(validateAll(f).ok).toBe(true);
  (f.weapons as any[])[0].image = '/images/a.png';
  expect(validateAll(f).ok).toBe(true);
});

// #7 validator: unlock ids must exist; confirmed needs 2+ sources or an official one
test('rejects a mission unlock that points to a missing id', () => {
  const f = real();
  (f.missions as any[])[0].unlocks = ['mission-ghost'];
  const r = validateAll(f);
  expect(r.ok).toBe(false);
  expect(r.errors.join('\n')).toContain('mission-ghost');
});

test('confirmed with a single non-official source is rejected', () => {
  const f = real();
  Object.assign((f.vehicles as any[])[0], { confidence: 'confirmed', sources: [{ url: 'https://www.ign.com/x', title: 'IGN', accessed: '2026-11-22' }] });
  expect(validateAll(f).ok).toBe(false);
});

test('confirmed with one official source, or two sources, is accepted', () => {
  const f = real();
  Object.assign((f.vehicles as any[])[0], { confidence: 'confirmed', sources: [{ url: 'https://www.rockstargames.com/VI', title: 'Rockstar', accessed: '2026-11-22' }] });
  expect(validateAll(f).ok).toBe(true);
  Object.assign((f.vehicles as any[])[0], { sources: [
    { url: 'https://www.ign.com/x', title: 'IGN', accessed: '2026-11-22' },
    { url: 'https://www.gamespot.com/y', title: 'GameSpot', accessed: '2026-11-22' }] });
  expect(validateAll(f).ok).toBe(true);
});

test('a mission with an unknown (null) objective is valid', () => {
  const f = real();
  (f.missions as any[])[0].objective = null;
  expect(validateAll(f).errors).toEqual([]);
});
