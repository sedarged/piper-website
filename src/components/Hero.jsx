import { drive, ASSET, AMAZON_URL } from "../config.js";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";
import { Treasure } from "./Treasure.jsx";

/**
 * The first screen after the gate opens. Contains treasure #1
 * ("berry"), the tappable "Piper" headline (fires the `onNameTap`
 * callback for a small confetti moment), and the two primary CTAs.
 */
export function Hero({ found, onFind, onNameTap, chime }) {
  return (
    <header className="wrap hero" id="top">
      <Treasure id="berry" found={found.has("berry")} onFind={onFind} style={{ bottom: 6, left: "calc(var(--pad) + 2px)" }} />

      <div className="hero-g">
        <Reveal kind="rv-l">
          <div className="hero-kicker">
            <span className="eyebrow">An illustrated story world · Ages 3–7</span>
          </div>

          <h1
            className="d hero-t"
            onClick={() => { chime(760, 0.15); onNameTap(); }}
            title="Tap her name"
          >
            Piper
          </h1>
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
              <button className="btn b-straw btn-lg" onClick={() => document.getElementById("map")?.scrollIntoView({ behavior: "smooth" })}>
                Enter Snackville <span aria-hidden="true">→</span>
              </button>
              <a className="btn b-ghost btn-lg" href={AMAZON_URL} target="_blank" rel="noreferrer">Discover the books</a>
            </div>
            <p className="hero-note">Piper and the Snack Squad are waiting for you.</p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="portal-shell">
            <span className="portal-star portal-star-a" aria-hidden="true">✦</span>
            <span className="portal-star portal-star-b" aria-hidden="true">✧</span>
            <div className="blob">
            <Img src={drive(ASSET.squad, 900)} alt="Piper and the Snack Squad" fb="Snack Squad" />
            </div>
            <span className="portal-caption">Welcome to Snackville</span>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
