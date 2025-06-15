import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp
      routing="path"
      path="/auth/sign-up"
      signInUrl="/auth/sign-in"
      redirectUrl="/auth/callback"
      afterSignUpUrl="/auth/callback"
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-black hover:bg-gray-800 text-white transition-colors",
          footerActionLink: "text-black hover:text-gray-700",
        },
      }}
    />
  );
}
