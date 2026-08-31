import { useState } from "react";
import { C } from "../../styles/tokens.js";

const VIEWBOX = 240;
const pct = (px) => `${(px / VIEWBOX) * 100}%`;

const PALETTE = [C.strawberry, C.butter, C.mint, C.sky, C.grape, C.ember, C.cocoa, "#FFFFFF"];
const COLOR_NAMES = ["Strawberry", "Butter", "Mint", "Sky", "Grape", "Ember", "Cocoa", "White"];

const REGION_LABELS = {
  sky: "Sky", ground: "Ground", wall: "Cottage wall", roof: "Roof", door: "Door",
  window: "Window", berry1: "Berry", berry2: "Berry", berry3: "Berry",
};

/** Click/tap+keyboard hit-areas laid over the SVG picture, in the same
 * back-to-front order as the shapes below (so an overlapping region —
 * the roof over the sky, say — takes priority the same way the visible
 * paint does). Real HTML `<button>`s, not SVG elements with `tabIndex`:
 * Chromium's actual Tab-key traversal skips `tabindex`-only SVG shapes
 * even though they're individually `.focus()`-able, so that approach
 * silently locked keyboard users out despite looking correct. */
const HIT_AREAS = [
  { id: "sky", x: 0, y: 0, w: 240, h: 150 },
  { id: "ground", x: 0, y: 150, w: 240, h: 90 },
  { id: "wall", x: 70, y: 110, w: 100, h: 90 },
  { id: "roof", x: 60, y: 55, w: 120, h: 55, clip: "polygon(0% 100%, 50% 0%, 100% 100%)" },
  { id: "door", x: 108, y: 150, w: 24, h: 50 },
  { id: "window", x: 142, y: 125, w: 28, h: 28 },
  { id: "berry1", x: 24, y: 168, w: 28, h: 28, round: true },
  { id: "berry2", x: 44, y: 184, w: 28, h: 28, round: true },
  { id: "berry3", x: 186, y: 174, w: 28, h: 28, round: true },
];

/**
 * A click-to-fill colouring page: an original line-art scene of Piper's
 * Strawberry Cottage made of a handful of paintable regions. No canvas,
 * no flood-fill algorithm and no external artwork — picking a colour
 * and tapping a region just sets that region's fill.
 *
 * The SVG itself is purely decorative (`aria-hidden`); a transparent
 * `<button>` overlay positioned over each region does the actual
 * interaction, so every region is reachable and paintable by Tab +
 * Enter/Space with no custom keyboard handling needed.
 */
export function ColoringPage({ onComplete }) {
  const [color, setColor] = useState(C.strawberry);
  const [colorName, setColorName] = useState(COLOR_NAMES[0]);
  const [fills, setFills] = useState({});

  const paint = (id) => setFills((f) => ({ ...f, [id]: color }));
  const filledCount = Object.keys(fills).length;
  const done = filledCount >= HIT_AREAS.length;

  return (
    <div className="coloring-game">
      <div className="coloring-palette" role="listbox" aria-label="Choose a colour">
        {PALETTE.map((c, i) => (
          <button
            key={c} className={`swatch ${color === c ? "on" : ""}`} style={{ background: c }}
            onClick={() => { setColor(c); setColorName(COLOR_NAMES[i]); }}
            aria-label={`Colour ${COLOR_NAMES[i]}`} aria-pressed={color === c}
          />
        ))}
      </div>

      <div className="coloring-canvas">
        <svg viewBox="0 0 240 240" className="coloring-svg" aria-hidden="true">
          <rect x="0" y="0" width="240" height="150" fill={fills.sky || "#fff"} stroke="#2A1A2E" strokeWidth="2" />
          <rect x="0" y="150" width="240" height="90" fill={fills.ground || "#fff"} stroke="#2A1A2E" strokeWidth="2" />
          <rect x="70" y="110" width="100" height="90" fill={fills.wall || "#fff"} stroke="#2A1A2E" strokeWidth="2" />
          <polygon points="60,110 120,55 180,110" fill={fills.roof || "#fff"} stroke="#2A1A2E" strokeWidth="2" />
          <rect x="108" y="150" width="24" height="50" fill={fills.door || "#fff"} stroke="#2A1A2E" strokeWidth="2" />
          <rect x="142" y="125" width="28" height="28" fill={fills.window || "#fff"} stroke="#2A1A2E" strokeWidth="2" />
          <circle cx="38" cy="182" r="14" fill={fills.berry1 || "#fff"} stroke="#2A1A2E" strokeWidth="2" />
          <circle cx="58" cy="198" r="14" fill={fills.berry2 || "#fff"} stroke="#2A1A2E" strokeWidth="2" />
          <circle cx="200" cy="188" r="14" fill={fills.berry3 || "#fff"} stroke="#2A1A2E" strokeWidth="2" />
        </svg>
        <div className="coloring-hitareas">
          {HIT_AREAS.map((h) => (
            <button
              key={h.id}
              className="coloring-hit"
              style={{ left: pct(h.x), top: pct(h.y), width: pct(h.w), height: pct(h.h), borderRadius: h.round ? "50%" : 0, clipPath: h.clip }}
              onClick={() => paint(h.id)}
              aria-label={`${REGION_LABELS[h.id]}, currently ${fills[h.id] ? "painted" : "unpainted"}. Paint it ${colorName}.`}
            />
          ))}
        </div>
      </div>

      <p className="coloring-hint u">
        Pick a colour, then tap a shape to paint it. {filledCount}/{HIT_AREAS.length} coloured.
      </p>
      <button className="btn b-straw" disabled={!done} onClick={onComplete}>
        {done ? "Finish my picture!" : "Keep colouring…"}
      </button>
    </div>
  );
}
