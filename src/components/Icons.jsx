import { C } from "../styles/tokens.js";

/**
 * Every small illustrated icon on the site, hand-drawn as inline SVG —
 * no icon font, no image requests. Each is a function so it can accept
 * a colour override (used for the map pins, printable cards, and the
 * confetti burst, which all reuse the same shapes in different inks).
 *
 * `I` is the full set. `TI` and `FI` are convenience lookup maps used
 * by the treasure hunt and the free-printables grid respectively, keyed
 * by the same `id` strings as their data files.
 */
export const I = {
  berry: (c = C.strawberry) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <path d="M12 22c4.4 0 7-3.4 7-7.5S16 6 12 6s-7 4.4-7 8.5S7.6 22 12 22z" fill={c} />
      <path d="M12 7c0-2 1.6-3.6 4-4-.4 2.4-2 4-4 4z" fill={C.mintD} />
      <path d="M12 7C12 5 10.4 3.4 8 3c.4 2.4 2 4 4 4z" fill={C.mintD} />
      <g fill="#fff">
        <circle cx="9.5" cy="12" r=".85" /><circle cx="14.5" cy="12" r=".85" />
        <circle cx="12" cy="15" r=".85" /><circle cx="9" cy="17" r=".85" /><circle cx="15" cy="17" r=".85" />
      </g>
    </svg>
  ),
  croix: (c = C.butter) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <path d="M4 14c0-3 2.5-5 5.5-5 2 0 3 1 5 1s3-1 5-1c0 4-2 7-5 7-2 0-3-1-5-1s-3 1-5 1z" fill={c} />
      <path d="M3 12.5c1.5-1.5 3-1 3.5.5M21 12.5c-1.5-1.5-3-1-3.5.5" stroke={c} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  star: (c = C.butter) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <path d="M12 1.6l2.7 7L22 11l-7.3 2.4L12 22l-2.7-8.6L2 11l7.3-2.4z" fill={c} />
    </svg>
  ),
  bean: (c = C.mint) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="8" ry="5.6" fill={c} transform="rotate(-22 12 12)" />
      <ellipse cx="9.5" cy="10" rx="2" ry="1.2" fill="#fff" opacity=".6" transform="rotate(-22 9.5 10)" />
    </svg>
  ),
  donut: (c = C.strawberry) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="#D9A05B" />
      <path d="M12 3a9 9 0 018.8 7.4c-.7 1.5-2.1 1-3 2s-2.5.4-3.5 1.3-.6 2.5-1.7 3.1-2.5-.4-3.8 0-1.5 2.1-2.7 2.3A9 9 0 0112 3z" fill={c} />
      <circle cx="12" cy="12" r="3.1" fill={C.cream} />
    </svg>
  ),
  scale: (c = C.cocoa) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <path d="M12 2.6c5.2 0 8.4 3.8 8.4 8.4S16.6 21.4 12 21.4 3.6 15.6 3.6 11 6.8 2.6 12 2.6z" fill={c} />
      <path d="M12 6c3.1 0 5.2 2.3 5.2 5.2" stroke="#C8956A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  ),
  crayon: () => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <path d="M6 21h4l8.4-14.6-3.6-2L6 19z" fill={C.strawberry} />
      <path d="M6 19l4 2-4.6.9z" fill={C.plum} />
    </svg>
  ),
  mapic: () => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <path d="M3 6l6-2 6 2 6-2v16l-6 2-6-2-6 2z" fill={C.mint} />
      <path d="M9 4v16M15 6v16" stroke={C.cream} strokeWidth="1.4" />
    </svg>
  ),
  badgeic: () => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <circle cx="12" cy="9.5" r="7" fill={C.butter} />
      <path d="M8 15l-1.6 6.6L12 18.4l5.6 3.2L16 15" fill={C.strawberry} />
    </svg>
  ),
};

/** Treasure-hunt icon lookup, keyed by treasure id (see data/treasures.js). */
export const TI = { berry: I.berry, croix: I.croix, star: I.star, bean: I.bean, donut: I.donut, scale: I.scale };

/** Friendly spoken names for the same six icons, for screen-reader labels
 *  in Snack Squad Memory and Piper's Pattern — the bare TI/ICON keys
 *  ("croix", "bean") aren't real words and read oddly aloud. */
export const ICON_NAMES = { berry: "Strawberry", croix: "Croissant", star: "Star", bean: "Jellybean", donut: "Donut", scale: "Dragon scale" };

/** Free-printables icon lookup, keyed by printable id (see data/printables.js). */
export const FI = { colour: I.crayon, memory: I.bean, whack: I.donut, pattern: I.star, map: I.mapic, badge: I.badgeic };
