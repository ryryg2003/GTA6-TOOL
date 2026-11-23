import { Link, useParams } from 'react-router-dom';
import { getById } from '../../data/load';
import PageHeader from '../../ui/PageHeader';
import { formatStat, SECTION_TITLE, STAT_FIELDS, winner, type StatSection } from './fields';

export default function Compare() {
  const { section, a, b } = useParams();
  const ea = a ? getById(a) : undefined, eb = b ? getById(b) : undefined;
  if (!section || !(section in STAT_FIELDS) || !ea || !eb || ea.section !== section || eb.section !== section) {
    return <main className="page"><PageHeader /><p>Nothing to compare: entry not found.</p><Link to="/">Back home</Link></main>;
  }
  const s = section as StatSection;
  const ra = ea as unknown as Record<string, unknown>, rb = eb as unknown as Record<string, unknown>;
  const cell = (key: string, v: unknown, won: boolean) => (
    <td>
      <span className={won ? 'win' : ''}>{formatStat(STAT_FIELDS[s].find((f) => f.key === key)!, v)}</span>
      {won && <span className="sr-only"> (better)</span>}
    </td>
  );
  return (
    <main className="page">
      <PageHeader title="Compare" back={`/${s}`} backLabel={`Back to ${SECTION_TITLE[s]}`} />
      <table className="compare">
        <thead><tr><th></th><th><Link to={`/${s}/${ea.id}`}>{ea.name}</Link></th><th><Link to={`/${s}/${eb.id}`}>{eb.name}</Link></th></tr></thead>
        <tbody>
          {STAT_FIELDS[s].map((f) => {
            const w = winner(f, ra[f.key], rb[f.key]);
            return (
              <tr key={f.key} data-testid={`cmp-${f.key}`}>
                <th scope="row">{f.label}</th>
                {cell(f.key, ra[f.key], w === 'a')}
                {cell(f.key, rb[f.key], w === 'b')}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="muted small">▲ marks the better value. Bars are the game's 0–10 menu ratings ×10; unknown values aren't compared.</p>
    </main>
  );
}
