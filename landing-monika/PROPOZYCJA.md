# Propozycja: Landing page dla lekarza medycyny estetycznej

> Inspiracja: https://sharley.pl/ — elegancki, minimalistyczny styl klinik premium.
> Projekt hermetyczny: czysty HTML + osobny CSS, bez zewnętrznych frameworków. Wszystkie zasoby wewnątrz folderu.

---

## 1. Cel strony

Strona ma realizować cztery główne cele biznesowe:

1. **Pozyskiwanie pacjentów (lead generation)** — głównym działaniem jest umówienie wizyty / konsultacji.
2. **Budowanie zaufania i wizerunku eksperta** — prezentacja doświadczenia, certyfikatów, efektów.
3. **Prezentacja oferty zabiegów** — jasny, czytelny przegląd zabiegów medycyny estetycznej.
4. **Wyróżnienie wizerunkowe** — elegancja i profesjonalizm odpowiadające segmentowi premium.

### Grupa docelowa
- Kobiety i mężczyźni 25–55 lat, dbający o wygląd.
- Osoby poszukujące zaufanego, doświadczonego specjalisty.
- Klienci lokalni oraz szukający konkretnych zabiegów.

### Najważniejszy wskaźnik sukcesu (KPI)
- Liczba umówionych konsultacji (kliknięcia w CTA „Umów wizytę", wysłane formularze, telefony).

---

## 2. Styl wizualny

Spójny z estetyką sharley.pl — minimalizm premium, dużo światła, miękkość.

### Paleta kolorów
| Rola | Kolor | Opis |
|------|-------|------|
| Tło główne | `#FBF8F4` / `#FFFFFF` | ciepła biel, écru |
| Tło sekcji | `#F2EBE3` | beż / nude |
| Akcent | `#C9A27E` / `#B98E6E` | złoto-beżowy, „champagne" |
| Tekst główny | `#2B2622` | ciepły grafit / brąz |
| Tekst pomocniczy | `#7A726B` | przygaszony brąz |
| Akcent dodatkowy | `#E8D5C4` | róż pudrowy / nude jasny |

### Typografia
- **Nagłówki:** elegancki serif — *Cormorant Garamond* lub *Playfair Display*.
- **Treść / UI:** czysty sans-serif — *Inter* lub *Montserrat*.
- Duże, „oddychające" nagłówki; wysoki interlinia w treści.

### Zasady kompozycji
- Dużo białej przestrzeni (whitespace), powściągliwość.
- Duże, wysokiej jakości zdjęcia (hero, portret lekarza, zabiegi).
- Miękkie cienie, zaokrąglone rogi (8–24px).
- Subtelne animacje pojawiania się przy scrollu (fade / slide-up).
- Mobile-first, pełna responsywność.

---

## 3. Struktura strony (sekcje)

1. **Header / Nawigacja (sticky)** — logo (imię i nazwisko / monogram), menu kotwiczne, przycisk CTA „Umów wizytę".
2. **Hero** — pełnoekranowe zdjęcie, nagłówek z imieniem lekarza i specjalizacją, krótki podtytuł, 2 przyciski CTA.
3. **O mnie** — portret + biografia, wykształcenie, certyfikaty, podejście do pacjenta; pasek liczb (lata doświadczenia, liczba zabiegów, zadowoleni pacjenci).
4. **Zabiegi / Oferta** — siatka kart (np. kwas hialuronowy, botoks, mezoterapia, modelowanie ust, lifting, peelingi) z ikoną/zdjęciem i krótkim opisem.
5. **Dlaczego ja (USP)** — bezpieczeństwo, indywidualne podejście, naturalne efekty, sprzęt medyczny.
6. **Galeria / Efekty (przed–po)** — opcjonalnie suwak before/after lub galeria zdjęć.
7. **Opinie pacjentów** — karuzela/karty z cytatami i oceną.
8. **Cennik / Konsultacja** — orientacyjny cennik lub zachęta do bezpłatnej konsultacji.
9. **FAQ** — najczęstsze pytania (accordion).
10. **Kontakt** — formularz, dane kontaktowe, godziny otwarcia, mapa/lokalizacja, social media.
11. **Footer** — skrócone menu, social, telefon/e-mail, NIP, link do polityki prywatności.

---

## 4. Treści CTA

### Główne (konwersja)
- **„Umów wizytę"**
- **„Zarezerwuj konsultację"**

### Wspierające
- „Zobacz zabiegi" / „Poznaj ofertę"
- „Skontaktuj się"
- „Zadzwoń teraz" (click-to-call na mobile)
- „Napisz na WhatsApp" (opcjonalnie)

### Mikrokopia wspierająca zaufanie
- „Bezpłatna konsultacja wstępna"
- „Bezpieczne, certyfikowane zabiegi"
- „Naturalne, harmonijne efekty"

---

## 5. Wymagania techniczne

- **Czysty HTML5 + CSS3** w osobnych plikach — projekt w pełni hermetyczny, bez CDN/frameworków.
- Opcjonalnie minimalny **vanilla JS** (menu mobilne, smooth scroll, accordion FAQ, animacje przy scrollu).
- **Responsywność** mobile-first (breakpointy ~480 / 768 / 1024 / 1280px), layout na Flexbox + CSS Grid.
- **CSS variables** dla kolorów, typografii i odstępów (łatwa zmiana motywu).
- **Semantyczny HTML** + **dostępność (WCAG AA)**: atrybuty `alt`, `aria-*`, kontrast, nawigacja klawiaturą.
- **SEO:** meta title/description, Open Graph, dane strukturalne schema.org (`Physician` / `MedicalClinic`).
- **Wydajność:** zoptymalizowane obrazy, `loading="lazy"`, minimalny CSS.
- **Favicon** i podstawowe meta dla urządzeń mobilnych.
- **Formularz kontaktowy** — front-end gotowy; sposób wysyłki (mailto / backend / usługa typu Formspree) do ustalenia.
- **Zgodność RODO** — checkbox zgody w formularzu, miejsce na politykę prywatności.

---

## 6. Proponowana struktura folderu (hermetyczna)

```
landing-monika/
├── index.html              # cała struktura strony
├── css/
│   └── style.css           # osobny arkusz stylów
├── js/
│   └── script.js           # (opcjonalnie) menu, smooth scroll, FAQ
├── assets/
│   ├── img/                # zdjęcia skopiowane z folderu prototype/
│   └── icons/              # ikony zabiegów, social, favicon
├── PROPOZYCJA.md           # ten dokument
└── README.md              # krótka instrukcja uruchomienia
```

### Zdjęcia
Zdjęcia zostaną skopiowane z folderu `prototype/` do `assets/img/` na etapie implementacji.
Planowane wykorzystanie:
- **Hero** — duże, klimatyczne zdjęcie (gabinet / portret lekarza).
- **O mnie** — portret lekarza.
- **Zabiegi** — zdjęcia ilustrujące poszczególne zabiegi.
- **Galeria / efekty** — zdjęcia przed–po (jeśli dostępne).

---

## 7. Następne kroki

1. **Akceptacja propozycji** (struktura, sekcje, styl, paleta).
2. Potwierdzenie kilku szczegółów:
   - imię i nazwisko lekarza oraz specjalizacja (do hero i logo),
   - lista zabiegów do sekcji „Oferta",
   - dane kontaktowe (telefon, e-mail, adres, godziny, social),
   - nazwy/liczba zdjęć dostępnych w folderze `prototype/`.
3. **Implementacja** — utworzenie `index.html`, `css/style.css`, skopiowanie zdjęć i złożenie sekcji.

> Po akceptacji przejdę do kodowania zgodnie z powyższą strukturą.
