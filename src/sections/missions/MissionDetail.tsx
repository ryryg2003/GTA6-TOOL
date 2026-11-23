import { Link, useParams } from 'react-router-dom';
import { getById, routeFor } from '../../data/load';
import type { Mission } from '../../data/schema';
import { useProgress } from '../../progress/store';
import EntryMeta from '../../ui/EntryMeta';
import Icon from '../../ui/Icon';
import PageHeader from '../../ui/PageHeader';
import SourceList from '../../ui/SourceList';

function Walkthrough({ m }: { m: Mission }) {
  return (
    <>
      <h3>Objective</h3>
      <p style={{ margin: 0 }}>{m.objective ?? 'Unknown'}</p>
      <h3>Walkthrough</h3>
      {m.steps.length > 0
        ? <ol className="steps">{m.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        : <p className="muted" style={{ margin: 0 }}>Walkthrough coming. Research hasn't found a source for the steps yet.</p>}
      {m.tips.length > 0 && <><h3>Tips</h3><ul>{m.tips.map((t, i) => <li key={i}>{t}</li>)}</ul></>}
    </>
  );
}

export default function MissionDetail() {
  const { id } = useParams();
  const p = useProgress();
  const found = id ? getById(id) : undefined;
  if (!found || found.section !== 'missions') {
    return <main className="page"><PageHeader back="/missions" backLabel="Back to missions" /><p>Mission not found.</p><Link to="/missions">Back to missions</Link></main>;
  }
  const m = found as Mission;
  const done = p.isDone(m.id);
  const kind = m.type === 'story' ? `Story mission${m.order !== null ? ` ${m.order}` : ''}` : 'Side mission';
  const chapter = m.chapter == null ? '' : m.chapter === 0 ? 'Prologue · ' : `Chapter ${m.chapter} · `;
  return (
    <main className="page">
      <PageHeader back="/missions" backLabel="Back to missions" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span className="eyebrow">{chapter}{kind}{m.giver ? ` · from ${m.giver}` : ''}</span>
        <h1>{m.name}</h1>
        <EntryMeta entry={m} />
      </div>
      <div><button className={done ? 'done-btn' : 'primary'} onClick={() => p.toggle(m.id)}>
        {done ? <><Icon name="check" size={18} />Done</> : 'Mark done'}
      </button></div>
      {m.missables.length > 0 && (
        <aside role="note" aria-label="Missable items" className="warn-box missable">
          <strong>Missable: get these before you finish</strong>
          <ul>{m.missables.map((x) => <li key={x}>{x}</li>)}</ul>
        </aside>
      )}
      {m.spoiler && (m.objective || m.steps.length > 0)
        ? <details className="spoiler"><summary>Show objective and steps (story spoilers)</summary><Walkthrough m={m} /></details>
        : <section><Walkthrough m={m} /></section>}
      <section>
        <h3>Rewards</h3>
        <p style={{ margin: 0 }}>{m.rewards ?? 'Unknown'}</p>
      </section>
      {m.unlocks.length > 0 && (
        <section><h3>Unlocks</h3><ul>{m.unlocks.map((u) => {
          const e = getById(u);
          return <li key={u}>{e ? <Link to={routeFor(e)}>{e.name}</Link> : u}</li>;
        })}</ul></section>
      )}
      {m.details && <section><h3>Notes</h3><p className="notes" style={{ margin: 0 }}>{m.details}</p></section>}
      <SourceList sources={m.sources} />
    </main>
  );
}
