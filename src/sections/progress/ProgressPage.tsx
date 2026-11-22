import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getSection, routeFor } from '../../data/load';
import type { AnyEntry } from '../../data/schema';
import { useProgress } from '../../progress/store';
import { sortEntries } from '../stats/sortEntries';
import { summarize } from './progressSummary';

type TrackGroup = { key: string; label: string; items: AnyEntry[] };

function buildGroups(): TrackGroup[] {
  const missions = getSection('missions');
  const pins = getSection('map_pins');
  return [
    { key: 'story', label: 'Story missions', items: sortEntries(missions.filter((m) => m.type === 'story'), 'order', 'asc') },
    { key: 'side', label: 'Side missions', items: sortEntries(missions.filter((m) => m.type === 'side'), 'name', 'asc') },
    { key: 'trophies', label: 'Trophies', items: sortEntries(getSection('trophies'), 'name', 'asc') },
    ...getCategories().filter((c) => c.collectible).map((c) => ({
      key: c.id, label: c.label, items: sortEntries(pins.filter((p) => p.category === c.id), 'name', 'asc'),
    })),
  ];
}

export default function ProgressPage() {
  const p = useProgress();
  const [open, setOpen] = useState<string | null>(null);
  const groups = buildGroups();
  const sums = summarize(groups.map((g) => ({ label: g.label, ids: g.items.map((i) => i.id) })), p.isDone);
  const totalDone = sums.reduce((n, s) => n + s.done, 0), total = sums.reduce((n, s) => n + s.total, 0);

  return (
    <main className="page">
      <h1>Progress Tracker</h1>
      <p className="muted">{totalDone} of {total} tracked items done ({total ? Math.floor((totalDone / total) * 100) : 0}%)</p>
      <ul className="rows">
        {groups.map((g, i) => {
          const s = sums[i];
          const isOpen = open === g.key;
          return (
            <li key={g.key} className="group">
              <button className="group-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : g.key)}>
                <span className="group-title">{g.label}</span>
                <span className="muted">{s.done} / {s.total}</span>
                <span className="bar group-bar" aria-hidden="true"><span className="bar-fill" style={{ width: `${s.percent}%` }} /></span>
              </button>
              {isOpen && (
                <ul className="checklist">
                  {g.items.length === 0 && <li className="muted">Nothing here yet. Research will fill this in.</li>}
                  {g.items.map((item) => (
                    <li key={item.id}>
                      <label className="check-row">
                        <input type="checkbox" checked={p.isDone(item.id)} onChange={() => p.toggle(item.id)} aria-label={item.name} />
                        <span>{item.name}</span>
                      </label>
                      <Link to={routeFor(item)} className="open-link" aria-label={`Open ${item.name}`}>{item.section === 'map_pins' ? 'Map' : 'Open'}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
