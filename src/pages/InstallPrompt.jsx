import React, { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default install prompt
      e.preventDefault();
      setDeferredPrompt(e);
      setIsPromptVisible(true); // Show the custom invite message
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt when the user clicks the invite message
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        setDeferredPrompt(null);
        setIsPromptVisible(false); // Hide the custom message after action
      });
    }
  };

  if (!isPromptVisible) return null; // Don't render anything if the prompt isn't visible

  return (
    <div
      style={{
        background: "none",
        border: "none",
        color: "#fff",
        fontSize: "1.5em",
        marginRight: "20px",
        marginTop: "12px",
        marginLeft: "auto",
        cursor: "pointer", /* Changes cursor to a hand/pointer on hover */
      }}
      onClick={handleInstallClick}
    >
      &#8595; {/* HTML entity for download */}
    </div>
  );
};

export default InstallPrompt;