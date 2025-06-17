import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const otherUserId = params.userId;

    // Get current user
    const currentUser = await client.user.findUnique({
      where: { clerkid: clerkId },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Mark all messages from the other user as read
    await client.message.updateMany({
      where: {
        fromId: otherUserId,
        toId: currentUser.id,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    return NextResponse.json(
      { error: "Failed to mark messages as read" },
      { status: 500 }
    );
  }
}
