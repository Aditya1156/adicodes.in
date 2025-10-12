// Security utilities and headers
import React from 'react';

// Content Security Policy generator
export const generateCSP = () => {
  const policies = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Required for Vite in development
      "'unsafe-eval'", // Required for Vite in development
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://cdn.jsdelivr.net',
      'https://unpkg.com'
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for CSS-in-JS and Tailwind
      'https://fonts.googleapis.com',
      'https://cdn.jsdelivr.net'
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
      'data:'
    ],
    'img-src': [
      "'self'",
      'data:',
      'blob:',
      'https:',
      'https://www.google-analytics.com'
    ],
    'connect-src': [
      "'self'",
      'https://www.google-analytics.com',
      'https://api.github.com',
      'https://generativelanguage.googleapis.com'
    ],
    'media-src': ["'self'", 'data:', 'blob:'],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': []
  };

  return Object.entries(policies)
    .map(([directive, sources]) => 
      sources.length > 0 ? `${directive} ${sources.join(' ')}` : directive
    )
    .join('; ');
};

// Security headers for production
export const securityHeaders = {
  // Content Security Policy
  'Content-Security-Policy': generateCSP(),
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  
  // XSS Protection
  'X-XSS-Protection': '1; mode=block',
  
  // Strict Transport Security (HTTPS only)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Referrer Policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions Policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
  
  // Cross-Origin policies
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin'
};

// Input sanitization utilities
export const sanitization = {
  // Sanitize HTML input
  sanitizeHTML(input: string): string {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },

  // Sanitize URL
  sanitizeURL(url: string): string {
    try {
      const urlObj = new URL(url);
      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Invalid protocol');
      }
      return urlObj.toString();
    } catch {
      return '';
    }
  },

  // Validate email
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  // Rate limiting for form submissions
  createRateLimiter(maxRequests: number, windowMs: number) {
    const requests = new Map<string, number[]>();

    return (identifier: string): boolean => {
      const now = Date.now();
      const windowStart = now - windowMs;
      
      if (!requests.has(identifier)) {
        requests.set(identifier, []);
      }

      const userRequests = requests.get(identifier)!;
      
      // Remove old requests outside the window
      const recentRequests = userRequests.filter(time => time > windowStart);
      
      if (recentRequests.length >= maxRequests) {
        return false; // Rate limit exceeded
      }

      recentRequests.push(now);
      requests.set(identifier, recentRequests);
      return true;
    };
  }
};

// Environment variable validation
export const envValidation = {
  // Validate required environment variables
  validateRequiredEnvVars(requiredVars: string[]): void {
    const missing = requiredVars.filter(varName => !import.meta.env[varName]);
    if (missing.length > 0) {
      console.warn('Missing required environment variables:', missing);
    }
  },

  // Get environment variable with fallback
  getEnvVar(name: string, fallback: string = ''): string {
    return import.meta.env[name] || fallback;
  },

  // Check if production environment
  isProduction(): boolean {
    return import.meta.env.PROD;
  },

  // Check if development environment
  isDevelopment(): boolean {
    return import.meta.env.DEV;
  }
};

// Secure storage utilities
export const secureStorage = {
  // Encrypt data before storing (simple XOR for demo - use proper encryption in production)
  encrypt(data: string, key: string): string {
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(encrypted);
  },

  // Decrypt data
  decrypt(encryptedData: string, key: string): string {
    try {
      const encrypted = atob(encryptedData);
      let decrypted = '';
      for (let i = 0; i < encrypted.length; i++) {
        decrypted += String.fromCharCode(encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return decrypted;
    } catch {
      return '';
    }
  },

  // Secure localStorage wrapper
  setSecureItem(key: string, value: string, encryptionKey: string): void {
    try {
      const encrypted = this.encrypt(value, encryptionKey);
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Failed to store secure item:', error);
    }
  },

  // Get secure item from localStorage
  getSecureItem(key: string, encryptionKey: string): string | null {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      return this.decrypt(encrypted, encryptionKey);
    } catch (error) {
      console.error('Failed to retrieve secure item:', error);
      return null;
    }
  }
};

// Error handling and logging
export const secureErrorHandling = {
  // Log error without exposing sensitive information
  logError(error: Error, context: string): void {
    const sanitizedError = {
      message: error.message,
      stack: import.meta.env.DEV ? error.stack : undefined,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // In production, send to logging service
    if (import.meta.env.PROD) {
      // Example: send to external logging service
      console.error('Production Error:', sanitizedError);
    } else {
      console.error('Development Error:', error, context);
    }
  },

  // Create error boundary
  createErrorBoundary(fallbackComponent: React.ComponentType) {
    return class ErrorBoundary extends React.Component<
      { children: React.ReactNode },
      { hasError: boolean; error?: Error }
    > {
      constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
      }

      override componentDidCatch(error: Error, _errorInfo: React.ErrorInfo) {
        secureErrorHandling.logError(error, 'React Error Boundary');
      }

      override render() {
        if (this.state.hasError) {
          return React.createElement(fallbackComponent);
        }

        return this.props.children;
      }
    };
  }
};

// HTTPS enforcement
export const httpsEnforcement = {
  // Redirect to HTTPS if not already
  enforceHTTPS(): void {
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
  },

  // Check if connection is secure
  isSecureConnection(): boolean {
    return location.protocol === 'https:' || location.hostname === 'localhost';
  }
};

// Feature detection for security
export const securityFeatureDetection = {
  // Check if SubResource Integrity is supported
  supportsSRI(): boolean {
    return 'integrity' in document.createElement('script');
  },

  // Check if Strict Transport Security is supported
  supportsHSTS(): boolean {
    return 'https:' === location.protocol;
  },

  // Check if Web Crypto API is available
  supportsWebCrypto(): boolean {
    return 'crypto' in window && 'subtle' in window.crypto;
  }
};