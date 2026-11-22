import { vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import {
  createProgressStore, emptyState, loadState, needsBackupReminder, saveState, STORAGE_KEY, useProgress,
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

test('exportBackup records lastBackup', () => {
  const a = createProgressStore(new MemStorage());
  a.exportBackup(new Date('2026-11-22T12:00:00Z'));
  expect(a.getState().lastBackup).toBe('2026-11-22');
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
