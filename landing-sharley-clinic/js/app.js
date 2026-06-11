(function () {
  "use strict";

  var doc = document;

  /* Mobile nav toggle */
  var button = doc.querySelector("[data-menu-button]");
  var nav = doc.querySelector("[data-nav]");

  function closeNav() {
    if (!nav || !button) return;
    nav.setAttribute("data-open", "false");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Otwórz menu");
  }

  if (button && nav) {
    button.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      button.setAttribute("aria-expanded", String(!open));
      button.setAttribute("aria-label", open ? "Otwórz menu" : "Zamknij menu");
    });

    nav.querySelectorAll("[data-navlink]").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* Footer year */
  var yearEl = doc.querySelector("[data-current-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Header shadow on scroll */
  var header = doc.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      header.setAttribute("data-scrolled", String(window.scrollY > 8));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Reveal on scroll */
  var revealEls = Array.prototype.slice.call(doc.querySelectorAll("[data-reveal]"));
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var io = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    }
  }

  /* Active nav link via section observer */
  var navLinks = Array.prototype.slice.call(doc.querySelectorAll("[data-navlink]"));
  var sections = navLinks
    .map(function (l) {
      var id = (l.getAttribute("href") || "").replace("#", "");
      return id ? doc.getElementById(id) : null;
    })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (l) {
            var match = l.getAttribute("href") === "#" + entry.target.id;
            if (match) {
              l.setAttribute("aria-current", "true");
            } else {
              l.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  /* Contact form validation */
  var form = doc.querySelector("[data-form]");
  if (form) {
    var status = form.querySelector("[data-status]");

    var setError = function (input, msg) {
      var err = input.parentElement.querySelector("[data-error]");
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg || "";
      return !msg;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#cf-name");
      var contact = form.querySelector("#cf-contact");
      var ok = true;

      if (!name.value.trim()) {
        ok = setError(name, "Podaj imię i nazwisko.") && ok;
      } else {
        setError(name, "");
      }

      var val = contact.value.trim();
      var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      var isPhone = /^[+\d][\d\s-]{6,}$/.test(val);
      if (!val) {
        ok = setError(contact, "Podaj e-mail lub telefon.") && ok;
      } else if (!isEmail && !isPhone) {
        ok = setError(contact, "Podaj poprawny e-mail lub numer telefonu.") && ok;
      } else {
        setError(contact, "");
      }

      if (!ok) {
        if (status) {
          status.setAttribute("data-state", "error");
          status.textContent = "Popraw zaznaczone pola.";
        }
        return;
      }

      if (status) {
        status.setAttribute("data-state", "ok");
        status.textContent = "Dziękuję! Zgłoszenie zostało przyjęte — odezwę się wkrótce.";
      }
      form.reset();
    });
  }
})();
