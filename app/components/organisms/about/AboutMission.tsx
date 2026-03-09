import { ABOUT_MISSION_ID } from './AboutHero';

type AboutMissionProps = {
  headline: string;
  body: string;
};

export const AboutMission = ({ headline, body }: AboutMissionProps) => {
  const paragraphs = body.split('\n\n');

  return (
    <section id={ABOUT_MISSION_ID} className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
              {headline}
            </h2>
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-muted/40 aspect-[4/3] lg:aspect-auto lg:h-96 w-full" />
        </div>
      </div>
    </section>
  );
};
