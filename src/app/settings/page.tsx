import { onAuthenticatedUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const SettingsPage = async (props: Props) => {
  //Authentication
  const auth = await onAuthenticatedUser();

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/settings/${auth.user?.username}`);
  }

  if (auth.status === 400 || auth.status === 500 || auth.status === 404)
    return redirect("/auth/sign-in");
};

export default SettingsPage;
