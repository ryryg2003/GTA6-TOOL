import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../../src/App';
import { getDefaultStore } from '../../src/progress/store';

const at = (path: string) => render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>);

test('Home shows a backup reminder once something is done and never backed up', () => {
  getDefaultStore().toggle('mission-sample-intro');
  at('/');
  expect(screen.getByText(/back up your progress/i)).toBeInTheDocument();
});

test('Home shows no reminder with zero progress', () => {
  at('/');
  expect(screen.queryByText(/back up your progress/i)).toBeNull();
});

test('Settings import with a bad file shows an error and keeps progress', async () => {
  getDefaultStore().toggle('keep');
  at('/settings');
  const file = new File(['garbage'], 'bad.json', { type: 'application/json' });
  await userEvent.upload(screen.getByLabelText(/import backup/i), file);
  expect(await screen.findByRole('alert')).toHaveTextContent(/not a progress backup/i);
  expect(getDefaultStore().isDone('keep')).toBe(true);
});

test('Settings has an export button', () => {
  at('/settings');
  expect(screen.getByRole('button', { name: /export backup/i })).toBeInTheDocument();
});
