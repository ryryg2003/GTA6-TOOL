import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { newSince, nextStoryMission, readLastSeen, ring, writeLastSeen } from '../../../src/sections/home/homeLogic';
import { AppRoutes } from '../../../src/App';
import { getDefaultStore } from '../../../src/progress/store';
import type { ChangelogEntry, Mission } from '../../../src/data/schema';

const m = (id: string, order: number | null, type: 'story' | 'side' = 'story') => ({ id, order, type } as Mission);

test('next story mission is the lowest-order one not done, skipping side missions', () => {
  const list = [m('c', 3), m('a', 1), m('s', 0, 'side'), m('b', 2)];
  expect(nextStoryMission(list, () => false)?.id).toBe('a');
  expect(nextStoryMission(list, (id) => id === 'a')?.id).toBe('b');
  expect(nextStoryMission(list, () => true)).toBeNull();
});

const log: ChangelogEntry[] = [
  { date: '2026-11-22', section: 'all', added: ['A'], updated: [] },
  { date: '2026-11-23', section: 'map_pins', added: ['B'], updated: ['C'] },
  { date: '2026-11-23', section: 'map_pins', added: ['B'], updated: [] },
];

test('new since last visit lists only later runs, without duplicates', () => {
  expect(newSince(log, '2026-11-22')).toMatchObject({ items: ['B', 'C'], latest: '2026-11-23', date: '2026-11-23' });
  expect(newSince(log, '2026-11-23').items).toEqual([]);
});

test('first visit shows just the latest run', () => {
  expect(newSince(log, null).items).toEqual(['B', 'C']);
  expect(newSince([], null).items).toEqual([]);
});

test('lastSeen survives storage that throws (private mode)', () => {
  const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('denied'); });
  const spy2 = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('denied'); });
  expect(readLastSeen()).toBeNull();
  expect(() => writeLastSeen('2026-11-23')).not.toThrow();
  spy.mockRestore(); spy2.mockRestore();
});

test('progress ring is empty at 0, full at 100%, and never overflows', () => {
  expect(ring(0, 10).pct).toBe(0);
  expect(ring(10, 10).pct).toBe(100);
  expect(ring(12, 10).pct).toBe(100);
  expect(ring(0, 0).pct).toBe(0);
});

test('Home shows the next story mission card and the section grid', () => {
  getDefaultStore().toggle('mission-sample-intro');
  render(<MemoryRouter><AppRoutes /></MemoryRouter>);
  const card = screen.getByRole('link', { name: /Next story mission: Second Mission/ });
  expect(card).toHaveAttribute('href', '/missions/mission-sample-second');
  expect(screen.getByRole('link', { name: /^Weapons/ })).toBeInTheDocument();
});
