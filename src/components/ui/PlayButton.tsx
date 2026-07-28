import { Pause, Play } from 'lucide-react';

interface PlayButtonProps {
  playing: boolean;
  onClick: () => void;
  /** Names the thing being played, e.g. "Shipped Builds". */
  label: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: 'h-9 w-9 [&_svg]:h-4 [&_svg]:w-4',
  md: 'h-12 w-12 [&_svg]:h-5 [&_svg]:w-5',
  lg: 'h-14 w-14 [&_svg]:h-6 [&_svg]:w-6',
} as const;

export function PlayButton({
  playing,
  onClick,
  label,
  size = 'md',
  className = '',
}: PlayButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={playing}
      aria-label={playing ? `Pause ${label}` : `Play ${label}`}
      className={`grid shrink-0 place-items-center rounded-full bg-accent text-black shadow-xl transition duration-200 ease-out-soft hover:scale-105 hover:bg-accent-bright active:scale-95 ${SIZES[size]} ${className}`}
    >
      {playing ? (
        <Pause fill="currentColor" strokeWidth={0} aria-hidden="true" />
      ) : (
        // Nudged right so the triangle looks optically centred in the circle.
        <Play fill="currentColor" strokeWidth={0} className="translate-x-[1px]" aria-hidden="true" />
      )}
    </button>
  );
}
