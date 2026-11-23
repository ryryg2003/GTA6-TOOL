import { formatStat, type StatField } from './fields';

export default function StatBar({ field, value }: { field: StatField; value: unknown }) {
  const known = typeof value === 'number';
  return (
    <div className="stat" data-testid={`stat-${field.key}`}>
      <div className="stat-head"><span>{field.label}</span><strong className={known ? '' : 'muted'}>{formatStat(field, value)}</strong></div>
      {field.kind === 'bar' && (
        <div className="bar" aria-hidden="true"><div className="bar-fill" style={{ width: known ? `${value}%` : '0%' }} /></div>
      )}
    </div>
  );
}
