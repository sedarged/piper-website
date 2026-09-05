import { useEffect, useRef, useState } from "react";
import { C } from "../../styles/tokens.js";
import { floodFill } from "../../lib/floodFill.js";

const LINE_ART = "/images/games/strawberry-cottage-line-art.png";
const CANVAS_SIZE = 720;
const FINISH_AFTER = 6;

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

const QUICK_AREAS = [
  { name: "roof", x: 360, y: 224 },
  { name: "walls", x: 360, y: 360 },
  { name: "door", x: 360, y: 492 },
  { name: "left window", x: 219, y: 413 },
  { name: "right window", x: 503, y: 413 },
  { name: "path", x: 360, y: 620 },
];

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}

/**
 * The line art is drawn into a real canvas. A flood fill colours the exact
 * enclosed area beneath the pointer, so ornate icing curls, leaves, windows
 * and tiny garden pieces stay inside the illustrator's ink instead of using
 * approximate rectangles or SVG masks.
 */
export function ColoringPage({ onComplete, chime }) {
  const canvasRef = useRef(null);
  const baseImageRef = useRef(null);
  const historyRef = useRef([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [fillCount, setFillCount] = useState(0);
  const [ready, setReady] = useState(false);

  const drawFreshPage = () => {
    const canvas = canvasRef.current;
    const image = baseImageRef.current;
    if (!canvas || !image) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    context.drawImage(image, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
  };

  useEffect(() => {
    const image = new Image();
    image.decoding = "async";
    image.src = LINE_ART;
    image.onload = () => {
      baseImageRef.current = image;
      drawFreshPage();
      setReady(true);
    };
    return () => { image.onload = null; };
  }, []);

  const paintAt = (x, y) => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const before = context.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const next = new ImageData(new Uint8ClampedArray(before.data), CANVAS_SIZE, CANVAS_SIZE);
    const painted = floodFill(next.data, CANVAS_SIZE, CANVAS_SIZE, x, y, hexToRgb(PALETTE[colorIndex].c));
    if (painted < 20) return;

    historyRef.current.push(before);
    if (historyRef.current.length > 20) historyRef.current.shift();
    context.putImageData(next, 0, 0);
    setFillCount((count) => count + 1);
    chime?.(420 + colorIndex * 46, 0.09);
  };

  const paintFromPointer = (event) => {
    const canvas = canvasRef.current;
    const bounds = canvas.getBoundingClientRect();
    paintAt(
      ((event.clientX - bounds.left) / bounds.width) * CANVAS_SIZE,
      ((event.clientY - bounds.top) / bounds.height) * CANVAS_SIZE
    );
  };

  const undo = () => {
    const previous = historyRef.current.pop();
    if (!previous) return;
    canvasRef.current.getContext("2d", { willReadFrequently: true }).putImageData(previous, 0, 0);
    setFillCount((count) => Math.max(0, count - 1));
    chime?.(320, 0.1);
  };

  const clear = () => {
    if (!fillCount) return;
    drawFreshPage();
    historyRef.current = [];
    setFillCount(0);
    chime?.(260, 0.16);
  };

  const done = fillCount >= FINISH_AFTER;

  return (
    <div className="coloring-game">
      <div className="coloring-palette" role="group" aria-label="Choose a colour">
        {PALETTE.map((swatch, index) => (
          <button key={swatch.c} className={`swatch ${colorIndex === index ? "on" : ""}`} style={{ background: swatch.c }} onClick={() => setColorIndex(index)} aria-label={`Colour ${swatch.name}`} aria-pressed={colorIndex === index} />
        ))}
      </div>

      <div className="coloring-canvas coloring-canvas--illustrated">
        <canvas
          ref={canvasRef}
          className="coloring-paint-canvas"
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          onPointerDown={paintFromPointer}
          role="img"
          aria-label="Professional line drawing of Piper's Strawberry Cottage. Choose a colour and tap an enclosed area to fill it."
        />
        {!ready && <span className="coloring-loading">Preparing your colouring page…</span>}
      </div>

      <div className="coloring-quick" role="group" aria-label="Keyboard-friendly quick paint areas">
        <span>Quick paint:</span>
        {QUICK_AREAS.map((area) => (
          <button key={area.name} className="coloring-quick__button" onClick={() => paintAt(area.x, area.y)}>
            {area.name}
          </button>
        ))}
      </div>

      <p className="coloring-hint u" aria-live="polite">
        Choose a colour, then tap any enclosed detail. {Math.min(fillCount, FINISH_AFTER)}/{FINISH_AFTER} fills to finish.
      </p>
      <div className="game-actions">
        <button className="btn b-ghost btn-sm" onClick={undo} disabled={!fillCount}>↩ Undo</button>
        <button className="btn b-ghost btn-sm" onClick={clear} disabled={!fillCount}>Start over</button>
        <button className="btn b-straw" disabled={!done} onClick={onComplete}>{done ? "Finish my cottage!" : "Keep colouring…"}</button>
      </div>
    </div>
  );
}
