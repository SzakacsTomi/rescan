"use server";

import { Resend } from "resend";
import { contactNotificationHtml } from "@/app/emails/contact-notification";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errorKey?: "required" | "invalidEmail" | "generic" | "captcha" | "consent";
};

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const company = (formData.get("company") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const service = (formData.get("service") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  const consent = formData.get("consent") as string | null;
  if (consent !== "on") {
    return { status: "error", errorKey: "consent" };
  }

  if (!name || !company || !email || !message) {
    return { status: "error", errorKey: "required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", errorKey: "invalidEmail" };
  }

  const turnstileToken = formData.get("cf-turnstile-response") as string | null;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    if (!turnstileToken) {
      return { status: "error", errorKey: "captcha" };
    }
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      },
    );
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return { status: "error", errorKey: "captcha" };
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set — skipping email send.");
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Rescan Contact Form <onboarding@resend.dev>",
      to: ["info@rescan.se"],
      replyTo: email,
      subject: `New enquiry from ${name} — ${company}`,
      html: contactNotificationHtml({
        name,
        company,
        email,
        phone: phone || undefined,
        service: service || undefined,
        message,
      }),
    });

    return { status: "success" };
  } catch (err) {
    console.error("Resend error:", err);
    return { status: "error", errorKey: "generic" };
  }
}
