import type { Confidence } from '../data/schema';
import Icon from './Icon';

export const CONF_LABEL: Record<Confidence, string> = { confirmed: 'Confirmed', likely: 'Likely', unverified: 'Unverified' };

/** Confidence pill. Always shows the word (color is never the only signal). */
export default function ConfidenceBadge({ confidence, sources }: { confidence: Confidence; sources?: number }) {
  return (
    <span className={`badge badge-${confidence}`} title={`Confidence: ${CONF_LABEL[confidence]}`}>
      {confidence === 'confirmed' && <Icon name="check" size={13} />}
      <span>{CONF_LABEL[confidence]}</span>
      {sources !== undefined && <span>· {sources} {sources === 1 ? 'source' : 'sources'}</span>}
    </span>
  );
}

/** Small colored word for list rows. */
export function ConfWord({ confidence }: { confidence: Confidence }) {
  return <span className={`conf-word ${confidence}`}>{CONF_LABEL[confidence]}</span>;
}
