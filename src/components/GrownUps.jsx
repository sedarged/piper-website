import { AMAZON_URL } from "../config.js";

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
 * The calm, editorial "For grown-ups" panel — deliberately quieter
 * than the rest of the bright, playful site (see the design plan's
 * "two-door split": the world is for the child, this panel is the
 * clearly-marked door for the parent). Plain facts, no games, and an
 * explicit one-line privacy statement.
 */
export function GrownUps() {
  return (
    <div className="gu" style={{ background: "transparent", border: "none", padding: 0 }}>
      <div className="gu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,4vw,52px)", alignItems: "start" }}>
        <div>
          <span className="gu-tag">For grown-ups</span>
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
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {FACT_TABLE.map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
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
    </div>
  );
}
