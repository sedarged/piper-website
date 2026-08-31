import { useCallback, useState } from "react";
import { PRINTABLES } from "../data/printables.js";
import { Reveal } from "./Reveal.jsx";
import { FI } from "./Icons.jsx";
import { GameModal } from "./games/GameModal.jsx";
import { ColoringPage } from "./games/ColoringPage.jsx";
import { MemoryMatch } from "./games/MemoryMatch.jsx";
import { WhackASnack } from "./games/WhackASnack.jsx";

const GAME_COMPONENTS = { colour: ColoringPage, memory: MemoryMatch, whack: WhackASnack };

/**
 * The Snackville studio: kid-facing activities only (the one parent-
 * oriented printable that used to live here — read-aloud notes — now
 * lives in the Parents' Corner, see GrownUps.jsx). Three cards open a
 * real playable mini-game right in the browser; the rest are prints
 * still waiting on final artwork and show an honest "coming soon"
 * state instead of a dead link.
 */
export function Free({ mark, burst, chime, showToast }) {
  const [openGameId, setOpenGameId] = useState(null);
  const openGame = PRINTABLES.find((p) => p.id === openGameId);
  const GameComponent = openGame && GAME_COMPONENTS[openGame.id];

  // Stable identity matters here: useDialogTrap's effect depends on
  // onClose, and Free re-renders often while a game is open (App.jsx's
  // cursor-sparkle trail updates state on every mousemove) — a fresh
  // arrow function each render would re-arm the focus trap constantly,
  // snapping focus back to the modal's first control mid-play.
  const closeGame = useCallback(() => setOpenGameId(null), []);

  const complete = (p) => {
    mark?.(`activity-${p.id}`);
    burst?.(30);
    chime?.(1046, 0.3);
    showToast?.(`${p.name} — done!`, "Nice work! That's another point toward your Explorer trail.");
    setOpenGameId(null);
  };

  return (
    <>
      <Reveal style={{ textAlign: "center", marginBottom: 36 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>The Snackville studio</div>
        <h2 className="h2">Bring a little Snackville home</h2>
        <p className="lead" style={{ margin: "14px auto 0" }}>
          Play right here in your browser, or print your favourites at home — everything below is free.
        </p>
      </Reveal>

      <div className="free-g">
        {PRINTABLES.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            {p.kind === "game" ? (
              <button className="fc" onClick={() => setOpenGameId(p.id)}>
                <span className="fc-icon" aria-hidden="true">{FI[p.id]()}</span>
                <span className="d" style={{ fontSize: 21 }}>{p.name}</span>
                <span className="eyebrow">{p.n}</span>
                <span style={{ fontSize: 15.5, color: "var(--ink60)", lineHeight: 1.5 }}>{p.note}</span>
                <span className="u" style={{ fontSize: 15, color: p.ink, marginTop: 4 }}>Play now →</span>
              </button>
            ) : p.url ? (
              <a className="fc" href={p.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <span className="fc-icon" aria-hidden="true">{FI[p.id]()}</span>
                <span className="d" style={{ fontSize: 21 }}>{p.name}</span>
                <span className="eyebrow">{p.n}</span>
                <span style={{ fontSize: 15.5, color: "var(--ink60)", lineHeight: 1.5 }}>{p.note}</span>
                <span className="u" style={{ fontSize: 15, color: p.ink, marginTop: 4 }}>Download →</span>
              </a>
            ) : (
              <div className="fc fc-soon" aria-disabled="true">
                <span className="fc-icon" aria-hidden="true">{FI[p.id]()}</span>
                <span className="d" style={{ fontSize: 21 }}>{p.name}</span>
                <span className="eyebrow">{p.n}</span>
                <span style={{ fontSize: 15.5, color: "var(--ink60)", lineHeight: 1.5 }}>{p.note}</span>
                <span className="u" style={{ fontSize: 15, color: "var(--ink40)", marginTop: 4 }}>Coming soon</span>
              </div>
            )}
          </Reveal>
        ))}
      </div>

      {GameComponent && (
        <GameModal
          title={openGame.name}
          eyebrow="Snackville studio"
          onClose={closeGame}
        >
          <GameComponent chime={chime} onComplete={() => complete(openGame)} />
        </GameModal>
      )}
    </>
  );
}
