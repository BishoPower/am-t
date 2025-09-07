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

    // Unban the user
    const unbannedUser = await client.user.update({
      where: { id: targetUserId },
      data: {
        isBanned: false,
        banReason: null,
        bannedAt: null,
        bannedBy: null,
        banExpiresAt: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User unbanned successfully",
      user: unbannedUser,
    });
  } catch (error) {
    console.error("Error unbanning user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
