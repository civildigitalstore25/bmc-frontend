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
  const [isMuted, setIsMuted] = useState(false);

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

    video.muted = false;

    void video.play().catch(() => {
      // Browsers may block unmuted autoplay — fall back so video still plays
      video.muted = true;
      setIsMuted(true);
      void video.play();
    });
  }, [prefersReducedMotion]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
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
        muted={isMuted}
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
        className="absolute right-3 bottom-3 z-20 size-9 border-primary-foreground/30 bg-primary/60 text-primary-foreground hover:bg-primary/80 sm:right-4 sm:bottom-4"
        aria-label={isMuted ? COMING_SOON.UNMUTE_LABEL : COMING_SOON.MUTE_LABEL}
      >
        {isMuted ? <VolumeX aria-hidden /> : <Volume2 aria-hidden />}
      </Button>
    </>
  );
}
