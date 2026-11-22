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
  await userEvent.selectOptions(screen.getByLabelText('Sort by'), 'damage');
  expect(rowNames()).toEqual(['Carbine Rifle', 'Pistol', 'Pump Shotgun']);
});

test('ticking two Compare boxes enables a compare link', async () => {
  at('/weapons');
  expect(screen.queryByRole('link', { name: /Compare 2/ })).toBeNull();
  const boxes = screen.getAllByRole('checkbox');
  await userEvent.click(boxes[0]);
  await userEvent.click(boxes[1]);
  expect(screen.getByRole('link', { name: /Compare 2/ }).getAttribute('href')).toMatch(/^\/compare\/weapons\/[a-z0-9-]+\/[a-z0-9-]+$/);
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
