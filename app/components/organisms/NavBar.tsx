import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { LanguageSwitcher } from '@/app/components/atoms/LanguageSwitcher';
import { MobileMenu } from '@/app/components/molecules/MobileMenu';
import { NavLinks } from '@/app/components/molecules/NavLinks';
import { navLinks } from '@/config/nav';
import { Link } from '@/i18n/navigation';

export const NavBar = async () => {
  const t = await getTranslations('nav');

  const resolvedLinks = navLinks.map((link) => ({
    href: link.href,
    label: t(link.labelKey),
  }));

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-480 mx-auto px-6 h-16 flex items-center gap-6">
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/logo.png"
            alt="Rescan"
            width={120}
            height={32}
            className="h-5 w-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex flex-1">
          <NavLinks links={resolvedLinks} />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <MobileMenu links={resolvedLinks} />
        </div>
      </div>
    </nav>
  );
};
