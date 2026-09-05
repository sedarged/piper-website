import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AMAZON_URL } from "./config.js";
import { C } from "./styles/tokens.js";
import { SECTIONS } from "./data/sections.js";
import { TREASURES, BADGES, TOTAL_ACTIONS } from "./data/treasures.js";
import { PLACES } from "./data/places.js";
import { GUIDE_MESSAGES } from "./data/guide.js";
import { WOW_FX } from "./data/wow.js";
import { broadcastReaction } from "./lib/reaction.js";

import { useChime } from "./hooks/useChime.js";
import { useReducedMotion } from "./hooks/useReducedMotion.js";
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
import { SoundToggle } from "./components/SoundToggle.jsx";
import { WorldExperience } from "./components/WorldExperience.jsx";
import { SANDWICH_PLACES } from "./data/sandwich.js";
import { CRUMBHOLLOW_PLACES } from "./data/crumbhollow.js";
import { WORLD_FX } from "./data/worldFx.js";
import { CRUMBHOLLOW_CAST, SANDWICH_CAST, SNACKVILLE_LEGENDS } from "./data/worldCharacters.js";
import { WorldCharacters } from "./components/WorldCharacters.jsx";

/**
 * The root component. Owns every piece of cross-section state:
 *   - `active`       which section is currently in view (drives the nav)
 *   - `doneKeys`     every treasure/place/book/quiz/nightfall/activity
 *                    action completed so far (drives the Explorer ring
 *                    + badges)
 *   - `castIndex`    which character's drawer is open, if any
 *   - the FX state arrays (sparks, wowFx, wowRings, wowStreaks, confetti,
 *     flash) and the toast/celebration/guide-message singletons
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
  const [wowRings, setWowRings] = useState([]);
  const [wowStreaks, setWowStreaks] = useState([]);
  const [speedLines, setSpeedLines] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [toast, setToast] = useState(null);
  const [wash, setWash] = useState(null);
  const [celebration, setCelebration] = useState(null);
  const [guideVisible, setGuideVisible] = useState(true);
  const [guideMessage, setGuideMessage] = useState(null);

  const chime = useChime();
  const keyBuffer = useRef("");
  const reduceMotion = useReducedMotion();
  // Held so a second location tapped mid-effect cancels the first one's
  // pending clear instead of cutting its own reaction short.
  const reactionTimer = useRef(null);
  const washTimer = useRef(null);


  // refs the scroll engine writes to directly, bypassing React state
  const rootRef = useRef(null);
  const landRefs = useRef([]);
  const skyRefs = {
    dawn: useRef(null), day: useRef(null), dusk: useRef(null), night: useRef(null), stars: useRef(null),
  };
  const sunmoonRef = useRef(null);

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
    const id = Date.now();
    setToast({ title, body, id });
    // Only clear the toast if it's still the one we scheduled this timer
    // for — otherwise a second showToast() within 4.2s of the first would
    // have its toast prematurely killed by the first call's timer.
    setTimeout(() => setToast((current) => (current?.id === id ? null : current)), 4200);
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
    // Remove only this batch's pieces, not the whole array — otherwise an
    // overlapping second burst() (e.g. a badge celebration landing while
    // the "PIPER" easter egg's confetti is still falling) would have its
    // still-animating pieces wiped out early by the first burst's timer.
    const ids = new Set(bits.map((b) => b.id));
    setTimeout(() => setConfetti((prev) => prev.filter((b) => !ids.has(b.id))), 5400);
  }, []);

  /** Marks one action complete (a treasure id, "place-<id>", "book-<id>",
   *  "quiz", or "night"). Idempotent — marking the same key twice is a
   *  no-op. Badge celebrations are handled by the effect below, not here
   *  — see its comment for why. */
  const mark = useCallback((key) => {
    setDoneKeys((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

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

  /**
   * Plays one map location's signature effect (see data/wow.js).
   *
   * Each of the four channels below is independent, so a location's
   * identity comes from its own combination of them rather than from a
   * shared template: the screen reaction, its particles' trajectory,
   * an optional colour wash, and a synthesised voice.
   */
  const onWow = useCallback((place) => {
    const fx = WOW_FX[place.id];
    if (!fx) return;

    chime(fx.sound);

    if (reactionTimer.current) clearTimeout(reactionTimer.current);
    reactionTimer.current = broadcastReaction(rootRef.current, fx.reaction);

    if (!reduceMotion.current) {
      if (fx.particles) {
        const { kind, count } = fx.particles;
        // Most kinds only need a horizontal start and a travel distance.
        // Four want more than that, because their motion is defined by
        // where they come *from*, not just how far they go:
        //   glint     scatters over the whole screen, not just its width
        //   spark     flies outward on its own radial vector
        //   chocolate is thrown up and sideways by the eruption
        //   frost     grows inward from whichever edge it started on
        // and three walk across the screen in sequence rather than
        // appearing all at once.
        const items = Array.from({ length: count }, (_, i) => {
          const item = {
            id: `w${Date.now()}-${i}-${Math.random()}`, kind,
            left: Math.random() * 100, dist: 70 + Math.random() * 200, delay: Math.random() * 0.3,
          };
          if (kind === "glint") item.top = Math.random() * 70;
          if (kind === "spark") {
            const angle = Math.random() * Math.PI * 2;
            const mag = 80 + Math.random() * 140;
            item.dx = Math.cos(angle) * mag;
            item.dy = Math.sin(angle) * mag;
          }
          if (kind === "chocolate") {
            item.dx = (Math.random() * 2 - 1) * 220;
            item.dist = 180 + Math.random() * 220;
          }
          if (kind === "frost") {
            // Start off one of the four edges and grow toward the middle.
            const fromSide = Math.random() < 0.5;
            item.top = Math.random() * 100;
            item.dx = fromSide ? (Math.random() < 0.5 ? -220 : 220) : (Math.random() * 2 - 1) * 90;
            item.dy = fromSide ? (Math.random() * 2 - 1) * 90 : (Math.random() < 0.5 ? -200 : 200);
            item.delay = Math.random() * 0.6;
          }
          if (kind === "trailstar" || kind === "footprint" || kind === "jellybean") {
            item.left = (i / Math.max(count - 1, 1)) * 88 + 4;
            item.delay = i * 0.12;
          }
          return item;
        });
        // Append + remove-by-id, same reasoning as burst() above: triggering
        // a second wow effect (or the same one twice) before the first
        // batch finishes its animation should let both play out, not have
        // one wipe the other's still-animating particles.
        setWowFx((prev) => [...prev, ...items]);
        const ids = new Set(items.map((it) => it.id));
        setTimeout(() => setWowFx((prev) => prev.filter((it) => !ids.has(it.id))), fx.particles.life || 2400);
      }

      if (fx.rings) {
        const items = Array.from({ length: fx.rings.count }, (_, i) => ({
          id: `r${Date.now()}-${i}`, color: fx.rings.color, delay: i * 0.22,
        }));
        setWowRings((prev) => [...prev, ...items]);
        const ids = new Set(items.map((it) => it.id));
        setTimeout(() => setWowRings((prev) => prev.filter((it) => !ids.has(it.id))), 2000);
      }

      if (fx.streaks) {
        const items = Array.from({ length: fx.streaks.count }, (_, i) => ({
          id: `t${Date.now()}-${i}`, top: 20 + Math.random() * 55, delay: i * 0.12, image: fx.streaks.image,
        }));
        setWowStreaks((prev) => [...prev, ...items]);
        const ids = new Set(items.map((it) => it.id));
        setTimeout(() => setWowStreaks((prev) => prev.filter((it) => !ids.has(it.id))), 1400);
      }

      if (fx.speedLines) {
        const items = Array.from({ length: fx.speedLines.count }, (_, i) => ({
          id: `l${Date.now()}-${i}`, top: 8 + Math.random() * 84,
          delay: Math.random() * 0.16, opacity: 0.35 + Math.random() * 0.5,
        }));
        setSpeedLines((prev) => [...prev, ...items]);
        const ids = new Set(items.map((it) => it.id));
        setTimeout(() => setSpeedLines((prev) => prev.filter((it) => !ids.has(it.id))), 900);
      }

      if (fx.confettiBurst) burst(fx.confettiBurst);
    }

    // The wash is the one channel that still plays under reduced motion:
    // wow.css swaps it for a brief, still opacity fade so the tap is
    // still visibly acknowledged without anything travelling.
    if (fx.wash) {
      setWash(fx.wash.kind);
      if (washTimer.current) clearTimeout(washTimer.current);
      washTimer.current = setTimeout(
        () => setWash((current) => (current === fx.wash.kind ? null : current)),
        fx.wash.life
      );
    }

    showToast(fx.toastTitle, fx.toastBody);
    // The guide bubble normally auto-fades via the scroll/section effect
    // below, but that effect only re-runs when `active`/`guideVisible`
    // change — it won't clear a message set from here while the visitor
    // stays in the same section, so this needs its own fade-out timer.
    setGuideMessage(fx.guide);
    setTimeout(() => setGuideMessage((current) => (current === fx.guide ? null : current)), 6500);
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
  // between sections, and fades out after ~6.5s. Only clears the message
  // this effect itself set — a wow effect (see onWow) can set a newer
  // message from a different call path while this timer is still
  // pending, and an unconditional clear here would wipe that out early.
  useEffect(() => {
    if (!guideVisible) return;
    const message = GUIDE_MESSAGES[active] || null;
    setGuideMessage(message);
    const t = setTimeout(() => setGuideMessage((current) => (current === message ? null : current)), 6500);
    return () => clearTimeout(t);
  }, [active, guideVisible]);

  const doneCount = doneKeys.size;

  /** Fires the badge celebration exactly once per threshold crossing.
   *  This used to live inside mark()'s setDoneKeys updater, but React
   *  (especially under StrictMode, which main.jsx enables) can invoke a
   *  functional state updater more than once per commit to check for
   *  purity — scheduling a real setTimeout/chime/burst from inside one
   *  is an impure side effect, so crossing a threshold in dev could
   *  double-fire the celebration, chime and confetti. `lastCelebratedAtRef`
   *  guards this effect against that same double-invoke.
   *
   *  It also guards against replaying the celebration on mount: a
   *  returning visitor's *persisted* progress can already sit exactly on
   *  a threshold (loaded synchronously into `doneKeys`'s initial state),
   *  and this effect's first run should record that as "already
   *  accounted for" rather than treat it as a fresh crossing — only a
   *  live increase in doneCount during this session should celebrate. */
  const lastCelebratedAtRef = useRef(null);
  useEffect(() => {
    if (lastCelebratedAtRef.current === null) {
      lastCelebratedAtRef.current = doneCount;
      return undefined;
    }
    const badge = BADGES.find((b) => b.at === doneCount);
    if (!badge || lastCelebratedAtRef.current === doneCount) return undefined;
    lastCelebratedAtRef.current = doneCount;
    const t = setTimeout(() => { setCelebration(badge); chime(1046, 0.4); burst(44); }, 450);
    return () => clearTimeout(t);
  }, [doneCount, chime, burst]);

  const tier = BADGES.filter((b) => doneCount >= b.at).slice(-1)[0];
  const visitedPlaceIds = useMemo(
    () => new Set(PLACES.filter((p) => doneKeys.has(`place-${p.id}`)).map((p) => p.id)),
    [doneKeys]
  );

  const stars = useMemo(() => Array.from({ length: 80 }, (_, i) => ({
    id: i, l: Math.random() * 100, t: Math.random() * 70, s: Math.random() * 2.6 + 0.8, d: Math.random() * 4,
  })), []);

  // The map's screen reactions are broadcast from this root as a
  // `data-reaction` attribute written directly by broadcastReaction()
  // above — the root itself must never be transformed, because it
  // contains every `position: fixed` layer on the page (the nav, the
  // sky, the toast, the particle overlay) and a transformed ancestor
  // makes all of them resolve against the full-height root instead of
  // the viewport. Each participating layer picks the attribute up and
  // animates itself — see the RX-TARGETS rule in styles/wow.css.
  return (
    <div ref={rootRef} data-night="0">
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
        <div className="wrap snackville-legends">
          <WorldCharacters feature={SNACKVILLE_LEGENDS} />
        </div>

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

      <FxLayers
        sparks={sparks}
        wowFx={wowFx}
        wowRings={wowRings}
        wowStreaks={wowStreaks}
        speedLines={speedLines}
        confetti={confetti}
        wash={wash}
      />

      <SoundToggle className="sound-toggle--snackville" />

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

const HASH_VIEWS = { "#snackville": "snackville", "#sandwich": "sandwich", "#crumbhollow": "crumbhollow" };

function viewFromHash() {
  return HASH_VIEWS[window.location.hash] || "home";
}

export default function App() {
  const [view, setView] = useState(viewFromHash);

  useEffect(() => {
    // A plain in-page anchor (e.g. the footer's href="#map") changes
    // window.location.hash too, firing this same event — but "#map" isn't
    // a recognized page hash, so naively syncing on every hashchange would
    // swap the mounted view to "home" mid-scroll, unmounting the very
    // section the visitor just clicked toward. Only hashes this router
    // actually owns (a known view, or empty/"home") should ever change
    // `view`; anything else is some other element's in-page anchor and is
    // left alone to scroll natively within whatever's already mounted.
    const syncView = () => {
      const hash = window.location.hash;
      if (hash === "" || HASH_VIEWS[hash]) setView(viewFromHash());
    };
    window.addEventListener("hashchange", syncView);
    return () => window.removeEventListener("hashchange", syncView);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);

  const openSnackville = useCallback(() => { window.location.hash = "snackville"; }, []);
  const openSandwich = useCallback(() => { window.location.hash = "sandwich"; }, []);
  const openCrumbhollow = useCallback(() => { window.location.hash = "crumbhollow"; }, []);

  const openHome = useCallback(() => {
    window.history.pushState(null, "", `${window.location.pathname}${window.location.search}`);
    setView("home");
  }, []);

  if (view === "snackville") return <SnackvilleExperience onBackHome={openHome} />;

  if (view === "sandwich") {
    return (
      <WorldExperience
        worldClass="world-experience--sandwich"
        brandLabel="Wallace-Siedlarz Productions"
        title="Sandwich Kingdom"
        tagline="The floating sandwich-castle world above the clouds."
        coverSrc="/images/worlds/sandwich-cover.webp"
        coverAlt="Sandwich Kingdom cover art — a floating sandwich castle above the clouds"
        mapEyebrow="The official illustrated map"
        mapHeading="Choose your next stop"
        mapLead="Every numbered place holds a piece of the kingdom's story. Select a location to read its field note."
        places={SANDWICH_PLACES}
        mapSrc="/images/sandwich-interactive-map.jpeg"
        mapAlt="Illustrated map of Sandwich Kingdom with fourteen numbered locations"
        mapWidth="1536"
        mapHeight="1024"
        fx={WORLD_FX.sandwich}
        characterFeatures={SANDWICH_CAST}
        onBackHome={openHome}
      />
    );
  }

  if (view === "crumbhollow") {
    return (
      <WorldExperience
        worldClass="world-experience--crumbhollow"
        brandLabel="Wallace-Siedlarz Productions"
        title="Crumbhollow"
        tagline="The hidden Pie-Rat village beneath Snackville."
        coverSrc="/images/worlds/crumbhollow-cover.webp"
        coverAlt="Crumbhollow cover art — the hidden Pie-Rat village beneath Snackville"
        mapEyebrow="The official illustrated map"
        mapHeading="Choose your next stop"
        mapLead="Every numbered place holds a piece of the village's story. Select a location to read its field note."
        places={CRUMBHOLLOW_PLACES}
        mapSrc="/images/crumbhollow-interactive-map.jpeg"
        mapAlt="Illustrated map of Crumbhollow with twelve numbered locations"
        mapWidth="1536"
        mapHeight="864"
        fx={WORLD_FX.crumbhollow}
        characterFeatures={[CRUMBHOLLOW_CAST]}
        onBackHome={openHome}
      />
    );
  }

  return (
    <UniverseHome
      onEnterSnackville={openSnackville}
      onEnterSandwich={openSandwich}
      onEnterCrumbhollow={openCrumbhollow}
    />
  );
}
