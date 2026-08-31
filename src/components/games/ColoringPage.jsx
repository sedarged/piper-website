import { useState } from "react";
import { C } from "../../styles/tokens.js";

const VIEWBOX = 240;
const pct = (px) => `${(px / VIEWBOX) * 100}%`;

const PALETTE = [C.strawberry, C.butter, C.mint, C.sky, C.grape, C.ember, C.cocoa, "#FFFFFF"];
const COLOR_NAMES = ["Strawberry", "Butter", "Mint", "Sky", "Grape", "Ember", "Cocoa", "White"];

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
 */
const REGIONS = [
  { id: "sky", label: "Sky", svg: { tag: "rect", x: 0, y: 0, width: 240, height: 150 }, hit: { x: 0, y: 0, w: 240, h: 150 } },
  { id: "ground", label: "Ground", svg: { tag: "rect", x: 0, y: 150, width: 240, height: 90 }, hit: { x: 0, y: 150, w: 240, h: 90 } },
  { id: "wall", label: "Cottage wall", svg: { tag: "rect", x: 70, y: 110, width: 100, height: 90 }, hit: { x: 70, y: 110, w: 100, h: 90 } },
  { id: "roof", label: "Roof", svg: { tag: "polygon", points: "60,110 120,55 180,110" }, hit: { x: 60, y: 55, w: 120, h: 55 } },
  { id: "door", label: "Door", svg: { tag: "rect", x: 108, y: 150, width: 24, height: 50 }, hit: { x: 108, y: 150, w: 24, h: 50 } },
  { id: "window", label: "Window", svg: { tag: "rect", x: 142, y: 125, width: 28, height: 28 }, hit: { x: 142, y: 125, w: 28, h: 28 } },
  { id: "berry1", label: "Berry 1", svg: { tag: "circle", cx: 38, cy: 182, r: 14 }, hit: { x: 24, y: 168, w: 28, h: 28 } },
  { id: "berry2", label: "Berry 2", svg: { tag: "circle", cx: 58, cy: 198, r: 14 }, hit: { x: 44, y: 184, w: 28, h: 28 } },
  { id: "berry3", label: "Berry 3", svg: { tag: "circle", cx: 200, cy: 188, r: 14 }, hit: { x: 186, y: 174, w: 28, h: 28 } },
];

function RegionShape({ region, fill }) {
  const common = { fill, stroke: "#2A1A2E", strokeWidth: 2 };
  if (region.svg.tag === "rect") {
    return <rect x={region.svg.x} y={region.svg.y} width={region.svg.width} height={region.svg.height} {...common} />;
  }
  if (region.svg.tag === "circle") {
    return <circle cx={region.svg.cx} cy={region.svg.cy} r={region.svg.r} {...common} />;
  }
  return <polygon points={region.svg.points} {...common} />;
}

/**
 * A click-to-fill colouring page: an original line-art scene of Piper's
 * Strawberry Cottage made of a handful of paintable regions. No canvas,
 * no flood-fill algorithm and no external artwork — picking a colour
 * and tapping a region just sets that region's fill.
 *
 * The SVG itself is purely decorative (`aria-hidden`); a transparent
 * `<button>` overlay positioned over each region does the actual
 * interaction, so every region is reachable and paintable by Tab +
 * Enter/Space with no custom keyboard handling needed. Chromium's
 * actual Tab-key traversal skips `tabindex`-only SVG shapes even
 * though they're individually `.focus()`-able, so real HTML buttons
 * are used instead of making the SVG shapes themselves focusable.
 */
export function ColoringPage({ onComplete }) {
  const [colorIndex, setColorIndex] = useState(0);
  const [fills, setFills] = useState({});

  const color = PALETTE[colorIndex];
  const colorName = COLOR_NAMES[colorIndex];
  const paint = (id) => setFills((f) => ({ ...f, [id]: color }));
  const filledCount = Object.keys(fills).length;
  const done = filledCount >= REGIONS.length;

  return (
    <div className="coloring-game">
      <div className="coloring-palette" role="listbox" aria-label="Choose a colour">
        {PALETTE.map((c, i) => (
          <button
            key={c} className={`swatch ${colorIndex === i ? "on" : ""}`} style={{ background: c }}
            onClick={() => setColorIndex(i)}
            aria-label={`Colour ${COLOR_NAMES[i]}`} aria-pressed={colorIndex === i}
          />
        ))}
      </div>

      <div className="coloring-canvas">
        <svg viewBox="0 0 240 240" className="coloring-svg" aria-hidden="true">
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

      <p className="coloring-hint u">
        Pick a colour, then tap a shape to paint it. {filledCount}/{REGIONS.length} coloured.
      </p>
      <button className="btn b-straw" disabled={!done} onClick={onComplete}>
        {done ? "Finish my picture!" : "Keep colouring…"}
      </button>
    </div>
  );
}
