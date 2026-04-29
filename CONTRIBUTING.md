# Contributing to VirtualWorld 360

Thank you for your interest in contributing! This project is maintained by **AI Evolution Polska**.

🌐 [aievolutionpolska.pl](https://aievolutionpolska.pl) · 📦 [github.com/aievolutionpl/VirtualWorld360](https://github.com/aievolutionpl/VirtualWorld360)

## How to Contribute

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes** — keep code clean and consistent with existing style
5. **Test** locally with `node api-server.js`
6. **Commit**: `git commit -m "feat: describe your change"`
7. **Push**: `git push origin feature/your-feature-name`
8. Open a **Pull Request** against `main`

## Adding New World Templates

Edit `assets/templates.js` — add a new entry using the `T()` helper:

```js
T('my-world', 'My World Name', 'Category', '🌟',
  'detailed prompt describing the 360° environment...',
  'linear-gradient(135deg,#color1,#color2)',
  'optional-preview-image.jpg'),
```

Categories: `Sci-Fi`, `Nature`, `Architecture`, `Fantasy`, `Business`, `Abstract`

## Code Style

- Vanilla HTML/CSS/JS — no framework dependencies
- Follow existing naming conventions
- Keep CSS variables in `assets/styles.css`
- Add i18n strings to both `en` and `pl` in `assets/i18n.js`

## Questions?

Open an issue or reach out at [aievolutionpolska.pl](https://aievolutionpolska.pl)

---

## Jak wnosić wkład (PL)

1. **Sforkuj** repozytorium na GitHub
2. Utwórz gałąź: `git checkout -b feature/twoja-funkcja`
3. Wprowadź zmiany i przetestuj lokalnie
4. Utwórz Pull Request do gałęzi `main`

Pytania? Zajrzyj na [aievolutionpolska.pl](https://aievolutionpolska.pl)
