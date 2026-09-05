import test from "node:test";
import assert from "node:assert/strict";
import { skyAtProgress } from "../src/lib/sky.js";

test("journey reaches dawn, day, dusk and night in order", () => {
  assert.deepEqual(skyAtProgress(0), { dawn: 1, day: 0, dusk: 0, night: 0 });
  assert.deepEqual(skyAtProgress(0.3), { dawn: 1, day: 1, dusk: 0, night: 0 });
  assert.deepEqual(skyAtProgress(0.7), { dawn: 1, day: 1, dusk: 1, night: 0 });
  assert.deepEqual(skyAtProgress(1), { dawn: 1, day: 1, dusk: 1, night: 1 });
});

test("stacked sky never exposes a transparent gap during crossfades", () => {
  for (let step = 0; step <= 1000; step++) {
    const layers = Object.values(skyAtProgress(step / 1000));
    assert.ok(layers.every((opacity) => opacity >= 0 && opacity <= 1));
    assert.equal(layers.reduce((transparent, opacity) => transparent * (1 - opacity), 1), 0);
  }
});

test("sky clamps overscroll and tolerates unavailable progress", () => {
  assert.deepEqual(skyAtProgress(-1), skyAtProgress(0));
  assert.deepEqual(skyAtProgress(2), skyAtProgress(1));
  assert.deepEqual(skyAtProgress(NaN), skyAtProgress(0));
});
