import { AboutFocus } from '@/app/components/organisms/about/AboutFocus';
import { AboutHero } from '@/app/components/organisms/about/AboutHero';
import { AboutPresence, type AboutPresenceItem } from '@/app/components/organisms/about/AboutPresence';
import { FinalCTA } from '@/app/components/organisms/sector/FinalCTA';

type AboutTemplateProps = {
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    subheadline: string;
  };
  focus: {
    recordLabel: string;
    record: string;
    aim: string;
  };
  presence: {
    items: AboutPresenceItem[];
  };
  cta: {
    headline: string;
    subheadline: string;
    cta: string;
  };
};

export const AboutTemplate = ({ hero, focus, presence, cta }: AboutTemplateProps) => {
  return (
    <>
      <AboutHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        headlineAccent={hero.headlineAccent}
        subheadline={hero.subheadline}
      />
      <AboutFocus recordLabel={focus.recordLabel} record={focus.record} aim={focus.aim} />
      <AboutPresence items={presence.items} />
      <FinalCTA
        headline={cta.headline}
        subheadline={cta.subheadline}
        cta={cta.cta}
        ctaHref="/contact"
        headlineClassName="leading-heading tracking-tight lg:text-display-2xs"
      />
    </>
  );
};
