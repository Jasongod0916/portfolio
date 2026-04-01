const revealTargets = document.querySelectorAll(".reveal");
const interactiveTargets = document.querySelectorAll(
  ".project-link, .work-mini-link, .sidebar-action, .project-summary, .work-action"
);

if (!("IntersectionObserver" in window)) {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -5% 0px"
  }
);

if ("IntersectionObserver" in window) {
  revealTargets.forEach((element) => observer.observe(element));
}

interactiveTargets.forEach((element) => {
  const clearPressed = () => element.classList.remove("is-pressed");

  element.addEventListener("pointerdown", (event) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    element.style.setProperty("--press-x", `${x}px`);
    element.style.setProperty("--press-y", `${y}px`);
    element.classList.remove("is-pressed");

    window.requestAnimationFrame(() => {
      element.classList.add("is-pressed");
    });
  });

  element.addEventListener("pointerup", clearPressed);
  element.addEventListener("pointerleave", clearPressed);
  element.addEventListener("blur", clearPressed);
});
