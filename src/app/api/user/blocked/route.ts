import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

// GET /api/user/blocked - Get list of blocked users
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current user from database
    const currentUser = await client.user.findUnique({
      where: { clerkid: userId },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get all blocked users
    const blockedUsers = await client.blockedUser.findMany({
      where: {
        blockerId: currentUser.id,
      },
      include: {
        blocked: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            image: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      blockedUsers: blockedUsers.map((block) => ({
        id: block.id,
        blockedAt: block.createdAt,
        user: block.blocked,
      })),
    });
  } catch (error) {
    console.error("Error fetching blocked users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
