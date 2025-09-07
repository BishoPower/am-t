import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get user from database
    const dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
      select: {
        id: true,
        username: true,
        displayName: true,
        isAdmin: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      clerkId: user.id,
      username: dbUser.username,
      displayName: dbUser.displayName,
      isAdmin: dbUser.isAdmin,
      debug: {
        clerkUser: {
          id: user.id,
          emailAddress: user.emailAddresses[0]?.emailAddress,
          username: user.username,
        },
        dbUser: dbUser,
      },
    });
  } catch (error) {
    console.error("Error checking admin status:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
