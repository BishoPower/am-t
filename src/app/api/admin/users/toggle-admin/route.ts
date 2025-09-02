import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";
import { isCurrentUserAdmin } from "@/lib/admin-utils";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if the current user is an admin
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const { userId, makeAdmin } = await request.json();

    if (!userId || typeof makeAdmin !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Check if target user exists
    const targetUser = await client.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, isAdmin: true },
    });

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prevent removing admin privileges from yourself
    const currentDbUser = await client.user.findUnique({
      where: { clerkid: user.id },
      select: { id: true },
    });

    if (currentDbUser?.id === userId && !makeAdmin) {
      return NextResponse.json(
        { error: "Cannot remove admin privileges from yourself" },
        { status: 400 }
      );
    }

    // Update the user's admin status
    const updatedUser = await client.user.update({
      where: { id: userId },
      data: { isAdmin: makeAdmin },
      select: {
        id: true,
        username: true,
        displayName: true,
        isAdmin: true,
      },
    });

    return NextResponse.json({
      message: `User ${
        makeAdmin ? "granted" : "removed from"
      } admin privileges`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error toggling admin status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
