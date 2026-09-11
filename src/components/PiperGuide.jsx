import { useState } from "react";
import { drive, ASSET } from "../config.js";
import { Img } from "./Img.jsx";

/**
 * Piper's floating guide avatar, bottom-right. Tapping her replays the
 * current section's tip (see data/guide.js); the small ✕ dismisses her
 * for the rest of the session. `message` is owned by App.jsx, which
 * updates it automatically as the visitor scrolls between sections.
 */
export function PiperGuide({ message, onTap, onDismiss }) {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState(message || "Hi! I can help you find maps, games, characters and books.");
  const questions = [
    ["Where should I start?", "Start with the map. Every printed number opens a different story moment and effect."],
    ["Show me the games", "Head to the Snackville Studio for five games and two free printables."],
    ["Meet the characters", "Open any character portrait to discover their story, power and secret."],
    ["How do badges work?", "Explore places, books and games. Your Explorer badge grows as you discover more."],
  ];
  return (
    <div className={`guide ${open ? "guide--open" : ""}`}>
      <div style={{ position: "relative" }}>
        <button className="guide-av" onClick={() => { setOpen((value) => !value); onTap?.(); }} aria-label={open ? "Close Piper help" : "Open Piper help"} aria-expanded={open}>
          <Img src={drive(ASSET.piper, 300)} alt="Piper" fb="P" />
        </button>
        <button className="guide-x" onClick={onDismiss} aria-label="Hide Piper">✕</button>
      </div>
      {open ? (
        <aside className="piper-help" aria-label="Piper help guide">
          <span className="eyebrow">Ask Piper</span>
          <p className="piper-help__answer" aria-live="polite">{answer}</p>
          <div className="piper-help__questions">
            {questions.map(([question, response]) => (
              <button key={question} onClick={() => setAnswer(response)}>{question}</button>
            ))}
          </div>
        </aside>
      ) : message ? <div className="bubble">{message}</div> : null}
    </div>
  );
}
