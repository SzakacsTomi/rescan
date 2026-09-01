import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

type LogoProps = {
  /** White-out treatment for a dark or transparent background — matches NavBar's dark variant. */
  invert?: boolean;
};

export const Logo = ({ invert = false }: LogoProps) => {
  return (
    <div className="w-32">
      <Image
        src="/assets/logo.png"
        alt={siteConfig.name}
        width={0}
        height={0}
        priority
        sizes="100vw"
        className={cn("w-auto h-auto", invert && "brightness-0 invert")}
      />
    </div>
  );
};
