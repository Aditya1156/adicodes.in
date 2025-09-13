import { useEffect, useState } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * Returns true if user prefers reduced motion, false otherwise
 */
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook to detect if device has low performance capabilities
 * Returns true if device should use reduced animations
 */
export const useLowPerformanceMode = (): boolean => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Check for performance indicators
    const checkPerformance = () => {
      const connection = (navigator as any).connection;
      const hardwareConcurrency = navigator.hardwareConcurrency || 1;
      const deviceMemory = (navigator as any).deviceMemory || 1;

      // Consider low performance if:
      // - Less than 4 CPU cores
      // - Less than 4GB RAM
      // - Slow network connection
      const lowCores = hardwareConcurrency < 4;
      const lowMemory = deviceMemory < 4;
      const slowConnection = connection && (
        connection.effectiveType === 'slow-2g' || 
        connection.effectiveType === '2g' ||
        connection.effectiveType === '3g'
      );

      setIsLowPerformance(lowCores || lowMemory || slowConnection);
    };

    checkPerformance();
  }, []);

  return isLowPerformance;
};

/**
 * Combined hook for determining if animations should be reduced
 */
export const useShouldReduceMotion = (): boolean => {
  const prefersReducedMotion = useReducedMotion();
  const isLowPerformance = useLowPerformanceMode();
  
  return prefersReducedMotion || isLowPerformance;
};
