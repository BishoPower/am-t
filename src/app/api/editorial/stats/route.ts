import { NextResponse } from "next/server";
import { client } from "@/lib/prisma";

export async function GET() {
  try {
    // Get trending tags - most used tags across all listings
    const trendingTags = await client.tag.findMany({
      include: {
        _count: {
          select: {
            listings: true,
          },
        },
      },
      orderBy: {
        listings: {
          _count: "desc",
        },
      },
      take: 10,
    }); // Get total user count (all registered users)
    const totalUsers = await client.user.count();

    // Get active user count (users who have created listings or sent messages in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeUsersFromListings = await client.user.findMany({
      where: {
        listings: {
          some: {
            createdAt: {
              gte: thirtyDaysAgo,
            },
          },
        },
      },
      select: { id: true },
    });

    const activeUsersFromMessages = await client.user.findMany({
      where: {
        sentMessages: {
          some: {
            createdAt: {
              gte: thirtyDaysAgo,
            },
          },
        },
      },
      select: { id: true },
    });

    // Combine and deduplicate active users
    const allActiveUserIds = [
      ...activeUsersFromListings.map((u) => u.id),
      ...activeUsersFromMessages.map((u) => u.id),
    ];
    const uniqueActiveUsers = [...new Set(allActiveUserIds)];

    // Get total trades completed (accepted trade requests)
    const completedTrades = await client.tradeRequest.count({
      where: {
        status: "ACCEPTED",
      },
    });

    // Get trades completed today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tradesToday = await client.tradeRequest.count({
      where: {
        status: "ACCEPTED",
        updatedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Get new listings today
    const newListingsToday = await client.listing.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Get total active listings
    const activeListings = await client.listing.count({
      where: {
        status: "ACTIVE",
      },
    });

    // Calculate average trade value (this is conceptual since we don't have monetary values)
    // We'll use the average number of items per trade as a proxy
    const tradeRequests = await client.tradeRequest.findMany({
      where: {
        status: "ACCEPTED",
      },
      include: {
        initiatorListings: true,
        targetListings: true,
      },
    });

    const avgItemsPerTrade =
      tradeRequests.length > 0
        ? tradeRequests.reduce(
            (sum, trade) =>
              sum +
              trade.initiatorListings.length +
              trade.targetListings.length,
            0
          ) / tradeRequests.length
        : 0;

    return NextResponse.json({
      trendingTags: trendingTags.map((tag) => ({
        name: tag.name,
        count: tag._count.listings,
      })),
      stats: {
        activeUsers: totalUsers, // Total number of registered users
        completedTrades,
        tradesToday,
        newListingsToday,
        activeListings,
        avgItemsPerTrade: Math.round(avgItemsPerTrade),
      },
    });
  } catch (error) {
    console.error("Error fetching editorial stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch editorial statistics" },
      { status: 500 }
    );
  }
}
