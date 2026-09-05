import { I, TI } from "./Icons.jsx";

/**
 * The transient FX overlays layered above everything else:
 *   - sparks:      the cursor trail, and the burst that plays when a
 *                  treasure is found, positioned at an exact screen
 *                  coordinate
 *   - wowFx:       the per-location particles for each map location's
 *                  signature effect. Each entry's `kind` selects both
 *                  its sprite and its own trajectory — see wow.css
 *   - wowRings:    the HQ alarm's expanding pulses
 *   - wowStreaks:  an illustrated speed-streak crossing the screen
 *   - speedLines:  the horizontal motion lines drawn behind Croissant
 *                  Kitty's dash
 *   - confetti:    falling celebratory shapes, used for the magic word,
 *                  the quiz, badges and the Candy Path Square piñata
 *   - wash:        a full-screen colour wash — the volcano's ember
 *                  flare, the landing site's scan-beam, the caves'
 *                  creeping frost
 *
 * All of these are pure render. App.jsx (for Snackville) and WorldMap
 * (for the other worlds) own the state arrays and the setTimeout
 * cleanup that removes each entry once its CSS animation finishes.
 */
export function FxLayers({ sparks, wowFx, wowRings, wowStreaks, speedLines, confetti, wash }) {
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
        <span
          key={s.id}
          className={`wow-streak wow-streak-${s.image}`}
          style={{ top: `${s.top}%`, animationDelay: `${s.delay}s` }}
        />
      ))}

      {(speedLines || []).map((line) => (
        <span
          key={line.id}
          className="wow-speedline"
          style={{ top: `${line.top}%`, animationDelay: `${line.delay}s`, opacity: line.opacity }}
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

      {wash && <span className={`wow-wash wow-wash-${wash}`} aria-hidden="true" />}
    </>
  );
}
