/**
 * nav.js — Mobile menu toggle + active section highlight.
 */

export function initNav() {
  const toggle = document.getElementById('navToggle');
  const list = document.getElementById('navList');

  if (!toggle || !list) {
    console.warn('[nav] toggle or list not found');
    return;
  }

  toggle.addEventListener('click', () => {
    const isOpen = list.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  list.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      list.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  initActiveLink();
}

function initActiveLink() {
  const links = document.querySelectorAll('.nav__link');
  const sections = Array.from(links)
    .map((l) => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  if (sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) =>
            l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`)
          );
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
}
