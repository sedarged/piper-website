import { C } from "../styles/tokens.js";

/**
 * The Snackville studio grid: three playable mini-games (no download
 * needed — they run right in the browser) plus two printables still
 * waiting on their final artwork. See /docs/asset-list.md for the print
 * generation prompts. Every game card opens its game in a modal; every
 * print card shows a "coming soon" state instead of a dead link.
 */
export const PRINTABLES = [
  { id: "colour", name: "Colour Piper's Cottage", n: "Play now", kind: "game", ink: C.strawberry, note: "Pick your colours and paint the cottage right on screen." },
  { id: "memory", name: "Snack Squad Memory", n: "Play now", kind: "game", ink: C.mint, note: "Flip the cards and find every matching pair." },
  { id: "whack", name: "Whack-a-Snack", n: "Play now", kind: "game", ink: C.ember, note: "Tap the treats before they disappear. How high can you score?" },
  { id: "map", name: "The Snackville map", n: "A3 poster", kind: "print", url: "", ink: C.grape, note: "The endpaper map, blank and ready to colour. Coming soon in the welcome pack." },
  { id: "badge", name: "Snack Squad badge", n: "Cut & wear", kind: "print", url: "", ink: C.butter, note: "Print, cut out, tape to a jumper. Coming soon in the welcome pack." },
];
