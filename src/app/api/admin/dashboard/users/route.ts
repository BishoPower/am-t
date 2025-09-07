import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-utils";

// GET /api/admin/dashboard/users - Get all users for dashboard (admin only)
export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    // Get all users with their counts for the admin dashboard
    const users = await client.user.findMany({
      select: {
        id: true,
        username: true,
        displayName: true,
        clerkid: true,
        isAdmin: true,
        isBanned: true,
        banReason: true,
        bannedAt: true,
        banExpiresAt: true,
        createdAt: true,
        _count: {
          select: {
            listings: true,
            editorials: true,
            tradeRequestsSent: true,
            tradeRequestsReceived: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform the data to match our interface
    const transformedUsers = users.map((user) => ({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      clerkId: user.clerkid,
      isAdmin: user.isAdmin,
      isBanned: user.isBanned,
      banReason: user.banReason,
      bannedAt: user.bannedAt?.toISOString(),
      banExpiresAt: user.banExpiresAt?.toISOString(),
      createdAt: user.createdAt.toISOString(),
      _count: {
        listings: user._count.listings,
        editorials: user._count.editorials,
        trades:
          user._count.tradeRequestsSent + user._count.tradeRequestsReceived,
      },
    }));

    return NextResponse.json({
      success: true,
      users: transformedUsers,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Admin access required") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    console.error("Error fetching dashboard users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
