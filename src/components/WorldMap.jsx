import { useCallback, useRef, useState } from "react";
import { useDialogTrap } from "../hooks/useDialogTrap.js";
import { useChime } from "../hooks/useChime.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";
import { I } from "./Icons.jsx";
import { FxLayers } from "./FxLayers.jsx";

const DEFAULT_FX = {
  confettiKinds: ["berry", "star", "croix", "donut", "bean"],
  arrival: 720,
  complete: 880,
  reactions: [],
};

/**
 * A generic illustrated, numbered map — the same interaction pattern as
 * Snackville's MapHub (accessible hotspots, a field-note dialog, a
 * scrollable index), reused for Sandwich Kingdom and Crumbhollow so a
 * new world's map doesn't need its own bespoke component.
 *
 * These worlds don't carry Snackville's twenty bespoke per-location
 * effects, but they aren't a silent reskin of each other either: the
 * `fx` prop (see data/worldFx.js) gives each world its own confetti
 * mix, its own arrival and completion voices, and its own rotation of
 * screen reactions, so the kingdom in the clouds and the burrow under
 * the town don't respond to a tap in the same way.
 *
 * Every *first* visit to a location gets that moment; finding every
 * location pops a one-time "explored it all" certificate. "Visited"
 * state is local to this component (not persisted), since these worlds
 * aren't part of Snackville's Explorer/badge system.
 */
export function WorldMap({ places, mapSrc, mapAlt, mapWidth, mapHeight, eyebrow, heading, lead, worldTitle, fx = DEFAULT_FX, onReact }) {
  const [selected, setSelected] = useState(places[0]);
  const [openPlace, setOpenPlace] = useState(null);
  const [visited, setVisited] = useState(() => new Set());
  const [confetti, setConfetti] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const dialogRef = useRef(null);
  const certRef = useRef(null);
  const reduceMotion = useReducedMotion();
  // Whether every location has been visited, and the certificate for it
  // hasn't been shown yet — checked (and, once true, immediately
  // consumed) from closePlace() below, rather than watched from a
  // useEffect, so the certificate's chime/confetti stay inside the same
  // user-gesture call stack as the click that closed the last dialog.
  const celebrationPending = useRef(false);
  const chime = useChime();

  const burstConfetti = useCallback((count = 16) => {
    if (reduceMotion.current) return;
    const bits = Array.from({ length: count }, (_, i) => ({
      id: `wc${Date.now()}-${i}-${Math.random()}`, left: Math.random() * 100,
      dur: 2.4 + Math.random() * 2.2, delay: Math.random() * 0.6,
      size: 16 + Math.random() * 20,
      kind: fx.confettiKinds[Math.floor(Math.random() * fx.confettiKinds.length)],
    }));
    // Capped at 60 concurrent pieces — a kid clicking through several new
    // locations in quick succession would otherwise stack an unbounded
    // number of still-animating bursts (each lives ~5s) at once.
    setConfetti((prev) => [...prev, ...bits].slice(-60));
    const ids = new Set(bits.map((b) => b.id));
    setTimeout(() => setConfetti((prev) => prev.filter((b) => !ids.has(b.id))), 5400);
  }, [fx]);

  const closePlace = useCallback(() => {
    setOpenPlace(null);
    if (celebrationPending.current) {
      celebrationPending.current = false;
      setShowCertificate(true);
      chime(fx.complete);
      burstConfetti(24);
    }
  }, [chime, burstConfetti, fx]);
  const closeCertificate = useCallback(() => setShowCertificate(false), []);

  const pick = (place) => {
    setSelected(place);
    setOpenPlace(place);
    if (!visited.has(place.id)) {
      const next = new Set(visited);
      next.add(place.id);
      setVisited(next);
      chime(fx.arrival);
      burstConfetti(16);
      // Each location keeps the same reaction every time it's opened —
      // chosen by its position in the list, not at random — so a child
      // re-tapping a place gets a consistent answer, while neighbouring
      // places still respond differently from one another. The reaction
      // itself is broadcast from the world's root element, which
      // WorldExperience owns, so it's handed up rather than applied here.
      if (fx.reactions.length && !reduceMotion.current) {
        onReact?.(fx.reactions[places.indexOf(place) % fx.reactions.length]);
      }
      // Every location visited: hold the celebration until this dialog
      // (which just opened for the location that completed the set)
      // closes, so the certificate never stacks on top of it.
      if (next.size === places.length) celebrationPending.current = true;
    }
  };

  const surpriseMe = () => {
    const unvisited = places.filter((p) => !visited.has(p.id));
    const pool = unvisited.length ? unvisited : places;
    pick(pool[Math.floor(Math.random() * pool.length)]);
  };

  useDialogTrap(dialogRef, closePlace, openPlace);
  useDialogTrap(certRef, closeCertificate, showCertificate);

  return (
    <>
      <FxLayers sparks={[]} wowFx={[]} confetti={confetti} wash={null} />

      <Reveal className="map-heading">
        <div>
          <div className="eyebrow on-sky-s">{eyebrow}</div>
          <h2 className="h2 on-sky">{heading}</h2>
          <p className="lead on-sky-s">{lead}</p>
        </div>
        <div className="map-heading__actions">
          <div className="explore-counter" aria-live="polite">
            <span className="map-counter-icon">{I.mapic()}</span>
            <span className="u">{visited.size} of {places.length} places explored</span>
          </div>
          <button className="btn btn-sm b-ghost" onClick={surpriseMe}>Surprise me →</button>
        </div>
      </Reveal>

      <Reveal className="map-atlas panel world-map-atlas">
        <div className="map-scroll world-map-scroll" aria-label={`${worldTitle} illustrated map`}>
          {/* .map-f's base CSS hardcodes aspect-ratio:16/9 for Snackville's own
              1536x864 map — a world with a differently-shaped map (Sandwich Kingdom's
              is 1536x1024, i.e. 3:2) needs its own ratio here, or object-fit:
              cover crops the image and every hotspot's x/y% stops lining up
              with the printed numbers underneath it. */}
          <div className="map-f world-map-frame" style={{ aspectRatio: `${mapWidth} / ${mapHeight}` }}>
            <Img src={mapSrc} alt={mapAlt} fb="World map" width={mapWidth} height={mapHeight} />
            {places.map((place) => (
              <button
                key={place.id}
                className={`map-hotspot ${selected.id === place.id ? "on" : ""} ${visited.has(place.id) ? "seen" : ""}`}
                style={{ "--hotspot-x": `${place.x}%`, "--hotspot-y": `${place.y}%`, "--hotspot-accent": place.ink }}
                onClick={() => pick(place)}
                aria-label={`Location ${place.n}: ${place.name}`}
                aria-haspopup="dialog"
              >
                <span className="sr-only">Open {place.name}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="map-pan-hint world-map-fit-hint u">The whole map fits your screen. Tap a numbered place to explore it.</p>

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

      {showCertificate && (
        <div
          className="place-dialog-scrim"
          onMouseDown={(event) => { if (event.target === event.currentTarget) closeCertificate(); }}
        >
          <article
            ref={certRef}
            className="place-dialog world-cert"
            role="dialog"
            aria-modal="true"
            aria-labelledby="world-cert-title"
          >
            <div className="place-dialog-topline">
              <span className="eyebrow">Explorer certificate</span>
              <button className="place-dialog-close u" onClick={closeCertificate}>Close</button>
            </div>
            <div className="world-cert-badge" aria-hidden="true">{I.badgeic()}</div>
            <h3 id="world-cert-title" className="d">You explored all of {worldTitle}!</h3>
            <p className="place-dialog-intro">
              Every hidden corner, every field note — nothing left to find. You're a true {worldTitle} Explorer.
            </p>
            <div className="place-dialog-actions">
              <button className="btn b-plum" onClick={closeCertificate}>Keep exploring</button>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
