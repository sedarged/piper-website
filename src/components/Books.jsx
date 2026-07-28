import { useState } from "react";
import { drive, AMAZON_URL } from "../config.js";
import { BOOKS } from "../data/books.js";
import { C } from "../styles/tokens.js";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";

/**
 * The two book rows, each rendered as a CSS 3D-transformed cover with
 * a printed spine and page-edge stack, alternating left/right layout.
 * Clicking a cover plays a full spin animation (see .bk3.sp in
 * components.css) and marks that book as "spun" for the Explorer ring.
 */
export function Books({ mark, chime }) {
  const [spinning, setSpinning] = useState(null);

  const spin = (id) => {
    if (spinning) return;
    setSpinning(id);
    chime(520, 0.18);
    mark(`book-${id}`);
    setTimeout(() => setSpinning(null), 1200);
  };

  return (
    <>
      <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
        <div className="eyebrow on-sky-s" style={{ marginBottom: 12, opacity: 0.72 }}>The books</div>
        <h2 className="h2 on-sky">Two so far</h2>
        <p className="lead on-sky-s" style={{ margin: "14px auto 0", fontWeight: 400 }}>Tap a book to spin it.</p>
      </Reveal>

      <div style={{ display: "grid", gap: "clamp(30px,5vw,64px)" }}>
        {BOOKS.map((b, i) => (
          <Reveal key={b.id} kind="rv-up">
            <div className={`panel bk-row ${i % 2 ? "alt" : ""}`}>
              <div className="bk-st">
                <div
                  className={`bk3 ${spinning === b.id ? "sp" : ""}`}
                  onClick={() => spin(b.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Spin ${b.title}`}
                  onKeyDown={(e) => { if (e.key === "Enter") spin(b.id); }}
                >
                  <div className="bk-e" aria-hidden="true" />
                  <div className="bk-sp" style={{ background: b.spine }} aria-hidden="true">
                    <span>Piper — {b.num}</span>
                  </div>
                  <div className="bk-f" style={{ background: b.front }}>
                    <Img src={drive(b.img, 700)} alt={`${b.title} cover`} fb={b.num} />
                  </div>
                </div>
              </div>

              <div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
                  <span className="eyebrow">{b.num}</span>
                  <span className="pill" style={{ background: b.live ? C.mint : "rgba(42,26,46,.1)", color: b.live ? "#0A3D26" : "var(--ink60)" }}>
                    {b.status}
                  </span>
                </div>
                <h3 className="h3" style={{ maxWidth: "16ch" }}>{b.title}</h3>
                <p className="lead" style={{ marginTop: 14, fontSize: 17.5 }}>{b.blurb}</p>
                <div className="meta">{b.meta.map((m) => <span key={m}>{m}</span>)}</div>
                {b.live ? (
                  <a className="btn b-straw" href={AMAZON_URL} target="_blank" rel="noreferrer">Buy on Amazon UK →</a>
                ) : (
                  <button className="btn b-mint" onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}>
                    Tell me when it's out
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
