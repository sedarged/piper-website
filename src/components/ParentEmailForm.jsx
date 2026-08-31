import { useState } from "react";
import { MAILING_ENDPOINT } from "../config.js";

/**
 * The parent/guardian email signup form, shared by the Join quiz's
 * "grown-ups only" step and the Parents' Corner section. Lives here once
 * so both call sites share the same validation, consent checkbox and
 * mailing-endpoint submission logic instead of duplicating it.
 *
 * `payloadExtra` is merged into the JSON body sent to MAILING_ENDPOINT
 * (e.g. the child's typed name and matched kitten, from the quiz flow).
 */
export function ParentEmailForm({ chime, burst, payloadExtra = {}, onSuccess, ctaLabel = "Send the pack" }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError("That email doesn't look quite right."); return; }
    if (!consent) { setError("Please tick the box so we know it's okay to email you."); return; }
    if (!MAILING_ENDPOINT) { setError("The welcome pack is not set up for delivery yet. Please ask a grown-up to try again later."); return; }

    setSending(true);
    try {
      const response = await fetch(MAILING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "snackville", ...payloadExtra }),
      });
      if (!response.ok) throw new Error(`Mailing endpoint returned ${response.status}`);
      chime?.(1046, 0.35);
      burst?.(36);
      onSuccess?.();
    } catch (_e) {
      setError("Something went wrong. Try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="m-row">
        <input
          className="m-in" type="email" inputMode="email" placeholder="Parent or guardian email"
          value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Parent or guardian email"
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
        />
        <button className="btn b-mint" onClick={submit} disabled={sending}>
          {sending ? "Sending…" : ctaLabel}
        </button>
      </div>
      <label className="cons">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          I'm the parent or guardian and I'm happy to receive the welcome pack and occasional
          news about new Piper books. Unsubscribe any time, one click.
        </span>
      </label>
      {error && <p role="alert" style={{ color: "var(--straw)", fontSize: 15, marginTop: 12, fontWeight: 600 }}>{error}</p>}
      {!MAILING_ENDPOINT && <p style={{ fontSize: 12.5, color: "var(--ink40)", marginTop: 12, fontStyle: "italic" }}>The welcome pack delivery is being prepared and cannot send email yet.</p>}
    </div>
  );
}
