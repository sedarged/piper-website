import { useCallback, useRef, useState } from "react";
import { useDialogTrap } from "../hooks/useDialogTrap.js";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";
import { I } from "./Icons.jsx";

/**
 * A generic illustrated, numbered map — the same interaction pattern as
 * Snackville's MapHub (accessible hotspots, a field-note dialog, a
 * scrollable index), reused for Stackwich Kingdom and Crumbhollow so a
 * new world's map doesn't need its own bespoke component.
 *
 * Unlike Snackville, these worlds don't have a "wow" screen effect per
 * location yet — the dialog is informational only (no action button).
 * "Visited" state is local to this component (not persisted), since
 * these worlds aren't part of Snackville's Explorer/badge system.
 */
export function WorldMap({ places, mapSrc, mapAlt, mapWidth, mapHeight, eyebrow, heading, lead }) {
  const [selected, setSelected] = useState(places[0]);
  const [openPlace, setOpenPlace] = useState(null);
  const [visited, setVisited] = useState(() => new Set());
  const dialogRef = useRef(null);

  const closePlace = useCallback(() => setOpenPlace(null), []);

  const pick = (place) => {
    setSelected(place);
    setOpenPlace(place);
    setVisited((prev) => new Set(prev).add(place.id));
  };

  useDialogTrap(dialogRef, closePlace, openPlace);

  return (
    <>
      <Reveal className="map-heading">
        <div>
          <div className="eyebrow on-sky-s">{eyebrow}</div>
          <h2 className="h2 on-sky">{heading}</h2>
          <p className="lead on-sky-s">{lead}</p>
        </div>
        <div className="explore-counter" aria-live="polite">
          <span className="map-counter-icon">{I.mapic()}</span>
          <span className="u">{visited.size} of {places.length} places explored</span>
        </div>
      </Reveal>

      <Reveal className="map-atlas panel">
        <div className="map-scroll" aria-label="Scrollable illustrated map">
          <div className="map-f">
            <Img src={mapSrc} alt={mapAlt} fb="World map" width={mapWidth} height={mapHeight} />
            {places.map((place) => (
              <button
                key={place.id}
                className={`map-hotspot ${selected.id === place.id ? "on" : ""} ${visited.has(place.id) ? "seen" : ""}`}
                style={{ left: `${place.x}%`, top: `${place.y}%`, "--hotspot-accent": place.ink }}
                onClick={() => pick(place)}
                aria-label={`Location ${place.n}: ${place.name}`}
                aria-haspopup="dialog"
              >
                <span className="sr-only">Open {place.name}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="map-pan-hint u">On a small screen, swipe the map sideways to see every corner.</p>

        <div className="map-selection" style={{ "--place-accent": selected.ink }} aria-live="polite">
          <span className="map-selection-number d">{String(selected.n).padStart(2, "0")}</span>
          <div>
            <div className="eyebrow">Now visiting · {selected.kind}</div>
            <h3 className="d">{selected.name}</h3>
            <p>{selected.intro}</p>
          </div>
          <button className="btn btn-sm b-straw" onClick={() => pick(selected)}>
            Read the field note
          </button>
        </div>

        <div className="map-index" aria-label="All locations">
          {places.map((place) => (
            <button
              key={place.id}
              className={`map-index-item ${selected.id === place.id ? "on" : ""}`}
              onClick={() => pick(place)}
              aria-haspopup="dialog"
            >
              <span className="map-index-number" style={{ "--place-accent": place.ink }}>
                {String(place.n).padStart(2, "0")}
              </span>
              <span>{place.name}</span>
              {visited.has(place.id) && <span className="sr-only"> — explored</span>}
            </button>
          ))}
        </div>
      </Reveal>

      {openPlace && (
        <div
          className="place-dialog-scrim"
          onMouseDown={(event) => { if (event.target === event.currentTarget) closePlace(); }}
        >
          <article
            ref={dialogRef}
            className="place-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="world-place-dialog-title"
            style={{ "--place-accent": openPlace.ink }}
          >
            <div className="place-dialog-topline">
              <span className="eyebrow">Field note · {String(openPlace.n).padStart(2, "0")}/{places.length}</span>
              <button className="place-dialog-close u" onClick={closePlace}>Close</button>
            </div>

            <div className="place-dialog-number d" aria-hidden="true">{String(openPlace.n).padStart(2, "0")}</div>
            <div className="eyebrow place-dialog-kind">{openPlace.kind} · {openPlace.who}</div>
            <h3 id="world-place-dialog-title" className="d">{openPlace.name}</h3>
            <p className="place-dialog-intro">{openPlace.intro}</p>
            <p className="place-dialog-copy">{openPlace.d}</p>

            <div className="place-dialog-actions">
              <button className="btn b-plum" onClick={closePlace}>Back to the map</button>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
