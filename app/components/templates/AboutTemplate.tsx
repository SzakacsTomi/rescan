import { AboutFocus } from '@/app/components/organisms/about/AboutFocus';
import { AboutHero, type AboutHeroFact } from '@/app/components/organisms/about/AboutHero';
import { AboutPeople } from '@/app/components/organisms/about/AboutPeople';
import { AboutPresence, type AboutPresenceItem } from '@/app/components/organisms/about/AboutPresence';
import { FinalCTA } from '@/app/components/organisms/sector/FinalCTA';

type AboutTemplateProps = {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    facts: AboutHeroFact[];
    image: string;
  };
  focus: {
    headline: string;
    body: string;
    narrow: string;
  };
  presence: {
    items: AboutPresenceItem[];
  };
  people: {
    headline: string;
    organization: string;
    members: string[];
  };
  cta: {
    headline: string;
    subheadline: string;
    cta: string;
  };
};

export const AboutTemplate = ({ hero, focus, presence, people, cta }: AboutTemplateProps) => {
  return (
    <>
      <AboutHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subheadline={hero.subheadline}
        facts={hero.facts}
        image={hero.image}
      />
      <AboutFocus headline={focus.headline} body={focus.body} narrow={focus.narrow} />
      <AboutPresence items={presence.items} />
      <AboutPeople
        headline={people.headline}
        organization={people.organization}
        members={people.members}
      />
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