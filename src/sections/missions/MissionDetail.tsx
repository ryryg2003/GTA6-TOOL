import { Link, useParams } from 'react-router-dom';
import { getById } from '../../data/load';
import type { Mission } from '../../data/schema';
import { useProgress } from '../../progress/store';
import EntryMeta from '../../ui/EntryMeta';
import SourceList from '../../ui/SourceList';

export default function MissionDetail() {
  const { id } = useParams();
  const p = useProgress();
  const found = id ? getById(id) : undefined;
  if (!found || found.section !== 'missions') {
    return <main className="page"><p>Mission not found.</p><Link to="/missions">Back to missions</Link></main>;
  }
  const m = found as Mission;
  const done = p.isDone(m.id);
  return (
    <main className="page">
      <Link to="/missions" className="back">← Missions</Link>
      <h1>{m.name}</h1>
      <p className="muted">{m.type === 'story' ? `Story mission${m.order !== null ? ` ${m.order}` : ''}` : 'Side mission'}{m.giver ? ` · from ${m.giver}` : ''}</p>
      <EntryMeta entry={m} />
      <button className={done ? 'done-btn' : 'primary'} onClick={() => p.toggle(m.id)}>{done ? 'Done ✓' : 'Mark done'}</button>
      {m.missables.length > 0 && (
        <aside role="note" aria-label="Missable items" className="warn-box missable">
          <strong>Missable: get these before you finish</strong>
          <ul>{m.missables.map((x) => <li key={x}>{x}</li>)}</ul>
        </aside>
      )}
      <h3>Objective</h3>
      <p>{m.objective}</p>
      {m.steps.length > 0 && <><h3>Walkthrough</h3><ol className="steps">{m.steps.map((s, i) => <li key={i}>{s}</li>)}</ol></>}
      {m.tips.length > 0 && <><h3>Tips</h3><ul>{m.tips.map((t, i) => <li key={i}>{t}</li>)}</ul></>}
      <h3>Rewards</h3>
      <p>{m.rewards ?? 'Unknown'}</p>
      {m.unlocks.length > 0 && (
        <><h3>Unlocks</h3><ul>{m.unlocks.map((u) => {
          const e = getById(u);
          return <li key={u}>{e ? <Link to={`/missions/${u}`}>{e.name}</Link> : u}</li>;
        })}</ul></>
      )}
      {m.details && <><h3>Notes</h3><p>{m.details}</p></>}
      <SourceList sources={m.sources} />
    </main>
  );
}
