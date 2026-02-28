import { HeroSection } from '@/app/components/organisms/HeroSection';
import { SectionsGrid } from '@/app/components/organisms/SectionsGrid';
import { Footer } from '@/app/components/organisms/Footer';

export const HomeTemplate = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <SectionsGrid />
      <Footer />
    </main>
  );
};
