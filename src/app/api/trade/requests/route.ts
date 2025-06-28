import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const {
      targetListingId,
      targetListingIds,
      offerListingIds,
      message,
      isCounterOffer,
      originalRequestId,
    } = await request.json();

    // For regular trades, use targetListingId (single target)
    // For counter trades, use targetListingIds (multiple targets)
    const targetIds =
      targetListingIds || (targetListingId ? [targetListingId] : []);

    if (!targetIds.length || !offerListingIds || offerListingIds.length === 0) {
      return NextResponse.json(
        { error: "Target listing(s) and offer listings are required" },
        { status: 400 }
      );
    }

    // Find the current user in our database
    const fromUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!fromUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    } // Find the target listings and determine the recipient
    const targetListings = await client.listing.findMany({
      where: {
        id: { in: targetIds },
        status: "ACTIVE",
      },
      include: { user: true },
    });

    if (targetListings.length !== targetIds.length) {
      return NextResponse.json(
        { error: "Some target listings not found" },
        { status: 404 }
      );
    }

    // All target listings should belong to the same user
    const toUserId = targetListings[0].userId;
    const allSameOwner = targetListings.every(
      (listing) => listing.userId === toUserId
    );

    if (!allSameOwner) {
      return NextResponse.json(
        { error: "All target listings must belong to the same user" },
        { status: 400 }
      );
    } // Prevent self-trades
    if (toUserId === fromUser.id) {
      return NextResponse.json(
        { error: "Cannot trade with yourself" },
        { status: 400 }
      );
    }

    // Check if either user has blocked the other
    const blockCheck = await client.blockedUser.findFirst({
      where: {
        OR: [
          { blockerId: fromUser.id, blockedId: toUserId },
          { blockerId: toUserId, blockedId: fromUser.id },
        ],
      },
    });

    if (blockCheck) {
      return NextResponse.json(
        { error: "Cannot send trade request to this user" },
        { status: 403 }
      );
    }

    // Verify that all offer listings belong to the current user
    const offerListings = await client.listing.findMany({
      where: {
        id: { in: offerListingIds },
        userId: fromUser.id,
        status: "ACTIVE",
      },
    });

    if (offerListings.length !== offerListingIds.length) {
      return NextResponse.json(
        { error: "Some offer listings are invalid or not owned by you" },
        { status: 400 }
      );
    } // Create the trade request
    const tradeRequest = await client.tradeRequest.create({
      data: {
        fromUserId: fromUser.id,
        toUserId: toUserId,
        message: message || "",
        status: "PENDING",
        initiatorListings: {
          connect: offerListingIds.map((id: string) => ({ id })),
        },
        targetListings: {
          connect: targetIds.map((id: string) => ({ id })),
        },
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
    });

    return NextResponse.json(tradeRequest);
  } catch (error) {
    console.error("Error creating trade request:", error);
    return NextResponse.json(
      { error: "Failed to create trade request" },
      { status: 500 }
    );
  }
}

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
    } // Fetch trade requests sent and received by the user (PENDING and ACCEPTED for cancelation)
    const [sentRequests, receivedRequests] = await Promise.all([
      client.tradeRequest.findMany({
        where: {
          fromUserId: dbUser.id,
          status: { in: ["PENDING", "ACCEPTED"] },
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
        orderBy: { createdAt: "desc" },
      }),
      client.tradeRequest.findMany({
        where: {
          toUserId: dbUser.id,
          status: { in: ["PENDING", "ACCEPTED"] },
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
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({
      sent: sentRequests,
      received: receivedRequests,
    });
  } catch (error) {
    console.error("Error fetching trade requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch trade requests" },
      { status: 500 }
    );
  }
}
