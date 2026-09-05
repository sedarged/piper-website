import { useEffect, useState } from "react";
import { isMuted, setMuted, subscribeMuted } from "../lib/sound.js";

/**
 * A single, always-reachable control for turning the site's sound
 * effects off. Everything on this site that makes a noise does so
 * through useChime, which checks the same module-level preference this
 * button writes — so one toggle covers the map's twenty signature
 * effects, all five games, the quiz and every button tap at once.
 *
 * Worth having on a site aimed at 3–7s: sound arrives unannounced on
 * the first tap, often on a shared device or in a classroom, and the
 * OS volume control is a blunt instrument for a child who just wants
 * this one page to be quiet.
 */
export function SoundToggle({ className = "" }) {
  const [muted, setLocalMuted] = useState(isMuted);

  useEffect(() => subscribeMuted(setLocalMuted), []);

  return (
    <button
      type="button"
      className={`sound-toggle ${muted ? "is-muted" : ""} ${className}`}
      onClick={() => setMuted(!muted)}
      aria-pressed={muted}
      title={muted ? "Turn sounds on" : "Turn sounds off"}
    >
      <span className="sound-toggle__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M4 9.5h3.4L12 5.4v13.2L7.4 14.5H4z" fill="currentColor" />
          {muted ? (
            <path d="M15.5 9.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M15.4 8.8a4.4 4.4 0 010 6.4M18 6.4a8 8 0 010 11.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          )}
        </svg>
      </span>
      <span className="sr-only">{muted ? "Turn sounds on" : "Turn sounds off"}</span>
    </button>
  );
}
