const revealTargets = document.querySelectorAll(".reveal");

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
