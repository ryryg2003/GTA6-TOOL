import { Link, useParams } from 'react-router-dom';
import { getById } from '../../data/load';
import type { Trophy } from '../../data/schema';
import { useProgress } from '../../progress/store';
import EntryMeta from '../../ui/EntryMeta';
import SourceList from '../../ui/SourceList';

export default function TrophyDetail() {
  const { id } = useParams();
  const p = useProgress();
  const found = id ? getById(id) : undefined;
  if (!found || found.section !== 'trophies') {
    return <main className="page"><p>Trophy not found.</p><Link to="/progress">Back to Progress Tracker</Link></main>;
  }
  const t = found as Trophy;
  const done = p.isDone(t.id);
  return (
    <main className="page">
      <Link to="/progress" className="back">← Progress Tracker</Link>
      <h1>{t.name}</h1>
      <EntryMeta entry={t} />
      <button className={done ? 'done-btn' : 'primary'} onClick={() => p.toggle(t.id)}>{done ? 'Done ✓' : 'Mark done'}</button>
      {t.missable && (
        <aside role="note" aria-label="Missable trophy" className="warn-box missable">
          <strong>Missable:</strong> you can lock yourself out of this one. Plan ahead.
        </aside>
      )}
      <p>{t.summary}</p>
      <h3>How to unlock</h3>
      <p>{t.how_to_unlock}</p>
      {t.details && <><h3>Notes</h3><p>{t.details}</p></>}
      <SourceList sources={t.sources} />
    </main>
  );
}
