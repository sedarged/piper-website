import { PRINTABLES } from "../data/printables.js";
import { Reveal } from "./Reveal.jsx";
import { FI } from "./Icons.jsx";

/**
 * The six free printables grid. Cards with a real `url` (see
 * data/printables.js) link out directly; cards still awaiting their
 * PDF route to the Join section instead of a dead link, so nothing
 * ever 404s while these are being produced.
 */
export function Free() {
  return (
    <>
      <Reveal style={{ textAlign: "center", marginBottom: 36 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>The Snackville studio</div>
        <h2 className="h2">Bring a little Snackville home</h2>
        <p className="lead" style={{ margin: "14px auto 0" }}>
          All free, all printable at home. Everything here comes in the welcome pack when you join.
        </p>
      </Reveal>

      <div className="free-g">
        {PRINTABLES.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            {p.url ? (
              <a className="fc" href={p.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <span style={{ width: 40, height: 40 }} aria-hidden="true">{FI[p.id]()}</span>
                <span className="d" style={{ fontSize: 21 }}>{p.name}</span>
                <span className="eyebrow">{p.n}</span>
                <span style={{ fontSize: 15.5, color: "var(--ink60)", lineHeight: 1.5 }}>{p.note}</span>
                <span className="u" style={{ fontSize: 15, color: p.ink, marginTop: 4 }}>Download →</span>
              </a>
            ) : (
              <button className="fc" onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}>
                <span style={{ width: 40, height: 40 }} aria-hidden="true">{FI[p.id]()}</span>
                <span className="d" style={{ fontSize: 21 }}>{p.name}</span>
                <span className="eyebrow">{p.n}</span>
                <span style={{ fontSize: 15.5, color: "var(--ink60)", lineHeight: 1.5 }}>{p.note}</span>
                <span className="u" style={{ fontSize: 15, color: p.ink, marginTop: 4 }}>Get it in the pack →</span>
              </button>
            )}
          </Reveal>
        ))}
      </div>
    </>
  );
}
