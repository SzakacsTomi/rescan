interface ContactEmailProps {
  sector: string;
  name: string;
  email: string;
  company: string;
  role?: string;
  scale: string;
  decision: string;
  incomplete: string;
  timing: string;
  additionalContext?: string;
}

export function contactNotificationHtml({
  sector,
  name,
  email,
  company,
  role,
  scale,
  decision,
  incomplete,
  timing,
  additionalContext,
}: ContactEmailProps): string {
  const escapeHtml = (str: string) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const rows = [
    { label: "Sector", value: sector },
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Company", value: company },
    ...(role ? [{ label: "Role", value: role }] : []),
    { label: "Scale", value: scale },
    { label: "Timing", value: timing },
  ];

  // The two qualification questions are the point of the form — they get their own
  // blocks rather than being squeezed into the details table.
  const answers = [
    { label: "What project or decision will the information support?", value: decision },
    { label: "What happens if the information is incomplete?", value: incomplete },
    ...(additionalContext ? [{ label: "Additional context", value: additionalContext }] : []),
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New enquiry from ${escapeHtml(name)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f2f7;font-family:'Montserrat',Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#141E3D;padding:32px 40px;text-align:center;">
              <img
                src="https://rescan-eta.vercel.app/assets/logo.png"
                alt="Rescan"
                width="120"
                style="display:inline-block;height:auto;"
              />
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:32px 40px 16px;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#141E3D;line-height:1.3;">
                New enquiry
              </h1>
              <p style="margin:8px 0 0;font-size:14px;color:#141E3D;opacity:0.6;line-height:1.5;">
                A new message was submitted via the contact form.
              </p>
            </td>
          </tr>

          <!-- Details table -->
          <tr>
            <td style="padding:8px 40px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #E5EAF5;">
                ${rows
                  .map(
                    ({ label, value }) => `
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #E5EAF5;width:130px;vertical-align:top;">
                    <span style="font-size:12px;font-weight:600;color:#141E3D;opacity:0.5;text-transform:uppercase;letter-spacing:0.5px;">${escapeHtml(label)}</span>
                  </td>
                  <td style="padding:12px 0 12px 16px;border-bottom:1px solid #E5EAF5;vertical-align:top;">
                    <span style="font-size:14px;color:#141E3D;line-height:1.5;">${
                      label === "Email"
                        ? `<a href="mailto:${escapeHtml(value)}" style="color:#2B63BB;text-decoration:none;">${escapeHtml(value)}</a>`
                        : escapeHtml(value)
                    }</span>
                  </td>
                </tr>`,
                  )
                  .join("")}
              </table>
            </td>
          </tr>

          <!-- Qualification answers -->
          ${answers
            .map(
              ({ label, value }) => `
          <tr>
            <td style="padding:0 40px 24px;">
              <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#141E3D;opacity:0.5;text-transform:uppercase;letter-spacing:0.5px;">
                ${escapeHtml(label)}
              </p>
              <div style="background-color:#f7f8fb;border-radius:6px;padding:20px;font-size:14px;color:#141E3D;line-height:1.6;white-space:pre-wrap;">${escapeHtml(value)}</div>
            </td>
          </tr>`,
            )
            .join("")}

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background-color:#2B63BB;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 32px;border-radius:6px;">
                Reply to ${escapeHtml(name)}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f7f8fb;padding:24px 40px;text-align:center;border-top:1px solid #E5EAF5;">
              <p style="margin:0;font-size:12px;color:#141E3D;opacity:0.4;line-height:1.6;">
                Rescan &mdash; building information for retail chains and logistics warehouses
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
