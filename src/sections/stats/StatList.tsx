import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getSection } from '../../data/load';
import ConfidenceBadge from '../../ui/ConfidenceBadge';
import { formatStat, GROUP_KEY, SECTION_TITLE, STAT_FIELDS, type StatSection } from './fields';
import { sortEntries } from './sortEntries';

export default function StatList({ section }: { section: StatSection }) {
  const fields = STAT_FIELDS[section];
  const [sortKey, setSortKey] = useState<string>('name');
  const [group, setGroup] = useState<string>('all');
  const [picked, setPicked] = useState<string[]>([]);
  const all = getSection(section) as unknown as Record<string, unknown>[];
  const groups = [...new Set(all.map((e) => String(e[GROUP_KEY[section]])))].sort();
  const filtered = group === 'all' ? all : all.filter((e) => String(e[GROUP_KEY[section]]) === group);
  const sortField = fields.find((f) => f.key === sortKey);
  const dir = sortKey === 'name' || sortField?.lowerWins ? 'asc' : 'desc';
  const rows = sortEntries(filtered, sortKey, dir);

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length < 2 ? [...p, id] : p));

  return (
    <main className="page">
      <h1>{SECTION_TITLE[section]}</h1>
      <div className="controls">
        <label>Sort by{' '}
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="name">Name</option>
            {fields.map((f) => <option key={f.key} value={f.key}>{f.label}</option>)}
          </select>
        </label>
        <label>Type{' '}
          <select value={group} onChange={(e) => setGroup(e.target.value)}>
            <option value="all">All</option>
            {groups.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </label>
      </div>
      <ul className="rows">
        {rows.map((e) => {
          const id = String(e.id);
          return (
            <li key={id} className="row-with-check">
              <Link className="row" to={`/${section}/${id}`}>
                <span className="row-main">
                  <strong data-testid="row-name">{String(e.name)}</strong>
                  {sortField && <span className="muted"> · {sortField.label}: {formatStat(sortField, e[sortField.key])}</span>}
                </span>
                <ConfidenceBadge confidence={e.confidence as never} />
              </Link>
              <label className="check" title="Pick to compare">
                <input type="checkbox" aria-label={`Compare ${String(e.name)}`} checked={picked.includes(id)}
                  disabled={!picked.includes(id) && picked.length >= 2} onChange={() => toggle(id)} />
              </label>
            </li>
          );
        })}
      </ul>
      {picked.length === 2 && (
        <Link className="compare-fab" to={`/compare/${section}/${picked[0]}/${picked[1]}`}>Compare 2 →</Link>
      )}
    </main>
  );
}
