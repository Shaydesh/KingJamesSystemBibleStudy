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
    <div className="install-prompt">
      <p>Install this app on your device for offline use</p>
      <button onClick={handleInstallClick}>Install</button>
    </div>
  );
};

export default InstallPrompt;