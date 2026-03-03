import type { LucideIcon } from 'lucide-react';

type PainPointCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const PainPointCard = ({ icon: Icon, title, description }: PainPointCardProps) => {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl bg-muted/50 border border-border">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-foreground/60 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
