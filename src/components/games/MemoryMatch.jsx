import { useEffect, useState } from "react";
import { TI } from "../Icons.jsx";

// Each icon's default colour (see Icons.jsx) is already the right one
// for this game, so TI[key]() is called with no colour override below.
const ICON_KEYS = ["berry", "croix", "star", "bean", "donut", "scale"];

function shuffledDeck() {
  const pairs = ICON_KEYS.flatMap((key) => [{ key, uid: `${key}-a` }, { key, uid: `${key}-b` }]);
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

/**
 * A card-flip memory game using the same hand-drawn treasure icons as
 * the treasure hunt (see Icons.jsx's TI map) — six pairs, no new
 * artwork needed. Find every pair to win.
 */
export function MemoryMatch({ onComplete, chime }) {
  const [deck, setDeck] = useState(shuffledDeck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

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
    const t = setTimeout(() => setFlipped([]), 750);
    return () => clearTimeout(t);
  }, [flipped, deck, chime]);

  const done = matched.length === ICON_KEYS.length;

  const flip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(deck[index].key)) return;
    setFlipped((f) => [...f, index]);
  };

  const restart = () => { setDeck(shuffledDeck()); setFlipped([]); setMatched([]); setMoves(0); };

  return (
    <div className="memory-game">
      <p className="u memory-status">
        {done ? `Solved in ${moves} moves!` : `Pairs found: ${matched.length}/${ICON_KEYS.length} · Moves: ${moves}`}
      </p>
      <div className="memory-grid">
        {deck.map((card, i) => {
          const isUp = flipped.includes(i) || matched.includes(card.key);
          return (
            <button
              key={card.uid} className={`memory-card ${isUp ? "up" : ""}`} onClick={() => flip(i)}
              disabled={isUp} aria-label={isUp ? card.key : "Hidden card"}
            >
              {isUp && <span className="memory-card-face">{TI[card.key]()}</span>}
            </button>
          );
        })}
      </div>
      {done ? (
        <button className="btn b-straw" onClick={onComplete}>Collect my badge!</button>
      ) : (
        <button className="btn b-ghost btn-sm" onClick={restart}>Shuffle again</button>
      )}
    </div>
  );
}
