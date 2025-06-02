import Spinner from "@/components/global/loader/spinner";
import React from "react";

type Props = {};

const AuthLoading = (props: Props) => {
  return (
    <div
      className="flex h-screen w-full justify-center 
    items-center justify-center"
    >
      <Spinner size={150} />
    </div>
  );
};

export default AuthLoading;
