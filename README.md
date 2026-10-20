# Grace Arena Ministries Website & Web App

Official website for Grace Arena Ministries, built with React, TypeScript, Vite,
Tailwind CSS and Contentful CMS, now upgraded into a full **web app** powered by
an Appwrite backend (authentication, database, member area and an admin control
center).

> Content rendered from **Contentful** (hero, events, visionary, etc.) is
> unchanged and remains linked to production. The Appwrite layer is additive and
> lives alongside it — the two systems are independent.

## Tech Stack

- React 19
- TypeScript 5
- Vite 8
- Tailwind CSS 4
- React Router
- Contentful SDK + Rich Text Renderer (production CMS content)
- Appwrite (auth, TablesDB database, member & admin app)
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
# Contentful (production CMS — unchanged)
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_CDA_TOKEN=your_content_delivery_access_token
VITE_CONTENTFUL_CDN_URL=cdn.contentful.com

# Appwrite (web app backend)
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=grace_arena
```

Notes:
- `VITE_CONTENTFUL_SPACE_ID` and `VITE_CONTENTFUL_CDA_TOKEN` are required.
- `VITE_CONTENTFUL_CDN_URL` is optional (defaults to `cdn.contentful.com`).
- The `VITE_APPWRITE_*` values are safe to expose in the client (public project
  id + endpoint). Secrets/API keys must never be placed in frontend code.

## Web App (Appwrite)

The web app reuses the project's existing Appwrite **authentication** and other
resources, and stores its data in a dedicated `grace_arena` TablesDB database
(separate from any pre-existing databases).

### Authentication & roles

- Email/password accounts via Appwrite Auth (`src/context/AuthContext.tsx`).
- Admin access is gated by the Appwrite user **label** `admin`
  (`label:admin`). Members without it only reach `/dashboard`.

### Database tables (`grace_arena`)

| Table | Purpose | Access |
| --- | --- | --- |
| `profiles` | Member profile + preferences | Owner + admin |
| `prayer_requests` | Confidential prayer submissions | Create: anyone · Read: admin (+ owner) |
| `appointments` | Appointment/booking requests | Create: anyone · Read: admin (+ owner) |
| `events` | Services, conferences, classes | Read: public · Write: admin |
| `registrations` | Event registrations (with reference) | Create: anyone · Read: admin (+ owner) |
| `testimonies` | Submitted testimonies (reviewed) | Create: anyone · Read: admin |
| `contact_submissions` | General inquiries | Create: anyone · Read: admin |
| `subscribers` | Email/SMS newsletter opt-ins | Create: anyone · Read: admin |
| `announcements` | News & notices | Read: public · Write: admin |
| `sermons` | Video/audio teaching metadata | Read: public · Write: admin |

Permissions are enforced by Appwrite (collection + row-level), not by the
frontend. Public content is read-only to visitors; submissions are write-only to
visitors and readable by the admin team (and the submitter when signed in).

### Key frontend files

- `src/lib/appwrite.ts` — Appwrite client, table IDs, organizations.
- `src/lib/api.ts` — typed data-access helpers (auth, submissions, admin).
- `src/components/forms/*` — reusable, Appwrite-wired forms.
- `src/pages/{Login,Signup,Connect,Sermons,Dashboard,Admin}.tsx` — app pages.

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
- `/sermons` → Sermons & media (Appwrite)
- `/roadmap` → GAM Roadmap (Connect • Grow • Serve • Expand)
- `/care` → GAM Care (community outreach; Contentful content embedded)
- `/giving` → Giving (why & how to give; payment details)
- `/connect` → Prayer, appointments, testimonies, subscribe, inquiries (Appwrite)
- `/login`, `/signup` → Authentication
- `/dashboard` → Member area (protected)
- `/admin` → Ministry Control Center (protected, admin label only)

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
