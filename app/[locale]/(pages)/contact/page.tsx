import { getTranslations } from 'next-intl/server';
import { ContactTemplate } from '@/app/components/templates/ContactTemplate';

export default async function ContactPage() {
  const t = await getTranslations('contactPage');

  const translations = {
    hero: {
      headline: t('hero.headline'),
      subheadline: t('hero.subheadline'),
    },
    details: {
      headline: t('details.headline'),
      intro: t('details.intro'),
      emailLabel: t('details.emailLabel'),
      email: t('details.email'),
      locationLabel: t('details.locationLabel'),
      location: t('details.location'),
      responseLabel: t('details.responseLabel'),
      response: t('details.response'),
    },
    form: {
      headline: t('form.headline'),
      name: t('form.name'),
      namePlaceholder: t('form.namePlaceholder'),
      company: t('form.company'),
      companyPlaceholder: t('form.companyPlaceholder'),
      email: t('form.email'),
      emailPlaceholder: t('form.emailPlaceholder'),
      phone: t('form.phone'),
      phonePlaceholder: t('form.phonePlaceholder'),
      service: t('form.service'),
      servicePlaceholder: t('form.servicePlaceholder'),
      serviceOptions: {
        commercial: t('form.serviceOptions.commercial'),
        industrial: t('form.serviceOptions.industrial'),
        modelling: t('form.serviceOptions.modelling'),
        other: t('form.serviceOptions.other'),
      },
      message: t('form.message'),
      messagePlaceholder: t('form.messagePlaceholder'),
      submit: t('form.submit'),
      submitting: t('form.submitting'),
      successTitle: t('form.successTitle'),
      successMessage: t('form.successMessage'),
      errorMessage: t('form.errorMessage'),
      required: t('form.required'),
      invalidEmail: t('form.invalidEmail'),
      consentBefore: t('form.consentBefore'),
      consentLinkText: t('form.consentLinkText'),
      consentAfter: t('form.consentAfter'),
      consentRequired: t('form.consentRequired'),
      captchaError: t('form.captchaError'),
    },
  };

  return <ContactTemplate translations={translations} />;
}
