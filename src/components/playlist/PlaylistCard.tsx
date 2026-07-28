import { Link } from 'react-router-dom';
import type { Playlist } from '../../types';
import { Artwork } from '../ui/Artwork';
import { PlayButton } from '../ui/PlayButton';
import { usePlayer } from '../../context/PlayerContext';

const KIND_LABEL: Record<Playlist['kind'], string> = {
  playlist: 'Playlist',
  album: 'Album',
  podcast: 'Podcast',
};

/**
 * Two decisions here are load-bearing:
 *
 * 1. The card is a plain div and the title link stretches its hit area with an
 *    `::after` overlay. That keeps the play button a sibling rather than a
 *    button nested inside an anchor, which is invalid markup.
 * 2. The play button is revealed with CSS, not Framer variants. An animated
 *    inline `opacity` would outrank `group-focus-within:opacity-100` and leave
 *    keyboard users unable to ever see it.
 */
export function PlaylistCard({ playlist }: { playlist: Playlist }) {
  const { playPlaylist, isPlaying, isCurrent } = usePlayer();
  const active = isCurrent(playlist.slug);

  return (
    <div className="group relative rounded-lg bg-card p-4 transition-colors duration-200 hover:bg-hover focus-within:bg-hover">
      <div className="relative">
        <Artwork
          src={playlist.cover}
          alt=""
          decorative
          fit={playlist.coverFit}
          gradient={playlist.gradient}
          title={playlist.title}
          className="aspect-square w-full"
        />
        <div
          className={`absolute right-2 bottom-2 z-10 transition-all duration-200 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
            active ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          <PlayButton
            playing={active && isPlaying}
            onClick={() => playPlaylist(playlist)}
            label={playlist.title}
          />
        </div>
      </div>

      <h3 className="mt-4 truncate font-bold text-ink">
        <Link
          to={`/playlist/${playlist.slug}`}
          className="after:absolute after:inset-0 after:content-['']"
          title={playlist.title}
        >
          {playlist.title}
        </Link>
      </h3>
      <p className="line-clamp-2-safe mt-1 min-h-[2.5rem] text-sm text-subdued">
        {playlist.description}
      </p>
      <p className="mt-2 text-[11px] tracking-wide text-subdued/80 uppercase">
        {KIND_LABEL[playlist.kind]} · {playlist.blurb}
      </p>
    </div>
  );
}
