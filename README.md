# Developer Portfolio

Production-ready, frontend-only portfolio built with React, TypeScript, Vite, and Tailwind CSS. Deployable directly to Vercel with **zero backend**.

## Overview

Communicates a systems-builder profile across:

- Full-stack web & mobile
- Computer vision / OCR
- Cloud & infrastructure
- Robotics, IoT, embedded
- Research (A* vs GCCP pathfinding)

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Framer Motion
- Lucide icons
- Vercel Web Analytics
- Client-side content via TypeScript data + `localStorage`

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Personal information

Edit `src/config/site.ts`:

- name, tagline, role
- email, GitHub, LinkedIn
- currently building / learning / focus
- Vercel Analytics dashboard URL

## Content data

Default content lives in `src/data/`:

| File | Purpose |
|------|---------|
| `projects.ts` | Project showcase + case studies |
| `skills.ts` | Skills by category |
| `experience.ts` | Timeline (placeholders by default) |
| `research.ts` | Research entries |

To permanently publish content changes, edit these files and redeploy. Browser edits only affect the current device.

## Control Room (local admin)

Hidden route: `/control-room` (not in the navbar).

Open via:

- Keyboard: `Ctrl/Cmd + Shift + K`
- Footer: triple-click **built with intent**

Features:

- Dashboard counts + Open Vercel Analytics
- CRUD for projects, skills, experience, research
- Duplicate / featured / reorder projects
- Import JSON / Export JSON / Reset to default

**Important:** localStorage changes are browser-local only. This is a content editor, not authenticated publishing.

## Contact form

The contact UI uses `mailto:` — it opens the visitor’s email client. Nothing is stored on a server.

## Vercel deployment

1. Push to GitHub
2. Import the repo in Vercel
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`

`vercel.json` rewrites all routes to `index.html` so SPA paths like `/projects/:slug` work on refresh.

### Analytics

```bash
npm install @vercel/analytics
```

Already integrated via `@vercel/analytics/react` in the root layout. After deploy, open analytics from the Vercel dashboard (or the Control Room button).

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/projects` | Projects |
| `/projects/:slug` | Project detail |
| `/skills` | Skills |
| `/research` | Research |
| `/experience` | Experience |
| `/contact` | Contact |
| `/404` | Not found |
| `/control-room` | Local editor (hidden) |

## Design notes

- Dark mode default; light mode fully supported (persisted)
- `prefers-reduced-motion` respected
- Semantic HTML, keyboard-accessible nav, focus states

## License

Private portfolio project — update as needed.
