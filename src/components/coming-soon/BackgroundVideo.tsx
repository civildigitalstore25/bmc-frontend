"use client";

import { useEffect, useState } from "react";

import { ASSETS } from "@/lib/constants/assets";
import { cn } from "@/lib/utils/cn";

interface BackgroundVideoProps {
  className?: string;
}

export function BackgroundVideo({ className }: BackgroundVideoProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  if (prefersReducedMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={ASSETS.IMAGES.HERO_POSTER}
        alt="Businessman Development Council background"
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <video
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      autoPlay
      muted
      loop
      playsInline
      poster={ASSETS.IMAGES.HERO_POSTER}
      aria-hidden
    >
      <source src={ASSETS.VIDEOS.HERO} type="video/mp4" />
    </video>
  );
}
