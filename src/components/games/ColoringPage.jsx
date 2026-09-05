import { useState } from "react";
import { C } from "../../styles/tokens.js";

const VIEWBOX = 260;
const pct = (px) => `${(px / VIEWBOX) * 100}%`;

const PALETTE = [
  { c: C.strawberry, name: "Strawberry" },
  { c: C.butter, name: "Butter" },
  { c: C.mint, name: "Mint" },
  { c: C.sky, name: "Sky" },
  { c: C.grape, name: "Grape" },
  { c: C.ember, name: "Ember" },
  { c: C.cocoa, name: "Cocoa" },
  { c: "#F49AC1", name: "Bubblegum" },
  { c: "#7FD8C8", name: "Seafoam" },
  { c: "#FFFFFF", name: "White" },
];

/**
 * Every paintable region, as a single source of truth for both the
 * decorative SVG shape and its keyboard/tap hit-area — so the two can
 * never drift out of alignment the way two independently-authored
 * geometry lists could.
 *
 * Every hit-area is a plain axis-aligned rectangle (the shape's own
 * bounding box), even for the round berries and the triangular roof.
 * A tighter-fitting `clip-path` was tried for the roof, but clip-path
 * also clips the element's own `:focus-visible` outline (outlines
 * paint outside the border box, which is exactly what clip-path
 * removes) — so a precisely-clipped hit-area is invisible-when-focused
 * for keyboard users, the same "looks correct, silently fails keyboard
 * users" failure this component exists to avoid. A slightly generous
 * rectangular hit-area with a guaranteed-visible focus ring is the
 * better trade for a kids' colouring page.
 *
 * Regions are ordered back-to-front: the SVG paints them in this order,
 * and the hit-areas are laid over them in the same order, so a small
 * region drawn on top of a big one (the door on the wall, the berries
 * on the ground) is also the one that receives the tap.
 */
const REGIONS = [
  { id: "sky", label: "Sky", svg: { tag: "rect", x: 0, y: 0, width: 260, height: 152 }, hit: { x: 0, y: 0, w: 260, h: 62 } },
  { id: "sun", label: "Sun", svg: { tag: "circle", cx: 216, cy: 40, r: 22 }, hit: { x: 194, y: 18, w: 44, h: 44 } },
  { id: "cloud", label: "Cloud", svg: { tag: "path", d: "M28 52c0-9 7-15 15-14 3-8 15-10 20-3 8-2 15 4 14 11 6 1 9 5 8 10H22c-1-2 1-4 6-4z" }, hit: { x: 20, y: 30, w: 76, h: 30 } },
  { id: "hill", label: "Far hill", svg: { tag: "path", d: "M0 152c30-34 62-40 96-22s58 12 92-16c26-21 52-16 72 4v34z" }, hit: { x: 0, y: 108, w: 260, h: 44 } },
  { id: "ground", label: "Ground", svg: { tag: "rect", x: 0, y: 152, width: 260, height: 108 }, hit: { x: 0, y: 226, w: 260, h: 34 } },
  { id: "path", label: "Garden path", svg: { tag: "path", d: "M112 260l8-52h26l14 52z" }, hit: { x: 108, y: 208, w: 60, h: 52 } },
  { id: "tree-trunk", label: "Tree trunk", svg: { tag: "rect", x: 34, y: 168, width: 14, height: 46 }, hit: { x: 34, y: 168, w: 14, h: 46 } },
  { id: "tree-top", label: "Treetop", svg: { tag: "circle", cx: 41, cy: 156, r: 28 }, hit: { x: 13, y: 128, w: 56, h: 50 } },
  { id: "wall", label: "Cottage wall", svg: { tag: "rect", x: 84, y: 124, width: 104, height: 88 }, hit: { x: 84, y: 124, w: 104, h: 88 } },
  { id: "roof", label: "Roof", svg: { tag: "polygon", points: "72,124 136,62 200,124" }, hit: { x: 72, y: 62, w: 128, h: 62 } },
  { id: "chimney", label: "Chimney", svg: { tag: "rect", x: 166, y: 76, width: 16, height: 30 }, hit: { x: 166, y: 76, w: 16, h: 30 } },
  { id: "smoke", label: "Chimney smoke", svg: { tag: "path", d: "M174 72c-8-4-2-12 4-9 5-8 14-2 10 5 6 2 3 10-4 8z" }, hit: { x: 164, y: 56, w: 30, h: 24 } },
  { id: "door", label: "Front door", svg: { tag: "rect", x: 122, y: 160, width: 28, height: 52 }, hit: { x: 122, y: 160, w: 28, h: 52 } },
  { id: "window-left", label: "Left window", svg: { tag: "rect", x: 94, y: 140, width: 24, height: 24 }, hit: { x: 94, y: 140, w: 24, h: 24 } },
  { id: "window-right", label: "Right window", svg: { tag: "rect", x: 156, y: 140, width: 24, height: 24 }, hit: { x: 156, y: 140, w: 24, h: 24 } },
  { id: "fence", label: "Garden fence", svg: { tag: "path", d: "M196 200h56v6h-56zm4 -12h8v34h-8zm18 0h8v34h-8zm18 0h8v34h-8z" }, hit: { x: 196, y: 188, w: 58, h: 34 } },
  { id: "berry1", label: "Berry 1", svg: { tag: "circle", cx: 36, cy: 232, r: 14 }, hit: { x: 22, y: 218, w: 28, h: 28 } },
  { id: "berry2", label: "Berry 2", svg: { tag: "circle", cx: 66, cy: 244, r: 14 }, hit: { x: 52, y: 230, w: 28, h: 28 } },
  { id: "berry3", label: "Berry 3", svg: { tag: "circle", cx: 214, cy: 240, r: 14 }, hit: { x: 200, y: 226, w: 28, h: 28 } },
];

function RegionShape({ region, fill }) {
  const common = { fill, stroke: "#2A1A2E", strokeWidth: 2, strokeLinejoin: "round" };
  const { tag } = region.svg;
  if (tag === "rect") {
    return <rect x={region.svg.x} y={region.svg.y} width={region.svg.width} height={region.svg.height} {...common} />;
  }
  if (tag === "circle") {
    return <circle cx={region.svg.cx} cy={region.svg.cy} r={region.svg.r} {...common} />;
  }
  if (tag === "path") {
    return <path d={region.svg.d} {...common} />;
  }
  return <polygon points={region.svg.points} {...common} />;
}

/**
 * A click-to-fill colouring page: an original line-art scene of Piper's
 * Strawberry Cottage made of nineteen paintable regions. No canvas, no
 * flood-fill algorithm and no external artwork — picking a colour and
 * tapping a region just sets that region's fill.
 *
 * The SVG itself is purely decorative (`aria-hidden`); a transparent
 * `<button>` overlay positioned over each region does the actual
 * interaction, so every region is reachable and paintable by Tab +
 * Enter/Space with no custom keyboard handling needed. Chromium's
 * actual Tab-key traversal skips `tabindex`-only SVG shapes even
 * though they're individually `.focus()`-able, so real HTML buttons
 * are used instead of making the SVG shapes themselves focusable.
 *
 * Undo matters more here than anywhere else on the site: painting the
 * sky brown by accident is the single most likely way for a small child
 * to end up upset with a drawing they can't fix, and "start again" is a
 * miserable answer to it.
 */
export function ColoringPage({ onComplete, chime }) {
  const [colorIndex, setColorIndex] = useState(0);
  // A stack of every stroke made, so undo can step back through them
  // one at a time. Each entry records what the region was *before*.
  const [history, setHistory] = useState([]);

  const color = PALETTE[colorIndex].c;
  const colorName = PALETTE[colorIndex].name;

  // The current picture is the history replayed — one source of truth,
  // so undo can never leave the fills and the history disagreeing.
  const fills = history.reduce((acc, stroke) => ({ ...acc, [stroke.id]: stroke.to }), {});
  const filledCount = Object.keys(fills).length;
  const done = filledCount >= REGIONS.length;

  const paint = (id) => {
    if (fills[id] === color) return;
    chime?.(420 + colorIndex * 46, 0.09);
    setHistory((h) => [...h, { id, to: color }]);
  };

  const undo = () => {
    if (!history.length) return;
    chime?.(320, 0.1);
    setHistory((h) => h.slice(0, -1));
  };

  const clear = () => {
    if (!history.length) return;
    chime?.(260, 0.16);
    setHistory([]);
  };

  return (
    <div className="coloring-game">
      <div className="coloring-palette" role="group" aria-label="Choose a colour">
        {PALETTE.map((swatch, i) => (
          <button
            key={swatch.c}
            className={`swatch ${colorIndex === i ? "on" : ""}`}
            style={{ background: swatch.c }}
            onClick={() => setColorIndex(i)}
            aria-label={`Colour ${swatch.name}`}
            aria-pressed={colorIndex === i}
          />
        ))}
      </div>

      <div className="coloring-canvas">
        <svg viewBox="0 0 260 260" className="coloring-svg" aria-hidden="true">
          {REGIONS.map((r) => <RegionShape key={r.id} region={r} fill={fills[r.id] || "#fff"} />)}
        </svg>
        <div className="coloring-hitareas">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              className="coloring-hit"
              style={{ left: pct(r.hit.x), top: pct(r.hit.y), width: pct(r.hit.w), height: pct(r.hit.h) }}
              onClick={() => paint(r.id)}
              aria-label={`${r.label}, currently ${fills[r.id] ? "painted" : "unpainted"}. Paint it ${colorName}.`}
            />
          ))}
        </div>
      </div>

      <p className="coloring-hint u" aria-live="polite">
        Pick a colour, then tap a shape to paint it. {filledCount}/{REGIONS.length} coloured.
      </p>

      <div className="game-actions">
        <button className="btn b-ghost btn-sm" onClick={undo} disabled={!history.length}>
          ↩ Undo
        </button>
        <button className="btn b-ghost btn-sm" onClick={clear} disabled={!history.length}>
          Start over
        </button>
        <button className="btn b-straw" disabled={!done} onClick={onComplete}>
          {done ? "Finish my picture!" : "Keep colouring…"}
        </button>
      </div>
    </div>
  );
}
