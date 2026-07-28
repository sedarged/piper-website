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
  strawberry: "#FF3B5C", strawberryD: "#D62244",
  butter: "#FFC93C", butterD: "#E0A310",
  mint: "#3DD98B", mintD: "#1FA866",
  sky: "#5BC8F5", skyD: "#2A9FD0",
  grape: "#9B6BFF", grapeD: "#7442E0",
  ember: "#FF7A3C", emberD: "#DB5418",
  cocoa: "#7B4A2A", cocoaD: "#4E2B14",
  cream: "#FFF6E9", plum: "#2A1A2E",
};
