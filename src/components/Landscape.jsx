import { C } from "../styles/tokens.js";

/**
 * The five parallax landscape layers, back to front: far clouds, sugar
 * mountains, the chocolate mountain silhouette, the town rooftops, and
 * foreground candy grass. Each is a flat vector illustration drawn
 * directly in SVG — a placeholder for real painterly illustrations.
 *
 * See docs/asset-list.md, section "Part 1 — The parallax world", for
 * generation prompts. Once real artwork exists, swap these entries for
 * <img> tags pointing at the new assets; the parent components
 * (App.jsx's five .land divs) don't need to change at all, since they
 * just render whatever `Land.clouds` / `Land.sugar` / etc. resolve to.
 *
 * Each SVG uses viewBox width 1600 against a 200%-wide container (see
 * .land svg in components.css) so the scroll engine's parallax maths
 * (useScrollEngine.js) can rely on "one viewport width of overflow"
 * without knowing anything about the artwork inside.
 */
export const Land = {
  clouds: (
    <svg viewBox="0 0 1600 240" preserveAspectRatio="none" aria-hidden="true">
      <g fill="#fff" opacity=".75">
        <ellipse cx="140" cy="150" rx="120" ry="52" /><ellipse cx="230" cy="130" rx="90" ry="44" />
        <ellipse cx="60" cy="160" rx="80" ry="40" />
        <ellipse cx="620" cy="120" rx="130" ry="50" /><ellipse cx="720" cy="140" rx="95" ry="42" />
        <ellipse cx="1080" cy="155" rx="115" ry="48" /><ellipse cx="1180" cy="135" rx="88" ry="40" />
        <ellipse cx="1450" cy="130" rx="120" ry="50" /><ellipse cx="1550" cy="150" rx="90" ry="42" />
      </g>
    </svg>
  ),
  sugar: (
    <svg viewBox="0 0 1600 300" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 300V180l150-110 130 95 120-72 165 120 145-92 175 130 150-100 200 140 210-120 0 129z"
        fill="#C9E9F7" />
      <path d="M150 70l52 38-52 22-48-26zM715 121l60 44-62 26-56-30zM1090 111l64 46-66 28-58-32z"
        fill="#fff" opacity=".9" />
    </svg>
  ),
  mountain: (
    <svg viewBox="0 0 1600 340" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 340V260l180-40 140-90 130 60 190-150 165 190 175-70 200 120 220-60 0 120z" fill="#8A5A38" />
      <path d="M1015 190l165-155 175 190-160 40-140-40z" fill="#6B4226" />
      <path d="M1180 35l58 66-58 26-56-30z" fill="#4E2B14" />
      <g fill="#9B6B45" opacity=".55">
        <ellipse cx="1180" cy="18" rx="42" ry="20" /><ellipse cx="1240" cy="-12" rx="34" ry="16" />
        <ellipse cx="1130" cy="-24" rx="28" ry="13" /></g>
    </svg>
  ),
  town: (
    <svg viewBox="0 0 1600 260" preserveAspectRatio="none" aria-hidden="true">
      <rect y="150" width="1600" height="110" fill="#E8B87A" />
      {[
        [60, C.strawberry], [200, C.butter], [340, C.mint], [480, C.grape],
        [620, C.sky], [760, C.ember], [900, C.strawberry], [1040, C.butter],
        [1180, C.mint], [1320, C.grape], [1460, C.sky],
      ].map(([x, col], i) => (
        <g key={i}>
          <rect x={x} y={150 - (i % 3) * 18 - 60} width="92" height={82 + (i % 3) * 18} rx="6" fill="#FFF1DC" />
          <path d={`M${x - 10} ${150 - (i % 3) * 18 - 60} L${x + 46} ${150 - (i % 3) * 18 - 96} L${x + 102} ${150 - (i % 3) * 18 - 60} Z`} fill={col} />
          <rect x={x + 22} y={150 - (i % 3) * 18 - 34} width="22" height="24" rx="4" fill={C.butter} opacity=".9" />
          <rect x={x + 56} y={150 - (i % 3) * 18 - 34} width="22" height="24" rx="4" fill={C.butter} opacity=".9" />
        </g>
      ))}
    </svg>
  ),
  grass: (
    <svg viewBox="0 0 1600 200" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 200V70c120-34 210 22 330 4s190-52 320-30 220 60 350 40 240-56 380-30 220 20 220 20v126z" fill="#4FCB86" />
      <path d="M0 200V118c140-26 240 18 380 4s210-40 350-22 250 46 380 30 300-40 490-22v92z" fill="#38B370" />
      {[130, 420, 760, 1080, 1420].map((x, i) => (
        <g key={i}>
          <rect x={x} y={92} width="7" height="88" rx="3.5" fill="#E8DCC0" />
          <circle cx={x + 3.5} cy={86} r="26" fill={[C.strawberry, C.grape, C.butter, C.sky, C.ember][i]} />
          <circle cx={x + 3.5} cy={86} r="13" fill="#fff" opacity=".45" />
        </g>
      ))}
    </svg>
  ),
};
