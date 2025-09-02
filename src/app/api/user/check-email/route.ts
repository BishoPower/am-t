import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get what's in our database
    const dbUser = await client.user.findUnique({
      where: { clerkid: clerkId },
      select: { email: true, clerkid: true },
    });

    return NextResponse.json({
      clerkId,
      databaseEmail: dbUser?.email,
      message:
        "Check your Clerk dashboard for the original email, then use /api/user/revert-email to fix it",
    });
  } catch (error) {
    console.error("Error checking email status:", error);
    return NextResponse.json(
      { error: "Failed to check email status" },
      { status: 500 }
    );
  }
}
