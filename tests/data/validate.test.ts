import { readAllDataFiles } from '../../scripts/validate';
import { validateAll } from '../../src/data/validate';

const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x));
const real = () => clone(readAllDataFiles('data'));

test('accepts the sample data files', () => {
  const r = validateAll(real());
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
