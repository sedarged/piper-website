import { Reveal } from "./Reveal.jsx";
import { Treasure } from "./Treasure.jsx";

const FACTS = [
  ["3–7", "Ages"],
  ["11", "Minutes to read"],
  ["8", "Places to explore"],
];

/**
 * The "story" section — two-column editorial copy about the series,
 * plus three quick facts. Contains treasure #2 ("croix").
 */
export function Story({ found, onFind }) {
  return (
    <section className="sec wrap" id="story">
      <Treasure id="croix" found={found.has("croix")} onFind={onFind} style={{ top: 26, right: "calc(var(--pad) - 4px)" }} />

      <Reveal className="panel">
        <div
          className="about-inner"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,4vw,56px)", alignItems: "start" }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>The story</div>
            <h2 className="h2">Everything is made of something you'd want to eat</h2>
          </div>

          <div>
            <p style={{ color: "var(--ink60)", fontSize: 17.5 }}>
              Written by James Wallace-Smith and illustrated by Kamil Siedlarz, published from Edinburgh
              and Katowice. Built to be read out loud at bedtime — short sentences, big pictures, and an
              ending that settles rather than startles.
            </p>
            <p style={{ color: "var(--ink60)", fontSize: 17.5, marginTop: 14 }}>
              Nobody in Snackville wins by being the strongest. Piper wins by noticing what everyone else
              missed: that the dragon shaking the mountain wasn't angry at anybody. He was just on his own.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
              {FACTS.map(([k, v]) => (
                <div key={k} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 18, padding: "14px 20px", flex: "1 1 120px" }}>
                  <div className="d" style={{ fontSize: 32, color: "var(--straw)" }}>{k}</div>
                  <div className="eyebrow" style={{ marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
