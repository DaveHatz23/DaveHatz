/* main.js — lightweight interactions for Dave Hatz personal site */

(function () {
  "use strict";

  // ── Dynamic copyright year ────────────────────────────────────────────────
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ── Header shadow on scroll ───────────────────────────────────────────────
  const header = document.querySelector(".site-header");
  function updateHeader() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 10);
    }
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader(); // run once on load

  // ── Active nav link highlight (IntersectionObserver) ─────────────────────
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              const matches = link.getAttribute("href") === "#" + id;
              link.classList.toggle("active", matches);
            });
          }
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
  }
})();
