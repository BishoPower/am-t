import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the current user in our database
    const currentDbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!currentDbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    } // Get all messages involving this user, grouped by conversation
    const messages = await client.message.findMany({
      where: {
        OR: [{ fromId: currentDbUser.id }, { toId: currentDbUser.id }],
      },
      select: {
        id: true,
        fromId: true,
        toId: true,
        content: true,
        timestamp: true,
        isRead: true,
        listingId: true,
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
      orderBy: { timestamp: "desc" },
    });

    // Group messages by conversation (other user + listing)
    const conversationsMap = new Map();

    messages.forEach((message) => {
      const otherUserId =
        message.fromId === currentDbUser.id ? message.toId : message.fromId;
      const otherUser =
        message.fromId === currentDbUser.id ? message.to : message.from;

      // Create a unique key for the conversation (other user + listing)
      const conversationKey = `${otherUserId}-${
        message.listingId || "general"
      }`;

      if (!conversationsMap.has(conversationKey)) {
        conversationsMap.set(conversationKey, {
          id: conversationKey,
          otherUser,
          lastMessage: message,
          messages: [message],
          listing: message.listing,
        });
      } else {
        const conversation = conversationsMap.get(conversationKey);
        conversation.messages.push(message);
        // Keep the most recent message as lastMessage
        if (message.timestamp > conversation.lastMessage.timestamp) {
          conversation.lastMessage = message;
        }
      }
    });

    // Convert to array and calculate unread counts
    const conversations = Array.from(conversationsMap.values()).map(
      (conversation) => {
        // Count unread messages (messages from other user that are not read)
        const unreadCount = conversation.messages.filter((msg: any) => {
          const isFromOther = msg.fromId !== currentDbUser.id;
          const isUnread = !msg.isRead;
          console.log(
            `Message ${msg.id}: fromId=${msg.fromId}, currentUserId=${currentDbUser.id}, isFromOther=${isFromOther}, isRead=${msg.isRead}, isUnread=${isUnread}`
          );
          return isFromOther && isUnread;
        }).length;

        console.log(
          `Conversation ${conversation.id}: total messages=${conversation.messages.length}, unread count=${unreadCount}`
        );

        return {
          id: conversation.id,
          otherUser: conversation.otherUser,
          lastMessage: {
            id: conversation.lastMessage.id,
            content: conversation.lastMessage.content,
            timestamp: conversation.lastMessage.timestamp,
            fromId: conversation.lastMessage.fromId,
          },
          unreadCount,
          listing: conversation.listing,
        };
      }
    );

    // Sort by last message timestamp (most recent first)
    conversations.sort(
      (a, b) =>
        new Date(b.lastMessage.timestamp).getTime() -
        new Date(a.lastMessage.timestamp).getTime()
    );

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}
