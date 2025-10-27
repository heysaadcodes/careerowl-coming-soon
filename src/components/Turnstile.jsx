"use client";
import { useEffect, useRef, useState } from "react";

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

  // Get sitekey from environment variables
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    setMounted(true);

    if (!sitekey) {
      console.error("Turnstile sitekey is missing");
      return;
    }

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
      script.onerror = (error) => {
        console.error("Failed to load Turnstile script:", error);
        if (onError) onError();
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
    if (!containerRef.current || !window.turnstile || !sitekey) {
      console.error(
        "Cannot render Turnstile: missing container, library, or sitekey"
      );
      return;
    }

    // Remove any existing turnstile instance
    if (widgetIdRef.current) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch (e) {
        // Ignore errors during cleanup
      }
    }

    try {
      // Render new instance
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: sitekey, // Use environment variable
        theme: theme,
        size: size,
        callback: (token) => {
          if (onVerify) onVerify(token);
        },
        "error-callback": () => {
          console.error("Turnstile error occurred");
          if (onError) onError();
        },
        "expired-callback": () => {
          console.log("Turnstile token expired");
          if (onExpire) onExpire();
        },
      });
    } catch (error) {
      console.error("Error rendering Turnstile:", error);
      if (onError) onError();
    }
  };

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-16">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!sitekey) {
    return (
      <div className="text-center text-red-500 p-4 border border-red-300 rounded">
        Turnstile configuration error: Missing site key
      </div>
    );
  }

  return <div ref={containerRef} className="turnstile-container" />;
};

export default Turnstile;
