import { useState, useEffect } from 'react';

export function useServiceWorkerUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceWorker.js')
        .then(reg => {
          setRegistration(reg);
          console.log('ServiceWorker registration successful');

          // Check for updates
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New version available!');
                  setUpdateAvailable(true);
                }
              });
            }
          });

          // Also check if there's already a waiting worker
          if (reg.waiting && navigator.serviceWorker.controller) {
            setUpdateAvailable(true);
          }
        })
        .catch(error => {
          console.log('ServiceWorker registration failed:', error);
        });

      // Listen for controller change (when new SW takes over)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });

      // Listen for SW_UPDATED message from new service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'SW_UPDATED') {
          console.log('Service worker updated to:', event.data.version);
          window.location.reload();
        }
      });
    }
  }, []);

  const refresh = () => {
    if (registration?.waiting) {
      // Tell waiting SW to skip waiting
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    } else {
      window.location.reload();
    }
  };

  const dismiss = () => {
    setUpdateAvailable(false);
  };

  return { updateAvailable, refresh, dismiss };
}
