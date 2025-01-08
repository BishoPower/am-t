import * as React from "react";
import { LogoProps } from "./types";

export const Logo: React.FC<LogoProps> = ({ src, alt }) => {
  return (
    <div className="flex items-center self-stretch py-2.5 min-h-[50px]">
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className="object-contain self-stretch my-auto aspect-[4.33] max-w-[130px] w-[130px]"
      />
    </div>
  );
};
