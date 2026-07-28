import { NavLink } from 'react-router-dom';
import { House, Library, Search } from 'lucide-react';

const TABS = [
  { to: '/', label: 'Home', icon: House, end: true },
  { to: '/search', label: 'Search', icon: Search, end: false },
  { to: '/library', label: 'Library', icon: Library, end: false },
] as const;

/** Primary navigation below the md breakpoint, where the sidebar is hidden. */
export function MobileTabBar() {
  return (
    <nav
      aria-label="Primary"
      className="z-40 flex items-stretch border-t border-line bg-canvas pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors duration-200 ${
              isActive ? 'text-ink' : 'text-subdued'
            }`
          }
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
