import { useEffect, useRef } from "react";

/**
 * Shared dialog shell for the Snackville studio mini-games. Reuses the
 * same accessible dialog pattern as the map's place-dialog (focus trap,
 * Escape-to-close, scroll lock) and its `.place-dialog` visuals, so a
 * game feels like part of the same storybook rather than a bolted-on
 * widget.
 */
export function GameModal({ title, eyebrow, onClose, children }) {
  const dialogRef = useRef(null);
  const lastTriggerRef = useRef(null);

  useEffect(() => {
    lastTriggerRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll("button:not([disabled]), a[href], input:not([disabled])") ?? [];
    focusable[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || focusable.length < 2) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      lastTriggerRef.current?.focus?.();
    };
  }, [onClose]);

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
