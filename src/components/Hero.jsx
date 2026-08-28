import { ASSET, AMAZON_URL } from "../config.js";
import { CHARACTER_ART } from "../generated-assets/artwork.js";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";
import { SpriteArt } from "./SpriteArt.jsx";
import { Treasure } from "./Treasure.jsx";

const WORLDS = [
  {
    id: "map",
    kicker: "20 places to discover",
    title: "Explore Snackville",
    copy: "Open the official map and introduce every magical location.",
    image: "/images/snackville-interactive-map.jpeg",
  },
  {
    id: "cast",
    kicker: "Four very special kittens",
    title: "Meet the Snack Squad",
    copy: "Get to know Piper, Croissant Kitty, Toast Kitty and Sandwich Kitty.",
    art: CHARACTER_ART.squad,
  },
  {
    id: "books",
    kicker: "The illustrated collection",
    title: "Discover the Books",
    copy: "Follow Piper's growing collection of brave, funny Snackville adventures.",
    image: "/images/books/custard-alien-invasion.webp",
  },
  {
    id: "inside",
    kicker: "Real pages from the story",
    title: "Look Inside",
    copy: "Turn through a hand-picked preview before choosing your next bedtime story.",
    image: "/images/inside/custard-page-17.webp",
  },
];

export function Hero({ found, onFind }) {
  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header className="wrap hero" id="top">
      <Treasure id="berry" found={found.has("berry")} onFind={onFind} style={{ bottom: 6, left: "calc(var(--pad) + 2px)" }} />

      <div className="hero-g">
        <Reveal kind="rv-l">
          <div className="hero-kicker">
            <span className="eyebrow">An illustrated story world · Ages 3–7</span>
          </div>

          <h1 className="d hero-t">Piper</h1>
          <p className="hero-s">the Strawberry Food Kitten</p>
          <p className="hero-display">
            Step into a world where courage tastes like <span>strawberries.</span>
          </p>

          <div className="hero-copy">
            <p>
              Welcome to Snackville — a berry-sweet town where friendship is brave,
              every path holds a little magic, and four unlikely heroes are always ready for adventure.
            </p>
            <div className="hero-actions">
              <button className="btn b-straw btn-lg" onClick={() => goTo("worlds")}>
                Explore Piper's World <span aria-hidden="true">→</span>
              </button>
              <a className="btn b-ghost btn-lg" href={AMAZON_URL} target="_blank" rel="noreferrer">Discover the books</a>
            </div>
            <p className="hero-note">Piper and the Snack Squad are waiting for you.</p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <figure className="hero-feature">
            <div className="hero-book-stage">
              <span className="hero-book-glow" aria-hidden="true" />
              <div className="hero-book-cover">
                <Img
                  src={ASSET.book1}
                  alt="Cover of Piper and the Custard Alien Invasion"
                  fb="Piper — Book one"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>
            </div>
            <figcaption className="hero-book-caption">
              <span>Book one · Available now</span>
              <strong>The Custard Alien Invasion</strong>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <Reveal kind="rv-up">
        <nav className="world-chooser" id="worlds" aria-label="Explore Piper's world">
          <div className="world-heading">
            <span className="eyebrow">Choose where to begin</span>
            <h2 className="world-title">Explore more of Piper's world</h2>
            <p>Every doorway leads somewhere different. Pick one now — or wander through them all.</p>
          </div>
          <div className="world-grid">
            {WORLDS.map((world, index) => (
              <button
                type="button"
                className="world-card"
                key={world.id}
                onClick={() => goTo(world.id)}
                aria-label={`${world.title}: ${world.copy}`}
              >
                <span className="world-image" style={{ overflow: "hidden" }}>
                  {world.art ? (
                    <SpriteArt art={world.art} alt="" style={{ height: "100%", minHeight: 230 }} />
                  ) : (
                    <Img src={world.image} alt="" fb={world.title} />
                  )}
                </span>
                <span className="world-number" aria-hidden="true">0{index + 1}</span>
                <span className="world-copy">
                  <span className="world-kicker">{world.kicker}</span>
                  <strong>{world.title}</strong>
                  <span>{world.copy}</span>
                </span>
                <span className="world-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </nav>
      </Reveal>
    </header>
  );
}
