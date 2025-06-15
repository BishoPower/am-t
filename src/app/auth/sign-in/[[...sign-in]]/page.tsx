import React from "react";
import { SignIn } from "@clerk/nextjs";

type Props = {};

const SignInPage = (props: Props) => {
  return (
    <SignIn
      routing="path"
      path="/auth/sign-in"
      signUpUrl="/auth/sign-up"
      redirectUrl="/auth/callback"
      afterSignInUrl="/auth/callback"
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-black hover:bg-gray-800 text-white transition-colors",
          footerActionLink: "text-black hover:text-gray-700",
        },
      }}
    />
  );
};

export default SignInPage;
