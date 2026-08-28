import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Satellite (`!5e1`), not the road map, for two reasons. It is the honest picture for a company
 * that sells information about buildings that already exist — an aerial of the actual site
 * rather than a diagram of the roads around it. And it arrives dark, so the panel can be tuned
 * with plain scrims instead of a CSS `filter`: a filter over a live cross-origin iframe this
 * size forces the compositor to re-rasterise the whole map every frame, which measurably jams
 * the page.
 */
const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2148.5!2d14.8104!3d56.8787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKronobergsgatan%2012%2C%20352%2033%20V%C3%A4xj%C3%B6%2C%20Sweden!5e1!3m2!1sen!2sse!4v1';

export const MAPS_LINK_URL = 'https://www.google.com/maps/search/?api=1&query=56.8787,14.8104';

type OfficeMapProps = {
  title: string;
  className?: string;
  /** The title block plate. */
  children?: ReactNode;
};

export const OfficeMap = ({ title, className, children }: OfficeMapProps) => (
  // The dark ground lives on the container, so the region is never white before the iframe
  // paints — which is also why no loading skeleton and no client state are needed here.
  <div className={cn('relative overflow-hidden bg-ink-soft', className)}>
    <iframe
      src={MAPS_EMBED_URL}
      title={title}
      // Not `loading="lazy"`: an absolutely-positioned iframe this size never re-triggers
      // Chrome's deferred load, so the embed sits on its spinner forever. It is above the fold
      // here anyway, where lazy loading buys nothing.
      referrerPolicy="no-referrer-when-downgrade"
      // Opts this one embed out of the pointer-events blanking Lenis applies to every iframe
      // while it smooths — see the rule in globals.css. Panning the aerial is the point of it.
      data-native-input
      className="absolute inset-0 h-full w-full border-0"
    />
    {/* Three layers rather than one flat scrim, so the darkness is spent where it is needed
        instead of uniformly — a single mask heavy enough to mute the embed's chrome also took
        the aerial itself down to near-black, which defeats the point of showing the site.

        A tint, not a mask: enough to tie the aerial to the site's navy, no more. */}
    <div className="pointer-events-none absolute inset-0 bg-ink-soft/28" />
    {/* Google's own place card and pin sit in the top-left; this is what knocks them back. */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-[linear-gradient(to_bottom,rgba(11,16,32,0.55)_0%,rgba(11,16,32,0)_100%)]" />
    {/* Ground for the title block. It only has to seat the plate, which carries its own fill. */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,rgba(2,4,9,0.72)_0%,rgba(2,4,9,0.18)_45%,transparent_100%)]" />
    {children}
  </div>
);
