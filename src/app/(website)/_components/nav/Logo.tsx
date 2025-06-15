import * as React from "react";
import { useState } from "react";
import { LogoProps } from "./types";

export const Logo: React.FC<LogoProps> = ({ src, alt }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Use static PNG when not hovering, animated GIF when hovering
  const staticSrc = "/amtlogo-static.png";
  const animatedSrc = "/amtlogo.gif?v=1";

  return (
    <div
      className="flex items-center self-stretch py-2.5 min-h-[50px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        loading="lazy"
        src={isHovered ? animatedSrc : staticSrc}
        alt={alt}
        className="object-contain self-stretch my-auto aspect-[4.33] max-w-[200px] w-[200px] border-0 transition-opacity duration-200"
        style={{
          border: "none",
          outline: "none",
          // Pause animation when not hovered (for browsers that support it)
          animationPlayState: isHovered ? "running" : "paused",
        }}
      />
    </div>
  );
};
