import Image from "next/image";
import { siteConfig } from "@/config/site";

export const Logo = () => {
  return (
    <div className="w-32">
      <Image
        src="/assets/logo.png"
        alt={siteConfig.name}
        width={0}
        height={0}
        priority
        sizes="100vw"
        objectFit="covers"
        className="w-auto h-auto"
      />
    </div>
  );
};
