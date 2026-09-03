const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");

const token = (name) => {
  const match = styles.match(new RegExp(`${name}:\\s*([^;]+);`));
  assert.ok(match, `${name} token should exist`);
  return match[1].trim();
};

const ruleBody = (selector) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = styles.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`));
  assert.ok(match, `${selector} rule should exist`);
  return match[1];
};

assert.equal(token("--shape-capsule"), "999px");
assert.equal(token("--shape-circle"), "50%");

const controls = ruleBody(".gallery-bottom-controls");
assert.match(controls, /display:\s*inline-grid;/);
assert.match(controls, /grid-template-columns:\s*var\(--control-icon-size\) var\(--gallery-dot-track-width\) var\(--control-icon-size\);/);
assert.match(controls, /border-radius:\s*var\(--shape-capsule\);/);
assert.match(controls, /background:\s*var\(--glass-bg\);/);
assert.match(controls, /backdrop-filter:\s*var\(--glass-blur\);/);
assert.match(controls, /box-shadow:\s*var\(--shadow-soft\);/);

const control = ruleBody(".gallery-control");
assert.match(control, /width:\s*var\(--control-icon-size\);/);
assert.match(control, /height:\s*var\(--control-icon-size\);/);
assert.match(control, /padding:\s*0;/);
assert.match(control, /border-radius:\s*var\(--shape-circle\);/);
assert.match(control, /background:\s*var\(--glass-control-fill\);/);
assert.match(control, /backdrop-filter:\s*none;/);

const icon = ruleBody(".gallery-control-icon");
assert.match(icon, /position:\s*relative;/);
assert.match(icon, /z-index:\s*2;/);
assert.match(icon, /display:\s*block;/);

const iconMatches = index.match(/class="gallery-control-icon"/g) || [];
assert.equal(iconMatches.length, 4);
assert.match(index, /<span class="gallery-control-icon" aria-hidden="true">‹<\/span>/);
assert.match(index, /<span class="gallery-control-icon" aria-hidden="true">›<\/span>/);

const dot = ruleBody(".gallery-dots button");
assert.match(dot, /width:\s*var\(--gallery-dot-size\);/);
assert.match(dot, /height:\s*var\(--gallery-dot-size\);/);
assert.match(dot, /padding:\s*0;/);
assert.match(dot, /border-radius:\s*var\(--shape-capsule\);/);

const activeDot = ruleBody(".gallery-dots button.is-active");
assert.match(activeDot, /width:\s*var\(--gallery-dot-active-size\);/);
assert.match(activeDot, /height:\s*var\(--gallery-dot-active-size\);/);

const squircle = fs.readFileSync(path.join(root, "squircle.js"), "utf8");
assert.doesNotMatch(squircle, /"\.gallery-control"/);
assert.doesNotMatch(squircle, /"\.gallery-dots button"/);

console.log("gallery controls checks passed");
