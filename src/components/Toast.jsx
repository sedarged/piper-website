import { C } from "../styles/tokens.js";
import { I } from "./Icons.jsx";

/**
 * The bottom-of-screen toast used for "you found X" and "bless you"
 * type messages. `role="status"` so screen readers announce it without
 * needing focus to move — see the top-tier plan, item 10, on
 * accessibility gaps like this one.
 */
export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="toast in" role="status">
      <span style={{ width: 24, height: 24, flexShrink: 0 }}>{I.star(C.butter)}</span>
      <span>
        <strong className="d" style={{ fontSize: 16, display: "block" }}>{toast.title}</strong>
        <span style={{ fontSize: 14.5, opacity: 0.82 }}>{toast.body}</span>
      </span>
    </div>
  );
}
