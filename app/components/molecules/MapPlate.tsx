import { MonoLabel } from '@/app/components/atoms/MonoLabel';

type MapPlateProps = {
  locationLabel: string;
  address: string;
  coordinatesLabel: string;
  coordinates: string;
  /** Screen-reader name for the address link, which opens Google Maps in a new tab. */
  openInMaps: string;
  href: string;
};

/**
 * A drawing's title block: the ruled plate in the corner of a sheet stating site and
 * coordinates. It borders on two sides only — the map's own left and bottom edges are the
 * other two, which is why it is seated flush in the corner and never rounded.
 *
 * Only facts that are true go in here. A "sheet no. / rev." row would be invented data.
 */
export const MapPlate = ({
  locationLabel,
  address,
  coordinatesLabel,
  coordinates,
  openInMaps,
  href,
}: MapPlateProps) => (
  <dl className="absolute bottom-0 left-0 z-10 max-w-[calc(100%-1rem)] border-t border-r border-white/15 bg-[#020409]/88 px-5 py-4 sm:max-w-[24rem] sm:px-6 sm:py-5">
    <MonoLabel as="dt" className="text-white/60">
      {locationLabel}
    </MonoLabel>
    <dd>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={openInMaps}
        className="-my-1 mt-2 block py-1 text-[13px] font-medium leading-snug text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 sm:text-sm"
      >
        {address}
      </a>
    </dd>

    <div className="mt-3 border-t border-white/10 pt-3">
      <MonoLabel as="dt" className="text-white/60">
        {coordinatesLabel}
      </MonoLabel>
      <dd className="mt-2 font-mono text-[12px] leading-none tracking-[0.04em] tabular-nums text-white/85">
        {coordinates}
      </dd>
    </div>
  </dl>
);
