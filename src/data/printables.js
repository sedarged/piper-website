import { C } from "../styles/tokens.js";

/**
 * The Snackville studio grid: five playable mini-games (no download
 * needed — they run right in the browser) plus two finished printables.
 *
 * The five games deliberately ask for five different things: colouring
 * is open-ended, memory is recall, whack is reaction, pattern is
 * sequence, and catch is continuous control. A child who bounces off
 * one has four others that aren't the same game again.
 */
export const PRINTABLES = [
  { id: "colour", name: "Colour Piper's Cottage", n: "Play now", kind: "game", ink: C.strawberry, note: "Pick your colours and paint the cottage right on screen." },
  { id: "memory", name: "Snack Squad Memory", n: "Play now", kind: "game", ink: C.mint, note: "Flip the cards and find every matching pair." },
  { id: "whack", name: "Whack-a-Snack", n: "Play now", kind: "game", ink: C.ember, note: "Tap the treats before they disappear. How high can you score?" },
  { id: "pattern", name: "Piper's Pattern", n: "Play now", kind: "game", ink: C.grape, note: "Watch the pattern light up, then copy it back. How many rounds can you remember?" },
  { id: "catch", name: "Berry Catch", n: "Play now", kind: "game", ink: C.sky, note: "Catch the falling treats in Piper's basket — and let the chillies drop." },
  { id: "map", name: "The Snackville map", n: "A3 poster · PDF", kind: "print", url: "/printables/snackville-map-a3.pdf", preview: "/images/printables/snackville-map-poster.webp", ink: C.grape, note: "The complete official map as a full-bleed A3 adventure poster." },
  { id: "badge", name: "Snack Squad badges", n: "A4 · cut & wear", kind: "print", url: "/printables/snack-squad-badges-a4.pdf", preview: "/images/printables/snack-squad-badges.webp", ink: C.butter, note: "Four premium character badges with clear cut lines and grown-up instructions." },
];
