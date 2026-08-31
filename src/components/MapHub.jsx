import { useCallback, useRef, useState } from "react";
import { PLACES } from "../data/places.js";
import { useDialogTrap } from "../hooks/useDialogTrap.js";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";
import { I } from "./Icons.jsx";

const MAP_SRC = "/images/snackville-interactive-map.jpeg";

/**
 * The official twenty-stop Snackville map.
 *
 * Every printed number on the illustration has a matching native button.
 * Selecting a location updates the field-note panel, marks Explorer progress,
 * and opens an accessible storybook introduction. Seven locations also carry
 * a `wow` key (see data/places.js) and get an extra action button that plays
 * a signature screen-shake-and-particles effect — see WOW_FX in App.jsx.
 */
export function MapHub({ visitedPlaceIds, mark, onWow, chime }) {
  const [selected, setSelected] = useState(PLACES[0]);
  const [openPlace, setOpenPlace] = useState(null);
  const dialogRef = useRef(null);
  const seenCount = PLACES.filter((place) => visitedPlaceIds.has(place.id)).length;

  const closePlace = useCallback(() => setOpenPlace(null), []);

  const pick = (place) => {
    setSelected(place);
    setOpenPlace(place);
    mark(`place-${place.id}`);
    chime(640, 0.12);
  };

  useDialogTrap(dialogRef, closePlace, openPlace);

  return (
    <>
      <Reveal className="map-heading">
        <div>
          <div className="eyebrow on-sky-s">The official illustrated map</div>
          <h2 className="h2 on-sky">Choose your next Snackville stop</h2>
          <p className="lead on-sky-s">
            Every numbered place holds a piece of Piper's world. Select a location to meet it,
            discover its story and add it to your Explorer trail.
          </p>
        </div>
        <div className="explore-counter" aria-live="polite">
          <span className="map-counter-icon">{I.mapic()}</span>
          <span className="u">{seenCount} of {PLACES.length} places explored</span>
        </div>
      </Reveal>

      <Reveal className="map-atlas panel">
        <div className="map-scroll" aria-label="Scrollable illustrated map">
          <div className="map-f">
            <Img
              src={MAP_SRC}
              alt="Illustrated map of Snackville with twenty numbered locations"
              fb="Snackville map"
              width="1536"
              height="864"
            />
            {PLACES.map((place) => (
              <button
                key={place.id}
                className={`map-hotspot ${selected.id === place.id ? "on" : ""} ${visitedPlaceIds.has(place.id) ? "seen" : ""} ${place.wow ? "wow-spot" : ""}`}
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

        <p className="map-pan-hint u">On a small screen, swipe the map sideways to see every shore.</p>

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

        <div className="map-index" aria-label="All Snackville locations">
          {PLACES.map((place) => (
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
              {visitedPlaceIds.has(place.id) && <span className="sr-only"> — explored</span>}
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
            aria-labelledby="place-dialog-title"
            style={{ "--place-accent": openPlace.ink }}
          >
            <div className="place-dialog-topline">
              <span className="eyebrow">Snackville field note · {String(openPlace.n).padStart(2, "0")}/{PLACES.length}</span>
              <button className="place-dialog-close u" onClick={closePlace}>Close</button>
            </div>

            <div className="place-dialog-number d" aria-hidden="true">{String(openPlace.n).padStart(2, "0")}</div>
            <div className="eyebrow place-dialog-kind">{openPlace.kind} · {openPlace.who}</div>
            <h3 id="place-dialog-title" className="d">{openPlace.name}</h3>
            <p className="place-dialog-intro">{openPlace.intro}</p>
            <p className="place-dialog-copy">{openPlace.d}</p>

            <aside className="place-dialog-note">
              <span className="eyebrow">Piper's explorer note</span>
              <p>{openPlace.note}</p>
            </aside>

            <div className="place-dialog-actions">
              {openPlace.wow && (
                <button
                  className="btn b-straw"
                  onClick={() => onWow(openPlace)}
                >
                  {openPlace.actionLabel}
                </button>
              )}
              <button className="btn b-plum" onClick={closePlace}>Back to the map</button>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
