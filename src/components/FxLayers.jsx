import { I, TI } from "./Icons.jsx";

/**
 * The transient FX overlays layered above everything else:
 *   - sparks: the cursor trail + the burst that plays when a treasure
 *     or a badge is found, positioned at an exact screen coordinate
 *   - wowFx: the falling/rising particles for each map location's
 *     signature "wow" effect (chocolate drips, berries, donuts,
 *     jellybeans, frost sparkles) — see WOW_FX in App.jsx
 *   - confetti: falling celebratory shapes, used for the magic word,
 *     completing the quiz, unlocking a badge, and the Candy Path
 *     Square piñata wow effect
 *   - flash: a brief full-screen light flash, used for the piñata "pop"
 *
 * All of these are pure render — App.jsx owns the state arrays and the
 * setTimeout cleanup that removes each entry once its CSS animation
 * finishes (see .spark, .wow-fx, .conf, .wow-flash in components.css).
 */
export function FxLayers({ sparks, wowFx, confetti, flash }) {
  return (
    <>
      {sparks.map((p) => (
        <span key={p.id} className="spark" style={{ left: p.x, top: p.y, width: p.size, height: p.size }}>
          {I.star(p.c)}
        </span>
      ))}
      {wowFx.map((d) => (
        <span
          key={d.id}
          className={`wow-fx wow-${d.kind}`}
          style={{ left: `${d.left}%`, "--dist": `${d.dist}px`, animationDelay: `${d.delay}s` }}
        />
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
      {flash && <span className="wow-flash" aria-hidden="true" />}
    </>
  );
}
