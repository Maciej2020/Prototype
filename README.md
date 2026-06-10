# GitHub Pages demo

Statyczna strona przygotowana pod GitHub Pages. Nie wymaga bundlera, Node.js ani procesu build.

## Struktura

- `index.html` - strona główna z linkiem do projektu.
- `styles.css` - style strony głównej.
- `assets/` - obrazy używane przez stronę główną.
- `prototype/` - wzorcowy, wielostronicowy projekt z własnym `css/`, `js/`, `partials/` i `assets/`.
- `landing/` - jednostronicowy (single page) landing dla lekarza medycyny estetycznej, z własnym `css/`, `js/` i `assets/`.

Każdy projekt jest samodzielny — ma własny CSS i HTML (nie korzysta ze
współdzielonych stylów z katalogu głównego).

## Jak podpiąć projekt pod GitHub Pages

1. Utwórz puste repozytorium na GitHubie.
2. W tym katalogu wykonaj:

   ```bash
   git init
   git add .
   git commit -m "Add GitHub Pages static site"
   git branch -M main
   git remote add origin https://github.com/TWOJ_LOGIN/NAZWA_REPO.git
   git push -u origin main
   ```

3. Na GitHubie wejdź w `Settings` -> `Pages`.
4. W sekcji `Build and deployment` ustaw:

   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - folder: `/ (root)`

5. Zapisz ustawienia. GitHub pokaże adres strony po zbudowaniu publikacji.

## Jak pracować z Codexem

Codex nie publikuje strony sam z siebie. Praktyczny schemat jest taki:

1. Trzymasz pliki strony w repozytorium GitHub.
2. Otwierasz lokalny katalog repozytorium w Codexie.
3. Zlecasz Codexowi zmianę plików.
4. Sprawdzasz wynik lokalnie.
5. Robisz commit i push do gałęzi `main`.
6. GitHub Pages publikuje aktualną wersję z gałęzi `main`.

Jeżeli repozytorium ma inną gałąź produkcyjną niż `main`, wybierz ją w ustawieniach GitHub Pages.
