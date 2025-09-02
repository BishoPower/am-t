import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// Utility to update user's last activity (for online status tracking)
export async function updateUserActivity() {
  try {
    const user = await currentUser();
    if (!user) return;

    await client.user.update({
      where: { clerkid: user.id },
      data: { updatedAt: new Date() },
    });
  } catch (error) {
    // Silently fail - this is just for activity tracking
    console.error("Failed to update user activity:", error);
  }
}

// Utility to check if a user's profile is accessible to the current user
export async function checkProfileAccess(targetUsername: string) {
  const user = await currentUser();

  const targetUser = await client.user.findUnique({
    where: { username: targetUsername },
    select: {
      id: true,
      profileVisibility: true,
      clerkid: true,
    },
  });

  if (!targetUser) {
    return { accessible: false, reason: "User not found" };
  }

  // If viewer is the owner, always accessible
  if (user && targetUser.clerkid === user.id) {
    return { accessible: true };
  }

  // Check profile visibility
  if (targetUser.profileVisibility === "PRIVATE") {
    return { accessible: false, reason: "Profile is private" };
  }

  // For FRIENDS_ONLY, check if they are friends
  if (targetUser.profileVisibility === "FRIENDS_ONLY") {
    if (!user) {
      return {
        accessible: false,
        reason: "Login required to view this profile",
      };
    }

    const currentDbUser = await client.user.findUnique({
      where: { clerkid: user.id },
      select: { id: true },
    });

    if (!currentDbUser) {
      return { accessible: false, reason: "User not found" };
    }

    // Check if there's an accepted friendship between the users
    const friendship = await client.friendship.findFirst({
      where: {
        OR: [
          {
            requesterId: currentDbUser.id,
            receiverId: targetUser.id,
            status: "ACCEPTED",
          },
          {
            requesterId: targetUser.id,
            receiverId: currentDbUser.id,
            status: "ACCEPTED",
          },
        ],
      },
    });

    if (!friendship) {
      return {
        accessible: false,
        reason: "Profile is only visible to friends",
      };
    }
  }

  return { accessible: true };
}

// Utility to check if a user allows direct messages
export async function checkMessagePermission(targetUserId: string) {
  const user = await currentUser();
  if (!user) return { allowed: false, reason: "Not authenticated" };

  const currentDbUser = await client.user.findUnique({
    where: { clerkid: user.id },
    select: { id: true },
  });

  if (!currentDbUser) {
    return { allowed: false, reason: "User not found" };
  }

  const targetUser = await client.user.findUnique({
    where: { id: targetUserId },
    select: {
      allowDirectMessages: true,
    },
  });

  if (!targetUser) {
    return { allowed: false, reason: "Target user not found" };
  }

  if (!targetUser.allowDirectMessages) {
    return { allowed: false, reason: "User does not accept direct messages" };
  }

  // Check if users have blocked each other
  const blockExists = await client.blockedUser.findFirst({
    where: {
      OR: [
        { blockerId: currentDbUser.id, blockedId: targetUserId },
        { blockerId: targetUserId, blockedId: currentDbUser.id },
      ],
    },
  });

  if (blockExists) {
    return { allowed: false, reason: "Users have blocked each other" };
  }

  return { allowed: true };
}

// Utility to check if two users are friends
export async function areUsersFriends(
  userId1: string,
  userId2: string
): Promise<boolean> {
  if (userId1 === userId2) return false; // Users can't be friends with themselves

  const friendship = await client.friendship.findFirst({
    where: {
      OR: [
        {
          requesterId: userId1,
          receiverId: userId2,
          status: "ACCEPTED",
        },
        {
          requesterId: userId2,
          receiverId: userId1,
          status: "ACCEPTED",
        },
      ],
    },
  });

  return !!friendship;
}

// Utility to get friendship status between current user and target user
export async function getFriendshipStatus(targetUserId: string) {
  const user = await currentUser();
  if (!user) return null;

  const currentDbUser = await client.user.findUnique({
    where: { clerkid: user.id },
    select: { id: true },
  });

  if (!currentDbUser) return null;

  const friendship = await client.friendship.findFirst({
    where: {
      OR: [
        { requesterId: currentDbUser.id, receiverId: targetUserId },
        { requesterId: targetUserId, receiverId: currentDbUser.id },
      ],
    },
    select: {
      id: true,
      status: true,
      requesterId: true,
      receiverId: true,
    },
  });

  if (!friendship) return { status: "none" };

  return {
    status: friendship.status.toLowerCase(),
    friendshipId: friendship.id,
    isRequester: friendship.requesterId === currentDbUser.id,
  };
}
