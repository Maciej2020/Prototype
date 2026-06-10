// Wstrzykuje wspólny header i stopkę z partials/layout.html.
// Treść <main> pozostaje statyczna w każdej stronie (SEO).
(function () {
  function setActiveLink() {
    var page = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-navlink]").forEach(function (link) {
      if (link.getAttribute("href") === page) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function injectLayout(html) {
    var template = document.createElement("template");
    template.innerHTML = html.trim();

    var header = template.content.querySelector("header");
    var footer = template.content.querySelector("footer");
    var main = document.querySelector("main");

    if (header) {
      document.body.insertBefore(header, main);
    }
    if (footer) {
      document.body.appendChild(footer);
    }

    setActiveLink();
    document.dispatchEvent(new CustomEvent("layout:ready"));
  }

  fetch("partials/layout.html")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }
      return response.text();
    })
    .then(injectLayout)
    .catch(function (error) {
      console.error(
        "Nie udało się załadować partials/layout.html. " +
          "Uruchom przez serwer HTTP (np. `python3 -m http.server`).",
        error,
      );
    });
})();
