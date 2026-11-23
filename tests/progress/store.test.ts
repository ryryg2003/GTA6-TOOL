import { vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import {
  createProgressStore, emptyState, loadState, localDay, needsBackupReminder, saveState, STORAGE_KEY, useProgress,
} from '../../src/progress/store';

class MemStorage {
  data = new Map<string, string>();
  getItem(k: string) { return this.data.has(k) ? this.data.get(k)! : null; }
  setItem(k: string, v: string) { this.data.set(k, v); }
  removeItem(k: string) { this.data.delete(k); }
}
class ThrowingStorage extends MemStorage { setItem(): void { throw new Error('QuotaExceeded'); } }

test('toggle persists across a fresh load', () => {
  const st = new MemStorage();
  const store = createProgressStore(st);
  store.toggle('mission-a');
  expect(loadState(st).done['mission-a']).toBe(true);
  store.toggle('mission-a');
  expect(loadState(st).done['mission-a']).toBeUndefined();
});

test('storage whose setItem throws keeps working in memory and reports storageOk=false', () => {
  const store = createProgressStore(new ThrowingStorage());
  expect(() => store.toggle('x')).not.toThrow();
  expect(store.isDone('x')).toBe(true);
  expect(store.storageOk()).toBe(false);
});

test('missing storage (null) still works in memory', () => {
  const store = createProgressStore(null);
  store.toggle('x');
  expect(store.isDone('x')).toBe(true);
  expect(store.storageOk()).toBe(false);
});

test('corrupt stored JSON loads as empty state', () => {
  const st = new MemStorage();
  st.setItem(STORAGE_KEY, '{not json');
  expect(loadState(st)).toEqual(emptyState());
  st.setItem(STORAGE_KEY, JSON.stringify({ done: 'nope' }));
  expect(loadState(st)).toEqual(emptyState());
});

test('importBackup("not json") fails and leaves existing progress', () => {
  const store = createProgressStore(new MemStorage());
  store.toggle('keep-me');
  const r = store.importBackup('not json');
  expect(r.ok).toBe(false);
  expect(store.isDone('keep-me')).toBe(true);
});

test('importBackup rejects wrong version', () => {
  const store = createProgressStore(new MemStorage());
  expect(store.importBackup(JSON.stringify({ version: 99, done: {} })).ok).toBe(false);
});

test('export then import round-trips exactly', () => {
  const a = createProgressStore(new MemStorage());
  a.toggle('m1'); a.setPinOverride('pin-1', 10, 20);
  const json = a.exportBackup();
  const b = createProgressStore(new MemStorage());
  expect(b.importBackup(json)).toEqual({ ok: true });
  expect(b.getState().done).toEqual(a.getState().done);
  expect(b.getState().pinOverrides).toEqual({ 'pin-1': { x: 10, y: 20 } });
});


test('needsBackupReminder rules', () => {
  const today = new Date('2026-11-22T12:00:00Z');
  const one = { ...emptyState(), done: { a: true as const } };
  expect(needsBackupReminder(emptyState(), today)).toBe(false);
  expect(needsBackupReminder(one, today)).toBe(true);
  expect(needsBackupReminder({ ...one, lastBackup: '2026-11-09' }, today)).toBe(false);
  expect(needsBackupReminder({ ...one, lastBackup: '2026-11-07' }, today)).toBe(true);
});

test('unknown ids are preserved through save and load', () => {
  const st = new MemStorage();
  saveState({ ...emptyState(), done: { 'id-that-research-removed': true } }, st);
  expect(loadState(st).done['id-that-research-removed']).toBe(true);
});

test('useProgress re-renders subscribers on toggle', () => {
  const store = createProgressStore(new MemStorage());
  const { result } = renderHook(() => useProgress(store));
  expect(result.current.isDone('m')).toBe(false);
  act(() => result.current.toggle('m'));
  expect(result.current.isDone('m')).toBe(true);
});

test('corrupt stored progress is flagged and kept in a side copy before any overwrite', () => {
  const st = new MemStorage();
  st.setItem(STORAGE_KEY, '{"done":{"a":tru');
  const store = createProgressStore(st);
  expect(store.corrupt()).toBe(true);
  store.toggle('b');
  const side = [...st.data.keys()].find((k) => k.startsWith(STORAGE_KEY + ':corrupt'));
  expect(side && st.getItem(side)).toBe('{"done":{"a":tru');
});

test('healthy or empty storage is not flagged corrupt', () => {
  expect(createProgressStore(new MemStorage()).corrupt()).toBe(false);
});

test('the damaged-progress copy is saved once, not again on every launch', () => {
  const st = new MemStorage();
  st.setItem(STORAGE_KEY, 'garbage{');
  vi.useFakeTimers();
  for (const day of ['2026-11-20', '2026-11-21', '2026-11-22']) { vi.setSystemTime(new Date(day + 'T12:00:00Z')); createProgressStore(st); }
  vi.useRealTimers();
  expect([...st.data.keys()].filter((k) => k.includes(':corrupt')).length).toBe(1);
});

// #3 import confirmation + merge
test('previewBackup reports counts without changing progress', () => {
  const a = createProgressStore(new MemStorage());
  a.toggle('x'); a.toggle('y');
  const json = a.exportBackup();
  const b = createProgressStore(new MemStorage());
  b.toggle('z');
  expect(b.previewBackup(json)).toEqual({ ok: true, backupDone: 2, currentDone: 1 });
  expect(b.isDone('x')).toBe(false);
  expect(b.previewBackup('nope').ok).toBe(false);
});

test('importBackup merge mode keeps both sets of progress', () => {
  const a = createProgressStore(new MemStorage());
  a.toggle('x'); a.setPinOverride('p1', 1, 2);
  const json = a.exportBackup();
  const b = createProgressStore(new MemStorage());
  b.toggle('z'); b.setPinOverride('p2', 3, 4);
  expect(b.importBackup(json, 'merge')).toEqual({ ok: true });
  expect(Object.keys(b.getState().done).sort()).toEqual(['x', 'z']);
  expect(Object.keys(b.getState().pinOverrides).sort()).toEqual(['p1', 'p2']);
});

test('importBackup replace mode replaces progress', () => {
  const a = createProgressStore(new MemStorage());
  a.toggle('x');
  const b = createProgressStore(new MemStorage());
  b.toggle('z');
  b.importBackup(a.exportBackup(), 'replace');
  expect(Object.keys(b.getState().done)).toEqual(['x']);
});

// #4 lastBackup only set once the save is known to have happened
test('exportBackup does not mark a backup; markBackedUp does', () => {
  const a = createProgressStore(new MemStorage());
  a.exportBackup();
  expect(a.getState().lastBackup).toBeNull();
  a.markBackedUp(new Date(2026, 10, 22, 12));
  expect(a.getState().lastBackup).toBe('2026-11-22');
});

// #7 local dates, not UTC
test('localDay uses the device time zone', () => {
  const prev = process.env.TZ;
  process.env.TZ = 'America/Los_Angeles';
  try {
    expect(localDay(new Date('2026-11-23T03:00:00Z'))).toBe('2026-11-22');
  } finally { process.env.TZ = prev; }
});
