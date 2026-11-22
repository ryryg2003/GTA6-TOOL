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

const isoDay = (d: Date) => d.toISOString().slice(0, 10);

export function needsBackupReminder(state: ProgressState, today: Date): boolean {
  if (Object.keys(state.done).length === 0) return false;
  if (!state.lastBackup) return true;
  const days = (today.getTime() - new Date(state.lastBackup + 'T00:00:00Z').getTime()) / 86_400_000;
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

export function createProgressStore(storage: StorageLike | null) {
  const damaged = storedIsCorrupt(storage);
  if (damaged !== null) {
    // Keep the damaged text so it is never lost to the next save.
    try { storage?.setItem(`${STORAGE_KEY}:corrupt-${new Date().toISOString()}`, damaged); } catch { /* best effort */ }
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
    exportBackup(now = new Date()): string {
      const json = JSON.stringify({ version: 1, exported: now.toISOString(), done: state.done, pinOverrides: state.pinOverrides }, null, 2);
      commit({ ...state, lastBackup: isoDay(now) });
      return json;
    },
    importBackup(json: string): { ok: true } | { ok: false; error: string } {
      let raw: unknown;
      try { raw = JSON.parse(json); } catch { return { ok: false, error: 'That file is not a progress backup (not valid JSON).' }; }
      if (!isObj(raw) || raw.version !== 1) return { ok: false, error: 'That file is not a version 1 progress backup.' };
      const clean = sanitize(raw);
      if (!clean) return { ok: false, error: 'The backup file is damaged.' };
      commit({ ...clean, lastBackup: state.lastBackup });
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
    importBackup: store.importBackup,
  };
}
