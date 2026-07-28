# Spotify-Style Portfolio Rebuild — Design

**Date:** 2026-07-28
**Status:** Approved

## Goal

Replace the existing Create React App + MUI portfolio with a portfolio whose layout,
navigation, and feel are modelled on Spotify's desktop web client. Content is organized as
playlists of tracks rather than conventional portfolio sections.

## Non-goals

- No Spotify Web API integration. Player affordances are a metaphor over real career data,
  not a music client. No OAuth, no tokens, no backend.
- No CMS. Content lives in typed TypeScript modules in the repo.
- No blog, no contact form, no analytics beyond the existing New Relic browser agent.

## Stack

Removed: `react-scripts`, `@mui/material`, `@mui/icons-material`, `@emotion/react`,
`@emotion/styled`, `bootstrap`, `web-vitals`, `@testing-library/*`.

Added:

| Package | Purpose |
| --- | --- |
| `vite` + `@vitejs/plugin-react` | Build tooling. CRA is unmaintained. |
| `typescript` | Types for the content model. |
| `tailwindcss` v4 + `@tailwindcss/vite` | Design system. CSS-first `@theme`, no PostCSS config. |
| `framer-motion` | Page transitions, hover and stagger animation. |
| `react-router-dom` v7 | Routing (already a dependency). |
| `lucide-react` | Icon set. |
| `@fontsource-variable/inter` | Self-hosted font. No CDN request. |

`vite.config.ts` sets `build.outDir: 'build'` so any deploy pipeline configured against the
CRA output directory keeps working. `public/_redirects` adds `/* /index.html 200` so client
routes survive a hard refresh on Netlify.

## Design tokens

Declared once in `src/index.css` under Tailwind v4 `@theme`.

```
--color-base        #000000
--color-elevated    #121212
--color-card        #181818
--color-hover       #1f1f1f
--color-highlight   #2a2a2a
--color-text        #ffffff
--color-subdued     #a7a7a7
--color-accent      #1DB954   (Spotify green)
--color-cyan        #22d3ee
--color-amber       #f59e0b
```

Contrast: `#a7a7a7` on `#121212` is 6.4:1; `#1DB954` on `#000000` is 6.3:1. Both pass
WCAG AA for normal text. Green is never used as a text color on a light surface, where it
would fail.

The site is dark-mode only by design — it is imitating a dark-mode product. There is no
light theme and no theme toggle.

## Application shell

```
grid-cols-[auto_1fr] grid-rows-[1fr_auto]

Sidebar        240px at >=lg, 72px icon rail at md, hidden below md
MainPane       the only scroll container in the app; document body never scrolls
  TopBar       sticky; background opacity interpolated from MainPane scroll position
NowPlayingBar  fixed bottom, full width
MobileTabBar   below md only, stacked directly above NowPlayingBar
```

A single scroll owner removes the class of bugs where nested scroll containers and
`100vh` children fight each other. `overflow-x: clip` on the shell guarantees the page
never scrolls horizontally; each carousel is its own `overflow-x-auto` region.

TopBar back/forward chevrons call `navigate(-1)` and `navigate(1)`.

### Player state

`PlayerContext` holds `{ playlistSlug, trackSlug, isPlaying }`. Pressing play on a playlist
or track sets that context and starts a progress animation and the equalizer bars in the
matching track row. Play/pause genuinely toggles that animation, so the control reports
honest `aria-pressed` state rather than presenting a non-functional widget to assistive
technology. Progress advances against the track's declared `duration` and wraps at the end.

No audio is played.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — artist profile |
| `/library` | All playlists |
| `/playlist/:slug` | Playlist detail; `?track=<slug>` deep-links an expanded track |
| `/search` | Filter across every track |
| `/resume` | Experience timeline plus PDF download |
| `*` | 404 |

Legacy CRA paths redirect with `<Navigate replace>`:
`/ProjectsHomepage` → `/playlist/projects`, `/CapstoneHomepage` → `/playlist/featured`,
`/ExtracurricularHomepage` → `/playlist/community`, `/ResumeHomepage` → `/resume`.

## Content model

`src/data/`, typed, no content literals inside components.

```ts
type TrackLink = { label: string; href: string; kind: 'code' | 'demo' | 'video' | 'design' | 'doc' | 'site' };

type Track = {
  slug: string;
  title: string;
  subtitle: string;      // the "artist" line
  artwork: string;
  duration: string;      // mm:ss
  durationSeconds: number;
  plays: string;         // formatted reach metric
  year: string;
  tags: string[];        // genre pills
  summary: string;
  highlights: string[];
  links: TrackLink[];
};

type Playlist = {
  slug: string;
  title: string;
  description: string;
  kind: 'playlist' | 'album' | 'podcast';
  cover: string;
  gradient: string;      // Tailwind gradient class for the header wash
  tracks: Track[];
};
```

The music metaphor maps to real data, documented in the data files:

- `duration` encodes project timespan — an eight-month capstone reads `8:04`.
- `plays` encodes a reach metric — students mentored, users served, stores deployed to.
- `tags` are the technology stack, rendered as genre pills.

### Playlists

1. **Featured** (`featured`) — Calgary Co-Op Handheld Scanner capstone, pinned single.
2. **Shipped Builds** (`projects`) — Brainy Bees, VR-HaptoSkin-Pro/LayerSense, GetHomeSafe,
   MatchAid, MNIST model comparison, and the capstone.
3. **On Repeat: 9-to-5** (`experience`) — CNRL, New Relic, University of Calgary.
4. **Paying It Forward** (`mentorship`, podcast) — Schulich Student Mentorship Program,
   CNQBay / United Way charity auction chair.
5. **Community Sessions** (`community`) — CAGIS STEM Expert volunteering.

## Pages

**Home.** Profile header: photo, verified badge, name, punchy bio, stat chips (years
shipping, students mentored, first place at the Engineering Design Fair). Play / Follow /
Share row. Then a pinned Featured card, playlist rows, an employer logo strip, and a top
genres tag cloud.

**Playlist page.** Gradient header carrying the playlist's assigned color, cover art,
title, avatar plus track count plus total runtime, then Play / Shuffle / Save. Below, a
semantic `<ol>` track list: index cell that swaps to animated equalizer bars while playing,
artwork, title and subtitle, genre pills, duration. Each row is a `<button>` with
`aria-expanded` that expands an inline detail panel containing the summary, highlights and
links.

**Search.** Client-side filter across every track's title, subtitle, tags and summary, with
genre chips as quick filters.

**Resume.** Experience rendered as native HTML — a timeline of roles with responsibilities
and stack — plus a Download PDF button. Replaces the previous `<iframe>` PDF embed, which
does not render on several mobile browsers and cannot be styled or made accessible.

**404.** "We couldn't find that track", with a route back to Home.

## Motion

Page transitions fade and rise 8px over 220ms, ease-out, via `AnimatePresence` keyed on
pathname. Card hover scales artwork to 1.03 and fades the play button up. Track rows enter
on a 30ms stagger. Every duration passes through a `useReducedMotion` hook that returns 0
when `prefers-reduced-motion: reduce` is set, so there is no animation path that ignores the
preference.

## Accessibility

- Semantic `nav`, `main`, `section`, `ol` structure; one `h1` per page.
- Skip-to-content link as the first focusable element.
- `focus-visible` rings in accent green. No `outline: none` without a replacement indicator.
- Track rows are real buttons with `aria-expanded` and `aria-controls`.
- Meaningful images carry `alt`; decorative artwork uses `alt=""`.
- Truncated text carries a `title` attribute so the full string stays reachable.
- The player exposes only controls that do something.

## Assets

Images move from `src/` to `public/assets/`; PDFs move to `public/docs/`. Referenced by URL
rather than by bundler import, which keeps the data modules plain and serializable.

The LinkedIn icon currently points at `https://www.linkedin.com`, which resolves to the
site's home page rather than a profile. It is corrected to
`https://www.linkedin.com/in/priyanka-gautam-21b4271b3/`.

## File structure

```
src/
  main.tsx
  App.tsx
  index.css
  types.ts
  data/{profile,playlists}.ts
  context/PlayerContext.tsx
  hooks/{usePrefersReducedMotion,useScrollProgress,useMediaQuery}.ts
  components/layout/{AppShell,Sidebar,TopBar,NowPlayingBar,MobileTabBar}.tsx
  components/ui/{PlayButton,TagPill,StatChip,Equalizer,SectionRow,GradientHeader}.tsx
  components/playlist/{PlaylistCard,TrackList,TrackRow,TrackDetail}.tsx
  pages/{Home,Library,PlaylistPage,SearchPage,ResumePage,NotFound}.tsx
public/
  assets/*.{png,jpeg,svg}
  docs/*.pdf
  _redirects
```

## Verification

- `npm run build` completes with no TypeScript errors.
- `tsc --noEmit` clean.
- Every route renders, including the legacy redirects.
- Layout checked at 320, 375, 768, 1024 and 1440px with no horizontal document scroll.
- Keyboard-only traversal reaches sidebar, track rows, expanded detail links and the player.
