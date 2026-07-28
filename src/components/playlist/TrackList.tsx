import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Playlist } from '../../types';
import { TrackRow } from './TrackRow';
import { usePlayer } from '../../context/PlayerContext';

/**
 * The track list. The open track lives in the URL (`?track=slug`) so it is a
 * shareable link and survives a refresh.
 */
export function TrackList({ playlist }: { playlist: Playlist }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get('track');
  const { openTrack, closePanel, track, panelOpen } = usePlayer();

  // Open whatever the URL asks for, once per distinct request. Without the ref
  // this would fight the user: closing the panel would immediately reopen it,
  // because the query parameter is still present.
  const handled = useRef<string | null>(null);
  useEffect(() => {
    if (!requested || handled.current === requested) return;
    const match = playlist.tracks.find((t) => t.slug === requested);
    if (!match) return;
    handled.current = requested;
    openTrack(playlist, match);
  }, [requested, playlist, openTrack]);

  // Reset when the query parameter clears, so the same track can be reopened.
  useEffect(() => {
    if (!requested) handled.current = null;
  }, [requested]);

  const setTrackParam = (slug: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (slug) {
      params.set('track', slug);
    } else {
      params.delete('track');
    }
    // replace: opening a row should not add a history entry per click.
    setSearchParams(params, { replace: true });
  };

  const handleOpen = (slug: string) => {
    const match = playlist.tracks.find((t) => t.slug === slug);
    if (!match) return;

    const isOpen = panelOpen && track.slug === slug;
    if (isOpen) {
      closePanel();
      setTrackParam(null);
      return;
    }
    handled.current = slug;
    openTrack(playlist, match);
    setTrackParam(slug);
  };

  return (
    <ol className="mt-2">
      {playlist.tracks.map((item, index) => (
        <TrackRow
          key={item.slug}
          playlist={playlist}
          track={item}
          index={index}
          onOpen={() => handleOpen(item.slug)}
        />
      ))}
    </ol>
  );
}
