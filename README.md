# Grace Arena Ministries Website

Official website for Grace Arena Ministries, built with React, TypeScript, Vite, Tailwind CSS, and Contentful CMS integration.

## Tech Stack

- React 19
- TypeScript 5
- Vite 8
- Tailwind CSS 4
- React Router
- Contentful SDK + Rich Text Renderer
- ESLint

## Features

- Multi-page navigation:
  - Home
  - Events
  - Event details
  - Meet the Visionary
- Dynamic CMS content from Contentful for key sections
- Rich text rendering support (headings, lists, links, quotes, tables, etc.)
- Responsive layout across desktop and mobile
- Smooth scroll behavior for section navigation

## Project Structure

- `src/components` — reusable UI sections and content blocks
- `src/pages` — route-level pages
- `src/lib` — utility helpers (including Contentful env handling)
- `public` — static assets
- `src/assets` — local image assets

## Environment Variables

Create a `.env` file in the project root with:

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_CDA_TOKEN=your_content_delivery_access_token
VITE_CONTENTFUL_CDN_URL=cdn.contentful.com
```

Notes:
- `VITE_CONTENTFUL_SPACE_ID` and `VITE_CONTENTFUL_CDA_TOKEN` are required.
- `VITE_CONTENTFUL_CDN_URL` is optional (defaults to `cdn.contentful.com`).

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Available Scripts

From `package.json`:

- `npm run dev` — run Vite dev server
- `npm run build` — type-check and build
- `npm run lint` — run ESLint
- `npm run preview` — preview built app

## Routes

Defined in `src/App.tsx`:

- `/` → Home
- `/about` → Meet the Visionary
- `/events` → Events listing
- `/events/:eventId` → Event detail page

## Contentful Content Types Used

The app fetches content from these Contentful types:

- `gamHero`
- `declarations`
- `gaMcare`
- `membership`
- `visionary`

If Contentful data is missing/unavailable, UI fallbacks are rendered where configured.

## Development Notes

- Router is initialized in `src/main.tsx`.
- Navbar is rendered globally above route content.
- Styling is Tailwind-first with some component-level custom class values.
- Strict TypeScript and ESLint rules are enabled.

## License

Private project. All rights reserved by Grace Arena Ministries.
