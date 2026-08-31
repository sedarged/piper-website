import { useRef } from "react";
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
 * Shared dialog shell for the Snackville studio mini-games. Reuses the
 * same accessible dialog behaviour as the map's place-dialog (see
 * useDialogTrap) and its `.place-dialog` visuals, so a game feels like
 * part of the same storybook rather than a bolted-on widget.
 */
export function GameModal({ title, eyebrow, onClose, children }) {
  const dialogRef = useRef(null);
  useDialogTrap(dialogRef, onClose, true);

  return (
    <div className="place-dialog-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <article ref={dialogRef} className="place-dialog game-dialog" role="dialog" aria-modal="true" aria-labelledby="game-dialog-title">
        <div className="place-dialog-topline">
          <span className="eyebrow">{eyebrow}</span>
          <button className="place-dialog-close u" onClick={onClose}>Close</button>
        </div>
        <h3 id="game-dialog-title" className="d" style={{ marginTop: 12 }}>{title}</h3>
        <div className="game-body">{children}</div>
      </article>
    </div>
  );
}
