import { C } from "../styles/tokens.js";

/**
 * Pin coordinates are percentages (x, y) against the map image's own
 * width/height, so they stay correctly positioned at any screen size.
 * If you regenerate the Snackville map illustration, re-check these —
 * they were hand-placed against the current map artwork.
 */
export const PLACES = [
  { id: "cottage", n: 1, x: 22, y: 32, ink: C.strawberry, name: "Piper's Strawberry Cottage", who: "Piper",
    d: "A cottage with a strawberry for a roof. The garden glows faintly after dark." },
  { id: "bridge", n: 2, x: 35, y: 20, ink: C.sky, name: "Whipped Cream Cloud Bridge", who: "Croissant Kitty",
    d: "Soft underfoot and slightly bouncy. Crosses the jellybean valley at its narrowest point." },
  { id: "hq", n: 3, x: 45, y: 48, ink: C.butter, name: "Snack Squad HQ", who: "All four",
    d: "Shaped like a lunchbox, with a star over the door. Every adventure is planned at this table." },
  { id: "square", n: 4, x: 50, y: 62, ink: C.grape, name: "Candy Path Square", who: "Everyone",
    d: "The middle of Snackville. Biscuit roofs on every side and a candy-cane fountain in the centre." },
  { id: "workshop", n: 5, x: 62, y: 30, ink: C.ember, name: "Toast Kitty's Workshop", who: "Toast Kitty",
    d: "Gear-shaped windows, a bread-slice chimney, and more half-finished machines than finished." },
  { id: "park", n: 6, x: 70, y: 18, ink: C.strawberry, name: "Donut Tree Park", who: "Everyone",
    d: "The trees fruit at dawn. Arrive late and you get the plain ones." },
  { id: "hill", n: 7, x: 28, y: 72, ink: C.mint, name: "Jellybean Hill", who: "The Snack Squad",
    d: "Where the four of them end up after every adventure, on their backs, looking at the stars." },
  { id: "mountain", n: 8, x: 75, y: 68, ink: C.cocoa, name: "Chocolate Mountain", who: "Chocolate Dragon",
    d: "Warm to the touch. Rumbles when the dragon inside is about to sneeze. Go on — poke it.", sneeze: true },
];
