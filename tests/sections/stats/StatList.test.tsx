import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StatList from '../../../src/sections/stats/StatList';
import StatDetail from '../../../src/sections/stats/StatDetail';
import Compare from '../../../src/sections/stats/Compare';

const at = (path: string) => render(
  <MemoryRouter initialEntries={[path]}>
    <Routes>
      <Route path="/weapons" element={<StatList section="weapons" />} />
      <Route path="/:section/:id" element={<StatDetail />} />
      <Route path="/compare/:section/:a/:b" element={<Compare />} />
    </Routes>
  </MemoryRouter>,
);

const rowNames = () => screen.getAllByTestId('row-name').map((n) => n.textContent);

test('choosing Damage sort reorders rows highest first, unknown last', async () => {
  at('/weapons');
  await userEvent.click(screen.getByRole('button', { name: 'Sort by Damage' }));
  expect(rowNames()).toEqual(['Carbine Rifle', 'Pistol', 'Pump Shotgun']);
});

test('ticking two Compare boxes enables a compare link', async () => {
  at('/weapons');
  expect(screen.queryByRole('link', { name: /^Compare$/ })).toBeNull();
  const boxes = screen.getAllByRole('checkbox');
  await userEvent.click(boxes[0]);
  await userEvent.click(boxes[1]);
  expect(screen.getByRole('region', { name: 'Compare picked' })).toHaveTextContent(/ vs /);
  expect(screen.getByRole('link', { name: /^Compare$/ }).getAttribute('href')).toMatch(/^\/compare\/weapons\/[a-z0-9-]+\/[a-z0-9-]+$/);
});

test('a third compare tick is blocked', async () => {
  at('/weapons');
  const boxes = screen.getAllByRole('checkbox');
  await userEvent.click(boxes[0]);
  await userEvent.click(boxes[1]);
  expect(boxes[2]).toBeDisabled();
});

test('detail with null stats and no image shows Unknown without crashing', () => {
  at('/weapons/weapon-sample-shotgun');
  expect(screen.getByRole('heading', { name: 'Pump Shotgun' })).toBeInTheDocument();
  expect(within(screen.getByTestId('stat-damage')).getByText('Unknown')).toBeInTheDocument();
});

test('detail for a missing id shows a not-found message', () => {
  at('/weapons/does-not-exist');
  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});

test('compare highlights the higher stat, and the lower price', () => {
  at('/compare/weapons/weapon-sample-pistol/weapon-sample-shotgun');
  expect(within(screen.getByTestId('cmp-fire_rate')).getByText('40')).toHaveClass('win');
  expect(within(screen.getByTestId('cmp-price')).getByText('$500')).toHaveClass('win');
});

import { AppRoutes } from '../../../src/App';
test('real app route /vehicles/:id renders the car detail page', () => {
  render(<MemoryRouter initialEntries={['/vehicles/vehicle-sample-stinger']}><AppRoutes /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Stinger' })).toBeInTheDocument();
});

// #7 compare checks both entries belong to the section
test('compare refuses entries from another section', () => {
  at('/compare/weapons/weapon-sample-pistol/vehicle-sample-stinger');
  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});

test('tapping the active sort again reverses it, with an arrow showing the direction', async () => {
  at('/weapons');
  await userEvent.click(screen.getByRole('button', { name: 'Sort by Damage' }));
  const active = screen.getByRole('button', { name: /Sorted by Damage, highest first/ });
  expect(active).toHaveAttribute('aria-pressed', 'true');
  await userEvent.click(active);
  expect(screen.getByRole('button', { name: /Sorted by Damage, lowest first/ })).toBeInTheDocument();
  // unknown values stay last either way
  expect(rowNames().at(-1)).toBe('Pump Shotgun');
});

test('category chips filter the list and show counts', async () => {
  at('/weapons');
  const all = screen.getByRole('button', { name: /^All \d+$/ });
  expect(all).toHaveAttribute('aria-pressed', 'true');
  const chips = screen.getByRole('group', { name: 'Weapon type' }).querySelectorAll('button');
  await userEvent.click(chips[1]);
  expect(rowNames().length).toBe(Number(chips[1].textContent!.match(/(\d+)$/)![1]));
});

test('detail shows price, clip and fire-rate tiles with Unknown for missing values', () => {
  at('/weapons/weapon-sample-shotgun');
  for (const k of ['price', 'clip_size', 'fire_rate']) expect(screen.getByTestId(`stat-${k}`)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /on the map/ })).toHaveAttribute('href', expect.stringMatching(/^\/map\?find=/));
  expect(screen.getByText(/Sources \(\d+\)/)).toBeInTheDocument();
});
