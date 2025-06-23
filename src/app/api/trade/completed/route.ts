import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the user in our database
    const dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch completed trade requests (ACCEPTED status) that the user participated in
    const [completedTradesAsInitiator, completedTradesAsRecipient] =
      await Promise.all([
        client.tradeRequest.findMany({
          where: {
            fromUserId: dbUser.id,
            status: "ACCEPTED",
          },
          include: {
            fromUser: {
              select: {
                id: true,
                username: true,
                image: true,
                firstName: true,
                lastName: true,
              },
            },
            toUser: {
              select: {
                id: true,
                username: true,
                image: true,
                firstName: true,
                lastName: true,
              },
            },
            initiatorListings: {
              include: {
                tags: true,
              },
            },
            targetListings: {
              include: {
                tags: true,
              },
            },
          },
          orderBy: { updatedAt: "desc" },
        }),
        client.tradeRequest.findMany({
          where: {
            toUserId: dbUser.id,
            status: "ACCEPTED",
          },
          include: {
            fromUser: {
              select: {
                id: true,
                username: true,
                image: true,
                firstName: true,
                lastName: true,
              },
            },
            toUser: {
              select: {
                id: true,
                username: true,
                image: true,
                firstName: true,
                lastName: true,
              },
            },
            initiatorListings: {
              include: {
                tags: true,
              },
            },
            targetListings: {
              include: {
                tags: true,
              },
            },
          },
          orderBy: { updatedAt: "desc" },
        }),
      ]);

    // Check which trades the user has already reviewed
    const allCompletedTrades = [
      ...completedTradesAsInitiator,
      ...completedTradesAsRecipient,
    ];
    const tradeIds = allCompletedTrades.map((trade) => trade.id);

    const existingReviews = await client.review.findMany({
      where: {
        tradeId: { in: tradeIds },
        reviewerId: dbUser.id,
      },
      select: {
        tradeId: true,
      },
    });

    const reviewedTradeIds = new Set(
      existingReviews.map((review) => review.tradeId)
    );

    // Add review status to each trade
    const tradesWithReviewStatus = allCompletedTrades.map((trade) => ({
      ...trade,
      hasUserReviewed: reviewedTradeIds.has(trade.id),
      otherParty:
        trade.fromUserId === dbUser.id ? trade.toUser : trade.fromUser,
      userRole: trade.fromUserId === dbUser.id ? "initiator" : "recipient",
    }));

    return NextResponse.json({
      completedTrades: tradesWithReviewStatus,
    });
  } catch (error) {
    console.error("Error fetching completed trades:", error);
    return NextResponse.json(
      { error: "Failed to fetch completed trades" },
      { status: 500 }
    );
  }
}
