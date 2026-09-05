import { useCallback, useRef } from "react";
import { WorldMap } from "./WorldMap.jsx";
import { SoundToggle } from "./SoundToggle.jsx";
import { WorldCharacters } from "./WorldCharacters.jsx";
import { LivingWorldBackdrop } from "./LivingWorldBackdrop.jsx";
import { broadcastReaction } from "../lib/reaction.js";
import { AMAZON_URL } from "../config.js";

/**
 * A page shell for a newly-unlocked world (Sandwich Kingdom,
 * Crumbhollow): a small top bar with a way back to the world-select
 * screen, a short intro, and the interactive map itself.
 *
 * It follows the same editorial rhythm as Snackville — story, cast, places
 * and book — while keeping each world's own atmosphere and artwork.
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
      <LivingWorldBackdrop src={coverSrc} variant={worldClass.includes("crumbhollow") ? "crumbhollow" : "sandwich"} />
      <a className="skip-link" href="#world-map" onClick={(event) => jumpTo(event, "world-map")}>Skip to the map</a>
      <header className="world-experience__bar">
        <button className="world-experience__brand" onClick={onBackHome}>
          <span aria-hidden="true">←</span> {brandLabel}
        </button>
        <nav className="world-experience__nav" aria-label={`${title} page sections`}>
          <a href="#world-story" onClick={(event) => jumpTo(event, "world-story")}>Story</a>
          <a href="#world-characters" onClick={(event) => jumpTo(event, "world-characters")}>Characters</a>
          <a href="#world-map" onClick={(event) => jumpTo(event, "world-map")}>Map</a>
          <a href="#world-book" onClick={(event) => jumpTo(event, "world-book")}>Book</a>
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
            <div className="world-experience__hero-facts" aria-label={`${title} at a glance`}>
              {story.facts.map(([label, value]) => (
                <span key={label}><small>{label}</small><strong>{value}</strong></span>
              ))}
            </div>
          </div>
          {coverSrc && (
            <div className="world-experience__cover">
              <img src={coverSrc} alt={coverAlt} />
            </div>
          )}
        </section>

        <section className="world-experience__story wrap" id="world-story" aria-labelledby="world-story-title">
          <div className="world-experience__story-copy">
            <span className="world-experience__section-number" aria-hidden="true">01</span>
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

        <section className="world-experience__trail wrap" aria-labelledby="world-trail-title">
          <div className="world-experience__trail-heading">
            <p className="universe-kicker">A first look around</p>
            <h2 id="world-trail-title">Follow the illustrated trail</h2>
            <p>Start with these landmarks, then open the full map to discover every numbered corner of {title}.</p>
          </div>
          <div className="world-experience__trail-grid">
            {[places[0], places[Math.floor(places.length / 3)], places[Math.floor(places.length * 2 / 3)], places.at(-1)].map((place) => (
              <a key={place.id} href="#world-map" onClick={(event) => jumpTo(event, "world-map")} style={{ "--trail-accent": place.ink }}>
                <span className="d">{String(place.n).padStart(2, "0")}</span>
                <small>{place.kind}</small>
                <strong>{place.name}</strong>
                <p>{place.intro}</p>
              </a>
            ))}
          </div>
        </section>

        <div id="world-characters" className="world-experience__chapter world-experience__chapter--characters">
          <span className="world-experience__chapter-number" aria-hidden="true">02</span>
          {characterFeatures.map((feature) => (
            <div className="world-experience__characters wrap" key={feature.title}>
              <WorldCharacters feature={feature} />
            </div>
          ))}
        </div>

        <div id="world-map" className="world-experience__map world-experience__chapter">
          <span className="world-experience__chapter-number" aria-hidden="true">03</span>
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
          <span className="world-experience__section-number" aria-hidden="true">04</span>
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
