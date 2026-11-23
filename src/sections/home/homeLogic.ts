import type { ChangelogEntry, Mission } from '../../data/schema';

/** The lowest-order story mission you haven't ticked. Null when all are done. */
export function nextStoryMission(missions: Mission[], isDone: (id: string) => boolean): Mission | null {
  let best: Mission | null = null;
  for (const m of missions) {
    if (m.type !== 'story' || m.order === null || isDone(m.id)) continue;
    if (!best || m.order < (best.order as number)) best = m;
  }
  return best;
}

export type NewSince = { since: string | null; latest: string | null; items: string[]; date: string | null };

/**
 * What's new since `lastSeen` (YYYY-MM-DD). First visit (no lastSeen): show the latest run only.
 * Duplicate lines are dropped. `latest` is what to save as the new lastSeen.
 */
export function newSince(log: ChangelogEntry[], lastSeen: string | null): NewSince {
  if (log.length === 0) return { since: lastSeen, latest: null, items: [], date: null };
  const latest = log.reduce((d, e) => (e.date > d ? e.date : d), log[0].date);
  const fresh = lastSeen ? log.filter((e) => e.date > lastSeen) : log.filter((e) => e.date === latest);
  const items = [...new Set(fresh.flatMap((e) => [...e.added, ...e.updated]))];
  return { since: lastSeen, latest, items, date: fresh.length ? latest : null };
}

const KEY = 'gta6-info-book:lastSeen';
/** Per-device "last visit" marker. Storage can throw (private mode); then it just reads as a first visit. */
export function readLastSeen(): string | null {
  try { return localStorage.getItem(KEY); } catch { return null; }
}
export function writeLastSeen(date: string): void {
  try { localStorage.setItem(KEY, date); } catch { /* per-device convenience only */ }
}

/** SVG ring numbers for a progress circle of radius r. */
export function ring(done: number, total: number, r = 26): { dash: string; pct: number } {
  const c = 2 * Math.PI * r;
  const pct = total ? Math.min(1, done / total) : 0;
  return { dash: `${(c * pct).toFixed(1)} ${c.toFixed(1)}`, pct: Math.round(pct * 100) };
}
