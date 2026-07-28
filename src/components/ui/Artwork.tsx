import { Music } from 'lucide-react';

interface ArtworkProps {
  src?: string;
  alt: string;
  /** Tailwind gradient classes used when there is no image. */
  gradient?: string;
  className?: string;
  rounded?: string;
  /** Renders the tile as decorative — used when adjacent text already names it. */
  decorative?: boolean;
}

/**
 * Artwork tile with a gradient fallback, so a missing image degrades into a
 * deliberate-looking cover rather than a broken image icon.
 */
export function Artwork({
  src,
  alt,
  gradient = 'from-highlight to-card',
  className = '',
  rounded = 'rounded-md',
  decorative = false,
}: ArtworkProps) {
  const shell = `relative overflow-hidden bg-card shadow-lg ${rounded} ${className}`;

  if (!src) {
    return (
      <div
        className={`${shell} bg-linear-to-br ${gradient} grid place-items-center`}
        role={decorative ? undefined : 'img'}
        aria-label={decorative ? undefined : alt}
        aria-hidden={decorative || undefined}
      >
        <Music className="h-1/3 w-1/3 text-white/70" aria-hidden="true" />
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
        className="h-full w-full object-contain p-[8%]"
      />
    </div>
  );
}
