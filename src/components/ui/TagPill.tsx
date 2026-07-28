import { Link } from 'react-router-dom';

interface TagPillProps {
  label: string;
  /** Renders as a link into search when true. */
  interactive?: boolean;
  size?: 'sm' | 'md';
}

const SIZES = {
  sm: 'px-2 py-[3px] text-[11px]',
  md: 'px-3 py-1 text-xs',
} as const;

/** Genre pill. The stack, styled the way Spotify styles genres. */
export function TagPill({ label, interactive = false, size = 'sm' }: TagPillProps) {
  const classes = `inline-flex shrink-0 items-center rounded-full border border-line bg-white/5 font-medium tracking-wide text-subdued ${SIZES[size]}`;

  if (!interactive) {
    return <span className={classes}>{label}</span>;
  }

  return (
    <Link
      to={`/search?q=${encodeURIComponent(label)}`}
      className={`${classes} transition-colors duration-200 hover:border-white/40 hover:bg-white/10 hover:text-ink`}
    >
      {label}
    </Link>
  );
}
