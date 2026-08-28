import { useEffect, useRef } from "react";
import { AMAZON_URL } from "../config.js";
import { CAST } from "../data/cast.js";
import { CHARACTER_ART } from "../generated-assets/artwork.js";
import { SpriteArt } from "./SpriteArt.jsx";

/** Slide-in character profile using the corrected Snack Squad artwork. */
export function CastDrawer({ index, onClose, onNavigate }) {
  const open = index !== null;
  const character = open ? CAST[index] : null;
  const drawerRef = useRef(null);
  const lastTriggerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    lastTriggerRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const drawer = drawerRef.current;
    const getFocusable = () => drawer?.querySelectorAll("button:not([disabled]), a[href]") ?? [];
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length < 2) return;
      if (e.shiftKey && document.activeElement === focusable[0]) { e.preventDefault(); focusable[focusable.length - 1].focus(); }
      if (!e.shiftKey && document.activeElement === focusable[focusable.length - 1]) { e.preventDefault(); focusable[0].focus(); }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    getFocusable()[0]?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      window.setTimeout(() => lastTriggerRef.current?.focus(), 0);
    };
  }, [open, onClose]);

  const next = open ? CAST[(index + 1) % CAST.length] : null;

  return (
    <>
      {open && <div className="scrim" onClick={onClose} />}
      <aside ref={drawerRef} className={`drawer ${open ? "in" : ""}`} role={open ? "dialog" : undefined} aria-modal={open || undefined} aria-label={open ? `${character.name} character profile` : undefined} aria-hidden={!open}>
        {character && (
          <>
            <div className="dr-art" style={{ background: character.ink, overflow: "hidden" }}>
              <SpriteArt art={CHARACTER_ART[character.key]} alt={character.name} style={{ height: "100%", minHeight: 360 }} />
              <button className="dr-x" onClick={onClose} aria-label="Close">✕</button>
            </div>

            <div className="dr-b">
              <span className="cc-b" style={{ background: character.ink, marginTop: 0 }}>{character.badge}</span>
              <h3 className="h3" style={{ marginTop: 10 }}>{character.name}</h3>
              <p className="cc-r" style={{ fontSize: 14 }}>{character.role}</p>
              <p style={{ color: "var(--ink60)", marginTop: 16, fontSize: 17 }}>{character.bio}</p>

              <div className="chip" style={{ background: `${character.ink}22` }}>
                <div className="eyebrow" style={{ marginBottom: 5 }}>What they do best</div>
                <p style={{ fontSize: 16.5 }}>{character.power}</p>
              </div>

              <div className="chip" style={{ background: "rgba(42,26,46,.07)", border: "2px dashed rgba(42,26,46,.2)" }}>
                <div className="eyebrow" style={{ marginBottom: 5 }}>A secret</div>
                <p style={{ fontSize: 16.5, fontStyle: "italic" }}>{character.secret}</p>
              </div>

              <a className="btn b-straw" href={AMAZON_URL} target="_blank" rel="noreferrer" style={{ marginTop: 6 }}>
                Read book one →
              </a>

              <button
                onClick={() => onNavigate((index + 1) % CAST.length)}
                style={{
                  display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center",
                  marginTop: 26, paddingTop: 18, borderTop: "2px solid rgba(42,26,46,.1)", textAlign: "left",
                }}
              >
                <span>
                  <span className="eyebrow" style={{ display: "block", marginBottom: 2 }}>Next</span>
                  <span className="d" style={{ fontSize: 21 }}>{next.name}</span>
                </span>
                <span style={{ fontSize: 22, color: "var(--ink40)" }} aria-hidden="true">→</span>
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
