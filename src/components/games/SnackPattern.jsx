import { useEffect, useRef, useState } from "react";
import { I } from "../Icons.jsx";
import { GameCompleteButton, GameRetryButton } from "./GameModal.jsx";

const TILES = ["berry", "croix", "star", "bean", "donut", "scale"];
const TILE_PITCH = { berry: 523, croix: 587, star: 659, bean: 698, donut: 784, scale: 880 };
const STEP_MS = 650;

const randomTile = () => TILES[Math.floor(Math.random() * TILES.length)];

/**
 * A Simon-says style memory game using the same six hand-drawn icons as
 * the treasure hunt and Snack Squad Memory (see Icons.jsx) — no new
 * artwork needed. The pattern lights up one tile at a time and grows by
 * one every round the player copies correctly; a wrong tap ends the
 * round and shows how far they got.
 */
export function SnackPattern({ onComplete, chime }) {
  const [sequence, setSequence] = useState([]);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | showing | input | gameover
  const [litTile, setLitTile] = useState(null);
  const [round, setRound] = useState(0);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const playSequence = (seq) => {
    setPhase("showing");
    seq.forEach((tile, i) => {
      timers.current.push(setTimeout(() => {
        setLitTile(tile);
        chime?.(TILE_PITCH[tile], 0.18);
        timers.current.push(setTimeout(() => setLitTile(null), 320));
      }, i * STEP_MS));
    });
    timers.current.push(setTimeout(() => { setPhase("input"); setStep(0); }, seq.length * STEP_MS));
  };

  const start = () => {
    clearTimers();
    const seq = [randomTile()];
    setSequence(seq);
    setRound(1);
    timers.current.push(setTimeout(() => playSequence(seq), 400));
  };

  const tap = (tile) => {
    if (phase !== "input") return;
    setLitTile(tile);
    setTimeout(() => setLitTile(null), 180);

    if (tile !== sequence[step]) {
      chime?.(220, 0.3);
      setPhase("gameover");
      return;
    }
    if (step + 1 === sequence.length) {
      chime?.(880, 0.15);
      const next = [...sequence, randomTile()];
      setSequence(next);
      setRound((r) => r + 1);
      timers.current.push(setTimeout(() => playSequence(next), 500));
    } else {
      chime?.(660, 0.12);
      setStep((s) => s + 1);
    }
  };

  const restart = () => { clearTimers(); setPhase("idle"); setSequence([]); setStep(0); setRound(0); };

  return (
    <div className="pattern-game">
      <p className="u pattern-status">
        {phase === "idle" && "Watch Piper's pattern, then copy it back!"}
        {phase === "showing" && "Watch closely…"}
        {phase === "input" && `Your turn — round ${round}`}
        {phase === "gameover" && `Game over — you reached round ${round}!`}
      </p>
      <div className="pattern-grid">
        {TILES.map((tile) => (
          <button
            key={tile}
            className={`pattern-tile ${litTile === tile ? "lit" : ""}`}
            onClick={() => tap(tile)}
            disabled={phase !== "input"}
            aria-label={tile}
          >
            {I[tile]()}
          </button>
        ))}
      </div>
      {phase === "idle" && <button className="btn b-straw" onClick={start}>Start!</button>}
      {phase === "gameover" && (
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <GameCompleteButton onComplete={onComplete} />
          <GameRetryButton onRetry={restart} label="Play again" />
        </div>
      )}
    </div>
  );
}
