import { TOTAL_ACTIONS } from "../data/treasures.js";
import { I } from "./Icons.jsx";

/**
 * The full-screen celebration shown when a badge tier is reached (see
 * data/treasures.js BADGES — at 6, 12, and 18 actions). The final tier
 * (18/18, "found everything") gets a special line revealing the story's
 * unspoken theme; the earlier tiers get plain encouragement.
 */
export function BadgeCelebration({ badge, onClose, onJoin }) {
  if (!badge) return null;

  return (
    <div className="cele" onClick={onClose}>
      <div className="panel" style={{ maxWidth: 520, background: "var(--cream)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ width: 84, height: 84, margin: "0 auto 18px" }}>{I.badgeic()}</div>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Badge unlocked</div>
        <h2 className="h2" style={{ color: badge.ink, marginBottom: 16 }}>{badge.name}</h2>
        <p className="lead" style={{ margin: "0 auto 20px" }}>
          {badge.at === 18
            ? "You found every single thing in Snackville. Piper wants you to know something the books don't say out loud: every time they thought they'd found a monster, they'd actually just found somebody nobody had talked to yet."
            : `${badge.at} of ${TOTAL_ACTIONS} discovered. Keep going — there's more hidden than you'd think.`}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn b-mint" onClick={onJoin}>Join the Squad →</button>
          <button className="btn b-ghost" onClick={onClose}>Keep exploring</button>
        </div>
      </div>
    </div>
  );
}
