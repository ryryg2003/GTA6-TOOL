import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../../../src/App';
import { getById, routeFor } from '../../../src/data/load';
import { getDefaultStore } from '../../../src/progress/store';

const at = (path: string) => render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>);

// #5 trophies get a detail view
test('trophies route to their own detail page', () => {
  expect(routeFor(getById('trophy-sample-first')!)).toBe('/trophies/trophy-sample-first');
});

test('trophy detail shows how to unlock and a missable warning', () => {
  at('/trophies/trophy-sample-missable');
  expect(screen.getByRole('heading', { name: /Don't Miss It/ })).toBeInTheDocument();
  expect(screen.getByText(/how to unlock/i)).toBeInTheDocument();
  expect(screen.getByRole('note', { name: /missable/i })).toBeInTheDocument();
});

test('trophy detail Mark done updates the shared progress', async () => {
  at('/trophies/trophy-sample-first');
  await userEvent.click(screen.getByRole('button', { name: /mark done/i }));
  expect(getDefaultStore().isDone('trophy-sample-first')).toBe(true);
});

test('non-missable trophy shows no missable warning; unknown id shows not found', () => {
  const { unmount } = at('/trophies/trophy-sample-first');
  expect(screen.queryByRole('note', { name: /missable/i })).toBeNull();
  unmount();
  at('/trophies/nope');
  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});
