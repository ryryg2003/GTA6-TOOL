import type { Base } from '../data/schema';
import ConfidenceBadge from './ConfidenceBadge';

export const STALE_DAYS = 30;

export function isStale(lastVerified: string, today: Date): boolean {
  const then = new Date(lastVerified + 'T00:00:00Z').getTime();
  return (today.getTime() - then) / 86_400_000 > STALE_DAYS;
}

export default function EntryMeta({ entry, today = new Date() }: { entry: Base; today?: Date }) {
  return (
    <div className="entry-meta">
      <ConfidenceBadge confidence={entry.confidence} />
      <span className="muted">Last checked {entry.last_verified}</span>
      {isStale(entry.last_verified, today) && <span className="stale">May be outdated</span>}
    </div>
  );
}
