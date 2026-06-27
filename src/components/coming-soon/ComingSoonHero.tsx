"use client";

import { BackgroundVideo } from "@/components/coming-soon/BackgroundVideo";
import { COMING_SOON } from "@/lib/constants/content";
import { cn } from "@/lib/utils/cn";

interface ComingSoonHeroProps {
  siteName: string;
}

export function ComingSoonHero({ siteName }: ComingSoonHeroProps) {
  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden">
      <BackgroundVideo />

      <div
        className={cn(
          "absolute inset-0",
        )}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-dvh w-full flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
        <div className="flex w-full max-w-lg flex-col items-center gap-5 sm:max-w-2xl sm:gap-8">

          <div className="w-full space-y-3 px-1 sm:space-y-4 mt-55 sm:px-0 md:mt-85 text-center">
            <h1 className="text-balance text-2xl font-bold uppercase tracking-wide text-secondary sm:text-4xl sm:tracking-[0.15em] md:text-5xl md:tracking-[0.2em] lg:text-6xl">
              {COMING_SOON.HEADLINE}
            </h1>
            <p className="text-balance text-base font-semibold leading-snug text-primary-blue sm:text-xl md:text-2xl">
              {siteName}
            </p>
            <p className="mx-auto max-w-md text-balance text-sm leading-relaxed text-primary-blue/90 sm:max-w-lg sm:text-base md:text-lg">
              {COMING_SOON.SUBTITLE}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
