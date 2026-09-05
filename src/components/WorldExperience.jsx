import { useCallback, useRef } from "react";
import { WorldMap } from "./WorldMap.jsx";
import { SoundToggle } from "./SoundToggle.jsx";
import { WorldCharacters } from "./WorldCharacters.jsx";
import { broadcastReaction } from "../lib/reaction.js";
import { AMAZON_URL } from "../config.js";

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
export function WorldExperience({ worldClass, brandLabel, title, tagline, coverSrc, coverAlt, story, mapEyebrow, mapHeading, mapLead, places, mapSrc, mapAlt, mapWidth, mapHeight, fx, characterFeatures = [], book, onBackHome }) {
  const rootRef = useRef(null);
  const reactionTimer = useRef(null);

  const react = useCallback((kind) => {
    if (reactionTimer.current) clearTimeout(reactionTimer.current);
    reactionTimer.current = broadcastReaction(rootRef.current, kind);
  }, []);

  const jumpTo = useCallback((event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div ref={rootRef} className={`world-experience ${worldClass}`}>
      <a className="skip-link" href="#world-map" onClick={(event) => jumpTo(event, "world-map")}>Skip to the map</a>
      <header className="world-experience__bar">
        <button className="world-experience__brand" onClick={onBackHome}>
          <span aria-hidden="true">←</span> {brandLabel}
        </button>
        <nav className="world-experience__nav" aria-label={`${title} page sections`}>
          <a href="#world-story" onClick={(event) => jumpTo(event, "world-story")}>Story</a>
          <a href="#world-characters" onClick={(event) => jumpTo(event, "world-characters")}>Characters</a>
          <a href="#world-map" onClick={(event) => jumpTo(event, "world-map")}>Map</a>
        </nav>
        <SoundToggle className="sound-toggle--bar" />
      </header>

      <main>
        <section className={`world-experience__hero ${coverSrc ? "world-experience__hero--with-cover" : ""}`}>
          <div className="world-experience__hero-copy">
            <p className="universe-kicker">The Piper Storyworld</p>
            <h1>{title}</h1>
            <p className="world-experience__tagline">{tagline}</p>
            <a className="world-experience__jump" href="#world-story" onClick={(event) => jumpTo(event, "world-story")}>
              Enter the story <span aria-hidden="true">↓</span>
            </a>
          </div>
          {coverSrc && (
            <div className="world-experience__cover">
              <img src={coverSrc} alt={coverAlt} />
            </div>
          )}
        </section>

        <section className="world-experience__story wrap" id="world-story" aria-labelledby="world-story-title">
          <div className="world-experience__story-copy">
            <p className="universe-kicker">{story.eyebrow}</p>
            <h2 id="world-story-title">{story.heading}</h2>
            <p>{story.body}</p>
          </div>
          <div className="world-experience__story-facts">
            {story.facts.map(([label, value]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
        </section>

        <div id="world-characters">
          {characterFeatures.map((feature) => (
            <div className="world-experience__characters wrap" key={feature.title}>
              <WorldCharacters feature={feature} />
            </div>
          ))}
        </div>

        <div id="world-map" className="world-experience__map">
          <WorldMap
            key={title}
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

        <section className="world-experience__book wrap" id="world-book">
          <div className="world-experience__book-cover">
            <img src={book.cover} alt={`${book.title} book cover`} loading="lazy" decoding="async" />
          </div>
          <div>
            <p className="universe-kicker">Continue the adventure</p>
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <a className="world-experience__jump" href={AMAZON_URL} target="_blank" rel="noreferrer">Discover the Piper books <span aria-hidden="true">→</span></a>
          </div>
        </section>
      </main>

      <footer className="world-experience__footer">
        <button onClick={onBackHome}>← Back to the worlds</button>
        <span>© {new Date().getFullYear()} Wallace-Siedlarz Productions</span>
      </footer>
    </div>
  );
}
