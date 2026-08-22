import { AMAZON_URL } from "../config.js";
import { I } from "./Icons.jsx";

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
              <span className="footer-brand">Wallace–Siedlarz Books</span>
            </div>
            <p style={{ opacity: 0.62, fontSize: 15.5, maxWidth: "34ch" }}>
              A picture book series set in Snackville, published by Wallace-Siedlarz Books from
              Edinburgh and Katowice.
            </p>
          </div>

          <div>
            <h4>The books</h4>
            <a href={AMAZON_URL} target="_blank" rel="noreferrer">Book one — Amazon UK</a>
            <a href="#books">Book two — coming soon</a>
            <a href="#inside">Look inside</a>
          </div>

          <div>
            <h4>Snackville</h4>
            <a href="#join">Join the Snack Squad</a>
            <a href="#free">Free printables</a>
            <a href="#map">The map</a>
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
