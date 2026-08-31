import { I, TI } from "./Icons.jsx";

/**
 * The transient FX overlays layered above everything else:
 *   - sparks: the cursor trail + the burst that plays when a treasure
 *     or a badge is found, positioned at an exact screen coordinate
 *   - wowFx: the per-location particles for each map location's
 *     signature "wow" effect — falling, rising, bouncing, drifting,
 *     a ground trail, a radial spark shower, a smoke puff, or a
 *     scattered flicker, depending on `kind` — see WOW_FX in App.jsx
 *   - wowRings / wowStreaks: two alternative wow mechanics (an
 *     expanding alarm-style pulse, and a fast motion-blur streak)
 *   - confetti: falling celebratory shapes, used for the magic word,
 *     completing the quiz, unlocking a badge, and the Candy Path
 *     Square piñata wow effect
 *   - flash: a brief full-screen tinted flash ("gold", "green", or a
 *     held "dark" vignette), used by a handful of wow effects
 *
 * All of these are pure render — App.jsx owns the state arrays and the
 * setTimeout cleanup that removes each entry once its CSS animation
 * finishes (see .spark, .wow-fx, .wow-ring, .wow-streak, .conf,
 * .wow-flash in components.css).
 */
export function FxLayers({ sparks, wowFx, wowRings, wowStreaks, confetti, flash }) {
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
          style={{
            left: `${d.left}%`,
            ...(d.top !== undefined ? { top: `${d.top}%` } : {}),
            "--dist": `${d.dist}px`,
            ...(d.dx !== undefined ? { "--dx": `${d.dx}px` } : {}),
            ...(d.dy !== undefined ? { "--dy": `${d.dy}px` } : {}),
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
      {(wowRings || []).map((r) => (
        <span key={r.id} className="wow-ring" style={{ "--ring-color": r.color, animationDelay: `${r.delay}s` }} />
      ))}
      {(wowStreaks || []).map((s) => (
        <span key={s.id} className={`wow-streak wow-streak-${s.image}`} style={{ top: `${s.top}%`, animationDelay: `${s.delay}s` }} />
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
      {flash && <span className={`wow-flash wow-flash-${flash}`} aria-hidden="true" />}
    </>
  );
}
