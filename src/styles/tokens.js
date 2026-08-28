/**
 * The Snackville palette. Every location, character, and section owns one
 * of these colours consistently — same colour always means the same thing
 * (see the design plan: colour as navigation, not decoration).
 *
 * These are exported as JS (not just CSS custom properties) because a few
 * components need the raw hex value for inline SVG fills, which can't
 * reference a CSS variable.
 */
export const C = {
  strawberry: "#A72446", strawberryD: "#71142B",
  butter: "#D8AA58", butterD: "#9F7433",
  mint: "#6F9C7E", mintD: "#406B52",
  sky: "#6F8EAD", skyD: "#405E80",
  grape: "#74577F", grapeD: "#4D3559",
  ember: "#B66B43", emberD: "#7B3E25",
  cocoa: "#76503C", cocoaD: "#43291F",
  cream: "#F7ECD7", plum: "#071126",
};
