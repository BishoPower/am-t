import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if the user is an admin
    const adminUser = await client.user.findUnique({
      where: { clerkid: userId },
      select: { isAdmin: true },
    });

    if (!adminUser?.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { userId: targetUserId } = await request.json();

    if (!targetUserId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Delete all content created by the user
    await client.$transaction(async (tx) => {
      // Delete user's reviews
      await tx.review.deleteMany({
        where: { reviewerId: targetUserId },
      });

      // Delete user's listings
      await tx.listing.deleteMany({
        where: { userId: targetUserId },
      });

      // Delete user's editorials
      await tx.editorial.deleteMany({
        where: { userId: targetUserId },
      });

      // Delete user's messages
      await tx.message.deleteMany({
        where: { senderId: targetUserId },
      });

      // Delete user's trades (where they are either buyer or seller)
      await tx.trade.deleteMany({
        where: {
          OR: [{ buyerId: targetUserId }, { sellerId: targetUserId }],
        },
      });

      // Delete user's friendships
      await tx.friendship.deleteMany({
        where: {
          OR: [{ userId: targetUserId }, { friendId: targetUserId }],
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "All user content deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user content:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
