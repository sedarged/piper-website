import { useEffect } from "react";
import { drive, AMAZON_URL } from "../config.js";
import { CAST } from "../data/cast.js";
import { Img } from "./Img.jsx";

/**
 * The slide-in panel showing a character's full bio, power, and secret.
 * `index` is the CAST array index of the open character, or `null`
 * when closed — App.jsx owns this piece of state since both the Cast
 * grid and this drawer need to read/write it.
 *
 * Closes on Escape and locks body scroll while open (a modal that lets
 * the page scroll behind it is a common source of "why is my page
 * jumping" bug reports).
 */
export function CastDrawer({ index, onClose, onNavigate }) {
  const open = index !== null;
  const character = open ? CAST[index] : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const next = open ? CAST[(index + 1) % CAST.length] : null;

  return (
    <>
      {open && <div className="scrim" onClick={onClose} />}
      <aside className={`drawer ${open ? "in" : ""}`} aria-hidden={!open}>
        {character && (
          <>
            <div className="dr-art" style={{ background: character.ink }}>
              <Img src={drive(character.img, 800)} alt={character.name} fb={character.name} />
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

              <div className="chip" style={{ background: "var(--surface)", border: "1px dashed var(--border2)" }}>
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
                  marginTop: 26, paddingTop: 18, borderTop: "1px solid var(--border)", textAlign: "left",
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
