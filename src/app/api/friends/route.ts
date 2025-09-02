import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";
import { FriendshipStatus } from "@/generated/prisma";

// GET /api/friends - Get user's friends and friend requests
export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current user
    const dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // 'friends', 'sent', 'received', 'all'
    const format = searchParams.get("format"); // 'users' for simplified format

    let friendships;

    switch (type) {
      case "friends":
        // Get accepted friendships
        friendships = await client.friendship.findMany({
          where: {
            OR: [
              { requesterId: dbUser.id, status: FriendshipStatus.ACCEPTED },
              { receiverId: dbUser.id, status: FriendshipStatus.ACCEPTED },
            ],
          },
          include: {
            requester: {
              select: {
                id: true,
                username: true,
                displayName: true,
              },
            },
            receiver: {
              select: {
                id: true,
                username: true,
                displayName: true,
              },
            },
          },
        });
        break;

      case "sent":
        // Get pending requests sent by user
        friendships = await client.friendship.findMany({
          where: {
            requesterId: dbUser.id,
            status: FriendshipStatus.PENDING,
          },
          include: {
            receiver: {
              select: {
                id: true,
                username: true,
                displayName: true,
                image: true,
              },
            },
          },
        });
        break;

      case "received":
        // Get pending requests received by user
        friendships = await client.friendship.findMany({
          where: {
            receiverId: dbUser.id,
            status: FriendshipStatus.PENDING,
          },
          include: {
            requester: {
              select: {
                id: true,
                username: true,
                displayName: true,
                image: true,
              },
            },
          },
        });
        break;

      default:
        // Get all friendships
        friendships = await client.friendship.findMany({
          where: {
            OR: [{ requesterId: dbUser.id }, { receiverId: dbUser.id }],
          },
          include: {
            requester: {
              select: {
                id: true,
                username: true,
                displayName: true,
                image: true,
              },
            },
            receiver: {
              select: {
                id: true,
                username: true,
                displayName: true,
                image: true,
              },
            },
          },
        });
        break;
    }

    // If format=users is requested, return just the friend users for easier consumption
    if (format === "users" && type === "friends") {
      const friends = friendships.map((friendship: any) => {
        // Return the other person in the friendship (not the current user)
        return friendship.requesterId === dbUser.id
          ? friendship.receiver
          : friendship.requester;
      });
      return NextResponse.json(friends);
    }

    return NextResponse.json({ friendships });
  } catch (error) {
    console.error("Error fetching friends:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/friends - Send friend request
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { receiverUsername } = await request.json();

    if (!receiverUsername) {
      return NextResponse.json(
        { error: "Receiver username is required" },
        { status: 400 }
      );
    }

    // Get current user
    const dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get receiver user
    const receiver = await client.user.findUnique({
      where: { username: receiverUsername },
    });

    if (!receiver) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Can't send friend request to yourself
    if (dbUser.id === receiver.id) {
      return NextResponse.json(
        { error: "Cannot send friend request to yourself" },
        { status: 400 }
      );
    }

    // Check if friendship already exists
    const existingFriendship = await client.friendship.findFirst({
      where: {
        OR: [
          { requesterId: dbUser.id, receiverId: receiver.id },
          { requesterId: receiver.id, receiverId: dbUser.id },
        ],
      },
    });

    if (existingFriendship) {
      if (existingFriendship.status === FriendshipStatus.ACCEPTED) {
        return NextResponse.json({ error: "Already friends" }, { status: 400 });
      } else if (existingFriendship.status === FriendshipStatus.PENDING) {
        return NextResponse.json(
          { error: "Friend request already sent" },
          { status: 400 }
        );
      }
    }

    // Create friendship request
    const friendship = await client.friendship.create({
      data: {
        requesterId: dbUser.id,
        receiverId: receiver.id,
        status: FriendshipStatus.PENDING,
      },
      include: {
        receiver: {
          select: {
            id: true,
            username: true,
            displayName: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ friendship }, { status: 201 });
  } catch (error) {
    console.error("Error sending friend request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
