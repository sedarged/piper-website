import { useState } from "react";
import { C } from "../../styles/tokens.js";

const VIEWBOX = 320;
const pct = (px) => `${(px / VIEWBOX) * 100}%`;
const LINE_ART = "/images/games/strawberry-cottage-line-art.png";

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
 * Broad, child-friendly paint regions sit beneath the professionally drawn
 * transparent line-art. Their inset silhouettes keep colour inside the ink,
 * while the illustration above supplies the organic edges and small detail.
 */
export const COTTAGE_REGIONS = [
  { id: "roof", label: "Strawberry icing roof", svg: { tag: "path", d: "M76 137C75 90 111 67 160 67s84 25 85 70c-12 0-11 14-22 14-12 0-11-15-23-15s-11 17-23 17-11-15-23-15-12 15-24 15-11-17-23-17-11 15-22 15-10-14-19-14z" }, hit: { x: 72, y: 73, w: 176, h: 78 } },
  { id: "walls", label: "Strawberry cottage walls", svg: { tag: "path", d: "M73 137h174l7 71c4 34-16 55-49 57H112c-33-2-51-23-47-57z" }, hit: { x: 68, y: 145, w: 184, h: 120 } },
  { id: "leaf-left", label: "Left roof leaf", svg: { tag: "path", d: "M158 68c-24-1-47-12-61-35 30-4 51 7 66 30z" }, hit: { x: 96, y: 28, w: 68, h: 43 } },
  { id: "leaf-centre", label: "Centre roof leaf", svg: { tag: "path", d: "M158 67c-12-27-6-51 7-65 18 18 21 42 5 66z" }, hit: { x: 146, y: 0, w: 42, h: 69 } },
  { id: "leaf-right", label: "Right roof leaf", svg: { tag: "path", d: "M168 67c14-27 36-38 64-33-13 25-34 36-61 37z" }, hit: { x: 169, y: 28, w: 65, h: 43 } },
  { id: "attic-window", label: "Round attic window", svg: { tag: "circle", cx: 160, cy: 105, r: 21 }, hit: { x: 138, y: 82, w: 44, h: 46 } },
  { id: "porch", label: "Flower porch canopy", svg: { tag: "path", d: "M126 178c4-21 17-32 34-32s31 11 35 32c-8-1-8 8-16 8s-8-8-16-8-8 8-17 8-8-8-20-8z" }, hit: { x: 126, y: 145, w: 70, h: 42 } },
  { id: "left-window", label: "Left cottage window", svg: { tag: "rect", x: 82, y: 175, width: 43, height: 39, rx: 15 }, hit: { x: 80, y: 172, w: 47, h: 45 } },
  { id: "right-window", label: "Right cottage window", svg: { tag: "rect", x: 195, y: 175, width: 43, height: 39, rx: 15 }, hit: { x: 193, y: 172, w: 47, h: 45 } },
  { id: "left-shutters", label: "Left strawberry shutters", svg: { tag: "path", d: "M71 174h12v42H71zm55 0h12v42h-12z" }, hit: { x: 69, y: 171, w: 70, h: 47 } },
  { id: "right-shutters", label: "Right strawberry shutters", svg: { tag: "path", d: "M182 174h12v42h-12zm56 0h12v42h-12z" }, hit: { x: 181, y: 171, w: 70, h: 47 } },
  { id: "door", label: "Arched front door", svg: { tag: "path", d: "M137 260v-57c0-29 46-29 46 0v57z" }, hit: { x: 134, y: 184, w: 52, h: 78 } },
  { id: "door-heart", label: "Heart on the door", svg: { tag: "path", d: "M160 228c-14-10-20-19-13-26 6-6 12-1 13 4 2-5 8-10 14-4 7 7 0 16-14 26z" }, hit: { x: 145, y: 199, w: 32, h: 32 } },
  { id: "left-garden", label: "Left strawberry garden", svg: { tag: "path", d: "M4 246c8-21 25-32 45-27 8-19 38-21 49-2 25-10 49 9 44 36 6 11 3 25-7 37H18c-17-10-22-25-14-44z" }, hit: { x: 5, y: 215, w: 133, h: 76 } },
  { id: "right-garden", label: "Right strawberry garden", svg: { tag: "path", d: "M181 253c-5-27 19-46 44-36 11-19 41-17 49 2 20-5 37 6 45 27 8 19 3 34-14 44H188c-10-12-13-26-7-37z" }, hit: { x: 182, y: 215, w: 133, h: 76 } },
  { id: "left-lamp", label: "Left garden lamp", svg: { tag: "path", d: "M18 244h12v-46c0-15 28-15 28 0v30H46v-30c0-4-4-7-8-7s-8 3-8 7v46z" }, hit: { x: 16, y: 187, w: 45, h: 61 } },
  { id: "right-lamp", label: "Right garden lamp", svg: { tag: "path", d: "M290 244h12v-46c0-15-28-15-28 0v30h12v-30c0-4 4-7 8-7s8 3 8 7v46z" }, hit: { x: 271, y: 187, w: 33, h: 61 } },
  { id: "path", label: "Winding biscuit path", svg: { tag: "path", d: "M100 320c14-15 28-26 49-36 16-8 19-16 10-25h42c9 15 1 29-17 39-13 7-20 14-23 22z" }, hit: { x: 98, y: 261, w: 106, h: 59 } },
];

function RegionShape({ region, fill, onPaint }) {
  const Tag = region.svg.tag;
  const { tag: _tag, ...geometry } = region.svg;
  return <Tag className="coloring-region" {...geometry} fill={fill} onClick={onPaint} />;
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
    setHistory((items) => [...items, { id, to: color }]);
  };
  const undo = () => {
    if (!history.length) return;
    chime?.(320, 0.1);
    setHistory((items) => items.slice(0, -1));
  };
  const clear = () => {
    if (!history.length) return;
    chime?.(260, 0.16);
    setHistory([]);
  };

  return (
    <div className="coloring-game">
      <div className="coloring-palette" role="group" aria-label="Choose a colour">
        {PALETTE.map((swatch, index) => (
          <button key={swatch.c} className={`swatch ${colorIndex === index ? "on" : ""}`} style={{ background: swatch.c }} onClick={() => setColorIndex(index)} aria-label={`Colour ${swatch.name}`} aria-pressed={colorIndex === index} />
        ))}
      </div>

      <div className="coloring-canvas coloring-canvas--illustrated">
        <svg viewBox="0 0 320 320" className="coloring-svg coloring-fills" aria-hidden="true">
          {COTTAGE_REGIONS.map((region) => <RegionShape key={region.id} region={region} fill={fills[region.id] || "#fff"} onPaint={() => paint(region.id)} />)}
        </svg>
        <img className="coloring-line-art" src={LINE_ART} alt="" aria-hidden="true" draggable="false" />
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
