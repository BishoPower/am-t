import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

// Helper function to get or create the AM-T system user
async function getSystemUser() {
  let systemUser = await client.user.findUnique({
    where: { username: "am-t-system" },
  });

  if (!systemUser) {
    systemUser = await client.user.create({
      data: {
        username: "am-t-system",
        email: "system@am-t.com",
        firstName: "AM-T",
        lastName: "System",
        clerkid: "system_am_t", // Special Clerk ID for system user
        bio: "Official AM-T System Account",
      },
    });
  }

  return systemUser;
}

// Helper function to send trade status messages
async function sendTradeStatusMessages(tradeRequest: any, action: string) {
  try {
    const systemUser = await getSystemUser();
    const isAccepted = action === "ACCEPTED";

    // Format trade details with images
    const formatItemsWithImages = (items: any[]) => {
      return items
        .map((item: any) => {
          let itemDescription = `• **${item.title}**`;

          // Add first image if available
          if (item.imageUrls && item.imageUrls.length > 0) {
            itemDescription += `\n  ![${item.title}](${item.imageUrls[0]})`;

            // Add additional images if there are more
            if (item.imageUrls.length > 1) {
              item.imageUrls.slice(1, 3).forEach((imageUrl: string) => {
                // Show up to 3 images total
                itemDescription += `\n  ![${item.title}](${imageUrl})`;
              });

              // Add indicator if there are even more images
              if (item.imageUrls.length > 3) {
                itemDescription += `\n  *+${
                  item.imageUrls.length - 3
                } more image(s)*`;
              }
            }
          }

          return itemDescription;
        })
        .join("\n\n");
    };

    const initiatorItems = formatItemsWithImages(
      tradeRequest.initiatorListings
    );
    const targetItems = formatItemsWithImages(tradeRequest.targetListings);

    const statusEmoji = isAccepted ? "✅" : "❌";
    const statusText = isAccepted ? "ACCEPTED" : "REJECTED";

    // Message for the trade initiator (person who sent the request)
    const initiatorMessage = `${statusEmoji} **Trade ${statusText}**

Your trade request has been **${statusText.toLowerCase()}** by ${
      tradeRequest.toUser.firstName || tradeRequest.toUser.username
    }.

**Trade Details:**
📦 **You offered:**
${initiatorItems}

🎯 **You requested:**
${targetItems}

${
  isAccepted
    ? "🎉 Congratulations! Please coordinate with the other party to complete the exchange."
    : "Better luck next time! Keep exploring other trading opportunities."
}

---
*This is an automated message from AM-T*`;

    // Message for the trade recipient (person who accepted/rejected)
    const recipientMessage = `${statusEmoji} **Trade ${statusText}**

You have **${statusText.toLowerCase()}** a trade request from ${
      tradeRequest.fromUser.firstName || tradeRequest.fromUser.username
    }.

**Trade Details:**
🎯 **You were offered:**
${initiatorItems}

📦 **You would trade:**
${targetItems}

${
  isAccepted
    ? "🎉 Great choice! Please coordinate with the other party to complete the exchange."
    : "No worries! You can always reconsider similar trades in the future."
}

---
*This is an automated message from AM-T*`;

    // Send message to initiator
    await client.message.create({
      data: {
        fromId: systemUser.id,
        toId: tradeRequest.fromUserId,
        content: initiatorMessage,
        isRead: false,
      },
    });

    // Send message to recipient
    await client.message.create({
      data: {
        fromId: systemUser.id,
        toId: tradeRequest.toUserId,
        content: recipientMessage,
        isRead: false,
      },
    });
  } catch (error) {
    console.error("Error sending trade status messages:", error);
    // Don't throw error to avoid breaking the trade flow
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await request.json(); // "ACCEPTED" or "REJECTED"

    if (!["ACCEPTED", "REJECTED"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be ACCEPTED or REJECTED" },
        { status: 400 }
      );
    }

    // Find the current user in our database
    const dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find the trade request
    const tradeRequest = await client.tradeRequest.findUnique({
      where: { id: params.id },
      include: {
        initiatorListings: true,
        targetListings: true,
        fromUser: true,
        toUser: true,
      },
    });

    if (!tradeRequest) {
      return NextResponse.json(
        { error: "Trade request not found" },
        { status: 404 }
      );
    }

    // Verify that the current user is the recipient of the trade request
    if (tradeRequest.toUserId !== dbUser.id) {
      return NextResponse.json(
        { error: "You can only respond to trade requests sent to you" },
        { status: 403 }
      );
    }

    // Check if the trade request is still pending
    if (tradeRequest.status !== "PENDING") {
      return NextResponse.json(
        { error: "This trade request has already been responded to" },
        { status: 400 }
      );
    }
    // Update the trade request status
    const updatedTradeRequest = await client.tradeRequest.update({
      where: { id: params.id },
      data: {
        status: action,
        updatedAt: new Date(),
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

    // Send automated messages to both parties
    await sendTradeStatusMessages(updatedTradeRequest, action);

    return NextResponse.json(updatedTradeRequest);
  } catch (error) {
    console.error("Error updating trade request:", error);
    return NextResponse.json(
      { error: "Failed to update trade request" },
      { status: 500 }
    );
  }
}
