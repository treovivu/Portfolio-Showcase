import type { Transition } from 'framer-motion';

/**
 * Nhịp motion tokens. Everything animates transform/opacity only.
 * - settle: entrances; fast out, long soft landing.
 * - beat: snappy spring for direct feedback (taps, counts, plucks).
 * - sway: looser spring for things that travel across a stage.
 */
export const ease = {
  settle: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  micro: 0.18,
  standard: 0.45,
  entrance: 0.8,
};

export const stagger = 0.06;

export const spring = {
  beat: { type: 'spring', stiffness: 420, damping: 22 } satisfies Transition,
  sway: { type: 'spring', stiffness: 220, damping: 20 } satisfies Transition,
};

export const enter = (delay = 0): Transition => ({
  duration: duration.entrance,
  ease: ease.settle,
  delay,
});
