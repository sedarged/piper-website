import { useRef } from "react";
import { createPortal } from "react-dom";
import { useDialogTrap } from "../../hooks/useDialogTrap.js";

/** The "you won" action every mini-game ends on — shared so the three
 *  games don't each hardcode the same button. */
export function GameCompleteButton({ onComplete, label = "Collect my badge!" }) {
  return <button className="btn b-straw" onClick={onComplete}>{label}</button>;
}

/** The secondary "go again" action shown alongside GameCompleteButton,
 *  or on its own before a game's first round has finished. */
export function GameRetryButton({ onRetry, label }) {
  return <button className="btn b-ghost btn-sm" onClick={onRetry}>{label}</button>;
}

/**
 * The personal-best strip every scored game shows above its board (see
 * hooks/useBestScore.js). Renders nothing at all before a first score
 * exists, so a child's very first go isn't opened with an empty
 * scoreboard and a dash where their record should be.
 */
export function GameScoreboard({ best, bestLabel, suffix = "" }) {
  if (best === null || best === undefined) return null;
  return (
    <p className="game-best u">
      <span className="game-best__label">{bestLabel}</span>
      <span className="game-best__value">{best}{suffix}</span>
    </p>
  );
}

/**
 * Shared dialog shell for the Snackville studio mini-games. Reuses the
 * same accessible dialog behaviour as the map's place-dialog (see
 * useDialogTrap) and its `.place-dialog` visuals, so a game feels like
 * part of the same storybook rather than a bolted-on widget.
 */
export function GameModal({ title, eyebrow, onClose, children }) {
  const dialogRef = useRef(null);
  useDialogTrap(dialogRef, onClose, true);

  // Escape the page stacking context so navigation and the Explorer ring
  // cannot cover game controls, particularly on narrow screens.
  return createPortal(
    <div className="place-dialog-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <article ref={dialogRef} className="place-dialog game-dialog" role="dialog" aria-modal="true" aria-labelledby="game-dialog-title">
        <div className="place-dialog-topline">
          <span className="eyebrow">{eyebrow}</span>
          <button className="place-dialog-close u" onClick={onClose}>Close</button>
        </div>
        <h3 id="game-dialog-title" className="d" style={{ marginTop: 12 }}>{title}</h3>
        <div className="game-body">{children}</div>
      </article>
    </div>,
    document.body
  );
}
