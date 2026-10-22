'use strict';

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const currentYear = document.getElementById('currentYear');

if (currentYear) currentYear.textContent = new Date().getFullYear();

function closeMenu() {
  if (!menuToggle || !navLinks) return;
  menuToggle.classList.remove('active');
  navLinks.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const shouldOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.classList.toggle('active', shouldOpen);
    navLinks.classList.toggle('is-open', shouldOpen);
    menuToggle.setAttribute('aria-expanded', String(shouldOpen));
    menuToggle.setAttribute('aria-label', shouldOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    if (history.replaceState) history.replaceState(null, '', targetId);
  });
});
