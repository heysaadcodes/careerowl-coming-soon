"use client";
import { useEffect, useRef, useState } from "react";

export default function Turnstile({
  onVerify,
  onError,
  onExpire,
  theme = "light",
  size = "normal",
}) {
  const containerRef = useRef(null);
  const [widgetId, setWidgetId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Turnstile script
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error("Failed to load Turnstile script");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      // Remove widget if it exists
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [widgetId]);

  useEffect(() => {
    if (
      isLoaded &&
      containerRef.current &&
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    ) {
      // Render Turnstile widget
      const id = window.turnstile.render(containerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        callback: onVerify,
        "error-callback": onError,
        "expired-callback": onExpire,
        theme,
        size,
      });
      setWidgetId(id);
    }
  }, [isLoaded, onVerify, onError, onExpire, theme, size]);

  const reset = () => {
    if (widgetId && window.turnstile) {
      window.turnstile.reset(widgetId);
    }
  };

  return (
    <div>
      <div ref={containerRef} className="turnstile-container" />
      {!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <div className="text-red-500 text-sm mt-2">
          Turnstile site key is missing. Please check your environment
          variables.
        </div>
      )}
    </div>
  );
}
