/**
 * An organic shaped divider between two sections — a wave, a hill
 * crest, a row of cloud bumps, or a chocolate-drip edge — instead of a
 * hard rectangular seam. `fill` should match the colour of the section
 * the shape is "entering"; `flip` mirrors it vertically for use as the
 * closing edge of a coloured band.
 */
export function Divider({ shape = "wave", fill, flip }) {
  const paths = {
    wave: "M0 60C180 6 380 90 600 52S1020 0 1200 44v76H0z",
    hill: "M0 120V54c150-46 320 26 480 26S840 12 1000 30s200 42 200 42v48z",
    cloud: "M0 120V72c60 0 60-40 120-40s60 40 120 40 60-44 120-44 60 44 120 44 60-40 120-40 60 40 120 40 60-44 120-44 60 44 120 44 60-36 120-36 60 36 120 36v48z",
    drip: "M0 0h1200v34c-40 0-40 44-80 44s-40-44-80-44-40 62-80 62-40-62-80-62-40 40-80 40-40-40-80-40-40 56-80 56-40-56-80-56-40 38-80 38-40-38-80-38-40 48-80 48-40-48-80-48z",
  };
  return (
    <div className="divider" style={{ lineHeight: 0, position: "relative", zIndex: 3, transform: flip ? "scaleY(-1)" : "none" }} aria-hidden="true">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: "100%", height: "clamp(46px,6vw,110px)", display: "block" }}>
        <path d={paths[shape]} fill={fill} />
      </svg>
    </div>
  );
}
