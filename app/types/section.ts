export type SectionConfig = {
  id: string;
  href: string;
  gradient: string;
  /** The photograph behind the card. `id` is a bare Cloudinary public id — see
   *  `cloudinaryImageUrl` — and `objectPosition` frames the crop, since both frames are
   *  landscape originals and the card is a tall column at desktop width. */
  image: {
    id: string;
    objectPosition: string;
  };
};
