const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const ruleBody = (selector) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = [
    ...styles.matchAll(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`, "g")),
  ];
  assert.ok(matches.length, `${selector} rule should exist`);
  return matches.at(-1)[1];
};

const titleHeader = ruleBody(".work-title-header");
assert.match(titleHeader, /grid-column:\s*1\s*\/\s*-1;/);

const title = ruleBody(".work-title-header .work-toggle-title");
assert.match(title, /font-size:\s*var\(--text-3xl\);/);
assert.doesNotMatch(title, /white-space:\s*nowrap;/);

console.log("work title layout checks passed");
