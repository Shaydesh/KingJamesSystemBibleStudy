
import React, { useState, useEffect } from 'react';

const OfflineStatus = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOffline(!navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      // Cleanup event listeners
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#f8d7da',
        color: '#721c24',
        padding: '10px 15px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: 1000
      }}
    >
      You are currently offline. Content is being served from cache.
    </div>
  );
};

export default OfflineStatus;
