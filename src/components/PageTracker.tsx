"use client";

import { useEffect, useRef } from "react";
import { recordPageView } from "@/app/admin/actions";

export default function PageTracker() {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      hasTracked.current = true;
      // Record page view in the background
      recordPageView().catch(console.error);
    }
  }, []);

  return null; // This component does not render anything
}
