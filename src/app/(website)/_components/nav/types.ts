export interface NavLinkProps {
  label: string;
  href?: string;
  variant?: "default" | "outline" | "solid";
  className?: string;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export interface LogoProps {
  src: string;
  alt: string;
}
