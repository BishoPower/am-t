import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the user in our database
    const dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch user's active listings
    const listings = await client.listing.findMany({
      where: {
        userId: dbUser.id,
        status: "ACTIVE",
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
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
