import { C } from "../styles/tokens.js";

/**
 * The six free downloads promised in the "Free stuff" section and in
 * the welcome-pack email. Every `url` is empty until the actual PDFs
 * exist — see /docs/asset-list.md for generation prompts for each one.
 * Cards with an empty url route to the Join section instead of a dead
 * link, so nothing 404s while these are still being produced.
 */
export const PRINTABLES = [
  { id: "colour", name: "Colouring pages", n: "6 pages", url: "", ink: C.strawberry, note: "Piper, the Squad and the Dragon in clean outline." },
  { id: "map", name: "The Snackville map", n: "A3 poster", url: "", ink: C.mint, note: "The endpaper map, blank and ready to colour." },
  { id: "badge", name: "Snack Squad badge", n: "Cut & wear", url: "", ink: C.butter, note: "Print, cut out, tape to a jumper. Official." },
  { id: "maze", name: "Chocolate Mountain maze", n: "2 pages", url: "", ink: C.cocoa, note: "Help Piper find the dragon. Harder than it looks." },
  { id: "spot", name: "Spot the difference", n: "3 puzzles", url: "", ink: C.grape, note: "Ten things changed in Candy Path Square." },
  { id: "read", name: "Read-aloud notes", n: "For grown-ups", url: "", ink: C.sky, note: "Questions to ask, voices to try, where to pause." },
];
