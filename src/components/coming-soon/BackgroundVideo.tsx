"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ASSETS } from "@/lib/constants/assets";
import { COMING_SOON } from "@/lib/constants/content";
import { MEDIA_QUERIES } from "@/lib/constants/media";
import { cn } from "@/lib/utils/cn";

interface BackgroundVideoProps {
  className?: string;
}

function playMutedVideo(video: HTMLVideoElement) {
  video.muted = true;

  void video.play().catch(() => {
    window.setTimeout(() => {
      video.muted = true;
      void video.play();
    }, 100);
  });
}

export function BackgroundVideo({ className }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMutedRef = useRef(true);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  isMutedRef.current = isMuted;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    setIsMuted(true);
    playMutedVideo(video);
  }, [isMounted, prefersReducedMotion]);

  useEffect(() => {
    if (!isMounted) return;

    const mobileQuery = window.matchMedia(MEDIA_QUERIES.MOBILE);
    const handleViewportChange = () => {
      const video = videoRef.current;
      if (!video || prefersReducedMotion) return;

      video.load();
      video.muted = isMutedRef.current;
      void video.play().catch(() => playMutedVideo(video));
    };

    mobileQuery.addEventListener("change", handleViewportChange);

    return () => mobileQuery.removeEventListener("change", handleViewportChange);
  }, [isMounted, prefersReducedMotion]);

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

  if (!isMounted || prefersReducedMotion) {
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
        preload="auto"
        poster={ASSETS.IMAGES.HERO_POSTER}
        aria-hidden
      >
        <source
          src={ASSETS.VIDEOS.MOBILE_HERO}
          media={MEDIA_QUERIES.MOBILE}
          type="video/mp4"
        />
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
