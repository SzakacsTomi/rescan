type ContactHeroProps = {
  headline: string;
  subheadline: string;
};

export const CONTACT_FORM_ID = 'contact-form';

export const ContactHero = ({ headline, subheadline }: ContactHeroProps) => {
  return (
    <section
      className="relative flex flex-col items-center justify-center px-6 py-32 text-center"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6 whitespace-pre-line">
          {headline}
        </h1>
        <p className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">
          {subheadline}
        </p>
      </div>
    </section>
  );
};
