import { Check, X } from 'lucide-react';

type FitGroup = {
  title: string;
  items: string[];
};

type FitNotFitProps = {
  headline: string;
  bestFit: FitGroup;
  notFit: FitGroup;
};

export const FitNotFit = ({ headline, bestFit, notFit }: FitNotFitProps) => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12">{headline}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-xl border border-border bg-background">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <h3 className="font-semibold text-foreground">{bestFit.title}</h3>
            </div>
            <ul className="flex flex-col gap-3.5">
              {bestFit.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/65">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-xl border border-border bg-background">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <X className="w-3.5 h-3.5 text-destructive" />
              </div>
              <h3 className="font-semibold text-foreground">{notFit.title}</h3>
            </div>
            <ul className="flex flex-col gap-3.5">
              {notFit.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/65">
                  <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
