import L from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { AttributionControl, CircleMarker, MapContainer, Marker, TileLayer, useMap, useMapEvents, ZoomControl } from 'react-leaflet';
import { Link, useSearchParams } from 'react-router-dom';
import { getCategories } from '../../data/load';
import { usePins } from '../../data/pins';
import { MAP_SIZE, type Category } from '../../data/schema';
import { useProgress } from '../../progress/store';
import Icon from '../../ui/Icon';
import {
  applyOverrides, countByCategory, defaultEnabled, findPins, fromLatLng, inView, loadFilters, MAP_CREDIT, pinStyle, saveFilters, TILE_URL,
  toLatLng, unplacedPins, visiblePins, type Filters, type ShownPin, type View,
} from './pins';
import PinSheet from './PinSheet';
import { glyphSvg } from './icons';
import { panCenterFor } from './sheetPan';

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
    html: `<div class="${cls}" style="--pin:${c?.color ?? '#ffffff'}">${glyphSvg(c)}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

/**
 * Flies to a pin only when the target position actually changes (not on every re-render).
 * Aims a little south of the pin so the pin sits in the top ~35% of the screen, above the bottom sheet.
 */
export function FlyTo({ x, y }: { x: number; y: number }) {
  const map = useMap();
  useEffect(() => {
    const zoom = Math.max(map.getZoom(), 3);
    const pt = map.project(toLatLng(x, y), zoom);
    const center = map.unproject(panCenterFor(pt, map.getSize().y) as L.PointExpression, zoom);
    map.flyTo(center, zoom, { duration: 0.5 });
  }, [map, x, y]);
  return null;
}

export default function MapPage() {
  const categories = getCategories();
  const catById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);
  const p = useProgress();
  const raw = usePins();
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => loadFilters([...defaultEnabled(categories)]));
  const [query, setQuery] = useState(params.get('find') ?? '');
  const [showUnplaced, setShowUnplaced] = useState(false);
  const [view, setView] = useState<View | null>(null);
  const [fixing, setFixing] = useState(false);
  const selectedId = params.get('pin');

  const all = useMemo(() => applyOverrides(raw ?? [], p.overrides), [raw, p.overrides]);
  const counts = useMemo(() => countByCategory(all), [all]);
  const chipCats = useMemo(() => categories.filter((c) => counts.get(c.id)).sort((a, b) =>
    Number(filters.enabled.has(b.id)) - Number(filters.enabled.has(a.id)) || (counts.get(b.id) ?? 0) - (counts.get(a.id) ?? 0)), [categories, counts]); // eslint-disable-line react-hooks/exhaustive-deps
  const selected = all.find((x) => x.id === selectedId) ?? null;
  const matching = visiblePins(all, { ...filters, isDone: p.isDone });
  const shown = view ? inView(matching, view, (view.maxX - view.minX) * 0.25) : [];
  if (selected && selected.location_precision !== 'unknown' && !shown.includes(selected)) shown.push(selected);
  const unplaced = unplacedPins(all).filter((x) => filters.enabled.has(x.category));
  const results = useMemo(() => findPins(all, query), [all, query]);

  const update = (f: Filters) => { setFilters(f); saveFilters(f); };
  const toggleCat = (id: string) => {
    const enabled = new Set(filters.enabled);
    if (enabled.has(id)) enabled.delete(id); else enabled.add(id);
    update({ ...filters, enabled });
  };
  const select = (id: string | null) => { setFixing(false); setParams(id ? { pin: id } : {}, { replace: true }); };
  const pick = (pin: ShownPin) => {
    setQuery(''); setShowUnplaced(false);
    if (!filters.enabled.has(pin.category)) update({ ...filters, enabled: new Set([...filters.enabled, pin.category]) });
    select(pin.id);
  };

  return (
    <div className={`map-page ${selected ? 'has-sheet' : ''}`}>
      <div className="map-top">
        <div className="line">
          <Link to="/" className="icon-btn" aria-label="Back to home"><Icon name="back" size={22} /></Link>
          <label className="field">
            <Icon name="search" size={16} />
            <input type="search" placeholder="Find a pin…" aria-label="Find a pin" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
        </div>
        {query.trim() && (
          <ul className="find-results rows" aria-label="Matching pins">
            {results.length === 0 && <li className="row muted">{raw ? 'No pins match.' : 'Loading pins…'}</li>}
            {results.map((r) => (
              <li key={r.id}><button className="row" onClick={() => pick(r)}>
                <span className="row-main"><strong>{r.name}</strong><span className="muted small"> · {catById.get(r.category)?.label ?? r.category}{r.area_name ? ` · ${r.area_name}` : ''}</span></span>
                {r.code && <span className="inline-code">{r.code}</span>}
              </button></li>
            ))}
          </ul>
        )}
        <div className="chips" role="group" aria-label="Pin types">
          {chipCats.map((c) => (
            <button key={c.id} type="button" className="chip cat" aria-pressed={filters.enabled.has(c.id)} style={{ ['--cat' as string]: c.color }}
              onClick={() => toggleCat(c.id)}>{c.label} {counts.get(c.id)}</button>
          ))}
        </div>
        <div className="map-tools">
          <button type="button" className="chip" onClick={() => update({ ...filters, enabled: new Set(categories.map((c) => c.id)) })}>All</button>
          <button type="button" className="chip" onClick={() => update({ ...filters, enabled: new Set() })}>None</button>
          <label className="switch"><input type="checkbox" checked={filters.hideFound} onChange={(e) => update({ ...filters, hideFound: e.target.checked })} /> Hide found</label>
          <span className="muted">{raw ? `${matching.length.toLocaleString('en-US')} pins` : 'Loading pins…'}</span>
          {unplaced.length > 0 && (
            <button type="button" className="chip" aria-expanded={showUnplaced} onClick={() => setShowUnplaced((v) => !v)}>{unplaced.length} not placed</button>
          )}
        </div>
      </div>
      {showUnplaced && (
        <div className="card unplaced">
          <p className="muted small" style={{ marginTop: 0 }}>We know these exist but not exactly where yet. Tap one for details; use “Fix spot” to place it when you find it.</p>
          <ul className="rows">
            {unplaced.map((u) => (
              <li key={u.id}><button className="row" onClick={() => pick(u)}>
                <span className="row-main"><strong>{u.name}</strong><span className="muted"> · {u.area_name ?? 'area unknown'}</span></span>
              </button></li>
            ))}
          </ul>
        </div>
      )}
      <MapContainer className="map" preferCanvas crs={L.CRS.Simple} bounds={START} maxBounds={BOUNDS} maxBoundsViscosity={0.8}
        minZoom={-1} maxZoom={7} zoomSnap={0.5} attributionControl={false} zoomControl={false}>
        <TileLayer url={TILE_URL} tileSize={256} minZoom={-1} minNativeZoom={0} maxNativeZoom={5} noWrap bounds={BOUNDS} attribution={MAP_CREDIT}
          errorTileUrl="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
        <AttributionControl position="bottomright" prefix={false} />
        <ZoomControl position="bottomright" />
        <ViewWatcher onChange={setView} />
        {pinStyle(view?.zoom ?? 0) === 'dot' && shown.map((pin) => (
          <CircleMarker key={pin.id} center={toLatLng(pin.x, pin.y)} radius={pin.id === selectedId ? 9 : 4.5}
            pathOptions={{ color: pin.id === selectedId ? '#F5B941' : '#0e1014', weight: pin.id === selectedId ? 3 : 1, fillColor: catById.get(pin.category)?.color ?? '#ffffff', fillOpacity: p.isDone(pin.id) ? 0.35 : 0.95 }}
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
        <PinSheet key={selected.id} pin={selected} category={catById.get(selected.category)} found={p.isDone(selected.id)} fixing={fixing}
          onToggleFound={() => p.toggle(selected.id)} onFix={() => setFixing((f) => !f)}
          onResetFix={() => p.clearPinOverride(selected.id)} onClose={() => select(null)} />
      )}
    </div>
  );
}
