import { drive } from "../config.js";
import { CAST } from "../data/cast.js";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";
import { Treasure } from "./Treasure.jsx";

/**
 * The "cast" section — a four-up grid of character cards. Tapping one
 * opens the CastDrawer (rendered by App.jsx, kept as a sibling rather
 * than nested here so it can slide in above everything). Contains
 * treasure #3 ("star").
 */
export function Cast({ found, onFind, onOpenCharacter, chime }) {
  return (
    <section className="sec wrap" id="cast">
      <Treasure id="star" found={found.has("star")} onFind={onFind} style={{ top: 20, left: "calc(var(--pad) + 180px)" }} />

      <Reveal style={{ textAlign: "center", marginBottom: 42 }}>
        <div className="eyebrow on-sky-s" style={{ marginBottom: 12, opacity: 0.72 }}>Meet the Snack Squad</div>
        <h2 className="h2 on-sky">Every hero brings something different</h2>
        <p className="lead on-sky-s" style={{ margin: "14px auto 0", fontWeight: 400 }}>
          Tap a character. They've each got a secret.
        </p>
      </Reveal>

      <div className="cast-g">
        {CAST.map((c, i) => (
          <Reveal key={c.key} delay={i * 80}>
            <button className="cc" onClick={() => { onOpenCharacter(i); chime(680, 0.12); }}>
              <div className="cc-f"><Img src={drive(c.img, 600)} alt={c.name} fb={c.name} /></div>
              <h3 className="cc-n">{c.name}</h3>
              <p className="cc-r">{c.role}</p>
              <p className="cc-line">{c.line}</p>
              <span className="cc-b" style={{ background: c.ink }}>{c.badge}</span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
