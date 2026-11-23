import { Link, useParams } from 'react-router-dom';
import { getById, getSection } from '../../data/load';
import EntryMeta from '../../ui/EntryMeta';
import Icon from '../../ui/Icon';
import PageHeader from '../../ui/PageHeader';
import SourceList from '../../ui/SourceList';
import { fieldOf, formatStat, GROUP_KEY, SECTION_TITLE, STAT_FIELDS, TILE_FIELDS, winner, type StatSection } from './fields';
import { mostSimilar } from './similar';
import StatBar from './StatBar';

export default function StatDetail({ section: fixed }: { section?: StatSection }) {
  const params = useParams();
  const section = fixed ?? params.section;
  const id = params.id;
  const entry = id ? getById(id) : undefined;
  if (!entry || entry.section !== section || !(section in STAT_FIELDS)) {
    return <main className="page"><PageHeader /><p>Entry not found.</p><Link to="/">Back home</Link></main>;
  }
  const s = section as StatSection;
  const e = entry as unknown as Record<string, unknown>;
  const where = (s === 'weapons' ? e.unlock_how : e.where_to_find) as string | null;
  const bars = STAT_FIELDS[s].filter((f) => f.kind === 'bar' && f.key !== 'fire_rate' && f.key !== 'braking');
  const tiles = TILE_FIELDS[s].map((k) => fieldOf(s, k)!);
  const pool = getSection(s) as unknown as Record<string, unknown>[];
  const sim = mostSimilar(e, pool, GROUP_KEY[s], bars.map((b) => b.key));
  const simRows = sim ? bars.filter((b) => typeof e[b.key] === 'number' && typeof sim[b.key] === 'number').slice(0, 4) : [];

  return (
    <main className="page">
      <PageHeader back={`/${s}`} backLabel={`Back to ${SECTION_TITLE[s]}`} right={
        <Link to={`/${s}`} className="muted small">{SECTION_TITLE[s]}</Link>} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span className="eyebrow">{String(s === 'weapons' ? e.category : e.class)}</span>
        <h1 style={{ fontSize: '1.9rem' }}>{entry.name}</h1>
        <EntryMeta entry={entry} />
      </div>
      {entry.image && <img className="entry-img" src={entry.image} alt={entry.name} />}
      <p style={{ margin: 0 }}>{entry.summary}</p>

      <section className="card accent get-card" aria-label={s === 'weapons' ? 'How to get it' : 'Where to find it'}>
        <span style={{ color: 'var(--accent)', display: 'flex' }}><Icon name="pin" size={22} /></span>
        <div>
          <span className="label">{s === 'weapons' ? 'How to get it' : 'Where to find it'}</span>
          <span style={{ fontWeight: 600 }}>{where ?? 'Unknown'}</span>
        </div>
        <Link to={`/map?find=${encodeURIComponent(entry.name)}`} aria-label={`Find ${entry.name} on the map`}>Map</Link>
      </section>

      <section className="card stats" aria-label="Stats">
        {bars.map((f) => <StatBar key={f.key} field={f} value={e[f.key]} />)}
        <div className="tiles">
          {tiles.map((f) => {
            const v = formatStat(f, e[f.key]);
            return <div key={f.key} data-testid={`stat-${f.key}`}><span>{f.label}</span><strong className={v === 'Unknown' ? 'unknown' : ''}>{v}</strong></div>;
          })}
        </div>
        <p className="muted small" style={{ margin: 0 }}>Bars are the game's own 0–10 menu ratings ×10{s === 'vehicles' ? ', not tested speeds' : ', not damage per shot'}.</p>
      </section>

      {sim && simRows.length > 0 && (
        <section className="card" aria-label="Compare with a similar one" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="muted small">Similar: <Link to={`/${s}/${String(sim.id)}`}>{String(sim.name)}</Link></span>
          <div className="similar">
            <span /><span className="colhead">This</span><span className="colhead">Similar</span>
            {simRows.map((f) => {
              const w = winner(f, e[f.key], sim[f.key]);
              const cell = (v: unknown, me: boolean) => (
                <strong className={w === (me ? 'a' : 'b') ? '' : 'lose'}>
                  {String(v)}{w === (me ? 'a' : 'b') && <><span aria-hidden="true"> ▲</span><span className="sr-only"> (higher)</span></>}
                </strong>
              );
              return [<span key={f.key} className="lbl">{f.label}</span>, <span key={f.key + 'a'}>{cell(e[f.key], true)}</span>, <span key={f.key + 'b'}>{cell(sim[f.key], false)}</span>];
            })}
          </div>
          <Link to={`/compare/${s}/${entry.id}/${String(sim.id)}`} className="small">Full compare</Link>
        </section>
      )}

      {entry.details && <section><h3>Notes</h3><p className="notes" style={{ margin: 0 }}>{entry.details}</p></section>}
      <SourceList sources={entry.sources} />
    </main>
  );
}
