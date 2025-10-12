// Service Worker for PWA functionality
const CACHE_NAME = 'adicodes-portfolio-v1.0.0';
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;
const OFFLINE_PAGE = '/offline.html';

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/favicon.svg',
  // Add other critical assets
];

// Files to cache dynamically
const CACHE_STRATEGIES = {
  // Cache first (for static assets)
  CACHE_FIRST: [
    /\.(js|css|woff2|woff|ttf|eot)$/,
    /\/assets\//,
    /\/icons\//
  ],
  
  // Network first (for API calls and dynamic content)
  NETWORK_FIRST: [
    /\/api\//,
    /\.json$/
  ],
  
  // Stale while revalidate (for images and other assets)
  STALE_WHILE_REVALIDATE: [
    /\.(png|jpg|jpeg|svg|gif|webp)$/,
    /\/images\//
  ]
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Service worker installed');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Installation failed:', error);
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  // Handle different caching strategies
  if (shouldCacheFirst(request.url)) {
    event.respondWith(cacheFirst(request));
  } else if (shouldNetworkFirst(request.url)) {
    event.respondWith(networkFirst(request));
  } else if (shouldStaleWhileRevalidate(request.url)) {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    // Default strategy: network first with cache fallback
    event.respondWith(networkFirst(request));
  }
});

// Cache first strategy
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return new Response('Network error', { status: 500 });
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_PAGE);
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

// Helper functions to determine caching strategy
function shouldCacheFirst(url) {
  return CACHE_STRATEGIES.CACHE_FIRST.some(pattern => pattern.test(url));
}

function shouldNetworkFirst(url) {
  return CACHE_STRATEGIES.NETWORK_FIRST.some(pattern => pattern.test(url));
}

function shouldStaleWhileRevalidate(url) {
  return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE.some(pattern => pattern.test(url));
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

// Handle contact form submissions when back online
async function syncContactForm() {
  try {
    // Get queued form submissions from IndexedDB
    const submissions = await getQueuedSubmissions();
    
    for (const submission of submissions) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission.data)
        });
        
        if (response.ok) {
          await removeQueuedSubmission(submission.id);
          console.log('[SW] Contact form synced successfully');
        }
      } catch (error) {
        console.error('[SW] Failed to sync contact form:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// Push notifications (when implemented)
self.addEventListener('push', (event) => {
  console.log('[SW] Push message received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Update',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Aditya Kumar Portfolio', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Placeholder functions for IndexedDB operations
async function getQueuedSubmissions() {
  // Implement IndexedDB operations for queued form submissions
  return [];
}

async function removeQueuedSubmission(id) {
  // Implement IndexedDB operations to remove synced submissions
  console.log('Removing submission:', id);
}