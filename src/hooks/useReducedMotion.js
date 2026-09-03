import { useEffect, useRef } from "react";

/**
 * A ref (not state) holding whether the visitor has requested reduced
 * motion — a ref because it's read from imperative callbacks (confetti
 * bursts, the scroll engine) that don't need a re-render when it
 * changes, and is only read once on mount rather than subscribed to,
 * since none of those callers need to react live to the OS setting
 * changing mid-session.
 */
export function useReducedMotion() {
  const reduceMotion = useRef(false);
  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  return reduceMotion;
}
