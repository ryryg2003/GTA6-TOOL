import type { Category } from '../../data/schema';
import EntryMeta from '../../ui/EntryMeta';
import SourceList from '../../ui/SourceList';
import type { ShownPin } from './pins';
import { iconFor } from './icons';

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

export default function PinSheet({ pin, category, found, fixing, onToggleFound, onFix, onResetFix, onClose }: Props) {
  return (
    <section className="sheet" role="dialog" aria-label={pin.name}>
      <div className="sheet-head">
        <span className="sheet-icon" style={{ borderColor: category?.color }}>{iconFor(category?.icon)}</span>
        <div className="sheet-title">
          <h2>{pin.name}</h2>
          <span className="muted">{category?.label}{pin.area_name ? ` · ${pin.area_name}` : ''}</span>
        </div>
        <button className="icon-btn" aria-label="Close" onClick={onClose}>✕</button>
      </div>
      <EntryMeta entry={pin} />
      {pin.location_precision === 'approximate' && !pin.corrected && (
        <p className="muted small">Approximate spot (area center). Found the real one? Use “Fix location”.</p>
      )}
      {pin.corrected && <p className="muted small">You moved this pin. It's saved on this device.</p>}
      {pin.code && <p className="code">Code: <strong>{pin.code}</strong></p>}
      <p>{pin.summary}</p>
      {pin.how_to_reach && <><h3>How to get there</h3><p>{pin.how_to_reach}</p></>}
      {pin.image && <img className="entry-img" src={pin.image} alt={pin.name} />}
      <div className="controls">
        <button className={found ? 'done-btn' : 'primary'} onClick={onToggleFound}>{found ? 'Found ✓' : 'Found it'}</button>
        <button onClick={onFix}>{fixing ? 'Drag the pin, then tap here' : 'Fix location'}</button>
        {pin.corrected && <button onClick={onResetFix}>Reset location</button>}
      </div>
      <SourceList sources={pin.sources} />
    </section>
  );
}
