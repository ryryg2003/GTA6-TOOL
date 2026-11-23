import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSection } from '../../data/load';
import type { Confidence } from '../../data/schema';
import { ConfWord } from '../../ui/ConfidenceBadge';
import Icon from '../../ui/Icon';
import PageHeader from '../../ui/PageHeader';
import { fieldOf, formatStat, GROUP_KEY, ITEM_WORD, ROW_FIELDS, SECTION_TITLE, STAT_FIELDS, type StatSection } from './fields';
import { nextSort, sortEntries, type SortState } from './sortEntries';

type Row = Record<string, unknown> & { id: string; name: string; confidence: Confidence };

export default function StatList({ section }: { section: StatSection }) {
  const all = getSection(section) as unknown as Row[];
  const [sort, setSort] = useState<SortState>({ key: 'name', dir: 'asc' });
  const [group, setGroup] = useState<string>('all');
  const [picked, setPicked] = useState<string[]>([]);
  const groupKey = GROUP_KEY[section];
  const groups = useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of all) counts.set(String(e[groupKey]), (counts.get(String(e[groupKey])) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [all, groupKey]);
  const filtered = group === 'all' ? all : all.filter((e) => String(e[groupKey]) === group);
  const rows = sortEntries(filtered, sort.key, sort.dir);
  const sortable = [{ key: 'name', label: 'Name' }, ...STAT_FIELDS[section].filter((f) => f.kind !== 'number' || f.key === 'clip_size').filter((f) => f.key !== 'fire_rate')];
  const [one, many] = ITEM_WORD[section];
  const row = ROW_FIELDS[section];

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length < 2 ? [...p, id] : p));
  const name = (id: string) => all.find((e) => e.id === id)?.name ?? id;

  return (
    <main className="page list-pad">
      <PageHeader title={SECTION_TITLE[section]} />
      <div className="chips" role="group" aria-label={section === 'weapons' ? 'Weapon type' : 'Car class'}>
        <button type="button" className="chip" aria-pressed={group === 'all'} onClick={() => setGroup('all')}>All {all.length}</button>
        {groups.map(([g, n]) => (
          <button key={g} type="button" className="chip" aria-pressed={group === g} onClick={() => setGroup(g)}>{g} {n}</button>
        ))}
      </div>
      <div className="chips" role="group" aria-label="Sort by">
        {sortable.map((f) => {
          const active = sort.key === f.key;
          const lowerWins = 'lowerWins' in f && !!f.lowerWins;
          return (
            <button key={f.key} type="button" className="chip sort-btn" aria-pressed={active}
              aria-label={active ? `Sorted by ${f.label}, ${sort.dir === 'asc' ? 'lowest' : 'highest'} first. Tap to reverse.` : `Sort by ${f.label}`}
              onClick={() => setSort(nextSort(sort, f.key, lowerWins))}>
              {f.label}{active && <Icon name={sort.dir === 'asc' ? 'arrowUp' : 'arrowDown'} size={14} />}
            </button>
          );
        })}
      </div>
      <p className="muted small" style={{ margin: 0 }}>{rows.length} {rows.length === 1 ? one : many} · tick two to compare</p>
      <ul className="rows">
        {rows.map((e) => (
          <li key={e.id} className="stat-row">
            <Link className="stat-link" to={`/${section}/${e.id}`}>
              <span className="top">
                <span className="name" data-testid="row-name">{e.name}</span>
                <span className="price">{e.price == null ? <span className="muted">Price unknown</span> : formatStat(fieldOf(section, 'price')!, e.price)}</span>
              </span>
              <span className="mini">
                {row.bars.map((k) => {
                  const f = fieldOf(section, k)!; const v = e[k];
                  return (
                    <span key={k}>{f.short} <strong>{typeof v === 'number' ? v : '?'}</strong>
                      <span className="minibar" aria-hidden="true"><i style={{ width: `${typeof v === 'number' ? v : 0}%` }} /></span>
                    </span>
                  );
                })}
                <span className="extra">{fieldOf(section, row.extra)!.short} <strong>{typeof e[row.extra] === 'number' ? String(e[row.extra]) : '?'}</strong></span>
                <ConfWord confidence={e.confidence} />
              </span>
            </Link>
            <label className="pick" title="Pick to compare">
              <input type="checkbox" aria-label={`Compare ${e.name}`} checked={picked.includes(e.id)}
                disabled={!picked.includes(e.id) && picked.length >= 2} onChange={() => toggle(e.id)} />
            </label>
          </li>
        ))}
      </ul>
      {picked.length === 2 && (
        <div className="compare-bar" role="region" aria-label="Compare picked">
          <span>{name(picked[0])} vs {name(picked[1])}</span>
          <Link to={`/compare/${section}/${picked[0]}/${picked[1]}`}>Compare</Link>
        </div>
      )}
    </main>
  );
}
