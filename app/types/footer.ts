export type FooterNavLink = {
  href: string;
  labelKey: string;
};

export type SocialPlatform = 'instagram' | 'linkedin' | 'twitter';

export type SocialLinkConfig = {
  href: string;
  platform: SocialPlatform;
  labelKey: string;
};
