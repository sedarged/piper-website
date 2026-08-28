import { CHARACTER_ART } from "../generated-assets/artwork.js";
import { SpriteArt } from "./SpriteArt.jsx";

/** Piper's floating guide avatar using the corrected Piper artwork. */
export function PiperGuide({ message, onTap, onDismiss }) {
  return (
    <div className="guide">
      <div style={{ position: "relative" }}>
        <button className="guide-av" onClick={onTap} aria-label="Piper says something" style={{ overflow: "hidden" }}>
          <SpriteArt art={CHARACTER_ART.piper} alt="Piper" style={{ height: "100%", borderRadius: "50%" }} />
        </button>
        <button className="guide-x" onClick={onDismiss} aria-label="Hide Piper">✕</button>
      </div>
      {message && <div className="bubble">{message}</div>}
    </div>
  );
}
