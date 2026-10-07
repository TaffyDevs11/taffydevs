# Tafadzwa Daniel Kamanga — Developer Portfolio

A standalone, static portfolio site aimed at employers. No build step, no dependencies,
no connection to the TaffyDevs agency site — this folder can be published on its own.

```
portfolio/
├── index.html                 ← the whole pitch: work, skills, experience, about, contact
├── work/
│   ├── juam-corporate-services.html
│   ├── phenomenal-wear.html
│   └── randr-catering.html
├── css/style.css              ← design system (tokens at the top)
├── js/main.js                 ← ~100 lines: section nav, reveals, copy-to-clipboard
├── assets/
│   ├── img/work/*.jpg         ← screenshots of the live client sites
│   ├── img/github/*.jpg       ← screenshots of the GitHub Pages builds
│   ├── img/logo.svg           ← TDK lockup (monogram + name + tagline)
│   ├── img/tafadzwa-kamanga.jpg
│   └── cv/Tafadzwa-Kamanga-CV.pdf
├── 404.html · robots.txt · sitemap.xml · .nojekyll
```

## Publishing on GitHub Pages

**Option A — its own repository (recommended, gives the cleanest URL)**

1. Create a repository, e.g. `portfolio`.
2. Copy the **contents of this folder** into the repository root (so `index.html` is at the top level).
3. Push, then: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
4. Live at `https://<username>.github.io/portfolio/`.

**Option B — publish this folder from an existing repository**

Settings → Pages → Source: `main` branch, folder `/portfolio`.

Either way `.nojekyll` is already included, so GitHub serves every file as-is.

### After publishing — update three things

The canonical URL is currently `https://taffydevs11.github.io/portfolio/`. If yours differs,
change it in:

- `index.html` and each `work/*.html` — `<link rel="canonical">` and the `og:` tags
- `sitemap.xml` and `robots.txt` — the URLs
- `404.html` — the `/portfolio/` paths (GitHub Pages serves 404s from the site root)

A custom domain (e.g. `tafadzwakamanga.com`) works too: add it under Settings → Pages,
then update those same URLs.

## Keeping it current

- **CV** — replace `assets/cv/Tafadzwa-Kamanga-CV.pdf`, keeping the filename.
- **New project** — copy a `work/*.html` page as a template, add a `.work-card` block in
  `index.html`, drop a screenshot in `assets/img/work/`, and add the page to `sitemap.xml`.
- **New GitHub build** — add a `.build-card` block in the `#builds` section and a screenshot
  in `assets/img/github/`.
- **Logo** — the lockup lives inline in each page header (`.brand`) and standalone in
  `assets/img/logo.svg`; the favicon is the TDK monogram as an inline data URI.
- **Screenshots** — 1280×800 captures of the live site, saved around 800px wide as JPEG.

## Design system

Swiss editorial: oversized light type, a blue-tinted palette, a single accent colour, and
a floating navy rail for navigation. The rules are encoded as custom properties at the
top of `css/style.css`:

| Token | Value | Use |
|---|---|---|
| `--ink` | `#10203F` | text, filled buttons, the rail |
| `--paper` | `#ffffff` | cards, button labels |
| `--canvas` | `#E3EAF6` | page background |
| `--fog` `#D2DCED` / `--ash` `#A7B6D0` / `--smoke` `#4E6389` / `--graphite` `#2C3E63` | blue-greys | borders, secondary text |
| `--ember` | `#1F6FEB` | the accent — used once or twice per page |
| `--text-display` | 44 → 127px, weight **300** | the name, project titles |
| `--radius-badge` / `--radius` / `--radius-feature` | 4 / 8 / 14px | badges / cards & buttons / featured cards |

Three rules keep it coherent: **no box-shadows** (contrast does the work), **no gradients**,
and **nothing heavier than weight 500** — light type at large sizes is the voice of the design.

Typeface: [Inter Tight](https://fonts.google.com/specimen/Inter+Tight) (300/400/500/600).

## Accessibility & performance

- Semantic landmarks, a skip link, visible focus rings, `aria-current` on the section nav.
- Honours `prefers-reduced-motion`: animations and smooth scrolling switch off.
- No frameworks; one CSS file, one small JS file. Images carry `width`/`height` to avoid
  layout shift, and everything below the fold is lazy-loaded.
- Works fully with JavaScript disabled.
