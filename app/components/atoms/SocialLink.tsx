import { Instagram, Linkedin, Twitter } from 'lucide-react';
import type { SocialLinkConfig } from '@/app/types/footer';

const iconMap = {
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
};

type SocialLinkProps = {
  config: SocialLinkConfig;
  label: string;
};

export const SocialLink = ({ config, label }: SocialLinkProps) => {
  const Icon = iconMap[config.platform];

  return (
    <a
      href={config.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-foreground/50 hover:text-foreground transition-colors"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
};
