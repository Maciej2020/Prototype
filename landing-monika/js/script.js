/* =========================================================
   lek. Monika Bazgier — Medycyna estetyczna
   Interakcje strony (vanilla JS, bez zależności):
   menu mobilne, stan headera, scroll-spy, animacje reveal,
   lightbox galerii, walidacja formularza, rok w stopce.
   ========================================================= */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function init() {
    initMobileMenu();
    initHeaderState();
    initScrollSpy();
    initReveal();
    initLightbox();
    initContactForm();
    initYear();
  }

  /* ---------- Menu mobilne ---------- */
  function initMobileMenu() {
    var button = document.querySelector("[data-menu-button]");
    var nav = document.querySelector("[data-nav]");
    if (!button || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    }

    button.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    // Zamknij po kliknięciu w link
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    // Zamknij klawiszem Escape
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        button.focus();
      }
    });

    // Zamknij po kliknięciu poza menu (tylko na mobile)
    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (event.target.closest("[data-nav]") || event.target.closest("[data-menu-button]")) {
        return;
      }
      setOpen(false);
    });
  }

  /* ---------- Cień / stan headera przy scrollu ---------- */
  function initHeaderState() {
    var header = document.querySelector("[data-header]");
    if (!header) return;
    var update = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------- Scroll-spy: aktywny link w nawigacji ---------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('[data-navlink][href^="#"]')
    );
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = id && document.getElementById(id);
      if (section) {
        map[id] = link;
        sections.push(section);
      }
    });

    var current = null;
    var setCurrent = function (id) {
      if (current === id) return;
      current = id;
      links.forEach(function (link) {
        if (map[id] === link) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- Animacje pojawiania się ---------- */
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!items.length) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Lightbox galerii (natywny <dialog>) ---------- */
  function initLightbox() {
    var dialog = document.querySelector("[data-lightbox-dialog]");
    if (!dialog) return;

    var img = dialog.querySelector("[data-lightbox-img]");
    var closeBtn = dialog.querySelector("[data-lightbox-close]");
    var triggers = Array.prototype.slice.call(
      document.querySelectorAll("[data-lightbox]")
    );
    var hasDialog = typeof dialog.showModal === "function";

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var src = trigger.getAttribute("data-lightbox");
        var inner = trigger.querySelector("img");
        img.src = src;
        img.alt = inner ? inner.alt : "";
        if (hasDialog) {
          dialog.showModal();
        } else {
          window.open(src, "_blank", "noopener");
        }
      });
    });

    function close() {
      if (dialog.open) dialog.close();
      img.src = "";
    }

    if (closeBtn) closeBtn.addEventListener("click", close);

    // Klik w tło zamyka
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) close();
    });
    dialog.addEventListener("cancel", function () {
      img.src = "";
    });
  }

  /* ---------- Walidacja formularza + wysyłka mailto ---------- */
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    // TODO: docelowo podmień na backend / usługę (np. Formspree),
    // ustawiając action + method i usuwając obsługę mailto poniżej.
    var RECIPIENT = "kontakt@example.com";
    var statusEl = form.querySelector("[data-form-status]");

    var messages = {
      name: "Podaj imię i nazwisko.",
      email: "Podaj poprawny adres e-mail.",
      message: "Wpisz treść wiadomości.",
      consent: "Zaznacz zgodę, aby wysłać wiadomość.",
    };

    function fieldError(field, text) {
      var holder = form.querySelector('[data-error-for="' + field.id + '"]');
      if (holder) holder.textContent = text || "";
      if (text) {
        field.setAttribute("aria-invalid", "true");
      } else {
        field.removeAttribute("aria-invalid");
      }
    }

    function validate() {
      var ok = true;
      var firstInvalid = null;

      var name = form.elements["name"];
      var email = form.elements["email"];
      var message = form.elements["message"];
      var consent = form.elements["consent"];

      if (!name.value.trim()) {
        fieldError(name, messages.name);
        firstInvalid = firstInvalid || name;
        ok = false;
      } else {
        fieldError(name, "");
      }

      if (!email.validity.valid || !email.value.trim()) {
        fieldError(email, messages.email);
        firstInvalid = firstInvalid || email;
        ok = false;
      } else {
        fieldError(email, "");
      }

      if (!message.value.trim()) {
        fieldError(message, messages.message);
        firstInvalid = firstInvalid || message;
        ok = false;
      } else {
        fieldError(message, "");
      }

      if (!consent.checked) {
        fieldError(consent, messages.consent);
        firstInvalid = firstInvalid || consent;
        ok = false;
      } else {
        fieldError(consent, "");
      }

      if (firstInvalid) firstInvalid.focus();
      return ok;
    }

    function setStatus(text, type) {
      if (!statusEl) return;
      statusEl.textContent = text;
      statusEl.classList.remove("is-success", "is-error");
      if (type) statusEl.classList.add("is-" + type);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validate()) {
        setStatus("Uzupełnij zaznaczone pola.", "error");
        return;
      }

      var name = form.elements["name"].value.trim();
      var email = form.elements["email"].value.trim();
      var phone = form.elements["phone"].value.trim();
      var message = form.elements["message"].value.trim();

      var subject = "Zapytanie ze strony — " + name;
      var bodyLines = [
        "Imię i nazwisko: " + name,
        "E-mail: " + email,
        "Telefon: " + (phone || "—"),
        "",
        message,
      ];
      var href =
        "mailto:" +
        RECIPIENT +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(bodyLines.join("\n"));

      window.location.href = href;
      setStatus(
        "Otwieramy Twój program pocztowy… Jeśli się nie otworzył, napisz na " +
          RECIPIENT +
          ".",
        "success"
      );
      form.reset();
    });

    // Czyść błąd przy edycji pola
    form.addEventListener("input", function (event) {
      var t = event.target;
      if (t && t.id) fieldError(t, "");
    });
  }

  /* ---------- Rok w stopce ---------- */
  function initYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach(function (el) {
      el.textContent = year;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
