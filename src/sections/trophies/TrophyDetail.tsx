import { Link, useParams } from 'react-router-dom';
import { getById } from '../../data/load';
import type { Trophy } from '../../data/schema';
import { useProgress } from '../../progress/store';
import EntryMeta from '../../ui/EntryMeta';
import Icon from '../../ui/Icon';
import PageHeader from '../../ui/PageHeader';
import SourceList from '../../ui/SourceList';

export default function TrophyDetail() {
  const { id } = useParams();
  const p = useProgress();
  const found = id ? getById(id) : undefined;
  if (!found || found.section !== 'trophies') {
    return <main className="page"><PageHeader back="/progress" backLabel="Back to Progress Tracker" /><p>Trophy not found.</p><Link to="/progress">Back to Progress Tracker</Link></main>;
  }
  const t = found as Trophy;
  const done = p.isDone(t.id);
  return (
    <main className="page">
      <PageHeader back="/progress" backLabel="Back to Progress Tracker" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span className="eyebrow">Trophy</span>
        <h1>{t.name}</h1>
        <EntryMeta entry={t} />
      </div>
      <div><button className={done ? 'done-btn' : 'primary'} onClick={() => p.toggle(t.id)}>
        {done ? <><Icon name="check" size={18} />Done</> : 'Mark done'}
      </button></div>
      {t.missable && (
        <aside role="note" aria-label="Missable trophy" className="warn-box missable">
          <strong>Missable:</strong> you can lock yourself out of this one. Plan ahead.
        </aside>
      )}
      <p style={{ margin: 0 }}>{t.summary}</p>
      <section><h3>How to unlock</h3><p style={{ margin: 0 }}>{t.how_to_unlock}</p></section>
      {t.details && <section><h3>Notes</h3><p className="notes" style={{ margin: 0 }}>{t.details}</p></section>}
      <SourceList sources={t.sources} />
    </main>
  );
}
