import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

/**
 * Check if the current user is an administrator
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  try {
    const user = await currentUser();
    if (!user) return false;

    const dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
      select: { isAdmin: true },
    });

    return dbUser?.isAdmin || false;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

/**
 * Check if a specific user is an administrator by their ID
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const dbUser = await client.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true },
    });

    return dbUser?.isAdmin || false;
  } catch (error) {
    console.error("Error checking admin status for user:", error);
    return false;
  }
}

/**
 * Check if a specific user is an administrator by their clerk ID
 */
export async function isUserAdminByClerkId(clerkId: string): Promise<boolean> {
  try {
    const dbUser = await client.user.findUnique({
      where: { clerkid: clerkId },
      select: { isAdmin: true },
    });

    return dbUser?.isAdmin || false;
  } catch (error) {
    console.error("Error checking admin status for clerk user:", error);
    return false;
  }
}

/**
 * Middleware function to ensure only admins can access certain routes
 */
export async function requireAdmin() {
  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    throw new Error("Admin access required");
  }
  return true;
}

/**
 * Get current user with admin status check
 */
export async function getCurrentUserWithAdmin() {
  const user = await currentUser();
  if (!user) return null;

  const dbUser = await client.user.findUnique({
    where: { clerkid: user.id },
    select: {
      id: true,
      username: true,
      displayName: true,
      email: true,
      isAdmin: true,
      image: true,
    },
  });

  return dbUser;
}
