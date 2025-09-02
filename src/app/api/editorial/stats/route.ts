import { NextResponse } from "next/server";
import { client } from "@/lib/prisma";

export async function GET() {
  try {
    // Simplified queries to reduce connection pool strain
    // Get basic stats with simple counts
    const [totalUsers, completedTrades, activeListings] = await Promise.all([
      client.user.count(),
      client.tradeRequest.count({
        where: {
          status: "ACCEPTED",
        },
      }),
      client.listing.count({
        where: {
          status: "ACTIVE",
        },
      }),
    ]);

    // Get basic trending tags (simplified query)
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
      take: 5, // Reduced from 10 to 5
    });

    // Get today's stats with simpler queries
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [tradesToday, newListingsToday] = await Promise.all([
      client.tradeRequest.count({
        where: {
          status: "ACCEPTED",
          updatedAt: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),
      client.listing.count({
        where: {
          createdAt: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),
    ]);

    return NextResponse.json({
      trendingTags: trendingTags.map((tag) => ({
        name: tag.name,
        count: tag._count.listings,
      })),
      stats: {
        activeUsers: totalUsers,
        completedTrades,
        tradesToday,
        newListingsToday,
        activeListings,
        avgItemsPerTrade: 2, // Hardcoded for now to avoid complex queries
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
