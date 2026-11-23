import { useRef, useState } from 'react';
import type { Category } from '../../data/schema';
import ConfidenceBadge from '../../ui/ConfidenceBadge';
import { niceDate } from '../../ui/EntryMeta';
import Icon from '../../ui/Icon';
import SourceList from '../../ui/SourceList';
import type { ShownPin } from './pins';

type Props = {
  pin: ShownPin;
  category: Category | undefined;
  found: boolean;
  fixing: boolean;
  onToggleFound: () => void;
  onFix: () => void;
  onResetFix: () => void;
  onClose: () => void;
};

/** Bottom sheet. Peeks at up to 45% of the screen; drag the handle up (or tap it) for the full sheet. */
export default function PinSheet({ pin, category, found, fixing, onToggleFound, onFix, onResetFix, onClose }: Props) {
  const [expanded, setExpanded] = useState(false);
  const startY = useRef<number | null>(null);
  const howRef = useRef<HTMLElement>(null);
  const precision = pin.corrected ? 'You moved this pin' : pin.location_precision === 'approximate' ? 'Spot is approximate' : pin.location_precision === 'unknown' ? 'No known spot' : null;

  const onUp = (y: number) => {
    if (startY.current === null) return;
    const dy = y - startY.current;
    startY.current = null;
    if (dy < -30) setExpanded(true);
    else if (dy > 30) { if (expanded) setExpanded(false); else onClose(); }
    else setExpanded((v) => !v);
  };

  return (
    <section className={`sheet ${expanded ? 'expanded' : ''}`} role="dialog" aria-label={pin.name} style={{ ['--cat' as string]: category?.color }}>
      <button type="button" className="handle" aria-label={expanded ? 'Shrink details' : 'Show all details'} aria-expanded={expanded}
        onPointerDown={(e) => { startY.current = e.clientY; }}
        onPointerUp={(e) => onUp(e.clientY)}
        onPointerCancel={() => { startY.current = null; }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded((v) => !v); } }}>
        <i />
      </button>
      <div className="sheet-head">
        <div className="sheet-title">
          <span className="eyebrow">{category?.label ?? 'Pin'}{pin.area_name ? ` · ${pin.area_name}` : ''}</span>
          <h2>{pin.name}</h2>
        </div>
        <button className="icon-btn" aria-label="Close" onClick={onClose}><Icon name="close" /></button>
      </div>

      {pin.code && (
        <div className="code-box" aria-label={`Code ${pin.code.split('').join(' ')}`}>
          <span className="code">{pin.code}</span>
          <span className="hint">Code</span>
        </div>
      )}
      {!pin.code && pin.randomized && (
        <div className="code-box"><span className="code" style={{ fontSize: '1.1rem', letterSpacing: 0 }}>Random code</span><span className="hint">Changes each game</span></div>
      )}

      <div className="entry-meta">
        <ConfidenceBadge confidence={pin.confidence} sources={pin.sources.length} />
        {precision && <span className="chip-note">{precision}</span>}
        <span className="muted">Checked {niceDate(pin.last_verified)}</span>
      </div>

      <div className="actions">
        <button className={found ? 'done-btn' : 'primary'} onClick={onToggleFound} aria-pressed={found}>
          {found ? <><Icon name="check" size={18} />Found</> : 'Found it'}
        </button>
        <button onClick={() => { setExpanded(true); setTimeout(() => howRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }), 50); }}>How to get there</button>
        <button onClick={onFix} aria-pressed={fixing}>{fixing ? 'Done moving' : 'Fix spot'}</button>
      </div>
      {fixing && <p className="muted small" style={{ margin: 0 }}>Drag the pin to the right spot, then tap “Done moving”. It's saved on this device only.</p>}
      {pin.corrected && <button onClick={onResetFix}>Reset to the original spot</button>}
      {pin.location_precision === 'unknown' && !pin.corrected && (
        <p className="muted small" style={{ margin: 0 }}>Not on the map yet. Found it? Pan to the spot, tap “Fix spot”, and drag the pin there.</p>
      )}

      <p style={{ margin: 0 }}>{pin.summary}</p>
      <section ref={howRef} aria-label="How to get there">
        <h3 style={{ marginTop: 0 }}>How to get there</h3>
        <p style={{ margin: 0 }}>{pin.how_to_reach ?? (pin.area_name ? `In ${pin.area_name}. No directions yet.` : 'No directions yet.')}</p>
      </section>
      {pin.details && <p className="notes small" style={{ margin: 0 }}>{pin.details}</p>}
      {pin.image && <img className="entry-img" src={pin.image} alt={pin.name} loading="lazy" />}
      <SourceList sources={pin.sources} />
    </section>
  );
}
