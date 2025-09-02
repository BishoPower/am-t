import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";
import { FriendshipStatus } from "@/generated/prisma";

// PUT /api/friends/[id] - Accept or reject friend request
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await request.json(); // 'accept' or 'reject'
    const friendshipId = params.id;

    if (!action || !["accept", "reject"].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "accept" or "reject"' },
        { status: 400 }
      );
    }

    // Get current user
    const dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get friendship
    const friendship = await client.friendship.findUnique({
      where: { id: friendshipId },
      include: {
        requester: {
          select: {
            id: true,
            username: true,
            displayName: true,
            image: true,
          },
        },
        receiver: {
          select: {
            id: true,
            username: true,
            displayName: true,
            image: true,
          },
        },
      },
    });

    if (!friendship) {
      return NextResponse.json(
        { error: "Friendship not found" },
        { status: 404 }
      );
    }

    // Only the receiver can accept/reject a pending request
    if (friendship.receiverId !== dbUser.id) {
      return NextResponse.json(
        { error: "You can only respond to friend requests sent to you" },
        { status: 403 }
      );
    }

    // Can only respond to pending requests
    if (friendship.status !== FriendshipStatus.PENDING) {
      return NextResponse.json(
        { error: "This friend request has already been responded to" },
        { status: 400 }
      );
    }

    // Update friendship status
    const newStatus =
      action === "accept"
        ? FriendshipStatus.ACCEPTED
        : FriendshipStatus.REJECTED;

    const updatedFriendship = await client.friendship.update({
      where: { id: friendshipId },
      data: { status: newStatus },
      include: {
        requester: {
          select: {
            id: true,
            username: true,
            displayName: true,
            image: true,
          },
        },
        receiver: {
          select: {
            id: true,
            username: true,
            displayName: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ friendship: updatedFriendship });
  } catch (error) {
    console.error("Error updating friendship:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/friends/[id] - Remove friend or cancel friend request
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const friendshipId = params.id;

    // Get current user
    const dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get friendship
    const friendship = await client.friendship.findUnique({
      where: { id: friendshipId },
    });

    if (!friendship) {
      return NextResponse.json(
        { error: "Friendship not found" },
        { status: 404 }
      );
    }

    // User must be either the requester or receiver
    if (
      friendship.requesterId !== dbUser.id &&
      friendship.receiverId !== dbUser.id
    ) {
      return NextResponse.json(
        { error: "You are not authorized to delete this friendship" },
        { status: 403 }
      );
    }

    // Delete the friendship
    await client.friendship.delete({
      where: { id: friendshipId },
    });

    return NextResponse.json({ message: "Friendship removed successfully" });
  } catch (error) {
    console.error("Error deleting friendship:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
