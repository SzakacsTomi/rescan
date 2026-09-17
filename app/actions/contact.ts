"use server";

import { after } from "next/server";
import { getLocale, getTranslations } from "next-intl/server";
import { Resend } from "resend";

import {
  CONTACT_FIELDS,
  contactSchema,
  type TimingOption,
} from "@/app/components/organisms/contact/contactSchema";
import {
  contactNotificationHtml,
  contactNotificationSubject,
  contactNotificationText,
  type ContactLabels,
} from "@/app/emails/contact-notification";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import type { SectorOption } from "@/lib/contact";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errorKey?: "required" | "invalidEmail" | "generic" | "captcha" | "consent";
};

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** The notification is one English document whatever locale the enquiry arrived in — see
 *  `app/emails/contact-notification.ts`. It reads the reference catalogue, so the questions
 *  it prints are the questions the form asked. */
const NOTIFICATION_LOCALE = routing.defaultLocale;

const resolveLabels = async (
  sector: SectorOption,
  timing: TimingOption,
): Promise<ContactLabels> => {
  const t = await getTranslations({ locale: NOTIFICATION_LOCALE, namespace: "contactPage" });

  return {
    steps: {
      identity: t("steps.identity"),
      property: t("steps.property"),
      decision: t("steps.decision"),
      risk: t("steps.risk"),
      timing: t("steps.timing"),
    },
    questions: {
      scale: t("form.scale"),
      decision: t("form.decision"),
      incomplete: t("form.incomplete"),
      additionalContext: t("form.additionalContext"),
    },
    sector: t(`form.sectorOptions.${sector}`),
    timing: t(`form.timingOptions.${timing}`),
  };
};

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  if (formData.get("consent") !== "on") {
    return { status: "error", errorKey: "consent" };
  }

  const read = (field: string) => (formData.get(field) as string | null)?.trim() ?? "";

  // Never trust the client-side pass: the same schema runs again here.
  const parsed = contactSchema.safeParse(
    Object.fromEntries(CONTACT_FIELDS.map((field) => [field, read(field)])),
  );
  if (!parsed.success) {
    const hasEmailIssue = parsed.error.issues.some((issue) => issue.message === "invalidEmail");
    return { status: "error", errorKey: hasEmailIssue ? "invalidEmail" : "required" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  // A server action is a public POST endpoint that no session sits in front of, so
  // Turnstile is the only thing between a bot and the mail relay. Treating a missing
  // secret as "skip the challenge" would turn a half-configured deploy into an open
  // relay, so once sending is live the challenge is mandatory.
  if (apiKey && !turnstileSecret) {
    console.error("TURNSTILE_SECRET_KEY is not set — refusing to send unverified mail.");
    return { status: "error", errorKey: "generic" };
  }

  if (turnstileSecret) {
    const turnstileToken = formData.get("cf-turnstile-response") as string | null;
    if (!turnstileToken) {
      return { status: "error", errorKey: "captcha" };
    }
    const verifyRes = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: turnstileSecret, response: turnstileToken }),
    });
    // fetch resolves on 4xx/5xx, so reading the body straight through would read
    // Cloudflare being down as a visitor failing the challenge and blame the visitor.
    if (!verifyRes.ok) {
      console.error(`Turnstile verification unavailable: ${verifyRes.status}`);
      return { status: "error", errorKey: "generic" };
    }
    const verifyData = (await verifyRes.json()) as { success?: boolean };
    if (!verifyData.success) {
      return { status: "error", errorKey: "captcha" };
    }
  }

  // The optional fields sit outside the schema, so they are read straight from the form.
  const enquiry = {
    ...parsed.data,
    role: read("role") || undefined,
    scale: read("scale") || undefined,
    incomplete: read("incomplete") || undefined,
    additionalContext: read("additionalContext") || undefined,
  };

  if (!apiKey) {
    // The visitor's confirmation does not depend on this line reaching the log, and a log
    // pipe that is slow to drain would otherwise hold the response open behind it.
    after(() => console.warn("RESEND_API_KEY is not set — skipping email send."));
    return { status: "success" };
  }

  try {
    const notification = {
      enquiry,
      labels: await resolveLabels(enquiry.sector, enquiry.timing),
      // Which form the enquiry came through, so the reply is written in that language.
      locale: await getLocale(),
    };

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Rescan Contact Form <noreply@mail.rescan.se>",
      to: [siteConfig.email],
      replyTo: enquiry.email,
      subject: contactNotificationSubject(notification),
      html: contactNotificationHtml(notification),
      // A notification with no text part scores as spam with some filters.
      text: contactNotificationText(notification),
    });

    return { status: "success" };
  } catch (err) {
    console.error("Resend error:", err);
    return { status: "error", errorKey: "generic" };
  }
}
