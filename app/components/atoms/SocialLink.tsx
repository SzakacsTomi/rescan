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
  size?: "md" | "lg";
  showLabel?: boolean;
};

export const SocialLink = ({ config, label, size = "md", showLabel = false }: SocialLinkProps) => {
  const Icon = iconMap[config.platform];

  return (
    <a
      href={config.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`text-foreground/50 hover:text-foreground transition-colors${showLabel ? " flex flex-col items-center gap-2" : ""}`}
    >
      <Icon className={size === "lg" ? "w-6 h-6" : "w-5 h-5"} />
      {showLabel && <span className="text-xs tracking-wide">{label}</span>}
    </a>
  );
};
