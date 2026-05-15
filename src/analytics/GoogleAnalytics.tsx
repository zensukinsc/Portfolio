import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/** Same ID as in `index.html`. Override with `VITE_GA_MEASUREMENT_ID` only if you change the tag there too. */
const GA_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || 'G-BD9C8XB0TP';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * SPA route changes: the tag in `index.html` handles the first page view only.
 * This sends an additional `config` when the client-side path changes.
 */
export function GoogleAnalytics() {
  const location = useLocation();
  const lastSentPath = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    const path =
      location.pathname + location.search + location.hash;

    if (lastSentPath.current === null) {
      lastSentPath.current = path;
      return;
    }
    if (lastSentPath.current === path) return;
    lastSentPath.current = path;

    window.gtag('config', GA_ID, {
      page_path: path,
      page_title: document.title,
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}
