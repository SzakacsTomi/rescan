'use client';

import { useActionState, useId, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { submitContact, type ContactFormState } from '@/app/actions/contact';
import { cn } from '@/lib/utils';
import { type FormTranslations, validateContactForm } from './contactSchema';
import { errorInputClass, inputClass, labelClass } from './formStyles';
import { FieldError } from './FieldError';
import { SubmitButton } from './SubmitButton';

const INITIAL_STATE: ContactFormState = { status: 'idle' };

export const ContactForm = ({ t }: { t: FormTranslations }) => {
  const [state, formAction] = useActionState(submitContact, INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [selectFocused, setSelectFocused] = useState(false);

  const nameId = useId();
  const companyId = useId();
  const emailId = useId();
  const phoneId = useId();
  const serviceId = useId();
  const messageId = useId();

  const getMsg = (key: string) => (key === 'invalidEmail' ? t.invalidEmail : t.required);

  const clearError = (field: string) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const serverErrorMessage =
    state.errorKey === 'required'
      ? t.required
      : state.errorKey === 'invalidEmail'
        ? t.invalidEmail
        : t.errorMessage;

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-muted/30 p-12 text-center min-h-100">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-7 w-7 text-primary" />
        </div>
        <div>
          <p className="text-lg font-semibold mb-1">{t.successTitle}</p>
          <p className="text-muted-foreground text-sm">{t.successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">{t.headline}</h2>

      <form
        action={formAction}
        onSubmit={(e) => {
          const errs = validateContactForm(new FormData(e.currentTarget));
          if (errs) {
            e.preventDefault();
            setFieldErrors(errs);
          } else {
            setFieldErrors({});
          }
        }}
        className="flex flex-col gap-5"
        noValidate
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor={nameId} className={labelClass}>
              {t.name} <span className="text-destructive">*</span>
            </label>
            <input
              id={nameId}
              name="name"
              type="text"
              autoComplete="name"
              placeholder={t.namePlaceholder}
              className={fieldErrors.name ? errorInputClass : inputClass}
              onChange={() => clearError('name')}
            />
            <FieldError msg={fieldErrors.name ? getMsg(fieldErrors.name) : undefined} />
          </div>
          <div>
            <label htmlFor={companyId} className={labelClass}>
              {t.company} <span className="text-destructive">*</span>
            </label>
            <input
              id={companyId}
              name="company"
              type="text"
              autoComplete="organization"
              placeholder={t.companyPlaceholder}
              className={fieldErrors.company ? errorInputClass : inputClass}
              onChange={() => clearError('company')}
            />
            <FieldError msg={fieldErrors.company ? getMsg(fieldErrors.company) : undefined} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor={emailId} className={labelClass}>
              {t.email} <span className="text-destructive">*</span>
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              placeholder={t.emailPlaceholder}
              className={fieldErrors.email ? errorInputClass : inputClass}
              onChange={() => clearError('email')}
            />
            <FieldError msg={fieldErrors.email ? getMsg(fieldErrors.email) : undefined} />
          </div>
          <div>
            <label htmlFor={phoneId} className={labelClass}>
              {t.phone}
            </label>
            <input
              id={phoneId}
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={t.phonePlaceholder}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor={serviceId} className={labelClass}>
            {t.service}
          </label>
          <div className="relative">
            <select
              id={serviceId}
              name="service"
              className={cn(inputClass, 'appearance-none cursor-pointer pr-10')}
              onFocus={() => setSelectFocused(true)}
              onBlur={() => setSelectFocused(false)}
            >
              <option value="">{t.servicePlaceholder}</option>
              <option value="commercial">{t.serviceOptions.commercial}</option>
              <option value="industrial">{t.serviceOptions.industrial}</option>
              <option value="modelling">{t.serviceOptions.modelling}</option>
              <option value="other">{t.serviceOptions.other}</option>
            </select>
            <motion.div
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              animate={{ rotate: selectFocused ? 180 : 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </div>
        </div>

        <div>
          <label htmlFor={messageId} className={labelClass}>
            {t.message} <span className="text-destructive">*</span>
          </label>
          <textarea
            id={messageId}
            name="message"
            rows={5}
            placeholder={t.messagePlaceholder}
            className={cn(fieldErrors.message ? errorInputClass : inputClass, 'resize-none')}
            onChange={() => clearError('message')}
          />
          <FieldError msg={fieldErrors.message ? getMsg(fieldErrors.message) : undefined} />
        </div>

        {state.status === 'error' && (
          <p className="text-sm text-destructive rounded-lg bg-destructive/10 px-4 py-3">
            {serverErrorMessage}
          </p>
        )}

        <SubmitButton label={t.submit} submittingLabel={t.submitting} />
      </form>
    </div>
  );
};
