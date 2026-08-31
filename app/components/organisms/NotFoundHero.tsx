import { ArrowRight } from "lucide-react";
import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { Link } from "@/i18n/navigation";

type NotFoundLink = {
  href: string;
  label: string;
};

type NotFoundHeroProps = {
  code: string;
  headline: string;
  subheadline: string;
  cta: string;
  linksLabel: string;
  links: NotFoundLink[];
};

export const NotFoundHero = ({
  code,
  headline,
  subheadline,
  cta,
  linksLabel,
  links,
}: NotFoundHeroProps) => {
  return (
    <section className="flex flex-1 items-center justify-center px-6 py-24 text-center sm:px-8 lg:px-10 lg:py-30">
      <Reveal className="mx-auto max-w-measure">
        <MonoLabel className="tracking-eyebrow">{code}</MonoLabel>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-h1-lg">
          {headline}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
          {subheadline}
        </p>

        <Link
          href="/"
          className="group mt-11 inline-flex items-center gap-3 rounded-md bg-primary px-8 py-4.5 font-semibold text-primary-foreground tracking-wide transition-colors hover:bg-accent-mid"
        >
          {cta}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <div className="mt-14">
          <MonoLabel as="p">{linksLabel}</MonoLabel>
          <nav
            aria-label={linksLabel}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Reveal>
    </section>
  );
};
