import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Playlist, Track } from '../types';
import { featuredPlaylist } from '../data/playlists';

/* ---------------------------------------------------------------------------
   Player state.

   Nothing plays audio. "Play" means "open this" — it selects the track, slides
   out the detail panel, and animates the equalizer. That is the whole point:
   pressing a play button that produced no visible change was the thing that
   felt broken, so the button now has a large, obvious effect.

   There is no progress clock. A timer counting up against silence is a lie the
   interface does not need to tell.
   --------------------------------------------------------------------------- */

interface PlayerState {
  playlist: Playlist;
  track: Track;
  /** Drives the equalizer bars and the play/pause icon. */
  isPlaying: boolean;
  /** Whether the detail panel is open. */
  panelOpen: boolean;
  shuffle: boolean;
  repeat: boolean;
}

interface PlayerActions {
  /** Select a track and open its panel. Re-selecting the open track closes it. */
  openTrack: (playlist: Playlist, track: Track) => void;
  /** Play a playlist from its first track. */
  playPlaylist: (playlist: Playlist) => void;
  closePanel: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  isCurrent: (playlistSlug: string, trackSlug?: string) => boolean;
}

type PlayerContextValue = PlayerState & PlayerActions;

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [playlist, setPlaylist] = useState<Playlist>(featuredPlaylist);
  const [track, setTrack] = useState<Track>(featuredPlaylist.tracks[0]!);
  const [isPlaying, setIsPlaying] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const advance = useCallback(
    (direction: 1 | -1) => {
      const tracks = playlist.tracks;
      if (tracks.length === 0) return;

      if (shuffle && tracks.length > 1) {
        let index = Math.floor(Math.random() * tracks.length);
        if (tracks[index]!.slug === track.slug) index = (index + 1) % tracks.length;
        setTrack(tracks[index]!);
        return;
      }

      const currentIndex = tracks.findIndex((t) => t.slug === track.slug);
      const base = currentIndex === -1 ? 0 : currentIndex;
      setTrack(tracks[(base + direction + tracks.length) % tracks.length]!);
    },
    [playlist, track.slug, shuffle],
  );

  const openTrack = useCallback(
    (nextPlaylist: Playlist, nextTrack: Track) => {
      const isSame = track.slug === nextTrack.slug && playlist.slug === nextPlaylist.slug;
      if (isSame && panelOpen) {
        setPanelOpen(false);
        setIsPlaying(false);
        return;
      }
      setPlaylist(nextPlaylist);
      setTrack(nextTrack);
      setPanelOpen(true);
      setIsPlaying(true);
    },
    [playlist.slug, track.slug, panelOpen],
  );

  const playPlaylist = useCallback(
    (nextPlaylist: Playlist) => {
      const first = nextPlaylist.tracks[0];
      if (!first) return;
      setPlaylist(nextPlaylist);
      setTrack(first);
      setPanelOpen(true);
      setIsPlaying(true);
    },
    [],
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
      panelOpen,
      shuffle,
      repeat,
      openTrack,
      playPlaylist,
      closePanel: () => setPanelOpen(false),
      toggle: () => {
        setIsPlaying((p) => !p);
        setPanelOpen(true);
      },
      next: () => advance(1),
      previous: () => advance(-1),
      toggleShuffle: () => setShuffle((s) => !s),
      toggleRepeat: () => setRepeat((r) => !r),
      isCurrent,
    }),
    [playlist, track, isPlaying, panelOpen, shuffle, repeat, openTrack, playPlaylist, advance, isCurrent],
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
