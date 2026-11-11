# Roaming Camels Morocco

A fast, modern web application for **Roaming Camels Morocco**, offering private and tailor-made Morocco tours. Travelers can browse comprehensive itineraries, filter day trips and multi-day packages with an interactive tour finder, read Morocco travel guides, and request personalized quotes.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Deployment Guide (Vercel)](#deployment-guide-vercel)

---

## Features

### Morocco Tour Finder
- Full catalogue of multi-day tours (e.g., 8-Day Imperial Cities, 12-Day Ultimate Morocco, 18-Day Grand Morocco) and day trips from Marrakech (Agafay Desert, Imlil, Ourika Valley, Essaouira, Aït Ben Haddou, and Ouzoud Waterfalls).
- Interactive filtering via the `TourFinderFilter` component supporting search by keyword, tour category, departure city, destination, and trip length.
- Tour cards with photography, duration, key highlights, and pricing estimates.

### Multi-Page Static Routing
Generated as static HTML entry points by Vite for performance, fast initial page loads, direct URL access, and search engine friendliness:

| Route | Page |
| --- | --- |
| `/` | Home |
| `/morocco-tour-finder/` | Tour Finder |
| `/about/` | About Us |
| `/how-we-work/` | How We Work |
| `/faq/` | FAQ |
| `/morocco-travel-guide/` | Morocco Travel Guide |

Internal navigation is intercepted for smooth client-side page transitions (HTML5 History API) alongside smooth scrolling for on-page anchors (e.g. `/#quote-form`, `/#extended_tours`).

### Interactive Quote Form
- Personalized itinerary inquiry form collecting group size, duration, preferred dates, accommodation tiers, and custom travel requests.
- Direct links for instant WhatsApp messaging and phone contact.

### Centralized Content Management
- Centralized site configuration (`app/src/data/siteConfig.ts`) driving navigation, footer details, and contact points throughout all pages.
- Structured tour data (`app/src/data/tours.ts`) enabling simple content updates.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| UI Framework | [React 18](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build Tool & Dev Server | [Vite 5](https://vitejs.dev/) (Multi-page configuration) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS / Autoprefixer |
| Icons | [lucide-react](https://lucide.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Project Structure

The web application is located entirely inside the **`app/`** directory:

```
.
├── README.md
└── app/                          # Main web application
    ├── index.html                # Home page entry
    ├── about/index.html          # Entry for /about/
    ├── faq/index.html            # Entry for /faq/
    ├── how-we-work/index.html    # Entry for /how-we-work/
    ├── morocco-tour-finder/index.html
    ├── morocco-travel-guide/index.html
    ├── admin/index.html          # Internal management entry
    ├── api/                      # Serverless backend functions (Vercel)
    │   ├── verify-admin.ts       # Secure admin authentication
    │   ├── save-tours.ts         # Remote tours persistence
    │   ├── save-config.ts        # Remote site config persistence
    │   └── get-data.ts           # Remote data retrieval
    ├── public/
    │   └── images/               # Tour photography, logos, and image assets
    ├── src/
    │   ├── main.tsx              # React bootstrap
    │   ├── App.tsx               # Routing & page transitions
    │   ├── components/           # Navbar, Footer, QuoteForm, TourCard, TourFinderFilter
    │   ├── pages/                # Home, About, HowWeWork, FAQ, TravelGuide, Admin
    │   ├── data/
    │   │   ├── tours.ts          # Tour catalogue data
    │   │   ├── siteConfig.ts     # Centralized contact and site settings
    │   │   ├── faq.ts, guides.ts, reviews.ts
    │   ├── types/index.ts        # Shared TypeScript interfaces
    │   └── styles/globals.css    # Tailwind CSS and global styling
    ├── copy-routes.js            # Post-build distribution script
    ├── vite.config.ts            # Vite multi-page build configuration
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── tsconfig.json
    ├── vercel.json               # Vercel deployment settings
    └── package.json
```

---

## Local Development

**Prerequisites:** [Node.js](https://nodejs.org/) 18+ and `npm`.

All build and development commands run from inside the `app/` directory:

```bash
# Navigate to the application folder
cd app

# 1. Install dependencies
npm install

# 2. Start the local development server (http://localhost:5173)
npm run dev

# 3. Create a production build (outputs to dist/ and out/)
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## Deployment Guide (Vercel)

This repository is configured for deployment on [Vercel](https://vercel.com/).

### 1. Configure the Project
1. Import this repository in Vercel.
2. In the project settings, set:
   - **Root Directory**: `app` (required, as the web app is inside the `app/` folder)
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 2. Environment Variables (Optional)
To enable secure remote administration and automatic GitHub commits from any device:

| Variable | Description |
| --- | --- |
| `ADMIN_PASSWORD` | Private password used to authenticate remote admin requests. |
| `GITHUB_TOKEN` | Personal Access Token (classic or fine-grained with `Contents: Read and write` permission). |
| `GITHUB_REPO` | Target GitHub repository (`ygyg4255-dotcom/roamingcamelsmorocco`). |
| `GITHUB_BRANCH` | Target branch (default: `main`). |

When `GITHUB_TOKEN` and `GITHUB_REPO` are configured, updates saved via the admin interface commit the updated data files directly to the GitHub repository, triggering an automatic Vercel redeployment.
