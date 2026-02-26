// ============================================================
// MOODLE MOOT ECUADOR 2026 — main.js
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ── Navbar scroll effect ────────────────────────────────
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ── Mobile menu ─────────────────────────────────────────
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");

  hamburger?.addEventListener("click", () => {
    mobileMenu.classList.add("open");
    document.body.style.overflow = "hidden";
  });
  mobileClose?.addEventListener("click", closeMobileMenu);
  mobileMenu?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMobileMenu);
  });
  function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }

  // ── Countdown Timer ─────────────────────────────────────
  function updateCountdown() {
    const eventDate = new Date("2026-06-11T08:00:00-05:00");
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      document.getElementById("countdown")?.remove();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(val).padStart(2, "0");
    };
    set("cd-days", days);
    set("cd-hours", hours);
    set("cd-minutes", minutes);
    set("cd-seconds", seconds);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ── Scroll Reveal ───────────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  // ── Agenda Tabs ─────────────────────────────────────────
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });

  // ── FAQ Accordion ────────────────────────────────────────
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");
      // Close all
      document
        .querySelectorAll(".faq-item.open")
        .forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  // ── Smooth scroll for nav links ──────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
});
