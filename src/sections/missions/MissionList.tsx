import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getSection } from '../../data/load';
import { useProgress } from '../../progress/store';
import Icon from '../../ui/Icon';
import PageHeader from '../../ui/PageHeader';
import { sortEntries } from '../stats/sortEntries';

export default function MissionList() {
  const [tab, setTab] = useState<'story' | 'side'>('story');
  const p = useProgress();
  const all = getSection('missions').filter((m) => m.type === tab);
  const rows = tab === 'story' ? sortEntries(all, 'order', 'asc') : sortEntries(all, 'name', 'asc');
  const doneCount = all.filter((m) => p.isDone(m.id)).length;

  return (
    <main className="page">
      <PageHeader title="Missions & Guides" right={`${doneCount} of ${all.length} done`} />
      <div role="tablist" className="tabs">
        {(['story', 'side'] as const).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'tab active' : 'tab'} onClick={() => setTab(t)}>
            {t === 'story' ? 'Story' : 'Side'}
          </button>
        ))}
      </div>
      <ul className="rows">
        {rows.map((m) => (
          <li key={m.id}>
            <Link className="row" to={`/missions/${m.id}`}>
              <span className="row-main">
                {tab === 'story' && m.order !== null && <span className="muted">{m.order}. </span>}
                <strong data-testid="mission-name">{m.name}</strong>
                {m.missables.length > 0 && <span className="pill-warn">Missable</span>}
                {m.steps.length === 0 && <span className="muted small"> · walkthrough coming</span>}
              </span>
              {p.isDone(m.id) ? <span aria-label="Done" className="done-mark"><Icon name="check" /></span> : <span className="chev"><Icon name="chevron" /></span>}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
