/**
 * Reference cards for the Rescan design system.
 *
 * These are documentation, not UI: they exist so the design system is browsable in the
 * claude.ai/design picker, which builds its card index from rendered previews and shows a
 * tokens-only system as empty. They deliberately do NOT mirror anything in app/components/ -
 * nothing here claims to be a Rescan site component.
 *
 * Each one reads the live custom properties off the document, so a token renamed or
 * revalued in app/globals.css shows up here on the next sync without an edit.
 */
import * as React from 'react';

/** A colour family. `brand` surfaces are fixed; `semantic` roles flip under `.dark`. */
export type ColorFamily = 'brand' | 'semantic' | 'all';

type Swatch = { token: string; label: string };

const BRAND: Swatch[] = [
  { token: '--color-ink', label: 'ink' },
  { token: '--color-ink-soft', label: 'ink-soft' },
  { token: '--color-accent-sky', label: 'accent-sky' },
  { token: '--color-accent-mid', label: 'accent-mid' },
  { token: '--color-fit', label: 'fit' },
  { token: '--color-paper', label: 'paper' },
  { token: '--color-hairline', label: 'hairline' },
];

const SEMANTIC: Swatch[] = [
  { token: '--background', label: 'background' },
  { token: '--foreground', label: 'foreground' },
  { token: '--card', label: 'card' },
  { token: '--card-foreground', label: 'card-foreground' },
  { token: '--popover', label: 'popover' },
  { token: '--popover-foreground', label: 'popover-foreground' },
  { token: '--primary', label: 'primary' },
  { token: '--primary-foreground', label: 'primary-foreground' },
  { token: '--secondary', label: 'secondary' },
  { token: '--secondary-foreground', label: 'secondary-foreground' },
  { token: '--muted', label: 'muted' },
  { token: '--muted-foreground', label: 'muted-foreground' },
  { token: '--accent', label: 'accent' },
  { token: '--accent-foreground', label: 'accent-foreground' },
  { token: '--destructive', label: 'destructive' },
  { token: '--border', label: 'border' },
  { token: '--input', label: 'input' },
  { token: '--ring', label: 'ring' },
];

const MONO = 'font-mono text-mono-2xs leading-none tracking-mono-wide uppercase text-muted-foreground';

/** Resolves a custom property against the live document, so values are never duplicated here. */
const useTokenValues = (tokens: string[]) => {
  const [values, setValues] = React.useState<Record<string, string>>({});
  React.useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    for (const t of tokens) next[t] = cs.getPropertyValue(t).trim();
    setValues(next);
  }, [tokens.join(',')]);
  return values;
};

const Section = ({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) => (
  <section className="bg-background px-6 py-8 sm:px-8">
    <span className={MONO}>{eyebrow}</span>
    <div className="mt-6">{children}</div>
  </section>
);

export type ColorPaletteProps = {
  /** Which family to show. Defaults to `all`. */
  family?: ColorFamily;
};

/** Swatch grid of the brand surfaces and the semantic roles, with live resolved values. */
export const ColorPalette = ({ family = 'all' }: ColorPaletteProps) => {
  const groups = family === 'brand' ? [['Brand surfaces', BRAND] as const]
    : family === 'semantic' ? [['Semantic roles', SEMANTIC] as const]
    : [['Brand surfaces', BRAND] as const, ['Semantic roles', SEMANTIC] as const];
  const all = groups.flatMap(([, s]) => s.map((x) => x.token));
  const values = useTokenValues(all);
  return (
    <div className="bg-background">
      {groups.map(([title, swatches]) => (
        <Section key={title} eyebrow={title}>
          <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-4">
            {swatches.map(({ token, label }) => (
              <div key={token} className="bg-card p-4">
                <div
                  className="h-14 w-full rounded-sm border border-border"
                  style={{ background: `var(${token})` }}
                />
                <p className="mt-5 text-caption leading-none text-foreground">{label}</p>
                <p className={`${MONO} mt-3 normal-case`}>{values[token] || token}</p>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
};

const TYPE_STEPS = [
  'mono-2xs', 'mono-xs', 'micro', 'caption', 'note', 'body', 'body-lg', 'lead', 'lead-lg',
  'subhead', 'title-sm', 'title', 'title-lg', 'h3', 'h2', 'h2-lg', 'h1', 'h1-lg',
  'display-2xs', 'display-xs', 'display-sm', 'display', 'display-lg', 'display-xl',
  'hero', 'hero-lg',
];

export type TypeScaleProps = {
  /** Cap the ramp at this step, e.g. `body-lg` for a dashboard-range view. Defaults to the full ramp. */
  upTo?: string;
  /** Specimen text. Defaults to the family name. */
  sample?: string;
};

/** The full 26-step size ramp, each row labelled with its utility and computed size. */
export const TypeScale = ({ upTo, sample = 'Existing-condition building information' }: TypeScaleProps) => {
  const end = upTo ? TYPE_STEPS.indexOf(upTo) : TYPE_STEPS.length - 1;
  const steps = TYPE_STEPS.slice(0, (end < 0 ? TYPE_STEPS.length : end) + 1);
  const values = useTokenValues(steps.map((s) => `--text-${s}`));
  return (
    <Section eyebrow="Type scale — Montserrat">
      <div className="flex flex-col gap-px bg-border">
        {steps.map((step) => (
          <div key={step} className="flex items-baseline gap-6 bg-card p-4">
            <span className={`${MONO} w-32 shrink-0 normal-case`}>text-{step}</span>
            <span className={`${MONO} w-16 shrink-0 normal-case`}>{values[`--text-${step}`]}</span>
            <span
              className="min-w-0 truncate text-foreground"
              style={{ fontSize: `var(--text-${step})`, lineHeight: 1.1, letterSpacing: 'var(--tracking-tight)' }}
            >
              {sample}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
};

const CONTAINERS = ['measure', 'cta', 'page', 'wide', 'shell'];

/** Token values arrive as rem or px depending on the token; the cards label everything in px. */
const toPx = (raw: string) => {
  const n = parseFloat(raw);
  if (!Number.isFinite(n)) return raw;
  return `${raw.trim().endsWith('rem') ? n * 16 : n}px`;
};

export type SpacingScaleProps = {
  /** Show the container ramp. Defaults to true. */
  containers?: boolean;
};

/** Container widths and the 126px hero spine, drawn to relative scale. */
export const SpacingScale = ({ containers = true }: SpacingScaleProps) => {
  const values = useTokenValues([...CONTAINERS.map((c) => `--container-${c}`), '--spacing-spine']);
  const widest = 1920;
  return (
    <Section eyebrow="Layout">
      {containers && (
        <div className="flex flex-col gap-px bg-border">
          {CONTAINERS.map((c) => {
            const raw = values[`--container-${c}`] ?? '';
            const px = parseFloat(raw) * (raw.trim().endsWith('rem') ? 16 : 1);
            return (
              <div key={c} className="bg-card p-4">
                <div className="flex items-baseline justify-between">
                  <span className={`${MONO} normal-case`}>max-w-{c}</span>
                  <span className={`${MONO} normal-case`}>{toPx(raw)}</span>
                </div>
                <div
                  className="mt-3 h-2 rounded-sm bg-accent-mid"
                  style={{ width: `${Math.min(100, (px / widest) * 100)}%` }}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="mt-6 bg-card p-4">
        <div className="flex items-baseline justify-between">
          <span className={`${MONO} normal-case`}>spacing-spine</span>
          <span className={`${MONO} normal-case`}>{toPx(values['--spacing-spine'] ?? '')}</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-2 rounded-sm bg-fit" style={{ width: 'var(--spacing-spine)' }} />
          <span className="text-caption text-muted-foreground">left spine every hero aligns to</span>
        </div>
      </div>
    </Section>
  );
};
