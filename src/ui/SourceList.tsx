import type { Source } from '../data/schema';

export default function SourceList({ sources }: { sources: Source[] }) {
  return (
    <section className="sources">
      <h3>Sources</h3>
      <ul>
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noreferrer noopener">{s.title}</a>
            <span className="muted"> · read {s.accessed}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
