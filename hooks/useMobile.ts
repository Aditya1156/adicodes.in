import { useState, useEffect } from 'react';

// Hook for detecting mobile device and screen size
export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setOrientation(width > height ? 'landscape' : 'portrait');
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    screenSize,
    orientation,
    isTouch,
    isSmallMobile: screenSize.width < 375,
    isLargeMobile: screenSize.width >= 375 && screenSize.width < 768,
  };
};

// Hook for managing mobile menu state with gestures
export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      setStartY(e.touches[0]?.clientY || 0);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (startY === null || e.touches.length === 0) return;
    setCurrentY(e.touches[0]?.clientY || 0);
  };

  const handleTouchEnd = () => {
    if (startY === null || currentY === null) return;
    
    const deltaY = currentY - startY;
    
    // Close menu if swipe up gesture detected
    if (deltaY < -50 && isOpen) {
      setIsOpen(false);
    }
    
    setStartY(null);
    setCurrentY(null);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      // Cleanup body styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen, startY, currentY]);

  return {
    isOpen,
    setIsOpen,
    toggleMenu: () => setIsOpen(!isOpen),
    closeMenu: () => setIsOpen(false),
    openMenu: () => setIsOpen(true),
  };
};

// Hook for mobile-optimized touch gestures
export const useTouchGestures = (element: HTMLElement | null) => {
  const [gestureState, setGestureState] = useState({
    isSwping: false,
    swipeDirection: null as 'left' | 'right' | 'up' | 'down' | null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  });

  useEffect(() => {
    if (!element) return;

    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        startX = e.touches[0]?.clientX || 0;
        startY = e.touches[0]?.clientY || 0;
        
        setGestureState(prev => ({
          ...prev,
          isSwping: true,
          startX,
          startY,
          swipeDirection: null,
        }));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!gestureState.isSwping || e.touches.length === 0) return;

      const currentX = e.touches[0]?.clientX || 0;
      const currentY = e.touches[0]?.clientY || 0;
      
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      
      let direction: 'left' | 'right' | 'up' | 'down' | null = null;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      setGestureState(prev => ({
        ...prev,
        currentX,
        currentY,
        swipeDirection: direction,
      }));
    };

    const handleTouchEnd = () => {
      setGestureState(prev => ({
        ...prev,
        isSwping: false,
        swipeDirection: null,
      }));
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [element, gestureState.isSwping]);

  return gestureState;
};

// Hook for viewport height handling (mobile browser address bar)
export const useViewportHeight = () => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      // Use visual viewport API if available for better mobile support
      if (window.visualViewport) {
        setViewportHeight(window.visualViewport.height);
      } else {
        setViewportHeight(window.innerHeight);
      }
    };

    updateHeight();

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateHeight);
      return () => window.visualViewport?.removeEventListener('resize', updateHeight);
    } else {
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, []);

  return viewportHeight;
};

// Hook for detecting network status (useful for mobile)
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    const updateConnectionType = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;
      
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown');
      }
    };

    updateConnectionType();

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateConnectionType);
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      
      if (connection) {
        connection.removeEventListener('change', updateConnectionType);
      }
    };
  }, []);

  return {
    isOnline,
    connectionType,
    isSlowConnection: connectionType === 'slow-2g' || connectionType === '2g',
  };
};

// Hook for managing mobile-friendly focus
export const useMobileFocus = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const initialHeight = window.innerHeight;
    
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = initialHeight - currentHeight;
      
      // Assume keyboard is visible if height decreased by more than 150px
      setIsKeyboardVisible(heightDifference > 150);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isKeyboardVisible,
    scrollIntoView: (element: HTMLElement, offset = 0) => {
      if (element && isKeyboardVisible) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset + rect.top - offset;
        
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }
  };
};