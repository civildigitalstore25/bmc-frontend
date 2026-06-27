import { BackgroundVideo } from "@/components/coming-soon/BackgroundVideo";
import { SocialLinks } from "@/components/common/SocialLinks";
import { COMING_SOON } from "@/lib/constants/content";
import { cn } from "@/lib/utils/cn";

interface ComingSoonHeroProps {
  siteName: string;
}

export function ComingSoonHero({ siteName }: ComingSoonHeroProps) {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-primary">
      <BackgroundVideo />

      <div
        className={cn(
          "absolute inset-0",
        )}
        aria-hidden
      />

      <div className="relative z-10 flex h-dvh w-full flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
        <div className="flex w-full max-w-lg translate-y-30 flex-col items-center gap-4 sm:max-w-2xl sm:gap-8 md:translate-y-55">
          <div className="w-full space-y-2 px-1 text-center sm:space-y-4 sm:px-0">
            <h1 className="text-balance text-lg font-bold uppercase tracking-wide text-secondary sm:text-4xl sm:tracking-[0.15em] md:text-5xl md:tracking-[0.2em] lg:text-6xl">
              {COMING_SOON.HEADLINE}
            </h1>
            <p className="text-balance text-sm font-semibold leading-snug text-primary-blue sm:text-xl md:text-2xl">
              {siteName}
            </p>
            <p className="mx-auto max-w-xs text-balance text-xs leading-relaxed text-primary-blue/90 sm:max-w-lg sm:text-base md:text-lg">
              {COMING_SOON.SUBTITLE}
            </p>
          </div>

          <SocialLinks className="hidden md:flex mb-10" />
        </div>
      </div>

      <SocialLinks
        className="absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-20 flex md:hidden"
      />
    </main>
  );
}
