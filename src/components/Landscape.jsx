import { C } from "../styles/tokens.js";

/**
 * Five parallax landscape layers, back to front, now rendered as dark
 * cinematic silhouettes against the night sky. The palette has been
 * shifted so every layer reads as a near-black silhouette at a slightly
 * different tonal depth, with warm amber window glow in the town layer
 * and muted candy-tree accents in the foreground.
 *
 * See docs/asset-list.md "Part 1 — The parallax world" for prompts.
 */
export const Land = {
  clouds: (
    <svg viewBox="0 0 1600 240" preserveAspectRatio="none" aria-hidden="true">
      <g fill="rgba(180,200,240,0.06)">
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
        fill="#070B16" />
      <path d="M150 70l52 38-52 22-48-26zM715 121l60 44-62 26-56-30zM1090 111l64 46-66 28-58-32z"
        fill="rgba(140,160,200,0.12)" />
    </svg>
  ),
  mountain: (
    <svg viewBox="0 0 1600 340" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 340V260l180-40 140-90 130 60 190-150 165 190 175-70 200 120 220-60 0 120z" fill="#050810" />
      <path d="M1015 190l165-155 175 190-160 40-140-40z" fill="#040710" />
      <path d="M1180 35l58 66-58 26-56-30z" fill="#03060C" />
      <g fill="rgba(100,120,180,0.08)">
        <ellipse cx="1180" cy="18" rx="42" ry="20" /><ellipse cx="1240" cy="-12" rx="34" ry="16" />
        <ellipse cx="1130" cy="-24" rx="28" ry="13" /></g>
    </svg>
  ),
  town: (
    <svg viewBox="0 0 1600 260" preserveAspectRatio="none" aria-hidden="true">
      <rect y="150" width="1600" height="110" fill="#040710" />
      {[
        [60, C.strawberry], [200, C.butter], [340, C.mint], [480, C.grape],
        [620, C.sky], [760, C.ember], [900, C.strawberry], [1040, C.butter],
        [1180, C.mint], [1320, C.grape], [1460, C.sky],
      ].map(([x, col], i) => (
        <g key={i}>
          {/* building body — deep dark silhouette */}
          <rect x={x} y={150 - (i % 3) * 18 - 60} width="92" height={82 + (i % 3) * 18} rx="6" fill="#080C18" />
          {/* roof — muted colour at low opacity so the palette shows but doesn't glow */}
          <path d={`M${x - 10} ${150 - (i % 3) * 18 - 60} L${x + 46} ${150 - (i % 3) * 18 - 96} L${x + 102} ${150 - (i % 3) * 18 - 60} Z`} fill={col} opacity="0.35" />
          {/* amber window glow — warm lit interiors in a dark town */}
          <rect x={x + 22} y={150 - (i % 3) * 18 - 34} width="22" height="24" rx="4" fill="#FFAA44" opacity=".18" />
          <rect x={x + 56} y={150 - (i % 3) * 18 - 34} width="22" height="24" rx="4" fill="#FFAA44" opacity=".18" />
        </g>
      ))}
    </svg>
  ),
  grass: (
    <svg viewBox="0 0 1600 200" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 200V70c120-34 210 22 330 4s190-52 320-30 220 60 350 40 240-56 380-30 220 20 220 20v126z" fill="#060810" />
      <path d="M0 200V118c140-26 240 18 380 4s210-40 350-22 250 46 380 30 300-40 490-22v92z" fill="#04060E" />
      {[130, 420, 760, 1080, 1420].map((x, i) => (
        <g key={i}>
          <rect x={x} y={92} width="7" height="88" rx="3.5" fill="#0E1218" />
          <circle cx={x + 3.5} cy={86} r="26" fill={[C.strawberry, C.grape, C.butter, C.sky, C.ember][i]} opacity="0.55" />
          <circle cx={x + 3.5} cy={86} r="13" fill="#fff" opacity=".10" />
        </g>
      ))}
    </svg>
  ),
};
