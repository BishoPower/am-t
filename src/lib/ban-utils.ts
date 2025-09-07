import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export interface BanStatus {
  isBanned: boolean;
  banReason?: string;
  bannedAt?: Date;
  banExpiresAt?: Date;
  isExpired?: boolean;
}

/**
 * Check if a user is currently banned
 * @param userId - The user's database ID (optional, will use current user if not provided)
 * @returns BanStatus object with ban information
 */
export async function checkUserBanStatus(userId?: string): Promise<BanStatus> {
  try {
    let targetUserId = userId;

    if (!targetUserId) {
      const { userId: clerkUserId } = await auth();
      if (!clerkUserId) {
        return { isBanned: false };
      }

      const user = await client.user.findUnique({
        where: { clerkid: clerkUserId },
        select: { id: true },
      });

      if (!user) {
        return { isBanned: false };
      }

      targetUserId = user.id;
    }

    const user = await client.user.findUnique({
      where: { id: targetUserId },
      select: {
        isBanned: true,
        banReason: true,
        bannedAt: true,
        banExpiresAt: true,
      },
    });

    if (!user || !user.isBanned) {
      return { isBanned: false };
    }

    // Check if ban has expired
    const now = new Date();
    const isExpired = user.banExpiresAt && user.banExpiresAt <= now;

    if (isExpired) {
      // Automatically unban the user
      await client.user.update({
        where: { id: targetUserId },
        data: {
          isBanned: false,
          banReason: null,
          bannedAt: null,
          bannedBy: null,
          banExpiresAt: null,
        },
      });

      return {
        isBanned: false,
        isExpired: true,
      };
    }

    return {
      isBanned: true,
      banReason: user.banReason || undefined,
      bannedAt: user.bannedAt || undefined,
      banExpiresAt: user.banExpiresAt || undefined,
    };
  } catch (error) {
    console.error("Error checking ban status:", error);
    return { isBanned: false };
  }
}

/**
 * Middleware function to check if current user is banned
 * Throws an error if user is banned
 */
export async function requireNotBanned(): Promise<void> {
  const banStatus = await checkUserBanStatus();

  if (banStatus.isBanned) {
    const message = banStatus.banReason
      ? `You are banned: ${banStatus.banReason}`
      : "Your account has been banned from this platform";

    throw new Error(message);
  }
}

/**
 * Get ban information for display purposes
 */
export async function getBanInfo(userId?: string): Promise<BanStatus> {
  return checkUserBanStatus(userId);
}
