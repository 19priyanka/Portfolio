import { NavLink } from 'react-router-dom';
import { Disc3, House, Library, ListMusic, Mic, Search } from 'lucide-react';
import { playlists } from '../../data/playlists';
import { profile } from '../../data/profile';

const NAV = [
  { to: '/', label: 'Home', icon: House, end: true },
  { to: '/search', label: 'Search', icon: Search, end: false },
  { to: '/library', label: 'Your Library', icon: Library, end: false },
] as const;

const KIND_ICON = {
  playlist: ListMusic,
  album: Disc3,
  podcast: Mic,
} as const;

export function Sidebar() {
  return (
    <nav
      aria-label="Primary"
      className="hidden h-full w-rail shrink-0 flex-col gap-2 p-2 md:flex lg:w-sidebar"
    >
      <div className="rounded-lg bg-elevated p-2 lg:p-3">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors duration-200 hover:bg-white/5"
        >
          <img
            src={profile.avatar}
            alt=""
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
          <span className="hidden truncate text-sm font-bold lg:block">{profile.name}</span>
        </NavLink>

        <ul className="mt-2 space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-md px-2 py-2 text-sm font-bold transition-colors duration-200 ${
                    isActive ? 'bg-white/10 text-ink' : 'text-subdued hover:text-ink'
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="hidden lg:block">{label}</span>
                <span className="sr-only lg:hidden">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="scrollbar-spotify flex min-h-0 flex-1 flex-col rounded-lg bg-elevated p-2 lg:p-3">
        <h2 className="hidden px-2 pt-1 pb-2 text-[11px] font-bold tracking-widest text-subdued uppercase lg:block">
          Collection
        </h2>
        <ul className="scrollbar-spotify min-h-0 flex-1 space-y-1 overflow-y-auto">
          {playlists.map((playlist) => {
            const Icon = KIND_ICON[playlist.kind];
            return (
              <li key={playlist.slug}>
                <NavLink
                  to={`/playlist/${playlist.slug}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-2 py-2 transition-colors duration-200 ${
                      isActive ? 'bg-white/10' : 'hover:bg-white/5'
                    }`
                  }
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded bg-linear-to-br ${playlist.gradient}`}
                  >
                    <Icon className="h-4 w-4 text-white/80" aria-hidden="true" />
                  </span>
                  <span className="hidden min-w-0 lg:block">
                    <span className="block truncate text-sm font-semibold" title={playlist.title}>
                      {playlist.title}
                    </span>
                    <span className="block truncate text-xs text-subdued capitalize">
                      {playlist.kind} · {playlist.tracks.length}
                    </span>
                  </span>
                  <span className="sr-only lg:hidden">{playlist.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
