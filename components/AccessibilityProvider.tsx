import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { a11yValidation } from '../lib/accessibility';

interface AccessibilityContextType {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  fontSize: 'normal' | 'large' | 'larger';
  focusVisible: boolean;
  announceMessage: (message: string, priority?: 'polite' | 'assertive') => void;
  setFontSize: (size: 'normal' | 'large' | 'larger') => void;
  toggleHighContrast: () => void;
  validatePage: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [focusVisible, setFocusVisible] = useState(true);

  // Initialize accessibility preferences
  useEffect(() => {
    // Check reduced motion preference
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(reduceMotionQuery.matches);
    
    const handleReduceMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    reduceMotionQuery.addEventListener('change', handleReduceMotionChange);

    // Check high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    setPrefersHighContrast(highContrastQuery.matches);
    
    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches);
    };
    
    highContrastQuery.addEventListener('change', handleHighContrastChange);

    // Load saved font size preference
    const savedFontSize = localStorage.getItem('fontSize') as 'normal' | 'large' | 'larger';
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }

    // Keyboard navigation detection
    let isKeyboardUser = false;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        isKeyboardUser = true;
        document.body.classList.add('keyboard-user');
        setFocusVisible(true);
      }
    };
    
    const handleMouseDown = () => {
      if (isKeyboardUser) {
        isKeyboardUser = false;
        document.body.classList.remove('keyboard-user');
        setFocusVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      reduceMotionQuery.removeEventListener('change', handleReduceMotionChange);
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Apply font size to document
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-font-size', fontSize);
    
    const fontSizeMap = {
      normal: '16px',
      large: '18px',
      larger: '20px'
    };
    
    root.style.fontSize = fontSizeMap[fontSize];
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  // Apply high contrast mode
  useEffect(() => {
    const root = document.documentElement;
    if (prefersHighContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [prefersHighContrast]);

  // Apply reduced motion preference
  useEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [prefersReducedMotion]);

  // Announce message to screen readers
  const announceMessage = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      if (document.body.contains(announcer)) {
        document.body.removeChild(announcer);
      }
    }, 1000);
  };

  // Toggle high contrast mode
  const toggleHighContrast = () => {
    setPrefersHighContrast(prev => !prev);
    announceMessage(
      prefersHighContrast ? 'High contrast mode disabled' : 'High contrast mode enabled'
    );
  };

  // Validate page accessibility
  const validatePage = () => {
    const missingAlt = a11yValidation.checkMissingAltText();
    const missingLabels = a11yValidation.checkMissingFormLabels();
    const headingIssues = a11yValidation.checkHeadingHierarchy();

    let issues: string[] = [];

    if (missingAlt.length > 0) {
      issues.push(`${missingAlt.length} images missing alt text`);
    }

    if (missingLabels.length > 0) {
      issues.push(`${missingLabels.length} form elements missing labels`);
    }

    if (headingIssues.length > 0) {
      issues.push(`${headingIssues.length} heading hierarchy issues`);
    }

    if (issues.length > 0) {
      console.warn('Accessibility issues found:', issues);
      announceMessage(`Found ${issues.length} accessibility issues. Check console for details.`, 'assertive');
    } else {
      console.log('No accessibility issues found');
      announceMessage('No accessibility issues found', 'polite');
    }
  };

  const value: AccessibilityContextType = {
    prefersReducedMotion,
    prefersHighContrast,
    fontSize,
    focusVisible,
    announceMessage,
    setFontSize,
    toggleHighContrast,
    validatePage
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200"
      >
        Skip to main content
      </a>
    </AccessibilityContext.Provider>
  );
};

// Hook to use accessibility context
export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

// Accessibility settings component
export const AccessibilitySettings: React.FC = () => {
  const {
    fontSize,
    prefersHighContrast,
    setFontSize,
    toggleHighContrast,
    validatePage,
    announceMessage
  } = useAccessibility();

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Accessibility Settings
      </h3>
      
      <div className="space-y-4">
        {/* Font Size Control */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Font Size
          </label>
          <div className="flex gap-2">
            {(['normal', 'large', 'larger'] as const).map((size) => (
              <button
                key={size}
                onClick={() => {
                  setFontSize(size);
                  announceMessage(`Font size changed to ${size}`);
                }}
                className={`px-3 py-1 text-sm rounded-md border transition-colors duration-200 ${
                  fontSize === size
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                }`}
                aria-pressed={fontSize === size}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* High Contrast Toggle */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={prefersHighContrast}
              onChange={toggleHighContrast}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              High Contrast Mode
            </span>
          </label>
        </div>

        {/* Accessibility Validation */}
        <div>
          <button
            onClick={validatePage}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Check Page Accessibility
          </button>
        </div>
      </div>
    </div>
  );
};