import { MonoLabel } from '@/app/components/atoms/MonoLabel';
import { MapPlate } from '@/app/components/molecules/MapPlate';
import { SplitMediaHero } from '@/app/components/organisms/SplitMediaHero';
import { ContactFitCard } from '@/app/components/organisms/contact/ContactFitCard';
import { ContactForm } from '@/app/components/organisms/contact/ContactForm';
import { ContactRail } from '@/app/components/organisms/contact/ContactRail';
import { MAPS_LINK_URL, OfficeMap } from '@/app/components/organisms/contact/OfficeMap';
import type { ContactGroup } from '@/app/components/organisms/contact/contactGroups';
import type { FormTranslations } from '@/app/components/organisms/contact/contactSchema';

type ContactTemplateProps = {
  translations: {
    hero: { eyebrow: string; headline: string; subheadline: string };
    details: {
      emailLabel: string;
      email: string;
      locationLabel: string;
      location: string;
      responseLabel: string;
      response: string;
    };
    map: {
      title: string;
      locationLabel: string;
      address: string;
      coordinatesLabel: string;
      coordinates: string;
      openInMaps: string;
    };
    bestFit: { headline: string; items: string[]; disqualifiers: string[] };
    rail: { label: string };
    form: FormTranslations;
    groups: ContactGroup[];
  };
};

export const ContactTemplate = ({ translations: tr }: ContactTemplateProps) => {
  return (
    <>
      <SplitMediaHero
        eyebrow={tr.hero.eyebrow}
        headline={tr.hero.headline}
        subheadline={tr.hero.subheadline}
        meta={[
          {
            label: tr.details.emailLabel,
            value: tr.details.email,
            href: `mailto:${tr.details.email}`,
          },
          { label: tr.details.locationLabel, value: tr.details.location },
          { label: tr.details.responseLabel, value: tr.details.response },
        ]}
        media={
          <OfficeMap title={tr.map.title} className="h-full w-full">
            <MapPlate
              locationLabel={tr.map.locationLabel}
              address={tr.map.address}
              coordinatesLabel={tr.map.coordinatesLabel}
              coordinates={tr.map.coordinates}
              openInMaps={tr.map.openInMaps}
              href={MAPS_LINK_URL}
            />
          </OfficeMap>
        }
      />

      <section className="bg-background px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <ContactForm
            t={tr.form}
            groups={tr.groups}
            rail={
              // No `max-h` and no inner `overflow-y-auto`: capping the rail put a scrollbar
              // down the middle of the page whenever the viewport was a little short. The rail
              // is kept short enough to sit inside a laptop viewport instead, and `top-20`
              // clears the 4rem navbar with air to spare.
              <aside className="lg:sticky lg:top-20 lg:self-start">
                <MonoLabel as="h2" className="mb-6 tracking-[0.2em]">
                  {tr.form.headline}
                </MonoLabel>
                <ContactRail items={tr.groups} ariaLabel={tr.rail.label} />
                <ContactFitCard
                  headline={tr.bestFit.headline}
                  items={tr.bestFit.items}
                  disqualifiers={tr.bestFit.disqualifiers}
                />
              </aside>
            }
          />
        </div>
      </section>
    </>
  );
};
