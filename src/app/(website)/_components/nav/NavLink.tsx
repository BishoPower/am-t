import * as React from "react";

type NavLinkProps = {
  label: string;
  variant: "outline" | "default" | "solid";
  className?: string;
  borderWidth?: string;
  href?: string;
};

export const NavLink: React.FC<NavLinkProps> = ({
  label,
  variant = "default",
  className = "",
  borderWidth,
  href = "#",
}) => {
  const baseClasses =
    "inline-block text-xs font-medium tracking-wide leading-none text-center uppercase whitespace-nowrap transition-colors duration-200";

  const variantClasses = {
    outline: "border border-solid px-4 py-2.5",
    default: "hover:text-coral-600",
    solid: "bg-black text-white border-black px-4 py-2.5",
  };

  // Responsive classes for different screen sizes
  const responsiveClasses = "sm:text-sm md:px-5 lg:text-base";

  // Apply border width if provided, otherwise use the default from variant
  const borderClasses = borderWidth ? `border-[${borderWidth}]` : "";

  return (
    <a
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${responsiveClasses} ${borderClasses} ${className}`}
    >
      {label}
    </a>
  );
};
