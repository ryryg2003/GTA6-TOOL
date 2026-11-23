import { Link, useParams } from 'react-router-dom';
import { getById } from '../../data/load';
import { formatStat, SECTION_TITLE, STAT_FIELDS, type StatField, type StatSection } from './fields';

function winner(f: StatField, a: unknown, b: unknown): 'a' | 'b' | null {
  if (typeof a !== 'number' || typeof b !== 'number' || a === b) return null;
  const aBetter = f.lowerWins ? a < b : a > b;
  return aBetter ? 'a' : 'b';
}

export default function Compare() {
  const { section, a, b } = useParams();
  const ea = a ? getById(a) : undefined, eb = b ? getById(b) : undefined;
  if (!section || !(section in STAT_FIELDS) || !ea || !eb || ea.section !== section || eb.section !== section) {
    return <main className="page"><p>Nothing to compare: entry not found.</p><Link to="/">Back home</Link></main>;
  }
  const s = section as StatSection;
  const ra = ea as unknown as Record<string, unknown>, rb = eb as unknown as Record<string, unknown>;
  return (
    <main className="page">
      <Link to={`/${s}`} className="back">← {SECTION_TITLE[s]}</Link>
      <h1>Compare</h1>
      <table className="compare">
        <thead><tr><th></th><th><Link to={`/${s}/${ea.id}`}>{ea.name}</Link></th><th><Link to={`/${s}/${eb.id}`}>{eb.name}</Link></th></tr></thead>
        <tbody>
          {STAT_FIELDS[s].map((f) => {
            const w = winner(f, ra[f.key], rb[f.key]);
            return (
              <tr key={f.key} data-testid={`cmp-${f.key}`}>
                <th scope="row">{f.label}</th>
                <td><span className={w === 'a' ? 'win' : ''}>{formatStat(f, ra[f.key])}</span></td>
                <td><span className={w === 'b' ? 'win' : ''}>{formatStat(f, rb[f.key])}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
