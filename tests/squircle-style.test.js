const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const squircle = fs.readFileSync(path.join(root, "squircle.js"), "utf8");

const token = (name) => {
  const match = styles.match(new RegExp(`${name}:\\s*([^;]+);`));
  assert.ok(match, `${name} token should exist`);
  return match[1].trim();
};

assert.match(token("--radius-xl"), /^\d+px$/);
assert.match(token("--radius-lg"), /^\d+px$/);
assert.match(token("--radius-md"), /^\d+px$/);
assert.equal(token("--squircle-smoothness"), "0.6");

assert.match(squircle, /--squircle-smoothness/);
assert.match(squircle, /cornerSmoothing/);
assert.doesNotMatch(squircle, /const exponent = 5\.6/);
assert.doesNotMatch(
  squircle,
  /"\.section-block"/,
  "layout sections should not be squircle surfaces",
);
assert.doesNotMatch(
  squircle,
  /"\.media-section"/,
  "layout sections should not be squircle surfaces",
);

assert.match(
  styles,
  /\.squircle-surface\.glass-surface\s*\{[\s\S]*?backdrop-filter:\s*none;/,
  "squircle glass parent should not own backdrop blur",
);
assert.match(
  styles,
  /\.squircle-surface\.glass-surface::before\s*\{[\s\S]*?backdrop-filter:\s*var\(--glass-blur\);/,
  "masked squircle layer should own backdrop blur",
);

assert.doesNotMatch(index, /data-squircle-radius="24"/);
assert.doesNotMatch(index, /data-squircle-radius="32"/);

console.log("squircle style checks passed");
