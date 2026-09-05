import { useState } from "react";
import { Reveal } from "./Reveal.jsx";
import { Img } from "./Img.jsx";
import { CastDrawer } from "./CastDrawer.jsx";

export function WorldCharacters({ feature, className = "" }) {
  const [selected, setSelected] = useState(null);
  const headingId = `character-atlas-${feature.title.replaceAll(" ", "-").toLowerCase()}`;

  return (
    <section className={`character-atlas ${className}`} aria-labelledby={headingId}>
      <Reveal className="character-atlas__heading">
        <div className="eyebrow on-sky-s">{feature.eyebrow}</div>
        <h2 className="h2 on-sky" id={headingId}>{feature.title}</h2>
        <p className="lead on-sky-s">{feature.lead}</p>
      </Reveal>

      <div className="cast-g character-atlas__cards">
        {feature.people.map((person, index) => (
          <Reveal key={person.key} delay={index * 55}>
            <button className="cc" onClick={() => setSelected(index)} aria-label={`Open ${person.name}'s character profile`}>
              <div className="cc-f"><Img src={person.img} alt={person.name} fb={person.name} /></div>
              <h3 className="cc-n">{person.name}</h3>
              <p className="cc-r">{person.role}</p>
              <p className="cc-line">{person.line}</p>
              <span className="cc-b" style={{ background: person.ink }}>{person.badge}</span>
            </button>
          </Reveal>
        ))}
      </div>

      <CastDrawer
        index={selected}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
        characters={feature.people}
        ctaLabel={feature.ctaLabel}
      />
    </section>
  );
}
