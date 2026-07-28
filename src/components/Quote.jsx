import { Reveal } from "./Reveal.jsx";

/**
 * The single-line quote section between the grown-ups panel and the
 * final CTA — the emotional peak line from Book 2, used the same way
 * a film trailer closes on its best line.
 */
export function Quote() {
  return (
    <section className="sec wrap">
      <Reveal style={{ textAlign: "center" }}>
        <p className="d on-sky" style={{ fontSize: "clamp(28px,5vw,58px)", lineHeight: 1.06, maxWidth: "18ch", margin: "0 auto" }}>
          “You don't have to be on your own,” said Piper.
        </p>
        <p className="eyebrow on-sky-s" style={{ marginTop: 22, opacity: 0.75 }}>
          Piper and the Chocolate Volcano — page 26
        </p>
      </Reveal>
    </section>
  );
}
