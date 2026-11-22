import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { summarize } from '../../../src/sections/progress/progressSummary';
import { AppRoutes } from '../../../src/App';
import { getDefaultStore } from '../../../src/progress/store';

test('1 of 3 done is 33 percent', () => {
  const r = summarize([{ label: 'A', ids: ['a', 'b', 'c'] }], (id) => id === 'a');
  expect(r).toEqual([{ label: 'A', done: 1, total: 3, percent: 33 }]);
});

test('empty group is 0 percent, not NaN', () => {
  expect(summarize([{ label: 'E', ids: [] }], () => true)[0].percent).toBe(0);
});

test('done ids outside any group do not change counts', () => {
  const r = summarize([{ label: 'A', ids: ['a'] }], (id) => id === 'ghost');
  expect(r[0].done).toBe(0);
});

const at = (path: string) => render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>);

test('tracker shows groups for missions, trophies and collectible map categories', () => {
  at('/progress');
  for (const label of ['Story missions', 'Side missions', 'Trophies', 'Collectible Cards', 'Money Bags', 'Safe Codes', 'Drugs']) {
    expect(screen.getByRole('button', { name: new RegExp(label) })).toBeInTheDocument();
  }
  expect(screen.queryByRole('button', { name: /Mechanics/ })).toBeNull();
});

test('ticking an item in the tracker marks it done in the shared store', async () => {
  at('/progress');
  await userEvent.click(screen.getByRole('button', { name: /Safe Codes/ }));
  await userEvent.click(screen.getByRole('checkbox', { name: /Safe \(sample\)/ }));
  expect(getDefaultStore().isDone('pin-sample-safe-vice')).toBe(true);
  expect(screen.getByRole('button', { name: /Safe Codes.*1 \/ 1/ })).toBeInTheDocument();
});
