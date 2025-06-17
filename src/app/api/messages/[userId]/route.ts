import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const otherUserId = params?.userId;

    if (!otherUserId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Find the current user in our database
    const currentDbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!currentDbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify the other user exists
    const otherUser = await client.user.findUnique({
      where: { id: otherUserId },
    });

    if (!otherUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get all messages between these two users
    const messages = await client.message.findMany({
      where: {
        OR: [
          { fromId: currentDbUser.id, toId: otherUserId },
          { fromId: otherUserId, toId: currentDbUser.id },
        ],
      },
      include: {
        from: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
        to: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
        listing: {
          select: {
            id: true,
            title: true,
            imageUrls: true,
          },
        },
      },
      orderBy: { timestamp: "asc" },
    });

    // Mark messages as read (this is a simple implementation - in production you might want a separate read status)
    // For now, we'll just return the messages

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
