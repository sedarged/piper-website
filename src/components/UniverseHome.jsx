import { useCallback, useRef, useState } from "react";
import { BOOKS } from "../data/books.js";
import { useDialogTrap } from "../hooks/useDialogTrap.js";
import { ParentEmailForm } from "./ParentEmailForm.jsx";

const NAV_ITEMS = [
  { id: "worlds", label: "Worlds" },
  { id: "books-home", label: "Books" },
  { id: "studio", label: "Studio" },
  { id: "parents-home", label: "For Parents" },
];

const PARENT_FACTS = [
  ["Ages", "3–7"],
  ["Format", "Illustrated picture books"],
  ["Series", "The Piper Storyworld — a growing collection"],
  ["Publisher", "Wallace-Siedlarz Productions"],
];

function ReferenceCrop({ crop, className = "", alt = "" }) {
  return (
    <span className={`universe-crop ${className}`} style={{ "--crop-x": crop.x, "--crop-y": crop.y, "--crop-w": crop.w, "--crop-h": crop.h }}>
      <img src="/images/worlds-homepage-reference.webp" alt={alt} />
    </span>
  );
}

function WorldCard({ type, title, description, status, onClick, coverSrc }) {
  const active = type === "available";
  return (
    <article className={`world-card world-card--${type}`}>
      <button
        className="world-card__button"
        onClick={active ? onClick : undefined}
        aria-label={active ? `Enter ${title}` : `${title} — coming soon`}
        disabled={!active}
      >
        <span className="world-card-cover">
          <img src={coverSrc} alt={`${title}. ${description} ${status}.`} />
        </span>
      </button>
    </article>
  );
}

export function UniverseHome({ onEnterSnackville, onEnterSandwich, onEnterCrumbhollow }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [parentSignupSent, setParentSignupSent] = useState(false);
  const menuRef = useRef(null);

  // Stable identity: useDialogTrap's effect depends on this callback, and
  // an inline arrow recreated every render would re-arm the focus trap
  // (re-focusing the menu's first link) on every unrelated re-render
  // while the menu is open.
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useDialogTrap(menuRef, closeMenu, menuOpen);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
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
        <button className="universe-menu" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
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
            <ReferenceCrop crop={{ x: 278, y: 88, w: 648, h: 612 }} className="universe-portal__art" alt="Piper and the Snack Squad entering Snackville" />
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
              coverSrc="/images/worlds/snackville-cover.webp"
            />
            <WorldCard
              type="available"
              title="Crumbhollow"
              description="The hidden Pie-Rat village beneath Snackville."
              status="Available now"
              onClick={onEnterCrumbhollow}
              coverSrc="/images/worlds/crumbhollow-cover.webp"
            />
            <WorldCard
              type="available"
              title="Sandwich Kingdom"
              description="A floating sandwich-castle world above the clouds."
              status="Available now"
              onClick={onEnterSandwich}
              coverSrc="/images/worlds/sandwich-cover.webp"
            />
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

          <div className="story-list universe-parents" id="parents-home">
            <div>
              <span className="universe-parents__tag">For parents &amp; guardians</span>
              <h2>Stories for the young and the young at heart.</h2>
              <p>Every Piper book is written to be read aloud, re-read and handed down. Here's what families ask us most, in one place — not scattered across a checkout page.</p>

              <div className="universe-parents__facts">
                {PARENT_FACTS.map(([k, v]) => (
                  <div key={k}><span>{k}</span><strong>{v}</strong></div>
                ))}
              </div>

              <p className="universe-parents__privacy">
                This site collects no information from children. The signup below is for parents and guardians only — every list is opt-in, with a one-click unsubscribe.
              </p>

              <div className="universe-parents__signup">
                <p className="universe-kicker">Behind-the-scenes notes, early peeks and studio updates</p>
                {parentSignupSent ? (
                  <p className="form-message">Thanks — the list opens soon, and we'll be in touch.</p>
                ) : (
                  <ParentEmailForm payloadExtra={{ source: "universe-home" }} ctaLabel="Join the list" onSuccess={() => setParentSignupSent(true)} />
                )}
              </div>
            </div>
            <ReferenceCrop crop={{ x: 724, y: 1380, w: 186, h: 218 }} className="story-list__character" alt="Toast Kitty reading a book" />
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
          <button onClick={() => go("parents-home")}>For Parents</button>
        </nav>
        <p>© {new Date().getFullYear()} Wallace-Siedlarz Productions</p>
      </footer>
    </div>
  );
}
