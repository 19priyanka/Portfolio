import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface SectionRowProps {
  title: string;
  /** Optional "Show all" destination. */
  href?: string;
  children: ReactNode;
}

/**
 * A titled row of cards. A wrapping grid rather than a horizontal scroller —
 * same visual rhythm as Spotify at desktop widths, and no overflow region to
 * trap a phone's scroll gesture.
 */
export function SectionRow({ title, href, children }: SectionRowProps) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="truncate text-xl font-bold sm:text-2xl">{title}</h2>
        {href && (
          <Link
            to={href}
            className="shrink-0 text-xs font-bold tracking-wide text-subdued uppercase transition-colors duration-200 hover:text-ink"
          >
            Show all
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {children}
      </div>
    </section>
  );
}
