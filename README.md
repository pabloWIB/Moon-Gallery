# Moon Gallery

A full-screen photography gallery that swaps the frame in place — no thumbnail strip, no lightbox, no page reload.

[![Live demo](https://img.shields.io/badge/demo-moongallery.wib.digital-2ea44f)](https://moongallery.wib.digital)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
![Dependencies](https://img.shields.io/badge/npm%20dependencies-0-brightgreen)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)

## Description

Three photographs — two lunar, one abstract — presented so that nothing on screen competes with them. A light panel carries the wordmark, the collection name and the two controls; the rest of the viewport is the photograph.

The gallery holds a single index. Moving forward or back wraps around, and the counter, the caption and the next-photo preview are all derived from that index rather than stored twice. Photographs are stacked `<img>` elements that cross-fade on opacity, so a transition is a style change and adding a fourth photograph is three lines of HTML.

Below 1024px the panel becomes a bar at the foot of the screen, putting the controls in thumb reach. Above it, the panel is the sidebar the layout was drawn for.

## Features

- Three-photograph rotation with wrap-around in both directions.
- Counter, caption and next-photo preview driven by one index.
- Keyboard control with the left and right arrow keys.
- Clickable preview of the upcoming photograph, shown from 480px up.
- Mobile-first layout: bottom control bar under 1024px, sidebar above it.
- No npm dependencies, no build step, no framework.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | `index.html` and `404.html` |
| Styling | CSS3 custom properties | Design tokens in `base.css`, no preprocessor |
| Scripting | Vanilla JavaScript | 113 lines across one module and one entry point |
| Images | WebP | Three photographs at 1920px, three previews at 400px |
| Type | Montserrat, via Google Fonts | Single family, loaded with `preconnect` and `display=swap` |

## Prerequisites

None. `index.html` opens straight from disk — the scripts are classic `defer` scripts rather than ES modules for exactly that reason.

## Running it locally

```bash
git clone https://github.com/pabloWIB/Moon-Gallery.git
cd Moon-Gallery
npx serve .
```

Or open `index.html` in a browser.

## Project structure

```
.
├── index.html                  # The gallery — the whole site
├── 404.html                    # Not found, links back to the gallery
├── assets/
│   ├── css/
│   │   ├── base.css            # Design tokens, reset, base typography
│   │   ├── layout.css          # Shell grid, panel, stage, breakpoints
│   │   └── components.css      # Brand, controls, counter, caption, preview
│   ├── js/
│   │   ├── main.js             # Entry point
│   │   └── modules/
│   │       └── gallery.js      # Index, counter, caption, preview
│   └── img/
│       ├── content/            # Photographs at 1920px and previews at 400px
│       ├── logo/               # Favicon and touch icon
│       └── og-cover.jpg        # Open Graph card, 1200x630
├── docs/
│   ├── auditoria.md            # State of the project before the reorganisation
│   └── cambios.md              # What changed, by phase
├── robots.txt
├── sitemap.xml
└── .gitignore
```

## Adding a photograph

Each slide carries its own caption and preview, so the JavaScript needs no edit:

```html
<div class="gallery__slide" data-slide
     data-title="Title shown in the caption"
     data-text="Short line under the rule"
     data-thumb="assets/img/content/name-thumb.webp">
  <img src="assets/img/content/name.webp" width="1920" height="1280"
       loading="lazy" alt="What the photograph shows.">
</div>
```

The counter total, the wrap-around and the preview all follow from the number of slides in the DOM. Update the `3 photos` line in the panel to match.

## Performance

First load is roughly 340KB across 13 requests. The photographs came off the camera at 5472px and 4.8MB in total; at 1920px in WebP they are 279KB.

## Deployment

Deployed on Vercel at [moongallery.wib.digital](https://moongallery.wib.digital). Static: upload the repository root as-is, with no build command and no output directory. Point the host's 404 handler at `404.html`.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
