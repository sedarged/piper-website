import { useCallback, useEffect, useRef, useState } from "react";
import { I } from "../Icons.jsx";
import { C } from "../../styles/tokens.js";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";
import { useBestScore } from "../../hooks/useBestScore.js";
import { GameCompleteButton, GameRetryButton, GameScoreboard } from "./GameModal.jsx";

const ROUND_SECONDS = 30;
const BASKET_WIDTH = 22;   // all geometry is in % of the play area, so the
const CATCH_LINE = 84;     // game scales from a phone to a desktop unchanged
const KEY_STEP = 7;

/** What can fall, how much it's worth, and how it sounds when caught. */
const DROPS = [
  { kind: "berry", icon: (s) => I.berry(s), points: 1, weight: 5, pitch: 660 },
  { kind: "croix", icon: () => I.croix(), points: 1, weight: 3, pitch: 720 },
  { kind: "star", icon: () => I.star(), points: 3, weight: 1, pitch: 1046 },
  { kind: "chilli", icon: () => I.chilli(), points: -1, weight: 2, pitch: 200 },
];

const WEIGHTED = DROPS.flatMap((drop) => Array(drop.weight).fill(drop));
const pickDrop = () => WEIGHTED[Math.floor(Math.random() * WEIGHTED.length)];

/**
 * Catch the falling treats in Piper's basket, and let the chillies go.
 *
 * The other four activities are all tap-a-target games. This one is the
 * odd one out on purpose — it's the only continuous-control game in the
 * set, so the studio isn't four variations on the same verb.
 *
 * It is playable three ways, all live at once: drag or move a pointer
 * over the play area, use the left/right arrow keys, or tap the two
 * on-screen buttons. The buttons exist because a phone held in two
 * hands has no pointer to drag with and no keyboard, and the arrow keys
 * because the game must be completable without a pointing device at
 * all.
 *
 * Positions are held in refs and written to the DOM from one animation
 * frame loop rather than being React state: at 60fps a state-driven
 * version re-renders the whole modal sixty times a second, which is the
 * same mistake useScrollEngine exists to document.
 */
export function BerryCatch({ onComplete, chime }) {
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [isRecord, setIsRecord] = useState(false);
  const [drops, setDrops] = useState([]);
  const [best, submitBest] = useBestScore("catch");
  const reduceMotion = useReducedMotion();

  const areaRef = useRef(null);
  const basketRef = useRef(null);
  const basketX = useRef(50);
  const dropsRef = useRef([]);
  const dropNodes = useRef(new Map());
  const frameRef = useRef(null);
  const lastFrame = useRef(0);
  const spawnAccumulator = useRef(0);
  const elapsed = useRef(0);
  const heldDirection = useRef(0);
  const runningRef = useRef(false);

  const setBasket = useCallback((next) => {
    const half = BASKET_WIDTH / 2;
    basketX.current = Math.max(half, Math.min(100 - half, next));
    if (basketRef.current) basketRef.current.style.left = `${basketX.current}%`;
  }, []);

  const start = () => {
    setScore(0);
    setTimeLeft(ROUND_SECONDS);
    setFinished(false);
    setIsRecord(false);
    setDrops([]);
    dropsRef.current = [];
    elapsed.current = 0;
    spawnAccumulator.current = 0;
    lastFrame.current = 0;
    heldDirection.current = 0;
    setBasket(50);
    setRunning(true);
  };

  // ── the game loop ──────────────────────────────────────────────────
  useEffect(() => {
    runningRef.current = running;
    if (!running) return undefined;

    const tick = (now) => {
      const delta = lastFrame.current ? Math.max(0, (now - lastFrame.current) / 1000) : 0;
      const dt = Math.min(delta, 0.05);
      lastFrame.current = now;
      // Keep the round at 30 real seconds even when frames are slow.
      // Physics stays bounded; hiding the tab resets the clock below.
      elapsed.current += document.hidden ? 0 : delta;

      if (elapsed.current >= ROUND_SECONDS) {
        heldDirection.current = 0;
        setTimeLeft(0);
        setRunning(false);
        setFinished(true);
        return;
      }
      setTimeLeft(Math.max(0, Math.ceil(ROUND_SECONDS - elapsed.current)));

      // Held arrow keys move the basket smoothly rather than one
      // keydown-repeat step at a time, so keyboard play isn't visibly
      // worse than pointer play.
      if (heldDirection.current) setBasket(basketX.current + heldDirection.current * KEY_STEP * dt * 12);

      // Drops get a little faster and a little more frequent as the
      // round goes on, the same ramp idea as Whack-a-Snack.
      const progress = elapsed.current / ROUND_SECONDS;
      const spawnEvery = 0.9 - progress * 0.42;
      spawnAccumulator.current += dt;
      let rosterChanged = false;
      if (spawnAccumulator.current >= spawnEvery) {
        rosterChanged = true;
        spawnAccumulator.current = 0;
        const drop = pickDrop();
        dropsRef.current.push({
          id: `d${now}-${Math.random()}`,
          kind: drop.kind,
          x: 6 + Math.random() * 88,
          y: -8,
          speed: 26 + Math.random() * 16 + progress * 26,
        });
      }

      let caught = 0;
      const survivors = [];
      for (const drop of dropsRef.current) {
        drop.y += drop.speed * dt;
        const spec = DROPS.find((d) => d.kind === drop.kind);
        const overBasket = Math.abs(drop.x - basketX.current) < BASKET_WIDTH / 2 + 3;
        if (drop.y >= CATCH_LINE && drop.y <= CATCH_LINE + 12 && overBasket) {
          rosterChanged = true;
          caught += spec.points;
          chime?.(spec.pitch, spec.points > 0 ? 0.1 : 0.2);
          continue;
        }
        if (drop.y < 108) {
          survivors.push(drop);
          const node = dropNodes.current.get(drop.id);
          if (node) node.style.top = `${drop.y}%`;
        } else rosterChanged = true;
      }
      dropsRef.current = survivors;
      // Score is real state — it's read by the status line and the
      // record check — but the positions above are not.
      if (caught) setScore((s) => Math.max(0, s + caught));
      // React only owns the roster; positions are painted through refs.
      if (rosterChanged) setDrops([...survivors]);

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [running, chime, setBasket]);

  useEffect(() => {
    if (!finished) return;
    setIsRecord(submitBest(score));
    // submitBest changes identity when `best` changes, which is what
    // this sets — re-running would re-check the score against the
    // record it just wrote.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  // ── the three control schemes ──────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (event) => {
      if (!runningRef.current) return;
      if (event.key === "ArrowLeft") { heldDirection.current = -1; event.preventDefault(); }
      if (event.key === "ArrowRight") { heldDirection.current = 1; event.preventDefault(); }
    };
    const onKeyUp = (event) => {
      if (event.key === "ArrowLeft" && heldDirection.current === -1) heldDirection.current = 0;
      if (event.key === "ArrowRight" && heldDirection.current === 1) heldDirection.current = 0;
    };
    const releaseControls = () => {
      heldDirection.current = 0;
      lastFrame.current = 0;
    };
    window.addEventListener("blur", releaseControls);
    document.addEventListener("visibilitychange", releaseControls);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("blur", releaseControls);
      document.removeEventListener("visibilitychange", releaseControls);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const trackPointer = (event) => {
    if (!running || !areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    setBasket(((event.clientX - rect.left) / rect.width) * 100);
  };

  const nudge = (direction) => setBasket(basketX.current + direction * KEY_STEP);

  const status = finished
    ? `Round over — you caught ${score}!`
    : running
      ? `Score ${score} · ${timeLeft}s left`
      : "Catch the treats. Let the chillies fall!";

  return (
    <div className="catch-game">
      <GameScoreboard best={best} bestLabel="Best score" />

      <p className="u catch-status" aria-live="polite">{status}</p>

      {running && (
        <div className="whack-timer" aria-hidden="true">
          <span style={{ width: `${(timeLeft / ROUND_SECONDS) * 100}%` }} />
        </div>
      )}

      {/* The play area itself is decorative: everything in it is drawn
          from the loop above, and the live score in the status line
          (aria-live) is what actually reports the game's state. */}
      <div
        ref={areaRef}
        className="catch-area"
        onPointerMove={trackPointer}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          trackPointer(event);
        }}
        aria-hidden="true"
      >
        {drops.map((drop) => (
          <span
            key={drop.id}
            ref={(node) => {
              if (node) dropNodes.current.set(drop.id, node);
              else dropNodes.current.delete(drop.id);
            }}
            className={`catch-drop catch-drop--${drop.kind} ${reduceMotion.current ? "is-still" : ""}`}
            style={{ left: `${drop.x}%`, top: `${drop.y}%` }}
          >
            {DROPS.find((d) => d.kind === drop.kind).icon(C.strawberry)}
          </span>
        ))}
        <span ref={basketRef} className="catch-basket" style={{ left: "50%" }}>
          {I.basket()}
        </span>
      </div>

      {running ? (
        <div className="catch-controls">
          <button className="btn b-ghost btn-sm" onClick={() => nudge(-1)} aria-label="Move the basket left">←</button>
          <span className="catch-hint u">Drag, or use ← →</span>
          <button className="btn b-ghost btn-sm" onClick={() => nudge(1)} aria-label="Move the basket right">→</button>
        </div>
      ) : finished ? (
        <>
          {isRecord && <p className="game-record u">🏆 A new personal best!</p>}
          <div className="game-actions">
            <GameCompleteButton onComplete={onComplete} />
            <GameRetryButton onRetry={start} label="Play again" />
          </div>
        </>
      ) : (
        <button className="btn b-straw" onClick={start}>Start!</button>
      )}
    </div>
  );
}
