# Atelier Magnin — AI Context Document

## Project Overview

**Atelier Magnin** is a professional website for an automotive restoration and repair shop located in **Satigny, Geneva, Switzerland**. The business specializes in classic and modern American vehicles — particularly Mustangs and muscle cars. The site is fully in **French**.

- **Live deployment:** Netlify (static site)
- **Owner/Contact:** Jeremy — jeremy@ateliermagnincustom.com | +41 78 610 48 34
- **Business hours:** Mon–Fri 7h30–17h30

---

## Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Markup       | Static HTML (7 pages)             |
| Styling      | Tailwind CSS 3.4 + custom CSS     |
| JS           | Vanilla JS (no framework)         |
| Icons        | Lucide Icons 0.475.0 (CDN)        |
| Fonts        | Google Fonts — Oswald + Inter     |
| Images       | WebP format throughout            |
| Forms        | Netlify Forms (AJAX submit)       |
| Deployment   | Netlify (`netlify.toml`)          |
| Build        | `npm run build` (Tailwind compile)|

---

## File Structure

```
/
├── index.html              # Home page
├── a-propos.html           # About page
├── services.html           # Services page (6 services)
├── vehicules.html          # Vehicles for sale (1 listing)
├── vehicule-sport-ka.html  # Detail page — Ford Sport Ka 2006 (gallery + info)
├── pieces.html             # Parts for sale (6 listings)
├── contact.html            # Contact page with form + map placeholder
├── css/
│   ├── input.css           # Tailwind source + custom CSS + animations
│   └── style.css           # Compiled/minified output (do not edit directly)
├── js/
│   └── main.js             # All client-side JS
├── assets/
│   ├── favicon.svg         # SVG favicon — stylized "M" logo
│   ├── hero-mustang.webp   # Hero background image
│   ├── mustang.webp        # Mustang detail (home page)
│   ├── mustang2.webp       # Mustang detail (about page)
│   ├── bodywork.webp
│   ├── craftsmanship.webp
│   ├── modern-us.webp
│   ├── restoration.webp
│   ├── avendre_auto/       # Vehicle listing images
│   │   └── sportka-1.webp through sportka-8.webp  # Ford Sport Ka gallery (8 images)
│   └── services/           # Service section images
│       ├── bodyworks.webp
│       ├── restauration.webp
│       ├── mechanical.webp
│       ├── moderncars.webp
│       ├── postaccident.webp
│       └── bikes.webp
├── tailwind.config.js
├── netlify.toml
├── package.json
└── package-lock.json
```

---

## Design System

### Colors (HSL CSS variables defined in `input.css :root`)

| Token               | Value                  | Usage                          |
| -------------------- | ---------------------- | ------------------------------ |
| `--background`       | `hsl(220 15% 8%)`     | Page background (very dark)    |
| `--foreground`       | `hsl(40 20% 92%)`     | Primary text (light cream)     |
| `--primary`          | `hsl(8 75% 52%)`      | Buttons, accents (orange-red)  |
| `--primary-foreground` | `hsl(0 0% 100%)`    | Text on primary                |
| `--secondary`        | `hsl(220 10% 18%)`    | Footer, alt backgrounds        |
| `--accent`           | `hsl(35 90% 55%)`     | Highlight/badge color (gold)   |
| `--card`             | `hsl(220 12% 12%)`    | Card backgrounds               |
| `--muted`            | `hsl(220 10% 16%)`    | Muted backgrounds              |
| `--muted-foreground` | `hsl(220 10% 55%)`    | Secondary/muted text           |
| `--border`           | `hsl(220 10% 20%)`    | Subtle borders                 |

### Typography

- **Headings:** Oswald (weights 300–700) — uppercase, `letter-spacing: 0.02em`
- **Body:** Inter (weights 300–600)
- Tailwind config maps these as `font-heading` and `font-body`

### Layout

- Container max-width: **1400px**, centered, 2rem padding
- Desktop sections: `lg:px-24 lg:py-28`
- Mobile sections: `px-6 py-20`
- Responsive grid breakpoints: sm (640), md (768), lg (1024), 2xl (1400)

---

## Animations & Interactions (defined in `input.css` + `main.js`)

| Feature                | How it works                                                        |
| ---------------------- | ------------------------------------------------------------------- |
| **Page transitions**   | 5 overlay slices scale in/out with staggered timing; content fades out before overlay covers, overlay clears before content fades in; scroll resets on entry |
| **Scroll animations**  | IntersectionObserver adds `.visible` to `.animate-on-scroll` elements |
| **Hero entrance**      | `.hero-animate` keyframe — fade + slide up with staggered delays    |
| **Mobile menu**        | Max-height + opacity toggle with 0.3s transition                    |
| **Dropdown menus**     | `.open` class toggles visibility + chevron rotation                 |
| **Toast notifications**| Slide-up from bottom-right, auto-dismiss after 3s                   |
| **Card hovers**        | `-translate-y-1` lift on hover                                      |
| **Image gallery**      | Thumbnail carousel with main image swap, prev/next + keyboard arrows |

---

## JavaScript (`js/main.js`) — Key Systems

1. **Page Transition System (IIFE):** Intercepts internal link clicks, fades out content (350ms), plays slice overlay exit animation, navigates (680ms total), then plays entrance animation on new page. Resets scroll to top. Respects modifier keys.
2. **Mobile Menu Toggle:** Swaps hamburger/close icons, toggles `.open` class. Auto-closes on link click.
3. **Dropdown Handler:** Closes dropdown when clicking outside of it.
4. **Scroll Animation Observer:** One-shot IntersectionObserver at 0.15 threshold. Supports `.from-left`, `.from-right` directional entrance and `.delay-100` through `.delay-500` stagger classes.
5. **Lucide Icons Init:** Calls `lucide.createIcons()` on load.
6. **Contact Form:** Submits via `fetch()` to Netlify Forms (AJAX), shows success/error toast, resets form. Form fields use `name` attributes and a hidden `form-name` field for Netlify.
7. **Toast System:** `showToast(title, description)` — creates element, animates in, auto-removes after 3s.

---

## Pages Summary

### `index.html` — Home
- Hero with CTA buttons (Services / Contact)
- 6 service preview cards (grid)
- Mustang highlight section (image + text)
- CTA banner ("Un projet en tete ?")

### `a-propos.html` — About
- Story section (image + text, scroll-animated)
- 3 value cards (Expertise, Passion, Authenticite)
- Mustang specialization section

### `services.html` — Services
- 6 detailed service blocks in alternating image/text layout:
  1. Carrosserie (bodywork)
  2. Restauration Complete
  3. Mecanique Generale
  4. Vehicules US Modernes
  5. Reparation Post-Accident
  6. Motos (motorcycles)
- CTA for quote request

### `vehicules.html` — Vehicles for Sale
- 1 clickable vehicle card linking to detail page:
  1. 2006 Ford Sport Ka — I4 1.6 95ch, 129'000 km, CHF 2'900.—

### `vehicule-sport-ka.html` — Ford Sport Ka Detail
- Two-column layout: gallery (left) + vehicle info (right)
- Gallery: main image with prev/next arrows + 8 clickable thumbnails, keyboard nav support
- Info: badge, title, price, 2×2 specs grid, description, contact + call CTAs
- Inline gallery JS (IIFE) at bottom of page — not in main.js

### `pieces.html` — Parts for Sale
- 6 parts cards with icons:
  1. Holley 4150 Carburetor
  2. Mustang 1965–66 Gauges
  3. Camaro 1969 Tail Lights
  4. Ford Rallye 15" Wheels
  5. Toploader 4-Speed Transmission
  6. Mustang 1967–68 Front Fender

### `contact.html` — Contact
- Contact info (address, phone, email, hours)
- Netlify-powered contact form (name, email, phone, subject, message)
- Map placeholder section (no actual map embedded yet)

---

## Shared Components (repeated across all pages)

### Navigation Header
- Sticky, semi-transparent with backdrop blur
- Logo: "ATELIER" (white) + "MAGNIN" (primary orange)
- Desktop nav links + dropdown ("En vente" → Vehicules | Pieces)
- Mobile hamburger menu with same structure
- Active page indicated by `text-primary` class

### Footer
- 3-column grid: brand info | navigation links | contact details
- Copyright: 2026 Atelier Magnin

### Page Transition Overlay
- 5 `.overlay-slice` divs inside `.page-transition-overlay`

---

## Build & Development

```bash
npm install          # Install Tailwind
npm run dev          # Watch mode — recompiles CSS on changes
npm run build        # Production build — minified CSS output
```

- Source CSS: `css/input.css` → Compiled to: `css/style.css`
- Only edit `input.css` for custom styles; `style.css` is auto-generated
- Netlify build command: `npm install && npm run build`

---

## Important Notes

- **Language:** All user-facing content is in **French**
- **No JS framework:** Pure vanilla JS — no build step for JS
- **Static site:** No backend, no routing — each page is a standalone HTML file
- **Form handling:** Netlify Forms via AJAX `fetch()` (form name: `contact`, hidden `form-name` field + `name` attributes on all inputs)
- **Image format:** All images are WebP for performance
- **CDN dependencies:** Lucide Icons pinned to v0.475.0 via unpkg (no Tailwind CDN — only compiled CSS)
- **Caching:** Netlify headers configured — static assets (CSS/JS/images) cached 1 year immutable, HTML must-revalidate
- **Font loading:** Google Fonts with `<link rel="preconnect">` on all pages; hero image preloaded on `index.html`
- **Map placeholder:** `contact.html` has a placeholder div for a map, not an actual embedded map
- **No analytics** currently integrated
