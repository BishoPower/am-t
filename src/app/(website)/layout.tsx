import React from "react";
import { NavigationBar } from "./_components/nav/NavigationBar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex w-full justify-between sm:px-[1%] md:px-[%5] lg:px-[5%] xl:px-[11%] 2xl:px-[16%] 3xl:px-[20%] 4xl:px-[20%]">
        <NavigationBar />
      </div>
      <div className="flex flex-col flex-1 py-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-[320px] container mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
