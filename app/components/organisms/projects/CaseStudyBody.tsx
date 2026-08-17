import { Pending, isPending, placeholdersVisible } from "@/app/components/atoms/Pending";

/**
 * The five-step commercial sequence every case study must follow:
 * Decision → Information Problem → Commercial Risk → RESCAN → Outcome.
 *
 * "What Changed" is the commercial proof and the brief asks twice for it to be visually
 * prominent, so it breaks out of the plain-prose treatment the other four share.
 */

export type CaseStudyCopy = {
  situation: string;
  informationGap: string;
  cost: string;
  established: string;
  changed: string;
  keyProof: string[];
};

export type CaseStudyLabels = {
  situation: string;
  informationGap: string;
  cost: string;
  established: string;
  changed: string;
  keyProof: string;
};

type CaseStudyBodyProps = {
  copy: CaseStudyCopy;
  labels: CaseStudyLabels;
};

const Block = ({ label, children }: { label: string; children: string }) => {
  const pending = isPending(children);
  if (pending && !placeholdersVisible) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">{label}</h2>
      {pending ? (
        <Pending>{children}</Pending>
      ) : (
        <p className="text-white/70 text-base sm:text-lg leading-relaxed">{children}</p>
      )}
    </section>
  );
};

export const CaseStudyBody = ({ copy, labels }: CaseStudyBodyProps) => {
  const proofItems = placeholdersVisible
    ? copy.keyProof
    : copy.keyProof.filter((item) => !isPending(item));

  return (
    <div className="flex flex-col gap-12 w-full lg:max-w-3xl">
      <Block label={labels.situation}>{copy.situation}</Block>
      <Block label={labels.informationGap}>{copy.informationGap}</Block>
      <Block label={labels.cost}>{copy.cost}</Block>
      <Block label={labels.established}>{copy.established}</Block>

      {(!isPending(copy.changed) || placeholdersVisible) && (
        <section className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/5 p-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/60">
            {labels.changed}
          </h2>
          <p className="text-white text-xl sm:text-2xl font-medium leading-snug">
            <Pending>{copy.changed}</Pending>
          </p>
        </section>
      )}

      {proofItems.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
            {labels.keyProof}
          </h2>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {proofItems.map((item) => (
              <li key={item} className="text-white font-semibold">
                <Pending>{item}</Pending>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
