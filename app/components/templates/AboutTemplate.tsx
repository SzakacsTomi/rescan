import { ScanLine, Layers, Building2 } from 'lucide-react';
import { AboutHero } from '@/app/components/organisms/about/AboutHero';
import { AboutMission } from '@/app/components/organisms/about/AboutMission';
import { AboutCapabilities } from '@/app/components/organisms/about/AboutCapabilities';
import { AboutCTA } from '@/app/components/organisms/about/AboutCTA';

type AboutTemplateProps = {
  translations: {
    hero: {
      headline: string;
      subheadline: string;
      primaryCta: string;
      secondaryCta: string;
    };
    mission: {
      headline: string;
      body: string;
    };
    capabilities: {
      headline: string;
      cap0: { title: string; description: string };
      cap1: { title: string; description: string };
      cap2: { title: string; description: string };
    };
    cta: {
      headline: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
};

const CAPABILITY_ICONS = [ScanLine, Layers, Building2] as const;

export const AboutTemplate = ({ translations: tr }: AboutTemplateProps) => {
  const capabilities = [tr.capabilities.cap0, tr.capabilities.cap1, tr.capabilities.cap2].map(
    (cap, i) => ({ ...cap, icon: CAPABILITY_ICONS[i] }),
  );

  return (
    <>
      <AboutHero
        headline={tr.hero.headline}
        subheadline={tr.hero.subheadline}
        primaryCta={{ label: tr.hero.primaryCta, href: '/projects' }}
        secondaryCta={{ label: tr.hero.secondaryCta, href: '/contact' }}
      />
      <AboutMission headline={tr.mission.headline} body={tr.mission.body} />
      <AboutCapabilities headline={tr.capabilities.headline} capabilities={capabilities} />
      <AboutCTA
        headline={tr.cta.headline}
        primaryCta={{ label: tr.cta.primaryCta, href: '/contact' }}
        secondaryCta={{ label: tr.cta.secondaryCta, href: '/projects' }}
      />
    </>
  );
};
