import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";

export async function GET() {
  try {
    // Get basic user statistics
    const totalUsers = await client.user.count();
    const adminUsers = await client.user.count({ where: { isAdmin: true } });
    const bannedUsers = await client.user.count({ where: { isBanned: true } });
    const regularUsers = await client.user.count({
      where: {
        isAdmin: false,
        isBanned: false,
      },
    });

    // Get a sample of users to verify fields exist
    const sampleUsers = await client.user.findMany({
      take: 5,
      select: {
        id: true,
        username: true,
        isAdmin: true,
        isBanned: true,
        banReason: true,
        bannedAt: true,
        banExpiresAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      statistics: {
        totalUsers,
        adminUsers,
        bannedUsers,
        regularUsers,
      },
      sampleUsers,
      message: "Database and admin panel are working correctly!",
    });
  } catch (error) {
    console.error("Database test error:", error);
    return NextResponse.json(
      {
        error: "Database test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
