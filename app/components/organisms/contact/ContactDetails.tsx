import { Mail, MapPin, Clock } from 'lucide-react';

type ContactDetailsProps = {
  headline: string;
  intro: string;
  emailLabel: string;
  email: string;
  locationLabel: string;
  location: string;
  responseLabel: string;
  response: string;
};

export const ContactDetails = ({
  headline,
  intro,
  emailLabel,
  email,
  locationLabel,
  location,
  responseLabel,
  response,
}: ContactDetailsProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">{headline}</h2>
        <p className="text-muted-foreground leading-relaxed">{intro}</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Mail className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
              {emailLabel}
            </p>
            <a
              href={`mailto:${email}`}
              className="font-medium hover:text-primary transition-colors"
            >
              {email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
              {locationLabel}
            </p>
            <p className="font-medium">{location}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
              {responseLabel}
            </p>
            <p className="font-medium">{response}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
