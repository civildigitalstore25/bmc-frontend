import { SOCIAL, SOCIAL_LINKS } from "@/lib/constants/social";
import { cn } from "@/lib/utils/cn";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M14 8.5V6.75c0-.69.56-1.25 1.25-1.25H17V3h-2.5C12.02 3 10 5.02 10 7.5V8.5H7v3h3V21h4v-9.5h2.75L17 8.5h-3z" />
    </svg>
  );
}

const socialItems = [
  {
    key: "instagram",
    href: SOCIAL_LINKS.INSTAGRAM.url,
    label: SOCIAL_LINKS.INSTAGRAM.label,
    Icon: InstagramIcon,
  },
  {
    key: "facebook",
    href: SOCIAL_LINKS.FACEBOOK.url,
    label: SOCIAL_LINKS.FACEBOOK.label,
    Icon: FacebookIcon,
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
        {socialItems.map(({ key, href, label, Icon }) => (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
                "sm:size-12",
                isOverlay
                  ? "border border-white/30 bg-white/90 text-primary-blue shadow-lg backdrop-blur-sm hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
                  : "border border-primary-blue/20 bg-white/90 text-primary-blue shadow-sm hover:border-secondary hover:bg-secondary hover:text-secondary-foreground hover:shadow-md",
              )}
            >
              <Icon className="size-5 sm:size-6" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
