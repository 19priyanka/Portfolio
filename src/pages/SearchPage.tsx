import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SearchX } from 'lucide-react';
import { allTracks, playlistForTrack } from '../data/playlists';
import { usePageChrome } from '../components/layout/AppShell';
import { PageTransition } from '../components/ui/PageTransition';
import { Artwork } from '../components/ui/Artwork';
import { TagPill } from '../components/ui/TagPill';

/** Every tag in the collection, alphabetical, offered as quick filters. */
const ALL_TAGS = [...new Set(allTracks.flatMap((t) => t.tags))].sort((a, b) => a.localeCompare(b));

export function SearchPage() {
  usePageChrome({ title: 'Search', accent: '#1f1f1f' });

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    return allTracks.filter((track) =>
      [track.title, track.subtitle, track.summary, ...track.tags]
        .join(' ')
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  const setQuery = (next: string) => {
    const params = new URLSearchParams(searchParams);
    if (next) {
      params.set('q', next);
    } else {
      params.delete('q');
    }
    setSearchParams(params, { replace: true });
  };

  return (
    <PageTransition>
      <div className="px-4 pt-4 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Search</h1>

        <div className="relative mt-6 max-w-xl">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-subdued"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Projects, roles, technologies…"
            aria-label="Search projects, roles and technologies"
            className="w-full rounded-full border border-line bg-card py-3 pr-4 pl-12 text-sm text-ink placeholder:text-subdued focus:border-white/40 focus:outline-none"
          />
        </div>

        {!query && (
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-bold">Browse by genre</h2>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => (
                <TagPill key={tag} label={tag} interactive size="md" />
              ))}
            </div>
          </section>
        )}

        {query && (
          <section className="mt-8" aria-live="polite">
            <h2 className="mb-4 text-sm text-subdued">
              {results.length === 0
                ? `No results for "${query}"`
                : `${results.length} ${results.length === 1 ? 'result' : 'results'} for "${query}"`}
            </h2>

            {results.length === 0 ? (
              <div className="rounded-xl bg-card px-6 py-12 text-center">
                <SearchX className="mx-auto h-10 w-10 text-subdued" aria-hidden="true" />
                <p className="mt-4 font-bold">Nothing matched that</p>
                <p className="mt-1 text-sm text-subdued">
                  Try a technology name, a company, or part of a project title.
                </p>
              </div>
            ) : (
              <ul className="space-y-1">
                {results.map((track) => {
                  const playlist = playlistForTrack(track.slug);
                  if (!playlist) return null;
                  return (
                    <li key={track.slug}>
                      <Link
                        to={`/playlist/${playlist.slug}?track=${track.slug}`}
                        className="flex items-center gap-4 rounded-md px-2 py-2 transition-colors duration-200 hover:bg-white/5"
                      >
                        <Artwork
                          src={track.artwork}
                          alt=""
                          decorative
                          isLogo={track.artworkIsLogo}
                          gradient={playlist.gradient}
                          title={track.title}
                          className="h-12 w-12 shrink-0"
                          rounded="rounded"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-semibold" title={track.title}>
                            {track.title}
                          </span>
                          <span className="block truncate text-sm text-subdued">
                            {track.subtitle}
                          </span>
                        </span>
                        <span className="hidden shrink-0 text-xs text-subdued sm:block">
                          {playlist.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        )}
      </div>
    </PageTransition>
  );
}
