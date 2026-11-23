import type { Base } from '../data/schema';
import ConfidenceBadge from './ConfidenceBadge';

export const STALE_DAYS = 30;

export function isStale(lastVerified: string, today: Date): boolean {
  const then = new Date(lastVerified + 'T00:00:00Z').getTime();
  return (today.getTime() - then) / 86_400_000 > STALE_DAYS;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "2026-11-22" → "Nov 22, 2026" */
export function niceDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return m ? `${MONTHS[m - 1]} ${d}, ${y}` : iso;
}

export default function EntryMeta({ entry, today = new Date(), children }: { entry: Base; today?: Date; children?: React.ReactNode }) {
  return (
    <div className="entry-meta">
      <ConfidenceBadge confidence={entry.confidence} sources={entry.sources.length} />
      {children}
      <span className="muted" title={entry.last_verified}>Last checked {niceDate(entry.last_verified)}</span>
      {isStale(entry.last_verified, today) && <span className="stale">May be outdated</span>}
    </div>
  );
}
