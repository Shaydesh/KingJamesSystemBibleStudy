import { useEffect } from 'react';

export function useServiceWorkerUpdate() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceWorker.js', {
          updateViaCache: 'none'
        })
        .then((registration) => {
          console.log('ServiceWorker registration successful');

          // Check for updates every 60 seconds
          const interval = setInterval(() => {
            registration.update();
          }, 60_000);

          // Also check when user returns to the tab
          const onVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
              registration.update();
            }
          };
          document.addEventListener('visibilitychange', onVisibilityChange);

          // Cleanup is handled by the effect's return
          (window as any).__swCleanup = () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisibilityChange);
          };
        })
        .catch(error => {
          console.log('ServiceWorker registration failed:', error);
        });

      // Reload when new SW takes over (skipWaiting + claim)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });

      // After page finishes loading, tell SW to prefetch all Bible books
      if (document.readyState === 'complete') {
        navigator.serviceWorker.ready.then((reg) => reg.active?.postMessage('PREFETCH_BOOKS'));
      } else {
        window.addEventListener('load', () => {
          navigator.serviceWorker.ready.then((reg) => reg.active?.postMessage('PREFETCH_BOOKS'));
        }, { once: true });
      }
    }

    return () => {
      (window as any).__swCleanup?.();
    };
  }, []);

  // No longer needed - SW auto-updates with skipWaiting + claim
  return {
    updateAvailable: false,
    refresh: () => window.location.reload(),
    dismiss: () => {}
  };
}
