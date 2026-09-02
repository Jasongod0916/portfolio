const resolveHeroWheelInput = ({
  titlesReady,
  nameRevealed,
  descriptionReady,
  waterStage,
  direction,
  waterStageCount = 5,
}) => {
  if (waterStage >= waterStageCount) {
    return { locked: false, action: "release" };
  }

  if (direction < 0) {
    if (waterStage <= 0) {
      return { locked: false, action: "none" };
    }

    return {
      locked: true,
      action: "empty",
      nextWaterStage: Math.max(0, waterStage - 1),
    };
  }

  if (!titlesReady) {
    return { locked: true, action: "wait" };
  }

  if (!nameRevealed) {
    return { locked: true, action: "reveal-name" };
  }

  if (!descriptionReady) {
    return { locked: true, action: "wait" };
  }

  if (waterStage < waterStageCount) {
    return {
      locked: true,
      action: "fill",
      nextWaterStage: waterStage + 1,
    };
  }

  return { locked: false, action: "release" };
};

const revealItems = document.querySelectorAll(".scroll-reveal");
const siteHeader = document.querySelector(".site-header");
const aboutSection = document.querySelector("#about");
const projectsSection = document.querySelector("#projects");
const heroSection = document.querySelector(".hero-section");
const heroCard = document.querySelector(".hero-card");
const heroTitleFirst = document.querySelector(".hero-title-line-first");
const heroTitleSecond = document.querySelector(".hero-title-line-second");
const heroDescription = document.querySelector(".hero-description");
const waterStageCount = 5;
const reducedMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

const heroState = {
  titlesReady: false,
  nameRevealed: false,
  nameAnimationComplete: false,
  descriptionReady: false,
  waterStage: 0,
  released: false,
};

let previousWaterStage = -1;
let wheelAccumulator = 0;
let precisionWheelLockUntil = 0;
let nameAnimationCountdown = 0;

const setHeroWaterStage = (stage) => {
  if (stage === previousWaterStage) {
    return;
  }

  previousWaterStage = stage;
  heroSection?.dispatchEvent(
    new CustomEvent("hero-water-stage", {
      detail: { stage, level: stage / waterStageCount },
    }),
  );
};

const applyHeroState = () => {
  if (!heroSection) {
    return;
  }

  heroSection.classList.toggle("is-intro-visible", heroState.nameRevealed);
  heroSection.classList.toggle(
    "is-description-ready",
    heroState.descriptionReady,
  );
  heroSection.classList.toggle(
    "is-description-glowing",
    heroState.waterStage >= 2,
  );
  heroSection.classList.toggle("is-water-started", heroState.waterStage > 0);
  heroSection.classList.toggle(
    "is-water-full",
    heroState.waterStage === waterStageCount,
  );
  heroSection.dataset.waterStage = String(heroState.waterStage);
  setHeroWaterStage(heroState.waterStage);
};

const updateHeroStoryHeight = () => {
  if (!heroSection || !heroCard) {
    return;
  }

  const stickyTop = siteHeader?.offsetHeight ?? 72;
  const style = getComputedStyle(heroSection);
  const verticalPadding =
    (parseFloat(style.paddingTop) || 0) +
    (parseFloat(style.paddingBottom) || 0);
  const storyHeight = heroCard.offsetHeight + stickyTop + verticalPadding + 24;
  heroSection.style.setProperty(
    "--hero-story-height",
    `${Math.ceil(storyHeight)}px`,
  );
};

const markTitlesReady = () => {
  if (heroState.titlesReady) {
    return;
  }

  heroState.titlesReady = true;
  heroSection.dataset.titlesReady = "true";
};

const revealSecondTitle = () => {
  if (heroSection.classList.contains("is-second-line-visible")) {
    return;
  }

  heroSection.classList.add("is-second-line-visible");
  window.setTimeout(markTitlesReady, reducedMotionQuery.matches ? 0 : 900);
};

const beginTitleSequence = () => {
  if (!heroSection) {
    return;
  }

  document.documentElement.classList.add("hero-story-locked");
  applyHeroState();

  if (reducedMotionQuery.matches) {
    heroSection.classList.add(
      "is-first-line-visible",
      "is-second-line-visible",
    );
    markTitlesReady();
    return;
  }

  requestAnimationFrame(() => {
    heroSection.classList.add("is-first-line-visible");
  });
  window.setTimeout(revealSecondTitle, 900);
};

heroTitleFirst?.addEventListener("transitionend", (event) => {
  if (event.propertyName === "transform") {
    revealSecondTitle();
  }
});

heroTitleSecond?.addEventListener("transitionend", (event) => {
  if (event.propertyName === "transform") {
    markTitlesReady();
  }
});

const markDescriptionReady = () => {
  if (
    !heroSection ||
    !heroState.nameRevealed ||
    !heroState.nameAnimationComplete ||
    heroState.descriptionReady
  ) {
    return;
  }

  heroState.descriptionReady = true;
  heroSection.dataset.descriptionReady = "true";
  applyHeroState();
};

const completeNameAnimation = () => {
  if (heroState.nameAnimationComplete) {
    return;
  }

  heroState.nameAnimationComplete = true;

  if (reducedMotionQuery.matches) {
    markDescriptionReady();
    return;
  }

  window.setTimeout(markDescriptionReady, 200);
};

const watchNameAnimation = () => {
  const leftPart = document.querySelector(".hero-name-part-left");
  const rightPart = document.querySelector(".hero-name-part-right");

  if (!leftPart || !rightPart) {
    completeNameAnimation();
    return;
  }

  nameAnimationCountdown = 0;
  const onNameAnimationEnd = () => {
    nameAnimationCountdown += 1;
    if (nameAnimationCountdown >= 2) {
      completeNameAnimation();
    }
  };

  leftPart.addEventListener("animationend", onNameAnimationEnd, { once: true });
  rightPart.addEventListener("animationend", onNameAnimationEnd, {
    once: true,
  });
};

heroDescription?.addEventListener("transitionend", (event) => {
  if (event.propertyName === "transform" && heroState.nameRevealed) {
    markDescriptionReady();
  }
});

const revealName = () => {
  if (heroState.nameRevealed) {
    return;
  }

  heroState.nameRevealed = true;
  applyHeroState();
  watchNameAnimation();
};

const normalizeWheelStep = (event) => {
  const normalizedDelta =
    event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
  const direction = Math.sign(normalizedDelta);
  const isMouseWheel = Math.abs(normalizedDelta) >= 60;

  if (isMouseWheel) {
    wheelAccumulator = 0;
    return direction;
  }

  wheelAccumulator += normalizedDelta;
  if (
    Math.abs(wheelAccumulator) < 60 ||
    performance.now() < precisionWheelLockUntil
  ) {
    return 0;
  }

  precisionWheelLockUntil = performance.now() + 240;
  const stepDirection = Math.sign(wheelAccumulator);
  wheelAccumulator = 0;
  return stepDirection;
};

const handleHeroWheel = (event) => {
  if (!heroSection || Math.abs(event.deltaY) < 0.5) {
    return;
  }

  if (
    (window.scrollY > 0 || document.documentElement.scrollTop > 0) &&
    !heroState.released
  ) {
    event.preventDefault();
    resetPageToTop();
    return;
  }

  const rawDirection = Math.sign(event.deltaY);

  const decision = resolveHeroWheelInput({
    ...heroState,
    direction: rawDirection,
    waterStageCount,
  });

  if (decision.locked) {
    event.preventDefault();
  }

  if (decision.action === "wait") {
    wheelAccumulator = 0;
    return;
  }

  if (decision.action === "none") {
    heroState.released = false;
    document.documentElement.classList.add("hero-story-locked");
    return;
  }

  if (decision.action === "release") {
    heroState.released = true;
    document.documentElement.classList.remove("hero-story-locked");
    return;
  }

  const direction = normalizeWheelStep(event);
  if (decision.action === "fill" && direction <= 0) {
    return;
  }

  if (decision.action === "empty" && direction >= 0) {
    return;
  }

  if (decision.action === "reveal-name") {
    revealName();
    return;
  }

  if (decision.action === "fill" || decision.action === "empty") {
    heroState.waterStage = decision.nextWaterStage;
    applyHeroState();

    if (heroState.waterStage === waterStageCount) {
      heroState.released = true;
      document.documentElement.classList.remove("hero-story-locked");
    } else {
      heroState.released = false;
      document.documentElement.classList.add("hero-story-locked");
    }
  }
};

const resetPageToTop = () => {
  if (window.scrollY > 0 || document.documentElement.scrollTop > 0) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
};

resetPageToTop();
beginTitleSequence();
updateHeroStoryHeight();
window.addEventListener("wheel", handleHeroWheel, { passive: false });
window.addEventListener("resize", updateHeroStoryHeight);

const updateHeaderState = () => {
  if (!siteHeader || !aboutSection) {
    return;
  }

  const aboutStart = aboutSection.offsetTop - siteHeader.offsetHeight;
  siteHeader.classList.toggle("is-about-nav", window.scrollY >= aboutStart);

  if (projectsSection) {
    const projectsStart = projectsSection.offsetTop - siteHeader.offsetHeight;
    siteHeader.classList.toggle(
      "is-project-nav",
      window.scrollY >= projectsStart,
    );
  }
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("resize", updateHeaderState);

if (!("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
document.querySelectorAll("[data-scroll-story]").forEach((story) => {
  const steps = Array.from(story.querySelectorAll("[data-story-step]"));

  if (!steps.length) return;

  let activeIndex = 0;
  let wheelLockedUntil = 0;
  let storyFocusSince = 0;
  let storyFocusActive = false;

  const updateFocusState = () => {
    const rect = story.getBoundingClientRect();
    const focusTop = window.innerHeight * 0.18;
    const focusBottom = window.innerHeight * 0.9;
    const inFocus =
      rect.top < focusBottom && rect.bottom > focusTop && rect.height > 240;

    if (inFocus) {
      if (!storyFocusActive) {
        storyFocusActive = true;
        storyFocusSince = performance.now();
      }
    } else {
      storyFocusActive = false;
      storyFocusSince = 0;
    }
  };

  const canSwitchStep = () => {
    if (!storyFocusActive) {
      return false;
    }

    return performance.now() - storyFocusSince >= 900;
  };

  const activateStep = (index) => {
    const nextIndex = Math.max(0, Math.min(steps.length - 1, index));
    const nextStep = steps[nextIndex];

    activeIndex = nextIndex;
    story.dataset.activeIndex = String(activeIndex);
    steps.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === nextIndex);
    });

    storyFocusSince = performance.now();

    const device = nextStep?.querySelector(".story-device");
    const status = device?.querySelector(".care-status");
    const message = device?.querySelector(".care-message");

    if (!device || !status || !message) return;

    device.classList.add("is-changing");
    window.setTimeout(() => {
      status.textContent = nextStep.dataset.status;
      message.textContent = nextStep.dataset.message;
      device.classList.remove("is-changing");
    }, 180);
  };

  window.addEventListener("scroll", updateFocusState, { passive: true });
  window.addEventListener("resize", updateFocusState, { passive: true });

  if (window.Swiper) {
    const storySwiper = new Swiper(
      story.querySelector(".project-story-steps"),
      {
        allowTouchMove: false,
        speed: 420,
        slidesPerView: 1,
        watchOverflow: false,
        pagination: {
          el: story.querySelector(".story-pagination"),
          type: "bullets",
          dynamicBullets: false,
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        },
        on: {
          init: (swiper) => activateStep(swiper.activeIndex),
          slideChange: (swiper) => activateStep(swiper.activeIndex),
        },
      },
    );

    if (
      storySwiper &&
      storySwiper.pagination &&
      storySwiper.pagination.bullets
    ) {
      storySwiper.pagination.bullets.forEach((bullet, index) => {
        bullet.setAttribute("data-page", String(index));
      });
    }
  }

  story.setAttribute("aria-live", "polite");
  updateFocusState();
  activateStep(0);
});
const stickerStories = document.querySelectorAll("[data-sticker-story]");
const stickerContent = [
  ["01", "看見問題", "從複雜情境中，找到真正值得解決的問題。"],
  ["02", "整合技術", "讓 AI、介面與資料流程，共同服務同一個目標。"],
  ["03", "完成產品", "把概念落實成能操作、能展示，也真正可用的成果。"],
];

const updateStickerStories = () => {
  stickerStories.forEach((story) => {
    const stagePoint = window.scrollY + window.innerHeight * 0.5;
    const progress = Math.min(
      0.999,
      Math.max(0, (stagePoint - story.offsetTop) / story.offsetHeight),
    );
    const activeIndex = Math.min(2, Math.floor(progress * 3));
    const images = story.querySelectorAll(".sticker-image");
    const indicators = story.querySelectorAll(".sticker-progress i");

    images.forEach((image, index) =>
      image.classList.toggle("is-active", index === activeIndex),
    );
    indicators.forEach((item, index) =>
      item.classList.toggle("is-active", index === activeIndex),
    );
    story.querySelector("[data-sticker-index]").textContent =
      stickerContent[activeIndex][0];
    story.querySelector("[data-sticker-title]").textContent =
      stickerContent[activeIndex][1];
    story.querySelector("[data-sticker-copy]").textContent =
      stickerContent[activeIndex][2];
  });
};

updateStickerStories();
window.addEventListener("scroll", updateStickerStories, { passive: true });
window.addEventListener("resize", updateStickerStories);
