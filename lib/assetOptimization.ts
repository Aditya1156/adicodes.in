// Asset optimization utilities
export interface ImageSizes {
  xs: number;  // 320px
  sm: number;  // 640px
  md: number;  // 768px
  lg: number;  // 1024px
  xl: number;  // 1280px
  '2xl': number; // 1536px
}

export const defaultImageSizes: ImageSizes = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

// Generate responsive image sizes
export const generateResponsiveSizes = (
  baseWidth: number,
  breakpoints: Partial<ImageSizes> = {}
): string => {
  const sizes = { ...defaultImageSizes, ...breakpoints };
  
  return [
    `(max-width: ${sizes.xs}px) ${Math.round(baseWidth * 0.5)}px`,
    `(max-width: ${sizes.sm}px) ${Math.round(baseWidth * 0.7)}px`,
    `(max-width: ${sizes.md}px) ${Math.round(baseWidth * 0.8)}px`,
    `(max-width: ${sizes.lg}px) ${Math.round(baseWidth * 0.9)}px`,
    `${baseWidth}px`
  ].join(', ');
};

// Preload critical images
export const preloadImage = (src: string, as: 'image' = 'image'): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = src;
  document.head.appendChild(link);
};

// Preload multiple images
export const preloadImages = (sources: string[]): void => {
  sources.forEach(src => preloadImage(src));
};

// Convert image to WebP (client-side check)
export const supportsWebP = (): Promise<boolean> => {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Generate WebP image URL
export const getWebPUrl = (originalUrl: string): string => {
  if (!originalUrl.includes('.')) return originalUrl;
  
  const parts = originalUrl.split('.');
  const ext = parts.pop();
  const name = parts.join('.');
  
  // Only convert common image formats
  if (['jpg', 'jpeg', 'png'].includes(ext?.toLowerCase() || '')) {
    return `${name}.webp`;
  }
  
  return originalUrl;
};

// Optimize image URL with query parameters
export const optimizeImageUrl = (
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string => {
  // This would work with image optimization services like Cloudinary, ImageKit, etc.
  // For now, return the original URL with potential query parameters
  const params = new URLSearchParams();
  
  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.quality) params.set('q', options.quality.toString());
  if (options.format) params.set('f', options.format);
  
  const queryString = params.toString();
  return queryString ? `${url}?${queryString}` : url;
};

// Image compression utilities
export const compressImage = (
  file: File,
  maxWidth: number = 1920,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Critical CSS inlining for above-the-fold content
export const inlineCriticalCSS = (css: string): void => {
  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  document.head.appendChild(style);
};

// Resource hints for better performance
export const addResourceHints = (): void => {
  const hints = [
    // DNS prefetch
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
    { rel: 'dns-prefetch', href: '//cdn.tailwindcss.com' },
    
    // Preconnect to critical origins
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  ];
  
  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if ('crossOrigin' in hint) {
      link.crossOrigin = hint.crossOrigin;
    }
    document.head.appendChild(link);
  });
};

// Lazy load scripts
export const loadScript = (src: string, async: boolean = true): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Critical font loading
export const loadCriticalFonts = (): void => {
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2';
  document.head.appendChild(fontLink);
};