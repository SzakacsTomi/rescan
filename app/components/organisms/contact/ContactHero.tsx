export const CONTACT_FORM_ID = 'contact-form';

const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2148.5!2d14.7894!3d56.8777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4657477b0e2b9e5d%3A0x0!2sR%C3%A5djursv%C3%A4gen%201%2C%20352%2045%20V%C3%A4xj%C3%B6%2C%20Sweden!5e0!3m2!1sen!2sse!4v1';

export const ContactHero = () => {
  return (
    <section className="relative w-full h-87.5 sm:h-105 lg:h-120">
      <iframe
        src={MAPS_EMBED_URL}
        className="absolute inset-0 w-full h-full border-0 grayscale-[0.3] invert brightness-90 contrast-105"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Rescan office location"
      />
    </section>
  );
};
