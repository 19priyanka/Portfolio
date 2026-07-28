import { Link } from 'react-router-dom';
import {
  ListMusic,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { Artwork } from '../ui/Artwork';

/**
 * The player bar.
 *
 * Nothing plays, and the interface says so: the time reads 0:00 and the
 * progress track stays empty. That is deliberate — an animated clock ticking
 * against silence is what made the earlier version feel broken. What the
 * controls do instead is move through the collection and open the detail panel,
 * which is real, visible behaviour their aria-pressed values can honestly claim.
 */
export function NowPlayingBar() {
  const {
    playlist,
    track,
    isPlaying,
    panelOpen,
    shuffle,
    repeat,
    toggle,
    next,
    previous,
    toggleShuffle,
    toggleRepeat,
    openTrack,
  } = usePlayer();

  return (
    <footer
      aria-label="Player"
      className="relative z-40 flex h-player items-center gap-3 border-t border-line bg-elevated px-3 sm:gap-4 sm:px-5"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:w-[30%] sm:flex-none">
        <Artwork
          src={track.artwork}
          alt=""
          decorative
          isLogo={track.artworkIsLogo}
          gradient={playlist.gradient}
          title={track.title}
          className="h-11 w-11 shrink-0 sm:h-14 sm:w-14"
          rounded="rounded"
        />
        <div className="min-w-0">
          <button
            type="button"
            onClick={() => openTrack(playlist, track)}
            className="block max-w-full truncate text-left text-sm font-semibold hover:underline"
            title={track.title}
          >
            {track.title}
          </button>
          <span className="block truncate text-xs text-subdued" title={track.subtitle}>
            {track.subtitle}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 sm:flex-1">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={toggleShuffle}
            aria-pressed={shuffle}
            aria-label="Shuffle"
            className={`hidden h-8 w-8 place-items-center rounded-full transition-colors duration-200 sm:grid ${
              shuffle ? 'text-accent-bright' : 'text-subdued hover:text-ink'
            }`}
          >
            <Shuffle className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={previous}
            aria-label="Previous track"
            className="grid h-8 w-8 place-items-center rounded-full text-subdued transition-colors duration-200 hover:text-ink"
          >
            <SkipBack className="h-4 w-4" fill="currentColor" strokeWidth={0} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={toggle}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? 'Stop' : 'Open current track'}
            className="grid h-9 w-9 place-items-center rounded-full bg-ink text-black transition duration-200 ease-out-soft hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} aria-hidden="true" />
            ) : (
              <Play
                className="h-4 w-4 translate-x-[1px]"
                fill="currentColor"
                strokeWidth={0}
                aria-hidden="true"
              />
            )}
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next track"
            className="grid h-8 w-8 place-items-center rounded-full text-subdued transition-colors duration-200 hover:text-ink"
          >
            <SkipForward
              className="h-4 w-4"
              fill="currentColor"
              strokeWidth={0}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={toggleRepeat}
            aria-pressed={repeat}
            aria-label="Repeat"
            className={`hidden h-8 w-8 place-items-center rounded-full transition-colors duration-200 sm:grid ${
              repeat ? 'text-accent-bright' : 'text-subdued hover:text-ink'
            }`}
          >
            {repeat ? (
              <Repeat1 className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Repeat className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Static, and honest about it: there is no audio, so there is no
            elapsed time and nothing to scrub through. */}
        <div className="hidden w-full max-w-lg items-center gap-2 sm:flex">
          <span className="w-9 text-right text-[11px] tabular-nums text-subdued">0:00</span>
          <div className="h-1 w-full rounded-full bg-highlight" aria-hidden="true" />
          <span className="w-9 text-[11px] tabular-nums text-subdued">0:00</span>
        </div>
      </div>

      <div className="hidden w-[30%] items-center justify-end gap-3 sm:flex">
        <Link
          to={`/playlist/${playlist.slug}`}
          className="truncate text-xs text-subdued transition-colors duration-200 hover:text-ink"
          title={`From ${playlist.title}`}
        >
          From <span className="font-semibold">{playlist.title}</span>
        </Link>
        <button
          type="button"
          onClick={() => openTrack(playlist, track)}
          aria-pressed={panelOpen}
          aria-label="Toggle details panel"
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-200 ${
            panelOpen ? 'text-accent-bright' : 'text-subdued hover:text-ink'
          }`}
        >
          <ListMusic className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
