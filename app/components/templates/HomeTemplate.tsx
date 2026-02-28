import { Footer } from '@/app/components/organisms/Footer';
import { HeroSection } from '@/app/components/organisms/HeroSection';
import { SectionsGrid } from '@/app/components/organisms/SectionsGrid';

export const HomeTemplate = () => {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <HeroSection />

      <div className="max-w-480 mx-auto w-full flex flex-col flex-1">
        <SectionsGrid />
        <Footer />
      </div>
    </main>
  );
};
