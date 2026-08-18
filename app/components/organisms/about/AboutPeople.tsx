import { MediaPlaceholder } from '@/app/components/atoms/MediaPlaceholder';
import { MonoLabel } from '@/app/components/atoms/MonoLabel';
import { Pending } from '@/app/components/atoms/Pending';
import { Reveal } from '@/app/components/atoms/Reveal';
import { PORTRAIT_STRIPE } from '@/config/gradients';

type AboutPeopleProps = {
  headline: string;
  organization: string;
  members: string[];
};

export const AboutPeople = ({ headline, organization, members }: AboutPeopleProps) => {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-10 lg:py-30">
      <div className="mx-auto max-w-310">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <h2 className="max-w-18ch text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[38px]">
              {headline}
            </h2>
          </Reveal>
          <Reveal>
            <span className="max-w-38ch text-[15px] leading-[1.7] text-foreground/55">
              <Pending>{organization}</Pending>
            </span>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <Reveal key={i}>
              <MonoLabel aria-hidden className="text-primary">
                {String(i + 1).padStart(2, '0')}
              </MonoLabel>
              <MediaPlaceholder
                stripe={PORTRAIT_STRIPE}
                className="mt-3 aspect-[4/5] border border-[#D8DEEA]"
              />
              <div className="mt-5 border-t border-foreground/12 pt-4">
                <Pending>{member}</Pending>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};