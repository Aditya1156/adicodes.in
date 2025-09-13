declare global {
  interface Window {
    va?: (action: 'event', payload: { name: string; properties?: Record<string, any> }) => void;
  }
}

/**
 * Tracks a custom event using Vercel Analytics.
 * In development, it logs the event to the console.
 * @param eventName The name of the event to track.
 * @param eventProperties Optional properties to associate with the event.
 */
export const trackEvent = (eventName: string, eventProperties?: Record<string, string | number | boolean>) => {
  if (window.va) {
    window.va('event', {
      name: eventName,
      properties: eventProperties,
    });
  } else {
    // Fallback for local development or if the script fails to load
    console.log(`[Analytics Event (dev)]: ${eventName}`, eventProperties || '');
  }
};
