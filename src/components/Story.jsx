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

      <Reveal className="panel story-panel">
        <div
          className="about-inner"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,4vw,56px)", alignItems: "start" }}
        >
          <div className="story-heading">
            <div className="eyebrow" style={{ marginBottom: 14 }}>Inside the story world</div>
            <h2 className="h2">A small hero. A big heart. An even bigger imagination.</h2>
          </div>

          <div className="story-copy">
            <p style={{ color: "var(--ink60)", fontSize: 17.5 }}>
              Piper is the brave Strawberry Food Kitten at the heart of Snackville. With Croissant Kitty,
              Toast Kitty and Sandwich Kitty beside her, she discovers that courage can be gentle and the
              best adventures begin by noticing who needs a friend.
            </p>
            <p style={{ color: "var(--ink60)", fontSize: 17.5, marginTop: 14 }}>
              Nobody in Snackville wins by being the strongest. Piper wins by noticing what everyone else
              missed: that the dragon shaking the mountain wasn't angry at anybody. He was just on his own.
            </p>
            <div className="story-facts">
              {FACTS.map(([k, v]) => (
                <div className="story-fact" key={k}>
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
