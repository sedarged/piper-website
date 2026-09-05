import { useCallback, useEffect, useRef, useState } from "react";
import { I, ICON_NAMES } from "../Icons.jsx";
import { useBestScore } from "../../hooks/useBestScore.js";
import { GameCompleteButton, GameRetryButton, GameScoreboard } from "./GameModal.jsx";

const TILES = ["berry", "croix", "star", "bean", "donut", "scale"];
const TILE_PITCH = { berry: 523, croix: 587, star: 659, bean: 698, donut: 784, scale: 880 };

/**
 * The pattern plays back faster every round, from a slow, clearly
 * separated 700ms down to a brisk 340ms. A fixed tempo makes round two
 * and round nine feel identical apart from length; speeding up is what
 * turns "remember six things" into something that gets genuinely harder
 * and gives a reason to keep going.
 */
const START_STEP_MS = 700;
const MIN_STEP_MS = 340;
const stepMsFor = (round) => Math.max(MIN_STEP_MS, START_STEP_MS - (round - 1) * 34);

const randomTile = () => TILES[Math.floor(Math.random() * TILES.length)];

/**
 * A Simon-says style memory game using the same six hand-drawn icons as
 * the treasure hunt and Snack Squad Memory (see Icons.jsx) — no new
 * artwork needed. The pattern lights up one tile at a time and grows by
 * one every round the player copies correctly; a wrong tap ends the
 * round and shows how far they got, against their best.
 *
 * A progress row under the board shows how much of the current pattern
 * has been played back correctly, so a child who loses track mid-copy
 * can see where they are instead of guessing.
 */
export function SnackPattern({ onComplete, chime }) {
  const [sequence, setSequence] = useState([]);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | showing | input | gameover
  const [litTile, setLitTile] = useState(null);
  const [wrongTile, setWrongTile] = useState(null);
  const [round, setRound] = useState(0);
  const [isRecord, setIsRecord] = useState(false);
  const [best, submitBest] = useBestScore("pattern");
  const timers = useRef([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  useEffect(() => clearTimers, [clearTimers]);

  const playSequence = useCallback((seq) => {
    setPhase("showing");
    const stepMs = stepMsFor(seq.length);
    seq.forEach((tile, i) => {
      timers.current.push(setTimeout(() => {
        setLitTile(tile);
        chime?.(TILE_PITCH[tile], 0.18);
        timers.current.push(setTimeout(() => setLitTile(null), stepMs * 0.5));
      }, i * stepMs));
    });
    timers.current.push(setTimeout(() => { setPhase("input"); setStep(0); }, seq.length * stepMs));
  }, [chime]);

  const start = () => {
    clearTimers();
    setIsRecord(false);
    setWrongTile(null);
    const seq = [randomTile()];
    setSequence(seq);
    setRound(1);
    timers.current.push(setTimeout(() => playSequence(seq), 400));
  };

  const tap = (tile) => {
    if (phase !== "input") return;

    if (tile !== sequence[step]) {
      // Naming the tile that was wrong — and lighting it red — turns a
      // dead end into something a child can learn from.
      setWrongTile(tile);
      setLitTile(null);
      chime?.({ type: "sawtooth", gain: 0.05, notes: [{ f: 220, t: 0, d: 0.34, slide: 0.5 }] });
      setPhase("gameover");
      // The round reached is rounds *completed*, so a mistake in round 1
      // scores 0 rather than flattering the player with a 1.
      setIsRecord(submitBest(round - 1));
      return;
    }

    setLitTile(tile);
    timers.current.push(setTimeout(() => setLitTile(null), 180));

    if (step + 1 === sequence.length) {
      chime?.(880, 0.15);
      const next = [...sequence, randomTile()];
      setSequence(next);
      setRound((r) => r + 1);
      // Leave "input" immediately (playSequence sets it again once it
      // actually starts) — otherwise tiles stay tappable for the whole
      // 500ms gap below, with `step` still pointing at the round just
      // finished, so an eager extra tap here either ends the game on a
      // false mismatch or desyncs `step` ahead of the next round.
      setPhase("showing");
      timers.current.push(setTimeout(() => playSequence(next), 500));
    } else {
      chime?.(TILE_PITCH[tile], 0.12);
      setStep((s) => s + 1);
    }
  };

  const restart = () => {
    clearTimers();
    setPhase("idle");
    setSequence([]);
    setStep(0);
    setRound(0);
    setWrongTile(null);
    setIsRecord(false);
  };

  return (
    <div className="pattern-game">
      <GameScoreboard best={best} bestLabel="Best round" />

      <p className="u pattern-status" aria-live="polite">
        {phase === "idle" && "Watch Piper's pattern, then copy it back!"}
        {phase === "showing" && "Watch closely…"}
        {phase === "input" && `Your turn — round ${round}`}
        {phase === "gameover" && (round > 1
          ? `Good going — you finished ${round - 1} round${round - 1 === 1 ? "" : "s"}!`
          : "Not quite — have another go!")}
      </p>

      <div className="pattern-grid">
        {TILES.map((tile) => (
          <button
            key={tile}
            className={`pattern-tile ${litTile === tile ? "lit" : ""} ${wrongTile === tile ? "wrong" : ""}`}
            onClick={() => tap(tile)}
            disabled={phase !== "input"}
            aria-label={ICON_NAMES[tile]}
          >
            {I[tile]()}
          </button>
        ))}
      </div>

      {/* One pip per tile in the current pattern, filled as it's copied
          back correctly — the visible answer to "how far am I?". */}
      {(phase === "input" || phase === "showing") && sequence.length > 0 && (
        <div className="pattern-progress" aria-hidden="true">
          {sequence.map((_, i) => (
            <span key={i} className={`pattern-pip ${phase === "input" && i < step ? "on" : ""}`} />
          ))}
        </div>
      )}

      {phase === "idle" && <button className="btn b-straw" onClick={start}>Start!</button>}

      {phase === "gameover" && (
        <>
          {isRecord && round > 1 && <p className="game-record u">🏆 Your longest pattern yet!</p>}
          <div className="game-actions">
            <GameCompleteButton onComplete={onComplete} />
            <GameRetryButton onRetry={start} label="Play again" />
          </div>
        </>
      )}
    </div>
  );
}
