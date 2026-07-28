import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMotionDuration } from '../../hooks/usePrefersReducedMotion';

/** Shared page enter animation. Duration collapses to 0 under reduced motion. */
export function PageTransition({ children }: { children: ReactNode }) {
  const duration = useMotionDuration(0.22);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
