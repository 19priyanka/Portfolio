export type LinkKind = 'code' | 'demo' | 'video' | 'design' | 'doc' | 'site';

export interface TrackLink {
  label: string;
  href: string;
  kind: LinkKind;
}

/**
 * A single piece of work — a project, a role, or a community commitment.
 *
 * The player metaphor is mapped onto real career data rather than invented:
 *   duration  the timespan of the work (an eight-month capstone reads "8:04")
 *   plays     a reach metric (students mentored, users served, stores deployed)
 *   tags      the technology stack, rendered as genre pills
 */
export interface Track {
  slug: string;
  title: string;
  /** The "artist" line beneath the title. */
  subtitle: string;
  /** Falls back to a gradient tile when absent. */
  artwork?: string;
  /** Display form, mm:ss. Kept alongside the numeric value so the two can't drift. */
  duration: string;
  durationSeconds: number;
  /** Pre-formatted reach metric, e.g. "80+ mentored". */
  plays: string;
  /** Omitted where the date isn't confirmed rather than guessed at. */
  year?: string;
  tags: string[];
  summary: string;
  highlights: string[];
  links: TrackLink[];
}

export type PlaylistKind = 'playlist' | 'album' | 'podcast';

export interface Playlist {
  slug: string;
  title: string;
  description: string;
  kind: PlaylistKind;
  /** Falls back to a gradient tile when absent. */
  cover?: string;
  /** Tailwind gradient classes for the header wash and card fallback. */
  gradient: string;
  /** Solid color used for the scroll-linked top bar tint. */
  accent: string;
  tracks: Track[];
}

export interface StatChipData {
  label: string;
  value: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'linkedin' | 'github' | 'mail';
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  avatar: string;
  bio: string;
  tagline: string;
  stats: StatChipData[];
  socials: SocialLink[];
  resumePdf: string;
  employers: { name: string; logo: string; height: string }[];
}
