import { useEffect } from 'react';

export function useServiceWorkerUpdate() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceWorker.js', {
          updateViaCache: 'none'
        })
        .then(() => {
          console.log('ServiceWorker registration successful');
        })
        .catch(error => {
          console.log('ServiceWorker registration failed:', error);
        });

      // Reload when new SW takes over (skipWaiting + claim)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  // No longer needed - SW auto-updates with skipWaiting + claim
  return {
    updateAvailable: false,
    refresh: () => window.location.reload(),
    dismiss: () => {}
  };
}
