import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await params;

    const user = await client.user.findUnique({
      where: { id: userId },
      select: {
        updatedAt: true, // Use this as a simple "last seen" indicator
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Simple online logic: if user was updated in the last 5 minutes, consider them online
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const isOnline = user.updatedAt > fiveMinutesAgo;

    return NextResponse.json({
      isOnline,
    });
  } catch (error) {
    console.error("Error checking online status:", error);
    return NextResponse.json(
      { error: "Failed to check online status" },
      { status: 500 }
    );
  }
}
