import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { NowPlayingBar } from './NowPlayingBar';
import { MobileTabBar } from './MobileTabBar';
import { DetailPanel } from '../playlist/DetailPanel';
import { useScrollProgress } from '../../hooks/useScrollProgress';

interface Chrome {
  /** Shown in the top bar once the page header scrolls away. */
  title?: string;
  /** Tint the top bar fades in, matched to the page. */
  accent?: string;
}

const ChromeContext = createContext<((chrome: Chrome) => void) | null>(null);

/** Lets a page drive the top bar without the shell knowing about routes. */
export function usePageChrome(chrome: Chrome) {
  const setChrome = useContext(ChromeContext);
  const { title, accent } = chrome;

  useEffect(() => {
    setChrome?.({ title, accent });
    document.title = title
      ? `${title} · Priyanka Gautam`
      : 'Priyanka Gautam, Software Engineer';
  }, [setChrome, title, accent]);
}

export function AppShell() {
  const [chrome, setChrome] = useState<Chrome>({});
  const mainRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(mainRef);
  const { pathname } = useLocation();

  // New page, new scroll position. Without this the pane keeps the previous
  // page's offset and lands you halfway down an unrelated page.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  const setter = useMemo(() => (next: Chrome) => setChrome(next), []);

  return (
    <ChromeContext.Provider value={setter}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-bold focus:text-black"
      >
        Skip to content
      </a>
      {/* grid-cols-[minmax(0,1fr)] is load-bearing. Tailwind's bare `grid` leaves
          the single implicit column at `auto`, which floors at the content's
          intrinsic width — the player bar's track title is `white-space: nowrap`,
          so on a phone the whole shell was sized to that string and every row
          (top bar, tab bar) got stretched past the viewport. An explicit
          minmax(0, 1fr) track ignores intrinsic width and the `min-w-0`s below
          let the flex children shrink into it so `truncate` can do its job. */}
      <div className="grid h-dvh w-full grid-cols-[minmax(0,1fr)] grid-rows-[1fr_auto] overflow-x-clip bg-canvas">
        {/* flex rather than grid columns: the detail panel animates its own
            width open and closed, which a fixed grid template would fight. */}
        <div className="flex min-h-0 min-w-0">
          <Sidebar />

          {/* The only scroll container in the application. Keeping scrolling in
              one place is what stops nested panes and 100vh children from
              fighting, and guarantees the page never scrolls sideways. */}
          <div
            ref={mainRef}
            className="scrollbar-spotify relative min-w-0 flex-1 overflow-x-clip overflow-y-auto md:m-2 md:ml-0 md:rounded-lg md:bg-elevated"
          >
            <TopBar progress={progress} title={chrome.title} accent={chrome.accent} />
            <main id="main" tabIndex={-1} className="pb-10 focus:outline-none">
              <Outlet />
            </main>
          </div>

          <DetailPanel />
        </div>

        <div className="flex min-w-0 flex-col">
          <NowPlayingBar />
          <MobileTabBar />
        </div>
      </div>
    </ChromeContext.Provider>
  );
}
