import type { Variants } from "framer-motion";

/**
 * Shared framer-motion variants.
 * Typed explicitly as `Variants` so TypeScript narrows `ease` correctly
 * instead of widening it to `string` (which breaks the Easing union type).
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "tween", 
      duration: 0.8, 
      ease: [0.25, 1, 0.5, 1] // Custom "out-expo" for smooth deceleration
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { 
      type: "tween", 
      duration: 0.8, 
      ease: [0.25, 1, 0.5, 1]
    },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { 
      type: "tween", 
      duration: 0.9, 
      ease: [0.25, 1, 0.5, 1]
    },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { 
      type: "tween", 
      duration: 0.9, 
      ease: [0.25, 1, 0.5, 1]
    },
  },
};

/** Card variant factory — accepts an index for staggered delay. */
export const cardVariant = (index: number): Variants => ({
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "tween", 
      delay: index * 0.1, 
      duration: 0.7, 
      ease: [0.25, 1, 0.5, 1] 
    },
  },
});
