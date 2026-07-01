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

      // Escape zamyka menu i przywraca fokus na przycisk; klik poza panelem
      // również je zamyka — standardowe zachowanie rozwijanego menu.
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && nav.classList.contains("is-open")) {
          closeMenu();
          menuButton.focus();
        }
      });

      document.addEventListener("click", function (event) {
        if (!nav.classList.contains("is-open")) return;
        if (nav.contains(event.target) || menuButton.contains(event.target)) {
          return;
        }
        closeMenu();
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
    initCertsCarousel();
  }

  // Karuzela certyfikatów w sekcji "O mnie", zbudowana na bibliotece
  // Splide (https://splidejs.com/), na wzór techniczny jej przykładu
  // "Auto Width/Height": szerokość i wysokość każdego slajdu wynika z
  // jego własnej zawartości (autoWidth/autoHeight), a nie ze sztywnej,
  // jednakowej kolumny.
  // - "focus: center" + "type: loop" dają natywne, nieskończone przewijanie
  //   z aktywnym certyfikatem zawsze na środku — Splide sam dba o klony
  //   slajdów na granicach pętli, więc nie trzeba już ręcznie duplikować
  //   węzłów DOM ani liczyć aktywnego indeksu.
  // - Wbudowany moduł Autoplay przewija karuzelę samodzielnie i pauzuje po
  //   najechaniu/wejściu focusem (pauseOnHover/pauseOnFocus); dodatkowo
  //   pauzujemy go też na czas otwartego popupu z podglądem certyfikatu.
  // - Przy włączonym "prefers-reduced-motion" autoplay w ogóle się nie
  //   uruchamia.
  // - Klasę "is-active", którą Splide sam nakłada na bieżący slajd,
  //   wykorzystujemy do efektu powiększenia (o 20%) i ramki wokół aktywnego
  //   certyfikatu.
  // - Kliknięcie certyfikatu otwiera natywny <dialog> z powiększonym
  //   zdjęciem, strzałkami do przewijania i paskiem miniaturek wszystkich
  //   certyfikatów, na wyszarzonym tle strony.
  function initCertsCarousel() {
    var splideRoot = document.getElementById("certs-splide");
    if (!splideRoot || typeof Splide === "undefined") return;

    var wrapper = splideRoot.closest(".certs-carousel");
    var prevBtn = wrapper ? wrapper.querySelector("[data-certs-prev]") : null;
    var nextBtn = wrapper ? wrapper.querySelector("[data-certs-next]") : null;

    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Lista certyfikatów (źródło + nazwa) zbierana raz, zanim Splide
    // dopisze do toru swoje klony slajdów na potrzeby pętli — dzięki temu
    // popup zawsze operuje na dokładnie czterech oryginalnych certyfikatach,
    // niezależnie od tego, czy użytkownik kliknął oryginalny slajd, czy
    // jego klon widoczny przy zawijaniu karuzeli.
    var certs = Array.prototype.map.call(
      splideRoot.querySelectorAll("[data-cert-trigger]"),
      function (trigger) {
        // "fullSrc" to większa, ostrzejsza wersja certyfikatu (osobno
        // wyrenderowana z PDF-a w wyższej rozdzielczości) pokazywana w
        // powiększonym podglądzie; "thumbSrc" to ta sama mała grafika co w
        // karuzeli, użyta w pasku miniaturek popupu, żeby nie ściągać
        // dużych plików tylko po to, by wyświetlić je jako 68×48 px.
        var thumbImgEl = trigger.querySelector("img");
        return {
          fullSrc: trigger.getAttribute("data-full-src") || "",
          thumbSrc: thumbImgEl
            ? thumbImgEl.getAttribute("src")
            : trigger.getAttribute("data-full-src") || "",
          name: trigger.getAttribute("data-cert-name") || "",
        };
      },
    );

    var splide = new Splide(splideRoot, {
      type: "loop",
      autoWidth: true,
      autoHeight: true,
      focus: "center",
      gap: "28px",
      arrows: false,
      pagination: false,
      drag: true,
      // Przyspieszone przejście między slajdami (wcześniej 650ms) — karuzela
      // reaguje teraz wyraźnie szybciej na autoplay, strzałki i przeciąganie.
      speed: 380,
      easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      autoplay: !reduceMotion,
      interval: 4500,
      pauseOnHover: true,
      pauseOnFocus: true,
    });

    // Popup z powiększonym podglądem certyfikatu: zdjęcie, strzałki
    // poprzedni/następny i pasek miniaturek wszystkich certyfikatów do
    // szybkiego przełączania. Kliknięcie karty w głównej karuzeli
    // (delegacja na korzeniu Splide, więc działa też dla klonów slajdów
    // tworzonych przez pętlę) otwiera natywny <dialog> z wyszarzonym tłem
    // (::backdrop).
    var certModal = document.querySelector("[data-cert-modal]");
    var certModalImg = certModal
      ? certModal.querySelector("[data-cert-modal-img]")
      : null;
    var certModalClose = certModal
      ? certModal.querySelector("[data-cert-modal-close]")
      : null;
    var certModalPrev = certModal
      ? certModal.querySelector("[data-cert-modal-prev]")
      : null;
    var certModalNext = certModal
      ? certModal.querySelector("[data-cert-modal-next]")
      : null;
    var certModalThumbs = certModal
      ? certModal.querySelector("[data-cert-modal-thumbs]")
      : null;

    var isCertModalOpen = function () {
      return !!(certModal && certModal.open);
    };

    var pauseAutoplay = function () {
      if (splide.Components.Autoplay) splide.Components.Autoplay.pause();
    };
    var resumeAutoplay = function () {
      if (reduceMotion || isCertModalOpen()) return;
      if (splide.Components.Autoplay) splide.Components.Autoplay.play();
    };

    if (
      certModal &&
      certModalImg &&
      certModalClose &&
      certs.length &&
      typeof certModal.showModal === "function"
    ) {
      var currentModalIndex = 0;

      // Pasek miniaturek budowany raz, na starcie, z tych samych danych co
      // slajdy głównej karuzeli — jedno źródło prawdy, bez duplikowania
      // znaczników w HTML.
      if (certModalThumbs) {
        certs.forEach(function (cert, i) {
          var item = document.createElement("li");
          item.className = "cert-modal__thumb-item";

          var thumbBtn = document.createElement("button");
          thumbBtn.type = "button";
          thumbBtn.className = "cert-modal__thumb";
          thumbBtn.setAttribute("data-cert-modal-thumb", "");
          thumbBtn.setAttribute("data-index", String(i));
          thumbBtn.setAttribute(
            "aria-label",
            cert.name || "Certyfikat " + (i + 1),
          );

          var thumbImg = document.createElement("img");
          thumbImg.src = cert.thumbSrc;
          thumbImg.alt = "";
          thumbImg.loading = "lazy";

          thumbBtn.appendChild(thumbImg);
          item.appendChild(thumbBtn);
          certModalThumbs.appendChild(item);
        });
      }

      var certModalThumbButtons = certModalThumbs
        ? Array.prototype.slice.call(
            certModalThumbs.querySelectorAll("[data-cert-modal-thumb]"),
          )
        : [];

      // Podmienia zdjęcie i podświetla odpowiednią miniaturkę, bez zmiany
      // stanu otwarcia popupu — używane zarówno przy pierwszym otwarciu,
      // jak i przy przełączaniu strzałkami/miniaturkami.
      var showCertAt = function (index) {
        var cert = certs[(index + certs.length) % certs.length];
        if (!cert) return;
        currentModalIndex = (index + certs.length) % certs.length;
        certModalImg.src = cert.fullSrc;
        certModalImg.alt = cert.name
          ? "Powiększony podgląd: " + cert.name
          : "Powiększony podgląd certyfikatu";
        certModalThumbButtons.forEach(function (btn, i) {
          var isActive = i === currentModalIndex;
          btn.classList.toggle("is-active", isActive);
          if (isActive) {
            btn.setAttribute("aria-current", "true");
          } else {
            btn.removeAttribute("aria-current");
          }
        });
      };

      var openCertModal = function (index) {
        showCertAt(index);
        pauseAutoplay();
        certModal.showModal();
      };

      splideRoot.addEventListener("click", function (event) {
        var trigger = event.target.closest("[data-cert-trigger]");
        if (!trigger) return;
        var fullSrc = trigger.getAttribute("data-full-src");
        var index = certs.findIndex(function (cert) {
          return cert.fullSrc === fullSrc;
        });
        openCertModal(index === -1 ? 0 : index);
      });

      if (certModalThumbs) {
        certModalThumbs.addEventListener("click", function (event) {
          var thumbBtn = event.target.closest("[data-cert-modal-thumb]");
          if (!thumbBtn) return;
          showCertAt(parseInt(thumbBtn.getAttribute("data-index"), 10) || 0);
        });
      }

      if (certModalPrev) {
        certModalPrev.addEventListener("click", function () {
          showCertAt(currentModalIndex - 1);
        });
      }
      if (certModalNext) {
        certModalNext.addEventListener("click", function () {
          showCertAt(currentModalIndex + 1);
        });
      }

      // Strzałki klawiatury przełączają certyfikat, gdy popup jest otwarty.
      // Nasłuch na "document" (a nie na samym oknie dialogowym) działa
      // niezależnie od tego, na którym elemencie wewnątrz popupu aktualnie
      // znajduje się fokus.
      document.addEventListener("keydown", function (event) {
        if (!isCertModalOpen()) return;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showCertAt(currentModalIndex + 1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          showCertAt(currentModalIndex - 1);
        }
      });

      certModalClose.addEventListener("click", function () {
        certModal.close();
      });

      // Klik w tło (backdrop) natywnego <dialog> zamyka popup. Kliknięcie na
      // rzeczywistej treści okna (zdjęcie, strzałki, miniaturki) ustawia
      // "event.target" na ten konkretny element potomny, więc porównanie z
      // samym elementem <dialog> odróżnia klik w tło od kliknięcia treści —
      // w przeciwieństwie do porównywania współrzędnych kursora, które
      // błędnie zamykałoby popup przy aktywacji przycisku klawiaturą
      // (Enter/Spacja wywołują "click" ze współrzędnymi 0,0).
      certModal.addEventListener("click", function (event) {
        if (event.target === certModal) certModal.close();
      });

      // Obejmuje zamknięcie przez tło, przycisk zamknięcia i klawisz Escape
      // (natywna obsługa <dialog>) jednym miejscem wznawiającym autoplay.
      certModal.addEventListener("close", resumeAutoplay);
    }

    // Własne przyciski poprzedni/następny sterują karuzelą przez publiczne
    // API Splide zamiast ręcznego przewijania.
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        splide.go("<");
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        splide.go(">");
      });
    }

    splide.mount();
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
