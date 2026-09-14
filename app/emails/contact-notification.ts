import { CONTACT_GROUPS } from "@/app/components/organisms/contact/contactGroups";
import type { TimingOption } from "@/app/components/organisms/contact/contactSchema";
import { DEEP_BLUE_GRADIENT } from "@/config/gradients";
import { siteConfig } from "@/config/site";
import type { SectorOption } from "@/lib/contact";

/**
 * The notification an enquiry raises, built to the same design as the site: a light
 * masthead over a dark navy title band, numbered bands carrying mono indices, and the
 * brand-blue CTA the page's own closing section uses.
 *
 * English whatever locale the form was filled in — one audience, the office, and one
 * document. Which language the enquiry arrived in is stated in the masthead instead, so
 * the reply can be written in the right one.
 *
 * Pure: the action resolves every label against the English catalogue and passes plain
 * strings in, the way the pages resolve translations and pass them down.
 */

/** A step of the form, so the email's bands cannot drift from the form's own groups. */
type ContactStep = (typeof CONTACT_GROUPS)[number]["step"];

export type ContactEnquiry = {
  sector: SectorOption;
  name: string;
  email: string;
  company: string;
  role?: string;
  scale?: string;
  decision: string;
  incomplete?: string;
  timing: TimingOption;
  additionalContext?: string;
};

/**
 * Every string the email prints that the form also prints. Resolved from `contactPage` in
 * the English catalogue rather than restated here, so a reworded question reaches the
 * notification and the email always reports what was actually asked.
 */
export type ContactLabels = {
  steps: Record<ContactStep, string>;
  questions: Record<"scale" | "decision" | "incomplete" | "additionalContext", string>;
  /** The chosen option, not its key. */
  sector: string;
  timing: string;
};

export type ContactNotification = {
  enquiry: ContactEnquiry;
  labels: ContactLabels;
  /** The locale of the form the enquiry came through. */
  locale: string;
  /** Injected so a rendered email is deterministic under test. */
  receivedAt?: Date;
};

/**
 * The brand palette from `app/globals.css`, as literal hex: an email client has no custom
 * properties, and Outlook cannot parse oklch. `onDark` holds the flattened equivalents of
 * the white/xx% tints the site layers over its navy, which Outlook drops entirely.
 */
const COLOR = {
  ink: "#141E3D",
  body: "#434B64",
  muted: "#536383",
  hairline: "#D8DEEA",
  paper: "#E5EAF5",
  blue: "#2B63BB",
  white: "#FFFFFF",
  onDark: {
    text: "#FFFFFF",
    soft: "#C6CEE0",
    muted: "#8A93AD",
    sky: "#89B4F5",
    hairline: "#2E3A5C",
  },
} as const;

const SANS = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const MONO = "'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

/** The site's rhythm at email scale: a 640px column cannot take the page's 120px bands,
 *  so the bands keep their proportions against a 40px inset — the design's `lg:px-10`. */
const WIDTH = 640;
const INSET = 40;
const BAND_Y = 36;

/** The faint vertical rule FinalCTA lays over the navy, at the same 88px pitch. */
const GRID_OVERLAY =
  "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 88px)";

/** The office that reads the notification — `siteConfig.address` is in Växjö. */
const RECEIVED_TIME_ZONE = "Europe/Stockholm";

/** The logo is brand-blue artwork on transparency; the site inverts it for a dark band and
 *  email has no reliable `filter`, so it stays on the white masthead. An origin that is not
 *  a real host would emit an unreachable `src`, so the wordmark stands in — and where the
 *  image does load, styled alt text covers a client that blocks images. */
const logoSrc = siteConfig.url.startsWith("https://")
  ? `${siteConfig.url}${siteConfig.logoPath}`
  : null;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Answers are typed into a textarea, so the writer's line breaks are content. Outlook
 *  ignores `white-space:pre-wrap`, so they become real breaks. */
const prose = (value: string) =>
  escapeHtml(value.trim())
    .replace(/(\r?\n){3,}/g, "\n\n")
    .replace(/\r?\n/g, "<br />");

/** Vertical space between two blocks. A table cell's margin collapses unpredictably across
 *  clients; an empty sized row does not. */
const spacer = (height: number) =>
  `<div style="height:${height}px;line-height:${height}px;font-size:0;">&nbsp;</div>`;

const monoText = (text: string, color: string, size = 10) =>
  `<span style="font-family:${MONO};font-size:${size}px;line-height:1.4;letter-spacing:0.14em;text-transform:uppercase;color:${color};">${escapeHtml(text)}</span>`;

/** An optional answer the sender left blank. Its absence is a qualification signal, so the
 *  band still renders and says so rather than disappearing. */
const NOT_ANSWERED = `<span style="display:inline-block;font-family:${MONO};font-size:10px;line-height:1;letter-spacing:0.14em;text-transform:uppercase;color:${COLOR.muted};background-color:${COLOR.paper};border:1px dashed ${COLOR.hairline};padding:7px 10px;">Not answered</span>`;

const stepIndex = (step: ContactStep) =>
  CONTACT_GROUPS.find((group) => group.step === step)?.index ?? "";

const formatReceived = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: RECEIVED_TIME_ZONE,
  }).format(date);

const languageName = (locale: string) => {
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const headline = (text: string, size: number) =>
  `<p style="margin:0;font-family:${SANS};font-size:${size}px;font-weight:600;line-height:1.25;letter-spacing:-0.02em;color:${COLOR.ink};">${escapeHtml(text)}</p>`;

const paragraph = (html: string) =>
  `<p style="margin:0;font-family:${SANS};font-size:16px;line-height:1.7;color:${COLOR.body};">${html}</p>`;

/** One numbered band. `tinted` alternates onto the light blue-grey the site alternates its
 *  sections with, so the five groups read as five sections rather than one long column. */
const band = ({
  step,
  label,
  body,
  tinted,
}: {
  step: ContactStep;
  label: string;
  body: string;
  tinted: boolean;
}) => `
        <tr>
          <td class="band" style="padding:${BAND_Y}px ${INSET}px;background-color:${tinted ? COLOR.paper : COLOR.white};border-top:1px solid ${COLOR.hairline};">
            ${monoText(`${stepIndex(step)} / ${label}`, COLOR.blue)}
            ${spacer(20)}
            ${body}
          </td>
        </tr>`;

/** A labelled answer: the form's own question, then what was written under it. */
const answer = (question: string, value: string | undefined) => `
            ${monoText(question, COLOR.muted)}
            ${spacer(12)}
            ${value ? paragraph(prose(value)) : NOT_ANSWERED}`;

const mastheadRow = (label: string, valueHtml: string) => `
              <tr>
                <td style="padding:10px 0;border-top:1px solid ${COLOR.onDark.hairline};width:96px;vertical-align:top;">
                  ${monoText(label, COLOR.onDark.muted)}
                </td>
                <td style="padding:10px 0;border-top:1px solid ${COLOR.onDark.hairline};vertical-align:top;font-family:${SANS};font-size:14px;line-height:1.5;color:${COLOR.onDark.soft};">
                  ${valueHtml}
                </td>
              </tr>`;

export const contactNotificationSubject = ({
  enquiry,
  labels,
}: Pick<ContactNotification, "enquiry" | "labels">) =>
  `New enquiry · ${enquiry.company} — ${labels.sector}, ${labels.timing}`;

export const contactNotificationHtml = ({
  enquiry,
  labels,
  locale,
  receivedAt = new Date(),
}: ContactNotification): string => {
  const { name, email, company, role, scale, decision, incomplete, additionalContext } = enquiry;

  // The address is already parsed as one, so it goes in as written — percent-encoding the
  // `@` is legal but some clients show the escape rather than the address.
  const replyHref = `mailto:${escapeHtml(email)}?subject=${encodeURIComponent(
    `Re: your enquiry to ${siteConfig.brandName}`,
  )}`;

  // The inbox preview line. The decision the information has to support is the one thing
  // worth reading before opening, so it is what the list shows.
  const preview = decision.replace(/\s+/g, " ").trim().slice(0, 160);

  const wordmark = `<span style="font-family:${SANS};font-size:19px;font-weight:700;letter-spacing:0.08em;color:${COLOR.blue};">${siteConfig.brandName}</span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light" />
  <style>
    /* The only rule not written inline: a phone cannot give the design's 40px inset to a
       353px column. A client that drops embedded CSS simply keeps the desktop inset. */
    @media only screen and (max-width:480px) {
      .band { padding-left:24px !important; padding-right:24px !important; }
      .band-name { font-size:24px !important; }
    }
  </style>
  <title>${escapeHtml(contactNotificationSubject({ enquiry, labels }))}</title>
</head>
<body style="margin:0;padding:0;background-color:${siteConfig.backgroundColor};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(preview)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${siteConfig.backgroundColor};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="${WIDTH}" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:${WIDTH}px;background-color:${COLOR.white};">

          <tr>
            <td class="band" style="padding:26px ${INSET}px;background-color:${COLOR.white};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;">
                    ${
                      logoSrc
                        ? `<img src="${escapeHtml(logoSrc)}" alt="${siteConfig.brandName}" width="128" height="25" style="display:block;border:0;font-family:${SANS};font-size:19px;font-weight:700;letter-spacing:0.08em;color:${COLOR.blue};" />`
                        : wordmark
                    }
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    ${monoText("Project enquiry", COLOR.muted)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="band" bgcolor="#16213e" style="padding:${BAND_Y}px ${INSET}px 34px;background-color:${siteConfig.themeColor};background-image:${GRID_OVERLAY},${DEEP_BLUE_GRADIENT};">
              ${monoText(`${stepIndex("identity")} / ${labels.steps.identity}`, COLOR.onDark.sky)}
              ${spacer(22)}
              <p class="band-name" style="margin:0;font-family:${SANS};font-size:28px;font-weight:700;line-height:1.15;letter-spacing:-0.03em;color:${COLOR.onDark.text};">${escapeHtml(name)}</p>
              ${spacer(10)}
              <p style="margin:0;font-family:${SANS};font-size:17px;line-height:1.5;color:${COLOR.onDark.soft};">${escapeHtml(role ? `${role} · ${company}` : company)}</p>
              ${spacer(26)}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${mastheadRow("Email", `<a href="mailto:${escapeHtml(email)}" style="color:${COLOR.onDark.sky};text-decoration:none;">${escapeHtml(email)}</a>`)}
                ${mastheadRow("Received", escapeHtml(formatReceived(receivedAt)))}
                ${mastheadRow("Language", escapeHtml(`${languageName(locale)} (${locale.toUpperCase()})`))}
              </table>
            </td>
          </tr>
${band({
  step: "property",
  label: labels.steps.property,
  tinted: false,
  body: `${headline(labels.sector, 22)}
            ${spacer(22)}
            ${answer(labels.questions.scale, scale)}`,
})}
${band({
  step: "decision",
  label: labels.steps.decision,
  tinted: true,
  body: `${headline(labels.questions.decision, 19)}
            ${spacer(16)}
            ${paragraph(prose(decision))}`,
})}
${band({
  step: "risk",
  label: labels.steps.risk,
  tinted: false,
  body: `${headline(labels.questions.incomplete, 19)}
            ${spacer(16)}
            ${incomplete ? paragraph(prose(incomplete)) : NOT_ANSWERED}`,
})}
${band({
  step: "timing",
  label: labels.steps.timing,
  tinted: true,
  body: `${headline(labels.timing, 26)}
            ${spacer(26)}
            ${answer(labels.questions.additionalContext, additionalContext)}`,
})}

          <tr>
            <td class="band" bgcolor="#16213e" style="padding:38px ${INSET}px;background-color:${siteConfig.themeColor};background-image:${GRID_OVERLAY},${DEEP_BLUE_GRADIENT};">
              ${monoText("Next step", COLOR.onDark.sky)}
              ${spacer(20)}
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="${COLOR.blue}" style="background-color:${COLOR.blue};border-radius:6px;">
                    <a href="${replyHref}" style="display:inline-block;padding:16px 30px;font-family:${SANS};font-size:15px;font-weight:600;letter-spacing:0.02em;color:${COLOR.white};text-decoration:none;">${escapeHtml(`Reply to ${name}`)} &nbsp;&rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="band" style="padding:24px ${INSET}px 28px;background-color:${COLOR.white};border-top:1px solid ${COLOR.hairline};">
              ${monoText(`${siteConfig.brandName} · ${siteConfig.address.streetAddress}, ${siteConfig.address.postalCode} ${siteConfig.address.addressLocality}`, COLOR.muted)}
              ${spacer(8)}
              <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.6;color:${COLOR.muted};">Sent by the contact form at ${escapeHtml(new URL(siteConfig.url).host)}.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

/** The plain-text alternative. Not optional: a notification with no text part is scored as
 *  spam by some filters, and the office reads these on a phone. */
export const contactNotificationText = ({
  enquiry,
  labels,
  locale,
  receivedAt = new Date(),
}: ContactNotification): string => {
  const { name, email, company, role, scale, decision, incomplete, additionalContext } = enquiry;
  const missing = "Not answered";

  const section = (step: ContactStep, label: string, lines: string[]) =>
    [`${stepIndex(step)} / ${label.toUpperCase()}`, ...lines].join("\n");

  return [
    contactNotificationSubject({ enquiry, labels }),
    "",
    section("identity", labels.steps.identity, [
      name,
      role ? `${role} · ${company}` : company,
      email,
      `Received ${formatReceived(receivedAt)} · ${languageName(locale)} (${locale.toUpperCase()})`,
    ]),
    "",
    section("property", labels.steps.property, [
      labels.sector,
      `${labels.questions.scale}: ${scale ?? missing}`,
    ]),
    "",
    section("decision", labels.steps.decision, [labels.questions.decision, decision]),
    "",
    section("risk", labels.steps.risk, [labels.questions.incomplete, incomplete ?? missing]),
    "",
    section("timing", labels.steps.timing, [
      labels.timing,
      `${labels.questions.additionalContext}: ${additionalContext ?? missing}`,
    ]),
    "",
    `Reply: ${email}`,
    `${siteConfig.brandName} · ${siteConfig.address.streetAddress}, ${siteConfig.address.postalCode} ${siteConfig.address.addressLocality}`,
  ].join("\n");
};
