import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

import { BOOKS, SPREADS } from "../src/data/books.js";
import { CAST } from "../src/data/cast.js";
import { PLACES } from "../src/data/places.js";
import { QUIZ } from "../src/data/quiz.js";
import { SECTIONS } from "../src/data/sections.js";
import { BADGES, TREASURES, TOTAL_ACTIONS } from "../src/data/treasures.js";

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
  assert.equal(TOTAL_ACTIONS, TREASURES.length + PLACES.length + BOOKS.length + 2);
  assert.equal(BADGES.at(-1).at, TOTAL_ACTIONS);
});

test("map coordinates stay inside the illustration", () => {
  for (const place of PLACES) {
    assert.ok(place.x >= 0 && place.x <= 100, `${place.id} x coordinate`);
    assert.ok(place.y >= 0 && place.y <= 100, `${place.id} y coordinate`);
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
