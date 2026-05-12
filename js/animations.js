/**
 * animations.js — Fade-in on scroll using IntersectionObserver.
 */

export function initAnimations(selector = '.fade-in') {
  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll(selector).forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const els = document.querySelectorAll(selector);
  if (els.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  els.forEach((el) => observer.observe(el));
}

/**
 * Add fade-in class to all top-level cards/sections (auto-tagging helper).
 */
export function autoTagFadeIn() {
  document.querySelectorAll('.tech__card, .section-head').forEach((el) => {
    el.classList.add('fade-in');
  });
}
