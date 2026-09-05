import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

import { BOOKS, SPREADS } from "../src/data/books.js";
import { CAST, SNACKVILLE_CHARACTERS } from "../src/data/cast.js";
import { PLACES } from "../src/data/places.js";
import { QUIZ } from "../src/data/quiz.js";
import { SECTIONS } from "../src/data/sections.js";
import { BADGES, TREASURES, TOTAL_ACTIONS } from "../src/data/treasures.js";
import { WOW_FX } from "../src/data/wow.js";
import { SANDWICH_PLACES } from "../src/data/sandwich.js";
import { CRUMBHOLLOW_PLACES } from "../src/data/crumbhollow.js";
import { PRINTABLES } from "../src/data/printables.js";
import { floodFill } from "../src/lib/floodFill.js";
import { ASSET } from "../src/config.js";
import { CRUMBHOLLOW_CAST, SANDWICH_CAST } from "../src/data/worldCharacters.js";

test("content identifiers remain unique", () => {
  for (const collection of [BOOKS, CAST, PLACES, TREASURES, SECTIONS]) {
    const keys = collection.map((item) => item.id ?? item.key);
    assert.equal(new Set(keys).size, keys.length);
  }
});

test("quiz answers only target existing characters", () => {
  const characters = new Set(CAST.map((character) => character.key));
  assert.equal(QUIZ.length, 4);
  for (const question of QUIZ) {
    assert.equal(question.a.length, CAST.length);
    for (const answer of question.a) assert.ok(characters.has(answer.k));
  }
});

test("explorer total matches every tracked action", () => {
  // +2 for the quiz and nightfall, +5 for the Snackville studio games.
  assert.equal(TOTAL_ACTIONS, TREASURES.length + PLACES.length + BOOKS.length + 2 + 5);
  assert.equal(BADGES.at(-1).at, TOTAL_ACTIONS);
});

test("map coordinates stay inside the illustration", () => {
  for (const collection of [PLACES, SANDWICH_PLACES, CRUMBHOLLOW_PLACES]) {
    for (const place of collection) {
      assert.ok(place.x >= 0 && place.x <= 100, `${place.id} x coordinate`);
      assert.ok(place.y >= 0 && place.y <= 100, `${place.id} y coordinate`);
    }
  }
});

test("official Snackville map exposes all twenty described locations", () => {
  assert.equal(PLACES.length, 20);
  assert.deepEqual(PLACES.map((place) => place.n).sort((a, b) => a - b),
    Array.from({ length: 20 }, (_, index) => index + 1));
  for (const place of PLACES) {
    assert.ok(place.name.length > 3, `location ${place.n} has a name`);
    assert.ok(place.intro.length > 20, `${place.name} has an introduction`);
    assert.ok(place.d.length > 80, `${place.name} has a full description`);
    assert.ok(place.note.length > 20, `${place.name} has an explorer note`);
  }
});

test("Crumbhollow corrects the two misspelled labels baked into its source art", () => {
  const corrections = CRUMBHOLLOW_PLACES.filter((place) => place.labelCorrection);
  assert.deepEqual(corrections.map((place) => place.name), [
    "Captain Woofer's House & Dock",
    "Strong Pie-Rat's Barrel Yard",
  ]);
  assert.ok(corrections.every((place) => place.labelCorrection.lines.join(" ") === place.name));
});

test("the publishing showcase uses local optimised artwork", () => {
  assert.equal(BOOKS.length, 6);
  for (const book of BOOKS) {
    assert.match(book.img, /^\/images\/books\/.+\.webp$/);
    assert.ok(existsSync(new URL(`../public${book.img}`, import.meta.url)), `${book.title} cover exists`);
    assert.ok(book.title.length > 20);
    assert.ok(book.blurb.length > 100);
  }

  assert.equal(SPREADS.length, 11);
  for (const spread of SPREADS) {
    assert.match(spread.img, /^\/images\/inside\/.+\.webp$/);
    assert.ok(existsSync(new URL(`../public${spread.img}`, import.meta.url)), `page ${spread.page} exists`);
    assert.ok(spread.t.length > 20);
  }
});

test("each storyworld exposes its approved character cast", () => {
  assert.deepEqual(
    SNACKVILLE_CHARACTERS.map((person) => person.name),
    ["Piper", "Croissant Kitty", "Toast Kitty", "Sandwich Kitty", "Pepper", "Choco", "Custard Queen", "Ice Cream Robots"]
  );
  assert.deepEqual(
    CRUMBHOLLOW_CAST.people.map((person) => person.name),
    ["Woofer", "Biscuit", "Grey Pie-Rat", "Strong Pie-Rat", "Pancake Pirate"]
  );
  assert.deepEqual(
    SANDWICH_CAST.people.map((person) => person.name),
    ["Sir Crumples", "Queen Pickle", "Crumbly", "Wizard Brioche", "Gate Guard", "Hungry Cloud", "Mustard Boggle", "Tomato Mouse Captain", "Tomato Mice", "Sandwich Citizens"]
  );

  for (const characters of [SNACKVILLE_CHARACTERS, CRUMBHOLLOW_CAST.people, SANDWICH_CAST.people]) {
    for (const person of characters) {
      assert.match(person.img, /^\/images\/characters\/.+\.webp$/);
      assert.ok(existsSync(new URL(`../public${person.img}`, import.meta.url)), `${person.name} portrait exists`);
      assert.ok(person.line.length > 30, `${person.name} has card copy`);
      assert.ok(person.bio.length > 60, `${person.name} has a full profile`);
      assert.ok(person.power.length > 25, `${person.name} has a power`);
      assert.ok(person.secret.length > 20, `${person.name} has a secret`);
    }
  }

  for (const key of ["piper", "croissant", "toast", "sandwich"]) {
    assert.match(ASSET[key], /^\/images\/characters\/snack-squad\/.+\.webp$/);
    assert.ok(existsSync(new URL(`../public${ASSET[key]}`, import.meta.url)), `${key} approved reference exists`);
  }

  assert.ok(existsSync(new URL("../public/images/sandwich-interactive-map.jpeg", import.meta.url)), "official Sandwich Kingdom map exists");
  assert.ok(existsSync(new URL("../public/images/worlds/sandwich-cover.webp", import.meta.url)), "official Sandwich Kingdom cover exists");
  assert.ok(existsSync(new URL("../public/images/home/snack-squad-portal.webp", import.meta.url)), "new Snack Squad portal exists");
  assert.ok(existsSync(new URL("../public/images/home/toast-kitty-reading.webp", import.meta.url)), "new reading Toast Kitty exists");
});

test("Crumbhollow and Sandwich Kingdom use the complete world-page structure", () => {
  const source = readFileSync(new URL("../src/components/WorldExperience.jsx", import.meta.url), "utf8");
  for (const section of ["world-story", "world-characters", "world-map", "world-book"]) {
    assert.match(source, new RegExp(`id=["']${section}["']`), `${section} is present`);
  }
  assert.match(source, /<WorldCharacters/);
  assert.match(source, /scrollIntoView/, "world navigation scrolls without replacing the world route hash");
  assert.match(
    source,
    /<WorldMap\s+key=\{title\}/,
    "each world remounts its map so dialogs and progress cannot leak into another world"
  );
});

test("map dialogs escape page stacking contexts", () => {
  for (const file of ["MapHub.jsx", "WorldMap.jsx"]) {
    const source = readFileSync(new URL(`../src/components/${file}`, import.meta.url), "utf8");
    assert.match(source, /createPortal/);
    assert.match(source, /document\.body/);
  }
});

test("every map location has a signature effect, and no two are alike", () => {
  const ids = PLACES.filter((place) => place.wow).map((place) => place.id);
  assert.equal(ids.length, PLACES.length, "every location is marked wow");

  for (const id of ids) {
    assert.ok(WOW_FX[id], `${id} has an effect`);
  }
  assert.deepEqual(
    Object.keys(WOW_FX).sort(),
    [...ids].sort(),
    "the effect table and the map have exactly the same locations"
  );

  // The point of the table: a location's identity is its own combination
  // of screen reaction, particle motion and sound. Any of these three
  // collapsing into a shared value is the "one template, twenty
  // recolours" failure the rewrite existed to remove.
  const reactions = ids.map((id) => WOW_FX[id].reaction);
  assert.equal(new Set(reactions).size, reactions.length, "no two locations share a screen reaction");

  const particleKinds = ids.map((id) => WOW_FX[id].particles?.kind).filter(Boolean);
  assert.equal(new Set(particleKinds).size, particleKinds.length, "no two locations share a particle kind");

  const voices = ids.map((id) => JSON.stringify(WOW_FX[id].sound));
  assert.equal(new Set(voices).size, voices.length, "no two locations share a sound");

  const stories = ids.map((id) => `${WOW_FX[id].toastTitle}|${WOW_FX[id].toastBody}|${WOW_FX[id].guide}`);
  assert.equal(new Set(stories).size, stories.length, "no two locations share the same story response");

  for (const id of ids) {
    const fx = WOW_FX[id];
    assert.ok(fx.signature.length > 20, `${id} documents what it should feel like`);
    assert.ok(fx.toastTitle && fx.toastBody && fx.guide, `${id} has its copy`);
    // Every location must actually *do* something visible beyond the
    // reaction — particles, rings, a streak or confetti.
    assert.ok(
      fx.particles || fx.rings || fx.streaks || fx.confettiBurst,
      `${id} has a visual mechanic`
    );
    assert.ok(Array.isArray(fx.sound.notes) && fx.sound.notes.length > 0, `${id} has audible notes`);
  }
});

test("every studio game card maps to a real game", () => {
  const games = PRINTABLES.filter((p) => p.kind === "game");
  assert.equal(games.length, 5);

  // A card whose id has no component fails silently at runtime — the
  // child taps it and nothing opens — so the registry is checked here.
  // It's read as source text rather than imported because it pulls in
  // .jsx, which node:test can't load without a transform step; the
  // point is only to catch a game added to the data file and forgotten
  // in the registry, and reading the file catches exactly that.
  const registry = readFileSync(new URL("../src/components/games/registry.js", import.meta.url), "utf8");
  for (const game of games) {
    assert.match(registry, new RegExp(`\\b${game.id}:`), `${game.id} is wired up in the game registry`);
    assert.ok(game.note.length > 20, `${game.name} explains itself`);
  }

  // Cards that aren't games must be honest about it rather than
  // rendering a dead download link.
  for (const print of PRINTABLES.filter((p) => p.kind === "print")) {
    assert.ok(print.url === "" || /^https?:\/\//.test(print.url), `${print.id} is a real link or empty`);
  }
});

test("the colouring game is Piper's Strawberry Cottage", () => {
  const source = readFileSync(new URL("../src/components/games/ColoringPage.jsx", import.meta.url), "utf8");
  assert.match(source, /<canvas/, "the game paints the professional artwork directly");
  assert.match(source, /floodFill/, "taps fill exact enclosed illustration areas");
  assert.match(source, /Quick paint:/, "keyboard users have named paint controls");
  assert.ok(existsSync(new URL("../public/images/games/strawberry-cottage-line-art.png", import.meta.url)), "the professional cottage line art exists");
});

test("colour fill cannot cross the cottage ink boundary", () => {
  const width = 5;
  const height = 5;
  const pixels = new Uint8ClampedArray(width * height * 4).fill(255);
  for (let y = 0; y < height; y += 1) {
    const offset = (y * width + 2) * 4;
    pixels[offset] = 90;
    pixels[offset + 1] = 21;
    pixels[offset + 2] = 59;
  }

  assert.equal(floodFill(pixels, width, height, 0, 0, [244, 154, 193]), 10);
  assert.deepEqual([...pixels.slice(0, 4)], [244, 154, 193, 255], "the selected side is coloured");
  assert.deepEqual([...pixels.slice(2 * 4, 3 * 4)], [90, 21, 59, 255], "the ink stays intact");
  assert.deepEqual([...pixels.slice(4 * 4, 5 * 4)], [255, 255, 255, 255], "the other side stays white");
});
