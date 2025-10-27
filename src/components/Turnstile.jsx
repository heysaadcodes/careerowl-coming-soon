"use client";
import { useEffect, useRef, useState } from "react";

// Global flag to track if Turnstile is already loaded
let turnstileLoaded = false;

const Turnstile = ({
  onVerify,
  onError,
  onExpire,
  onLoad,
  theme = "light",
  size = "normal",
}) => {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Only load Turnstile if it hasn't been loaded already
    if (!turnstileLoaded && window.turnstile === undefined) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        turnstileLoaded = true;
        if (onLoad) onLoad();
        renderTurnstile();
      };
      document.head.appendChild(script);
    } else if (window.turnstile) {
      // Turnstile already loaded, just render
      renderTurnstile();
    }

    return () => {
      // Cleanup on unmount
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          console.log("Turnstile cleanup:", e.message);
        }
      }
    };
  }, []);

  const renderTurnstile = () => {
    if (!containerRef.current || !window.turnstile) return;

    // Remove any existing turnstile instance
    if (widgetIdRef.current) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch (e) {
        // Ignore errors during cleanup
      }
    }

    // Render new instance
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: "YOUR_SITE_KEY", // Make sure to use your actual site key
      theme: theme,
      size: size,
      callback: (token) => {
        if (onVerify) onVerify(token);
      },
      "error-callback": () => {
        if (onError) onError();
      },
      "expired-callback": () => {
        if (onExpire) onExpire();
      },
    });
  };

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-16">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <div ref={containerRef} className="turnstile-container" />;
};

export default Turnstile;
