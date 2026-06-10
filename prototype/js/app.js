// Interakcje strony: menu mobilne, stan headera, rok w stopce.
(function () {
  function init() {
    var menuButton = document.querySelector("[data-menu-button]");
    var nav = document.querySelector("[data-nav]");

    if (menuButton && nav) {
      var closeMenu = function () {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Otwórz menu");
      };

      menuButton.addEventListener("click", function () {
        var isOpen = nav.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
          "aria-label",
          isOpen ? "Zamknij menu" : "Otwórz menu",
        );
      });

      nav.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          closeMenu();
        }
      });
    }

    var header = document.querySelector("[data-header]");
    if (header) {
      var updateHeader = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      };
      updateHeader();
      window.addEventListener("scroll", updateHeader, { passive: true });
    }

    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach(function (el) {
      el.textContent = year;
    });

    initPrefetch();
  }

  // Prefetch stron tego samego pochodzenia po najechaniu/dotknięciu linku
  // (uzupełnia Speculation Rules tam, gdzie prerender nie jest wspierany).
  function initPrefetch() {
    var test = document.createElement("link");
    if (
      !test.relList ||
      !test.relList.supports ||
      !test.relList.supports("prefetch")
    ) {
      return;
    }
    var seen = {};
    var prefetch = function (url) {
      if (seen[url]) return;
      seen[url] = true;
      var link = document.createElement("link");
      link.rel = "prefetch";
      link.href = url;
      document.head.appendChild(link);
    };
    var onIntent = function (event) {
      var a = event.target.closest && event.target.closest("a[href]");
      if (!a) return;
      if (a.origin !== location.origin) return;
      if (a.protocol !== "http:" && a.protocol !== "https:") return;
      if (a.href === location.href) return;
      if (a.hash && a.pathname === location.pathname) return;
      prefetch(a.href);
    };
    document.addEventListener("pointerover", onIntent, { passive: true });
    document.addEventListener("touchstart", onIntent, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
