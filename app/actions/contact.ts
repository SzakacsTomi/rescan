'use server';

import { Resend } from 'resend';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  errorKey?: 'required' | 'invalidEmail' | 'generic';
};

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = (formData.get('name') as string | null)?.trim() ?? '';
  const company = (formData.get('company') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const phone = (formData.get('phone') as string | null)?.trim() ?? '';
  const service = (formData.get('service') as string | null)?.trim() ?? '';
  const message = (formData.get('message') as string | null)?.trim() ?? '';

  if (!name || !company || !email || !message) {
    return { status: 'error', errorKey: 'required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: 'error', errorKey: 'invalidEmail' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not set — skipping email send.');
    return { status: 'success' };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Rescan Contact Form <noreply@rescan.se>',
      to: ['hello@rescan.se'],
      replyTo: email,
      subject: `New enquiry from ${name} — ${company}`,
      text: [
        `Name: ${name}`,
        `Company: ${company}`,
        `Email: ${email}`,
        `Phone: ${phone || 'N/A'}`,
        `Service: ${service || 'N/A'}`,
        '',
        message,
      ].join('\n'),
    });

    return { status: 'success' };
  } catch (err) {
    console.error('Resend error:', err);
    return { status: 'error', errorKey: 'generic' };
  }
}
