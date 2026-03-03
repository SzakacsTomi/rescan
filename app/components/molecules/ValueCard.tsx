type ValueCardProps = {
  title: string;
  description: string;
};

export const ValueCard = ({ title, description }: ValueCardProps) => {
  return (
    <div className="flex flex-col gap-3 p-6 rounded-xl border border-border">
      <h3 className="font-semibold text-foreground text-lg">{title}</h3>
      <p className="text-sm text-foreground/60 leading-relaxed">{description}</p>
    </div>
  );
};
