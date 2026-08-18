import { AboutCompany } from '@/app/components/organisms/about/AboutCompany';
import { AboutFocus, type AboutFocusItem } from '@/app/components/organisms/about/AboutFocus';
import { AboutHero, type AboutHeroFact } from '@/app/components/organisms/about/AboutHero';
import { AboutPeople } from '@/app/components/organisms/about/AboutPeople';
import { FinalCTA } from '@/app/components/organisms/sector/FinalCTA';

type AboutTemplateProps = {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    facts: AboutHeroFact[];
    image: string;
  };
  company: {
    headline: string;
    lead: string;
    steps: string[];
    positioning: string;
  };
  focus: {
    items: AboutFocusItem[];
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

export const AboutTemplate = ({ hero, company, focus, people, cta }: AboutTemplateProps) => {
  return (
    <>
      <AboutHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subheadline={hero.subheadline}
        facts={hero.facts}
        image={hero.image}
      />
      <AboutCompany
        headline={company.headline}
        lead={company.lead}
        steps={company.steps}
        positioning={company.positioning}
      />
      <AboutFocus items={focus.items} />
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
        headlineClassName="leading-[1.15] tracking-[-0.03em] lg:text-[52px]"
      />
    </>
  );
};