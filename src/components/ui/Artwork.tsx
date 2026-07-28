interface ArtworkProps {
  src?: string;
  alt: string;
  /** Tailwind gradient classes used for the generated cover. */
  gradient?: string;
  /** Seeds the generated cover's initial. */
  title?: string;
  /**
   * The image is a brand logo rather than a screenshot. Logos here are dark
   * artwork on transparent backgrounds, which vanishes against the dark UI, so
   * they get a light plate behind them.
   */
  isLogo?: boolean;
  className?: string;
  rounded?: string;
  /** Renders the tile as decorative — used when adjacent text already names it. */
  decorative?: boolean;
}

/**
 * Artwork tile.
 *
 * Three cases, in order of preference: a photographic image (screenshot) fills
 * the tile; a logo sits centred on a light plate; nothing at all falls back to
 * a generated cover, which is built to look deliberate rather than broken.
 */
export function Artwork({
  src,
  alt,
  gradient = 'from-highlight to-card',
  title,
  isLogo = false,
  className = '',
  rounded = 'rounded-md',
  decorative = false,
}: ArtworkProps) {
  const shell = `relative overflow-hidden bg-card shadow-lg ${rounded} ${className}`;

  if (!src) {
    return (
      <GeneratedCover
        title={title ?? alt}
        gradient={gradient}
        className={shell}
        decorative={decorative}
        alt={alt}
      />
    );
  }

  if (isLogo) {
    return (
      <div className={`${shell} bg-linear-to-br ${gradient} p-[10%]`}>
        <div className="grid h-full w-full place-items-center rounded bg-white/95 p-[8%] shadow-inner">
          <img
            src={src}
            alt={decorative ? '' : alt}
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <img
        src={src}
        alt={decorative ? '' : alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/**
 * Cover art for anything without an image. Layered gradient, a large initial and
 * a faint stripe pattern — enough structure that it reads as designed rather
 * than as a placeholder.
 */
function GeneratedCover({
  title,
  gradient,
  className,
  decorative,
  alt,
}: {
  title: string;
  gradient: string;
  className: string;
  decorative: boolean;
  alt: string;
}) {
  const initial = title.trim().charAt(0).toUpperCase() || '♪';

  return (
    <div
      className={`${className} bg-linear-to-br ${gradient}`}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : alt}
      aria-hidden={decorative || undefined}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgb(255 255 255 / 0.35) 0 2px, transparent 2px 14px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-1/4 -bottom-1/4 h-3/4 w-3/4 rounded-full bg-white/10 blur-2xl"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center text-[45%] leading-none font-black text-white/90 drop-shadow-lg"
      >
        {initial}
      </span>
    </div>
  );
}
