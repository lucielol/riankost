"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 100,
      minimum: 0.08,
      easing: 'ease',
      speed: 200,
    });

    // Handle route change start
    const handleRouteChangeStart = () => {
      NProgress.start();
    };

    // Handle clicks on Next.js Link components
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href) {
        const url = new URL(anchor.href, window.location.href);

        // Only start progress for internal navigation
        if (url.origin === window.location.origin && url.pathname !== pathname) {
          NProgress.start();
        }
      }
    };

    // Add click listener
    document.addEventListener('click', handleClick);

    // Listen for browser back/forward
    window.addEventListener('popstate', handleRouteChangeStart);

    // Watch for new links being added (for dynamic content)
    const observer = new MutationObserver(() => {
      // Links might be added dynamically
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handleRouteChangeStart);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    // Complete progress when route changes
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}

