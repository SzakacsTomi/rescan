import { getTranslations } from 'next-intl/server';

import {
  CONTACT_GROUPS,
  type ContactGroup,
} from '@/app/components/organisms/contact/contactGroups';
import {
  SECTOR_OPTIONS,
  TIMING_OPTIONS,
  type FormTranslations,
  type SectorOption,
  type TimingOption,
} from '@/app/components/organisms/contact/contactSchema';
import { ContactTemplate } from '@/app/components/templates/ContactTemplate';

export default async function ContactPage() {
  const t = await getTranslations('contactPage');

  const form: FormTranslations = {
    headline: t('form.headline'),
    sector: t('form.sector'),
    sectorPlaceholder: t('form.sectorPlaceholder'),
    sectorOptions: Object.fromEntries(
      SECTOR_OPTIONS.map((option) => [option, t(`form.sectorOptions.${option}`)]),
    ) as Record<SectorOption, string>,
    name: t('form.name'),
    namePlaceholder: t('form.namePlaceholder'),
    email: t('form.email'),
    emailPlaceholder: t('form.emailPlaceholder'),
    company: t('form.company'),
    companyPlaceholder: t('form.companyPlaceholder'),
    role: t('form.role'),
    rolePlaceholder: t('form.rolePlaceholder'),
    scale: t('form.scale'),
    scalePlaceholder: t('form.scalePlaceholder'),
    scaleHelp: t('form.scaleHelp'),
    decision: t('form.decision'),
    decisionPlaceholder: t('form.decisionPlaceholder'),
    decisionHelp: t('form.decisionHelp'),
    incomplete: t('form.incomplete'),
    incompletePlaceholder: t('form.incompletePlaceholder'),
    incompleteHelp: t('form.incompleteHelp'),
    timing: t('form.timing'),
    timingPlaceholder: t('form.timingPlaceholder'),
    timingOptions: Object.fromEntries(
      TIMING_OPTIONS.map((option) => [option, t(`form.timingOptions.${option}`)]),
    ) as Record<TimingOption, string>,
    additionalContext: t('form.additionalContext'),
    additionalContextPlaceholder: t('form.additionalContextPlaceholder'),
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
  };

  const groups: ContactGroup[] = CONTACT_GROUPS.map((group) => ({
    id: group.id,
    index: group.index,
    label: t(`steps.${group.step}`),
  }));

  return (
    <ContactTemplate
      translations={{
        hero: {
          eyebrow: t('hero.eyebrow'),
          headline: t('hero.headline'),
          subheadline: t('hero.subheadline'),
        },
        details: {
          emailLabel: t('details.emailLabel'),
          email: t('details.email'),
          locationLabel: t('details.locationLabel'),
          location: t('details.location'),
          responseLabel: t('details.responseLabel'),
          response: t('details.response'),
        },
        map: {
          title: t('map.title'),
          locationLabel: t('map.locationLabel'),
          address: t('map.address'),
          coordinatesLabel: t('map.coordinatesLabel'),
          coordinates: t('map.coordinates'),
          openInMaps: t('map.openInMaps'),
        },
        bestFit: {
          headline: t('bestFit.headline'),
          items: [t('bestFit.item0'), t('bestFit.item1'), t('bestFit.item2')],
          disqualifiers: [t('bestFit.disqualifier0'), t('bestFit.disqualifier1')],
        },
        rail: { label: t('rail.label') },
        form,
        groups,
      }}
    />
  );
}
