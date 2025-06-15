import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: listingId } = await params;

    // Get the user's database ID
    const user = await db.user.findUnique({
      where: { clerkid: clerkId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if listing exists
    const listing = await db.listing.findUnique({
      where: { id: listingId },
      select: { id: true },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Check if already favorited
    const existingFavorite = await db.favorite.findFirst({
      where: {
        userId: user.id,
        listingId: listingId,
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: "Listing already favorited" },
        { status: 400 }
      );
    }

    // Create favorite
    await db.favorite.create({
      data: {
        userId: user.id,
        listingId: listingId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error favoriting listing:", error);
    return NextResponse.json(
      { error: "Failed to favorite listing" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: listingId } = await params;

    // Get the user's database ID
    const user = await db.user.findUnique({
      where: { clerkid: clerkId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove favorite
    await db.favorite.deleteMany({
      where: {
        userId: user.id,
        listingId: listingId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error unfavoriting listing:", error);
    return NextResponse.json(
      { error: "Failed to unfavorite listing" },
      { status: 500 }
    );
  }
}
