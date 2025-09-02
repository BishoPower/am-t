import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-utils";

// GET /api/admin/dashboard - Get admin dashboard statistics
export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const [
      totalUsers,
      totalAdmins,
      totalListings,
      totalEditorials,
      staffPickedEditorials,
      recentUsers,
      recentListings,
      recentEditorials,
    ] = await Promise.all([
      // User stats
      client.user.count(),
      client.user.count({ where: { isAdmin: true } }),

      // Content stats
      client.listing.count(),
      client.editorial.count(),
      client.editorial.count({ where: { isStaffPicked: true } }),

      // Recent activity
      client.user.findMany({
        select: {
          id: true,
          username: true,
          displayName: true,
          image: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),

      client.listing.findMany({
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
          user: {
            select: {
              username: true,
              displayName: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),

      client.editorial.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          isStaffPicked: true,
          published: true,
          createdAt: true,
          author: {
            select: {
              username: true,
              displayName: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      stats: {
        users: {
          total: totalUsers,
          admins: totalAdmins,
          regular: totalUsers - totalAdmins,
        },
        content: {
          listings: totalListings,
          editorials: totalEditorials,
          staffPickedEditorials,
        },
      },
      recentActivity: {
        users: recentUsers,
        listings: recentListings,
        editorials: recentEditorials,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Admin access required") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
