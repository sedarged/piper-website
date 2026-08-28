import { useEffect, useRef, useState } from "react";
import { BOOKS } from "../data/books.js";
import { CHARACTER_ART, WORLD_ART } from "../generated-assets/artwork.js";
import { SpriteArt } from "./SpriteArt.jsx";

const NAV_ITEMS = [
  { id: "worlds", label: "Worlds" },
  { id: "books-home", label: "Books" },
  { id: "studio", label: "Studio" },
  { id: "grownups-home", label: "Grown-Ups" },
];

function WorldCard({ type, title, description, status, onClick, art }) {
  const active = type === "available";
  return (
    <article className={`world-card world-card--${type}`}>
      <button
        className="world-card__button"
        onClick={active ? onClick : undefined}
        aria-label={active ? `Enter ${title}` : `${title} — coming soon`}
        disabled={!active}
      >
        <SpriteArt
          art={art}
          alt={`${title}. ${description} ${status}.`}
          style={{ height: "auto", minHeight: 390, backgroundColor: "#0b1a2a" }}
        />
      </button>
    </article>
  );
}

export function UniverseHome({ onEnterSnackville }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signupState, setSignupState] = useState("idle");
  const emailRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const controls = [...menuRef.current.querySelectorAll("button")];
    document.body.style.overflow = "hidden";
    controls[0]?.focus();
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === "Tab" && controls.length) {
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const submit = (event) => {
    event.preventDefault();
    const value = emailRef.current?.value.trim() || "";
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setSignupState("error");
      emailRef.current?.focus();
      return;
    }
    setSignupState("ready");
  };

  return (
    <div className="universe-home">
      <a className="skip-link" href="#worlds">Skip to the worlds</a>

      <header className="universe-nav">
        <button className="universe-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Wallace-Siedlarz Productions — home">
          <strong>Wallace-Siedlarz</strong>
          <span>Productions</span>
        </button>
        <nav className="universe-nav__links" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => <button key={item.id} onClick={() => go(item.id)}>{item.label}</button>)}
        </nav>
        <button ref={menuButtonRef} className="universe-menu" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
          <span /><span />
        </button>
      </header>

      {menuOpen && (
        <div ref={menuRef} className="universe-mobile-nav" role="dialog" aria-modal="true" aria-label="Piper worlds navigation">
          {NAV_ITEMS.map((item) => <button key={item.id} onClick={() => go(item.id)}>{item.label}</button>)}
        </div>
      )}

      <main>
        <section className="universe-hero" aria-labelledby="universe-title">
          <div className="universe-hero__copy">
            <p className="universe-kicker">The Piper Storyworld</p>
            <h1 id="universe-title">Choose a world <em>to step into.</em></h1>
            <p className="universe-lede">Timeless illustrated adventures, each opening a new world shaped by imagination, friendship and a little bit of magic.</p>
            <button className="universe-primary" onClick={onEnterSnackville}>Enter Snackville <span aria-hidden="true">→</span></button>
            <p className="universe-note">Piper and the Snack Squad are waiting for you.</p>
          </div>

          <button className="universe-portal" onClick={onEnterSnackville} aria-label="Enter the world of Snackville">
            <span className="universe-portal__halo" aria-hidden="true" />
            <SpriteArt
              art={CHARACTER_ART.squad}
              className="universe-portal__art"
              alt="Piper, Croissant Kitty, Toast Kitty and Sandwich Kitty together in Snackville"
              style={{ width: "76%", height: "86%", left: "15%", top: "6%", borderRadius: "48%", backgroundColor: "#f4e6c8" }}
            />
            <span className="universe-portal__ring" aria-hidden="true" />
          </button>
        </section>

        <section className="worlds-section" id="worlds" aria-labelledby="worlds-title">
          <div className="ornament-heading"><span /><h2 id="worlds-title">Explore more worlds</h2><span /></div>
          <p className="worlds-intro">Every Piper adventure reveals another corner of a much larger storyworld.</p>
          <div className="world-grid">
            <WorldCard
              type="available"
              title="Snackville"
              description="A berry-sweet town where courage is as tasty as friendship."
              status="Available now"
              onClick={onEnterSnackville}
              art={WORLD_ART.island}
            />
            <WorldCard
              type="locked"
              title="Pie-Rats Underground Village"
              description="The hidden Pie-Rat world beneath Snackville."
              status="World two"
              art={WORLD_ART.pieRats}
            />
            <WorldCard
              type="locked"
              title="The Enchanted Sandwich Kingdom"
              description="A golden road through the clouds leads to a layered realm of royal magic."
              status="World three"
              art={WORLD_ART.sandwichKingdom}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14, marginTop: 18 }} aria-label="More storyworld previews">
            {[
              [WORLD_ART.snackville, "Snackville at golden hour"],
              [WORLD_ART.sandwichAdventure, "The Snack Squad approaching the Sandwich Kingdom"],
              [WORLD_ART.iceCreamRobots, "The Ice Cream Robot world"],
            ].map(([art, alt]) => (
              <div key={alt} style={{ overflow: "hidden", border: "1px solid rgba(231,183,88,.42)", borderRadius: 10, background: "#071426", minHeight: 190 }}>
                <SpriteArt art={art} alt={alt} style={{ height: "auto", minHeight: 190 }} />
              </div>
            ))}
          </div>
          <div className="world-pagination" aria-hidden="true"><i className="on" /><i /><i /></div>
        </section>

        <section className="universe-paper" id="books-home">
          <div className="book-invitation" id="studio">
            <div className="book-invitation__cover">
              <img src="/images/books/custard-alien-invasion.webp" alt="Piper and the Custard Alien Invasion book cover" />
            </div>
            <div>
              <p className="universe-kicker">Step deeper into Snackville</p>
              <h2>Stories made to be opened again and again.</h2>
              <p>Piper is a small kitten with a big heart and an even bigger imagination. Follow the Snack Squad through every beautifully illustrated adventure.</p>
              <button className="universe-primary universe-primary--small" onClick={onEnterSnackville}>Explore Piper books <span aria-hidden="true">→</span></button>
              <small>Beautifully illustrated picture books for ages 3–7.</small>
            </div>
          </div>

          <div className="story-list" id="grownups-home">
            <div>
              <p className="universe-kicker">For families and collectors</p>
              <h2>Stories for the young and the young at heart.</h2>
              <p>Behind-the-scenes notes, early peeks and studio updates — sent with care, never clutter.</p>
              <form onSubmit={submit} noValidate>
                <label className="sr-only" htmlFor="universe-email">Email address</label>
                <input ref={emailRef} id="universe-email" type="email" placeholder="Enter your email address" aria-invalid={signupState === "error"} />
                <button type="submit">Join the list</button>
              </form>
              {signupState === "error" && <p className="form-message form-message--error">Please enter a valid email address.</p>}
              {signupState === "ready" && <p className="form-message">The list opens soon — your address has not been sent anywhere yet.</p>}
              <small>No spam. Ever. Unsubscribe anytime.</small>
            </div>
            <div className="story-list__character" style={{ minHeight: 260, overflow: "hidden", borderRadius: 12 }}>
              <SpriteArt art={CHARACTER_ART.toastReading} alt="Toast Kitty reading a book" style={{ height: 260 }} />
            </div>
          </div>

          <div className="universe-library" aria-labelledby="universe-library-title">
            <div className="universe-library__heading">
              <p className="universe-kicker">The complete Piper collection</p>
              <h2 id="universe-library-title">Six books. Six doors into the storyworld.</h2>
              <p>Discover every adventure released or currently being created by Wallace-Siedlarz Productions.</p>
            </div>
            <div className="universe-library__shelf">
              {BOOKS.map((book) => (
                <button key={book.id} className="universe-library__book" onClick={onEnterSnackville} aria-label={`Explore ${book.title}`}>
                  <img src={book.img} alt={`${book.title} cover`} />
                  <span>{book.num}</span>
                  <strong>{book.title.replace("Piper and the ", "")}</strong>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="universe-footer">
        <div className="universe-footer__brand"><span>WS</span><strong>Wallace-Siedlarz Productions</strong><small>Stories that open worlds.</small></div>
        <nav aria-label="Footer navigation">
          <button onClick={() => go("books-home")}>Books</button>
          <button onClick={() => go("worlds")}>Worlds</button>
          <button onClick={() => go("studio")}>Studio</button>
          <button onClick={() => go("grownups-home")}>Grown-Ups</button>
        </nav>
        <p>© {new Date().getFullYear()} Wallace-Siedlarz Productions</p>
      </footer>
    </div>
  );
}
