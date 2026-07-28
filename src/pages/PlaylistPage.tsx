import { useParams } from 'react-router-dom';
import { Shuffle } from 'lucide-react';
import { getPlaylist, trackCount } from '../data/playlists';
import { profile } from '../data/profile';
import { usePlayer } from '../context/PlayerContext';
import { usePageChrome } from '../components/layout/AppShell';
import { PageTransition } from '../components/ui/PageTransition';
import { PlayButton } from '../components/ui/PlayButton';
import { Artwork } from '../components/ui/Artwork';
import { TrackList } from '../components/playlist/TrackList';
import { NotFound } from './NotFound';

export function PlaylistPage() {
  const { slug } = useParams<{ slug: string }>();
  const playlist = getPlaylist(slug);

  usePageChrome({ title: playlist?.title, accent: playlist?.accent });

  const { playPlaylist, isPlaying, isCurrent, shuffle, toggleShuffle } = usePlayer();

  // Render the 404 in place rather than redirecting, so the bad URL stays
  // visible and correctable in the address bar.
  if (!playlist) {
    return <NotFound />;
  }

  const active = isCurrent(playlist.slug);

  return (
    <PageTransition>
      <header
        className={`relative -mt-16 bg-linear-to-b ${playlist.gradient} px-4 pt-24 pb-6 sm:px-6 sm:pt-28`}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <Artwork
            src={playlist.cover}
            alt=""
            decorative
            fit={playlist.coverFit}
            gradient={playlist.gradient}
            title={playlist.title}
            className="h-44 w-44 shrink-0 shadow-2xl sm:h-56 sm:w-56"
          />
          <div className="min-w-0">
            <p className="text-[11px] font-bold tracking-widest uppercase">{playlist.kind}</p>
            <h1 className="mt-2 text-3xl leading-none font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {playlist.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
              {playlist.description}
            </p>
            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <img src={profile.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
              <span className="font-bold">{profile.name}</span>
              <span aria-hidden="true" className="text-white/60">
                ·
              </span>
              <span className="text-white/80">
                {trackCount(playlist.tracks)}
              </span>
            </p>
          </div>
        </div>
      </header>

      <div className="bg-linear-to-b from-black/40 to-transparent px-2 pt-6 pb-2 sm:px-6">
        <div className="flex items-center gap-5 px-2 sm:px-0">
          <PlayButton
            playing={active && isPlaying}
            onClick={() => playPlaylist(playlist)}
            label={playlist.title}
            size="lg"
          />
          <button
            type="button"
            onClick={toggleShuffle}
            aria-pressed={shuffle}
            aria-label="Shuffle playback order"
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors duration-200 ${
              shuffle ? 'text-accent-bright' : 'text-subdued hover:text-ink'
            }`}
          >
            <Shuffle className="h-5 w-5" aria-hidden="true" />
          </button>
          <p className="text-sm text-subdued">Select a track to open it.</p>
        </div>

        <TrackList playlist={playlist} />
      </div>
    </PageTransition>
  );
}
