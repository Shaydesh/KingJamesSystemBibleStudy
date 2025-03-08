
import React, { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setInstallPromptEvent(e);
      // Update UI to notify the user they can install the PWA
      setShowPrompt(true);
      console.log('Install prompt event captured');
    });

    // Handle the installed event to hide prompt
    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('PWA was installed');
      // Hide the install prompt
      setShowPrompt(false);
    });
  }, []);

  const handleInstallClick = () => {
    // Hide our user interface that shows our install prompt
    setShowPrompt(false);
    // Show the install prompt
    installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // We no longer need the prompt, clear it
      setInstallPromptEvent(null);
    });
  };

  if (!showPrompt) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: '#fff',
        color: '#333',
        padding: '15px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <p style={{ margin: '0 0 10px 0' }}>Install Bible Study App for offline use</p>
      <button 
        onClick={handleInstallClick}
        style={{
          background: '#333',
          color: '#fff',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Install
      </button>
    </div>
  );
};

export default InstallPrompt;
