import { ArrowRight } from "lucide-react";
import { isPending, Pending, placeholdersVisible } from "@/app/components/atoms/Pending";
import { Link } from "@/i18n/navigation";

/**
 * Shared by the Home "Proven on real properties." section and the Why RESCAN
 * "Proof over claims." bar — both briefs ask for the same thing: a large figure with one
 * short supporting statement, and no technical vanity metrics.
 *
 * Figures are strings, not numbers: the briefs write them as "42+ locations" and
 * "38,000 m²", and until the client supplies them they are `[[TODO: …]]` markers.
 */

type ProofItem = {
  figure: string;
  statement: string;
};

type ProofBarProps = {
  headline: string;
  items: ProofItem[];
  cta?: {
    label: string;
    href: string;
  };
};

export const ProofBar = ({ headline, items, cta }: ProofBarProps) => {
  // With no figures supplied yet, the section would render as a headline over nothing.
  // Preview still shows the empty slots so the client can see what to send.
  const everySlotPending = items.every(
    (item) => isPending(item.figure) && isPending(item.statement),
  );
  if (everySlotPending && !placeholdersVisible) {
    return null;
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-12">
          {headline}
        </h2>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col gap-3">
              <dt className="text-3xl sm:text-4xl font-bold tracking-tight leading-none">
                <Pending>{item.figure}</Pending>
              </dt>
              <dd className="text-sm text-foreground/55 leading-snug">
                <Pending>{item.statement}</Pending>
              </dd>
            </div>
          ))}
        </dl>

        {cta && !isPending(cta.label) && (
          <Link
            href={cta.href}
            className="mt-12 inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
          >
            {cta.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </section>
  );
};
