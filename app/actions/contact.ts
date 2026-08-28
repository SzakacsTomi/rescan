"use server";

import { Resend } from "resend";
import { contactNotificationHtml } from "@/app/emails/contact-notification";
import { CONTACT_FIELDS, contactSchema } from "@/app/components/organisms/contact/contactSchema";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errorKey?: "required" | "invalidEmail" | "generic" | "captcha" | "consent";
};

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

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
    const hasEmailIssue = parsed.error.issues.some(
      (issue) => issue.message === "invalidEmail",
    );
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
    console.warn("RESEND_API_KEY is not set — skipping email send.");
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Rescan Contact Form <onboarding@resend.dev>",
      to: ["info@rescan.se"],
      replyTo: enquiry.email,
      subject: `New enquiry from ${enquiry.name} — ${enquiry.company}`,
      html: contactNotificationHtml(enquiry),
    });

    return { status: "success" };
  } catch (err) {
    console.error("Resend error:", err);
    return { status: "error", errorKey: "generic" };
  }
}
