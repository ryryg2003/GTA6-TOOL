import type { Source } from '../data/schema';
import { niceDate } from './EntryMeta';

/** Sources, folded away so they don't crowd the page. */
export default function SourceList({ sources }: { sources: Source[] }) {
  return (
    <details className="sources">
      <summary>Sources ({sources.length})</summary>
      <ul>
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noreferrer noopener">{s.title}</a>
            <span className="muted"> · read {niceDate(s.accessed)}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
