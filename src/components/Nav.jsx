import { useState } from "react";
import { AMAZON_URL } from "../config.js";
import { SECTIONS } from "../data/sections.js";
import { I } from "./Icons.jsx";

/**
 * Sticky top navigation. On desktop it's a floating pill with all six
 * section links inline; below 1000px (see .nav-desk in components.css)
 * that pill hides and a burger button opens a bottom sheet instead,
 * since six links don't comfortably fit a phone-width bar.
 */
export function Nav({ active, onNavigate }) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const go = (id) => {
    onNavigate?.(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setSheetOpen(false);
  };

  return (
    <>
      <nav className="nav" style={{ paddingTop: 14, paddingBottom: 14 }}>
        <div className="nav-in">
          <button className="logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Piper — top">
            <span className="brand-monogram" aria-hidden="true">WS</span>
            <span className="brand-lockup">
              <strong>Wallace–Siedlarz</strong>
              <small>Books · Story worlds</small>
            </span>
          </button>

          <div className="nav-desk nav-pill">
            {SECTIONS.map((s) => (
              <button key={s.id} className={`nlink ${active === s.id ? "on" : ""}`} onClick={() => go(s.id)}>
                {s.label}
              </button>
            ))}
          </div>

          <button className="nav-burger" onClick={() => setSheetOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>

          <button className="btn b-straw btn-sm nav-desk-cta" onClick={() => go("join")}>Join the Squad</button>
        </div>
      </nav>

      {sheetOpen && (
        <div className="scrim" onClick={() => setSheetOpen(false)} style={{ zIndex: 620 }}>
          <div className="msheet" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span className="d" style={{ fontSize: 21 }}>Explore Snackville</span>
              <button className="dr-x" onClick={() => setSheetOpen(false)} aria-label="Close menu">✕</button>
            </div>
            {SECTIONS.map((s) => (
              <button key={s.id} className={`msheet-link ${active === s.id ? "on" : ""}`} onClick={() => go(s.id)}>
                {s.label}
              </button>
            ))}
            <a className="btn b-straw btn-lg" href={AMAZON_URL} target="_blank" rel="noreferrer" style={{ marginTop: 8, justifyContent: "center" }}>
              Buy book one →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
