import type { Confidence } from '../data/schema';

const LABEL: Record<Confidence, string> = { confirmed: 'Confirmed', likely: 'Likely', unverified: 'Unverified' };

export default function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return <span className={`badge badge-${confidence}`} title={`Confidence: ${LABEL[confidence]}`}>{LABEL[confidence]}</span>;
}
