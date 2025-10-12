// Component preloading utility for better performance
import React, { ComponentType, LazyExoticComponent } from 'react';

interface PreloadableComponent<T = {}> extends LazyExoticComponent<ComponentType<T>> {
  preload?: () => Promise<{ default: ComponentType<T> }>;
}

// Enhanced lazy loading with preload capabilities
export function lazyWithPreload<T = {}>(
  importFunc: () => Promise<{ default: ComponentType<T> }>
): PreloadableComponent<T> {
  const LazyComponent = React.lazy(importFunc);
  (LazyComponent as PreloadableComponent<T>).preload = importFunc;
  return LazyComponent as PreloadableComponent<T>;
}

// Preload component on hover
export function preloadOnHover(
  element: Element,
  component: PreloadableComponent
): void {
  const preload = () => {
    component.preload?.();
  };

  element.addEventListener('mouseenter', preload, { once: true });
  element.addEventListener('focus', preload, { once: true });
}

// Preload component on intersection (viewport entry)
export function preloadOnIntersection(
  element: Element,
  component: PreloadableComponent,
  rootMargin = '50px'
): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          component.preload?.();
          observer.unobserve(element);
        }
      });
    },
    { rootMargin }
  );

  observer.observe(element);
}

// Preload component after delay
export function preloadAfterDelay(
  component: PreloadableComponent,
  delay = 2000
): void {
  setTimeout(() => {
    component.preload?.();
  }, delay);
}

// Critical resource hints for faster loading
export function addResourceHints(): void {
  const head = document.head;

  // DNS prefetch for external resources
  const dnsPrefetchDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'cdn.tailwindcss.com',
  ];

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    head.appendChild(link);
  });

  // Preconnect to critical origins
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    head.appendChild(link);
  });
}

// Performance observer for monitoring
declare global {
  function gtag(...args: any[]): void;
}

export function initPerformanceMonitoring(): void {
  if (typeof window === 'undefined') return;

  // Core Web Vitals tracking
  const reportWebVital = (metric: any) => {
    // Send to analytics (Google Analytics, etc.)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.value),
        non_interaction: true,
      });
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${metric.name}:`, Math.round(metric.value), 'ms');
    }
  };

  if ('PerformanceObserver' in window) {
    // Monitor Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };
        
        if (lastEntry) {
          const lcpTime = lastEntry.renderTime || lastEntry.loadTime || 0;
          reportWebVital({
            name: 'LCP',
            value: lcpTime,
            id: `lcp-${Date.now()}`,
            rating: lcpTime <= 2500 ? 'good' : lcpTime <= 4000 ? 'needs-improvement' : 'poor'
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP monitoring not supported');
    }

    // Monitor First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fid = (entry as PerformanceEntry & { processingStart?: number }).processingStart! - entry.startTime;
          reportWebVital({
            name: 'FID',
            value: fid,
            id: `fid-${Date.now()}`,
            rating: fid <= 100 ? 'good' : fid <= 300 ? 'needs-improvement' : 'poor'
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID monitoring not supported');
    }

    // Monitor Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries: PerformanceEntry[] = [];

      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          const layoutShift = entry as PerformanceEntry & { 
            value?: number; 
            hadRecentInput?: boolean;
          };
          
          if (!layoutShift.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
            
            if (sessionValue && 
                firstSessionEntry &&
                lastSessionEntry &&
                entry.startTime - lastSessionEntry.startTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000) {
              sessionValue += layoutShift.value || 0;
              sessionEntries.push(entry);
            } else {
              sessionValue = layoutShift.value || 0;
              sessionEntries = [entry];
            }
            
            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              
              reportWebVital({
                name: 'CLS',
                value: clsValue,
                id: `cls-${Date.now()}`,
                rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor'
              });
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS monitoring not supported');
    }

    // Monitor Navigation Timing
    try {
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const nav = entry as PerformanceNavigationTiming;
          
          // Time to First Byte (TTFB)
          const ttfb = nav.responseStart - nav.requestStart;
          reportWebVital({
            name: 'TTFB',
            value: ttfb,
            id: `ttfb-${Date.now()}`,
            rating: ttfb <= 600 ? 'good' : ttfb <= 1500 ? 'needs-improvement' : 'poor'
          });
          
          // DOM Content Loaded
          const dcl = nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart;
          reportWebVital({
            name: 'DCL',
            value: dcl,
            id: `dcl-${Date.now()}`,
            rating: dcl <= 1500 ? 'good' : dcl <= 3000 ? 'needs-improvement' : 'poor'
          });
        });
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
    } catch (e) {
      console.warn('Navigation timing not supported');
    }
  }

  // Monitor JavaScript errors
  window.addEventListener('error', (event) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'exception', {
        description: event.error?.message || 'JavaScript Error',
        fatal: false,
      });
    }
    
    console.error('[Error Tracking]', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });
  });

  // Monitor unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'exception', {
        description: event.reason?.message || 'Unhandled Promise Rejection',
        fatal: false,
      });
    }
    
    console.error('[Promise Rejection]', event.reason);
  });

  // Monitor resource loading errors
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      const element = event.target as HTMLElement;
      console.error('[Resource Error]', {
        tagName: element.tagName,
        source: (element as any).src || (element as any).href,
        message: event.message
      });
    }
  }, true);
}