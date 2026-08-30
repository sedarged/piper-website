import { useRef } from "react";
import { useDialogTrap } from "../../hooks/useDialogTrap.js";

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
