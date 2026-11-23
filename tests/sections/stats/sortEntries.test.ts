import { sortEntries } from '../../../src/sections/stats/sortEntries';

const items = [{ id: 'a', damage: 40 }, { id: 'b', damage: null }, { id: 'c', damage: 80 }];

test('desc puts nulls last', () => {
  expect(sortEntries(items, 'damage', 'desc').map((i) => i.damage)).toEqual([80, 40, null]);
});

test('asc puts nulls last', () => {
  expect(sortEntries(items, 'damage', 'asc').map((i) => i.damage)).toEqual([40, 80, null]);
});

test('sorts strings alphabetically and does not mutate input', () => {
  const named = [{ name: 'b' }, { name: 'a' }];
  expect(sortEntries(named, 'name', 'asc').map((i) => i.name)).toEqual(['a', 'b']);
  expect(named[0].name).toBe('b');
});
