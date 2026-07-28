import { playlists, allTracks } from '../data/playlists';
import { usePageChrome } from '../components/layout/AppShell';
import { PageTransition } from '../components/ui/PageTransition';
import { PlaylistCard } from '../components/playlist/PlaylistCard';

export function Library() {
  usePageChrome({ title: 'Your Library', accent: '#1f1f1f' });

  return (
    <PageTransition>
      <div className="px-4 pt-4 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Your Library</h1>
        <p className="mt-2 text-sm text-subdued">
          {playlists.length} collections · {allTracks.length} tracks
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.slug} playlist={playlist} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
