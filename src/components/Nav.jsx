import { useEffect, useRef, useState } from "react";
import { AMAZON_URL } from "../config.js";
import { SECTIONS } from "../data/sections.js";
import { I } from "./Icons.jsx";

/**
 * Sticky top navigation. On desktop it's a floating pill with every
 * section link inline (the last, "For Parents", styled quieter — see
 * .nlink-quiet — so it reads as a separate, calmer door rather than
 * another playful stop); below 1000px (see .nav-desk in components.css)
 * that pill hides and a burger button opens a bottom sheet instead,
 * since the full set of links doesn't comfortably fit a phone-width bar.
 */
export function Nav({ active, onNavigate, onHome }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const sheetRef = useRef(null);

  const go = (id) => {
    onNavigate?.(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setSheetOpen(false);
  };

  useEffect(() => {
    if (!sheetOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const sheet = sheetRef.current;
    const focusable = () => sheet?.querySelectorAll("button:not([disabled]), a[href]") ?? [];
    const first = focusable()[0];
    document.body.style.overflow = "hidden";
    first?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") { event.preventDefault(); setSheetOpen(false); return; }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length < 2) return;
      const start = items[0];
      const end = items[items.length - 1];
      if (event.shiftKey && document.activeElement === start) { event.preventDefault(); end.focus(); }
      if (!event.shiftKey && document.activeElement === end) { event.preventDefault(); start.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [sheetOpen]);

  return (
    <>
      <nav className="nav" style={{ paddingTop: 14, paddingBottom: 14 }}>
        <div className="nav-in">
          <button className="logo" onClick={onHome || (() => window.scrollTo({ top: 0, behavior: "smooth" }))} aria-label={onHome ? "Back to Piper's worlds" : "Piper — top"}>
            <span className="brand-monogram" aria-hidden="true">WS</span>
            <span className="brand-lockup">
              <strong>Piper's Snackville</strong>
              <small>Wallace–Siedlarz Books</small>
            </span>
          </button>

          <div className="nav-desk nav-pill">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`nlink ${s.id === "parents" ? "nlink-quiet" : ""} ${active === s.id ? "on" : ""}`}
                onClick={() => go(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button ref={menuButtonRef} className="nav-burger" onClick={() => setSheetOpen(true)} aria-label="Open menu" aria-expanded={sheetOpen} aria-controls="mobile-navigation">
            <span /><span /><span />
          </button>

          <button className="btn b-straw btn-sm nav-desk-cta" onClick={() => go("join")}>Join the Squad</button>
        </div>
      </nav>

      {sheetOpen && (
        <div className="scrim" onClick={() => setSheetOpen(false)} style={{ zIndex: 620 }}>
          <div ref={sheetRef} id="mobile-navigation" className="msheet" role="dialog" aria-modal="true" aria-label="Snackville navigation" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span className="d" style={{ fontSize: 21 }}>Explore Snackville</span>
              <button className="dr-x" onClick={() => setSheetOpen(false)} aria-label="Close menu">✕</button>
            </div>
            {SECTIONS.map((s) => (
              <span key={s.id} style={{ display: "block" }}>
                {s.id === "parents" && (
                  <div className="msheet-divider">
                    <span className="eyebrow">For grown-ups</span>
                  </div>
                )}
                <button
                  className={`msheet-link ${s.id === "parents" ? "msheet-link-quiet" : ""} ${active === s.id ? "on" : ""}`}
                  onClick={() => go(s.id)}
                >
                  {s.label}
                </button>
              </span>
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
