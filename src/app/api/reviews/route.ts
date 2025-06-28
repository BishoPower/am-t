import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Helper function to get blocked user IDs for the current user
async function getBlockedUserIds(currentUserId: string): Promise<string[]> {
  const blocks = await client.blockedUser.findMany({
    where: {
      OR: [{ blockerId: currentUserId }, { blockedId: currentUserId }],
    },
    select: {
      blockerId: true,
      blockedId: true,
    },
  });

  return blocks.map((block) =>
    block.blockerId === currentUserId ? block.blockedId : block.blockerId
  );
}

// GET /api/reviews - Get reviews for a user or listing
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    const { searchParams } = new URL(request.url);
    const userIdParam = searchParams.get("userId");
    const listingId = searchParams.get("listingId");
    const revieweeId = searchParams.get("revieweeId");
    console.log("GET /api/reviews - Parameters:", {
      userId: userIdParam,
      listingId,
      revieweeId,
    });

    if (!userIdParam && !listingId && !revieweeId) {
      return NextResponse.json(
        { error: "Must provide userId, listingId, or revieweeId parameter" },
        { status: 400 }
      );
    }

    // Get blocked user IDs if user is authenticated
    let blockedUserIds: string[] = [];
    if (userId) {
      const dbUser = await client.user.findUnique({
        where: { clerkid: userId },
        select: { id: true },
      });
      if (dbUser) {
        blockedUserIds = await getBlockedUserIds(dbUser.id);
      }
    }

    let reviews;

    if (revieweeId) {
      // Get all reviews for a specific user (reviewee), excluding blocked users
      reviews = await client.review.findMany({
        where: {
          revieweeId,
          ...(blockedUserIds.length > 0
            ? {
                AND: [
                  { reviewerId: { notIn: blockedUserIds } },
                  { revieweeId: { notIn: blockedUserIds } },
                ],
              }
            : {}),
        },
        include: {
          reviewer: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
          listing: {
            select: {
              id: true,
              title: true,
              imageUrls: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (listingId) {
      // Get reviews related to a specific listing, excluding blocked users
      reviews = await client.review.findMany({
        where: {
          listingId,
          ...(blockedUserIds.length > 0
            ? {
                AND: [
                  { reviewerId: { notIn: blockedUserIds } },
                  { revieweeId: { notIn: blockedUserIds } },
                ],
              }
            : {}),
        },
        include: {
          reviewer: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
          reviewee: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      // Get reviews given by a user (reviewer), excluding blocked users
      reviews = await client.review.findMany({
        where: {
          reviewerId: userIdParam!,
          ...(blockedUserIds.length > 0
            ? {
                AND: [
                  { reviewerId: { notIn: blockedUserIds } },
                  { revieweeId: { notIn: blockedUserIds } },
                ],
              }
            : {}),
        },
        include: {
          reviewee: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
          listing: {
            select: {
              id: true,
              title: true,
              imageUrls: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    console.log("GET /api/reviews - Reviews found:", reviews.length);
    console.log(
      "GET /api/reviews - Reviews data:",
      JSON.stringify(reviews, null, 2)
    );

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the user in our database
    const dbUser = await client.user.findUnique({
      where: { clerkid: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { rating, comment, revieweeId, listingId, tradeId } = body;

    // Validate required fields
    if (!rating || !revieweeId) {
      return NextResponse.json(
        { error: "Rating and revieweeId are required" },
        { status: 400 }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    } // Prevent self-reviews
    if (revieweeId === dbUser.id) {
      return NextResponse.json(
        { error: "Cannot review yourself" },
        { status: 400 }
      );
    }

    // Check if users have blocked each other
    const blockExists = await client.blockedUser.findFirst({
      where: {
        OR: [
          { blockerId: dbUser.id, blockedId: revieweeId },
          { blockerId: revieweeId, blockedId: dbUser.id },
        ],
      },
    });

    if (blockExists) {
      return NextResponse.json(
        { error: "Cannot review blocked users" },
        { status: 403 }
      );
    } // Verify reviewee exists
    const reviewee = await client.user.findUnique({
      where: { id: revieweeId },
    });

    if (!reviewee) {
      return NextResponse.json(
        { error: "Reviewee not found" },
        { status: 404 }
      );
    }

    // Check if users have completed a trade together
    const completedTrade = await client.tradeRequest.findFirst({
      where: {
        status: "ACCEPTED",
        OR: [
          {
            // Current user initiated trade, reviewee accepted
            fromUserId: dbUser.id,
            toUserId: revieweeId,
          },
          {
            // Reviewee initiated trade, current user accepted
            fromUserId: revieweeId,
            toUserId: dbUser.id,
          },
        ],
      },
    });

    if (!completedTrade) {
      return NextResponse.json(
        { error: "You can only review users you have completed trades with" },
        { status: 403 }
      );
    }

    // If listing is provided, verify it exists
    if (listingId) {
      const listing = await client.listing.findUnique({
        where: { id: listingId },
      });

      if (!listing) {
        return NextResponse.json(
          { error: "Listing not found" },
          { status: 404 }
        );
      }
    } // If trade is provided, verify it exists and user participated
    if (tradeId) {
      const trade = await client.tradeRequest.findUnique({
        where: { id: tradeId },
      });

      if (!trade) {
        return NextResponse.json({ error: "Trade not found" }, { status: 404 });
      }

      // Verify the trade is ACCEPTED (completed)
      if (trade.status !== "ACCEPTED") {
        return NextResponse.json(
          { error: "Can only review completed (accepted) trades" },
          { status: 400 }
        );
      }

      // Check if user participated in this trade and verify reviewee is the other party
      let isValidTradeParticipant = false;
      if (trade.fromUserId === dbUser.id && trade.toUserId === revieweeId) {
        isValidTradeParticipant = true;
      } else if (
        trade.toUserId === dbUser.id &&
        trade.fromUserId === revieweeId
      ) {
        isValidTradeParticipant = true;
      }

      if (!isValidTradeParticipant) {
        return NextResponse.json(
          { error: "Invalid trade relationship for this review" },
          { status: 403 }
        );
      }

      // Check if user already reviewed this trade
      const existingReview = await client.review.findFirst({
        where: {
          tradeId: tradeId,
          reviewerId: dbUser.id,
        },
      });

      if (existingReview) {
        return NextResponse.json(
          { error: "You have already reviewed this trade" },
          { status: 400 }
        );
      }
    } else {
      // If no specific trade ID is provided, ensure the review is still tied to a completed trade
      // This prevents users from creating general reviews without trade context
      if (!completedTrade) {
        return NextResponse.json(
          { error: "Reviews must be associated with a completed trade" },
          { status: 400 }
        );
      }

      // Check if user has already reviewed this user (without specific trade)
      const existingGeneralReview = await client.review.findFirst({
        where: {
          reviewerId: dbUser.id,
          revieweeId: revieweeId,
          tradeId: null, // General review not tied to specific trade
        },
      });

      if (existingGeneralReview) {
        return NextResponse.json(
          { error: "You have already reviewed this user" },
          { status: 400 }
        );
      }
    }

    // Create the review
    const review = await client.review.create({
      data: {
        rating,
        comment: comment || null,
        reviewerId: dbUser.id,
        revieweeId,
        listingId: listingId || null,
        tradeId: tradeId || null,
      },
      include: {
        reviewer: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        reviewee: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        listing: {
          select: {
            id: true,
            title: true,
            imageUrls: true,
          },
        },
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
