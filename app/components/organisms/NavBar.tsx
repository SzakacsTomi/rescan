import { LayoutGroup } from 'framer-motion';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { LanguageSwitcher } from '@/app/components/atoms/LanguageSwitcher';
import { MotionNav } from '@/app/components/atoms/MotionNav';
import { MobileMenu } from '@/app/components/molecules/MobileMenu';
import { NavLinks } from '@/app/components/molecules/NavLinks';
import { cn } from '@/lib/utils';
import { navLinks } from '@/config/nav';
import { Link } from '@/i18n/navigation';

type NavBarProps = {
  variant?: 'light' | 'dark';
};

export const NavBar = async ({ variant = 'light' }: NavBarProps) => {
  const t = await getTranslations('nav');
  const isDark = variant === 'dark';

  const resolvedLinks = navLinks.map((link) => ({
    href: link.href,
    label: t(link.labelKey),
  }));
  const desktopNavLinks = resolvedLinks.filter((link) => link.href !== '/contact');

  return (
    <MotionNav
      className={cn(
        'left-0 right-0 z-40',
        isDark
          ? 'absolute top-0 border-b border-white/10'
          : 'fixed top-0 bg-background/90 backdrop-blur-md border-b border-border/50',
      )}
    >
      <LayoutGroup id={isDark ? 'navbar-home' : 'navbar-pages'}>
        <div className="max-w-shell mx-auto px-6 h-16 flex items-center gap-6">
          <Link href="/" className="shrink-0">
            <Image
              src="/assets/logo.png"
              alt="Rescan"
              width={120}
              height={32}
              className={cn('h-5 w-auto', isDark && 'brightness-0 invert')}
              priority
            />
          </Link>

          <div className="hidden md:flex flex-1">
            <NavLinks links={desktopNavLinks} variant={variant} />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher variant={variant} />
            </div>
            <Link
              href="/contact"
              className={cn(
                'hidden md:inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold transition-colors',
                isDark
                  ? 'border border-white/25 text-white hover:bg-white/10'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90',
              )}
            >
              {t('contact')}
            </Link>
            <MobileMenu links={resolvedLinks} variant={variant} />
          </div>
        </div>
      </LayoutGroup>
    </MotionNav>
  );
};
