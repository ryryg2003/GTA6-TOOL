import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getSection, routeFor } from '../../data/load';
import { usePins } from '../../data/pins';
import type { AnyEntry, MapPin } from '../../data/schema';
import { useProgress } from '../../progress/store';
import Icon from '../../ui/Icon';
import PageHeader from '../../ui/PageHeader';
import { sortEntries } from '../stats/sortEntries';
import { missableItems, summarize } from './progressSummary';

type TrackGroup = { key: string; label: string; items: AnyEntry[] };

function buildGroups(pins: MapPin[] | null): TrackGroup[] {
  const missions = getSection('missions');
  return [
    { key: 'story', label: 'Story missions', items: sortEntries(missions.filter((m) => m.type === 'story'), 'order', 'asc') },
    { key: 'side', label: 'Side missions', items: sortEntries(missions.filter((m) => m.type === 'side'), 'name', 'asc') },
    { key: 'trophies', label: 'Trophies', items: sortEntries(getSection('trophies'), 'name', 'asc') },
    ...(pins ? getCategories().filter((c) => c.collectible).map((c) => ({
      key: c.id, label: c.label, items: sortEntries(pins.filter((p) => p.category === c.id), 'name', 'asc') as AnyEntry[],
    })) : []),
  ].filter((g) => g.items.length > 0);
}

export default function ProgressPage() {
  const p = useProgress();
  const pins = usePins();
  const [open, setOpen] = useState<string | null>(null);
  const groups = useMemo(() => buildGroups(pins), [pins]);
  const sums = summarize(groups.map((g) => ({ label: g.label, ids: g.items.map((i) => i.id) })), p.isDone);
  const totalDone = sums.reduce((n, s) => n + s.done, 0), total = sums.reduce((n, s) => n + s.total, 0);
  const missable = missableItems(getSection('missions'), getSection('trophies'), p.isDone);

  return (
    <main className="page">
      <PageHeader title="Progress" right={`${totalDone.toLocaleString('en-US')} of ${total.toLocaleString('en-US')} · ${total ? Math.floor((totalDone / total) * 100) : 0}%`} />
      {missable.length > 0 && (
        <aside role="note" aria-label="Missable warning" className="warn-box" style={{ display: 'flex', gap: 10 }}>
          <span style={{ color: 'var(--unverified)', display: 'flex' }}><Icon name="warn" /></span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <strong>{missable.length} missable {missable.length === 1 ? 'item' : 'items'} left</strong>
            <span className="small">Do these before the point where they disappear:{' '}
              {missable.slice(0, 4).map((e, i) => <span key={e.id}>{i > 0 && ', '}<Link to={routeFor(e)}>{e.name}</Link></span>)}
              {missable.length > 4 && ` and ${missable.length - 4} more`}.
            </span>
          </span>
        </aside>
      )}
      {!pins && <p className="muted small" style={{ margin: 0 }}>Loading map checklists…</p>}
      <ul className="rows">
        {groups.map((g, i) => {
          const s = sums[i];
          const isOpen = open === g.key;
          return (
            <li key={g.key} className="group">
              <button className="group-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : g.key)}>
                <span className="group-title">{g.label}</span>
                <span className="muted">{s.done} / {s.total}</span>
                <span className="bar group-bar" aria-hidden="true"><span className="bar-fill" style={{ display: 'block', width: `${s.percent}%` }} /></span>
              </button>
              {isOpen && (
                <ul className="checklist">
                  {g.items.slice(0, 400).map((item) => {
                    const pin = item.section === 'map_pins' ? (item as MapPin) : null;
                    return (
                      <li key={item.id}>
                        <label className="check-row">
                          <input type="checkbox" checked={p.isDone(item.id)} onChange={() => p.toggle(item.id)} aria-label={item.name} />
                          <span className="txt">
                            <span>{item.name}</span>
                            {pin && <span className="where">{pin.area_name ?? 'Area unknown'}{pin.location_precision === 'unknown' ? ' · spot unknown' : ''}</span>}
                          </span>
                        </label>
                        {pin?.code && <span className="inline-code" aria-label={`Code ${pin.code}`}>{pin.code}</span>}
                        <Link to={routeFor(item)} className="open-link" aria-label={`${pin ? 'Show' : 'Open'} ${item.name}${pin ? ' on map' : ''}`}>{pin ? 'Map' : 'Open'}</Link>
                      </li>
                    );
                  })}
                  {g.items.length > 400 && <li className="muted small">Showing the first 400. Use the map's search to find the rest.</li>}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
