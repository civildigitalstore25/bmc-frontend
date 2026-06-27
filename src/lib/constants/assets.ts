export const ASSETS = {
  IMAGES: {
    LOGO: "/images/logo.png",
    FAVICON: "/images/logo.png",
    HERO_POSTER: "/images/hero-poster.jpg",
  },
  VIDEOS: {
    HERO: "/videos/hero.mp4",
    MOBILE_HERO: "/videos/mobile-hero.mp4",
  },
} as const;

export type HeroVideoSrc = (typeof ASSETS.VIDEOS)[keyof typeof ASSETS.VIDEOS];
