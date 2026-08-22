import { useState } from "react";
import { drive, MAILING_ENDPOINT, AMAZON_URL } from "../config.js";
import { CAST } from "../data/cast.js";
import { QUIZ } from "../data/quiz.js";
import { C } from "../styles/tokens.js";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";
import { I } from "./Icons.jsx";

/**
 * The full "Join the Snack Squad" flow: a four-question quiz that
 * scores toward one of the four cast members, a name prompt, a
 * generated member card, and — only after the card exists — a parent
 * email form for the free welcome pack.
 *
 * This ordering is deliberate, not incidental: the child gets something
 * they want (a card with their name on it) before the parent is ever
 * asked for anything. See the design plan's "two-door split" — kids
 * play, parents subscribe.
 *
 * Steps: 0..QUIZ.length-1 = quiz questions
 *        QUIZ.length      = name prompt (shows the matched kitten)
 *        QUIZ.length + 1  = member card + email form
 *        QUIZ.length + 2  = confirmation
 *
 * No child-identifying data leaves the browser. The typed first name
 * exists only in component state, used to render the card and (if the
 * parent submits the form below) included in the payload alongside the
 * *parent's* email — never sent or stored on its own.
 */
export function Join({ chime, burst, mark }) {
  const [step, setStep] = useState(0);
  const [tally, setTally] = useState({});
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const answer = (key) => {
    chime(600 + step * 70, 0.12);
    const nextTally = { ...tally, [key]: (tally[key] || 0) + 1 };
    setTally(nextTally);
    if (step < QUIZ.length - 1) {
      setStep(step + 1);
    } else {
      const winner = Object.entries(nextTally).sort((a, b) => b[1] - a[1])[0][0];
      setResult(CAST.find((c) => c.key === winner) || CAST[0]);
      setStep(QUIZ.length);
      mark("quiz");
    }
  };

  const makeCard = () => {
    if (!name.trim()) { setError("Type your first name to get your card."); return; }
    setError("");
    chime(900, 0.3);
    burst(30);
    setStep(QUIZ.length + 1);
  };

  const submit = async () => {
    setError("");
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError("That email doesn't look quite right."); return; }
    if (!consent) { setError("Please tick the box so we know it's okay to email you."); return; }

    setSending(true);
    try {
      if (MAILING_ENDPOINT) {
        await fetch(MAILING_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, childName: name, kitten: result?.name, source: "snackville" }),
        });
      }
      setStep(QUIZ.length + 2);
      chime(1046, 0.35);
      burst(36);
    } catch (_e) {
      setError("Something went wrong. Try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setStep(0); setTally({}); setName(""); setResult(null);
    setEmail(""); setConsent(false); setError("");
  };

  const memberNumber = `SV-${String((name.length * 137 + (result?.name.length || 3) * 29) % 900 + 100)}`;

  return (
    <>
      <Reveal style={{ textAlign: "center", marginBottom: 34 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Join the Snack Squad</div>
        <h2 className="h2" style={{ color: "var(--grape)" }}>Which kitten are you?</h2>
        <p className="lead on-sky-s" style={{ margin: "14px auto 0", fontWeight: 400 }}>
          Four questions, then you get your own member card with your name on it.
        </p>
      </Reveal>

      <Reveal className="panel" style={{ maxWidth: 800, margin: "0 auto" }}>
        {step <= QUIZ.length + 1 && (
          <div className="dots" aria-hidden="true">
            {[...Array(QUIZ.length + 2)].map((_, i) => (
              <span key={i} className={`dot ${i === step ? "on" : ""} ${i < step ? "done" : ""}`} />
            ))}
          </div>
        )}

        {step < QUIZ.length && (
          <div>
            <p className="eyebrow" style={{ textAlign: "center", marginBottom: 14 }}>
              Question {step + 1} of {QUIZ.length}
            </p>
            <h3 className="d" style={{
              fontSize: "clamp(26px,4vw,44px)", lineHeight: 1.04, textAlign: "center",
              maxWidth: "17ch", margin: "0 auto 30px",
            }}>
              {QUIZ[step].q}
            </h3>
            <div className="qz-g">
              {QUIZ[step].a.map((o) => (
                <button key={o.t} className="qz-o" onClick={() => answer(o.k)}>{o.t}</button>
              ))}
            </div>
          </div>
        )}

        {step === QUIZ.length && result && (
          <div style={{ textAlign: "center" }}>
            <p className="eyebrow" style={{ marginBottom: 10 }}>You are</p>
            <h3 className="d" style={{ fontSize: "clamp(38px,7vw,72px)", color: result.ink, marginBottom: 10 }}>{result.name}</h3>
            <p style={{ color: "var(--ink60)", maxWidth: "40ch", margin: "0 auto 6px", fontSize: 17.5 }}>{result.line}</p>
            <p style={{ color: "var(--ink60)", maxWidth: "44ch", margin: "0 auto 26px", fontSize: 16.5, fontStyle: "italic" }}>{result.power}</p>

            <label className="eyebrow" htmlFor="kn" style={{ display: "block", marginBottom: 12 }}>What's your first name?</label>
            <input
              id="kn" className="n-in" value={name} maxLength={18} placeholder="Type it here" autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") makeCard(); }}
            />
            {error && <p style={{ color: "var(--straw)", fontSize: 15, marginTop: 10, fontWeight: 600 }}>{error}</p>}

            <div style={{ marginTop: 22, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn b-straw btn-lg" onClick={makeCard}>Make my card →</button>
              <button className="btn b-ghost" onClick={reset}>Start again</button>
            </div>
            <p style={{ fontSize: 13.5, color: "var(--ink40)", margin: "16px auto 0", maxWidth: "42ch" }}>
              First name only — it stays in your browser and is never sent anywhere.
            </p>
          </div>
        )}

        {step === QUIZ.length + 1 && result && (
          <div>
            <div className="mcard">
              <div className="mc-t" style={{ background: result.ink }}>
                <div>
                  <div className="eyebrow" style={{ color: "rgba(255,255,255,.75)" }}>Official</div>
                  <div className="d" style={{ fontSize: 25, marginTop: 2 }}>Snack Squad</div>
                </div>
                <span style={{ width: 34, height: 34, display: "block" }} aria-hidden="true">{I.star("#fff")}</span>
              </div>
              <div className="mc-b">
                <div className="mc-f"><Img src={drive(result.img, 400)} alt={result.name} fb={result.name} /></div>
                <div style={{ minWidth: 0 }}>
                  <div className="eyebrow" style={{ marginBottom: 3 }}>Member</div>
                  <div className="d" style={{ fontSize: "clamp(28px,5.5vw,40px)", wordBreak: "break-word", lineHeight: 1 }}>{name}</div>
                  <div style={{ fontSize: 15.5, color: "var(--ink60)", marginTop: 7 }}>
                    Kitten: <strong style={{ color: result.ink }}>{result.name}</strong>
                  </div>
                  <div style={{ fontSize: 15.5, color: "var(--ink60)" }}>Badge: {result.badge}</div>
                </div>
              </div>
              <div className="mc-s"><span>No. {memberNumber}</span><span>Snackville</span></div>
            </div>

            <div style={{ textAlign: "center", marginTop: 20, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn b-ghost btn-sm" onClick={() => window.print()}>Print my card</button>
              <button className="btn b-ghost btn-sm" onClick={reset}>Do it again</button>
            </div>

            <div className="gu" style={{ marginTop: 32 }}>
              <span className="gu-tag">Grown-ups only</span>
              <h4 className="h3" style={{ marginBottom: 8 }}>Send the free welcome pack</h4>
              <p style={{ fontSize: 16.5, color: "var(--ink60)" }}>
                Six colouring pages, the Snackville map as an A3 poster, a cut-out badge, a maze, and
                read-aloud notes. Free, and yours to print as often as you like.
              </p>
              <div className="m-row">
                <input
                  className="m-in" type="email" inputMode="email" placeholder="Parent or guardian email"
                  value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Parent or guardian email"
                  onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
                />
                <button className="btn b-mint" onClick={submit} disabled={sending}>
                  {sending ? "Sending…" : "Send the pack"}
                </button>
              </div>
              <label className="cons">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>
                  I'm the parent or guardian and I'm happy to receive the welcome pack and occasional
                  news about new Piper books. Unsubscribe any time, one click.
                </span>
              </label>
              {error && <p style={{ color: "var(--straw)", fontSize: 15, marginTop: 12, fontWeight: 600 }}>{error}</p>}
              {!MAILING_ENDPOINT && (
                <p style={{ fontSize: 12.5, color: "var(--ink40)", marginTop: 12, fontStyle: "italic" }}>
                  Setup note: paste your Formspree or ConvertKit endpoint into MAILING_ENDPOINT in
                  src/config.js and this form starts delivering.
                </p>
              )}
            </div>
          </div>
        )}

        {step === QUIZ.length + 2 && (
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div style={{ width: 72, height: 72, margin: "0 auto 18px" }}>{I.star(C.butter)}</div>
            <h3 className="h2" style={{ marginBottom: 14 }}>Welcome to the Squad, {name}</h3>
            <p className="lead" style={{ margin: "0 auto 24px" }}>
              The welcome pack is on its way. Check the inbox — and the spam folder, because Croissant
              Kitty is fast but not always accurate.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <a className="btn b-straw btn-lg" href={AMAZON_URL} target="_blank" rel="noreferrer">Read book one →</a>
              <button className="btn b-ghost" onClick={reset}>Try another kitten</button>
            </div>
          </div>
        )}
      </Reveal>
    </>
  );
}
