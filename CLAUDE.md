# Atelier Magnin — AI Context Document

## Project Overview

**Atelier Magnin** is a static marketing website for an automotive restoration and repair shop in **Satigny, Geneva, Switzerland**. The business focuses on **American vehicles**, **oldtimers**, and **special projects**, with strong emphasis on **Mustangs**, bodywork, restoration, and mechanical work.

- **Language:** French only for public-facing content
- **Deployment:** Vercel
- **Primary contact:** `jeremy@ateliermagnincustom.com`
- **Phone:** `+41 78 610 48 34`
- **Location:** Satigny, Geneva, Switzerland
- **Business positioning:** Atelier Magnin Custom Sàrl works on the same site as **Carrosserie de Satigny SA**

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Markup | Static HTML |
| Styling | Tailwind CSS 3.4 + custom CSS |
| JS | Vanilla JavaScript |
| Icons | Lucide Icons via CDN |
| Fonts | Google Fonts |
| Forms | Netlify Forms + AJAX submit |
| Deployment | Vercel |
| Build | `npm run build` |

`package.json` scripts:

```bash
npm run dev
npm run build
```

---

## Current File Structure

```text
/
├── index.html
├── a-propos.html
├── services.html
├── pieces.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── vercel.json
├── CLAUDE.md
├── css/
│   ├── input.css
│   └── style.css
├── js/
│   └── main.js
├── vehicules/
│   ├── index.html
│   └── ford-sport-ka/
│       └── index.html
├── assets/
│   ├── favicon.svg
│   ├── hero-mustang.webp
│   ├── mustang.webp
│   ├── mustang2.webp
│   ├── chantiers/
│   │   └── mustang-68-1.webp ... mustang-68-8.webp
│   ├── avendre_auto/
│   │   └── sportka-1.webp ... sportka-8.webp
│   └── services/
│       ├── bikes.webp
│       ├── bodyworks.webp
│       ├── mechanical.webp
│       ├── moderncars.webp
│       ├── postaccident.webp
│       └── restauration.webp
├── netlify.toml
├── tailwind.config.js
└── package.json
```

---

## Brand / Content Rules

- Keep all copy in **French** unless the user explicitly asks otherwise.
- The correct email is always: `jeremy@ateliermagnincustom.com`
- Do **not** reintroduce `info@atelier-magnin.ch`
- The partnership with **Carrosserie de Satigny SA** is now an important commercial message and should remain visible where relevant.
- The founder story on `a-propos.html` is based on client-provided biography text about **Jérémy Magnin**.
- The site should read as a real specialist workshop, not a generic car site.

---

## Design System

### Colors

CSS variables are defined in `css/input.css`.

| Token | Purpose |
| --- | --- |
| `--background` | Main page background |
| `--foreground` | Main text |
| `--primary` | Accent / CTA color |
| `--primary-foreground` | Text on primary |
| `--secondary` | Alternate section background |
| `--accent` | Secondary highlight |
| `--card` | Card background |
| `--muted` | Neutral panel background |
| `--muted-foreground` | Secondary text |
| `--border` | Borders |

### Typography

- Headings use the configured `font-heading`
- Body text uses `font-body`
- The visual direction is bold, automotive, and editorial rather than generic SaaS

### Layout

- Static responsive layout with Tailwind utility classes
- Repeated spacing pattern:
  - Mobile: `px-4`
  - Desktop: `md:px-12 lg:px-24`
- Large content sections usually use `py-20` to `py-28`, but some compact modules now use smaller spacing

---

## JavaScript Systems (`js/main.js`)

The site’s main interactivity lives in `js/main.js`.

Current systems:

1. **Page transition overlay**
2. **Mobile menu toggle**
3. **Desktop/mobile dropdown accessibility state**
4. **Outside-click dropdown closing**
5. **Scroll-triggered reveal animations**
6. **Lucide icon initialization**
7. **Fastback home carousel**
8. **Sport Ka vehicle gallery**
9. **Netlify contact form AJAX submit**
10. **Toast notifications**

### Important interactive modules

- `vehicules/ford-sport-ka/index.html` uses the shared gallery logic in `main.js`
- `index.html` contains a compact Fastback worksite gallery using:
  - `#fastback-carousel-main`
  - `.fastback-thumb`
  - `#fastback-carousel-prev`
  - `#fastback-carousel-next`
- `contact.html` uses AJAX form submission and toast feedback
- The site now uses clean root-relative URLs such as `/services`, `/vehicules`, and `/vehicules/ford-sport-ka`

---

## SEO Status

The site now includes baseline SEO implementation across the main pages:

- `canonical`
- Open Graph tags
- Twitter card tags
- JSON-LD on key pages
- `robots.txt`
- `sitemap.xml`

Current SEO domain assumption:

```text
https://ateliermagnincustom.com
```

If the production domain changes, update:

- all `canonical` URLs
- all `og:url` values
- all absolute `og:image` URLs if needed
- `robots.txt`
- `sitemap.xml`
- structured data URLs

Current public URL structure:

- `/`
- `/services`
- `/a-propos`
- `/contact`
- `/pieces`
- `/vehicules`
- `/vehicules/ford-sport-ka`

---

## Page Summary

### `index.html`

Home page with:

- hero section
- partner/value message about same-site work with Carrosserie de Satigny SA
- services overview cards
- compact **Mustang Fastback 1968** worksite module with 8-image carousel
- CTA block

### `a-propos.html`

About page with:

- founder story for **Jérémy Magnin**
- career timeline
- partner section about **Carrosserie de Satigny SA**
- values section
- specialization section
- 3-image Fastback gallery using:
  - `assets/chantiers/mustang-68-1.webp`
  - `assets/chantiers/mustang-68-2.webp`
  - `assets/chantiers/mustang-68-3.webp`

### `services.html`

Services page with detailed blocks for:

1. Carrosserie
2. Restauration complète
3. Mécanique générale
4. Véhicules US modernes
5. Réparation post-accident
6. Bikes

Important:
- The large Fastback chantier module was removed from this page and moved to the homepage.

### `vehicules/index.html`

Vehicle listing page.

Current visible listing:

- `Ford Sport Ka 2006`

This page is commercially weak and may still need future cleanup if the inventory changes.

Public URL: `/vehicules`

### `vehicules/ford-sport-ka/index.html`

Vehicle detail page with:

- compact gallery on the left
- specs/info on the right
- 8-image image set
- contact and call CTAs

This page is currently the visual reference for compact gallery sizing.

Public URL: `/vehicules/ford-sport-ka`

### `pieces.html`

Parts-for-sale page.

This still reads partly like placeholder inventory and may need future content cleanup.

### `contact.html`

Contact page with:

- clickable phone and email
- stronger copy
- better structured form labels/IDs
- location / access messaging
- partner mention about Carrosserie de Satigny SA

Important:
- The old generic map placeholder was replaced by a more useful CTA/location block.

---

## Contact / Business Data

Use these values consistently unless the user says otherwise:

- **Business name:** `Atelier Magnin Custom Sàrl`
- **Email:** `jeremy@ateliermagnincustom.com`
- **Phone:** `+41 78 610 48 34`
- **City:** `Satigny`
- **Region:** `Genève`
- **Country:** `Suisse`

Partnership wording to preserve:

- Atelier Magnin works in the same premises as **Carrosserie de Satigny SA**
- This supports smoother coordination for bodywork, paint, and finishing

---

## Image Naming Conventions

### Sport Ka gallery

```text
assets/avendre_auto/sportka-1.webp
...
assets/avendre_auto/sportka-8.webp
```

### Fastback chantier gallery

```text
assets/chantiers/mustang-68-1.webp
assets/chantiers/mustang-68-2.webp
assets/chantiers/mustang-68-3.webp
assets/chantiers/mustang-68-4.webp
assets/chantiers/mustang-68-5.webp
assets/chantiers/mustang-68-6.webp
assets/chantiers/mustang-68-7.webp
assets/chantiers/mustang-68-8.webp
```

Current usage:

- `index.html` uses all 8 files in the compact carousel
- `a-propos.html` uses the first 3 files

---

## Build Notes

- Edit `css/input.css`, not `css/style.css`
- `css/style.css` is compiled output
- There is no JS bundler
- HTML pages are standalone and linked directly

Build command:

```bash
npm run build
```

---

## Known State / Follow-up Opportunities

- `vehicules.html` and `pieces.html` may still need stronger real inventory content
- The site depends on client-provided Fastback images being added to `assets/chantiers/`
- SEO is implemented, but the assumed canonical domain should be verified before launch
- If adding new contact info, keep it consistent on every page footer and in structured data
