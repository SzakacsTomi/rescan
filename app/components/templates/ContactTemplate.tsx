import { ContactHero } from '@/app/components/organisms/contact/ContactHero';
import { ContactDetails } from '@/app/components/organisms/contact/ContactDetails';
import { ContactForm } from '@/app/components/organisms/contact/ContactForm';
import type { FormTranslations } from '@/app/components/organisms/contact/contactSchema';

type ContactTemplateProps = {
  translations: {
    details: {
      headline: string;
      intro: string;
      emailLabel: string;
      email: string;
      locationLabel: string;
      location: string;
      responseLabel: string;
      response: string;
    };
    form: FormTranslations;
  };
};

export const ContactTemplate = ({ translations: tr }: ContactTemplateProps) => {
  return (
    <>
      <ContactHero />

      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-20">
            <ContactDetails
              headline={tr.details.headline}
              intro={tr.details.intro}
              emailLabel={tr.details.emailLabel}
              email={tr.details.email}
              locationLabel={tr.details.locationLabel}
              location={tr.details.location}
              responseLabel={tr.details.responseLabel}
              response={tr.details.response}
            />
            <ContactForm t={tr.form} />
          </div>
        </div>
      </section>
    </>
  );
};
