import { AMAZON_URL } from "../config.js";

// Scrolls to a section already on the current page, the same way Nav.jsx's
// own links do — a plain <a href="#id"> would work too, but it also
// changes window.location.hash, which App.jsx's router reads to decide
// which top-level experience is mounted; an unrecognized hash like "#map"
// used to bounce the visitor back to the universe home mid-scroll.
const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/**
 * The site footer: brand mark, three link columns, and a colophon line
 * with copyright, credits, and the Amazon ASIN.
 */
export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-g">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
              <span className="footer-monogram" aria-hidden="true">WS</span>
              <span className="footer-brand">Piper's Snackville</span>
            </div>
            <p style={{ opacity: 0.62, fontSize: 15.5, maxWidth: "34ch" }}>
              A picture book series set in Snackville, published by Wallace-Siedlarz Books from
              Edinburgh and Katowice.
            </p>
          </div>

          <div>
            <h4>The books</h4>
            <a href={AMAZON_URL} target="_blank" rel="noreferrer">Book one — Amazon UK</a>
            <button onClick={() => scrollToSection("books")}>Explore the collection</button>
            <button onClick={() => scrollToSection("inside")}>Look inside</button>
          </div>

          <div>
            <h4>Snackville</h4>
            <button onClick={() => scrollToSection("join")}>Join the Snack Squad</button>
            <button onClick={() => scrollToSection("free")}>Free printables</button>
            <button onClick={() => scrollToSection("map")}>The map</button>
          </div>
        </div>

        <div className="colo">
          <span>© {new Date().getFullYear()} Wallace-Siedlarz Books</span>
          <span>Written by James Wallace-Smith · Illustrated by Kamil Siedlarz</span>
          <span>ASIN B0H45N194K</span>
        </div>
      </div>
    </footer>
  );
}
