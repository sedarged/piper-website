import { drive, ASSET, AMAZON_URL } from "../config.js";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";
import { Treasure } from "./Treasure.jsx";

/**
 * Cinematic hero section. The illustration occupies the right column as
 * a dark-framed portrait; the left column leads with a gold eyebrow rule,
 * the oversized display title with strawberry text-shadow halo, and a
 * subtitle in warm gold. The primary CTA is Amazon; the secondary is the
 * quiz scroll-link.
 */
export function Hero({ found, onFind, onNameTap, chime }) {
  return (
    <header className="wrap hero" id="top">
      <Treasure id="berry" found={found.has("berry")} onFind={onFind} style={{ bottom: 6, left: "calc(var(--pad) + 2px)" }} />

      <div className="hero-g">
        <Reveal kind="rv-l">
          {/* Gold eyebrow rule */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: "rgba(255,200,60,0.5)", flexShrink: 0 }} />
            <span className="eyebrow" style={{ color: "rgba(255,200,60,0.7)" }}>A picture book series · Ages 3–7</span>
            <div style={{ height: 1, width: 32, background: "rgba(255,200,60,0.5)", flexShrink: 0 }} />
          </div>

          <h1
            className="d hero-t"
            onClick={() => { chime(760, 0.15); onNameTap(); }}
            title="Tap her name"
          >
            Piper
          </h1>
          <p className="hero-s">the Strawberry Food Kitten</p>

          <div className="panel" style={{ marginTop: 28, padding: "clamp(20px,3vw,30px)" }}>
            <p className="lead" style={{ margin: 0 }}>
              In a town where the roofs are biscuits and the trees grow donuts, four small kittens keep
              deciding that somebody ought to do something — and that somebody is them.
            </p>
            <div style={{ display: "flex", gap: 11, flexWrap: "wrap", marginTop: 22 }}>
              <a className="btn b-straw btn-lg" href={AMAZON_URL} target="_blank" rel="noreferrer">Buy book one →</a>
              <button className="btn b-ghost btn-lg" onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}>
                Which kitten are you?
              </button>
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
