import { z } from 'zod';

export type FormTranslations = {
  headline: string;
  name: string;
  namePlaceholder: string;
  company: string;
  companyPlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  service: string;
  servicePlaceholder: string;
  serviceOptions: {
    commercial: string;
    industrial: string;
    modelling: string;
    other: string;
  };
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
  errorMessage: string;
  required: string;
  invalidEmail: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactSchema = z.object({
  name: z.string().min(1, 'required'),
  company: z.string().min(1, 'required'),
  email: z
    .string()
    .min(1, 'required')
    .refine((v) => emailRegex.test(v), 'invalidEmail'),
  message: z.string().min(1, 'required'),
});

export function validateContactForm(fd: FormData): Record<string, string> | null {
  const result = contactSchema.safeParse({
    name: fd.get('name'),
    company: fd.get('company'),
    email: fd.get('email'),
    message: fd.get('message'),
  });
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
