import Spinner from "@/components/global/loader/spinner";
import React from "react";

const WebsiteLoading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50">
      <Spinner size={75} color="#000000" />
    </div>
  );
};

export default WebsiteLoading;
