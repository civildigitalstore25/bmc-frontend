"use client";

import { FormEvent, useState } from "react";

import { BackgroundVideo } from "@/components/coming-soon/BackgroundVideo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ASSETS } from "@/lib/constants/assets";
import { COMING_SOON } from "@/lib/constants/content";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

interface ComingSoonHeroProps {
  siteName: string;
}

export function ComingSoonHero({ siteName }: ComingSoonHeroProps) {
  const [email, setEmail] = useState("");

  const handleNotify = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <BackgroundVideo />

      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90",
        )}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 py-16 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-8">
          <Image
            src={ASSETS.IMAGES.LOGO}
            alt={siteName}
            width={320}
            height={120}
            priority
            className="h-auto w-full max-w-xs drop-shadow-lg sm:max-w-sm md:max-w-md"
          />

          <div className="space-y-4">
            <h1 className="text-4xl font-bold uppercase tracking-[0.2em] text-secondary sm:text-5xl md:text-6xl">
              {COMING_SOON.HEADLINE}
            </h1>
            <p className="text-xl font-semibold text-primary-foreground sm:text-2xl">
              {siteName}
            </p>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
              {COMING_SOON.SUBTITLE}
            </p>
          </div>

          <form
            onSubmit={handleNotify}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            aria-label={COMING_SOON.NOTIFY_LABEL}
          >
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={COMING_SOON.NOTIFY_PLACEHOLDER}
              required
              className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60"
              aria-label={COMING_SOON.NOTIFY_PLACEHOLDER}
            />
            <Button type="submit" variant="secondary" size="lg" className="shrink-0">
              {COMING_SOON.NOTIFY_BUTTON}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
