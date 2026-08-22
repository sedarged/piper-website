import { useCallback, useEffect, useState } from "react";
import { drive, ASSET } from "../config.js";
import { Img } from "./Img.jsx";

/**
 * Full-screen entry animation: a premium dark book cover that swings
 * open on a 3D hinge to reveal the site underneath. The cover uses a
 * deep navy gradient with a gold spine accent, constellation of tiny
 * star particles as the background texture, and cream title text with a
 * subtle strawberry glow — echoing the cinematic dark design.
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

  const gateStars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2.2 + 0.6,
    delay: Math.random() * 4,
  }));

  return (
    <div className={`gate ${open ? "lift" : ""}`}>
      {gateStars.map((s) => (
        <span
          key={s.id}
          className="gate-star"
          style={{
            left: `${s.left}%`, top: `${s.top}%`,
            width: s.size, height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
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
            display: "flex", justifyContent: "space-between", color: "rgba(255,200,60,.65)",
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

          <div style={{ color: "var(--cream)" }}>
            <div
              className="d"
              style={{
                fontSize: "clamp(44px,10vw,68px)", lineHeight: 0.84,
                textShadow: "0 0 80px rgba(255,59,92,.35), 0 4px 0 rgba(0,0,0,.6)",
              }}
            >
              Piper
            </div>
            <div style={{
              fontFamily: "var(--d)", fontWeight: 600, fontSize: "clamp(14px,3vw,18px)",
              marginTop: 6, color: "rgba(255,200,60,.80)",
            }}>
              the Strawberry Food Kitten
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
