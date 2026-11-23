import { nextSort } from '../../../src/sections/stats/sortEntries';
import { mostSimilar } from '../../../src/sections/stats/similar';
import { formatStat, winner } from '../../../src/sections/stats/fields';
import { missableItems } from '../../../src/sections/progress/progressSummary';

test('nextSort: a new field starts high-to-low (name and price low-to-high); same field flips', () => {
  expect(nextSort({ key: 'name', dir: 'asc' }, 'damage')).toEqual({ key: 'damage', dir: 'desc' });
  expect(nextSort({ key: 'damage', dir: 'desc' }, 'damage')).toEqual({ key: 'damage', dir: 'asc' });
  expect(nextSort({ key: 'damage', dir: 'asc' }, 'damage')).toEqual({ key: 'damage', dir: 'desc' });
  expect(nextSort({ key: 'damage', dir: 'desc' }, 'price', true)).toEqual({ key: 'price', dir: 'asc' });
  expect(nextSort({ key: 'damage', dir: 'desc' }, 'name')).toEqual({ key: 'name', dir: 'asc' });
});

test('mostSimilar picks the closest in the same category, ignoring unknowns', () => {
  const me = { id: 'a', category: 'Rifle', damage: 50, range: 60 };
  const pool = [me,
    { id: 'b', category: 'Rifle', damage: 90, range: 90 },
    { id: 'c', category: 'Rifle', damage: 52, range: null },
    { id: 'd', category: 'Pistol', damage: 50, range: 60 },
    { id: 'e', category: 'Rifle', damage: null, range: null }];
  expect(mostSimilar(me, pool, 'category', ['damage', 'range'])?.id).toBe('c');
  expect(mostSimilar({ id: 'z', category: 'None', damage: 1, range: 1 } as (typeof pool)[number], pool, 'category', ['damage'])).toBeNull();
});

test('winner: higher bar wins, lower price wins, unknown never wins', () => {
  const bar = { key: 'damage', label: 'Damage', kind: 'bar' as const };
  const price = { key: 'price', label: 'Price', kind: 'money' as const, lowerWins: true };
  expect(winner(bar, 60, 50)).toBe('a');
  expect(winner(price, 900, 500)).toBe('b');
  expect(winner(bar, null, 50)).toBeNull();
  expect(winner(bar, 50, 50)).toBeNull();
  expect(formatStat(price, 0)).toBe('Free');
  expect(formatStat(price, null)).toBe('Unknown');
});

test('missableItems lists undone missions with missables and missable trophies', () => {
  const missions = [{ id: 'm1', missables: ['x'] }, { id: 'm2', missables: [] }, { id: 'm3', missables: ['y'] }];
  const trophies = [{ id: 't1', missable: true }, { id: 't2', missable: false }];
  expect(missableItems(missions, trophies, (id) => id === 'm3').map((e) => e.id)).toEqual(['m1', 't1']);
});
