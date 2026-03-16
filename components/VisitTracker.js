"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getVisitorId() {
  const key = "visitor_id";
  let id = localStorage.getItem(key);

  if (!id) {
    id = "v_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(key, id);
  }

  return id;
}

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const visitor_id = getVisitorId();

        const res = await fetch("/api/track-visit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || null,
            visitor_id,
          }),
        });

        const data = await res.json();
        console.log("Visit tracking response:", data);
      } catch (error) {
        console.error("Visit tracking failed:", error);
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}