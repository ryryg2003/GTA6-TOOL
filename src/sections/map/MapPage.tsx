import L from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { ImageOverlay, MapContainer, Marker, useMap } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';
import { getCategories, getSection } from '../../data/load';
import { MAP_SIZE, type Category } from '../../data/schema';
import { useProgress } from '../../progress/store';
import { applyOverrides, loadFilters, MAP_IMAGE, saveFilters, visiblePins, type Filters, type ShownPin } from './pins';
import PinSheet from './PinSheet';

const BOUNDS: L.LatLngBoundsExpression = [[0, 0], [MAP_SIZE, MAP_SIZE]];
/** Our y grows downward; Leaflet's lat grows upward. */
const toLatLng = (x: number, y: number): L.LatLngTuple => [MAP_SIZE - y, x];
const fromLatLng = (ll: L.LatLng) => ({
  x: Math.round(Math.min(MAP_SIZE, Math.max(0, ll.lng))),
  y: Math.round(Math.min(MAP_SIZE, Math.max(0, MAP_SIZE - ll.lat))),
});

function pinIcon(c: Category | undefined, pin: ShownPin, found: boolean, selected: boolean) {
  const cls = ['pin', pin.location_precision === 'approximate' && !pin.corrected ? 'pin-approx' : '', found ? 'pin-found' : '', selected ? 'pin-selected' : ''].join(' ');
  return L.divIcon({
    className: '',
    html: `<div class="${cls}" style="--pin:${c?.color ?? '#ffffff'}">${c?.icon ?? '📍'}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

function FlyTo({ target }: { target: L.LatLngTuple | null }) {
  const map = useMap();
  useEffect(() => { if (target) map.flyTo(target, Math.max(map.getZoom(), 1), { duration: 0.5 }); }, [map, target]);
  return null;
}

export default function MapPage() {
  const categories = getCategories();
  const catById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);
  const p = useProgress();
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => loadFilters(categories.map((c) => c.id)));
  const [showFilters, setShowFilters] = useState(false);
  const [fixing, setFixing] = useState(false);
  const selectedId = params.get('pin');

  const all = applyOverrides(getSection('map_pins'), p.overrides);
  const selected = all.find((x) => x.id === selectedId) ?? null;
  const shown = visiblePins(all, { ...filters, isDone: p.isDone });
  if (selected && !shown.includes(selected)) shown.push(selected);

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
        <span className="muted small">{shown.length} pins</span>
      </div>
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
                {c.icon} {c.label}
              </label>
            ))}
          </div>
        </div>
      )}
      <MapContainer className="map" crs={L.CRS.Simple} bounds={BOUNDS} maxBounds={[[-200, -200], [MAP_SIZE + 200, MAP_SIZE + 200]]}
        minZoom={-2} maxZoom={3} zoomSnap={0.25} attributionControl={false}>
        <ImageOverlay url={MAP_IMAGE} bounds={BOUNDS} />
        {shown.map((pin) => (
          <Marker key={`${pin.id}-${fixing && pin.id === selectedId}`} position={toLatLng(pin.x, pin.y)}
            icon={pinIcon(catById.get(pin.category), pin, p.isDone(pin.id), pin.id === selectedId)}
            draggable={fixing && pin.id === selectedId}
            eventHandlers={{
              click: () => select(pin.id),
              dragend: (e) => { const { x, y } = fromLatLng((e.target as L.Marker).getLatLng()); p.setPinOverride(pin.id, x, y); },
            }} />
        ))}
        <FlyTo target={selected ? toLatLng(selected.x, selected.y) : null} />
      </MapContainer>
      {selected && (
        <PinSheet pin={selected} category={catById.get(selected.category)} found={p.isDone(selected.id)} fixing={fixing}
          onToggleFound={() => p.toggle(selected.id)} onFix={() => setFixing((f) => !f)}
          onResetFix={() => p.clearPinOverride(selected.id)} onClose={() => select(null)} />
      )}
    </div>
  );
}
