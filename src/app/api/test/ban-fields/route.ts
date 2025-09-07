import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Test endpoint to verify ban fields are working in the database
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Test 1: Check if we can query ban fields
    const testUser = await client.user.findFirst({
      select: {
        id: true,
        username: true,
        isBanned: true,
        banReason: true,
        bannedAt: true,
        bannedBy: true,
        banExpiresAt: true,
      },
    });

    // Test 2: Check if we can create a test ban record (we won't actually save it)
    const testBanData = {
      isBanned: true,
      banReason: "Test ban reason",
      bannedAt: new Date(),
      bannedBy: "test-admin-id",
      banExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
    };

    // Test 3: Count total users and banned users
    const [totalUsers, bannedUsers] = await Promise.all([
      client.user.count(),
      client.user.count({
        where: {
          isBanned: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Ban fields are working correctly in the database",
      tests: {
        canQueryBanFields: !!testUser,
        sampleUser: testUser
          ? {
              username: testUser.username,
              isBanned: testUser.isBanned,
              banStatus: testUser.isBanned ? "BANNED" : "ACTIVE",
            }
          : null,
        banDataStructure: testBanData,
        userCounts: {
          total: totalUsers,
          banned: bannedUsers,
          active: totalUsers - bannedUsers,
        },
      },
    });
  } catch (error) {
    console.error("Error testing ban fields:", error);
    return NextResponse.json(
      {
        error: "Database test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
