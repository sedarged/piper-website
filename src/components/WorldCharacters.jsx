import { Reveal } from "./Reveal.jsx";

export function WorldCharacters({ feature, className = "" }) {
  const headingId = `character-atlas-${feature.title.replaceAll(" ", "-").toLowerCase()}`;

  return (
    <section className={`character-atlas ${className}`} aria-labelledby={headingId}>
      <Reveal className="character-atlas__heading">
        <div className="eyebrow on-sky-s">{feature.eyebrow}</div>
        <h2 className="h2 on-sky" id={headingId}>{feature.title}</h2>
        <p className="lead on-sky-s">{feature.lead}</p>
      </Reveal>

      <Reveal className="character-atlas__art">
        <img src={feature.image} alt={feature.alt} width="1599" height="900" loading="lazy" decoding="async" />
      </Reveal>

      <div className="character-atlas__grid">
        {feature.people.map((person, index) => (
          <Reveal className="character-atlas__person" key={person.name} delay={index * 55}>
            <span className="character-atlas__number d" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="d">{person.name}</h3>
              <p className="character-atlas__role u">{person.role}</p>
              <p className="character-atlas__note">{person.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
