import Image from "next/image";

import { ASSETS } from "@/lib/constants/assets";
import { SOCIAL, SOCIAL_LINKS } from "@/lib/constants/social";
import { cn } from "@/lib/utils/cn";

const socialItems = [
  {
    key: "instagram",
    href: SOCIAL_LINKS.INSTAGRAM.url,
    label: SOCIAL_LINKS.INSTAGRAM.label,
    icon: ASSETS.IMAGES.INSTAGRAM,
  },
  {
    key: "facebook",
    href: SOCIAL_LINKS.FACEBOOK.url,
    label: SOCIAL_LINKS.FACEBOOK.label,
    icon: ASSETS.IMAGES.FACEBOOK,
  },
] as const;

interface SocialLinksProps {
  className?: string;
  variant?: "default" | "overlay";
}

export function SocialLinks({ className, variant = "default" }: SocialLinksProps) {
  const isOverlay = variant === "overlay";

  return (
    <nav
      aria-label={SOCIAL.FOLLOW_US}
      className={cn("flex flex-col items-center gap-3 sm:gap-4", className)}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm",
          isOverlay
            ? "text-white drop-shadow-md"
            : "text-primary-blue/80",
        )}
      >
        {SOCIAL.FOLLOW_US}
      </p>

      <ul className="flex items-center gap-3 sm:gap-4">
        {socialItems.map(({ key, href, label, icon }) => (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                "group inline-flex size-11 items-center justify-center rounded-full",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
                "sm:size-12",
                isOverlay
                  ? "border border-white/30 bg-white/90 shadow-lg backdrop-blur-sm hover:border-secondary hover:bg-secondary"
                  : "border border-primary-blue/20 bg-white/90 shadow-sm hover:border-secondary hover:bg-secondary hover:shadow-md",
              )}
            >
              <Image
                src={icon}
                alt=""
                width={24}
                height={24}
                className="size-5 transition-all duration-200 group-hover:brightness-0 group-hover:invert sm:size-6"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
