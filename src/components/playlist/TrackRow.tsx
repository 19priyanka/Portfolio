import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Pause, Play } from 'lucide-react';
import type { Playlist, Track } from '../../types';
import { Artwork } from '../ui/Artwork';
import { Equalizer } from '../ui/Equalizer';
import { TagPill } from '../ui/TagPill';
import { TrackDetail } from './TrackDetail';
import { usePlayer } from '../../context/PlayerContext';
import { useMotionDuration } from '../../hooks/usePrefersReducedMotion';

interface TrackRowProps {
  playlist: Playlist;
  track: Track;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}

/**
 * One row of the track list.
 *
 * The row is not itself a button — that would mean nesting the play control
 * inside another button. Instead the title button stretches its hit area with
 * an `::after` overlay, and the play control sits above it on the z-axis. Two
 * controls, two tab stops, valid markup.
 */
export function TrackRow({ playlist, track, index, expanded, onToggle }: TrackRowProps) {
  const { playTrack, isPlaying, isCurrent } = usePlayer();
  const duration = useMotionDuration(0.22);

  const current = isCurrent(playlist.slug, track.slug);
  const playingHere = current && isPlaying;
  const detailId = `track-detail-${playlist.slug}-${track.slug}`;

  return (
    <li className="border-b border-white/5 last:border-b-0">
      {/* Column counts track exactly which cells render at each breakpoint:
          duration appears at sm, genre pills at lg. */}
      <div
        className={`group relative grid grid-cols-[2rem_2.5rem_1fr_auto] items-center gap-3 rounded-md px-2 py-2 transition-colors duration-200 sm:grid-cols-[2rem_3rem_1fr_4rem_2rem] sm:gap-4 sm:px-3 lg:grid-cols-[2rem_3rem_1fr_auto_4rem_2rem] ${
          expanded ? 'bg-white/[0.07]' : 'hover:bg-white/5'
        }`}
      >
        {/* Index / play toggle */}
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
            onClick={() => playTrack(playlist, track)}
            aria-pressed={playingHere}
            aria-label={playingHere ? `Pause ${track.title}` : `Play ${track.title}`}
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
          gradient={playlist.gradient}
          className="h-10 w-10 sm:h-12 sm:w-12"
          rounded="rounded"
        />

        {/* Title — owns the row-wide hit area via ::after */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={detailId}
          className="min-w-0 text-left after:absolute after:inset-0 after:content-['']"
        >
          <span
            className={`block truncate font-semibold ${current ? 'text-accent-bright' : 'text-ink'}`}
            title={track.title}
          >
            {track.title}
          </span>
          <span className="mt-0.5 block truncate text-sm text-subdued" title={track.subtitle}>
            {track.subtitle}
          </span>
        </button>

        {/* Genre pills — desktop only, they would crowd a phone row */}
        <div className="relative z-10 hidden max-w-[18rem] flex-wrap gap-1.5 lg:flex">
          {track.tags.slice(0, 3).map((tag) => (
            <TagPill key={tag} label={tag} interactive />
          ))}
        </div>

        <span className="hidden text-sm tabular-nums text-subdued sm:block">{track.duration}</span>

        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 justify-self-end text-subdued transition-transform duration-200 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <TrackDetail track={track} id={detailId} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
