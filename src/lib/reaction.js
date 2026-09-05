/**
 * How long a `data-reaction` stays on an element before being cleared.
 * Comfortably longer than the slowest reaction in wow.css (the dragon's
 * 2.4s breath), so no effect is ever cut off mid-animation; the
 * attribute is inert once its animation has finished.
 */
const REACTION_LIFE = 2900;

/**
 * Broadcasts one screen reaction from `element` (see styles/wow.css for
 * what the attribute does and why it isn't a class on a wrapper).
 *
 * Written straight to the DOM rather than held in React state for two
 * reasons. It's purely decorative, so re-rendering the ~700-node page
 * tree for it would be the same waste useScrollEngine exists to avoid.
 * And more importantly it has to *restart reliably*: re-setting a CSS
 * animation to the value it already has does nothing, so tapping the
 * same location twice would be visually silent. Removing the attribute,
 * reading `offsetWidth` to force the style change to be committed, and
 * setting it again is the synchronous idiom for that — an earlier
 * version cleared it via React state and re-set it in a
 * requestAnimationFrame, which dropped the reaction outright whenever
 * the frame was busy.
 *
 * Returns the timeout id that clears the attribute, so a caller can
 * cancel it if a second reaction starts first.
 */
export function broadcastReaction(element, kind) {
  if (!element) return null;
  element.removeAttribute("data-reaction");
  void element.offsetWidth;
  element.setAttribute("data-reaction", kind);
  return setTimeout(() => {
    // Only clear if this reaction is still the one showing — a newer
    // reaction that started in the meantime owns the attribute now.
    if (element.getAttribute("data-reaction") === kind) {
      element.removeAttribute("data-reaction");
    }
  }, REACTION_LIFE);
}

