import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const BARS = [0.35, 0.75, 0.5, 0.9];

/**
 * The animated bars that mark the currently playing track. Decorative — the
 * track row already announces its state — so it is hidden from assistive tech.
 *
 * When motion is reduced the bars render static at full height, which still
 * reads as "this one", without the movement.
 */
export function Equalizer({ playing = true }: { playing?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const animate = playing && !reduced;

  return (
    <span className="flex h-4 items-end justify-center gap-[2px]" aria-hidden="true">
      {BARS.map((seed, index) => (
        <span
          key={index}
          className="w-[3px] rounded-full bg-accent-bright"
          style={
            animate
              ? {
                  height: '100%',
                  animation: `eq-bar 900ms ease-in-out ${index * 130}ms infinite alternate`,
                  transformOrigin: 'bottom',
                }
              : { height: `${Math.round(seed * 100)}%` }
          }
        />
      ))}
    </span>
  );
}
