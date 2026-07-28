import { useRef } from "react";
import { drive } from "../config.js";
import { SPREADS } from "../data/books.js";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";

/**
 * A horizontally scrollable rail of real page spreads from Book 2,
 * each with its own caption. The two arrow buttons scroll by ~70% of
 * the visible rail width per click — enough to feel like a page turn
 * without skipping content.
 */
export function Inside() {
  const railRef = useRef(null);
  const scrollBy = (direction) =>
    railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.7, behavior: "smooth" });

  return (
    <>
      <div className="wrap">
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 18, flexWrap: "wrap", marginBottom: 30 }}>
          <div>
            <div className="eyebrow on-sky-s" style={{ marginBottom: 10, opacity: 0.72 }}>Look inside</div>
            <h2 className="h2 on-sky">Pages from book two</h2>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="rbtn" onClick={() => scrollBy(-1)} aria-label="Previous pages">←</button>
            <button className="rbtn" onClick={() => scrollBy(1)} aria-label="Next pages">→</button>
          </div>
        </Reveal>
      </div>

      <div className="rail" ref={railRef} style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}>
        {SPREADS.map((s, i) => (
          <figure className="sp-c" key={i}>
            <div className="sp-i"><Img src={drive(s.img, 700)} alt={s.t} fb={`p.${i + 1}`} /></div>
            <figcaption style={{
              marginTop: 12, fontSize: 15.5, lineHeight: 1.5, fontStyle: "italic",
              color: "var(--plum)", background: "rgba(255,246,233,.86)", padding: "10px 15px", borderRadius: 14,
            }}>
              {s.t}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
