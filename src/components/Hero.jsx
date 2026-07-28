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
          <div style={{
            display: "inline-block", background: "var(--cream)", borderRadius: 100,
            padding: "7px 18px", marginBottom: 18, boxShadow: "0 4px 0 rgba(42,26,46,.12)",
          }}>
            <span className="eyebrow" style={{ color: "var(--ink60)" }}>A picture book series · Ages 3–7</span>
          </div>

          <h1
            className="d hero-t"
            onClick={() => { chime(760, 0.15); onNameTap(); }}
            title="Tap her name"
          >
            Piper
          </h1>
          <p className="hero-s">the Strawberry Food Kitten</p>

          <div className="panel" style={{ marginTop: 24, padding: "clamp(20px,3vw,30px)" }}>
            <p className="lead" style={{ margin: 0 }}>
              In a town where the roofs are biscuits and the trees grow donuts, four small kittens keep
              deciding that somebody ought to do something — and that somebody is them.
            </p>
            <div style={{ display: "flex", gap: 11, flexWrap: "wrap", marginTop: 22 }}>
              <button className="btn b-grape btn-lg" onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}>
                Which kitten are you? →
              </button>
              <a className="btn b-ghost btn-lg" href={AMAZON_URL} target="_blank" rel="noreferrer">Buy book one</a>
            </div>
            <p style={{ fontSize: 14.5, color: "var(--ink40)", marginTop: 14 }}>
              Free colouring pages and a printable map when you join.
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="blob">
            <Img src={drive(ASSET.squad, 900)} alt="Piper and the Snack Squad" fb="Snack Squad" />
          </div>
        </Reveal>
      </div>
    </header>
  );
}
