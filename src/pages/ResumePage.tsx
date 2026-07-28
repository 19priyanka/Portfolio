import { Download, FileText } from 'lucide-react';
import { getPlaylist } from '../data/playlists';
import { profile } from '../data/profile';
import { usePageChrome } from '../components/layout/AppShell';
import { PageTransition } from '../components/ui/PageTransition';
import { Artwork } from '../components/ui/Artwork';
import { TagPill } from '../components/ui/TagPill';
import type { Playlist, Track } from '../types';

const SECTIONS: { heading: string; slug: string }[] = [
  { heading: 'Experience & education', slug: 'experience' },
  { heading: 'Leadership & mentorship', slug: 'mentorship' },
  { heading: 'Volunteering', slug: 'community' },
];

/**
 * The résumé rendered as real HTML rather than an embedded PDF. The previous
 * version used an <iframe> around the PDF, which several mobile browsers refuse
 * to render at all, and which no screen reader or search engine can read. The
 * PDF is still offered as a download.
 */
export function ResumePage() {
  usePageChrome({ title: 'Discography', accent: '#3f2a12' });

  const sections = SECTIONS.map((section) => ({
    heading: section.heading,
    playlist: getPlaylist(section.slug),
  })).filter((section): section is { heading: string; playlist: Playlist } =>
    Boolean(section.playlist),
  );

  return (
    <PageTransition>
      <header className="relative -mt-16 bg-linear-to-b from-amber-800 via-amber-950 to-elevated px-4 pt-24 pb-8 sm:px-6 sm:pt-28">
        <p className="text-[11px] font-bold tracking-widest uppercase">Discography</p>
        <h1 className="mt-2 text-3xl leading-none font-extrabold tracking-tight sm:text-5xl">
          The full history
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
          Roles, education and community work in one place — {profile.name}, {profile.title}.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={profile.resumePdf}
            download
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-black transition-colors duration-200 hover:bg-accent-bright"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download résumé (PDF)
          </a>
          <a
            href="/docs/Handheld_App_Poster.pdf"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-2.5 text-sm font-bold transition-colors duration-200 hover:border-white hover:bg-white/10"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Capstone poster
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </header>

      <div className="px-4 pb-4 sm:px-6">
        {sections.map(({ heading, playlist }) => (
          <section key={playlist.slug} className="mt-12 first:mt-8">
            <h2 className="text-xl font-bold sm:text-2xl">{heading}</h2>
            <ol className="mt-6 space-y-8">
              {playlist.tracks.map((track) => (
                <TimelineEntry key={track.slug} track={track} playlist={playlist} />
              ))}
            </ol>
          </section>
        ))}
      </div>
    </PageTransition>
  );
}

function TimelineEntry({ track, playlist }: { track: Track; playlist: Playlist }) {
  return (
    <li className="relative border-l border-line pl-6 sm:pl-8">
      <span
        aria-hidden="true"
        className="absolute top-2 -left-[5px] h-2.5 w-2.5 rounded-full bg-accent"
      />
      <div className="flex flex-wrap items-start gap-4">
        <Artwork
          src={track.artwork}
          alt=""
          decorative
          gradient={playlist.gradient}
          className="h-14 w-14 shrink-0"
          rounded="rounded"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold">{track.title}</h3>
          <p className="text-sm text-subdued">
            {track.subtitle}
            {track.year && <span> · {track.year}</span>}
          </p>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-subdued">{track.summary}</p>

          <ul className="mt-3 space-y-2">
            {track.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-subdued">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {track.tags.map((tag) => (
              <TagPill key={tag} label={tag} interactive />
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
