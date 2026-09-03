const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const squircle = fs.readFileSync(path.join(root, "squircle.js"), "utf8");

const ruleBody = (selector) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = styles.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`));
  assert.ok(match, `${selector} rule should exist`);
  return match[1];
};

const metaGlass = ruleBody(".meta-list div.glass-surface");
assert.match(metaGlass, /background:\s*transparent;/);
assert.match(metaGlass, /border-radius:\s*var\(--radius-md\);/);
assert.doesNotMatch(metaGlass, /border-radius:\s*0;/);

const metaSquircle = ruleBody(".meta-list div.squircle-surface");
assert.match(metaSquircle, /--squircle-fill:\s*var\(--glass-bg\);/);
assert.match(metaSquircle, /--squircle-stroke:\s*var\(--glass-border-soft\);/);
assert.match(metaSquircle, /--squircle-filter-shadow:\s*var\(--shadow-drop\);/);
assert.match(metaSquircle, /--squircle-inner-shadow:\s*var\(--glass-inner-shadow\);/);

assert.match(squircle, /"\.meta-list div"/);
const supportsBlock = styles.match(
  /@supports \(corner-shape: squircle\) \{([\s\S]*?)\n\}/,
);
assert.ok(supportsBlock, "corner-shape fallback block should exist");
assert.doesNotMatch(supportsBlock[1], /\.gallery-dots button/);

const metaItemMatches =
  index.match(/class="(?:meta-list-wide )?glass-surface squircle-surface"/g) ||
  [];
assert.ok(metaItemMatches.length >= 6);

console.log("meta-list glass checks passed");
