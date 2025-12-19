"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function GAReporter({ gaId }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId) return;

    const query = searchParams?.toString();
    const page_path = pathname + (query ? `?${query}` : "");

    const send = () => {
      if (typeof window === "undefined" || typeof window.gtag !== "function") {
        return false;
      }
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path,
        send_to: gaId,
      });
      return true;
    };

    if (!send()) {
      const timer = setInterval(() => {
        if (send()) clearInterval(timer);
      }, 250);
      setTimeout(() => clearInterval(timer), 5000);
    }
  }, [pathname, searchParams, gaId]);

  return null;
}
