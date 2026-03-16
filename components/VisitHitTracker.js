"use client";

import { useEffect } from "react";

export default function VisitHitTracker() {
  useEffect(() => {
    const hitVisit = async () => {
      try {
        await fetch("/api/visit-hit", {
          method: "POST",
          cache: "no-store",
        });
      } catch (error) {
        console.error("visit-hit failed:", error);
      }
    };

    hitVisit();
  }, []);

  return null;
}