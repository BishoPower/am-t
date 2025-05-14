"use client";

import * as React from "react";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { NavLink } from "./NavLink";
import { Menu } from "lucide-react";

const navLinks = [
  {
    label: "Sell",
    variant: "outline" as const,
    className: "border-black",
    borderWidth: "border-2",
  },
  { label: "Shop", variant: "default" as const },
  { label: "Read", variant: "default" as const },
  { label: "Login", variant: "outline" as const, href: "/auth/sign-in" }, // Only Login has href
  { label: "Sign up", variant: "solid" as const },
];

export const NavigationBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    <div className="flex flex-nowrap items-center w-full">
      <Logo
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5af9b24a27dc6e652cff8e8df6c54e7e524fa37dcf96dc6bc7252ebaba01e6c7?placeholderIfAbsent=true&apiKey=b4cab32bee1d480ba90be591a38899b3"
        alt="Company Logo"
      />
      <div className="flex flex-1 items-center px-8 my-auto min-h-[42px]">
        <SearchBar onSearch={handleSearch} />
      </div>
      <button
        className="block lg:hidden p-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:flex flex-col lg:flex-row items-end self-stretch px-8 my-auto text-xs font-bold leading-loose text-black uppercase min-w-[300px]`}
      >
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-7">
          {navLinks.map((link, index) => (
            <NavLink key={index} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
};
