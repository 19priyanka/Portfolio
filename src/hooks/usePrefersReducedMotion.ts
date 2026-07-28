import { useMediaQuery } from './useMediaQuery';

/**
 * Every animated surface routes its durations through this so there is no
 * animation path that ignores the OS preference.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** Returns `duration` normally, or 0 when the user has asked for reduced motion. */
export function useMotionDuration(duration: number): number {
  return usePrefersReducedMotion() ? 0 : duration;
}
