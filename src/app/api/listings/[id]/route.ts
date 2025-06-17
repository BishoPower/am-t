import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client as prisma } from "@/lib/prisma";

// GET - Fetch a specific listing
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        tags: true,
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Get listing error:", error);
    return NextResponse.json(
      { error: "Failed to fetch listing" },
      { status: 500 }
    );
  }
}

// PUT - Update a specific listing
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, description, imageUrls, tags, isPrivate } = body;

    // Find user by clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkid: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if listing exists and user owns it
    const existingListing = await prisma.listing.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!existingListing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    if (existingListing.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Validation
    if (!title || !description || !imageUrls || imageUrls.length === 0) {
      return NextResponse.json(
        { error: "Title, description, and at least one image are required" },
        { status: 400 }
      );
    }

    // First, disconnect all existing tags
    await prisma.listing.update({
      where: { id },
      data: {
        tags: {
          set: [], // This disconnects all tags
        },
      },
    });

    // Then update the listing with new data
    const updatedListing = await prisma.listing.update({
      where: { id },
      data: {
        title,
        description,
        imageUrls,
        isPrivate: isPrivate || false,
        tags: {
          connectOrCreate:
            tags?.map((tagName: string) => ({
              where: { name: tagName.toLowerCase() },
              create: { name: tagName.toLowerCase() },
            })) || [],
        },
      },
      include: {
        tags: true,
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(updatedListing);
  } catch (error) {
    console.error("Update listing error:", error);
    return NextResponse.json(
      { error: "Failed to update listing" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specific listing
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Find user by clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkid: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if listing exists and user owns it
    const existingListing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!existingListing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    if (existingListing.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete the listing (this will cascade delete related records like favorites)
    await prisma.listing.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Delete listing error:", error);
    return NextResponse.json(
      { error: "Failed to delete listing" },
      { status: 500 }
    );
  }
}
