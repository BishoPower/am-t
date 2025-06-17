import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
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
