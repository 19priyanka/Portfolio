import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AudioLines, BadgeCheck, Download, MapPin } from 'lucide-react';
import { profile } from '../data/profile';
import { allTracks, featuredPlaylist, playlists } from '../data/playlists';
import { usePlayer } from '../context/PlayerContext';
import { usePageChrome } from '../components/layout/AppShell';
import { PageTransition } from '../components/ui/PageTransition';
import { PlaylistCard } from '../components/playlist/PlaylistCard';
import { SectionRow } from '../components/ui/SectionRow';
import { PlayButton } from '../components/ui/PlayButton';
import { StatChip } from '../components/ui/StatChip';
import { TagPill } from '../components/ui/TagPill';
import { Artwork } from '../components/ui/Artwork';

/** The ten most-used tags across every track, most frequent first. */
function useTopGenres(limit = 12) {
  return useMemo(() => {
    const counts = new Map<string, number>();
    for (const track of allTracks) {
      for (const tag of track.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, limit)
      .map(([tag]) => tag);
  }, []);
}

export function Home() {
  usePageChrome({ title: profile.name, accent: '#0b3b2a' });
  const { playPlaylist, isPlaying, isCurrent } = usePlayer();
  const genres = useTopGenres();

  const featuredTrack = featuredPlaylist.tracks[0]!;
  const featuredActive = isCurrent(featuredPlaylist.slug);

  return (
    <PageTransition>
      {/* Profile header */}
      <section className="relative -mt-16 bg-linear-to-b from-emerald-800 via-emerald-950 to-elevated px-4 pt-24 pb-8 sm:px-6 sm:pt-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <img
            src={profile.avatar}
            alt={`Portrait of ${profile.name}`}
            className="h-40 w-40 shrink-0 rounded-full object-cover shadow-2xl sm:h-52 sm:w-52"
          />

          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-medium">
              <BadgeCheck className="h-5 w-5 text-sky-400" aria-hidden="true" />
              Verified engineer
            </p>
            <h1 className="mt-2 text-4xl leading-none font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">{profile.tagline}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/85">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
              <span aria-hidden="true">·</span>
              {profile.title}
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-white">{profile.bio}</p>

        {/* Tells a first-time visitor why this site is shaped like a music app
            before they have to wonder about it. */}
        <aside className="mt-6 flex max-w-3xl gap-4 border-l-2 border-accent-bright bg-black/25 py-4 pr-5 pl-5 backdrop-blur-sm">
          <AudioLines className="mt-0.5 h-5 w-5 shrink-0 text-accent-bright" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-white/90">{profile.musicNote}</p>
        </aside>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <PlayButton
            playing={featuredActive && isPlaying}
            onClick={() => playPlaylist(featuredPlaylist)}
            label={featuredPlaylist.title}
            size="lg"
          />
          <a
            href={profile.resumePdf}
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-2.5 text-sm font-bold transition-colors duration-200 hover:border-white hover:bg-white/10"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download résumé
          </a>
          <Link
            to="/resume"
            className="text-sm font-bold text-white/80 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
          >
            Read the full history
          </Link>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {profile.stats.map((stat) => (
            <StatChip key={stat.label} {...stat} />
          ))}
        </dl>

        <section className="mt-6 flex flex-wrap items-center gap-5 rounded-xl border border-white/15 bg-black/30 p-5 backdrop-blur-sm">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-white/95 p-2">
            <img
              src={profile.education.logo}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[11px] font-bold tracking-widest text-white/70 uppercase">
              Education
            </h2>
            <p className="mt-1 text-lg leading-tight font-bold">{profile.education.degree}</p>
            <p className="mt-1 text-sm text-white/80">
              {profile.education.school} · {profile.education.years}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-bold text-accent-bright">GPA {profile.education.gpa}</span>
              {profile.education.honours.map((honour) => (
                <span key={honour} className="text-white/80">
                  {honour}
                </span>
              ))}
            </p>
          </div>
        </section>
      </section>

      <div className="px-4 sm:px-6">
        {/* Featured */}
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold sm:text-2xl">Featured release</h2>
          <Link
            to={`/playlist/${featuredPlaylist.slug}?track=${featuredTrack.slug}`}
            className="group flex flex-col gap-5 rounded-xl bg-linear-to-r from-emerald-900/70 to-card p-5 transition-colors duration-200 hover:from-emerald-800/70 sm:flex-row sm:items-center"
          >
            <Artwork
              src={featuredTrack.artwork}
              alt=""
              decorative
              fit={featuredTrack.artworkFit}
              gradient={featuredPlaylist.gradient}
              title={featuredTrack.title}
              className="h-40 w-40 shrink-0 sm:h-44 sm:w-44"
            />
            <div className="min-w-0">
              <p className="text-[11px] font-bold tracking-widest text-accent-bright uppercase">
                First place · Engineering Design Fair
              </p>
              <h3 className="mt-2 text-2xl leading-tight font-bold sm:text-3xl">
                {featuredTrack.title}
              </h3>
              <p className="mt-1 text-sm text-subdued">{featuredTrack.subtitle}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-subdued">
                {featuredTrack.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {featuredTrack.tags.map((tag) => (
                  <TagPill key={tag} label={tag} />
                ))}
              </div>
            </div>
          </Link>
        </section>

        <SectionRow title="Your library" href="/library">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.slug} playlist={playlist} />
          ))}
        </SectionRow>

        {/* Employers */}
        <section className="mt-12">
          <h2 className="mb-5 text-xl font-bold sm:text-2xl">Appears on</h2>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-6 rounded-xl bg-card px-6 py-7">
            {profile.employers.map((employer) => (
              <li
                key={employer.name}
                className="grid h-20 place-items-center rounded-lg bg-white/95 px-6 transition-transform duration-200 hover:scale-105"
              >
                <img
                  src={employer.logo}
                  alt={employer.name}
                  className={`${employer.height} w-auto`}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Genres */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold sm:text-2xl">Top genres</h2>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <TagPill key={genre} label={genre} interactive size="md" />
            ))}
          </div>
          <p className="mt-4 text-sm text-subdued">
            {allTracks.length} tracks across {playlists.length} collections
          </p>
        </section>
      </div>
    </PageTransition>
  );
}
