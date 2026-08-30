import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AMAZON_URL } from "./config.js";
import { C } from "./styles/tokens.js";
import { SECTIONS } from "./data/sections.js";
import { TREASURES, BADGES, TOTAL_ACTIONS } from "./data/treasures.js";
import { PLACES } from "./data/places.js";
import { GUIDE_MESSAGES } from "./data/guide.js";

import { useChime } from "./hooks/useChime.js";
import { useScrollEngine } from "./hooks/useScrollEngine.js";

import { Nav } from "./components/Nav.jsx";
import { Hero } from "./components/Hero.jsx";
import { Marquee } from "./components/Marquee.jsx";
import { Story } from "./components/Story.jsx";
import { Cast } from "./components/Cast.jsx";
import { CastDrawer } from "./components/CastDrawer.jsx";
import { Join } from "./components/Join.jsx";
import { MapHub } from "./components/MapHub.jsx";
import { Books } from "./components/Books.jsx";
import { Inside } from "./components/Inside.jsx";
import { Free } from "./components/Free.jsx";
import { GrownUps } from "./components/GrownUps.jsx";
import { Quote } from "./components/Quote.jsx";
import { Footer } from "./components/Footer.jsx";
import { Treasure } from "./components/Treasure.jsx";
import { Divider } from "./components/Divider.jsx";
import { Land } from "./components/Landscape.jsx";
import { FxLayers } from "./components/FxLayers.jsx";
import { ExplorerRing } from "./components/ExplorerRing.jsx";
import { PiperGuide } from "./components/PiperGuide.jsx";
import { Toast } from "./components/Toast.jsx";
import { BadgeCelebration } from "./components/BadgeCelebration.jsx";
import { UniverseHome } from "./components/UniverseHome.jsx";

/**
 * One entry per map location `wow` key (see data/places.js): the pitch
 * and duration of its chime, whether it shakes the screen ("hard" like
 * the volcano, "soft" like a gentler wobble, or none), what particles
 * fall/rise, and the toast + guide-bubble copy that goes with it. Every
 * location shares the exact same trigger mechanics as the original
 * Chocolate Dragon sneeze — only the numbers and particle `kind` differ
 * — so the map stays varied without any per-effect bespoke code.
 */
const WOW_FX = {
  chocolate: {
    shake: "hard", pitch: 170, dur: 0.36, particles: { kind: "chocolate", count: 12 },
    toastTitle: "Bless you!", toastBody: "The Chocolate Dragon sneezed. That happens a lot.",
    guide: "He does that. He's not cross — he's just dusty.",
  },
  berry: {
    shake: "soft", pitch: 520, dur: 0.22, particles: { kind: "berry", count: 14 },
    toastTitle: "Berry shower!", toastBody: "The berry bush let go of everything it was holding.",
    guide: "Piper says that happens when you tickle the roots.",
  },
  donut: {
    shake: "soft", pitch: 300, dur: 0.24, particles: { kind: "donut", count: 10 },
    toastTitle: "Donut rain!", toastBody: "The whole tree let go at once. Breakfast, sorted.",
    guide: "Croissant Kitty is already down there catching them.",
  },
  jellybean: {
    shake: "soft", pitch: 460, dur: 0.2, particles: { kind: "jellybean", count: 16 },
    toastTitle: "Jellybeans everywhere!", toastBody: "The barrel rolled a little too far downhill.",
    guide: "Blue ones bounce highest, according to Piper.",
  },
  frost: {
    shake: null, pitch: 900, dur: 0.3, particles: { kind: "frost", count: 14 },
    toastTitle: "The caves echo back!", toastBody: "Something sparkly answered from deep inside.",
    guide: "Toast Kitty thinks it's the door he's been looking for.",
  },
  candy: {
    shake: null, pitch: 640, dur: 0.3, confettiBurst: 40,
    toastTitle: "Piñata!", toastBody: "Candy Path Square just got a lot more colourful.",
    guide: "Somebody's going to be sweeping confetti for a week.",
  },
};

/**
 * The root component. Owns every piece of cross-section state:
 *   - `active`       which section is currently in view (drives the nav)
 *   - `doneKeys`     every treasure/place/book/quiz/nightfall/activity
 *                    action completed so far (drives the Explorer ring
 *                    + badges)
 *   - `castIndex`    which character's drawer is open, if any
 *   - the FX state arrays (sparks, wowFx, confetti, flash) and the
 *     toast/celebration/guide-message singletons
 *
 * Scroll-driven visuals (parallax, sky, sun/moon, day/night) do NOT
 * live here as state — see hooks/useScrollEngine.js for why, and for
 * the measured performance difference that decision makes.
 */
function SnackvilleExperience({ onBackHome }) {
  const [active, setActive] = useState("story");
  const [castIndex, setCastIndex] = useState(null);
  const [doneKeys, setDoneKeys] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("piper:v1:explorer") || "[]");
      return new Set(Array.isArray(saved) ? saved : []);
    } catch (_error) {
      return new Set();
    }
  });
  const [sparks, setSparks] = useState([]);
  const [wowFx, setWowFx] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [toast, setToast] = useState(null);
  const [shakeKind, setShakeKind] = useState(null);
  const [flash, setFlash] = useState(false);
  const [celebration, setCelebration] = useState(null);
  const [guideVisible, setGuideVisible] = useState(true);
  const [guideMessage, setGuideMessage] = useState(null);

  const chime = useChime();
  const keyBuffer = useRef("");
  const reduceMotion = useRef(false);

  // refs the scroll engine writes to directly, bypassing React state
  const rootRef = useRef(null);
  const landRefs = useRef([]);
  const skyRefs = {
    dawn: useRef(null), day: useRef(null), dusk: useRef(null), night: useRef(null), stars: useRef(null),
  };
  const sunmoonRef = useRef(null);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("piper:v1:explorer", JSON.stringify([...doneKeys]));
    } catch (_error) {
      // Explorer progress is an optional enhancement; the site still works
      // when private browsing or browser policy blocks local storage.
    }
  }, [doneKeys]);

  useScrollEngine({
    landRefs,
    skyRefs,
    sunmoonRef,
    rootRef,
    reduceMotion,
    onNightfall: () => mark("night"),
  });

  // scroll-spy: which section is currently in view, for the nav highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.15, rootMargin: "-18% 0px -55% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const closeDrawer = useCallback(() => setCastIndex(null), []);

  // cursor sparkle trail — desktop + reduced-motion-aware only
  useEffect(() => {
    if (reduceMotion.current) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let lastFired = 0;
    const onMove = (e) => {
      const now = Date.now();
      if (now - lastFired < 58) return;
      lastFired = now;
      const id = `m${now}-${Math.random()}`;
      setSparks((prev) => [...prev.slice(-12), {
        id, x: e.clientX + (Math.random() * 16 - 8), y: e.clientY + (Math.random() * 16 - 8),
        size: 8 + Math.random() * 10, c: [C.strawberry, C.butter, C.mint, C.grape][Math.floor(Math.random() * 4)],
      }]);
      setTimeout(() => setSparks((prev) => prev.filter((s) => s.id !== id)), 880);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const showToast = useCallback((title, body) => {
    setToast({ title, body, id: Date.now() });
    setTimeout(() => setToast(null), 4200);
  }, []);

  const burst = useCallback((count = 32) => {
    if (reduceMotion.current) return;
    const kinds = ["berry", "star", "croix", "donut", "bean"];
    const bits = Array.from({ length: count }, (_, i) => ({
      id: `c${Date.now()}-${i}-${Math.random()}`, left: Math.random() * 100,
      dur: 2.4 + Math.random() * 2.2, delay: Math.random() * 0.6,
      size: 16 + Math.random() * 20, kind: kinds[Math.floor(Math.random() * kinds.length)],
    }));
    setConfetti((prev) => [...prev, ...bits]);
    setTimeout(() => setConfetti([]), 5400);
  }, []);

  /** Marks one action complete (a treasure id, "place-<id>", "book-<id>",
   *  "quiz", or "night"). Idempotent — marking the same key twice is a
   *  no-op — and fires the badge celebration automatically when a tier
   *  threshold is crossed. */
  const mark = useCallback((key) => {
    setDoneKeys((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      const badge = BADGES.find((b) => b.at === next.size);
      if (badge) {
        setTimeout(() => { setCelebration(badge); chime(1046, 0.4); burst(44); }, 450);
      }
      return next;
    });
  }, [chime, burst]);

  // Easter egg: typing P-I-P-E-R anywhere triggers a strawberry rain
  useEffect(() => {
    const onKey = (e) => {
      if (!/^[a-zA-Z]$/.test(e.key)) return;
      keyBuffer.current = (keyBuffer.current + e.key.toUpperCase()).slice(-5);
      if (keyBuffer.current === "PIPER") {
        keyBuffer.current = "";
        chime(880, 0.22);
        burst(46);
        showToast("The magic word!", "Strawberries everywhere. Piper says thank you.");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chime, burst, showToast]);

  const onWow = useCallback((place) => {
    const fx = WOW_FX[place.wow];
    if (!fx) return;

    chime(fx.pitch, fx.dur);
    if (fx.shake) {
      setShakeKind(fx.shake);
      setTimeout(() => setShakeKind(null), 660);
    }
    if (!reduceMotion.current) {
      if (fx.particles) {
        const items = Array.from({ length: fx.particles.count }, (_, i) => ({
          id: `w${Date.now()}-${i}`, kind: fx.particles.kind,
          left: Math.random() * 100, dist: 70 + Math.random() * 200, delay: Math.random() * 0.3,
        }));
        setWowFx(items);
        setTimeout(() => setWowFx([]), 2400);
      }
      if (fx.confettiBurst) {
        setFlash(true);
        setTimeout(() => setFlash(false), 320);
        burst(fx.confettiBurst);
      }
    }
    showToast(fx.toastTitle, fx.toastBody);
    setGuideMessage(fx.guide);
  }, [chime, showToast, burst]);

  const onFindTreasure = useCallback((id, x, y) => {
    if (doneKeys.has(id)) return;
    chime(560 + doneKeys.size * 60, 0.18);
    const treasure = TREASURES.find((t) => t.id === id);
    const bits = Array.from({ length: 14 }, (_, i) => ({
      id: `s${Date.now()}-${i}-${Math.random()}`, x, y, size: 9 + Math.random() * 9,
      c: [C.strawberry, C.butter, C.mint, C.grape][i % 4],
    }));
    setSparks((prev) => [...prev, ...bits]);
    setTimeout(() => setSparks((prev) => prev.filter((p) => !bits.find((b) => b.id === p.id))), 900);
    showToast(`Found: ${treasure.label}`, treasure.found);
    mark(id);
  }, [doneKeys, chime, showToast, mark]);

  // Piper's guide bubble auto-updates its message as the visitor scrolls
  // between sections, and fades out after ~6.5s.
  useEffect(() => {
    if (!guideVisible) return;
    setGuideMessage(GUIDE_MESSAGES[active] || null);
    const t = setTimeout(() => setGuideMessage(null), 6500);
    return () => clearTimeout(t);
  }, [active, guideVisible]);

  const doneCount = doneKeys.size;
  const tier = BADGES.filter((b) => doneCount >= b.at).slice(-1)[0];
  const visitedPlaceIds = useMemo(
    () => new Set(PLACES.filter((p) => doneKeys.has(`place-${p.id}`)).map((p) => p.id)),
    [doneKeys]
  );

  const stars = useMemo(() => Array.from({ length: 80 }, (_, i) => ({
    id: i, l: Math.random() * 100, t: Math.random() * 70, s: Math.random() * 2.6 + 0.8, d: Math.random() * 4,
  })), []);

  return (
    <div ref={rootRef} className={shakeKind === "hard" ? "shaker" : shakeKind === "soft" ? "wobble" : ""} data-night="0">
      <a className="skip-link" href="#story">Skip to the story</a>
      {/* ═══ SKY — opacity written directly via ref in the scroll rAF loop,
          never through React state, so scrolling never re-renders the tree.
          See hooks/useScrollEngine.js. ═══ */}
      <div className="sky" aria-hidden="true">
        <div ref={skyRefs.dawn} className="sky-l sky-dawn" style={{ opacity: 1 }} />
        <div ref={skyRefs.day} className="sky-l sky-day" style={{ opacity: 0 }} />
        <div ref={skyRefs.dusk} className="sky-l sky-dusk" style={{ opacity: 0 }} />
        <div ref={skyRefs.night} className="sky-l sky-night" style={{ opacity: 0 }} />
      </div>
      <div ref={skyRefs.stars} className="stars" style={{ opacity: 0 }} aria-hidden="true">
        {stars.map((s) => (
          <i key={s.id} style={{ left: `${s.l}%`, top: `${s.t}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />
        ))}
      </div>
      <div
        ref={sunmoonRef}
        className="sunmoon"
        aria-hidden="true"
        style={{ top: "12vh", background: "radial-gradient(circle at 38% 34%, #FFF3B0, #FFD447)", boxShadow: "0 0 80px rgba(255,200,60,.65)" }}
      />

      {/* ═══ LANDSCAPE ═══ */}
      {[Land.clouds, Land.sugar, Land.mountain, Land.town, Land.grass].map((layer, i) => (
        <div
          key={i}
          className={`land land-${i}`}
          ref={(el) => { landRefs.current[i] = el; }}
          style={i === 0 ? { top: "7vh", bottom: "auto", opacity: 0.85 } : { bottom: 0, top: "auto", opacity: 1 }}
        >
          {layer}
        </div>
      ))}

      <div className="site-shell">
      <Nav active={active} onNavigate={setActive} onHome={onBackHome} />

      <div className="page">
        <Hero found={doneKeys} onFind={onFindTreasure} />

        <Divider shape="cloud" fill="var(--plum)" />
        <Marquee />
        <Divider shape="wave" fill="var(--plum)" flip />

        <Story found={doneKeys} onFind={onFindTreasure} />
        <Cast found={doneKeys} onFind={onFindTreasure} onOpenCharacter={setCastIndex} chime={chime} />

        <Divider shape="hill" fill="rgba(232,222,255,.93)" />
        <section className="sec" id="join" style={{ background: "rgba(232,222,255,.93)" }}>
          <div className="wrap">
            <Join chime={chime} burst={burst} mark={mark} />
          </div>
        </section>
        <Divider shape="hill" fill="rgba(232,222,255,.93)" flip />

        <section className="sec wrap" id="map">
          <Treasure id="scale" found={doneKeys.has("scale")} onFind={onFindTreasure} style={{ bottom: 12, right: "calc(var(--pad) + 6px)" }} />
          <MapHub visitedPlaceIds={visitedPlaceIds} mark={mark} onWow={onWow} chime={chime} />
        </section>

        <section className="sec wrap" id="books">
          <Treasure id="bean" found={doneKeys.has("bean")} onFind={onFindTreasure} style={{ top: 30, right: "calc(var(--pad) + 30px)" }} />
          <Books mark={mark} chime={chime} />
        </section>

        <section className="sec" id="inside">
          <div className="wrap">
            <Treasure id="donut" found={doneKeys.has("donut")} onFind={onFindTreasure} style={{ top: 18, left: "calc(var(--pad) + 260px)" }} />
          </div>
          <Inside />
        </section>

        <Divider shape="wave" fill="rgba(214,248,231,.95)" />
        <section className="sec" id="free" style={{ background: "rgba(214,248,231,.95)" }}>
          <div className="wrap"><Free mark={mark} burst={burst} chime={chime} showToast={showToast} /></div>
        </section>
        <Divider shape="drip" fill="rgba(214,248,231,.95)" flip />

        <section className="sec wrap" id="parents">
          <div className="panel"><GrownUps chime={chime} burst={burst} /></div>
        </section>

        <Quote />
      </div>

      <Footer />

      <CastDrawer index={castIndex} onClose={closeDrawer} onNavigate={setCastIndex} />

      <FxLayers sparks={sparks} wowFx={wowFx} confetti={confetti} flash={flash} />

      {!celebration && (
        <ExplorerRing
          count={doneCount}
          tier={tier}
          onExplain={() => showToast(
            tier ? `${tier.name} — ${doneCount}/${TOTAL_ACTIONS}` : `Explorer — ${doneCount}/${TOTAL_ACTIONS}`,
            "Find hidden things, visit every place on the map, explore the books, and stay until nightfall."
          )}
        />
      )}

      {guideVisible && (
        <PiperGuide
          message={guideMessage}
          onTap={() => { setGuideMessage(GUIDE_MESSAGES[active] || "Have a look round. Take your time."); chime(720, 0.12); }}
          onDismiss={() => setGuideVisible(false)}
        />
      )}

      <Toast toast={toast} />

      <BadgeCelebration
        badge={celebration}
        onClose={() => setCelebration(null)}
        onJoin={() => {
          setCelebration(null);
          setTimeout(() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" }), 150);
        }}
      />
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState(() => (
    window.location.hash === "#snackville" ? "snackville" : "home"
  ));

  useEffect(() => {
    const syncView = () => setView(window.location.hash === "#snackville" ? "snackville" : "home");
    window.addEventListener("hashchange", syncView);
    return () => window.removeEventListener("hashchange", syncView);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);

  const openSnackville = useCallback(() => {
    window.location.hash = "snackville";
  }, []);

  const openHome = useCallback(() => {
    window.history.pushState(null, "", `${window.location.pathname}${window.location.search}`);
    setView("home");
  }, []);

  return view === "snackville"
    ? <SnackvilleExperience onBackHome={openHome} />
    : <UniverseHome onEnterSnackville={openSnackville} />;
}
