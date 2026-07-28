import { Link } from 'react-router-dom';
import { Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { formatSeconds } from '../../data/playlists';
import { Artwork } from '../ui/Artwork';

/**
 * The player bar. No audio is involved — it tracks what you are browsing and
 * animates a progress clock against the track's mapped duration.
 *
 * Every control here changes observable state. A volume slider was deliberately
 * left out: there is nothing for it to control, and a slider that reports a
 * value while doing nothing is worse for assistive tech than no slider at all.
 */
export function NowPlayingBar() {
  const {
    playlist,
    track,
    isPlaying,
    elapsed,
    shuffle,
    repeat,
    toggle,
    next,
    previous,
    seek,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  const percent = Math.min(100, (elapsed / track.durationSeconds) * 100);

  return (
    <footer
      aria-label="Player"
      className="relative z-40 flex h-player items-center gap-3 border-t border-line bg-elevated px-3 sm:gap-4 sm:px-5"
    >
      {/* Mobile progress. The full scrubber is desktop-only, but the bar still
          needs to show that something is playing. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-highlight sm:hidden"
      >
        <div
          className="h-full bg-accent-bright transition-[width] duration-1000 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Now playing */}
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:w-[30%] sm:flex-none">
        <Artwork
          src={track.artwork}
          alt=""
          decorative
          gradient={playlist.gradient}
          className="h-11 w-11 shrink-0 sm:h-14 sm:w-14"
          rounded="rounded"
        />
        <div className="min-w-0">
          <Link
            to={`/playlist/${playlist.slug}?track=${track.slug}`}
            className="block truncate text-sm font-semibold hover:underline"
            title={track.title}
          >
            {track.title}
          </Link>
          <span className="block truncate text-xs text-subdued" title={track.subtitle}>
            {track.subtitle}
          </span>
        </div>
      </div>

      {/* Transport */}
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
            aria-label={isPlaying ? 'Pause' : 'Play'}
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
            aria-label="Repeat track"
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

        {/* Scrubber */}
        <div className="hidden w-full max-w-lg items-center gap-2 sm:flex">
          <span className="w-9 text-right text-[11px] tabular-nums text-subdued">
            {formatSeconds(elapsed)}
          </span>
          <input
            type="range"
            min={0}
            max={track.durationSeconds}
            step={1}
            value={elapsed}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label={`Seek within ${track.title}`}
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-highlight accent-accent-bright"
            style={{
              background: `linear-gradient(to right, var(--color-accent-bright) ${percent}%, var(--color-highlight) ${percent}%)`,
            }}
          />
          <span className="w-9 text-[11px] tabular-nums text-subdued">{track.duration}</span>
        </div>
      </div>

      {/* Context */}
      <div className="hidden w-[30%] justify-end sm:flex">
        <Link
          to={`/playlist/${playlist.slug}`}
          className="truncate text-xs text-subdued transition-colors duration-200 hover:text-ink"
          title={`Playing from ${playlist.title}`}
        >
          Playing from <span className="font-semibold">{playlist.title}</span>
        </Link>
      </div>
    </footer>
  );
}
