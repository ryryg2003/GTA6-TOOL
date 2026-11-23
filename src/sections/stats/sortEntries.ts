export type SortDir = 'asc' | 'desc';
export type SortState = { key: string; dir: SortDir };

/** Sort a copy of items by key. null/undefined always go last, in either direction. */
export function sortEntries<T>(items: T[], key: keyof T, dir: SortDir): T[] {
  const sign = dir === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const x = a[key] as unknown, y = b[key] as unknown;
    const xn = x === null || x === undefined, yn = y === null || y === undefined;
    if (xn || yn) return xn === yn ? 0 : xn ? 1 : -1;
    if (typeof x === 'number' && typeof y === 'number') return (x - y) * sign;
    return String(x).localeCompare(String(y)) * sign;
  });
}

/** Tapping the active sort flips its direction; tapping another picks it with its natural direction. */
export function nextSort(current: SortState, key: string, lowerWins = false): SortState {
  if (current.key === key) return { key, dir: current.dir === 'asc' ? 'desc' : 'asc' };
  return { key, dir: key === 'name' || lowerWins ? 'asc' : 'desc' };
}
