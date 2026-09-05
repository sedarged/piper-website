import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const html = read("index.html");
const manifest = JSON.parse(read("public/manifest.json"));
const robots = read("public/robots.txt");

test("public landing metadata is complete enough for search and social sharing", () => {
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /property="og:description"/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /rel="manifest" href="\/manifest\.json"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /"@type": "BookSeries"/);
});

test("web manifest has a valid launch surface and every declared icon exists", () => {
  assert.equal(manifest.start_url, "/");
  assert.equal(manifest.display, "standalone");
  assert.ok(manifest.name);
  assert.ok(manifest.short_name);
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0);

  for (const icon of manifest.icons) {
    assert.match(icon.src, /^\//);
    assert.ok(existsSync(new URL(`../public${icon.src}`, import.meta.url)), `missing manifest icon: ${icon.src}`);
  }
});

test("crawler policy explicitly permits the public site without hard-coding an unverified domain", () => {
  assert.match(robots, /^User-agent: \*/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.doesNotMatch(robots, /Sitemap:\s+https?:\/\//i);
});
