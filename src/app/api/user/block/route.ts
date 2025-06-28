import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

// POST /api/user/block - Block a user
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId: userIdToBlock } = await request.json();

    if (!userIdToBlock) {
      return NextResponse.json(
        { error: "User ID to block is required" },
        { status: 400 }
      );
    } // Get current user from database
    const currentUser = await client.user.findUnique({
      where: { clerkid: userId },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prevent self-blocking
    if (currentUser.id === userIdToBlock) {
      return NextResponse.json(
        { error: "Cannot block yourself" },
        { status: 400 }
      );
    }

    // Check if user to block exists
    const userToBlock = await client.user.findUnique({
      where: { id: userIdToBlock },
    });

    if (!userToBlock) {
      return NextResponse.json(
        { error: "User to block not found" },
        { status: 404 }
      );
    }

    // Check if already blocked
    const existingBlock = await client.blockedUser.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: currentUser.id,
          blockedId: userIdToBlock,
        },
      },
    });

    if (existingBlock) {
      return NextResponse.json(
        { error: "User is already blocked" },
        { status: 400 }
      );
    }

    // Create block relationship
    const block = await client.blockedUser.create({
      data: {
        blockerId: currentUser.id,
        blockedId: userIdToBlock,
      },
      include: {
        blocked: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "User blocked successfully",
      block,
    });
  } catch (error) {
    console.error("Error blocking user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/user/block - Unblock a user
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId: userIdToUnblock } = await request.json();

    if (!userIdToUnblock) {
      return NextResponse.json(
        { error: "User ID to unblock is required" },
        { status: 400 }
      );
    }

    // Get current user from database
    const currentUser = await client.user.findUnique({
      where: { clerkid: userId },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find and delete the block relationship
    const deletedBlock = await client.blockedUser.delete({
      where: {
        blockerId_blockedId: {
          blockerId: currentUser.id,
          blockedId: userIdToUnblock,
        },
      },
    });

    return NextResponse.json({
      message: "User unblocked successfully",
      deletedBlock,
    });
  } catch (error) {
    console.error("Error unblocking user:", error);
    if (error instanceof Error && (error as any).code === "P2025") {
      return NextResponse.json(
        { error: "Block relationship not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
