import type { ReactNode } from "react";
import { NavBar } from "@/app/components/organisms/NavBar";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="pt-16">{children}</div>
    </>
  );
}
