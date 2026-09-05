/**
 * Global sound preference, kept outside React.
 *
 * `useChime` is called from a dozen unrelated components (the map, the
 * games, the quiz, the treasure hunt, the cast cards). Threading a
 * "sound on/off" prop down to all of them would mean touching every
 * one of those call sites and re-rendering large subtrees whenever the
 * toggle flips, so the preference lives here as a module singleton and
 * `useChime` reads it at the moment it's about to make a noise.
 *
 * Components that need to *display* the current state (the toggle
 * button itself) subscribe via `subscribeMuted`.
 */
const STORAGE_KEY = "piper:v1:muted";

let muted = false;
try {
  muted = window.localStorage.getItem(STORAGE_KEY) === "1";
} catch (_error) {
  // Private browsing or a blocking browser policy — default to sound on.
}

const listeners = new Set();

export function isMuted() {
  return muted;
}

export function setMuted(next) {
  if (muted === next) return;
  muted = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  } catch (_error) {
    // The preference simply won't survive a reload; the toggle still works.
  }
  listeners.forEach((listener) => listener(muted));
}

export function subscribeMuted(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
