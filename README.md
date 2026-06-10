# GitHub Pages demo

Statyczna strona przygotowana pod GitHub Pages. Nie wymaga bundlera, Node.js ani procesu build.

## Struktura

- `index.html` - strona główna z linkami do dwóch podstron.
- `fotografia/index.html` - przykładowy single page o fotografii.
- `wedkarstwo/index.html` - przykładowy single page o wędkarstwie.
- `styles.css` - wspólne style.
- `assets/` - lokalne obrazy używane przez strony.

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
