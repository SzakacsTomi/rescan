import type { Metadata } from 'next';

import { JsonLd } from '@/app/components/atoms/JsonLd';
import { HomeTemplate } from '@/app/components/templates/HomeTemplate';
import { resolvePageJsonLd, resolvePageMetadata } from '@/i18n/metadata';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return resolvePageMetadata((await params).locale, 'home');
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const jsonLd = await resolvePageJsonLd(locale, 'home');

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeTemplate />
    </>
  );
}
