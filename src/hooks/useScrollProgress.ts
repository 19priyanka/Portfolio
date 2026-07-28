import { useEffect, useState, type RefObject } from 'react';

/**
 * Scroll position of an element, normalized to 0..1 over `distance` pixels.
 * Drives the top bar's background fade — Spotify's signature header behaviour.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  distance = 220,
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const next = Math.min(1, Math.max(0, element.scrollTop / distance));
      setProgress((prev) => (Math.abs(prev - next) < 0.01 ? prev : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    element.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      element.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, distance]);

  return progress;
}
