import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-utils";

// DELETE /api/admin/listings/[id] - Delete any listing (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const listing = await client.listing.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            username: true,
            displayName: true,
          },
        },
      },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    await client.listing.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "Listing deleted successfully",
      deletedListing: {
        id: listing.id,
        title: listing.title,
        user: listing.user,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Admin access required") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    console.error("Error deleting listing:", error);
    return NextResponse.json(
      { error: "Failed to delete listing" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/listings/[id] - Update any listing (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const { title, description, status, isPrivate } = await request.json();

    const listing = await client.listing.findUnique({
      where: { id: params.id },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    const updatedListing = await client.listing.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status: status.toUpperCase() }),
        ...(isPrivate !== undefined && { isPrivate }),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Listing updated successfully",
      listing: updatedListing,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Admin access required") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    console.error("Error updating listing:", error);
    return NextResponse.json(
      { error: "Failed to update listing" },
      { status: 500 }
    );
  }
}
