# Portfolio

Personal portfolio for Priyanka Gautam, built as a Spotify-style client: content is
organized into playlists of tracks rather than conventional portfolio sections.

Stack: Vite, React 18, TypeScript, Tailwind CSS v4, Framer Motion, React Router 7.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` | Type check, then production build into `build/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run smoke` | Render every route server-side and assert on the markup |
| `npm run verify` | typecheck + smoke + build |

## Editing content

All content lives in `src/data/` — nothing is hardcoded in components.

- `src/data/profile.ts` — name, bio, stats, social links, employer logos
- `src/data/playlists.ts` — every playlist and track

A **track** is one piece of work: a project, a role, or a community commitment. The player
metaphor maps onto real data:

- `duration` — months of active work, written `mm:ss` (eight months reads `8:00`)
- `plays` — a reach metric for that work
- `tags` — the actual technology stack, rendered as genre pills

Adding a project means adding a `Track` object and listing it in a playlist's `tracks`
array. Artwork goes in `public/assets/`; if a track has no `artwork`, it falls back to a
gradient tile rather than a broken image.

> Values commented `VERIFY` in `src/data/playlists.ts` are estimates derived from the
> résumé summary — dates and tenure lengths in particular. Confirm them before deploying.

## Architecture

```
src/
  App.tsx                  route tree
  types.ts                 content model
  data/                    all content
  context/PlayerContext    player state (no audio — a metaphor over real data)
  hooks/                   media query, scroll progress, reduced motion
  components/layout/       AppShell, Sidebar, TopBar, NowPlayingBar, MobileTabBar
  components/ui/           presentational primitives
  components/playlist/     playlist card, track list, track row, track detail
  pages/                   one file per route
scripts/smoke.tsx          route smoke test
```

Two decisions worth knowing before changing layout code:

1. **The main pane is the only scroll container.** `body` has `overflow: hidden`. This is
   what keeps nested panes and `100vh` children from fighting, and guarantees the page
   never scrolls horizontally. Adding a second scroll container will reintroduce that
   class of bug.
2. **The player controls do real work.** Nothing in `NowPlayingBar` is decorative — play,
   pause, next, previous, shuffle, repeat and seek all change observable state, so their
   `aria-pressed` values are honest. Don't add a control that reports state it doesn't have
   (a volume slider was left out for exactly this reason).

## Routes

`/` · `/library` · `/playlist/:slug` (`?track=<slug>` deep-links an expanded track) ·
`/search` · `/resume`

Paths from the previous version of the site (`/ProjectsHomepage`, `/CapstoneHomepage`,
`/ExtracurricularHomepage`, `/ResumeHomepage`) redirect to their new equivalents.

## Deployment

`npm run build` outputs to `build/` — the same directory the previous Create React App
setup used, so existing deploy configuration keeps working. `public/_redirects` sends all
paths to `index.html` so client-side routes survive a hard refresh on Netlify. On another
host, configure the equivalent SPA fallback.

The design spec is at `docs/superpowers/specs/2026-07-28-spotify-portfolio-design.md`.
