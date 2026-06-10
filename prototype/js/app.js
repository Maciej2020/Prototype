// Interakcje uruchamiane po wstrzyknięciu wspólnego layoutu.
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
  }

  document.addEventListener("layout:ready", init);
})();
