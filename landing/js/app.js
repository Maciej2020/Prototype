// =========================================================
// Monika Bazgier — landing (single page)
// Vanilla JS: menu mobilne, stan headera, scroll-spy,
// reveal przy scrollu, akordeon FAQ, sticky CTA, rok w stopce.
// =========================================================
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // ---------- Menu mobilne ----------
  function initMobileNav() {
    var button = document.querySelector("[data-menu-button]");
    var nav = document.querySelector("[data-mobile-nav]");
    if (!button || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    }

    button.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        button.focus();
      }
    });
  }

  // ---------- Stan headera + sticky CTA ----------
  function initScrollState() {
    var header = document.querySelector("[data-header]");
    var sticky = document.querySelector("[data-sticky-cta]");

    function update() {
      var y = window.scrollY;
      if (header) header.classList.toggle("is-scrolled", y > 8);
      if (sticky) {
        var show = y > 600;
        sticky.classList.toggle("is-visible", show);
        sticky.setAttribute("aria-hidden", String(!show));
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  // ---------- Scroll-spy (podświetlenie aktywnej sekcji) ----------
  function initScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll(".site-nav__list a[href^='#']"),
    );
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (section) {
        map[id] = link;
        sections.push(section);
      }
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            links.forEach(function (l) {
              l.removeAttribute("aria-current");
            });
            var active = map[entry.target.id];
            if (active) active.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ---------- Reveal przy scrollu ----------
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  // ---------- Akordeon FAQ ----------
  function initFaq() {
    var root = document.querySelector("[data-faq]");
    if (!root) return;

    var buttons = Array.prototype.slice.call(
      root.querySelectorAll(".faq__q"),
    );

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var item = button.closest(".faq__item");
        var expanded = button.getAttribute("aria-expanded") === "true";

        buttons.forEach(function (other) {
          if (other !== button) {
            other.setAttribute("aria-expanded", "false");
            var otherItem = other.closest(".faq__item");
            if (otherItem) otherItem.classList.remove("is-open");
          }
        });

        button.setAttribute("aria-expanded", String(!expanded));
        if (item) item.classList.toggle("is-open", !expanded);
      });
    });
  }

  // ---------- Rok w stopce ----------
  function initYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach(function (el) {
      el.textContent = year;
    });
  }

  function init() {
    initMobileNav();
    initScrollState();
    initScrollSpy();
    initReveal();
    initFaq();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
