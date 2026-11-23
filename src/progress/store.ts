import { useSyncExternalStore } from 'react';

export const STORAGE_KEY = 'gta6-info-book:v1';
export const BACKUP_DAYS = 14;

export type PinOverride = { x: number; y: number };
export type ProgressState = {
  done: Record<string, true>;
  pinOverrides: Record<string, PinOverride>;
  lastBackup: string | null;
};
type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

export const emptyState = (): ProgressState => ({ done: {}, pinOverrides: {}, lastBackup: null });

const isObj = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);

/** Returns a clean state, or null if the shape is wrong. Unknown ids are kept on purpose. */
function sanitize(raw: unknown): ProgressState | null {
  if (!isObj(raw) || !isObj(raw.done)) return null;
  const done: Record<string, true> = {};
  for (const [k, v] of Object.entries(raw.done)) if (v === true) done[k] = true;
  const pinOverrides: Record<string, PinOverride> = {};
  if (isObj(raw.pinOverrides)) {
    for (const [k, v] of Object.entries(raw.pinOverrides)) {
      if (isObj(v) && typeof v.x === 'number' && typeof v.y === 'number') pinOverrides[k] = { x: v.x, y: v.y };
    }
  }
  const lastBackup = typeof raw.lastBackup === 'string' ? raw.lastBackup : null;
  return { done, pinOverrides, lastBackup };
}

export function loadState(storage: StorageLike | null): ProgressState {
  try {
    const text = storage?.getItem(STORAGE_KEY);
    if (!text) return emptyState();
    return sanitize(JSON.parse(text)) ?? emptyState();
  } catch {
    return emptyState();
  }
}

export function saveState(state: ProgressState, storage: StorageLike | null): boolean {
  if (!storage) return false;
  try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; } catch { return false; }
}

/** YYYY-MM-DD in the device's own time zone (not UTC). */
export function localDay(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
const fromLocalDay = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

export function needsBackupReminder(state: ProgressState, today: Date): boolean {
  if (Object.keys(state.done).length === 0) return false;
  if (!state.lastBackup) return true;
  const days = (today.getTime() - fromLocalDay(state.lastBackup).getTime()) / 86_400_000;
  return days > BACKUP_DAYS;
}

/** True when something is stored under our key but it can't be read as progress. */
function storedIsCorrupt(storage: StorageLike | null): string | null {
  try {
    const text = storage?.getItem(STORAGE_KEY);
    if (!text) return null;
    try { return sanitize(JSON.parse(text)) ? null : text; } catch { return text; }
  } catch { return null; }
}

function parseBackup(json: string): { ok: true; state: ProgressState } | { ok: false; error: string } {
  let raw: unknown;
  try { raw = JSON.parse(json); } catch { return { ok: false, error: 'That file is not a progress backup (not valid JSON).' }; }
  if (!isObj(raw) || raw.version !== 1) return { ok: false, error: 'That file is not a version 1 progress backup.' };
  const clean = sanitize(raw);
  return clean ? { ok: true, state: clean } : { ok: false, error: 'The backup file is damaged.' };
}

export function createProgressStore(storage: StorageLike | null) {
  const damaged = storedIsCorrupt(storage);
  if (damaged !== null) {
    // Keep the damaged text so it is never lost to the next save.
    const copyKey = `${STORAGE_KEY}:corrupt`;
    try { if (storage?.getItem(copyKey) !== damaged) storage?.setItem(copyKey, damaged); } catch { /* best effort */ }
  }
  let state = loadState(storage);
  let ok = storage !== null;
  const listeners = new Set<() => void>();

  const commit = (next: ProgressState) => {
    state = next;
    ok = saveState(state, storage);
    listeners.forEach((l) => l());
  };

  return {
    getState: () => state,
    storageOk: () => ok,
    corrupt: () => damaged !== null,
    subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l); }; },
    isDone: (id: string) => state.done[id] === true,
    toggle(id: string) {
      const done = { ...state.done };
      if (done[id]) delete done[id]; else done[id] = true;
      commit({ ...state, done });
    },
    setPinOverride(id: string, x: number, y: number) {
      commit({ ...state, pinOverrides: { ...state.pinOverrides, [id]: { x, y } } });
    },
    clearPinOverride(id: string) {
      const pinOverrides = { ...state.pinOverrides };
      delete pinOverrides[id];
      commit({ ...state, pinOverrides });
    },
    /** The backup file's text. Does not count as a backup until markBackedUp() is called after it was saved. */
    exportBackup(now = new Date()): string {
      return JSON.stringify({ version: 1, exported: now.toISOString(), done: state.done, pinOverrides: state.pinOverrides }, null, 2);
    },
    markBackedUp(now = new Date()) {
      commit({ ...state, lastBackup: localDay(now) });
    },
    previewBackup(json: string): { ok: true; backupDone: number; currentDone: number } | { ok: false; error: string } {
      const r = parseBackup(json);
      if (!r.ok) return r;
      return { ok: true, backupDone: Object.keys(r.state.done).length, currentDone: Object.keys(state.done).length };
    },
    importBackup(json: string, mode: 'replace' | 'merge' = 'replace'): { ok: true } | { ok: false; error: string } {
      const r = parseBackup(json);
      if (!r.ok) return r;
      const b = r.state;
      const next = mode === 'merge'
        ? { done: { ...state.done, ...b.done }, pinOverrides: { ...b.pinOverrides, ...state.pinOverrides } }
        : { done: b.done, pinOverrides: b.pinOverrides };
      commit({ ...next, lastBackup: state.lastBackup });
      return { ok: true };
    },
  };
}

export type ProgressStore = ReturnType<typeof createProgressStore>;

function browserStorage(): StorageLike | null {
  try {
    const s = window.localStorage;
    const probe = STORAGE_KEY + ':probe';
    s.setItem(probe, '1'); s.removeItem(probe);
    return s;
  } catch { return null; }
}

let defaultStore: ProgressStore | null = null;
export function getDefaultStore(): ProgressStore {
  if (!defaultStore) defaultStore = createProgressStore(typeof window === 'undefined' ? null : browserStorage());
  return defaultStore;
}
/** Test helper: forget the shared store so the next call re-reads storage. */
export function resetDefaultStore() { defaultStore = null; }

export function useProgress(store: ProgressStore = getDefaultStore()) {
  const state = useSyncExternalStore(store.subscribe, store.getState);
  return {
    state,
    isDone: (id: string) => state.done[id] === true,
    toggle: store.toggle,
    setPinOverride: store.setPinOverride,
    clearPinOverride: store.clearPinOverride,
    overrides: state.pinOverrides,
    storageOk: store.storageOk(),
    corrupt: store.corrupt(),
    exportBackup: store.exportBackup,
    markBackedUp: store.markBackedUp,
    previewBackup: store.previewBackup,
    importBackup: store.importBackup,
  };
}
