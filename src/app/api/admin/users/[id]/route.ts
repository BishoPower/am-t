import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-utils";

// GET /api/admin/users/[id] - Get specific user details (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const user = await client.user.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            listings: true,
            editorials: true,
            reviewsReceived: true,
            reviewsGiven: true,
            messagesFrom: true,
            messagesTo: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof Error && error.message === "Admin access required") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/users/[id] - Update user (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const {
      username,
      email,
      displayName,
      firstName,
      lastName,
      image,
      bio,
      location,
      isAdmin,
      profileVisibility,
      allowDirectMessages,
      showTradingHistory,
    } = await request.json();

    // Check if user exists
    const existingUser = await client.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If changing username or email, check for uniqueness
    if (username && username !== existingUser.username) {
      const usernameExists = await client.user.findUnique({
        where: { username },
      });
      if (usernameExists) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 400 }
        );
      }
    }

    if (email && email !== existingUser.email) {
      const emailExists = await client.user.findUnique({
        where: { email },
      });
      if (emailExists) {
        return NextResponse.json(
          { error: "Email already taken" },
          { status: 400 }
        );
      }
    }

    const updatedUser = await client.user.update({
      where: { id: params.id },
      data: {
        ...(username && { username }),
        ...(email && { email }),
        ...(displayName !== undefined && { displayName }),
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        ...(image !== undefined && { image }),
        ...(bio !== undefined && { bio }),
        ...(location !== undefined && { location }),
        ...(isAdmin !== undefined && { isAdmin }),
        ...(profileVisibility && { profileVisibility }),
        ...(allowDirectMessages !== undefined && { allowDirectMessages }),
        ...(showTradingHistory !== undefined && { showTradingHistory }),
      },
    });

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Admin access required") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete user (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const user = await client.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete user and all related data (CASCADE should handle most of this)
    await client.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Admin access required") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
