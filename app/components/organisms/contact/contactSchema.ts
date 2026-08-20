import { z } from 'zod';

/**
 * Fields come from the Contact brief, with two deliberate deviations:
 * the brief's list has no Name and no Email (an enquiry with no reply address cannot be
 * answered, so both are kept), and the old Phone field is gone because the brief asks to
 * avoid anything not needed for the first conversation.
 *
 * `role` is deliberately not in the schema: the current brief recommends it optional, so it
 * is collected separately in the action instead of being validated here.
 */

export const SECTOR_OPTIONS = ['retail', 'logistics'] as const;
export const TIMING_OPTIONS = ['within1Month', 'oneToThree', 'threeToSix', 'later'] as const;

export type SectorOption = (typeof SECTOR_OPTIONS)[number];
export type TimingOption = (typeof TIMING_OPTIONS)[number];

export type FormTranslations = {
  headline: string;
  sector: string;
  sectorPlaceholder: string;
  sectorOptions: Record<SectorOption, string>;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  company: string;
  companyPlaceholder: string;
  role: string;
  rolePlaceholder: string;
  scale: string;
  scalePlaceholder: string;
  scaleHelp: string;
  decision: string;
  decisionPlaceholder: string;
  decisionHelp: string;
  incomplete: string;
  incompletePlaceholder: string;
  incompleteHelp: string;
  timing: string;
  timingPlaceholder: string;
  timingOptions: Record<TimingOption, string>;
  additionalContext: string;
  additionalContextPlaceholder: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
  errorMessage: string;
  required: string;
  invalidEmail: string;
  consentBefore: string;
  consentLinkText: string;
  consentAfter: string;
  consentRequired: string;
  captchaError: string;
};

const requiredText = z.string().min(1, 'required');

export const contactSchema = z.object({
  sector: requiredText,
  name: requiredText,
  // `min(1)` first, so a blank field reports `required` rather than `invalidEmail`.
  email: requiredText.pipe(z.email('invalidEmail')),
  company: requiredText,
  scale: requiredText,
  decision: requiredText,
  incomplete: requiredText,
  timing: requiredText,
});

/** Field order matters: it decides which error the user is scrolled to first. */
export const CONTACT_FIELDS = [
  'sector',
  'name',
  'email',
  'company',
  'role',
  'scale',
  'decision',
  'incomplete',
  'timing',
] as const;

export function validateContactForm(fd: FormData): Record<string, string> | null {
  const result = contactSchema.safeParse(
    Object.fromEntries(CONTACT_FIELDS.map((field) => [field, fd.get(field)])),
  );
  if (!result.success) {
    const errs: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0]);
      if (!errs[field]) errs[field] = issue.message;
    }
    return errs;
  }
  return null;
}
