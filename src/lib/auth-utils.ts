import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

/**
 * Checks if the current user is viewing their own profile
 */
export async function isOwnProfile(username: string) {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  // Get the profile user's Clerk ID
  const profileUser = await db.user.findUnique({
    where: { username },
    select: { clerkid: true },
  });

  if (!profileUser) {
    return false;
  }

  // Check if the current user's Clerk ID matches the profile user's Clerk ID
  return profileUser.clerkid === userId;
}

/**
 * Gets the current user's database record
 */
export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { clerkid: userId },
  });

  return user;
}

/**
 * Gets the current user's id if authenticated
 */
export async function getCurrentUserId() {
  const user = await getCurrentUser();
  return user?.id || null;
}
