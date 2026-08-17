import type { ReactNode } from "react";
import { ValueCard } from "@/app/components/molecules/ValueCard";
import { cn } from "@/lib/utils";

type ValueItem = {
  title: string;
  description: string;
};

type StrategicValueProps = {
  headline: string;
  body?: string;
  values: ValueItem[];
  /** Optional supporting visual. Without one the list runs full width rather than
   *  leaving an empty box beside it. */
  aside?: ReactNode;
};

export const StrategicValue = ({ headline, body, values, aside }: StrategicValueProps) => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{headline}</h2>
        {body && (
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mt-4">{body}</p>
        )}
        <div className={cn("grid grid-cols-1 gap-8 items-start mt-12", aside && "lg:grid-cols-2")}>
          <div className="flex flex-col gap-4">
            {values.map((value) => (
              <ValueCard key={value.title} title={value.title} description={value.description} />
            ))}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
};
