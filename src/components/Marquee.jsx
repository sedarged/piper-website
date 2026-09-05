const WORDS = ["Snackville", "Strawberry magic", "The Snack Squad", "Biscuit roofs", "Donut trees", "Chocolate Volcano"];

/**
 * The infinite scrolling marquee band between the hero and the story
 * section. Renders the word list twice back-to-back so the CSS
 * `translateX(-50%)` loop animation (see .marq-t in components.css)
 * has no visible seam.
 */
export function Marquee() {
  const doubled = [...WORDS, ...WORDS];
  return (
    <div className="marq" aria-hidden="true">
      <div className="marq-t">
        {[0, 1].map((k) => (
          <div key={k} style={{ display: "flex" }}>
            {doubled.map((word, i) => (
              <span className="marq-i" key={`${k}-${i}`}>
                {word}<span style={{ opacity: 0.45 }}>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
