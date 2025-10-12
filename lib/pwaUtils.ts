import { useEffect, useState } from 'react';

// PWA installation hook
export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebApp = (window.navigator as any).standalone;
      setIsInstalled(isStandalone || isInWebApp);
    };

    checkInstalled();

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return false;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error installing PWA:', error);
      return false;
    }
  };

  return {
    isInstallable,
    isInstalled,
    installApp
  };
};

// Service Worker registration hook
export const useServiceWorker = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      setRegistration(reg);
      setIsRegistered(true);

      // Check for updates
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
            }
          });
        }
      });

      console.log('Service Worker registered successfully');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  };

  const updateServiceWorker = async () => {
    if (registration) {
      try {
        await registration.update();
        window.location.reload();
      } catch (error) {
        console.error('Service Worker update failed:', error);
      }
    }
  };

  return {
    isSupported,
    isRegistered,
    updateAvailable,
    updateServiceWorker
  };
};

// Network status hook
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// PWA capabilities detection
export const getPWACapabilities = () => {
  return {
    serviceWorker: 'serviceWorker' in navigator,
    pushNotifications: 'PushManager' in window,
    backgroundSync: 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
    webShare: 'share' in navigator,
    installPrompt: 'BeforeInstallPromptEvent' in window,
    fullscreen: 'requestFullscreen' in document.documentElement,
    vibration: 'vibrate' in navigator,
    geolocation: 'geolocation' in navigator,
    storage: 'storage' in navigator,
    indexedDB: 'indexedDB' in window
  };
};

// Web Share API
export const useWebShare = () => {
  const isSupported = 'share' in navigator;

  const share = async (data: ShareData) => {
    if (!isSupported) {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(data.url || window.location.href);
        return { success: true, method: 'clipboard' };
      } catch {
        return { success: false, error: 'Share not supported' };
      }
    }

    try {
      await navigator.share(data);
      return { success: true, method: 'native' };
    } catch (error) {
      return { success: false, error };
    }
  };

  return { isSupported, share };
};

// Cache management utilities
export const cacheManagement = {
  async getCacheSize(): Promise<number> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return estimate.usage || 0;
    }
    return 0;
  },

  async clearCache(): Promise<void> {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }
  },

  async getCacheNames(): Promise<string[]> {
    if ('caches' in window) {
      return await caches.keys();
    }
    return [];
  }
};

// Notification utilities
export const notificationUtils = {
  async requestPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      return await Notification.requestPermission();
    }
    return 'denied';
  },

  isSupported(): boolean {
    return 'Notification' in window;
  },

  getPermission(): NotificationPermission {
    return Notification.permission;
  },

  async showNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (this.getPermission() === 'granted') {
      new Notification(title, options);
    }
  }
};