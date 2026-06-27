"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ASSETS, type HeroVideoSrc } from "@/lib/constants/assets";
import { COMING_SOON } from "@/lib/constants/content";
import { MEDIA_QUERIES } from "@/lib/constants/media";
import { cn } from "@/lib/utils/cn";

interface BackgroundVideoProps {
  className?: string;
}

function getHeroVideoSrc(isMobile: boolean): HeroVideoSrc {
  return isMobile ? ASSETS.VIDEOS.MOBILE_HERO : ASSETS.VIDEOS.HERO;
}

function getInitialVideoSrc(): HeroVideoSrc {
  if (typeof window === "undefined") {
    return ASSETS.VIDEOS.HERO;
  }

  return getHeroVideoSrc(window.matchMedia(MEDIA_QUERIES.MOBILE).matches);
}

export function BackgroundVideo({ className }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMutedRef = useRef(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState<HeroVideoSrc>(getInitialVideoSrc);

  isMutedRef.current = isMuted;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia(MEDIA_QUERIES.MOBILE);
    const updateVideoSrc = () => setVideoSrc(getHeroVideoSrc(mobileQuery.matches));

    updateVideoSrc();
    mobileQuery.addEventListener("change", updateVideoSrc);

    return () => mobileQuery.removeEventListener("change", updateVideoSrc);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    // Muted autoplay is required on Vercel and mobile browsers (iOS Safari, Chrome)
    video.muted = true;
    isMutedRef.current = true;
    setIsMuted(true);

    void video.play().catch(() => {
      // Retry once after a tick — helps some mobile browsers after source swap
      window.setTimeout(() => {
        video.muted = true;
        void video.play();
      }, 100);
    });
  }, [prefersReducedMotion, videoSrc]);

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
        key={videoSrc}
        ref={videoRef}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        poster={ASSETS.IMAGES.HERO_POSTER}
        aria-hidden
      >
        <source src={videoSrc} type="video/mp4" />
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
