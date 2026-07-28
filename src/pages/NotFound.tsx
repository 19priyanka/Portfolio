import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { usePageChrome } from '../components/layout/AppShell';
import { PageTransition } from '../components/ui/PageTransition';

export function NotFound() {
  usePageChrome({ title: 'Not found', accent: '#1f1f1f' });

  return (
    <PageTransition>
      <div className="grid min-h-[60vh] place-items-center px-6 py-20 text-center">
        <div className="max-w-md">
          <SearchX className="mx-auto h-14 w-14 text-subdued" aria-hidden="true" />
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
            We couldn't find that track
          </h1>
          <p className="mt-3 text-subdued">
            The page you were after isn't in this collection. It may have been renamed, or the link
            may be incomplete.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-black transition-colors duration-200 hover:bg-accent-bright"
            >
              Back to home
            </Link>
            <Link
              to="/library"
              className="rounded-full border border-line px-6 py-2.5 text-sm font-bold transition-colors duration-200 hover:border-white/50 hover:bg-white/5"
            >
              Browse the library
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
