import { useEffect, useRef } from "react";

/**
 * Shared behaviour for an accessible modal dialog: locks body scroll,
 * focuses the first focusable element inside `dialogRef` when it opens,
 * traps Tab focus inside it, closes on Escape via `onClose`, and
 * restores focus to whatever triggered the dialog once it closes.
 *
 * The focusable set is recomputed on every Tab keypress rather than
 * captured once — a dialog's own buttons can enable/disable or swap
 * (e.g. a game's "disabled until finished" submit button, or a result
 * screen replacing its controls), and a one-time snapshot would trap
 * focus against elements that are stale or no longer in the document.
 *
 * `openKey` re-arms the trap whenever it changes identity — pass the
 * currently-open item (or `true`/`false`) so switching directly from
 * one dialog's content to another's re-focuses correctly.
 */
export function useDialogTrap(dialogRef, onClose, openKey) {
  const lastTriggerRef = useRef(null);

  useEffect(() => {
    if (!openKey) return undefined;
    lastTriggerRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // `offsetParent === null` excludes elements hidden via `display:none`
    // (or detached/`position:fixed` inside a display:none ancestor) —
    // matching on DOM attributes alone would otherwise let focus land on
    // a control nothing can see, if some future dialog conditionally
    // hides rather than `disabled`s part of its content.
    const getFocusable = () => Array.from(
      dialogRef.current?.querySelectorAll("button:not([disabled]), a[href], input:not([disabled])") ?? []
    ).filter((el) => el.offsetParent !== null);

    getFocusable()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length < 2) return;
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
  }, [openKey, dialogRef, onClose]);
}
