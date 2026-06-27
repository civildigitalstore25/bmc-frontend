"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ASSETS } from "@/lib/constants/assets";
import { COMING_SOON } from "@/lib/constants/content";
import { cn } from "@/lib/utils/cn";

interface BackgroundVideoProps {
  className?: string;
}

export function BackgroundVideo({ className }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    // Muted autoplay is required on production domains (Vercel, etc.)
    video.muted = true;
    void video.play().catch(() => {
      // Autoplay blocked — poster remains visible until user interaction
    });
  }, [prefersReducedMotion]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      void video.play();
    }
  };

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
    <>
      <video
        ref={videoRef}
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

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={toggleMute}
        className="absolute right-4 bottom-4 z-20 border-primary-foreground/30 bg-primary/60 text-primary-foreground hover:bg-primary/80"
        aria-label={isMuted ? COMING_SOON.UNMUTE_LABEL : COMING_SOON.MUTE_LABEL}
      >
        {isMuted ? <VolumeX aria-hidden /> : <Volume2 aria-hidden />}
      </Button>
    </>
  );
}
