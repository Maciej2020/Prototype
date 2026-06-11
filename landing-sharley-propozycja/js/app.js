(() => {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = [...document.querySelectorAll("[data-nav-link]")];
  const navCloseLinks = [...document.querySelectorAll("[data-nav-close]")];
  const year = document.querySelector("[data-current-year]");
  const faqList = document.querySelector("[data-faq-list]");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const getMenuFocusables = () => {
    if (!nav || !navToggle) return [];
    return [navToggle, ...nav.querySelectorAll("a[href]")].filter((element) => {
      return element instanceof HTMLElement && !element.hasAttribute("disabled");
    });
  };

  const closeNavigation = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Otwórz menu");
  };

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Zamknij menu" : "Otwórz menu");

      if (isOpen) {
        nav.querySelector("a")?.focus();
      }
    });

    navCloseLinks.forEach((link) => {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", (event) => {
      const isOpen = nav.classList.contains("is-open");

      if (event.key === "Escape") {
        closeNavigation();
        if (isOpen) navToggle.focus();
        return;
      }

      if (event.key !== "Tab" || !isOpen) return;

      const focusables = getMenuFocusables();
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const sectionIds = navLinks
    .map((link) => link.getAttribute("href"))
    .filter((href) => href && href.startsWith("#") && href.length > 1);

  const sections = sectionIds
    .map((id) => document.querySelector(id))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const activeId = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === activeId;
            link.classList.toggle("is-active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-40% 0px -52% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
  }

  if (faqList) {
    faqList.addEventListener("toggle", (event) => {
      const active = event.target;
      if (!(active instanceof HTMLDetailsElement) || !active.open) return;

      faqList.querySelectorAll("details[open]").forEach((details) => {
        if (details !== active) details.removeAttribute("open");
      });
    }, true);
  }
})();
