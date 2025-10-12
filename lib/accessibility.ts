// Accessibility utilities and helpers

// Focus management utilities
export const focusManagement = {
  // Trap focus within a container
  trapFocus(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    
    // Focus first element
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  },

  // Return focus to previous element
  returnFocus(previousElement: HTMLElement | null) {
    if (previousElement && typeof previousElement.focus === 'function') {
      previousElement.focus();
    }
  },

  // Save current focus
  saveFocus(): HTMLElement | null {
    return document.activeElement as HTMLElement;
  }
};

// ARIA utilities
export const ariaUtils = {
  // Announce to screen readers
  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  // Set ARIA attributes
  setAttributes(element: HTMLElement, attributes: Record<string, string>) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  },

  // Generate unique IDs for ARIA relationships
  generateId(prefix: string = 'aria'): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }
};

// Keyboard navigation utilities
export const keyboardNavigation = {
  // Handle arrow key navigation
  handleArrowKeys(
    event: KeyboardEvent,
    items: NodeListOf<HTMLElement> | HTMLElement[],
    currentIndex: number,
    onChange: (newIndex: number) => void
  ) {
    const { key } = event;
    let newIndex = currentIndex;

    switch (key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    onChange(newIndex);
    (items[newIndex] as HTMLElement).focus();
  },

  // Handle escape key
  handleEscape(event: KeyboardEvent, callback: () => void) {
    if (event.key === 'Escape') {
      event.preventDefault();
      callback();
    }
  },

  // Handle enter and space keys
  handleActivation(event: KeyboardEvent, callback: () => void) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  }
};

// Screen reader utilities
export const screenReaderUtils = {
  // Check if screen reader is active
  isScreenReaderActive(): boolean {
    return window.speechSynthesis?.speaking || 
           document.body.classList.contains('reader-mode') ||
           window.navigator.userAgent.includes('NVDA') ||
           window.navigator.userAgent.includes('JAWS');
  },

  // Hide from screen readers
  hideFromScreenReader(element: HTMLElement) {
    element.setAttribute('aria-hidden', 'true');
  },

  // Show to screen readers only
  showToScreenReaderOnly(element: HTMLElement) {
    element.className = `${element.className} sr-only`.trim();
  }
};

// Color contrast utilities
export const colorContrastUtils = {
  // Calculate relative luminance
  getRelativeLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  // Calculate contrast ratio
  getContrastRatio(color1: [number, number, number], color2: [number, number, number]): number {
    const l1 = this.getRelativeLuminance(...color1);
    const l2 = this.getRelativeLuminance(...color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  },

  // Check if contrast meets WCAG standards
  meetsWCAGStandards(
    color1: [number, number, number], 
    color2: [number, number, number], 
    level: 'AA' | 'AAA' = 'AA'
  ): boolean {
    const ratio = this.getContrastRatio(color1, color2);
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  }
};

// Reduced motion utilities
export const reducedMotionUtils = {
  // Check if user prefers reduced motion
  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Respect reduced motion preference
  respectReducedMotion<T>(normalValue: T, reducedValue: T): T {
    return this.prefersReducedMotion() ? reducedValue : normalValue;
  }
};

// High contrast utilities
export const highContrastUtils = {
  // Check if high contrast mode is enabled
  isHighContrastMode(): boolean {
    return window.matchMedia('(prefers-contrast: high)').matches;
  },

  // Apply high contrast styles
  applyHighContrastStyles(element: HTMLElement) {
    if (this.isHighContrastMode()) {
      element.classList.add('high-contrast');
    }
  }
};

// Accessibility validation utilities
export const a11yValidation = {
  // Check for missing alt text
  checkMissingAltText(): HTMLImageElement[] {
    const images = document.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
    return Array.from(images).filter(img => !img.alt && !img.getAttribute('aria-label'));
  },

  // Check for missing form labels
  checkMissingFormLabels(): HTMLInputElement[] {
    const inputs = document.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement>;
    return Array.from(inputs).filter(input => {
      const hasLabel = document.querySelector(`label[for="${input.id}"]`);
      const hasAriaLabel = input.getAttribute('aria-label');
      const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
      return !hasLabel && !hasAriaLabel && !hasAriaLabelledBy;
    });
  },

  // Check for heading hierarchy
  checkHeadingHierarchy(): { element: HTMLHeadingElement; issue: string }[] {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6') as NodeListOf<HTMLHeadingElement>;
    const issues: { element: HTMLHeadingElement; issue: string }[] = [];
    let previousLevel = 0;

    Array.from(headings).forEach(heading => {
      const currentLevel = parseInt(heading.tagName.charAt(1));
      
      if (currentLevel > previousLevel + 1) {
        issues.push({
          element: heading,
          issue: `Heading level ${currentLevel} follows h${previousLevel}, skipping levels`
        });
      }
      
      previousLevel = currentLevel;
    });

    return issues;
  }
};

// Performance accessibility utilities
export const performanceA11y = {
  // Lazy load for accessibility
  lazyLoadA11y(element: HTMLElement, callback: () => void) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(element);
    return observer;
  }
};