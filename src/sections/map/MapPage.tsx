import L from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { AttributionControl, CircleMarker, MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';
import { getCategories, getSection } from '../../data/load';
import { MAP_SIZE, type Category } from '../../data/schema';
import { useProgress } from '../../progress/store';
import {
  applyOverrides, defaultEnabled, pinStyle, fromLatLng, inView, loadFilters, MAP_CREDIT, saveFilters, TILE_URL, toLatLng, unplacedPins,
  visiblePins, type Filters, type ShownPin, type View,
} from './pins';
import PinSheet from './PinSheet';
import { iconFor } from './icons';

const BOUNDS: L.LatLngBoundsExpression = [[-MAP_SIZE, 0], [0, MAP_SIZE]];
/** Where the land is, so the map opens on Leonida rather than open ocean. */
const START: L.LatLngBoundsExpression = [[-780, 215], [-225, 610]];

/** Reports the visible area in map units whenever the map stops moving. */
function ViewWatcher({ onChange }: { onChange: (v: View) => void }) {
  const map = useMapEvents({ moveend: () => report(), zoomend: () => report() });
  const report = () => {
    const b = map.getBounds();
    onChange({ minX: b.getWest(), maxX: b.getEast(), minY: -b.getNorth(), maxY: -b.getSouth(), zoom: map.getZoom() });
  };
  useEffect(() => { report(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

function pinIcon(c: Category | undefined, pin: ShownPin, found: boolean, selected: boolean) {
  const cls = ['pin', pin.location_precision === 'approximate' && !pin.corrected ? 'pin-approx' : '', found ? 'pin-found' : '', selected ? 'pin-selected' : ''].join(' ');
  return L.divIcon({
    className: '',
    html: `<div class="${cls}" style="--pin:${c?.color ?? '#ffffff'}">${iconFor(c?.icon)}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

/** Flies to a pin only when the target position actually changes (not on every re-render). */
export function FlyTo({ x, y }: { x: number; y: number }) {
  const map = useMap();
  useEffect(() => { map.flyTo(toLatLng(x, y), Math.max(map.getZoom(), 3), { duration: 0.5 }); }, [map, x, y]);
  return null;
}

export default function MapPage() {
  const categories = getCategories();
  const catById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);
  const p = useProgress();
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => loadFilters([...defaultEnabled(categories)]));
  const [showFilters, setShowFilters] = useState(false);
  const [showUnplaced, setShowUnplaced] = useState(false);
  const [view, setView] = useState<View | null>(null);
  const [fixing, setFixing] = useState(false);
  const selectedId = params.get('pin');

  const all = applyOverrides(getSection('map_pins'), p.overrides);
  const selected = all.find((x) => x.id === selectedId) ?? null;
  const matching = visiblePins(all, { ...filters, isDone: p.isDone });
  const shown = view ? inView(matching, view, (view.maxX - view.minX) * 0.25) : [];
  if (selected && selected.location_precision !== 'unknown' && !shown.includes(selected)) shown.push(selected);
  const unplaced = unplacedPins(all).filter((x) => filters.enabled.has(x.category));

  const update = (f: Filters) => { setFilters(f); saveFilters(f); };
  const toggleCat = (id: string) => {
    const enabled = new Set(filters.enabled);
    if (enabled.has(id)) enabled.delete(id); else enabled.add(id);
    update({ ...filters, enabled });
  };
  const select = (id: string | null) => { setFixing(false); setParams(id ? { pin: id } : {}, { replace: true }); };

  return (
    <div className="map-page">
      <div className="map-toolbar">
        <button onClick={() => setShowFilters((s) => !s)} aria-expanded={showFilters}>Filters ({filters.enabled.size})</button>
        <label className="switch"><input type="checkbox" checked={filters.hideFound} onChange={(e) => update({ ...filters, hideFound: e.target.checked })} /> Hide found</label>
        <span className="muted small">{matching.length} pins</span>
        {unplaced.length > 0 && (
          <button className="small" aria-expanded={showUnplaced} onClick={() => setShowUnplaced((v) => !v)}>{unplaced.length} not placed</button>
        )}
      </div>
      {showUnplaced && (
        <div className="filter-drawer unplaced">
          <p className="muted small">We know these exist but not exactly where yet. Tap one for details; use “Fix spot” to place it when you find it.</p>
          <ul className="rows">
            {unplaced.map((u) => (
              <li key={u.id}><button className="row" onClick={() => { setShowUnplaced(false); select(u.id); }}>
                <span className="row-main">{iconFor(catById.get(u.category)?.icon)} <strong>{u.name}</strong><span className="muted"> · {u.area_name ?? 'area unknown'}</span></span>
              </button></li>
            ))}
          </ul>
        </div>
      )}
      {showFilters && (
        <div className="filter-drawer">
          <div className="controls">
            <button onClick={() => update({ ...filters, enabled: new Set(categories.map((c) => c.id)) })}>All</button>
            <button onClick={() => update({ ...filters, enabled: new Set() })}>None</button>
          </div>
          <div className="chips">
            {categories.map((c) => (
              <label key={c.id} className={`chip ${filters.enabled.has(c.id) ? 'on' : ''}`} style={{ borderColor: c.color }}>
                <input type="checkbox" checked={filters.enabled.has(c.id)} onChange={() => toggleCat(c.id)} />
                {iconFor(c.icon)} {c.label}
              </label>
            ))}
          </div>
        </div>
      )}
      <MapContainer className="map" preferCanvas crs={L.CRS.Simple} bounds={START} maxBounds={BOUNDS} maxBoundsViscosity={0.8}
        minZoom={-1} maxZoom={7} zoomSnap={0.5} attributionControl={false}>
        <TileLayer url={TILE_URL} tileSize={256} minZoom={-1} minNativeZoom={0} maxNativeZoom={5} noWrap bounds={BOUNDS} attribution={MAP_CREDIT}
          errorTileUrl="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
        <AttributionControl position="bottomright" prefix={false} />
        <ViewWatcher onChange={setView} />
        {pinStyle(view?.zoom ?? 0) === 'dot' && shown.map((pin) => (
          <CircleMarker key={pin.id} center={toLatLng(pin.x, pin.y)} radius={pin.id === selectedId ? 8 : 4.5}
            pathOptions={{ color: '#0e0f13', weight: 1, fillColor: catById.get(pin.category)?.color ?? '#ffffff', fillOpacity: p.isDone(pin.id) ? 0.35 : 0.95 }}
            eventHandlers={{ click: () => select(pin.id) }} />
        ))}
        {pinStyle(view?.zoom ?? 0) === 'icon' && shown.map((pin) => (
          <Marker key={`${pin.id}-${fixing && pin.id === selectedId}`} position={toLatLng(pin.x, pin.y)}
            icon={pinIcon(catById.get(pin.category), pin, p.isDone(pin.id), pin.id === selectedId)}
            draggable={fixing && pin.id === selectedId}
            eventHandlers={{
              click: () => select(pin.id),
              dragend: (e) => { const { x, y } = fromLatLng((e.target as L.Marker).getLatLng()); p.setPinOverride(pin.id, x, y); },
            }} />
        ))}
        {selected && selected.location_precision !== 'unknown' && <FlyTo key={selected.id} x={selected.x} y={selected.y} />}
      </MapContainer>
      {selected && (
        <PinSheet pin={selected} category={catById.get(selected.category)} found={p.isDone(selected.id)} fixing={fixing}
          onToggleFound={() => p.toggle(selected.id)} onFix={() => setFixing((f) => !f)}
          onResetFix={() => p.clearPinOverride(selected.id)} onClose={() => select(null)} />
      )}
    </div>
  );
}
