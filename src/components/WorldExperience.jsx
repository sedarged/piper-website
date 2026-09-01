import { WorldMap } from "./WorldMap.jsx";

/**
 * A minimal page shell for a newly-unlocked world (Sandwich Kingdom,
 * Crumbhollow): a small top bar with a way back to the world-select
 * screen, a short intro, and the interactive map itself.
 *
 * Deliberately lighter than SnackvilleExperience — no parallax sky, nav
 * sections, quiz or badges yet. Same map interaction pattern, though
 * (see WorldMap.jsx), so it still feels like part of the same site. The
 * optional `coverSrc` renders that world's own carousel cover art next
 * to the intro copy so the hero isn't text-only next to Snackville's
 * illustrated one.
 */
export function WorldExperience({ worldClass, brandLabel, title, tagline, coverSrc, coverAlt, mapEyebrow, mapHeading, mapLead, places, mapSrc, mapAlt, mapWidth, mapHeight, onBackHome }) {
  return (
    <div className={`world-experience ${worldClass}`}>
      <a className="skip-link" href="#world-map">Skip to the map</a>
      <header className="world-experience__bar">
        <button className="world-experience__brand" onClick={onBackHome}>
          <span aria-hidden="true">←</span> {brandLabel}
        </button>
      </header>

      <main>
        <section className={`world-experience__hero ${coverSrc ? "world-experience__hero--with-cover" : ""}`}>
          <div className="world-experience__hero-copy">
            <p className="universe-kicker">The Piper Storyworld</p>
            <h1>{title}</h1>
            <p className="world-experience__tagline">{tagline}</p>
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
