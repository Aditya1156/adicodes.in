import { useState, useEffect } from 'react';

/**
 * Performance monitoring utilities for tracking app performance
 */

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.initializeObserver();
    this.measureTTFB();
  }

  private initializeObserver() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.handlePerformanceEntry(entry);
        }
      });

      // Observe different types of performance entries
      this.observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }
  }

  private handlePerformanceEntry(entry: PerformanceEntry) {
    switch (entry.entryType) {
      case 'paint':
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
        }
        break;
      case 'largest-contentful-paint':
        this.metrics.lcp = entry.startTime;
        break;
      case 'first-input':
        this.metrics.fid = (entry as any).processingStart - entry.startTime;
        break;
      case 'layout-shift':
        if (!(entry as any).hadRecentInput) {
          this.metrics.cls = (this.metrics.cls || 0) + (entry as any).value;
        }
        break;
    }
  }

  private measureTTFB() {
    if (typeof window === 'undefined') return;

    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry) {
      this.metrics.ttfb = navEntry.responseStart - navEntry.fetchStart;
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public logMetrics() {
    console.group('🚀 Performance Metrics');
    console.log('First Contentful Paint (FCP):', this.metrics.fcp ? `${this.metrics.fcp.toFixed(2)}ms` : 'Not measured');
    console.log('Largest Contentful Paint (LCP):', this.metrics.lcp ? `${this.metrics.lcp.toFixed(2)}ms` : 'Not measured');
    console.log('First Input Delay (FID):', this.metrics.fid ? `${this.metrics.fid.toFixed(2)}ms` : 'Not measured');
    console.log('Cumulative Layout Shift (CLS):', this.metrics.cls ? this.metrics.cls.toFixed(4) : 'Not measured');
    console.log('Time to First Byte (TTFB):', this.metrics.ttfb ? `${this.metrics.ttfb.toFixed(2)}ms` : 'Not measured');
    console.groupEnd();
  }

  public disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// React hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [monitor] = useState(() => new PerformanceMonitor());

  useEffect(() => {
    // Log metrics after page load
    const timer = setTimeout(() => {
      monitor.logMetrics();
    }, 3000);

    return () => {
      clearTimeout(timer);
      monitor.disconnect();
    };
  }, [monitor]);

  return monitor;
};

// Utility functions for manual performance tracking
export const measureAsyncOperation = async <T>(
  operation: () => Promise<T>,
  label: string
): Promise<T> => {
  const start = performance.now();
  try {
    const result = await operation();
    const duration = performance.now() - start;
    console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    console.log(`❌ ${label} failed after: ${duration.toFixed(2)}ms`);
    throw error;
  }
};

export const markPerformance = (name: string) => {
  if (typeof window !== 'undefined' && performance.mark) {
    performance.mark(name);
  }
};

export const measurePerformance = (name: string, startMark: string, endMark: string) => {
  if (typeof window !== 'undefined' && performance.measure) {
    try {
      performance.measure(name, startMark, endMark);
      const measures = performance.getEntriesByName(name, 'measure');
      if (measures.length > 0 && measures[0]) {
        console.log(`📊 ${name}: ${measures[0].duration.toFixed(2)}ms`);
      }
    } catch (error) {
      console.warn('Performance measurement failed:', error);
    }
  }
};

// Bundle size analyzer (development only)
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV !== 'development') return;

  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

  console.group('📦 Bundle Analysis');
  console.log('Script files:', scripts.length);
  console.log('Stylesheet files:', styles.length);
  
  scripts.forEach((script: any) => {
    const src = script.src;
    if (src && !src.includes('node_modules')) {
      console.log('Script:', src.split('/').pop());
    }
  });
  
  console.groupEnd();
};

export default PerformanceMonitor;
