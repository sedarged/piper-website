import { useCallback, useEffect, useRef, useState } from "react";
import { TI, ICON_NAMES } from "../Icons.jsx";
import { useBestScore } from "../../hooks/useBestScore.js";
import { GameCompleteButton, GameRetryButton, GameScoreboard } from "./GameModal.jsx";

// Each icon's default colour (see Icons.jsx) is already the right one
// for this game, so TI[key]() is called with no colour override below.
const ALL_KEYS = ["berry", "croix", "star", "bean", "donut", "scale"];

/**
 * Two board sizes rather than one. Six pairs is a real challenge at
 * four and trivially easy at seven; offering "Easy" as four pairs keeps
 * the younger half of the 3–7 audience finishing a board instead of
 * giving up on it, and gives the older half something to graduate from.
 * Bests are tracked per level, since eight moves on a four-pair board
 * isn't the same achievement as eight on a six-pair one.
 */
const LEVELS = {
  easy: { label: "Easy", pairs: 4 },
  tricky: { label: "Tricky", pairs: 6 },
};

function shuffledDeck(pairCount) {
  const pairs = ALL_KEYS.slice(0, pairCount)
    .flatMap((key) => [{ key, uid: `${key}-a` }, { key, uid: `${key}-b` }]);
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

/**
 * A card-flip memory game using the same hand-drawn treasure icons as
 * the treasure hunt (see Icons.jsx's TI map) — no new artwork needed.
 * Find every pair to win.
 *
 * The score is moves taken, so fewer is better and the personal best
 * counts *down* (see useBestScore's `higherIsBetter`). Cards flip with
 * a real 3D turn rather than swapping contents, which is most of what
 * makes a matching game feel like a game rather than a grid of toggles.
 */
export function MemoryMatch({ onComplete, chime }) {
  const [level, setLevel] = useState("tricky");
  const pairCount = LEVELS[level].pairs;

  const [deck, setDeck] = useState(() => shuffledDeck(LEVELS.tricky.pairs));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isRecord, setIsRecord] = useState(false);
  const [best, submitBest] = useBestScore(`memory-${level}`, { higherIsBetter: false });
  const recordedFor = useRef(null);

  const done = matched.length === pairCount;

  useEffect(() => {
    if (flipped.length !== 2) return undefined;
    const [a, b] = flipped;
    setMoves((m) => m + 1);
    if (deck[a].key === deck[b].key) {
      const t = setTimeout(() => {
        setMatched((m) => [...m, deck[a].key]);
        setFlipped([]);
        chime?.(760, 0.15);
      }, 350);
      return () => clearTimeout(t);
    }
    // A wrong pair is worth a sound too — silence reads as "nothing
    // happened" to a child who is still learning the rules.
    chime?.({ type: "triangle", gain: 0.04, notes: [{ f: 300, t: 0, d: 0.16, slide: 0.7 }] });
    const t = setTimeout(() => setFlipped([]), 750);
    return () => clearTimeout(t);
  }, [flipped, deck, chime]);

  // Recorded once per completed board — `recordedFor` guards against a
  // second run of this effect (StrictMode, or any later re-render while
  // the board sits finished) re-submitting the same result.
  useEffect(() => {
    if (!done) return;
    const boardId = `${level}-${deck.map((c) => c.uid).join("")}`;
    if (recordedFor.current === boardId) return;
    recordedFor.current = boardId;
    setIsRecord(submitBest(moves));
    chime?.({ type: "triangle", notes: [{ f: 784, t: 0, d: 0.16 }, { f: 1046, t: 0.12, d: 0.16 }, { f: 1319, t: 0.24, d: 0.4 }] });
  }, [done, level, deck, moves, submitBest, chime]);

  const flip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(deck[index].key)) return;
    setFlipped((f) => [...f, index]);
  };

  const restart = useCallback((nextLevel = level) => {
    setLevel(nextLevel);
    setDeck(shuffledDeck(LEVELS[nextLevel].pairs));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsRecord(false);
    recordedFor.current = null;
  }, [level]);

  return (
    <div className="memory-game">
      <div className="game-levels" role="group" aria-label="Choose a difficulty">
        {Object.entries(LEVELS).map(([key, config]) => (
          <button
            key={key}
            className={`game-level ${level === key ? "on" : ""}`}
            onClick={() => restart(key)}
            aria-pressed={level === key}
          >
            {config.label}
          </button>
        ))}
      </div>

      <GameScoreboard best={best} bestLabel={`Best (${LEVELS[level].label})`} suffix=" moves" />

      <p className="u memory-status" aria-live="polite">
        {done
          ? `Solved in ${moves} moves!`
          : `Pairs found: ${matched.length}/${pairCount} · Moves: ${moves}`}
      </p>

      <div className={`memory-grid memory-grid--${level}`}>
        {deck.map((card, i) => {
          const isMatched = matched.includes(card.key);
          const isUp = flipped.includes(i) || isMatched;
          return (
            <button
              key={card.uid}
              className={`memory-card ${isUp ? "up" : ""} ${isMatched ? "matched" : ""}`}
              onClick={() => flip(i)}
              disabled={isUp}
              aria-label={isUp ? `${ICON_NAMES[card.key]}${isMatched ? " — matched" : ""}` : "Hidden card"}
            >
              {/* Both faces are always in the DOM and the card turns
                  between them, so the flip is a single continuous
                  motion rather than the front vanishing and the back
                  appearing in its place. */}
              <span className="memory-card-inner">
                <span className="memory-card-back" aria-hidden="true" />
                <span className="memory-card-face">{TI[card.key]()}</span>
              </span>
            </button>
          );
        })}
      </div>

      {done ? (
        <>
          {isRecord && <p className="game-record u">🏆 Your fewest moves yet!</p>}
          <div className="game-actions">
            <GameCompleteButton onComplete={onComplete} />
            <GameRetryButton onRetry={() => restart()} label="Play again" />
          </div>
        </>
      ) : (
        <GameRetryButton onRetry={() => restart()} label="Shuffle again" />
      )}
    </div>
  );
}
