import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";

// API endpoint to automatically unban expired bans
export async function POST(request: NextRequest) {
  try {
    // Find all users with expired bans
    const now = new Date();
    const expiredBans = await client.user.findMany({
      where: {
        isBanned: true,
        banExpiresAt: {
          lte: now,
          not: null,
        },
      },
    });

    if (expiredBans.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No expired bans found",
        unbannedCount: 0,
      });
    }

    // Unban all users with expired bans
    const unbannedUsers = await client.user.updateMany({
      where: {
        isBanned: true,
        banExpiresAt: {
          lte: now,
          not: null,
        },
      },
      data: {
        isBanned: false,
        banReason: null,
        bannedAt: null,
        bannedBy: null,
        banExpiresAt: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: `${unbannedUsers.count} users automatically unbanned`,
      unbannedCount: unbannedUsers.count,
    });
  } catch (error) {
    console.error("Error processing expired bans:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Cron job handler (can be called by external cron service)
export async function GET(request: NextRequest) {
  // This endpoint can be called by external cron services like Vercel Cron
  // or GitHub Actions to automatically process expired bans

  // Verify authorization header for security
  const authHeader = request.headers.get("authorization");
  const expectedAuth = process.env.CRON_SECRET;

  if (expectedAuth && authHeader !== `Bearer ${expectedAuth}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return POST(request);
}
