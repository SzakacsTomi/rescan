import { LanguageSwitcher } from '@/app/components/atoms/LanguageSwitcher';
import { Footer } from '@/app/components/organisms/Footer';
import { HeroSection } from '@/app/components/organisms/HeroSection';
import { SectionsGrid } from '@/app/components/organisms/SectionsGrid';

export const HomeTemplate = () => {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-480 mx-auto px-6 py-5 flex justify-end pointer-events-auto">
          <LanguageSwitcher />
        </div>
      </header>
      <HeroSection />

      <div className="max-w-480 mx-auto w-full flex flex-col flex-1">
        <SectionsGrid />
        <Footer />
      </div>
    </main>
  );
};
