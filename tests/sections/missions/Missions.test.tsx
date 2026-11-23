import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../../../src/App';

const at = (path: string) => render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>);

test('Story tab lists missions in order', () => {
  at('/missions');
  const names = screen.getAllByTestId('mission-name').map((n) => n.textContent);
  expect(names).toEqual(['Prologue (sample)', 'Second Mission (sample)']);
});

test('Side tab lists side missions', async () => {
  at('/missions');
  await userEvent.click(screen.getByRole('tab', { name: 'Side' }));
  expect(screen.getAllByTestId('mission-name').map((n) => n.textContent)).toEqual(['Side Job (sample)']);
});

test('Missable box appears only when there are missables', () => {
  const { unmount } = at('/missions/mission-sample-second');
  expect(screen.getByRole('note', { name: /missable/i })).toBeInTheDocument();
  unmount();
  at('/missions/mission-sample-intro');
  expect(screen.queryByRole('note', { name: /missable/i })).toBeNull();
});

test('Mark done shows a checkmark on the list row', async () => {
  const { unmount } = at('/missions/mission-sample-intro');
  await userEvent.click(screen.getByRole('button', { name: /mark done/i }));
  expect(screen.getByRole('button', { name: /done ✓/i })).toBeInTheDocument();
  unmount();
  at('/missions');
  const row = screen.getAllByRole('listitem')[0];
  expect(within(row).getByLabelText('Done')).toBeInTheDocument();
});

test('unknown mission id shows not found', () => {
  at('/missions/nope');
  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});

// #7 unlock links use the right route for any entry type
test('unlock links go to each entry\'s own route', () => {
  at('/missions/mission-sample-second');
  expect(screen.getByRole('link', { name: 'Prologue (sample)' })).toHaveAttribute('href', '/missions/mission-sample-intro');
  expect(screen.getByRole('link', { name: 'Pistol' })).toHaveAttribute('href', '/weapons/weapon-sample-pistol');
});

test('a mission with no known objective shows Unknown', () => {
  at('/missions/mission-sample-side');
  expect(screen.getByRole('heading', { name: 'Objective' }).nextElementSibling).toHaveTextContent('Unknown');
});
