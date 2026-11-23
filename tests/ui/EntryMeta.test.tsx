import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import EntryMeta, { isStale } from '../../src/ui/EntryMeta';
import { AppRoutes } from '../../src/App';
import type { Base } from '../../src/data/schema';

const entry = (over: Partial<Base>): Base => ({
  id: 'x', name: 'X', section: 'weapons', summary: 's', confidence: 'unverified',
  sources: [{ url: 'https://example.com', title: 'Ex', accessed: '2026-11-01' }],
  last_verified: '2026-11-20', ...over,
});

test('isStale is true past 30 days', () => {
  expect(isStale('2026-10-01', new Date('2026-11-22'))).toBe(true);
  expect(isStale('2026-11-01', new Date('2026-11-22'))).toBe(false);
});

test('EntryMeta shows Unverified for unverified entries', () => {
  render(<EntryMeta entry={entry({})} today={new Date('2026-11-22')} />);
  expect(screen.getByText('Unverified')).toBeInTheDocument();
  expect(screen.getByText(/Last checked/)).toHaveTextContent('Nov 20, 2026');
});

test('EntryMeta shows May be outdated for stale entries', () => {
  render(<EntryMeta entry={entry({ last_verified: '2026-09-01' })} today={new Date('2026-11-22')} />);
  expect(screen.getByText(/May be outdated/)).toBeInTheDocument();
});

test('Home has a search box; other screens have a search button', () => {
  window.location.hash = '#/';
  const { unmount } = render(<HashRouter><AppRoutes /></HashRouter>);
  expect(screen.getByRole('searchbox')).toBeInTheDocument();
  unmount();
  window.location.hash = '#/weapons';
  render(<HashRouter><AppRoutes /></HashRouter>);
  expect(screen.getByRole('link', { name: 'Search' })).toHaveAttribute('href', '#/search');
});
