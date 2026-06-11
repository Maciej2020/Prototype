# lek. Monika Bazgier — Landing page (medycyna estetyczna)

Hermetyczna, responsywna strona **single page** zbudowana w czystym HTML, CSS
i JavaScript (bez frameworków i bez procesu budowania). Inspiracja stylistyczna:
elegancki, minimalistyczny styl klinik premium.

## Uruchomienie

Wystarczy otworzyć `index.html` w przeglądarce. Dla pełnej obsługi czcionek
internetowych (i poprawnego działania lightboxa) zalecany jest lokalny serwer:

```bash
cd landing-monika
python3 -m http.server 8000
# następnie otwórz http://localhost:8000
```

## Struktura projektu

```
landing-monika/
├── index.html          # cała strona (jedna podstrona z kotwicami)
├── css/
│   └── style.css       # osobny arkusz stylów (mobile-first)
├── js/
│   └── script.js       # menu, scroll-spy, animacje, lightbox, formularz
├── assets/
│   ├── img/            # zdjęcia (skopiowane z ../prototype)
│   │   ├── about-photo.JPG
│   │   └── 1.jpg … 4.jpg
│   └── icons/
│       ├── favicon.svg
│       └── monika-bazgier-logo.svg
├── PROPOZYCJA.md       # zaakceptowany plan strony
└── README.md
```

## Sekcje strony

Hero → pasek zaufania → O mnie → Podejście (3 kroki) → Zabiegi → Galeria
(przed/po) → Opinie → FAQ → Kontakt (dane + formularz) → Stopka.

## Co warto uzupełnić (oznaczone `TODO` w kodzie)

- **Dane kontaktowe** — telefon, e-mail i linki do social mediów
  (obecnie placeholdery: `+48 000 000 000`, `kontakt@example.com`).
- **Adres kanoniczny i dane strukturalne** — w `<head>` (`link rel="canonical"`
  oraz blok JSON-LD `schema.org/Physician`).
- **Opinie** — sekcja „Opinie” zawiera przykładowe treści; zastąp je
  prawdziwymi (np. z Google / Booksy) za zgodą pacjentów.
- **Polityka prywatności** — podlinkuj rzeczywisty dokument w formularzu i stopce.
- **Wysyłka formularza** — domyślnie formularz otwiera program pocztowy
  (`mailto:`). Do produkcji podłącz backend lub usługę (np. Formspree),
  ustawiając `action`/`method` formularza w `index.html` i e-mail w `js/script.js`.

## Cechy techniczne

- **Mobile-first** i w pełni responsywny (Flexbox + CSS Grid, breakpointy 560/720/900/1040px).
- **SEO**: meta title/description, Open Graph, Twitter Card, dane strukturalne JSON-LD.
- **Dostępność (WCAG)**: semantyczne sekcje, skip-link, `aria-*`, obsługa klawiatury,
  widoczny focus, `prefers-reduced-motion`, kontrast.
- **Wydajność**: brak zależności runtime, `loading="lazy"` + `width/height` na
  zdjęciach (ograniczenie CLS), web-font z `display=swap` i fallbackiem systemowym.
- **Czcionki**: Cormorant Garamond + Jost (Google Fonts) z `preconnect`;
  przy braku sieci stosowane są czcionki systemowe zdefiniowane w CSS.

> Strona ma charakter informacyjny — treści nie zastępują konsultacji lekarskiej.
