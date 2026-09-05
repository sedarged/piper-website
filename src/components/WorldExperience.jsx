import { useCallback, useRef } from "react";
import { WorldMap } from "./WorldMap.jsx";
import { SoundToggle } from "./SoundToggle.jsx";
import { broadcastReaction } from "../lib/reaction.js";

/**
 * A page shell for a newly-unlocked world (Sandwich Kingdom,
 * Crumbhollow): a small top bar with a way back to the world-select
 * screen, a short intro, and the interactive map itself.
 *
 * Deliberately lighter than SnackvilleExperience — no parallax sky, nav
 * sections, quiz or badges yet. Same map interaction pattern, though
 * (see WorldMap.jsx), so it still feels like part of the same site,
 * and each world brings its own confetti, voices and screen reactions
 * (see data/worldFx.js).
 *
 * The reaction lives here rather than in WorldMap because it's
 * broadcast from this root element, the way Snackville's is from
 * App.jsx — see the note in styles/wow.css for why the reaction is an
 * attribute on a root rather than a transform on a wrapper.
 */
export function WorldExperience({ worldClass, brandLabel, title, tagline, coverSrc, coverAlt, mapEyebrow, mapHeading, mapLead, places, mapSrc, mapAlt, mapWidth, mapHeight, fx, onBackHome }) {
  const rootRef = useRef(null);
  const reactionTimer = useRef(null);

  const react = useCallback((kind) => {
    if (reactionTimer.current) clearTimeout(reactionTimer.current);
    reactionTimer.current = broadcastReaction(rootRef.current, kind);
  }, []);

  return (
    <div ref={rootRef} className={`world-experience ${worldClass}`}>
      <a className="skip-link" href="#world-map">Skip to the map</a>
      <header className="world-experience__bar">
        <button className="world-experience__brand" onClick={onBackHome}>
          <span aria-hidden="true">←</span> {brandLabel}
        </button>
        <SoundToggle className="sound-toggle--bar" />
      </header>

      <main>
        <section className={`world-experience__hero ${coverSrc ? "world-experience__hero--with-cover" : ""}`}>
          <div className="world-experience__hero-copy">
            <p className="universe-kicker">The Piper Storyworld</p>
            <h1>{title}</h1>
            <p className="world-experience__tagline">{tagline}</p>
            <a className="world-experience__jump" href="#world-map">
              Open the map <span aria-hidden="true">↓</span>
            </a>
          </div>
          {coverSrc && (
            <div className="world-experience__cover">
              <img src={coverSrc} alt={coverAlt} />
            </div>
          )}
        </section>

        <div id="world-map" className="world-experience__map">
          <WorldMap
            places={places}
            mapSrc={mapSrc}
            mapAlt={mapAlt}
            mapWidth={mapWidth}
            mapHeight={mapHeight}
            eyebrow={mapEyebrow}
            heading={mapHeading}
            lead={mapLead}
            worldTitle={title}
            fx={fx}
            onReact={react}
          />
        </div>
      </main>

      <footer className="world-experience__footer">
        <button onClick={onBackHome}>← Back to the worlds</button>
        <span>© {new Date().getFullYear()} Wallace-Siedlarz Productions</span>
      </footer>
    </div>
  );
}
