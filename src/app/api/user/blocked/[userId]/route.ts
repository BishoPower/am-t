import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

// GET /api/user/blocked/[userId] - Check if a user is blocked
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const targetUserId = params.userId;

    // Get current user from database
    const currentUser = await client.user.findUnique({
      where: { clerkid: userId },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if current user has blocked the target user
    const isBlocked = await client.blockedUser.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: currentUser.id,
          blockedId: targetUserId,
        },
      },
    });

    // Check if current user is blocked by the target user
    const isBlockedBy = await client.blockedUser.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: targetUserId,
          blockedId: currentUser.id,
        },
      },
    });

    return NextResponse.json({
      isBlocked: !!isBlocked,
      isBlockedBy: !!isBlockedBy,
      canInteract: !isBlocked && !isBlockedBy,
    });
  } catch (error) {
    console.error("Error checking block status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
