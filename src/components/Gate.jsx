import { useCallback, useEffect, useState } from "react";
import { drive, ASSET } from "../config.js";
import { Img } from "./Img.jsx";
import { TI } from "./Icons.jsx";

/**
 * The full-screen entry animation: a closed picture-book cover that
 * swings open on a hinge to reveal the site underneath, echoing the
 * "the site is a book you're opening" concept from the design plan.
 *
 * Calls `onDone` once the opening animation finishes, so the parent can
 * unmount this and reveal the real page. Supports Enter/Space as a
 * keyboard-accessible trigger, not just a click.
 */
export function Gate({ onDone }) {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

  const openBook = useCallback(() => {
    if (open) return;
    setOpen(true);
    setTimeout(() => { setGone(true); onDone(); }, 1400);
  }, [open, onDone]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openBook(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openBook]);

  if (gone) return null;

  const floats = Array.from({ length: 18 }, (_, i) => ({
    id: i, left: Math.random() * 100, size: 18 + Math.random() * 26,
    dur: 8 + Math.random() * 8, delay: Math.random() * 8,
    kind: ["berry", "croix", "star", "donut", "bean"][i % 5],
  }));

  return (
    <div className={`gate ${open ? "lift" : ""}`}>
      {floats.map((f) => (
        <span
          key={f.id}
          className="gfloat"
          style={{
            left: `${f.left}%`, bottom: -50, width: f.size, height: f.size,
            animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s`,
          }}
        >
          {TI[f.kind]()}
        </span>
      ))}

      <div className="gate-in">
        <div className="gate-pages">
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Snackville</div>
            <div className="d" style={{ fontSize: 30 }}>Come in.</div>
          </div>
        </div>

        <button className={`cover ${open ? "open" : ""}`} onClick={openBook} aria-label="Open the book and go into Snackville">
          <div style={{
            display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,.8)",
            fontFamily: "var(--u)", fontWeight: 600, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase",
          }}>
            <span>Wallace-Siedlarz</span><span>No. 1</span>
          </div>

          <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "16px 0", position: "relative" }}>
            <div className="cwin">
              <Img src={drive(ASSET.squad, 700)} alt="Piper and the Snack Squad" fb="P" />
            </div>
            {!open && <span className="tap">Tap to open ✦</span>}
          </div>

          <div style={{ color: "#fff" }}>
            <div className="d" style={{ fontSize: "clamp(44px,10vw,68px)", lineHeight: 0.84 }}>Piper</div>
            <div style={{
              fontFamily: "var(--d)", fontWeight: 600, fontSize: "clamp(14px,3vw,18px)",
              marginTop: 6, color: "rgba(255,255,255,.9)",
            }}>
              the Strawberry Food Kitten
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
