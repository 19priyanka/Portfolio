import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Playlist } from '../../types';
import { TrackRow } from './TrackRow';

/**
 * The track list. Expansion state lives in the URL (`?track=slug`) so an
 * expanded track is a shareable link and survives a refresh.
 */
export function TrackList({ playlist }: { playlist: Playlist }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get('track');

  const [expanded, setExpanded] = useState<string | null>(() =>
    playlist.tracks.some((t) => t.slug === requested) ? requested : null,
  );

  // Keep in step with back/forward navigation and cross-page links.
  useEffect(() => {
    setExpanded(playlist.tracks.some((t) => t.slug === requested) ? requested : null);
  }, [requested, playlist]);

  const toggle = (slug: string) => {
    const next = expanded === slug ? null : slug;
    setExpanded(next);

    const params = new URLSearchParams(searchParams);
    if (next) {
      params.set('track', next);
    } else {
      params.delete('track');
    }
    // replace: expanding a row should not add a history entry per click.
    setSearchParams(params, { replace: true });
  };

  return (
    <ol className="mt-2">
      {playlist.tracks.map((track, index) => (
        <TrackRow
          key={track.slug}
          playlist={playlist}
          track={track}
          index={index}
          expanded={expanded === track.slug}
          onToggle={() => toggle(track.slug)}
        />
      ))}
    </ol>
  );
}
