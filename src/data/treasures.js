import { C } from "../styles/tokens.js";
import { PLACES } from "./places.js";
import { BOOKS } from "./books.js";

export const TREASURES = [
  { id: "berry", label: "A lost strawberry", found: "Piper dropped this on the way to the volcano." },
  { id: "croix", label: "Yesterday's croissant", found: "Croissant Kitty was saving it. Don't tell her." },
  { id: "star", label: "A fallen star", found: "It rolled off Jellybean Hill one night in June." },
  { id: "bean", label: "A single jellybean", found: "Green. Nobody's favourite. Still a jellybean." },
  { id: "donut", label: "The last donut", found: "Picked at dawn from the Donut Tree. Still warm." },
  { id: "scale", label: "A dragon scale", found: "It came off when he sneezed. He didn't notice." },
];

/**
 * The Explorer progress ring counts: 6 hidden treasures + 20 map places
 * + 2 explored books + 2 "special" actions (completing the quiz, reaching
 * nightfall). If you add a new interactive thing that should count
 * toward the ring, bump this number and call `mark()` with a unique key.
 */
export const TOTAL_ACTIONS = TREASURES.length + PLACES.length + BOOKS.length + 2; // 6+20+2+2 = 30

export const BADGES = [
  { at: 6, name: "Snackville Visitor", ink: C.mint },
  { at: 18, name: "Snackville Explorer", ink: C.butter },
  { at: 30, name: "Keeper of Snackville", ink: C.strawberry },
];
