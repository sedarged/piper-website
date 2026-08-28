import { useState } from "react";
import { drive, AMAZON_URL } from "../config.js";
import { BOOKS } from "../data/books.js";
import { C } from "../styles/tokens.js";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";

/**
 * A restrained editorial catalogue. Selecting a cover records that the
 * visitor explored it without turning the book into a decorative gimmick.
 */
export function Books({ mark, chime }) {
  const [selected, setSelected] = useState(null);

  const explore = (id) => {
    setSelected(id);
    chime(520, 0.18);
    mark(`book-${id}`);
  };

  return (
    <>
      <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
        <div className="eyebrow on-sky-s" style={{ marginBottom: 12, opacity: 0.72 }}>The Piper collection</div>
        <h2 className="h2 on-sky">The adventures so far</h2>
        <p className="lead on-sky-s" style={{ margin: "14px auto 0", fontWeight: 400 }}>Beautifully illustrated stories about courage, kindness and friendship.</p>
      </Reveal>

      <div className="book-collection">
        {BOOKS.map((b) => (
          <Reveal key={b.id} kind="rv-up">
            <article className={`book-card ${selected === b.id ? "is-selected" : ""}`}>
              <div className="book-cover-wrap">
                <button
                  type="button"
                  className="book-cover-button"
                  onClick={() => explore(b.id)}
                  aria-label={`Explore ${b.title}`}
                  aria-pressed={selected === b.id}
                >
                  <div className="book-cover-art" style={{ background: b.front }}>
                    <Img src={drive(b.img, 700)} alt={`${b.title} cover`} fb={b.num} />
                  </div>
                  <span className="book-explore-label">Explore this book</span>
                </button>
              </div>

              <div className="book-card-copy">
                <div className="book-card-topline">
                  <span className="eyebrow">{b.num}</span>
                  <span className="pill" style={{ background: b.live ? C.mint : "rgba(42,26,46,.1)", color: b.live ? "#0A3D26" : "var(--ink60)" }}>
                    {b.status}
                  </span>
                </div>
                <h3 className="h3" style={{ maxWidth: "16ch" }}>{b.title}</h3>
                <p className="lead" style={{ marginTop: 14, fontSize: 17.5 }}>{b.blurb}</p>
                <div className="meta">{b.meta.map((m) => <span key={m}>{m}</span>)}</div>
                {b.live ? (
                  <div className="book-actions">
                    <a className="btn b-straw" href={AMAZON_URL} target="_blank" rel="noreferrer" onClick={() => explore(b.id)}>Buy on Amazon UK →</a>
                    <button className="btn b-ghost" onClick={() => { explore(b.id); document.getElementById("inside")?.scrollIntoView({ behavior: "smooth" }); }}>
                      Look inside
                    </button>
                  </div>
                ) : (
                  <button className="btn b-mint" onClick={() => { explore(b.id); document.getElementById("join")?.scrollIntoView({ behavior: "smooth" }); }}>
                    Tell me when it's out
                  </button>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </>
  );
}
