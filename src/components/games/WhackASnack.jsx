import { useEffect, useRef, useState } from "react";
import { I } from "../Icons.jsx";
import { C } from "../../styles/tokens.js";
import { GameCompleteButton, GameRetryButton } from "./GameModal.jsx";

const GRID = 9;
const ROUND_SECONDS = 20;

/**
 * A quick reaction game: a treat pops up in a random cell of the grid
 * and the player taps it before it moves on. Pure setTimeout/setInterval
 * — no animation library needed.
 */
export function WhackASnack({ onComplete, chime }) {
  const [active, setActive] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const popTimer = useRef(null);
  const tickTimer = useRef(null);

  const start = () => {
    setScore(0);
    setFinished(false);
    setTimeLeft(ROUND_SECONDS);
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return undefined;

    const popNext = () => {
      setActive(Math.floor(Math.random() * GRID));
      popTimer.current = setTimeout(popNext, 550 + Math.random() * 500);
    };
    popNext();

    tickTimer.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(tickTimer.current);
          clearTimeout(popTimer.current);
          setRunning(false);
          setActive(null);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(popTimer.current);
      clearInterval(tickTimer.current);
    };
  }, [running]);

  const whack = (i) => {
    if (i !== active) return;
    chime?.(700 + score * 20, 0.1);
    setScore((s) => s + 1);
    setActive(null);
  };

  return (
    <div className="whack-game">
      <p className="u whack-status">
        {finished
          ? `Time's up — you tapped ${score}!`
          : running
            ? `Score: ${score} · ${timeLeft}s left`
            : "Tap the treat as soon as it appears!"}
      </p>
      <div className="whack-grid">
        {Array.from({ length: GRID }, (_, i) => (
          <button key={i} className={`whack-cell ${active === i ? "up" : ""}`} onClick={() => whack(i)}>
            {active === i && <span className="whack-icon">{I.donut(C.strawberry)}</span>}
          </button>
        ))}
      </div>
      {!running && !finished && <button className="btn b-straw" onClick={start}>Start!</button>}
      {finished && (
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <GameCompleteButton onComplete={onComplete} />
          <GameRetryButton onRetry={start} label="Play again" />
        </div>
      )}
    </div>
  );
}
