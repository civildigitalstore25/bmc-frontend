"use client";

import { BackgroundVideo } from "@/components/coming-soon/BackgroundVideo";
import { COMING_SOON } from "@/lib/constants/content";
import { cn } from "@/lib/utils/cn";
interface ComingSoonHeroProps {
  siteName: string;
}

export function ComingSoonHero({ siteName }: ComingSoonHeroProps) {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <BackgroundVideo />

      <div
        className={cn(
          "absolute inset-0",
        )}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 py-16 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-8">
          

          <div className="space-y-4 mt-90">
            <h1 className="text-4xl font-bold uppercase tracking-[0.2em] text-secondary sm:text-5xl md:text-6xl">
              {COMING_SOON.HEADLINE}
            </h1>
            <p className="text-xl font-semibold text-primary-blue sm:text-2xl">
              {siteName}
            </p>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-primary-blue/90 sm:text-lg">
              {COMING_SOON.SUBTITLE}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
