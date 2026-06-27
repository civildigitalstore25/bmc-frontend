import { ComingSoonHero } from "@/components/coming-soon/ComingSoonHero";
import { COMING_SOON, SITE } from "@/lib/constants/content";

export const metadata = {
  title: COMING_SOON.PAGE_TITLE,
  description: COMING_SOON.SUBTITLE,
};

export default function HomePage() {
  return <ComingSoonHero siteName={SITE.NAME} />;
}
