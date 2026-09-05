import { useCallback, useState } from "react";

/**
 * One game's personal best, remembered between visits.
 *
 * "Best" isn't the same shape in every game — Whack-a-Snack and Piper's
 * Pattern want the *highest* number, Snack Squad Memory wants the
 * *fewest* moves — so `higherIsBetter` decides which way the comparison
 * runs rather than each game hand-rolling its own storage.
 *
 * Returns `[best, submit]`. `submit` returns true when the score it was
 * given is a new record, so the game can say so in its result line.
 *
 * A personal best matters more than a leaderboard for this age group:
 * it gives a five-year-old a reason for the *second* go without
 * introducing other children to lose to. Nothing here leaves the
 * browser.
 */
export function useBestScore(gameId, { higherIsBetter = true } = {}) {
  const key = `piper:v1:best:${gameId}`;

  const readBest = () => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored === null) return null;
      const value = Number(stored);
      return Number.isFinite(value) ? value : null;
    } catch (_error) {
      return null;
    }
  };
  const [record, setRecord] = useState(() => ({ key, best: readBest() }));
  // A mounted Memory game changes storage keys when its difficulty changes.
  // Read that key immediately, before a render can submit against the old best.
  let best = record.best;
  if (record.key !== key) {
    best = readBest();
    setRecord({ key, best });
  }

  const submit = useCallback((score) => {
    if (!Number.isFinite(score)) return false;
    const isRecord = best === null || (higherIsBetter ? score > best : score < best);
    if (!isRecord) return false;
    setRecord({ key, best: score });
    try {
      window.localStorage.setItem(key, String(score));
    } catch (_error) {
      // The record still shows for this session; it just won't survive
      // a reload when storage is unavailable.
    }
    return true;
  }, [best, higherIsBetter, key]);

  return [best, submit];
}
