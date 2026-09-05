import { useCallback, useEffect, useRef, useState } from "react";
import { I } from "../Icons.jsx";
import { C } from "../../styles/tokens.js";
import { useBestScore } from "../../hooks/useBestScore.js";
import { GameCompleteButton, GameRetryButton, GameScoreboard } from "./GameModal.jsx";

const GRID = 9;
const ROUND_SECONDS = 30;

/**
 * How fast treats appear, and how likely a chilli is, as the round goes
 * on. The round starts slow and generous and tightens twice, so the
 * first ten seconds are winnable by a three-year-old and the last ten
 * still hold a seven-year-old's attention — the age range this site is
 * written for is wide enough that one fixed speed can't serve it.
 */
const PHASES = [
  { after: 0, hold: [900, 1400], chilliChance: 0 },
  { after: 10, hold: [650, 1000], chilliChance: 0.18 },
  { after: 20, hold: [430, 720], chilliChance: 0.28 },
];

const phaseFor = (elapsed) => PHASES.reduce((current, phase) => (elapsed >= phase.after ? phase : current), PHASES[0]);

/**
 * A quick reaction game: a treat pops up in a random cell of the grid
 * and the player taps it before it moves on.
 *
 * Three things make a round worth replaying rather than just watching a
 * number go up — a chilli that has to be *left alone* (so the game asks
 * for judgement, not just speed), a streak bonus for consecutive hits,
 * and a difficulty ramp (see PHASES). The personal best is remembered
 * between visits.
 */
export function WhackASnack({ onComplete, chime }) {
  const [active, setActive] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [flash, setFlash] = useState(null);
  const [best, submitBest] = useBestScore("whack");
  const popTimer = useRef(null);
  const tickTimer = useRef(null);
  const flashTimer = useRef(null);
  // Read by the pop scheduler, which is set up once per round and would
  // otherwise close over the score/time from the moment it started.
  const elapsedRef = useRef(0);

  const start = () => {
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setFinished(false);
    setIsRecord(false);
    setFlash(null);
    setTimeLeft(ROUND_SECONDS);
    elapsedRef.current = 0;
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return undefined;

    const popNext = () => {
      const phase = phaseFor(elapsedRef.current);
      const [min, max] = phase.hold;
      setActive({
        cell: Math.floor(Math.random() * GRID),
        chilli: Math.random() < phase.chilliChance,
      });
      popTimer.current = setTimeout(popNext, min + Math.random() * (max - min));
    };
    popNext();

    tickTimer.current = setInterval(() => {
      elapsedRef.current += 1;
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

  // The final score isn't known until the timer has stopped, so the
  // record check runs here rather than inside the tick above — where it
  // would be reading a `score` one render out of date.
  useEffect(() => {
    if (!finished) return;
    setIsRecord(submitBest(score));
    // submitBest is intentionally omitted: it changes identity whenever
    // `best` does, which is exactly what this effect updates, and
    // re-running on that would re-check the same score against the
    // record it just set.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  useEffect(() => () => {
    clearTimeout(popTimer.current);
    clearInterval(tickTimer.current);
    clearTimeout(flashTimer.current);
  }, []);

  const showFlash = useCallback((kind) => {
    setFlash(kind);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 420);
  }, []);

  const whack = (index) => {
    if (!active || index !== active.cell) return;

    if (active.chilli) {
      // Tapping a chilli costs the streak and a point, but the score
      // never goes below zero — a round that ends on a negative number
      // reads as "you did it wrong" to a small child, which is not what
      // a game like this is for.
      chime?.({ type: "square", gain: 0.05, notes: [{ f: 200, t: 0, d: 0.22, slide: 0.6 }] });
      setStreak(0);
      setScore((s) => Math.max(0, s - 1));
      showFlash("miss");
      setActive(null);
      return;
    }

    const nextStreak = streak + 1;
    // Every third consecutive treat is worth double, and says so.
    const bonus = nextStreak % 3 === 0;
    chime?.(bonus ? 1046 : 640 + Math.min(nextStreak, 8) * 40, bonus ? 0.18 : 0.1);
    setStreak(nextStreak);
    setBestStreak((b) => Math.max(b, nextStreak));
    setScore((s) => s + (bonus ? 2 : 1));
    showFlash(bonus ? "bonus" : "hit");
    setActive(null);
  };

  const status = finished
    ? `Time's up — you scored ${score}${bestStreak > 2 ? `, best streak ${bestStreak}` : ""}!`
    : running
      ? `Score ${score} · ${timeLeft}s left${streak > 1 ? ` · ${streak} in a row!` : ""}`
      : "Tap the treats — but leave the chillies alone!";

  return (
    <div className={`whack-game ${flash ? `is-${flash}` : ""}`}>
      <GameScoreboard best={best} bestLabel="Best score" />

      <p className="u whack-status" aria-live="polite">{status}</p>

      {running && (
        <div className="whack-timer" aria-hidden="true">
          <span style={{ width: `${(timeLeft / ROUND_SECONDS) * 100}%` }} />
        </div>
      )}

      <div className="whack-grid">
        {Array.from({ length: GRID }, (_, i) => {
          const up = active?.cell === i;
          const chilli = up && active.chilli;
          return (
            <button
              key={i}
              className={`whack-cell ${up ? "up" : ""} ${chilli ? "is-chilli" : ""}`}
              onClick={() => whack(i)}
              disabled={!running}
              aria-label={up ? (chilli ? "Chilli — do not tap" : "Treat! Tap it") : "Empty"}
            >
              {up && (
                <span className="whack-icon">
                  {chilli ? I.chilli() : I.donut(C.strawberry)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {!running && !finished && <button className="btn b-straw" onClick={start}>Start!</button>}

      {finished && (
        <>
          {isRecord && <p className="game-record u">🏆 A new personal best!</p>}
          <div className="game-actions">
            <GameCompleteButton onComplete={onComplete} />
            <GameRetryButton onRetry={start} label="Play again" />
          </div>
        </>
      )}
    </div>
  );
}
