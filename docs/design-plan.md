# Piper — Flagship Site Redesign Plan
### Wallace-Siedlarz Books · Design direction v6

---

## Diagnosis

The current site is **a document about Snackville**. It should **be Snackville**.

Three things are holding it back:

1. **The background is inert.** Ivory paper is the right call for a literary imprint (Faber, Fitzcarraldo) and the wrong call for a children's brand flagship. It reads as a quiet gallery, not a place.
2. **Everything is a rectangle stacked vertically.** There is no depth, no horizon, no sense of travelling anywhere. Sections are containers, not locations.
3. **The illustrations are framed like museum pieces.** Characters sit inside arches on white. They should be standing in their world.

The research is unambiguous on the audience question: children aren't reading a site, they're exploring one, and a restrained palette actively works against that. But the parent still has to feel this is a real publisher worth £8.99. **The answer isn't to pick one — it's to build both into the same page.**

---

## The thesis

> **Scrolling down the page is walking through Snackville, from dawn to nightfall.**

You start at sunrise outside Piper's cottage. You cross the cloud bridge in full daylight. You reach the volcano as the sky turns to dusk. You end on Jellybean Hill under stars.

That's the signature. Everything else supports it.

---

# The 10 improvements

## 01 — A living sky instead of a paper background

**Problem:** the flat ivory background is the single biggest thing making the site feel static and adult.

**Change:** the page background becomes one continuous sky that changes as you scroll — dawn peach → bright cerulean → sunset amber → deep night blue. Not four separate section backgrounds; one gradient driven by scroll position.

**Why it works:** it gives the page a sense of time passing and distance travelled. A child scrolls and something *happens* to the whole world, not just to the box they're looking at. It also solves the day/night toggle problem — night isn't a mode any more, it's a destination.

**Build:** single fixed-position gradient layer, `animation-timeline: scroll(root)` with keyframes at 0/33/66/100%. Runs on the compositor, zero jank. Falls back to a static mid-day sky where unsupported.

---

## 02 — Layered parallax landscape

**Problem:** no depth. Everything sits on the same plane.

**Change:** five sticky background layers moving at different speeds behind the content — far clouds, distant sugar mountains, Chocolate Mountain silhouette (permanently smoking), town rooftops, foreground candy grass and lollipop stalks.

**Why it works:** depth is what separates "a webpage" from "a world." It's also the single most reliable way to make a child say *whoa* in the first three seconds.

**Build:** CSS `animation-timeline: view()` per layer with different translate ranges. **Gated behind `@media (prefers-reduced-motion: no-preference)`** — parallax is a documented vestibular trigger and this is non-negotiable. Reduced-motion users get the same layers, static.

---

## 03 — A real world palette, with colour as navigation

**Problem:** two inks on cream. Sophisticated, and far too quiet for the brief.

**Change:** an eight-colour Snackville palette where **every location owns a colour**, used consistently for its pin, its section, its character and its button.

| Role | Colour | Where it lives |
|---|---|---|
| Strawberry | `#FF3B5C` | Piper, primary actions |
| Butter | `#FFC93C` | Squad HQ, rewards, achievements |
| Mint | `#3DD98B` | Jellybean Hill, "join" actions |
| Sky | `#5BC8F5` | Cloud Bridge, calm states |
| Grape | `#9B6BFF` | Candy Path Square, magic moments |
| Ember | `#FF7A3C` | Toast's Workshop, warnings |
| Cocoa | `#7B4A2A` | Chocolate Mountain, the Dragon |
| Cream | `#FFF6E9` | Text panels, cards |
| Plum ink | `#2A1A2E` | All body text (warm dark, never pure black) |

**Why it works:** the research is explicit that bright contrasting colour should be used *consistently as a navigational cue* — same colour always means the same thing. It also avoids the eye-strain trap of clashing primaries by keeping everything on a single warm harmonic.

---

## 04 — Piper becomes your guide

**Problem:** the site has a hero character who never actually helps you.

**Change:** a small Piper follows you down the page in the corner. She points at things worth clicking, reacts when you find a treasure, cheers when you finish the quiz, and covers her ears when the dragon sneezes. Tap her and she says something useful about wherever you currently are.

**Why it works:** a friendly guide character is one of the most consistently validated patterns in children's UX — it lowers the navigation burden and gives instant emotional feedback. It also converts: she's the one who says "the free colouring pages are down here."

**Build:** fixed-position SVG/PNG, state driven by which section is in view. Dismissible, and she stays dismissed.

---

## 05 — Kill every rectangle

**Problem:** hard horizontal edges between sections. Nothing in Snackville is a rectangle.

**Change:** sections separate with organic shapes — a wavy hill crest, a row of whipped-cream cloud bumps, a bitten-biscuit edge, a chocolate drip. Cards get soft asymmetric corners. The map section has a torn-paper edge.

**Why it works:** it's the difference between a template and a world. Cheap to implement, enormous perceived-quality gain.

**Build:** inline SVG dividers sitting between sections, coloured to match the incoming section. Scales cleanly, no images.

---

## 06 — Type that's warm without being babyish

**Problem:** Bricolage Grotesque is confident but slightly severe for a 4-year-old's brand.

**Change:** three deliberate roles.

- **Display — Baloo 2 (800).** Rounded, warm, high-impact. Reads friendly at 100px without tipping into the Comic Sans register. Not Fredoka One, which is the default "kids font" and instantly reads as templated.
- **Body — Newsreader (300/400).** Kept. This is the parent-facing voice and it should read like an actual book.
- **UI — Outfit (600).** Buttons, labels, nav, small caps. Clean and neutral so the display face stays the star.

Everything scales up roughly 15%. <cite>Big and bold is the documented requirement for this age group.</cite>

---

## 07 — A proper reward loop

**Problem:** the treasure hunt exists but nothing accumulates. There's no reason to come back.

**Change:** a **Snackville Explorer** progress ring in the corner that fills as the child does things — find a treasure (6), take the quiz (1), visit every map location (8), spin both books (2), find the night sky (1). Each one fires confetti, a chime, and Piper cheering. Completing a tier unlocks a badge.

**Why it works:** this is the Duolingo pattern and it's the single most proven engagement mechanic for this age group — instant exaggerated reward, visible progress, small achievable tiers. It also gives you a legitimate reason to email: *"finish your explorer badge."*

**Build:** state-only, no storage. Tiers at 6 / 12 / 18 actions.

---

## 08 — The map becomes the hub, not a section

**Problem:** the map is currently a nice component two-thirds down the page. It should be the heart of the site.

**Change:** full-bleed, much larger, with the characters actually standing on it. Pins become illustrated location markers that lift and glow. Clicking flies you into that location's card. A "you've explored 5 of 8" counter ties into the reward loop.

**Why it works:** the map is the most inherently explorable thing you own. It's also the asset that scales — every future book adds pins to it, which makes this site the permanent home of the whole Piper universe rather than a page about two books.

---

## 09 — An orchestrated motion system

**Problem:** motion is currently scattered fade-ups. Generic.

**Change:** one coherent system.

- **Ambient (always):** clouds drift, the volcano smokes, grass sways, Piper breathes.
- **Scroll-driven:** parallax layers, sky transition, section reveals that enter *from the direction that makes narrative sense* — the bridge slides in from above, the volcano rises from below.
- **Interaction:** springy overshoot on every tap target. Nothing linear, nothing that just fades.
- **Orchestrated moments:** three big ones only — the book opening, the dragon sneeze, the badge unlock.

**Why it works:** an orchestrated sequence lands harder than scattered effects. Restricting the big moments to three keeps them special.

---

## 10 — An explicit two-door split

**Problem:** every design decision is currently a compromise between "premium publisher" and "kids' playground." Compromises satisfy nobody.

**Change:** stop compromising. The world *is* the site — bright, deep, playful, for the child. But two calm, cream, editorial panels sit inside it, clearly marked **For grown-ups**: one with the real book details, page counts, age guidance, read-aloud notes, and the buy link; one with the email signup. Same visual language, deliberately quieter.

**Why it works:** the parent gets an unambiguous signal that this was made by people who take books seriously, without the child's experience being watered down to achieve it. It also mirrors what already works in your funnel — the child plays, the grown-up subscribes.

---

# What this sets up for the future

This architecture is built to hold the whole universe, not two books:

- **New books** add a shelf entry and new pins on the map
- **New characters** stand on the map and get a card
- **New locations** extend the map
- **Spin-off series** become new regions on the same world map
- **Merch, activity packs, school resources** slot in as new "buildings"

The map is the spine. Everything hangs off it.

---

# Build order

| Phase | Work | Impact |
|---|---|---|
| 1 | Sky + parallax layers + palette + type | The *whoa* moment — 70% of the perceived change |
| 2 | Organic dividers + reward ring + Piper guide | Depth and stickiness |
| 3 | Map hub rebuild | The long-term asset |
| 4 | Grown-up panels + email + printables | Conversion |

---

# What I need from you

The parallax layers are the one thing I can't fake with what's in Drive. To do phase 1 properly I need **five landscape layers as transparent PNGs**, all 2400px wide:

1. Far clouds
2. Distant sugar mountains
3. Chocolate Mountain silhouette
4. Snackville rooftops
5. Foreground candy grass and lollipop stalks

Plus **one small Piper cut-out** (transparent, ~600px tall, friendly waving pose) for the guide character.

Everything else in this plan I can build with the assets already in Drive.

---

**Say go and I'll start on phase 1.**
