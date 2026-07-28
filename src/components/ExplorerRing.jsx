import { C } from "../styles/tokens.js";
import { TOTAL_ACTIONS } from "../data/treasures.js";

/**
 * The fixed-position progress ring, bottom-left. Shows how many of the
 * TOTAL_ACTIONS things (treasures + map places + book spins + quiz +
 * nightfall) have been done, and which badge tier that currently earns
 * (see data/treasures.js BADGES). Tapping it re-explains the mechanic
 * via the toast, for anyone who missed the initial "?" hint.
 */
export function ExplorerRing({ count, tier, onExplain }) {
  const fraction = count / TOTAL_ACTIONS;
  const circumference = 106.8; // 2 * π * r=17, precomputed to match the SVG below

  return (
    <button
      className="ring"
      onClick={onExplain}
      aria-label={`Explorer progress: ${count} of ${TOTAL_ACTIONS}`}
    >
      <span style={{ position: "relative", width: 42, height: 42, flexShrink: 0 }}>
        <svg viewBox="0 0 42 42" width="42" height="42" aria-hidden="true">
          <circle cx="21" cy="21" r="17" fill="none" stroke="rgba(42,26,46,.14)" strokeWidth="5" />
          <circle
            cx="21" cy="21" r="17" fill="none" stroke={tier ? tier.ink : C.mint} strokeWidth="5"
            strokeLinecap="round" strokeDasharray={`${fraction * circumference} ${circumference}`}
            transform="rotate(-90 21 21)" style={{ transition: "stroke-dasharray .6s cubic-bezier(.3,1.4,.4,1)" }}
          />
        </svg>
        <span style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center", fontFamily: "var(--d)", fontWeight: 800, fontSize: 14,
        }}>
          {count}
        </span>
      </span>
      <span style={{ textAlign: "left" }}>
        <span className="ring-n" style={{ display: "block" }}>{tier ? tier.name : "Explorer"}</span>
        <span className="ring-l">{count} of {TOTAL_ACTIONS} found</span>
      </span>
    </button>
  );
}
