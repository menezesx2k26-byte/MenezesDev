import assert from "node:assert/strict";
import { test } from "node:test";

import { formatFromOutputPath, validateBackground, validateSize } from "../dist/core/validators.js";

test("validateSize accepts GPT Image 2-compatible arbitrary dimensions", () => {
  assert.equal(validateSize("1536x960"), "1536x960");
  assert.equal(validateSize("auto"), "auto");
});

test("validateSize rejects non-multiple-of-16 and extreme ratios", () => {
  assert.throws(() => validateSize("1537x960"), /divisible by 16/);
  assert.throws(() => validateSize("3072x512"), /between 1:3 and 3:1/);
});

test("gpt-image-2 transparent background is blocked before API usage", () => {
  assert.throws(
    () => validateBackground("transparent", "webp", "gpt-image-2"),
    /does not support transparent backgrounds/,
  );
});

test("raster pipeline refuses SVG output", () => {
  assert.throws(() => formatFromOutputPath("public/assets/demos/m47/logo.svg"), /SVG output is not generated/);
});
