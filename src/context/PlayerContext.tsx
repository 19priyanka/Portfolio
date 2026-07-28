import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { Playlist, Track } from '../types';
import { featuredPlaylist, playlists } from '../data/playlists';

/* ---------------------------------------------------------------------------
   The player is a metaphor, not a media element — no audio is ever played.

   It is still real state: pressing play genuinely starts the progress clock and
   the equalizer bars, and pausing genuinely stops them. That matters for
   accessibility. A control that reports `aria-pressed` while doing nothing is
   worse than no control at all, so every button here changes something
   observable.
   --------------------------------------------------------------------------- */

interface PlayerState {
  playlist: Playlist;
  track: Track;
  isPlaying: boolean;
  /** Seconds into the current track. */
  elapsed: number;
  shuffle: boolean;
  repeat: boolean;
}

interface PlayerActions {
  /** Play a specific track. Re-selecting the current track toggles play/pause. */
  playTrack: (playlist: Playlist, track: Track) => void;
  /** Play a playlist from its first track. */
  playPlaylist: (playlist: Playlist) => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  isCurrent: (playlistSlug: string, trackSlug?: string) => boolean;
}

type PlayerContextValue = PlayerState & PlayerActions;

const PlayerContext = createContext<PlayerContextValue | null>(null);

const initialPlaylist = featuredPlaylist;
const initialTrack = featuredPlaylist.tracks[0]!;

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [playlist, setPlaylist] = useState<Playlist>(initialPlaylist);
  const [track, setTrack] = useState<Track>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  // Kept in refs so the ticking effect does not need to re-subscribe on every
  // state change, which would reset the interval and stutter the progress bar.
  const stateRef = useRef({ playlist, track, shuffle, repeat });
  stateRef.current = { playlist, track, shuffle, repeat };

  const selectTrack = useCallback((nextPlaylist: Playlist, nextTrack: Track) => {
    setPlaylist(nextPlaylist);
    setTrack(nextTrack);
    setElapsed(0);
  }, []);

  const advance = useCallback(
    (direction: 1 | -1) => {
      const { playlist: current, track: currentTrack, shuffle: isShuffle } = stateRef.current;
      const tracks = current.tracks;
      if (tracks.length === 0) return;

      if (isShuffle && tracks.length > 1) {
        let index = Math.floor(Math.random() * tracks.length);
        // Avoid repeating the track we are already on.
        if (tracks[index]!.slug === currentTrack.slug) {
          index = (index + 1) % tracks.length;
        }
        selectTrack(current, tracks[index]!);
        return;
      }

      const currentIndex = tracks.findIndex((t) => t.slug === currentTrack.slug);
      const base = currentIndex === -1 ? 0 : currentIndex;
      const nextIndex = (base + direction + tracks.length) % tracks.length;
      selectTrack(current, tracks[nextIndex]!);
    },
    [selectTrack],
  );

  // Progress clock. Only runs while playing.
  useEffect(() => {
    if (!isPlaying) return;

    const id = window.setInterval(() => {
      setElapsed((previous) => {
        const { track: currentTrack, repeat: isRepeat } = stateRef.current;
        if (previous + 1 < currentTrack.durationSeconds) return previous + 1;
        if (isRepeat) return 0;
        // Defer so we are not calling setState for another value mid-updater.
        window.setTimeout(() => advance(1), 0);
        return 0;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [isPlaying, advance]);

  const playTrack = useCallback(
    (nextPlaylist: Playlist, nextTrack: Track) => {
      const isSame = track.slug === nextTrack.slug && playlist.slug === nextPlaylist.slug;
      if (isSame) {
        setIsPlaying((p) => !p);
        return;
      }
      selectTrack(nextPlaylist, nextTrack);
      setIsPlaying(true);
    },
    [playlist.slug, track.slug, selectTrack],
  );

  const playPlaylist = useCallback(
    (nextPlaylist: Playlist) => {
      const first = nextPlaylist.tracks[0];
      if (!first) return;
      if (playlist.slug === nextPlaylist.slug) {
        setIsPlaying((p) => !p);
        return;
      }
      selectTrack(nextPlaylist, first);
      setIsPlaying(true);
    },
    [playlist.slug, selectTrack],
  );

  const isCurrent = useCallback(
    (playlistSlug: string, trackSlug?: string) => {
      if (playlist.slug !== playlistSlug) return false;
      return trackSlug === undefined || track.slug === trackSlug;
    },
    [playlist.slug, track.slug],
  );

  const value = useMemo<PlayerContextValue>(
    () => ({
      playlist,
      track,
      isPlaying,
      elapsed,
      shuffle,
      repeat,
      playTrack,
      playPlaylist,
      toggle: () => setIsPlaying((p) => !p),
      next: () => advance(1),
      previous: () =>
        // Match a real player: mid-track, "previous" restarts the track first.
        setElapsed((current) => {
          if (current > 3) return 0;
          window.setTimeout(() => advance(-1), 0);
          return 0;
        }),
      seek: (seconds: number) =>
        setElapsed(Math.min(Math.max(0, Math.round(seconds)), track.durationSeconds)),
      toggleShuffle: () => setShuffle((s) => !s),
      toggleRepeat: () => setRepeat((r) => !r),
      isCurrent,
    }),
    [playlist, track, isPlaying, elapsed, shuffle, repeat, playTrack, playPlaylist, advance, isCurrent],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer(): PlayerContextValue {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used inside a PlayerProvider');
  }
  return context;
}

/** Exposed for the search page, which needs a playlist to attribute a track to. */
export const allPlaylists = playlists;
