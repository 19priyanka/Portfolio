export type ArtworkFit = 'logo' | 'cover' | 'contain';

export type LinkKind = 'code' | 'demo' | 'video' | 'design' | 'doc' | 'site';

export interface TrackLink {
  label: string;
  href: string;
  kind: LinkKind;
}

/**
 * A single piece of work — a project, a role, or a community commitment.
 *
 * Nothing here pretends to be audio. Where Spotify shows a track length, this
 * shows `meta` — the honest number for that row, which is tenure for a role and
 * a timespan or year for a project. A fake mm:ss clock was removed precisely
 * because a running timer with no sound behind it reads as broken.
 */
export interface Track {
  slug: string;
  title: string;
  /** The "artist" line beneath the title. */
  subtitle: string;
  /** Falls back to a generated cover when absent. */
  artwork?: string;
  /**
   * How the image should sit in its tile.
   *   logo    dark-on-transparent brand mark; gets a light plate behind it
   *   cover   a screenshot; fills the tile, anchored to the top
   *   contain the whole image must be visible
   */
  artworkFit?: ArtworkFit;
  /** Right-hand column of the track row. Tenure for roles, timespan for projects. */
  meta: string;
  /** Longer form of `meta`, shown in the detail panel. */
  metaLabel?: string;
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
  /** Falls back to a generated cover when absent. */
  cover?: string;
  /** How the cover image sits in its tile. See Track.artworkFit. */
  coverFit?: ArtworkFit;
  /** Short line under the playlist title in the library, e.g. "6 builds". */
  blurb: string;
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

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Education {
  school: string;
  degree: string;
  years: string;
  gpa: string;
  logo: string;
  honours: string[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  avatar: string;
  bio: string;
  tagline: string;
  /** Explains the record-collection conceit to a first-time visitor. */
  musicNote: string;
  stats: StatChipData[];
  socials: SocialLink[];
  resumePdf: string;
  education: Education;
  skills: SkillGroup[];
  languages: string[];
  certifications: string[];
  employers: { name: string; logo: string; height: string }[];
}
