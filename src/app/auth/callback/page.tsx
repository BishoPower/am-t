import { onAuthenticatedUser } from "@/actions/user";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  const auth = await onAuthenticatedUser();

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/profile/${auth.user?.username}`);
  }

  if (auth.status === 403 || auth.status === 400 || auth.status === 500)
    return redirect("/auth/sign-in");
};

export default AuthCallbackPage;
