# Way Out — Next.js Client

Frontend for [Way Out Magazine](https://way-out-next-client.vercel.app), a Berlin-based culture and music publication. Built with Next.js and powered by a Sanity CMS backend.

## Tech Stack

- **Framework:** Next.js (Pages Router)
- **CMS:** Sanity.io (via `next-sanity`)
- **Styling:** Tailwind CSS + custom CSS
- **Animations:** Framer Motion
- **Layout:** React Masonry CSS + Infinite Scroll
- **Deployment:** Vercel

## Features

- Mixed content feed (posts + radio episodes) with infinite scroll and interleaved layout
- Category pages: Interviews, Stuff We Like, Radio
- Full-text search across posts and radio episodes
- Mixcloud widget integration for radio episodes with tracklists
- Dark mode support
- Cookie consent
- Sanity preview mode
- Email subscription
- Ad system (side and bottom placements)

## Project Structure

```
way-out-next-client/
├── public/
│   └── assets/
│       ├── background/        # Hero images, overlays, card textures
│       ├── favicons/          # All favicon sizes
│       ├── icons/             # Hand-drawn SVG icons per category
│       ├── logos/             # Way Out logo variants
│       ├── placeholder/       # Responsive placeholder images
│       └── typography/        # Custom font files (Agrandir, Averia Serif, Copenhagen Grotesk)
├── src/
│   ├── components/            # UI components
│   │   ├── layout.jsx         # Root layout wrapper
│   │   ├── header.jsx         # Site header
│   │   ├── footer.jsx         # Site footer (+ SVG variants for dark mode)
│   │   ├── navbar-desktop.jsx
│   │   ├── navbar-mobile.jsx
│   │   ├── masonry-grid.jsx   # Infinite scroll masonry feed
│   │   ├── masonry-item.jsx   # Individual card in grid
│   │   ├── hero-post.jsx      # Featured post hero
│   │   ├── post-body.jsx      # Sanity portable text renderer
│   │   ├── post-header.jsx
│   │   ├── post-layout.jsx
│   │   ├── radio-grid.jsx     # Radio episode grid
│   │   ├── radio-item.jsx
│   │   ├── radio-layout.jsx
│   │   ├── mixcloud-widget.jsx
│   │   ├── tracklist.jsx
│   │   ├── search-bar.jsx
│   │   ├── search-result.jsx
│   │   ├── info-drawer.jsx    # Slide-out info/about panel
│   │   ├── subscribe.jsx      # Email subscription form
│   │   ├── social-sharing.jsx
│   │   ├── tags.jsx
│   │   ├── page-transition.jsx # Framer Motion page transitions
│   │   ├── landing-overlay.jsx # Decorative hand-drawn overlay
│   │   ├── theme-wrapper.jsx
│   │   └── index.js           # Barrel export for all components
│   ├── context/
│   │   └── state.jsx          # Global app state (Context API)
│   ├── pages/
│   │   ├── _app.jsx           # App wrapper, global data fetching
│   │   ├── index.jsx          # Home — mixed post/radio feed
│   │   ├── interviews.jsx     # Interviews category page
│   │   ├── radio.jsx          # Radio shows listing
│   │   ├── search.jsx         # Search results page
│   │   ├── stuff-we-like.jsx  # Stuff We Like category page
│   │   ├── legal.jsx          # Legal/privacy page
│   │   ├── posts/[slug].jsx   # Individual post page
│   │   ├── radios/[slug].jsx  # Individual radio episode page
│   │   └── api/
│   │       ├── load-more.js   # Infinite scroll pagination endpoint
│   │       ├── search.js      # Search endpoint
│   │       ├── subscribe.js   # Email subscription endpoint
│   │       ├── preview.js     # Sanity preview mode toggle
│   │       └── exit-preview.js
│   └── utils/
│       ├── queries.js         # All GROQ queries for Sanity
│       ├── sanity.js          # Client-side Sanity helpers (image builder, preview hook)
│       ├── sanity.server.js   # Server-side Sanity clients
│       ├── config.js          # Sanity project config
│       ├── helpers.js         # Utility functions (debounce etc.)
│       ├── animation.js       # Framer Motion variants
│       ├── formatDate.js      # Date formatting
│       ├── interleave.js      # Post/radio interleaving logic for feed
│       ├── random.js          # Random utility
│       ├── useWindowDimensions.js
│       └── useWindowWidth.js
└── styles/
    └── index.css              # Global styles + Tailwind directives + custom fonts
```

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=        # for preview mode
```

## Deployment

Deployed on [Vercel](https://vercel.com). ISR (Incremental Static Regeneration) is used on content pages with a 10-second revalidation window.
