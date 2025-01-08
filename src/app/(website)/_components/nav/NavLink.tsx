import * as React from "react";

type NavLinkProps = {
  label: string;
  variant: "outline" | "default" | "solid";
  className?: string;
  borderWidth?: string; // Add borderWidth prop
};

export const NavLink: React.FC<NavLinkProps> = ({
  label,
  variant,
  className,
  borderWidth,
}) => {
  const baseClasses =
    "inline-block text-xs font-medium tracking-wide leading-none text-center uppercase whitespace-nowrap";
  const variantClasses = {
    outline: "border border-solid px-4 py-2.5",
    default: "hover:text-coral-600",
    solid: "bg-black text-white border-black px-4 py-2.5",
  };

  return (
    <a
      href="#"
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${borderWidth}`}
    >
      {label}
    </a>
  );
};
