import type { LucideIcon } from 'lucide-react';

type Capability = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type AboutCapabilitiesProps = {
  headline: string;
  capabilities: Capability[];
};

export const AboutCapabilities = ({ headline, capabilities }: AboutCapabilitiesProps) => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12 text-center">
          {headline}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold tracking-tight">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
