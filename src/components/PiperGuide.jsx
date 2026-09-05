import { WEBSITE_ART } from "../data/websiteArt.js";
import { ArtImage } from "./ArtImage.jsx";

/**
 * Piper's floating guide avatar, bottom-right. Tapping her replays the
 * current section's tip (see data/guide.js); the small ✕ dismisses her
 * for the rest of the session. `message` is owned by App.jsx, which
 * updates it automatically as the visitor scrolls between sections.
 */
export function PiperGuide({ message, onTap, onDismiss }) {
  return (
    <div className="guide">
      <div style={{ position: "relative" }}>
        <button className="guide-av" onClick={onTap} aria-label="Piper says something">
          <ArtImage art={WEBSITE_ART.characters.piper} alt="Piper" decoding="async" />
        </button>
        <button className="guide-x" onClick={onDismiss} aria-label="Hide Piper">✕</button>
      </div>
      {message && <div className="bubble">{message}</div>}
    </div>
  );
}
