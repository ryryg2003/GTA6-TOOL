import { Link, useSearchParams } from 'react-router-dom';
import { routeFor, SECTION_LABELS } from '../data/load';
import { usePins } from '../data/pins';
import { search } from '../search/search';
import { ConfWord } from '../ui/ConfidenceBadge';
import Icon from '../ui/Icon';
import PageHeader from '../ui/PageHeader';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const pins = usePins(); // re-renders once map pins have loaded, so they join the results
  const q = params.get('q') ?? '';
  const results = search(q);
  return (
    <main className="page">
      <PageHeader title="Search" search={false} />
      <label className="field">
        <Icon name="search" size={18} />
        <input type="search" autoFocus placeholder="Search…" aria-label="Search everything" value={q}
          onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })} />
      </label>
      {!q.trim() && <p className="muted">Type a name: a gun, car, mission, trophy or map pin.</p>}
      {q.trim() && results.length === 0 && <p className="muted">Nothing found for “{q}”.</p>}
      {q.trim() && !pins && <p className="muted small">Map pins are still loading; they'll show up here in a moment.</p>}
      <ul className="rows">
        {results.map((e) => (
          <li key={e.id}>
            <Link className="row" to={routeFor(e)}>
              <span className="row-main"><strong>{e.name}</strong><span className="muted"> · {SECTION_LABELS[e.section]}</span></span>
              <ConfWord confidence={e.confidence} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
