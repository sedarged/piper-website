import { useState } from "react";
import { TREASURES } from "../data/treasures.js";
import { TI } from "./Icons.jsx";

/**
 * One hidden, clickable collectible for the treasure hunt. Sits at
 * 30% opacity until hovered, then plays a short "found" animation and
 * calls back to the parent with its own screen position — the caller
 * uses that position to spawn a sparkle burst exactly where the click
 * happened, then removes the treasure from play by passing `found`.
 *
 * Six of these are scattered across the page (see data/treasures.js);
 * where each one sits is decided by the section that renders it.
 */
export function Treasure({ id, style, found, onFind }) {
  const [vanishing, setVanishing] = useState(false);
  const treasure = TREASURES.find((t) => t.id === id);

  if (found) return null;

  return (
    <button
      className={`tre ${vanishing ? "gone" : ""}`}
      style={style}
      aria-label={`Hidden: ${treasure.label}`}
      onClick={(e) => {
        setVanishing(true);
        const r = e.currentTarget.getBoundingClientRect();
        setTimeout(() => onFind(id, r.left + r.width / 2, r.top + r.height / 2), 250);
      }}
    >
      {TI[id]()}
    </button>
  );
}
