"use client";

import { useActionState, useId, useRef, useState, type ReactNode } from "react";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { motion } from "framer-motion";
import { CheckCircle, ChevronDown } from "lucide-react";

import { submitContact, type ContactFormState } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

import type { ContactGroup } from "./contactGroups";
import {
  SECTOR_OPTIONS,
  TIMING_OPTIONS,
  type FormTranslations,
  validateContactForm,
} from "./contactSchema";
import { FieldError } from "./FieldError";
import { FieldGroup } from "./FieldGroup";
import { FormField } from "./FormField";
import { errorInputClass, inputClass, labelClass } from "./formStyles";
import { SubmitButton } from "./SubmitButton";

const INITIAL_STATE: ContactFormState = { status: "idle" };

const selectClass = cn(inputClass, "appearance-none cursor-pointer pr-10");

type ContactFormProps = {
  t: FormTranslations;
  /** The five groups in the brief's order, labels already resolved. */
  groups: ContactGroup[];
  /** The sticky index + best-fit column. Owned by the form so it disappears on success. */
  rail?: ReactNode;
};

export const ContactForm = ({ t, groups, rail }: ContactFormProps) => {
  const [state, formAction] = useActionState(submitContact, INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [focusedSelect, setFocusedSelect] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const [identity, property, decision, risk, timing] = groups;

  const ids = {
    sector: useId(),
    name: useId(),
    email: useId(),
    company: useId(),
    role: useId(),
    scale: useId(),
    decision: useId(),
    incomplete: useId(),
    timing: useId(),
    additionalContext: useId(),
    consent: useId(),
  };

  const errorFor = (field: string) =>
    fieldErrors[field]
      ? fieldErrors[field] === "invalidEmail"
        ? t.invalidEmail
        : t.required
      : undefined;

  const clearError = (field: string) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const inputFor = (field: string) => (fieldErrors[field] ? errorInputClass : inputClass);

  const serverErrorMessage =
    state.errorKey === "required"
      ? t.required
      : state.errorKey === "invalidEmail"
        ? t.invalidEmail
        : state.errorKey === "consent"
          ? t.consentRequired
          : state.errorKey === "captcha"
            ? t.captchaError
            : t.errorMessage;

  if (state.status === "success") {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-muted/30 p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-7 w-7 text-primary" />
        </div>
        <div>
          <p className="mb-1 text-lg font-semibold">{t.successTitle}</p>
          <p className="text-sm text-muted-foreground">{t.successMessage}</p>
        </div>
      </div>
    );
  }

  const renderSelect = (
    field: "sector" | "timing",
    placeholder: string,
    options: readonly string[],
    labels: Record<string, string>,
  ) => (
    <div className="relative">
      <select
        id={ids[field]}
        name={field}
        defaultValue=""
        className={cn(selectClass, fieldErrors[field] && "border-destructive")}
        onFocus={() => setFocusedSelect(field)}
        onBlur={() => setFocusedSelect(null)}
        onChange={() => clearError(field)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {labels[option]}
          </option>
        ))}
      </select>
      <motion.div
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
        animate={{ rotate: focusedSelect === field ? 180 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </div>
  );

  // The rail width is set by the fit card inside it: 18rem less its padding and index gutter
  // leaves a 208px measure, which is where the brief's longest item stops breaking into
  // stranded words in either locale.
  return (
    <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-x-20 lg:gap-y-0">
      {rail}

      <form
        action={formAction}
        onSubmit={(e) => {
          const fd = new FormData(e.currentTarget);
          const errs = validateContactForm(fd) ?? {};
          if (fd.get("consent") !== "on") errs.consent = "required";
          if (Object.keys(errs).length > 0) {
            e.preventDefault();
            setFieldErrors(errs);
          } else {
            setFieldErrors({});
          }
        }}
        className="flex flex-col gap-12"
        noValidate
      >
        <FieldGroup {...identity}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField id={ids.name} label={t.name} required error={errorFor("name")}>
              <input
                id={ids.name}
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t.namePlaceholder}
                className={inputFor("name")}
                onChange={() => clearError("name")}
              />
            </FormField>
            <FormField id={ids.email} label={t.email} required error={errorFor("email")}>
              <input
                id={ids.email}
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t.emailPlaceholder}
                className={inputFor("email")}
                onChange={() => clearError("email")}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField id={ids.company} label={t.company} required error={errorFor("company")}>
              <input
                id={ids.company}
                name="company"
                type="text"
                autoComplete="organization"
                placeholder={t.companyPlaceholder}
                className={inputFor("company")}
                onChange={() => clearError("company")}
              />
            </FormField>
            <FormField id={ids.role} label={t.role} required error={errorFor("role")}>
              <input
                id={ids.role}
                name="role"
                type="text"
                autoComplete="organization-title"
                placeholder={t.rolePlaceholder}
                className={inputFor("role")}
                onChange={() => clearError("role")}
              />
            </FormField>
          </div>
        </FieldGroup>

        <FieldGroup {...property}>
          <FormField id={ids.sector} label={t.sector} required error={errorFor("sector")}>
            {renderSelect("sector", t.sectorPlaceholder, SECTOR_OPTIONS, t.sectorOptions)}
          </FormField>

          <FormField
            id={ids.scale}
            label={t.scale}
            required
            help={t.scaleHelp}
            error={errorFor("scale")}
          >
            <input
              id={ids.scale}
              name="scale"
              type="text"
              placeholder={t.scalePlaceholder}
              className={inputFor("scale")}
              onChange={() => clearError("scale")}
            />
          </FormField>
        </FieldGroup>

        <FieldGroup {...decision}>
          <FormField
            id={ids.decision}
            label={t.decision}
            required
            help={t.decisionHelp}
            error={errorFor("decision")}
          >
            <textarea
              id={ids.decision}
              name="decision"
              rows={4}
              placeholder={t.decisionPlaceholder}
              className={cn(inputFor("decision"), "resize-none")}
              onChange={() => clearError("decision")}
            />
          </FormField>
        </FieldGroup>

        <FieldGroup {...risk}>
          <FormField
            id={ids.incomplete}
            label={t.incomplete}
            required
            help={t.incompleteHelp}
            error={errorFor("incomplete")}
          >
            <textarea
              id={ids.incomplete}
              name="incomplete"
              rows={4}
              placeholder={t.incompletePlaceholder}
              className={cn(inputFor("incomplete"), "resize-none")}
              onChange={() => clearError("incomplete")}
            />
          </FormField>
        </FieldGroup>

        <FieldGroup {...timing}>
          <FormField id={ids.timing} label={t.timing} required error={errorFor("timing")}>
            {renderSelect("timing", t.timingPlaceholder, TIMING_OPTIONS, t.timingOptions)}
          </FormField>

          <FormField id={ids.additionalContext} label={t.additionalContext}>
            <textarea
              id={ids.additionalContext}
              name="additionalContext"
              rows={3}
              placeholder={t.additionalContextPlaceholder}
              className={cn(inputClass, "resize-none")}
            />
          </FormField>
        </FieldGroup>

        {/* Unnumbered: sending is not one of the brief's five questions. */}
        <div className="flex flex-col gap-5 border-t border-border pt-8">
          <div className="flex items-start gap-3">
            <input
              id={ids.consent}
              name="consent"
              type="checkbox"
              className="mt-1 h-4 w-4 cursor-pointer rounded border-border accent-primary"
              onChange={() => clearError("consent")}
            />
            <label
              htmlFor={ids.consent}
              className={cn(labelClass, "mb-0 cursor-pointer py-1 font-normal text-muted-foreground")}
            >
              {t.consentBefore}
              <a
                href="/pdfs/privacy-policy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-foreground underline transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t.consentLinkText}
              </a>
              {t.consentAfter}
            </label>
          </div>
          <FieldError msg={fieldErrors.consent ? t.consentRequired : undefined} />

          {siteKey && (
            <Turnstile
              ref={turnstileRef}
              siteKey={siteKey}
              options={{ theme: "light", size: "flexible" }}
              onError={() => turnstileRef.current?.reset()}
            />
          )}

          {state.status === "error" && (
            <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {serverErrorMessage}
            </p>
          )}

          <SubmitButton label={t.submit} submittingLabel={t.submitting} />
        </div>
      </form>
    </div>
  );
};
