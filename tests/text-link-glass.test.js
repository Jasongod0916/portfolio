const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const ruleBody = (selector) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = styles.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`));
  assert.ok(match, `${selector} rule should exist`);
  return match[1];
};

const textLink = (() => {
  const match = styles.match(
    /\.button-secondary,\s*\n\.text-link\s*\{([\s\S]*?)\n\}/,
  );
  assert.ok(match, ".button-secondary, .text-link rule should exist");
  return match[1];
})();
assert.match(textLink, /border-radius:\s*var\(--shape-capsule\);/);
assert.match(textLink, /border:\s*1px solid var\(--glass-border-soft\);/);
assert.match(textLink, /background:\s*var\(--glass-sheen\),\s*var\(--glass-bg\);/);
assert.match(textLink, /backdrop-filter:\s*var\(--glass-blur\);/);
assert.match(textLink, /-webkit-backdrop-filter:\s*var\(--glass-blur\);/);
assert.match(textLink, /box-shadow:\s*var\(--shadow-soft\);/);

console.log("text-link glass checks passed");
