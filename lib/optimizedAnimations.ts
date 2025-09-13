import { Variants } from 'framer-motion';

/**
 * Optimized animation variants with reduced complexity for better performance
 */

// Simplified fade animations
export const optimizedFadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const optimizedFadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

// Simplified slide animations
export const optimizedSlideIn: Variants = {
  initial: { x: 30, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { x: -30, opacity: 0, transition: { duration: 0.2 } }
};

// Simplified scale animations
export const optimizedScaleIn: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } }
};

// Simplified stagger container
export const optimizedStaggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

// Reduced complexity hover effects
export const optimizedHover = {
  scale: 1.02,
  transition: { duration: 0.2, ease: 'easeOut' }
};

export const optimizedTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// High-performance card animations
export const optimizedCardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  hover: {
    y: -5,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

// Simplified loading animations
export const optimizedSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Modal animations with better performance
export const optimizedModalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const optimizedModalContent: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { duration: 0.2 }
  }
};

// Navigation animations
export const optimizedNavSlide: Variants = {
  initial: { y: -50, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } }
};

// Project grid animations
export const optimizedProjectGrid: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

export const optimizedProjectCard: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

// Utility function to get animations based on performance mode
export const getOptimizedVariants = (
  shouldReduceMotion: boolean,
  fullVariants: Variants,
  reducedVariants: Variants
): Variants => {
  return shouldReduceMotion ? reducedVariants : fullVariants;
};
