import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { Stagger } from "@/app/components/atoms/Stagger";
import { cn } from "@/lib/utils";

type CorePrincipleProps = {
  headline: string;
  body: string;
  rolesLabel: string;
  /** The next handlers of the file, numbered down the side of the card. */
  roles: string[];
};

export const CorePrinciple = ({ headline, body, rolesLabel, roles }: CorePrincipleProps) => {
  return (
    <section className="bg-secondary px-6 py-24 sm:px-8 lg:px-10 lg:py-30">
      <div className="mx-auto grid max-w-310 grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
        <div>
          <Reveal>
            <h2 className="max-w-[16ch] text-[32px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[38px] lg:text-[44px]">
              {headline}
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-8 max-w-[60ch] text-[19px] leading-[1.75] whitespace-pre-line text-foreground/68">
              {body}
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="bg-background px-7 pt-7 pb-2">
            <MonoLabel className="text-foreground/45">{rolesLabel}</MonoLabel>
            <Stagger as="ul" className="mt-5 flex flex-col">
              {roles.map((role, i) => (
                <li
                  key={role}
                  className={cn(
                    "flex items-baseline gap-3.5 border-t border-foreground/10 py-3 text-[15px] text-foreground/75",
                    i === roles.length - 1 && "pb-5",
                  )}
                >
                  <MonoLabel className="text-foreground/35" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </MonoLabel>
                  {role}
                </li>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
};