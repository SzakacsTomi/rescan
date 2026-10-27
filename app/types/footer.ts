export type LegalLink = {
  href: string;
  labelKey: string;
};

export type SocialPlatform = 'linkedin';

export type SocialLinkConfig = {
  href: string;
  platform: SocialPlatform;
  labelKey: string;
};

export type MembershipConfig = {
  href: string;
  src: string;
  /** Intrinsic size of the badge artwork, so `next/image` reserves its box before it loads. */
  width: number;
  height: number;
};
