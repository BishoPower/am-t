import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: currentUserId } = await auth();
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // If user is authenticated, check for blocks
    if (currentUserId && currentUserId !== userId) {
      const currentDbUser = await client.user.findUnique({
        where: { clerkid: currentUserId },
        select: { id: true },
      });

      if (currentDbUser) {
        // Check if either user has blocked the other
        const blockExists = await client.blockedUser.findFirst({
          where: {
            OR: [
              { blockerId: currentDbUser.id, blockedId: userId },
              { blockerId: userId, blockedId: currentDbUser.id },
            ],
          },
        });

        if (blockExists) {
          return NextResponse.json([], { status: 200 }); // Return empty array for blocked users
        }
      }
    }

    // Fetch user's active public listings
    const listings = await client.listing.findMany({
      where: {
        userId: userId,
        status: "ACTIVE",
        isPrivate: false, // Only public listings for counter trades
      },
      include: {
        tags: true,
        user: {
          select: {
            id: true,
            username: true,
            image: true,
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: { favorites: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error("Error fetching user listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch user listings" },
      { status: 500 }
    );
  }
}
