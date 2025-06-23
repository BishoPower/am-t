import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// GET /api/reviews - Get reviews for a user or listing
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const listingId = searchParams.get("listingId");
    const revieweeId = searchParams.get("revieweeId");
    console.log("GET /api/reviews - Parameters:", {
      userId,
      listingId,
      revieweeId,
    });

    if (!userId && !listingId && !revieweeId) {
      return NextResponse.json(
        { error: "Must provide userId, listingId, or revieweeId parameter" },
        { status: 400 }
      );
    }

    let reviews;

    if (revieweeId) {
      // Get all reviews for a specific user (reviewee)
      reviews = await client.review.findMany({
        where: { revieweeId },
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
      // Get reviews related to a specific listing
      reviews = await client.review.findMany({
        where: { listingId },
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
      // Get reviews given by a user (reviewer)
      reviews = await client.review.findMany({
        where: { reviewerId: userId! },
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
    }

    // Prevent self-reviews
    if (revieweeId === dbUser.id) {
      return NextResponse.json(
        { error: "Cannot review yourself" },
        { status: 400 }
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
