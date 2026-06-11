# Propozycja landing page: lek. Monika Bazgier

## Problem

Landing page ma sprzedawac konsultacje i wizyty u lekarza medycyny estetycznej. Inspiracja: sharley.pl, ale zakres musi byc wezszy, bo projekt dotyczy jednej osoby, nie duzej kliniki z pelna oferta, sklepem, promocjami i rozbudowanym zespołem.

## Fakty

- Repozytorium zawiera statyczne projekty bez bundlera.
- Istnieja juz katalogi `prototype/` i `landing/`.
- `README.md` opisuje zasade samodzielnych projektow: osobny HTML, CSS i assety w katalogu projektu.
- W `prototype/assets/` sa dostepne:
  - `about-photo.JPG` - portret lekarza, 1536 x 2048.
  - `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg` - pionowe materialy przed/po, ok. 1179 x 1459-1476.
  - `monika-bazgier-logo.svg`.
  - `favicon.svg`.
- Obecny prototyp uzywa estetyki krem/greige, serif + sans, przyciskow outline i spokojnych sekcji.
- Strona referencyjna Sharley ma rozbudowany model: hero, wyszukiwarka zabiegow, kategorie/strefy, bloki ofert, pierwsza wizyta, efekty, informacje o ekspercie/zespole, opinie i kontakt.

## Zalozenia

- Nowa propozycja ma byc landing page, nie wielostronicowy serwis.
- Glownym celem konwersji jest umowienie konsultacji lub wizyty.
- Zakres komunikacji powinien podkreslac medyczna kwalifikacje, naturalny efekt, bezpieczenstwo i indywidualny plan.
- Materialy przed/po mozna pokazac, ale ostroznie: jako dowod pracy, nie jako gwarancje efektu.
- Brak danych o realnym adresie, telefonie, Booksy, cenniku, certyfikatach i pelnej liscie zabiegow. Te elementy musza zostac uzupelnione albo zastapione neutralnym placeholderem.

## Ryzyka

- Zbyt mocna inspiracja Sharley moze dac strone wygladajaca jak klinika wielospecjalistyczna, a nie osobista marka lekarza.
- Obietnice typu "spektakularne efekty", "bez bolu", "najlepsze zabiegi" sa ryzykowne medycznie i marketingowo, jesli nie ma dowodow lub zgody na takie komunikaty.
- Zdjecia przed/po wymagaja zgody pacjentow i ostroznych podpisow.
- Wysokie hero oparte tylko na zdjeciu portretowym moze zaslonic cel strony na mobile. CTA musi byc widoczne w pierwszym ekranie.

## Struktura strony

### 1. Header

Cel: szybka orientacja i natychmiastowa rezerwacja.

Elementy:
- logo / znak Monika Bazgier,
- nawigacja kotwicowa: `Podejscie`, `Zabiegi`, `Efekty`, `O mnie`, `Kontakt`,
- stale CTA: `Umow konsultacje`.

### 2. Hero

Cel: natychmiast powiedziec, kto oferuje usluge i dlaczego warto umowic konsultacje.

Proponowany naglowek:
`Medycyna estetyczna z planem, nie przypadkiem.`

Alternatywa:
`Naturalny efekt zaczyna sie od dobrej kwalifikacji.`

Tekst wspierajacy:
`Konsultacja, analiza proporcji i spokojny plan terapii. Bez presji, z jasnym omowieniem wskazan, przeciwwskazan i realnych efektow.`

CTA:
- glowne: `Umow konsultacje`,
- drugie: `Zobacz zakres zabiegow`.

Asset:
- `about-photo.JPG`, kadrowane jako portret po prawej albo jako szeroki panel z tekstem po lewej.

### 3. Pasek zaufania

Cel: zbudowac racjonalne powody do kontaktu.

Proponowane punkty:
- `Kwalifikacja lekarska przed zabiegiem`,
- `Plan terapii dopasowany do twarzy`,
- `Naturalny efekt i kontrola proporcji`,
- `Omowienie ryzyka i rekonwalescencji`.

### 4. Sekcja "Jak pracuje"

Cel: odroznic lekarza od salonu beauty.

Treść:
- konsultacja,
- analiza wskazan i przeciwwskazan,
- wybor techniki i preparatu,
- informacja o czasie gojenia,
- kontrola efektu.

CTA:
- `Sprawdz, jak wyglada pierwsza wizyta`.

### 5. Sekcja zabiegow

Cel: pokazac oferte bez robienia katalogu jak Sharley.

Proponowane grupy:
- `Usta i okolica ust`,
- `Zmarszczki mimiczne`,
- `Stymulacja i regeneracja skory`,
- `Wolumetria i proporcje`,
- `Leczenie nadpotliwosci`,
- `Terapie skojarzone`.

Format:
- 6 kart, kazda z krotkim opisem problemu, nie z agresywna obietnica efektu.

CTA:
- `Dobierz zabieg na konsultacji`.

### 6. Sekcja efektow

Cel: dowod pracy, nie galeria sensacji.

Assety:
- `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`.

Proponowany podpis:
`Efekty zależą od kwalifikacji, anatomii, techniki i indywidualnej reakcji organizmu. Zdjecia maja charakter informacyjny.`

CTA:
- `Omow mozliwy efekt dla siebie`.

### 7. Sekcja "Pierwsza wizyta"

Cel: zdjac niepewnosc przed kontaktem.

Kroki:
1. `Wywiad i oczekiwania`.
2. `Ocena proporcji i wskazan`.
3. `Plan terapii`.
4. `Decyzja o zabiegu albo odroczenie`.

CTA:
- `Przygotuj pytania na konsultacje`.

### 8. Sekcja o lekarzu

Cel: osobista wiarygodnosc.

Treść robocza:
`Lek. Monika Bazgier prowadzi konsultacje i zabiegi z zakresu medycyny estetycznej, koncentrujac sie na bezpieczenstwie, proporcjach i naturalnym efekcie.`

Uwaga:
- Nie dopisywac specjalizacji, certyfikatow, stazu ani miejsc pracy bez danych.

CTA:
- `Poznaj podejscie`.

### 9. Opinie / social proof

Cel: zaufanie, jesli sa realne dane.

Wariant bez danych:
- zamiast opinii: sekcja `Najczestsze pytania`.

Wariant z danymi:
- 3 cytaty pacjentow, tylko jesli dostarczone i dopuszczone do publikacji.

### 10. FAQ

Pytania:
- `Czy konsultacja jest konieczna przed zabiegiem?`
- `Kiedy widac efekt?`
- `Czy mozna wykonac zabieg od razu po konsultacji?`
- `Jakie sa przeciwwskazania?`
- `Jak przygotowac sie do wizyty?`

### 11. Final CTA / kontakt

Cel: zamknac strone jasnym ruchem.

CTA glowne:
`Umow konsultacje`

CTA alternatywne:
`Napisz i zapytaj o termin`

Dane wymagane:
- telefon,
- adres gabinetu,
- link Booksy / formularz / Instagram DM,
- godziny przyjec,
- informacja prawna: `Treści na stronie maja charakter informacyjny i nie zastępują konsultacji lekarskiej.`

## Styl wizualny

### Kierunek

Ekspercki, spokojny, luksusowy, ale bardziej medyczny niz salonowy.

### Kolory

- tlo: cieply off-white / ivory,
- pasy sekcji: greige, jasny taupe,
- tekst: grafitowy braz / ciemny neutral,
- akcent: zgaszone bordo albo ciemny oliwkowy jako kontrapunkt do obecnej palety kremowej.

Uzasadnienie:
- zachowuje elegancje obecnego prototypu,
- odroznia nowa propozycje od aktualnego `landing/`,
- nie wpada w jednorodna palete bezu.

### Typografia

- naglowki: elegancki serif,
- tekst i UI: neutralny sans-serif,
- bez bardzo cienkich fontow w dlugich akapitach,
- duze naglowki tylko w hero i sekcjach otwierajacych.

### Kompozycja

- pierwszy ekran: tekst + portret + CTA,
- sekcje pelnoszerokie, bez zagniezdzonych kart,
- karty tylko dla zabiegow, FAQ i efektow,
- duzo oddechu, ale CTA powtarzane regularnie,
- mobile-first: CTA widoczne bez przewijania.

## Tresci CTA

Priorytet:
- `Umow konsultacje`

CTA wspierajace:
- `Zobacz zakres zabiegow`
- `Omow mozliwy efekt`
- `Dobierz zabieg na konsultacji`
- `Zapytaj o termin`
- `Sprawdz, jak wyglada pierwsza wizyta`

Nie uzywac:
- `Odmien swoje zycie`
- `Gwarantowany efekt`
- `Bezbolesnie`
- `Najlepszy lekarz`
- `Spektakularna metamorfoza`

## Wymagania techniczne

Docelowy katalog:

```text
landing-sharley-propozycja/
  index.html
  css/
    styles.css
  assets/
    about-photo.JPG
    1.jpg
    2.jpg
    3.jpg
    4.jpg
    monika-bazgier-logo.svg
    favicon.svg
  PROPOZYCJA.md
```

Wymagania:
- projekt hermetyczny: brak zaleznosci od `../prototype/`, `../landing/` albo glownego `styles.css`,
- osobny `index.html`,
- osobny `css/styles.css`,
- lokalne assety skopiowane do `assets/`,
- brak bundlera, brak frameworka, brak procesu build,
- HTML semantyczny: `header`, `main`, `section`, `footer`,
- dostepnosc: skip link, sensowne `alt`, widoczny focus, poprawny kontrast,
- SEO: `title`, `description`, Open Graph, jeden `h1`,
- performance: obrazy z `width`, `height`, `loading="lazy"` poza hero,
- responsywnosc: mobile, tablet, desktop,
- brak JS, jesli nie bedzie potrzebny do nawigacji lub FAQ.

## Plan implementacji po akceptacji

1. Skopiowac assety z `prototype/assets/` do `landing-sharley-propozycja/assets/`.
2. Utworzyc `index.html` i `css/styles.css`.
3. Zbudowac landing jako jedna strone z kotwicami.
4. Zweryfikowac lokalnie layout na mobile i desktop.
5. Sprawdzic linki, alt texty i brak zaleznosci zewnetrznych poza opcjonalnymi fontami.

