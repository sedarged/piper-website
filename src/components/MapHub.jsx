import { useCallback, useEffect, useRef, useState } from "react";
import { PLACES } from "../data/places.js";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";
import { I } from "./Icons.jsx";

const MAP_SRC = "/images/snackville-interactive-map.jpeg";

/**
 * The official twenty-stop Snackville map.
 *
 * Every printed number on the illustration has a matching native button.
 * Selecting a location updates the field-note panel, marks Explorer progress,
 * and opens an accessible storybook introduction. Volcano and Dragon Cave
 * keep the original Chocolate Dragon sneeze interaction as an explicit action.
 */
export function MapHub({ visitedPlaceIds, mark, onSneeze, chime }) {
  const [selected, setSelected] = useState(PLACES[0]);
  const [openPlace, setOpenPlace] = useState(null);
  const dialogRef = useRef(null);
  const lastTriggerRef = useRef(null);
  const seenCount = PLACES.filter((place) => visitedPlaceIds.has(place.id)).length;

  const closePlace = useCallback(() => {
    setOpenPlace(null);
    window.setTimeout(() => lastTriggerRef.current?.focus(), 0);
  }, []);

  const pick = (place, trigger) => {
    lastTriggerRef.current = trigger ?? document.activeElement;
    setSelected(place);
    setOpenPlace(place);
    mark(`place-${place.id}`);
    chime(640, 0.12);
  };

  useEffect(() => {
    if (!openPlace) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll("button:not([disabled]), a[href]") ?? [];
    focusable[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePlace();
        return;
      }
      if (event.key !== "Tab" || focusable.length < 2) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closePlace, openPlace]);

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
                className={`map-hotspot ${selected.id === place.id ? "on" : ""} ${visitedPlaceIds.has(place.id) ? "seen" : ""} ${place.sneeze ? "dragon" : ""}`}
                style={{ left: `${place.x}%`, top: `${place.y}%`, "--hotspot-accent": place.ink }}
                onClick={(event) => pick(place, event.currentTarget)}
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
          <button className="btn btn-sm b-straw" onClick={(event) => pick(selected, event.currentTarget)}>
            Read the field note
          </button>
        </div>

        <div className="map-index" aria-label="All Snackville locations">
          {PLACES.map((place) => (
            <button
              key={place.id}
              className={`map-index-item ${selected.id === place.id ? "on" : ""}`}
              onClick={(event) => pick(place, event.currentTarget)}
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
              {openPlace.sneeze && (
                <button
                  className="btn b-straw"
                  onClick={onSneeze}
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
