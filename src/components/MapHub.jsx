import { useState } from "react";
import { drive, ASSET } from "../config.js";
import { PLACES } from "../data/places.js";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";
import { I } from "./Icons.jsx";

/**
 * The interactive Snackville map — the hub of the whole site (see the
 * design plan, item 8: the map is the spine everything else hangs off).
 * Clicking a numbered pin, or its matching row in the sidebar list,
 * selects it and marks it visited via `mark(place-<id>)`, which feeds
 * the Explorer progress ring in App.jsx.
 *
 * Pin #8 (Chocolate Mountain) is special-cased: instead of the normal
 * chime, clicking it triggers `onSneeze`, which shakes the whole page
 * and drops chocolate drips from the top of the screen.
 */
export function MapHub({ visitedPlaceIds, mark, onSneeze, chime }) {
  const [selected, setSelected] = useState(PLACES[0]);
  const seenCount = PLACES.filter((p) => visitedPlaceIds.has(p.id)).length;

  const pick = (place) => {
    setSelected(place);
    mark(`place-${place.id}`);
    if (place.sneeze) onSneeze();
    else chime(640, 0.12);
  };

  return (
    <>
      <Reveal style={{ textAlign: "center", marginBottom: 34 }}>
        <div className="eyebrow on-sky-s" style={{ marginBottom: 12, opacity: 0.72 }}>The map</div>
        <h2 className="h2 on-sky">All of Snackville</h2>
        <p className="lead on-sky-s" style={{ margin: "14px auto 0", fontWeight: 400 }}>
          Tap a number to see what happens there. Number eight is best poked with caution.
        </p>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 9, marginTop: 16,
          background: "var(--cream)", borderRadius: 100, padding: "8px 18px", boxShadow: "0 4px 0 rgba(42,26,46,.12)",
        }}>
          <span style={{ width: 20, height: 20 }}>{I.mapic()}</span>
          <span className="u" style={{ fontSize: 14.5 }}>{seenCount} of {PLACES.length} places explored</span>
        </div>
      </Reveal>

      <Reveal className="panel" style={{ padding: "clamp(16px,2.4vw,26px)" }}>
        <div
          className="map-layout"
          style={{ display: "grid", gridTemplateColumns: "1.45fr .55fr", gap: "clamp(16px,2.4vw,28px)", alignItems: "start" }}
        >
          <div className="map-f">
            <Img src={drive(ASSET.map, 1400)} alt="Illustrated map of Snackville" fb="Snackville map" />
            {PLACES.map((p) => (
              <button
                key={p.id}
                className={`pin ${selected.id === p.id ? "on" : ""} ${visitedPlaceIds.has(p.id) ? "seen" : ""} ${p.sneeze ? "dragon" : ""}`}
                style={{ left: `${p.x}%`, top: `${p.y}%`, background: p.ink }}
                onClick={() => pick(p)}
                aria-label={p.name}
                aria-pressed={selected.id === p.id}
              >
                {p.n}
              </button>
            ))}
          </div>

          <div>
            <div style={{ background: `${selected.ink}1E`, border: `3px solid ${selected.ink}55`, borderRadius: 22, padding: 22, minHeight: 180 }}>
              <span className="pdot" style={{ background: selected.ink, marginBottom: 10 }}>{selected.n}</span>
              <h3 className="d" style={{ fontSize: 23, lineHeight: 1.05, marginTop: 8 }}>{selected.name}</h3>
              <div className="eyebrow" style={{ marginTop: 5 }}>{selected.who}</div>
              <p style={{ color: "var(--ink60)", marginTop: 11, fontSize: 16.5 }}>{selected.d}</p>
            </div>

            <div className="plist" style={{ marginTop: 16 }}>
              {PLACES.map((p) => (
                <button key={p.id} className={`prow ${selected.id === p.id ? "on" : ""}`} onClick={() => pick(p)}>
                  <span className="pdot" style={{ background: visitedPlaceIds.has(p.id) ? p.ink : "rgba(42,26,46,.2)" }}>{p.n}</span>
                  <span className="u" style={{ fontSize: 15 }}>{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
}
