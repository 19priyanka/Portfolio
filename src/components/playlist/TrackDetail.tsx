import { Code, ExternalLink, FileText, Globe, Palette, Video } from 'lucide-react';
import type { LinkKind, Track } from '../../types';
import { TagPill } from '../ui/TagPill';

const LINK_ICON: Record<LinkKind, typeof Code> = {
  code: Code,
  demo: ExternalLink,
  video: Video,
  design: Palette,
  doc: FileText,
  site: Globe,
};

/** The panel revealed when a track row is expanded. */
export function TrackDetail({ track, id }: { track: Track; id: string }) {
  return (
    <div id={id} className="px-3 pt-1 pb-5 sm:px-4 sm:pl-[4.75rem]">
      <div className="max-w-3xl">
        <p className="text-sm leading-relaxed text-subdued">{track.summary}</p>

        {track.highlights.length > 0 && (
          <ul className="mt-4 space-y-2">
            {track.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-subdued">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {track.tags.map((tag) => (
            <TagPill key={tag} label={tag} interactive />
          ))}
        </div>

        {track.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {track.links.map((link) => {
              const Icon = LINK_ICON[link.kind];
              const external = link.href.startsWith('http');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:border-white/40 hover:bg-white/10"
                >
                  <Icon className="h-4 w-4 text-accent-bright" aria-hidden="true" />
                  {link.label}
                  {external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
