import { useState } from "react";
import { C } from "../../styles/tokens.js";

const VIEWBOX = 320;
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
 * Paintable pieces of Piper's real Strawberry Cottage. The silhouette and
 * details follow the approved artwork: a plump strawberry-shaped house,
 * leafy crown, dripping pink icing, round attic window, arched front door,
 * flower garden and winding biscuit path.
 *
 * Each piece owns both its SVG geometry and a generous rectangular HTML
 * hit-area. Keeping the buttons as real HTML makes every colourable part
 * reachable with Tab + Enter/Space and gives it a dependable focus ring.
 */
export const COTTAGE_REGIONS = [
  { id: "sky", label: "Sky", svg: { tag: "rect", x: 0, y: 0, width: 320, height: 218 }, hit: { x: 0, y: 0, w: 320, h: 48 } },
  { id: "hills", label: "Strawberry hills", svg: { tag: "path", d: "M0 193c35-30 66-35 97-16 28 17 49 14 79-12 40-35 94-27 144 14v46H0z" }, hit: { x: 0, y: 165, w: 320, h: 44 } },
  { id: "ground", label: "Garden lawn", svg: { tag: "path", d: "M0 207c48-10 91-7 128 4 47 13 101 11 192-9v118H0z" }, hit: { x: 0, y: 286, w: 320, h: 34 } },
  { id: "path", label: "Winding biscuit path", svg: { tag: "path", d: "M137 320c-4-20 2-36 23-50 15-10 19-22 10-38l36-5c13 25 4 45-24 61-14 8-18 19-12 32z" }, hit: { x: 132, y: 232, w: 74, h: 88 } },
  { id: "cottage", label: "Strawberry cottage walls", svg: { tag: "path", d: "M82 128C84 86 116 61 158 61c43 0 76 25 80 67l15 93c5 34-18 57-54 58h-82c-36-1-59-24-54-58z" }, hit: { x: 67, y: 111, w: 181, h: 168 } },
  { id: "icing", label: "Strawberry icing roof", svg: { tag: "path", d: "M82 132C83 91 116 65 158 65c43 0 75 26 80 67-9 7-18 9-28 3-8-5-15-2-19 7-5 12-18 13-25 1-7-13-20-12-28 0-7 11-20 10-25-2-4-10-12-13-20-7-4 3-8 3-11-2z" }, hit: { x: 82, y: 70, w: 156, h: 72 } },
  { id: "leaf-left", label: "Left roof leaf", svg: { tag: "path", d: "M158 67c-23-2-45-14-57-38 27-5 49 4 62 29z" }, hit: { x: 100, y: 24, w: 62, h: 43 } },
  { id: "leaf-centre", label: "Centre roof leaf", svg: { tag: "path", d: "M157 65c-9-24-5-47 10-64 18 17 21 40 5 66z" }, hit: { x: 148, y: 0, w: 38, h: 67 } },
  { id: "leaf-right", label: "Right roof leaf", svg: { tag: "path", d: "M169 66c12-26 34-38 62-35-9 25-28 38-57 40z" }, hit: { x: 170, y: 27, w: 62, h: 44 } },
  { id: "attic-window", label: "Round attic window", svg: { tag: "circle", cx: 160, cy: 102, r: 23 }, hit: { x: 137, y: 79, w: 46, h: 46 } },
  { id: "left-window", label: "Left cottage window", svg: { tag: "rect", x: 91, y: 174, width: 39, height: 42, rx: 16 }, hit: { x: 88, y: 170, w: 45, h: 49 } },
  { id: "right-window", label: "Right cottage window", svg: { tag: "rect", x: 190, y: 174, width: 39, height: 42, rx: 16 }, hit: { x: 187, y: 170, w: 45, h: 49 } },
  { id: "left-shutter", label: "Left strawberry shutter", svg: { tag: "path", d: "M87 174h12v42H87c-7-12-7-30 0-42z" }, hit: { x: 81, y: 170, w: 20, h: 49 } },
  { id: "right-shutter", label: "Right strawberry shutter", svg: { tag: "path", d: "M221 174h12c7 12 7 30 0 42h-12z" }, hit: { x: 220, y: 170, w: 20, h: 49 } },
  { id: "door", label: "Arched front door", svg: { tag: "path", d: "M139 270v-58c0-28 42-28 42 0v58z" }, hit: { x: 136, y: 192, w: 48, h: 78 } },
  { id: "door-heart", label: "Heart on the door", svg: { tag: "path", d: "M160 232c-12-8-18-16-12-22 5-5 10-1 12 3 2-4 7-8 12-3 6 6 0 14-12 22z" }, hit: { x: 145, y: 204, w: 30, h: 30 } },
  { id: "step", label: "Front doorstep", svg: { tag: "path", d: "M129 270h62l8 13h-78z" }, hit: { x: 120, y: 268, w: 80, h: 18 } },
  { id: "left-bush", label: "Left berry bush", svg: { tag: "path", d: "M18 253c-10-12-3-30 11-31-1-17 21-24 31-11 12-10 31 0 27 16 15 3 18 23 5 32H25z" }, hit: { x: 13, y: 204, w: 78, h: 56 } },
  { id: "right-bush", label: "Right berry bush", svg: { tag: "path", d: "M230 258c-11-11-6-28 8-32-2-15 18-23 29-12 10-13 31-4 29 12 17 4 19 23 5 32z" }, hit: { x: 226, y: 207, w: 77, h: 52 } },
  { id: "left-berries", label: "Left garden strawberries", svg: { tag: "path", d: "M34 229c-6 0-10 5-8 11 2 6 8 11 8 11s7-5 8-11c2-6-2-11-8-11zm28 6c-6 0-10 5-8 11 2 6 8 11 8 11s7-5 8-11c2-6-2-11-8-11z" }, hit: { x: 23, y: 226, w: 50, h: 34 } },
  { id: "right-berries", label: "Right garden strawberries", svg: { tag: "path", d: "M250 231c-6 0-10 5-8 11 2 6 8 11 8 11s7-5 8-11c2-6-2-11-8-11zm27-4c-6 0-10 5-8 11 2 6 8 11 8 11s7-5 8-11c2-6-2-11-8-11z" }, hit: { x: 239, y: 223, w: 51, h: 33 } },
  { id: "left-flowers", label: "Left cottage flowers", svg: { tag: "path", d: "M105 259c-9-6-15 5-8 11-7 7 3 15 10 8 7 7 16-2 9-9 7-7-3-16-11-10z" }, hit: { x: 93, y: 252, w: 28, h: 30 } },
  { id: "right-flowers", label: "Right cottage flowers", svg: { tag: "path", d: "M210 252c-9-6-15 5-8 11-7 7 3 15 10 8 7 7 16-2 9-9 7-7-3-16-11-10z" }, hit: { x: 198, y: 245, w: 28, h: 30 } },
];

function RegionShape({ region, fill, onPaint }) {
  const Tag = region.svg.tag;
  const { tag: _tag, ...geometry } = region.svg;
  return <Tag className="coloring-region" {...geometry} fill={fill} stroke="#43233F" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" onClick={onPaint} />;
}

function CottageLinework() {
  return (
    <g className="cottage-linework" fill="none" stroke="#43233F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M149 102h22M160 91v22M107 175v40M91 195h39M213 175v40M190 195h39" />
      <path d="M151 63l-20-26m39 27 35-25m-38 24 2-45" />
      <path d="M104 252v-13m106 13v-14m-98 21 5 9m85-9-5 9" />
      <path d="M145 151c8 5 22 5 30 0M151 163c6 3 14 3 19 0" opacity=".55" />
      <path d="M101 150l3 3m21-9 3 3m61 3 3 3m21-9 3 3M91 233l3 3m124-2 3 3m-105-4 3 3m78 1 3 3" opacity=".55" />
      <circle cx="172" cy="242" r="2.4" fill="#43233F" />
      <path d="M151 291c7 4 16 4 23 0m-28 13c11 5 24 5 35 0" opacity=".55" />
    </g>
  );
}

export function ColoringPage({ onComplete, chime }) {
  const [colorIndex, setColorIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const color = PALETTE[colorIndex].c;
  const colorName = PALETTE[colorIndex].name;
  const fills = history.reduce((acc, stroke) => ({ ...acc, [stroke.id]: stroke.to }), {});
  const filledCount = Object.keys(fills).length;
  const done = filledCount >= COTTAGE_REGIONS.length;

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
          <button key={swatch.c} className={`swatch ${colorIndex === i ? "on" : ""}`} style={{ background: swatch.c }} onClick={() => setColorIndex(i)} aria-label={`Colour ${swatch.name}`} aria-pressed={colorIndex === i} />
        ))}
      </div>

      <div className="coloring-canvas">
        <svg viewBox="0 0 320 320" className="coloring-svg" aria-hidden="true">
          {COTTAGE_REGIONS.map((region) => <RegionShape key={region.id} region={region} fill={fills[region.id] || "#fff"} onPaint={() => paint(region.id)} />)}
          <CottageLinework />
        </svg>
        <div className="coloring-hitareas">
          {COTTAGE_REGIONS.map((region) => (
            <button key={region.id} className="coloring-hit" style={{ left: pct(region.hit.x), top: pct(region.hit.y), width: pct(region.hit.w), height: pct(region.hit.h) }} onClick={() => paint(region.id)} aria-label={`${region.label}, currently ${fills[region.id] ? "painted" : "unpainted"}. Paint it ${colorName}.`} />
          ))}
        </div>
      </div>

      <p className="coloring-hint u" aria-live="polite">Colour Piper's Strawberry Cottage! {filledCount}/{COTTAGE_REGIONS.length} areas coloured.</p>
      <div className="game-actions">
        <button className="btn b-ghost btn-sm" onClick={undo} disabled={!history.length}>↩ Undo</button>
        <button className="btn b-ghost btn-sm" onClick={clear} disabled={!history.length}>Start over</button>
        <button className="btn b-straw" disabled={!done} onClick={onComplete}>{done ? "Finish my cottage!" : "Keep colouring…"}</button>
      </div>
    </div>
  );
}
