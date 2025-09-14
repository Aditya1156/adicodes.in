import { Variants } from 'framer-motion';

// Standard animation variants for consistency
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

export const slideInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerFastContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const bounceIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.3,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

export const rotateIn: Variants = {
  hidden: { 
    opacity: 0, 
    rotate: -10,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

// Button hover effects - Optimized for responsive design
export const buttonHover = {
  scale: 1.03,
  transition: { 
    type: "spring", 
    stiffness: 500, 
    damping: 30,
    mass: 0.5
  }
};

export const buttonTap = {
  scale: 0.97,
  transition: { 
    type: "spring", 
    stiffness: 600, 
    damping: 20,
    mass: 0.3
  }
};

// Responsive hover effects for different screen sizes
export const responsiveHover = {
  mobile: {
    scale: 1.01,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  desktop: {
    scale: 1.03,
    y: -1,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 25 
    }
  }
};

// Gentle animations for navigation items
export const navItemHover = {
  scale: 1.02,
  y: -1,
  transition: { 
    type: "spring", 
    stiffness: 500, 
    damping: 30,
    mass: 0.5
  }
};

export const navItemTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// Card hover effects
export const cardHover = {
  y: -8,
  scale: 1.02,
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  transition: { type: "spring", stiffness: 300, damping: 20 }
};

// Icon animations
export const iconFloat = {
  y: [-2, 2, -2],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const iconRotate = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: "linear"
  }
};

// Text animations
export const typewriterVariants: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

export const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Modal animations
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const modalContent: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 50
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    y: 50,
    transition: { duration: 0.2 }
  }
};

// Scroll-triggered animations
export const scrollFadeIn: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

export const scrollSlideIn: Variants = {
  hidden: { 
    opacity: 0, 
    x: -100 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

// Loading animations
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const spinVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Navigation animations
export const navSlideDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -100 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

export const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

export const mobileMenuItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Custom easing curves
export const easings = {
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
};

// Additional animation variants for enhanced components
export const scaleHover: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { 
      duration: 0.3,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

export const slideInFromRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

export const floatAnimation: Variants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Enhanced project-specific animations
export const projectCardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9,
    rotateX: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    rotateX: -2,
    boxShadow: "0 20px 40px -8px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.8,
    },
  },
};

export const projectGridContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      duration: 0.3,
    },
  },
};

export const projectModalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateX: 15,
    y: 60,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 1,
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    rotateX: -10,
    y: -30,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export const imageGalleryVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.1,
    filter: "blur(4px)",
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
      filter: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.9,
    filter: "blur(2px)",
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.3 },
      filter: { duration: 0.2 },
    },
  }),
};

export const glowEffect: Variants = {
  rest: {
    boxShadow: "0 0 0 0 rgba(99, 102, 241, 0)",
  },
  hover: {
    boxShadow: "0 0 20px 2px rgba(99, 102, 241, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Enhanced Glow Effect Variants
export const neonGlowVariants: Variants = {
  initial: {
    filter: "drop-shadow(0 0 8px #00ffff80)",
    textShadow: "0 0 8px #00ffff",
  },
  animate: {
    filter: [
      "drop-shadow(0 0 8px #00ffff80)",
      "drop-shadow(0 0 12px #00ffffcc)",
      "drop-shadow(0 0 8px #00ffff80)"
    ],
    textShadow: [
      "0 0 8px #00ffff",
      "0 0 12px #00ffff",
      "0 0 8px #00ffff"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  hover: {
    filter: "drop-shadow(0 0 16px #00ffffff)",
    textShadow: "0 0 16px #00ffff",
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};

export const pulseGlowVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.4, 0.9, 0.4],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "reverse"
    }
  }
};

export const electricGlowVariants: Variants = {
  initial: {
    opacity: 0.6,
    filter: "brightness(1)",
  },
  flash: {
    opacity: [0.6, 1, 0.8, 1, 0.6],
    filter: [
      "brightness(1)",
      "brightness(1.5) contrast(1.2)",
      "brightness(1)",
      "brightness(1.3) contrast(1.1)",
      "brightness(1)"
    ],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

export const rainbowGlowVariants: Variants = {
  animate: {
    background: [
      "conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)",
      "conic-gradient(from 60deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)",
      "conic-gradient(from 120deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)",
      "conic-gradient(from 180deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)",
      "conic-gradient(from 240deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)",
      "conic-gradient(from 300deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)",
      "conic-gradient(from 360deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)"
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const auroraGlowVariants: Variants = {
  animate: {
    x: ['-100%', '100%'],
    opacity: [0, 0.6, 0],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const crystallineGlowVariants: Variants = {
  animate: {
    opacity: [0.2, 0.8, 0.2],
    scale: [0.9, 1.1, 0.9],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const orbitalGlowVariants: Variants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const particleGlowVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    opacity: [0, 0.8, 0],
    scale: [0.5, 1, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const smokyGlowVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    rotate: [0, 10, 0],
    opacity: [0.4, 0.6, 0.4],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const magneticHover: Variants = {
  rest: { x: 0, y: 0 },
  hover: {
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20,
      mass: 0.5,
    },
  },
};

export const tagVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.6,
    y: 20,
  },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  hover: {
    scale: 1.1,
    y: -2,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 15 
    },
  },
};

export const featureListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const featureItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const carouselSlideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? 25 : -25,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
      rotateY: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.9,
    rotateY: direction < 0 ? 25 : -25,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.3 },
      rotateY: { duration: 0.3 },
    },
  }),
};

export const projectBackgroundVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const statusBadgeVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.5,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 2,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 15 
    },
  },
};

export const loadingSpinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Advanced micro-interactions
export const rippleEffect: Variants = {
  initial: { 
    scale: 0, 
    opacity: 0.5 
  },
  animate: { 
    scale: 4, 
    opacity: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    }
  },
};

export const breathingAnimation: Variants = {
  animate: {
    scale: [1, 1.02, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const parallaxVariants: Variants = {
  animate: (offset: number) => ({
    y: offset * 0.5,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
};

// Enhanced modal-specific animations
export const modalOverlayVariants: Variants = {
  hidden: { 
    opacity: 0, 
    backdropFilter: "blur(0px)" 
  },
  visible: { 
    opacity: 1, 
    backdropFilter: "blur(8px)",
    transition: { 
      duration: 0.4, 
      ease: "easeOut" 
    } 
  },
  exit: { 
    opacity: 0, 
    backdropFilter: "blur(0px)",
    transition: { 
      duration: 0.3, 
      ease: "easeIn" 
    } 
  }
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateX: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateX: 15,
    transition: {
      duration: 0.3,
      ease: [0.5, 0, 0.75, 0],
    },
  },
};

export const modalImageVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.1,
    rotateY: direction > 0 ? 45 : -45,
  }),
  center: { 
    zIndex: 1, 
    x: 0, 
    opacity: 1, 
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.9,
    rotateY: direction < 0 ? 45 : -45,
    transition: {
      duration: 0.3,
      ease: [0.5, 0, 0.75, 0],
    }
  }),
};

// Floating animation for background particles
export const floatingVariants: Variants = {
  animate: {
    y: [-20, 20],
    x: [-10, 10],
    rotate: [-5, 5],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }
  }
};
