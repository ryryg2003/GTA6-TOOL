import { Link, useParams } from 'react-router-dom';
import { getById } from '../../data/load';
import EntryMeta from '../../ui/EntryMeta';
import SourceList from '../../ui/SourceList';
import { SECTION_TITLE, STAT_FIELDS, type StatSection } from './fields';
import StatBar from './StatBar';

export default function StatDetail({ section: fixed }: { section?: StatSection }) {
  const params = useParams();
  const section = fixed ?? params.section;
  const id = params.id;
  const entry = id ? getById(id) : undefined;
  if (!entry || entry.section !== section || !(section in STAT_FIELDS)) {
    return <main className="page"><p>Entry not found.</p><Link to="/">Back home</Link></main>;
  }
  const s = section as StatSection;
  const e = entry as unknown as Record<string, unknown>;
  const where = s === 'weapons' ? e.unlock_how : e.where_to_find;
  return (
    <main className="page">
      <Link to={`/${s}`} className="back">← {SECTION_TITLE[s]}</Link>
      <h1>{entry.name}</h1>
      <p className="muted">{String(s === 'weapons' ? e.category : e.class)}</p>
      <EntryMeta entry={entry} />
      {entry.image && <img className="entry-img" src={entry.image} alt={entry.name} />}
      <p>{entry.summary}</p>
      <div className="stats">{STAT_FIELDS[s].map((f) => <StatBar key={f.key} field={f} value={e[f.key]} />)}</div>
      <h3>{s === 'weapons' ? 'How to get it' : 'Where to find it'}</h3>
      <p>{where ? String(where) : 'Unknown'}</p>
      {entry.details && <><h3>Notes</h3><p>{entry.details}</p></>}
      <SourceList sources={entry.sources} />
    </main>
  );
}
