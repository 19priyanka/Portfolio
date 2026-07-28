import { ChevronRight, Pause, Play } from 'lucide-react';
import type { Playlist, Track } from '../../types';
import { Artwork } from '../ui/Artwork';
import { Equalizer } from '../ui/Equalizer';
import { TagPill } from '../ui/TagPill';
import { usePlayer } from '../../context/PlayerContext';

interface TrackRowProps {
  playlist: Playlist;
  track: Track;
  index: number;
  onOpen: () => void;
}

/**
 * One row of the track list. Selecting it opens the detail panel rather than
 * expanding inline — the panel has room for the artwork at a size where you can
 * actually see it.
 *
 * The row is not itself a button, because the play control sits inside it and
 * nesting buttons is invalid. Instead the title button stretches its hit area
 * with an `::after` overlay and the play control sits above it on the z-axis.
 */
export function TrackRow({ playlist, track, index, onOpen }: TrackRowProps) {
  const { isPlaying, isCurrent, panelOpen } = usePlayer();

  const current = isCurrent(playlist.slug, track.slug);
  const active = current && panelOpen;
  const playingHere = current && isPlaying && panelOpen;

  return (
    <li className="border-b border-white/5 last:border-b-0">
      {/* Column counts track exactly which cells render at each breakpoint:
          meta appears at sm, genre pills at lg. */}
      <div
        className={`group relative grid grid-cols-[2rem_2.75rem_1fr_auto] items-center gap-3 rounded-md px-2 py-2 transition-colors duration-200 sm:grid-cols-[2rem_3.25rem_1fr_5.5rem_1.5rem] sm:gap-4 sm:px-3 lg:grid-cols-[2rem_3.25rem_1fr_auto_5.5rem_1.5rem] ${
          active ? 'bg-white/[0.07]' : 'hover:bg-white/5'
        }`}
      >
        <div className="relative z-10 grid h-8 w-8 place-items-center">
          {playingHere ? (
            <Equalizer playing />
          ) : (
            <span
              className="text-sm tabular-nums text-subdued group-hover:opacity-0 group-focus-within:opacity-0"
              aria-hidden="true"
            >
              {index + 1}
            </span>
          )}
          <button
            type="button"
            onClick={onOpen}
            aria-pressed={active}
            aria-label={active ? `Close ${track.title}` : `Open ${track.title}`}
            className="absolute inset-0 grid place-items-center rounded-full text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100"
          >
            {playingHere ? (
              <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4" fill="currentColor" strokeWidth={0} aria-hidden="true" />
            )}
          </button>
        </div>

        <Artwork
          src={track.artwork}
          alt=""
          decorative
          fit={track.artworkFit}
          gradient={playlist.gradient}
          title={track.title}
          className="h-11 w-11 sm:h-13 sm:w-13"
          rounded="rounded"
        />

        <button
          type="button"
          onClick={onOpen}
          aria-expanded={active}
          className="min-w-0 text-left after:absolute after:inset-0 after:content-['']"
        >
          <span
            className={`block truncate font-semibold ${active ? 'text-accent-bright' : 'text-ink'}`}
            title={track.title}
          >
            {track.title}
          </span>
          <span className="mt-0.5 block truncate text-sm text-subdued" title={track.subtitle}>
            {track.subtitle}
          </span>
        </button>

        <div className="relative z-10 hidden max-w-[18rem] flex-wrap gap-1.5 lg:flex">
          {track.tags.slice(0, 3).map((tag) => (
            <TagPill key={tag} label={tag} interactive />
          ))}
        </div>

        <span className="hidden text-right text-xs font-medium text-subdued sm:block">
          {track.meta}
        </span>

        <ChevronRight
          aria-hidden="true"
          className="h-4 w-4 justify-self-end text-subdued transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </div>
    </li>
  );
}
