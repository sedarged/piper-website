import { CAST } from "../data/cast.js";
import { CHARACTER_ART } from "../generated-assets/artwork.js";
import { Reveal } from "./Reveal.jsx";
import { SpriteArt } from "./SpriteArt.jsx";
import { Treasure } from "./Treasure.jsx";

/**
 * The "cast" section — a four-up grid of character cards. Tapping one
 * opens the CastDrawer. Character artwork is sourced from the corrected
 * August 2026 website asset batch so the Snack Squad stays on-model.
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
              <div className="cc-f" style={{ overflow: "hidden" }}>
                <SpriteArt
                  art={CHARACTER_ART[c.key]}
                  alt={c.name}
                  style={{ height: "100%", minHeight: 290, backgroundColor: "rgba(255,246,233,.5)" }}
                />
              </div>
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
