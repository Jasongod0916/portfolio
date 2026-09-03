const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const token = (name) => {
  const match = styles.match(new RegExp(`${name}:\\s*([^;]+);`));
  assert.ok(match, `${name} token should exist`);
  return match[1].trim();
};

const ruleBody = (selector) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = [
    ...styles.matchAll(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`, "g")),
  ];
  assert.ok(matches.length, `${selector} rule should exist`);
  return matches.at(-1)[1];
};

assert.equal(token("--control-height-md"), "46px");
assert.equal(token("--control-pad-x-md"), "18px");
assert.equal(token("--control-icon-size"), "44px");
assert.equal(token("--gallery-controls-inset"), "10px");
assert.equal(token("--gallery-controls-gap"), "10px");
assert.equal(token("--gallery-controls-padding"), "6px");
assert.equal(token("--gallery-dot-size"), "8px");
assert.equal(token("--gallery-dot-active-size"), "10px");
assert.equal(token("--gallery-dot-track-width"), "28px");
assert.equal(token("--component-pad-meta"), "14px 16px");
assert.equal(token("--component-gap-compact"), "12px");
assert.equal(token("--accent-rule-width"), "3px");
assert.equal(token("--accent-rule-color"), "rgba(184, 92, 44, 0.22)");
assert.equal(token("--glass-control-fill"), "rgba(255, 255, 255, 0.92)");
assert.equal(token("--glass-control-border"), "rgba(255, 255, 255, 0.78)");
assert.match(
  token("--glass-control-shadow"),
  /inset 0 1px 0 rgba\(255, 255, 255, 0\.9\),\s*0 8px 20px rgba\(31, 36, 48, 0\.08\)/,
);

const controlBase = ruleBody(".button,\n.text-link");
assert.match(controlBase, /min-height:\s*var\(--control-height-md\);/);
assert.match(controlBase, /padding:\s*0 var\(--control-pad-x-md\);/);

const galleryControls = ruleBody(".gallery-bottom-controls");
assert.match(galleryControls, /bottom:\s*var\(--gallery-controls-inset\);/);
assert.match(galleryControls, /grid-template-columns:\s*var\(--control-icon-size\) var\(--gallery-dot-track-width\) var\(--control-icon-size\);/);
assert.match(galleryControls, /gap:\s*var\(--gallery-controls-gap\);/);
assert.match(galleryControls, /padding:\s*var\(--gallery-controls-padding\);/);

const galleryControl = ruleBody(".gallery-control");
assert.match(galleryControl, /width:\s*var\(--control-icon-size\);/);
assert.match(galleryControl, /height:\s*var\(--control-icon-size\);/);
assert.match(galleryControl, /border:\s*1px solid var\(--glass-control-border\);/);
assert.match(galleryControl, /background:\s*var\(--glass-control-fill\);/);
assert.match(galleryControl, /box-shadow:\s*var\(--glass-control-shadow\);/);

const galleryDots = ruleBody(".gallery-dots");
assert.match(galleryDots, /gap:\s*var\(--gallery-dot-gap\);/);
assert.match(galleryDots, /min-width:\s*var\(--gallery-dot-track-width\);/);

const dot = ruleBody(".gallery-dots button");
assert.match(dot, /width:\s*var\(--gallery-dot-size\);/);
assert.match(dot, /height:\s*var\(--gallery-dot-size\);/);

const activeDot = ruleBody(".gallery-dots button.is-active");
assert.match(activeDot, /width:\s*var\(--gallery-dot-active-size\);/);
assert.match(activeDot, /height:\s*var\(--gallery-dot-active-size\);/);

const metaItem = ruleBody(".meta-list div");
assert.match(metaItem, /gap:\s*var\(--space-2xs\);/);
assert.match(metaItem, /padding:\s*var\(--component-pad-meta\);/);

const metaGlass = ruleBody(".meta-list div.glass-surface");
assert.match(metaGlass, /padding:\s*var\(--component-pad-meta\);/);

const workRole = ruleBody(".work-role");
assert.match(workRole, /padding-left:\s*var\(--component-pad-role\);/);
assert.match(workRole, /border-left:\s*var\(--accent-rule-width\) solid var\(--accent-rule-color\);/);

console.log("css architecture checks passed");
