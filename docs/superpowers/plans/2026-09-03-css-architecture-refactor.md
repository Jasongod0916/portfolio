# CSS Architecture Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the portfolio CSS architecture without changing current UI, animation, or behavior.

**Architecture:** Keep the static-site file structure intact and centralize repeated visual decisions into design tokens in `styles.css`. Treat glass, shape, elevation, control sizing, and motion as separate systems, then make existing components consume those tokens instead of local hard-coded values.

**Tech Stack:** Static HTML, CSS custom properties, vanilla JavaScript, Squircle.js SVG masks, Node assertion tests, in-app Browser validation.

**Spec:** User request in current thread: no visual, animation, or functional changes; improve maintainability for future AI development through Design Token, Component Architecture, and CSS Architecture.

## Global Constraints

- Do not change existing UI, animation, or function intentionally.
- Preserve the current glass visual language.
- Preserve the current squircle system and `cornerSmoothing: 0.6`.
- Keep capsule and circle shapes separate from squircle surfaces.
- Prefer tokens over repeated hard-coded values.
- Keep changes incremental inside the existing static-site architecture.

---

### Task 1: Baseline And Contract Tests

**Files:**
- Create: `tests/css-architecture.test.js`
- Modify: none

**Interfaces:**
- Consumes: `styles.css`, `squircle.js`, `index.html`, `project_1.html`, `project_2.html`
- Produces: architecture checks for token naming, component contracts, and cache version consistency

- [x] **Step 1: Write the failing test**

```js
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

assert.equal(token("--control-height-md"), "46px");
assert.equal(token("--gallery-control-size"), "44px");
assert.equal(token("--gallery-dot-size"), "8px");
assert.equal(token("--gallery-dot-active-size"), "10px");
assert.equal(token("--gallery-controls-inset"), "10px");
assert.equal(token("--component-pad-meta"), "14px 16px");
assert.equal(token("--glass-control-fill"), "rgba(255, 255, 255, 0.92)");
assert.equal(token("--glass-control-border"), "rgba(255, 255, 255, 0.78)");

console.log("css architecture checks passed");
```

- [x] **Step 2: Run test to verify it fails**

Run: `node tests/css-architecture.test.js`
Expected: FAIL because the new architecture tokens do not exist yet.

- [x] **Step 3: Implement minimal token extraction**

Add missing tokens to `:root` and replace matching existing hard-coded values without changing their computed values.

- [x] **Step 4: Run test to verify it passes**

Run: `node tests/css-architecture.test.js`
Expected: PASS.

### Task 2: Component Token Consumption

**Files:**
- Modify: `styles.css`
- Modify: `tests/css-architecture.test.js`

**Interfaces:**
- Consumes: tokens from Task 1
- Produces: `.button`, `.text-link`, `.gallery-bottom-controls`, `.gallery-control`, `.gallery-dots button`, `.meta-list div`, `.work-role` consuming shared component tokens

- [x] **Step 1: Extend tests**

Add assertions that component rules use token names instead of local hard-coded values for control height, gallery sizing, meta padding, and work-role accent border.

- [x] **Step 2: Run test to verify it fails**

Run: `node tests/css-architecture.test.js`
Expected: FAIL on rules still using literal values.

- [x] **Step 3: Replace literals with tokens**

Update CSS declarations to use the new tokens while keeping values identical.

- [x] **Step 4: Run full test suite**

Run: `node tests/css-architecture.test.js && node tests/gallery-controls.test.js && node tests/meta-list-glass.test.js && node tests/text-link-glass.test.js && node tests/squircle-style.test.js`
Expected: PASS.

### Task 3: Rendered Regression Check

**Files:**
- Modify: `index.html`, `project_1.html`, `project_2.html`

**Interfaces:**
- Consumes: updated CSS
- Produces: bumped CSS cache and Browser evidence that the UI still renders and interacts correctly

- [x] **Step 1: Bump CSS cache**

Update every page from `styles.css?v=35` to the next version.

- [x] **Step 2: Run syntax and HTTP checks**

Run: `node --check script.js`, `node --check squircle.js`, and request the local homepage.

- [x] **Step 3: Run Browser checks**

Verify homepage and Works section at `http://127.0.0.1:4173/index.html#works`: page not blank, no console errors, gallery next control changes active slide, and representative components retain their computed styles.

- [x] **Step 4: Run diff hygiene**

Run: `git diff --check -- styles.css index.html project_1.html project_2.html squircle.js tests`
Expected: no whitespace errors.
