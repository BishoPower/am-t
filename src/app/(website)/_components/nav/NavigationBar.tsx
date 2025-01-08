"use client";

import * as React from "react";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { NavLink } from "./NavLink";

const navLinks = [
  {
    label: "Sell",
    variant: "outline" as const,
    className: "border-black",
    borderWidth: "border-2",
  },
  { label: "Shop", variant: "default" as const },
  { label: "Read", variant: "default" as const },
  { label: "Login", variant: "outline" as const },
  { label: "Sign up", variant: "solid" as const },
];

export const NavigationBar: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    <div className="flex flex-nowrap items-center w-full ">
      <Logo
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5af9b24a27dc6e652cff8e8df6c54e7e524fa37dcf96dc6bc7252ebaba01e6c7?placeholderIfAbsent=true&apiKey=b4cab32bee1d480ba90be591a38899b3"
        alt="Company Logo"
      />
      <div className="flex flex-1 items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 my-auto min-h-[42px] max-md:max-w-full">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex flex-col items-end self-stretch px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 my-auto text-xs font-bold leading-loose text-black uppercase min-w-[300px] max-md:max-w-full">
        <div className="flex items-center space-x-4 md:space-x-7">
          {navLinks.map((link, index) => (
            <NavLink key={index} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
};
