import { AnimatePresence, motion } from 'framer-motion';
import { Code, ExternalLink, FileText, Globe, Palette, Video, X } from 'lucide-react';
import type { LinkKind } from '../../types';
import { TagPill } from '../ui/TagPill';
import { Artwork } from '../ui/Artwork';
import { Equalizer } from '../ui/Equalizer';
import { usePlayer } from '../../context/PlayerContext';
import { useMotionDuration } from '../../hooks/usePrefersReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const LINK_ICON: Record<LinkKind, typeof Code> = {
  code: Code,
  demo: ExternalLink,
  video: Video,
  design: Palette,
  doc: FileText,
  site: Globe,
};

/**
 * Spotify's right-hand "now playing" panel.
 *
 * This is where pressing play pays off: the artwork goes large, and the summary
 * that was previously buried in a collapsed row gets room to be read.
 *
 * At desktop widths it is a column in the shell grid. Below lg it becomes an
 * overlay sheet, because a 360px column on a phone would leave nothing for the
 * content it is describing.
 */
export function DetailPanel() {
  const { playlist, track, isPlaying, panelOpen, closePanel } = usePlayer();
  const duration = useMotionDuration(0.28);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const body = (
    <div className="scrollbar-spotify flex h-full flex-col overflow-y-auto">
      <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-2">
        <p className="flex min-w-0 items-center gap-2 text-xs font-bold tracking-widest text-subdued uppercase">
          {isPlaying && <Equalizer playing />}
          <span className="truncate">{playlist.title}</span>
        </p>
        <button
          type="button"
          onClick={closePanel}
          aria-label="Close details"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-subdued transition-colors duration-200 hover:bg-white/10 hover:text-ink"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="px-4 pb-6">
        <Artwork
          src={track.artwork}
          alt={`${track.title} artwork`}
          decorative
          fit={track.artworkFit}
          gradient={playlist.gradient}
          title={track.title}
          className="aspect-square w-full"
          rounded="rounded-lg"
        />

        <h2 className="mt-5 text-2xl leading-tight font-extrabold">{track.title}</h2>
        <p className="mt-1 text-sm text-subdued">{track.subtitle}</p>

        <dl className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-line bg-white/5 px-3 py-2">
            <dt className="text-[10px] tracking-widest text-subdued uppercase">Span</dt>
            <dd className="mt-0.5 text-sm font-bold">{track.metaLabel ?? track.meta}</dd>
          </div>
          <div className="rounded-lg border border-line bg-white/5 px-3 py-2">
            <dt className="text-[10px] tracking-widest text-subdued uppercase">Outcome</dt>
            <dd className="mt-0.5 text-sm font-bold">{track.plays}</dd>
          </div>
        </dl>

        <p className="mt-5 text-sm leading-relaxed text-subdued">{track.summary}</p>

        {track.highlights.length > 0 && (
          <>
            <h3 className="mt-6 text-xs font-bold tracking-widest text-subdued uppercase">
              What it involved
            </h3>
            <ul className="mt-3 space-y-2">
              {track.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-subdued">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <h3 className="mt-6 text-xs font-bold tracking-widest text-subdued uppercase">Stack</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {track.tags.map((tag) => (
            <TagPill key={tag} label={tag} interactive />
          ))}
        </div>

        {track.links.length > 0 && (
          <>
            <h3 className="mt-6 text-xs font-bold tracking-widest text-subdued uppercase">Links</h3>
            <div className="mt-3 flex flex-col gap-2">
              {track.links.map((link) => {
                const Icon = LINK_ICON[link.kind];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-3 rounded-lg border border-line bg-white/5 px-4 py-2.5 text-sm font-semibold transition-colors duration-200 hover:border-white/40 hover:bg-white/10"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-accent-bright" aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">{link.label}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-subdued" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {panelOpen && (
        <>
          {/* Scrim, overlay mode only. */}
          {!isDesktop && (
            <motion.button
              key="scrim"
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={closePanel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration }}
              className="fixed inset-0 z-40 cursor-default bg-black/60"
            />
          )}

          <motion.aside
            key="panel"
            aria-label={`Details for ${track.title}`}
            initial={isDesktop ? { width: 0, opacity: 0 } : { x: '100%' }}
            animate={isDesktop ? { width: 360, opacity: 1 } : { x: 0 }}
            exit={isDesktop ? { width: 0, opacity: 0 } : { x: '100%' }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className={
              isDesktop
                ? 'my-2 mr-2 shrink-0 overflow-hidden rounded-lg bg-elevated'
                : 'fixed inset-y-0 right-0 z-50 w-[min(24rem,90vw)] bg-elevated shadow-2xl'
            }
          >
            <div className={isDesktop ? 'h-full w-[360px]' : 'h-full'}>{body}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
