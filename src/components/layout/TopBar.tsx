import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Download, Mail } from 'lucide-react';
import { profile } from '../../data/profile';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';

interface TopBarProps {
  /** 0..1 scroll progress of the main pane, driving the background fade. */
  progress: number;
  /** Revealed once the page header has scrolled away. */
  title?: string;
  /** Solid tint behind the bar, matched to the current playlist. */
  accent?: string;
}

export function TopBar({ progress, title, accent = '#121212' }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 px-4 sm:px-6"
      style={{
        boxShadow: progress > 0.9 ? '0 4px 16px rgb(0 0 0 / 0.35)' : 'none',
        transition: 'box-shadow 200ms linear',
      }}
    >
      {/* The bar itself stays transparent; this layer fades the tint in as the
          pane scrolls, which is the behaviour the Spotify header is known for. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundColor: accent, opacity: progress }}
      />

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="grid h-8 w-8 place-items-center rounded-full bg-black/60 text-ink transition hover:bg-black/80"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => navigate(1)}
          aria-label="Go forward"
          className="grid h-8 w-8 place-items-center rounded-full bg-black/60 text-ink transition hover:bg-black/80"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>

        {title && (
          <h2
            className="ml-2 hidden truncate text-lg font-bold transition-opacity duration-200 sm:block"
            style={{ opacity: progress > 0.75 ? 1 : 0 }}
            aria-hidden={progress <= 0.75}
            title={title}
          >
            {title}
          </h2>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <a
          href={profile.resumePdf}
          download
          className="hidden items-center gap-2 rounded-full border border-line bg-black/40 px-4 py-1.5 text-sm font-semibold transition-colors duration-200 hover:border-white/50 hover:bg-black/70 sm:inline-flex"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Résumé
        </a>

        {profile.socials.map((social) => (
          <a
            key={social.href}
            href={social.href}
            target={social.icon === 'mail' ? undefined : '_blank'}
            rel="noreferrer noopener"
            aria-label={social.label}
            className="grid h-9 w-9 place-items-center rounded-full text-subdued transition-colors duration-200 hover:bg-white/10 hover:text-ink"
          >
            {social.icon === 'github' && <GithubIcon className="h-[18px] w-[18px]" />}
            {social.icon === 'linkedin' && <LinkedinIcon className="h-[18px] w-[18px]" />}
            {social.icon === 'mail' && <Mail className="h-[18px] w-[18px]" aria-hidden="true" />}
          </a>
        ))}
      </div>
    </header>
  );
}
