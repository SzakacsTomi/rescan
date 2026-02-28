import { siteConfig } from '@/config/site';

export const Logo = () => {
  return (
    <span className="text-xl font-bold tracking-tight">{siteConfig.name}</span>
  );
};
