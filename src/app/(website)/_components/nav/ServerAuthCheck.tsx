import { auth } from "@clerk/nextjs/server";

export async function getServerAuthStatus() {
  const { userId } = await auth();
  return {
    isSignedIn: !!userId,
    userId,
  };
}
