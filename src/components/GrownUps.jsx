import { useState } from "react";
import { AMAZON_URL } from "../config.js";
import { ParentEmailForm } from "./ParentEmailForm.jsx";

const FACT_TABLE = [
  ["Ages", "3–7"],
  ["Pages", "32"],
  ["Format", "Paperback, square"],
  ["Read-aloud time", "About 11 minutes"],
  ["Series", "Book 1 of an ongoing series"],
  ["Publisher", "Wallace-Siedlarz Books"],
  ["ASIN", "B0H45N194K"],
];

/**
 * Parents' Corner — the site's one consolidated, clearly-marked door for
 * grown-ups (see the design plan's "two-door split": the rest of the
 * page is the child's world; this section is deliberately quieter, with
 * plain facts, no games, an always-available welcome-pack signup, and an
 * explicit privacy statement). Everything a parent needs — safety notes,
 * book specs, the read-aloud tip sheet, and the mailing signup — lives
 * here, so nothing kid-facing (like Activities) has to double as a
 * parent funnel.
 */
export function GrownUps({ chime, burst }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="gu" style={{ background: "transparent", border: "none", padding: 0 }}>
      <div className="gu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,4vw,52px)", alignItems: "start" }}>
        <div>
          <span className="gu-tag">For parents &amp; guardians</span>
          <h2 className="h3" style={{ marginBottom: 14 }}>The details, plainly</h2>
          <p style={{ color: "var(--ink60)", fontSize: 17 }}>
            <strong>Piper and the Custard Alien Invasion</strong> is a 32-page paperback picture book for
            children aged roughly three to seven. It takes about eleven minutes to read aloud, which is
            roughly one bedtime. Full-colour illustration throughout, matte cover, square format.
          </p>
          <p style={{ color: "var(--ink60)", fontSize: 17, marginTop: 14 }}>
            The story is gentle. There is a villain, but nobody is hurt and the problem is solved by
            somebody being kind first. If your child is sensitive to peril, this one is safe.
          </p>
          <a className="btn b-plum" href={AMAZON_URL} target="_blank" rel="noreferrer" style={{ marginTop: 20 }}>
            Buy on Amazon UK →
          </a>
        </div>

        <div>
          <div style={{ borderTop: "2px solid rgba(42,26,46,.12)" }}>
            {FACT_TABLE.map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0", borderBottom: "2px solid rgba(42,26,46,.12)" }}>
                <span className="eyebrow">{k}</span>
                <span className="u" style={{ fontSize: 15.5, textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14.5, color: "var(--ink40)", marginTop: 16, lineHeight: 1.55 }}>
            This site collects no information from children. The name typed into the member card stays in
            the browser and is never transmitted. Email signup is for parents and guardians only.
          </p>
        </div>
      </div>

      <div className="gu-signup" style={{ marginTop: 32, paddingTop: 28, borderTop: "2px solid rgba(42,26,46,.12)" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: 10 }}>Free welcome pack</span>
        <h3 className="h3" style={{ marginBottom: 8 }}>Get the printables and read-aloud notes</h3>
        <p style={{ color: "var(--ink60)", fontSize: 16.5, marginBottom: 4 }}>
          Colouring pages, the Snackville map as an A3 poster, a cut-out badge, and read-aloud notes —
          questions to ask, voices to try, where to pause. Free, sent straight to your inbox.
        </p>
        {sent ? (
          <p style={{ color: "var(--mint)", fontWeight: 600, marginTop: 14 }}>
            Thanks — check your inbox (and the spam folder) for the welcome pack.
          </p>
        ) : (
          <ParentEmailForm
            chime={chime}
            burst={burst}
            payloadExtra={{ source: "parents-corner" }}
            onSuccess={() => setSent(true)}
          />
        )}
      </div>
    </div>
  );
}
