import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

// GET - Get current privacy settings
export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
      select: {
        profileVisibility: true,
        allowDirectMessages: true,
        showTradingHistory: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(dbUser);
  } catch (error) {
    console.error("Error fetching privacy settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch privacy settings" },
      { status: 500 }
    );
  }
}

// PUT - Update privacy settings
export async function PUT(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { profileVisibility, allowDirectMessages, showTradingHistory } = body;

    // Validate profile visibility
    const validVisibilities = ["PUBLIC", "PRIVATE", "FRIENDS_ONLY"];
    if (profileVisibility && !validVisibilities.includes(profileVisibility)) {
      return NextResponse.json(
        { error: "Invalid profile visibility value" },
        { status: 400 }
      );
    }

    const updatedUser = await client.user.update({
      where: { clerkid: user.id },
      data: {
        ...(profileVisibility && { profileVisibility }),
        ...(typeof allowDirectMessages === "boolean" && {
          allowDirectMessages,
        }),
        ...(typeof showTradingHistory === "boolean" && { showTradingHistory }),
      },
      select: {
        profileVisibility: true,
        allowDirectMessages: true,
        showTradingHistory: true,
      },
    });

    return NextResponse.json({
      message: "Privacy settings updated successfully",
      settings: updatedUser,
    });
  } catch (error) {
    console.error("Error updating privacy settings:", error);
    return NextResponse.json(
      { error: "Failed to update privacy settings" },
      { status: 500 }
    );
  }
}
