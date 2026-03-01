import type { ReactNode } from "react";
import { Footer } from "@/app/components/organisms/Footer";
import { NavBar } from "@/app/components/organisms/NavBar";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="pt-16 flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
