import { Link, useSearchParams } from 'react-router-dom';
import { routeFor, SECTION_LABELS } from '../data/load';
import { search } from '../search/search';
import ConfidenceBadge from '../ui/ConfidenceBadge';

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const results = search(q);
  return (
    <main className="page">
      {!q.trim() && <p className="muted">Type a name: a gun, car, mission or collectible.</p>}
      {q.trim() && results.length === 0 && <p className="muted">Nothing found for “{q}”.</p>}
      <ul className="rows">
        {results.map((e) => (
          <li key={e.id}>
            <Link className="row" to={routeFor(e)}>
              <span className="row-main"><strong>{e.name}</strong><span className="muted"> · {SECTION_LABELS[e.section]}</span></span>
              <ConfidenceBadge confidence={e.confidence} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
