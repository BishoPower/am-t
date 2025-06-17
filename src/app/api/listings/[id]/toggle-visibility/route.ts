import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client as prisma } from "@/lib/prisma";

export async function PATCH(
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

    // Toggle the visibility
    const updatedListing = await prisma.listing.update({
      where: { id },
      data: {
        isPrivate: !existingListing.isPrivate,
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
    console.error("Toggle visibility error:", error);
    return NextResponse.json(
      { error: "Failed to toggle visibility" },
      { status: 500 }
    );
  }
}
