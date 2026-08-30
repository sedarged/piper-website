import { useState } from "react";
import { C } from "../../styles/tokens.js";

const PALETTE = [C.strawberry, C.butter, C.mint, C.sky, C.grape, C.ember, C.cocoa, "#FFFFFF"];
const REGIONS = ["sky", "ground", "wall", "roof", "door", "window", "berry1", "berry2", "berry3"];

/**
 * A click-to-fill colouring page: an original line-art scene of Piper's
 * Strawberry Cottage made of a handful of separately-clickable SVG
 * shapes. No canvas, no flood-fill algorithm and no external artwork —
 * picking a colour and tapping a shape just sets that shape's fill.
 */
export function ColoringPage({ onComplete }) {
  const [color, setColor] = useState(C.strawberry);
  const [fills, setFills] = useState({});

  const paint = (id) => setFills((f) => ({ ...f, [id]: color }));
  const filledCount = Object.keys(fills).length;
  const done = filledCount >= REGIONS.length;

  return (
    <div className="coloring-game">
      <div className="coloring-palette" role="listbox" aria-label="Choose a colour">
        {PALETTE.map((c) => (
          <button
            key={c} className={`swatch ${color === c ? "on" : ""}`} style={{ background: c }}
            onClick={() => setColor(c)} aria-label={`Colour ${c}`} aria-pressed={color === c}
          />
        ))}
      </div>

      <svg viewBox="0 0 240 240" className="coloring-svg" role="img" aria-label="Piper's cottage colouring page">
        <rect x="0" y="0" width="240" height="150" fill={fills.sky || "#fff"} stroke="#2A1A2E" strokeWidth="2" onClick={() => paint("sky")} />
        <rect x="0" y="150" width="240" height="90" fill={fills.ground || "#fff"} stroke="#2A1A2E" strokeWidth="2" onClick={() => paint("ground")} />
        <rect x="70" y="110" width="100" height="90" fill={fills.wall || "#fff"} stroke="#2A1A2E" strokeWidth="2" onClick={() => paint("wall")} />
        <polygon points="60,110 120,55 180,110" fill={fills.roof || "#fff"} stroke="#2A1A2E" strokeWidth="2" onClick={() => paint("roof")} />
        <rect x="108" y="150" width="24" height="50" fill={fills.door || "#fff"} stroke="#2A1A2E" strokeWidth="2" onClick={() => paint("door")} />
        <rect x="145" y="128" width="22" height="22" fill={fills.window || "#fff"} stroke="#2A1A2E" strokeWidth="2" onClick={() => paint("window")} />
        <circle cx="38" cy="182" r="11" fill={fills.berry1 || "#fff"} stroke="#2A1A2E" strokeWidth="2" onClick={() => paint("berry1")} />
        <circle cx="58" cy="198" r="11" fill={fills.berry2 || "#fff"} stroke="#2A1A2E" strokeWidth="2" onClick={() => paint("berry2")} />
        <circle cx="200" cy="188" r="11" fill={fills.berry3 || "#fff"} stroke="#2A1A2E" strokeWidth="2" onClick={() => paint("berry3")} />
      </svg>

      <p className="coloring-hint u">
        Pick a colour, then tap a shape to paint it. {filledCount}/{REGIONS.length} coloured.
      </p>
      <button className="btn b-straw" disabled={!done} onClick={onComplete}>
        {done ? "Finish my picture!" : "Keep colouring…"}
      </button>
    </div>
  );
}
