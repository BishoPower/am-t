import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-utils";

// PATCH /api/admin/editorials/[username]/[slug]/staff-pick - Toggle staff pick status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { username: string; slug: string } }
) {
  try {
    // Check admin permissions
    await requireAdmin();

    const { isStaffPicked } = await request.json();

    if (typeof isStaffPicked !== "boolean") {
      return NextResponse.json(
        { error: "isStaffPicked must be a boolean" },
        { status: 400 }
      );
    }

    // Find the editorial
    const editorial = await client.editorial.findFirst({
      where: {
        slug: params.slug,
        author: {
          username: params.username,
        },
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            image: true,
          },
        },
      },
    });

    if (!editorial) {
      return NextResponse.json(
        { error: "Editorial not found" },
        { status: 404 }
      );
    }

    // Update staff pick status
    const updatedEditorial = await client.editorial.update({
      where: { id: editorial.id },
      data: { isStaffPicked },
      include: {
        author: {
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
      message: `Editorial ${
        isStaffPicked ? "added to" : "removed from"
      } staff picks`,
      editorial: updatedEditorial,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Admin access required") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    console.error("Error updating staff pick status:", error);
    return NextResponse.json(
      { error: "Failed to update staff pick status" },
      { status: 500 }
    );
  }
}
