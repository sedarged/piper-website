import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const universe = read("src/components/UniverseHome.jsx");
const hero = read("src/components/Hero.jsx");
const registry = read("src/data/websiteArt.js");
const qualityCss = read("src/styles/artwork-quality.css");
const main = read("src/main.jsx");

test("homepage no longer renders the obsolete composite crop sheet", () => {
  assert.doesNotMatch(universe, /ReferenceCrop/);
  assert.doesNotMatch(universe, /worlds-homepage-reference/);
  assert.match(universe, /WEBSITE_ART\.worlds\.snackville/);
});

test("semantic artwork registry uses complete assets, never sprite or crop atlases", () => {
  assert.match(registry, /characters:\s*\{/);
  assert.match(registry, /worlds:\s*\{/);
  assert.doesNotMatch(registry, /sprite|atlas|contact-sheet|worlds-homepage-reference/i);
  assert.match(registry, /drive\(ASSET\.piper, 1600\)/);
  assert.match(registry, /drive\(ASSET\.sandwich, 1600\)/);
});

test("Snack Squad card is assembled from four individual character artworks", () => {
  assert.match(hero, /SQUAD_ART/);
  assert.match(hero, /world-squad-collage__member/);
  assert.doesNotMatch(hero, /custard-page-31\.webp/);
});

test("character presentation protects complete anatomy", () => {
  assert.match(qualityCss, /\.cc-f img,[\s\S]*object-fit:\s*contain !important/);
  assert.match(qualityCss, /\.dr-art img,[\s\S]*object-position:\s*center bottom !important/);
  assert.match(qualityCss, /\.world-squad-collage__member img[\s\S]*object-fit:\s*contain !important/);
});

test("artwork guardrails load after the existing visual system", () => {
  const quality = main.indexOf('"./styles/artwork-quality.css"');
  assert.ok(quality > main.indexOf('"./styles/universe-home.css"'));
  assert.ok(quality > main.indexOf('"./styles/world-experience.css"'));
});
