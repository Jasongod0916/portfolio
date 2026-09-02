(() => {
  const SURFACE_SELECTORS = [
    ".hero-section",
    ".project-hero",
    ".detail-card",
    ".spotlight-card",
    ".project-card",
    ".work-toggle",
    ".work-card",
    ".certificate-card",
    ".contact-card",
    ".squircle-test-card",
    ".project-pill",
    ".meta-list div",
    ".photo-card",
    ".media-frame",
    ".certificate-preview",
    ".work-gallery .gallery-track",
    ".gallery-control",
    ".gallery-dots button",
  ];

  const DIRECT_MASK_SELECTORS = [".work-card-image", ".project-video"];
  const EXCLUDED_SELECTORS = [".button-primary"];
  const fillMaskCache = new Map();
  const strokeMaskCache = new Map();
  const DEFAULT_CORNER_SMOOTHING = 0.6;
  const stepsPerCorner = 36;

  const canUseMask =
    typeof CSS !== "undefined" &&
    (CSS.supports("mask-image", "linear-gradient(#000, #000)") ||
      CSS.supports("-webkit-mask-image", "linear-gradient(#000, #000)"));

  if (!canUseMask) return;

  const numberFromCss = (value) => {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const cornerSmoothingFor = (element) => {
    const style = getComputedStyle(element);
    const customValue = style.getPropertyValue("--squircle-smoothness");
    const parsed = Number.parseFloat(customValue);
    const cornerSmoothing = Number.isFinite(parsed)
      ? parsed
      : DEFAULT_CORNER_SMOOTHING;
    return clamp(cornerSmoothing, 0, 1);
  };

  const exponentFor = (cornerSmoothing) => 2 + cornerSmoothing * 6;

  const point = (cx, cy, radius, angle, exponent) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = cx + radius * Math.sign(cos) * Math.abs(cos) ** (2 / exponent);
    const y = cy + radius * Math.sign(sin) * Math.abs(sin) ** (2 / exponent);
    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  };

  const cornerPoints = (cx, cy, radius, startAngle, endAngle, exponent) => {
    const points = [];
    for (let step = 1; step <= stepsPerCorner; step += 1) {
      const progress = step / stepsPerCorner;
      const angle = startAngle + (endAngle - startAngle) * progress;
      points.push(point(cx, cy, radius, angle, exponent));
    }
    return points;
  };

  const buildPath = (width, height, radius, cornerSmoothing) => {
    const exponent = exponentFor(cornerSmoothing);
    const right = width - radius;
    const bottom = height - radius;
    const commands = [
      `M ${radius.toFixed(2)} 0`,
      `L ${right.toFixed(2)} 0`,
      ...cornerPoints(right, radius, radius, -Math.PI / 2, 0, exponent).map(
        (p) => `L ${p}`,
      ),
      `L ${width.toFixed(2)} ${bottom.toFixed(2)}`,
      ...cornerPoints(right, bottom, radius, 0, Math.PI / 2, exponent).map(
        (p) => `L ${p}`,
      ),
      `L ${radius.toFixed(2)} ${height.toFixed(2)}`,
      ...cornerPoints(
        radius,
        bottom,
        radius,
        Math.PI / 2,
        Math.PI,
        exponent,
      ).map((p) => `L ${p}`),
      `L 0 ${radius.toFixed(2)}`,
      ...cornerPoints(
        radius,
        radius,
        radius,
        Math.PI,
        (Math.PI * 3) / 2,
        exponent,
      ).map((p) => `L ${p}`),
      "Z",
    ];
    return commands.join(" ");
  };

  const maskFor = (width, height, radius, cornerSmoothing) => {
    const key = `${width}x${height}r${radius}s${cornerSmoothing}`;
    if (fillMaskCache.has(key)) return fillMaskCache.get(key);

    const path = buildPath(width, height, radius, cornerSmoothing);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><path fill="black" d="${path}"/></svg>`;
    const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    fillMaskCache.set(key, url);
    return url;
  };

  const strokeMaskFor = (width, height, radius, cornerSmoothing) => {
    const key = `${width}x${height}r${radius}s${cornerSmoothing}`;
    if (strokeMaskCache.has(key)) return strokeMaskCache.get(key);

    const inset = 0.75;
    const path = buildPath(
      Math.max(width - inset * 2, 1),
      Math.max(height - inset * 2, 1),
      Math.max(radius - inset, 0),
      cornerSmoothing,
    );
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><path transform="translate(${inset} ${inset})" fill="none" stroke="black" stroke-width="1.5" d="${path}"/></svg>`;
    const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    strokeMaskCache.set(key, url);
    return url;
  };

  const radiusFor = (element, width, height) => {
    // Check for data-squircle-radius attribute first
    const dataRadius = element.dataset.squircleRadius;
    if (dataRadius) {
      const radius = numberFromCss(dataRadius);
      if (radius > 0) {
        return Math.max(0, Math.min(radius, width / 2, height / 2));
      }
    }

    // Fall back to CSS border-radius
    const style = getComputedStyle(element);
    const candidates = [
      style.borderTopLeftRadius,
      style.borderTopRightRadius,
      style.borderBottomRightRadius,
      style.borderBottomLeftRadius,
    ].map(numberFromCss);
    const radius = Math.max(...candidates, 0);
    return Math.max(0, Math.min(radius, width / 2, height / 2));
  };

  const applyMask = (element) => {
    const rect = element.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    if (width < 2 || height < 2) return;

    const radius = Math.round(radiusFor(element, width, height));
    if (radius < 2) return;
    const cornerSmoothing = cornerSmoothingFor(element);

    element.style.setProperty(
      "--squircle-mask",
      maskFor(width, height, radius, cornerSmoothing),
    );
    element.style.setProperty(
      "--squircle-stroke-mask",
      strokeMaskFor(width, height, radius, cornerSmoothing),
    );
  };

  const shouldSkip = (element) =>
    EXCLUDED_SELECTORS.some((selector) => element.matches(selector));

  const collectTargets = () => {
    const surfaceTargets = SURFACE_SELECTORS.flatMap((selector) =>
      [...document.querySelectorAll(selector)].filter(
        (element) => !shouldSkip(element),
      ),
    );
    const directTargets = DIRECT_MASK_SELECTORS.flatMap((selector) => [
      ...document.querySelectorAll(selector),
    ]);

    surfaceTargets.forEach((element) =>
      element.classList.add("squircle-surface"),
    );
    directTargets.forEach((element) =>
      element.classList.add("squircle-mask-direct"),
    );

    return [...new Set([...surfaceTargets, ...directTargets])];
  };

  const targets = collectTargets();
  targets.forEach(applyMask);
  document.documentElement.classList.add("squircle-ready");

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => applyMask(entry.target));
  });

  targets.forEach((element) => observer.observe(element));
})();
