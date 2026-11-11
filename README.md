# Roaming Camels Morocco

A fast, multi-page marketing website for **Roaming Camels Morocco**, a private and tailor-made tour operator. Travelers can browse multi-day and day tours, filter them with an interactive tour finder, read the Morocco travel guide, and request a personalized quote. A built-in `/admin/` dashboard lets the owner manage tours and contact details without touching code.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Admin Dashboard](#admin-dashboard)
- [Deploying to Vercel](#deploying-to-vercel)
- [Owner & Contact](#owner--contact)

---

## Features

### Morocco Tour Finder
- Browse the full catalogue of multi-day tours (e.g. 8-Day Imperial Cities, 12-Day Ultimate Morocco, 18-Day Grand Morocco) and day trips from Marrakech (Agafay Desert, Imlil, Ourika Valley, Essaouira, Aït Ben Haddou).
- Interactive filtering via the `TourFinderFilter` component — free-text search plus tour type, departure city, destination, and trip length.
- Tour cards with imagery, highlights, duration and pricing.

### Multi-Page Static Routing
Each route is generated as its own static HTML entry point by Vite, so every page has a real URL that works on direct load, refresh, and in search engines:

| Route | Page |
| --- | --- |
| `/` | Home |
| `/morocco-tour-finder/` | Tour Finder |
| `/about/` | About |
| `/how-we-work/` | How We Work |
| `/faq/` | FAQ |
| `/morocco-travel-guide/` | Morocco Travel Guide |
| `/admin/` | Admin Dashboard |

Once loaded, internal links are intercepted for smooth client-side navigation (History API), including cross-page anchors such as `/#quote-form`.

### Interactive Quote Form
- Collects name, email, travel dates, trip length, adults, children, rooms, hotel tier, and notes.
- One-tap **WhatsApp** and direct-call shortcuts to the owner.

> **Note:** form submission is currently simulated on the client — it shows a confirmation but does not yet deliver the request anywhere. Connect it to an email/form service (e.g. Formspree, Resend, or a serverless function) before relying on it for leads.

### Password-Protected Admin Dashboard (`/admin/`)
- **CRUD tour management** — add, edit, and delete tours; search and filter the list; edit or nudge prices inline; and mark tours as cancelled/active.
- **Centralized site config** — owner name, phone numbers, WhatsApp link, email, Instagram, and location are edited in one place and propagate to every page (navbar, footer, quote form).
- **Real-time updates** — changes are applied instantly across open pages via browser events, without a reload.

See [Admin Dashboard](#admin-dashboard) for how persistence works and important security notes.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| UI | [React 18](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build tool / dev server | [Vite 5](https://vitejs.dev/) (multi-page build) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS / Autoprefixer |
| Icons | [lucide-react](https://lucide.dev/) |

---

## Project Structure

The web application lives entirely inside the **`app/`** directory. Everything at the repository root outside `app/` is project tooling/reference material and is not part of the deployed site.

```
.
├── README.md
└── app/                          # ← the web application (deploy this folder)
    ├── index.html                # Home page entry
    ├── about/index.html          # Static entry for /about/
    ├── faq/index.html            # Static entry for /faq/
    ├── how-we-work/index.html    # Static entry for /how-we-work/
    ├── morocco-tour-finder/index.html
    ├── morocco-travel-guide/index.html
    ├── admin/index.html          # Static entry for /admin/
    ├── public/
    │   └── images/               # Tour photography, logos, image-map.json
    ├── src/
    │   ├── main.tsx              # React bootstrap
    │   ├── App.tsx               # Route selection + client-side navigation
    │   ├── components/           # Navbar, Footer, QuoteForm, TourCard, TourFinderFilter
    │   ├── pages/                # Home, About, HowWeWork, FAQ, TravelGuide, Admin
    │   ├── data/
    │   │   ├── tours.ts          # Tour catalogue (source of truth)
    │   │   ├── siteConfig.ts     # Centralized owner/contact config
    │   │   ├── faq.ts, guides.ts, reviews.ts
    │   ├── types/index.ts        # Shared TypeScript types
    │   └── styles/globals.css    # Tailwind layers + global styles
    ├── copy-routes.js            # Post-build: mirrors dist/ → out/
    ├── vite.config.ts            # Multi-page inputs + dev-only admin save API
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── tsconfig.json
    ├── vercel.json               # Vercel build/output settings
    └── package.json
```

---

## Local Development

**Prerequisites:** [Node.js](https://nodejs.org/) 18 or newer and npm.

All commands are run from inside the `app/` directory:

```bash
cd app

# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Create a production build → app/dist/ (mirrored to app/out/)
npm run build

# 4. (Optional) Preview the production build locally
npm run preview
```

### Editing content
- **Tours:** edit `app/src/data/tours.ts`, or use the admin dashboard while `npm run dev` is running (see below).
- **Contact details:** edit `app/src/data/siteConfig.ts`, or use the dashboard's contact settings.
- **Images:** add files to `app/public/images/` and reference them as `/images/<file>`.

---

## Admin Dashboard

Open **`/admin/`** (e.g. `http://localhost:5173/admin/`) and sign in.

### How changes are saved

| Environment | What "Save" does |
| --- | --- |
| **Local dev** (`npm run dev`) | Writes changes straight into `src/data/tours.ts` and `src/data/siteConfig.ts` via a dev-only Vite middleware (`/api/save-tours`, `/api/save-config`), **and** saves them to browser `localStorage`. Commit those files to publish the changes. |
| **Deployed site** (Vercel, static) | Saves to the current browser's `localStorage` only. Changes are visible **only in that browser** — other visitors still see the data that was in the build. |

**Recommended workflow to update the live site:** run the site locally with `npm run dev`, make edits in `/admin/`, then commit and push the updated `src/data/*.ts` files. Vercel will redeploy automatically.

### ⚠️ Security notice
The admin login is a **client-side check only**, and the default password (`admin123`) is embedded in the JavaScript bundle. It keeps casual visitors out of the UI but is **not** real authentication. Because the deployed dashboard can only change the visitor's own browser storage, it cannot alter what the public sees — but before treating the dashboard as secure, change the password in `app/src/pages/AdminPage.tsx` and consider adding server-side protection (e.g. Vercel Password Protection, or a real auth provider with a backend/database).

---

## Deploying to Vercel

This repository keeps the app in a subfolder, so Vercel must be pointed at it.

1. Push the repository to GitHub.
2. In Vercel, click **Add New… → Project** and import the repository.
3. Configure the project:

   | Setting | Value |
   | --- | --- |
   | **Root Directory** | **`app`** ← required |
   | Framework Preset | Vite |
   | Install Command | `npm install` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |

4. Click **Deploy**.

`app/vercel.json` already declares the framework, build command, output directory, and `trailingSlash: true`, so the Root Directory is the only setting you must change by hand. Every push to `main` triggers a new production deployment.

> If the Root Directory is left at the repository root, the build will fail because there is no `package.json` there.

---

## Owner & Contact

**Mohammed El Kouih** — Roaming Camels Morocco

| | |
| --- | --- |
| 📞 Phone / WhatsApp | [+212 659-307677](tel:+212659307677) (local: 0659307677) · [Chat on WhatsApp](https://wa.me/212659307677) |
| ✉️ Email | [mohammedlakouaihi000@gmail.com](mailto:mohammedlakouaihi000@gmail.com) |
| 📸 Instagram | [@_mohammed____cb](https://www.instagram.com/_mohammed____cb/) |
| 📍 Location | Morocco |

---

© Roaming Camels Morocco. All rights reserved.
