import { vi } from 'vitest';
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

test('Home warns when saved progress was damaged', () => {
  localStorage.setItem('gta6-info-book:v1', 'garbage{');
  at('/');
  expect(screen.getByText(/saved progress was damaged/i)).toBeInTheDocument();
});

// #3 import asks first, with counts
test('importing a good backup asks before changing anything, then merges on request', async () => {
  const store = getDefaultStore();
  store.toggle('mine');
  const backup = JSON.stringify({ version: 1, done: { a: true, b: true }, pinOverrides: {} });
  at('/settings');
  await userEvent.upload(screen.getByLabelText(/import backup/i), new File([backup], 'b.json', { type: 'application/json' }));
  expect(await screen.findByText(/backup has 2 done.*you have 1/i)).toBeInTheDocument();
  expect(store.isDone('a')).toBe(false);
  await userEvent.click(screen.getByRole('button', { name: /^merge/i }));
  expect(store.isDone('a') && store.isDone('mine')).toBe(true);
});

// #4 share sheet when available, and lastBackup only after it succeeds
test('export uses the share sheet when files can be shared, and marks the backup after', async () => {
  const share = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { canShare: () => true, share });
  getDefaultStore().toggle('a');
  at('/settings');
  await userEvent.click(screen.getByRole('button', { name: /export backup/i }));
  expect(share).toHaveBeenCalledTimes(1);
  expect(share.mock.calls[0][0].files[0].name).toMatch(/^gta6-progress-\d{4}-\d{2}-\d{2}\.json$/);
  expect(getDefaultStore().getState().lastBackup).not.toBeNull();
  delete (navigator as any).canShare; delete (navigator as any).share;
});

test('a cancelled share does not count as a backup', async () => {
  const share = vi.fn().mockRejectedValue(Object.assign(new Error('cancel'), { name: 'AbortError' }));
  Object.assign(navigator, { canShare: () => true, share });
  at('/settings');
  await userEvent.click(screen.getByRole('button', { name: /export backup/i }));
  expect(getDefaultStore().getState().lastBackup).toBeNull();
  delete (navigator as any).canShare; delete (navigator as any).share;
});
