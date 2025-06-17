import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toId, content, listingId } = await request.json();

    if (!toId || !content?.trim()) {
      return NextResponse.json(
        { error: "Recipient and message content are required" },
        { status: 400 }
      );
    }

    // Find the current user in our database
    const fromUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!fromUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify the recipient exists
    const toUser = await client.user.findUnique({
      where: { id: toId },
    });

    if (!toUser) {
      return NextResponse.json(
        { error: "Recipient not found" },
        { status: 404 }
      );
    }

    // Prevent self-messaging
    if (fromUser.id === toId) {
      return NextResponse.json(
        { error: "Cannot send message to yourself" },
        { status: 400 }
      );
    }

    // If listingId is provided, verify it exists
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
    }

    // Create the message
    const message = await client.message.create({
      data: {
        fromId: fromUser.id,
        toId: toId,
        content: content.trim(),
        listingId: listingId || null,
      },
      include: {
        from: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
        to: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
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

    return NextResponse.json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
