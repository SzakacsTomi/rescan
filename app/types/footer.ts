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
