import { ColoringPage } from "./ColoringPage.jsx";
import { MemoryMatch } from "./MemoryMatch.jsx";
import { WhackASnack } from "./WhackASnack.jsx";
import { SnackPattern } from "./SnackPattern.jsx";
import { BerryCatch } from "./BerryCatch.jsx";

/**
 * Which component each studio card opens, keyed by the same `id` as its
 * entry in data/printables.js.
 *
 * Kept in its own module so the mapping has one home that both Free.jsx
 * and the content tests can read — otherwise a game added to the data
 * file without a component here fails silently at runtime, with the
 * card simply doing nothing when a child taps it.
 */
export const GAME_COMPONENTS = {
  colour: ColoringPage,
  memory: MemoryMatch,
  whack: WhackASnack,
  pattern: SnackPattern,
  catch: BerryCatch,
};
