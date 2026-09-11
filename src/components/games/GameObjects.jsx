const shell = (children, label, className = "") => (
  <svg className={`game-object ${className}`} viewBox="0 0 120 120" role="img" aria-label={label}>
    <defs>
      <filter id="game-soft-shadow" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#24170d" floodOpacity=".28" />
      </filter>
      <linearGradient id="berry-glaze" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#ff7790"/><stop offset=".5" stopColor="#d93458"/><stop offset="1" stopColor="#8f1734"/>
      </linearGradient>
      <linearGradient id="pastry-gold" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#ffe29a"/><stop offset=".55" stopColor="#d9953f"/><stop offset="1" stopColor="#8b4927"/>
      </linearGradient>
    </defs>
    <g filter="url(#game-soft-shadow)">{children}</g>
  </svg>
);

export const GAME_OBJECTS = {
  berry: () => shell(<><path d="M60 31C38 20 22 39 25 63c4 30 26 45 35 48 9-3 31-18 35-48 3-24-13-43-35-32Z" fill="url(#berry-glaze)" stroke="#651a31" strokeWidth="4"/><path d="M60 34c-9-13-20-17-30-14 7 10 16 15 30 14Zm0 0c9-13 20-17 30-14-7 10-16 15-30 14Z" fill="#73a55d" stroke="#365d35" strokeWidth="3"/><path d="M45 52h1m27 7h1M51 77h1m22 9h1m-30 8h1" stroke="#ffe7a9" strokeWidth="5" strokeLinecap="round"/><path d="M37 46c7-8 15-10 23-8" fill="none" stroke="#ffb2bf" strokeWidth="5" strokeLinecap="round" opacity=".8"/></>, "Strawberry treat", "game-object--berry"),
  croix: () => shell(<><path d="M22 75c8-34 27-53 49-53 18 0 29 12 30 29-10-8-20-10-29-5 12 7 19 18 20 34-18 15-50 15-70-5Z" fill="url(#pastry-gold)" stroke="#6f3e25" strokeWidth="5" strokeLinejoin="round"/><path d="M39 64c12 8 27 10 43 4M50 43c9 5 19 7 30 5" fill="none" stroke="#fff0b6" strokeWidth="5" strokeLinecap="round" opacity=".75"/></>, "Golden croissant", "game-object--croix"),
  donut: () => shell(<><ellipse cx="60" cy="66" rx="43" ry="36" fill="url(#pastry-gold)" stroke="#653b26" strokeWidth="5"/><path d="M21 60c6-24 24-34 39-34 20 0 37 12 41 34-12 3-16-7-25-2-8 5-12-2-20 0-9 2-12 10-21 4-6-4-9 1-14-2Z" fill="#ef6382" stroke="#8c2440" strokeWidth="4"/><ellipse cx="60" cy="68" rx="12" ry="10" fill="#291813"/><path d="m37 44 6 4m18-12-1 7m21-1-5 6m12 8-7 1M50 51l4-6" stroke="#fff0a6" strokeWidth="4" strokeLinecap="round"/></>, "Strawberry doughnut", "game-object--donut"),
  chilli: () => shell(<><path d="M75 25c-4 13-2 19 9 24" fill="none" stroke="#4f783b" strokeWidth="8" strokeLinecap="round"/><path d="M82 44c20 30-5 59-51 48 26-6 34-20 30-43 7-8 14-10 21-5Z" fill="#db3a36" stroke="#771d26" strokeWidth="5"/><path d="M67 50c9-3 16 1 20 10" fill="none" stroke="#ff8a76" strokeWidth="4" strokeLinecap="round"/></>, "Spicy chilli", "game-object--chilli"),
  star: () => shell(<><path d="m60 15 12 27 30 3-23 20 7 30-26-16-26 16 7-30-23-20 30-3Z" fill="#ffd66e" stroke="#8b5c2b" strokeWidth="5" strokeLinejoin="round"/><path d="m60 28 7 17" stroke="#fff4bd" strokeWidth="5" strokeLinecap="round"/></>, "Magic star", "game-object--star"),
  bean: () => shell(<><path d="M33 30c28-17 62 8 55 39-6 27-42 35-59 15C13 65 16 40 33 30Z" fill="#8bd1a8" stroke="#315f4a" strokeWidth="5"/><path d="M37 37c16-8 34 0 41 12" fill="none" stroke="#c9f3d7" strokeWidth="6" strokeLinecap="round"/></>, "Jelly bean", "game-object--bean"),
  scale: () => shell(<><path d="M60 25v65M37 91h46M28 44h64M35 45l-14 31h28L35 45Zm50 0L71 76h28L85 45Z" fill="none" stroke="#d8aa58" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="60" cy="23" r="8" fill="#f5d993" stroke="#78522e" strokeWidth="4"/></>, "Golden kitchen scales", "game-object--scale"),
  basket: () => shell(<><path d="M25 52h70L87 99H33Z" fill="#b87038" stroke="#5d351e" strokeWidth="5"/><path d="M37 53c2-31 44-31 46 0M31 67h58M29 82h62M47 54l-4 42m30-42 4 42" fill="none" stroke="#f0bf69" strokeWidth="5" strokeLinecap="round"/></>, "Piper's woven basket", "game-object--basket"),
};

export function GameObject({ kind }) {
  const render = GAME_OBJECTS[kind] || GAME_OBJECTS.berry;
  return render();
}
