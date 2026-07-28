import { I, TI } from "./Icons.jsx";

/**
 * The three transient FX overlays layered above everything else:
 *   - sparks: the cursor trail + the burst that plays when a treasure
 *     or a badge is found, positioned at an exact screen coordinate
 *   - drips: chocolate droplets falling from the top of the screen,
 *     triggered by poking the Chocolate Mountain map pin
 *   - confetti: falling celebratory shapes, used for the magic word,
 *     completing the quiz, and unlocking a badge
 *
 * All three are pure render — App.jsx owns the state arrays and the
 * setTimeout cleanup that removes each entry once its CSS animation
 * finishes (see .spark, .drip, .conf in components.css).
 */
export function FxLayers({ sparks, drips, confetti }) {
  return (
    <>
      {sparks.map((p) => (
        <span key={p.id} className="spark" style={{ left: p.x, top: p.y, width: p.size, height: p.size }}>
          {I.star(p.c)}
        </span>
      ))}
      {drips.map((d) => (
        <span key={d.id} className="drip" style={{ left: `${d.left}%`, "--h": `${d.h}px`, animationDelay: `${d.delay}s` }} />
      ))}
      {confetti.map((b) => (
        <span
          key={b.id}
          className="conf"
          style={{ left: `${b.left}%`, width: b.size, height: b.size, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
        >
          {TI[b.kind]()}
        </span>
      ))}
    </>
  );
}
