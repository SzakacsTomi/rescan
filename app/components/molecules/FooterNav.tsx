import Link from 'next/link';
import type { FooterNavLink } from '@/app/types/footer';

type FooterNavProps = {
  links: Array<FooterNavLink & { label: string }>;
};

export const FooterNav = ({ links }: FooterNavProps) => {
  return (
    <nav aria-label="Footer navigation">
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-foreground/60 hover:text-foreground transition-colors text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
