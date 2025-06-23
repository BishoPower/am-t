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
    const isCanceled = action === "CANCELED";

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

    let statusEmoji, statusText, initiatorMessage, recipientMessage;

    if (isCanceled) {
      statusEmoji = "🚫";
      statusText = "CANCELED"; // Message for the trade initiator (person who sent the request)
      initiatorMessage = `${statusEmoji} **Trade ${statusText}**

This trade has been **canceled**.

**Trade Summary:**
📦 **Your Items:**
${initiatorItems}

🎯 **Their Items:**
${targetItems}

📋 **Important:** All items involved in this trade have been automatically relisted and are now available for new trades. Any reviews related to this trade have also been removed.

---
*Automated notification from the AM-T Trading Platform*`;

      // Message for the trade recipient (person who received the request)
      recipientMessage = `${statusEmoji} **Trade ${statusText}**

This trade has been **canceled**.

**Trade Summary:**
🎁 **They Offered You:**
${initiatorItems}

💼 **You Would Trade:**
${targetItems}

📋 **Important:** All items involved in this trade have been automatically relisted and are now available for new trades. Any reviews related to this trade have also been removed.

---
*Automated notification from the AM-T Trading Platform*`;
    } else {
      statusEmoji = isAccepted ? "✅" : "❌";
      statusText = isAccepted ? "ACCEPTED" : "REJECTED";

      // Message for the trade initiator (person who sent the request)
      initiatorMessage = `${statusEmoji} **Trade ${statusText}**

Your trade request has been **${statusText.toLowerCase()}** by ${
        tradeRequest.toUser.firstName || tradeRequest.toUser.username
      }.

**Trade Summary:**
📦 **Your Items:**
${initiatorItems}

🎯 **Their Items:**
${targetItems}

${
  isAccepted
    ? "🎉 Awesome! Your trade has been accepted. Please coordinate with the other trader to arrange the exchange.\n\n📋 **Important:** All traded items have been automatically marked as 'TRADED' and removed from the marketplace. Happy trading!"
    : "😔 This trade didn't work out, but don't give up! There are many other great trading opportunities waiting for you."
}

---
*Automated notification from the AM-T Trading Platform*`;

      // Message for the trade recipient (person who accepted/rejected)
      recipientMessage = `${statusEmoji} **Trade ${statusText}**

You have **${statusText.toLowerCase()}** a trade request from ${
        tradeRequest.fromUser.firstName || tradeRequest.fromUser.username
      }.

**Trade Summary:**
🎁 **They Offered You:**
${initiatorItems}

💼 **You Would Trade:**
${targetItems}

${
  isAccepted
    ? "🎉 Excellent choice! Please coordinate with the other trader to complete your exchange.\n\n📋 **Important:** All traded items have been automatically marked as 'TRADED' and removed from the marketplace. Enjoy your new items!"
    : "👍 No problem! You can always reconsider similar trades in the future. Keep exploring!"
}

---
*Automated notification from the AM-T Trading Platform*`;
    }

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
    const { action } = await request.json(); // "ACCEPTED", "REJECTED", or "CANCELED"

    if (!["ACCEPTED", "REJECTED", "CANCELED"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be ACCEPTED, REJECTED, or CANCELED" },
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
    } // Verify that the current user is involved in the trade request
    const isRecipient = tradeRequest.toUserId === dbUser.id;
    const isInitiator = tradeRequest.fromUserId === dbUser.id;

    if (!isRecipient && !isInitiator) {
      return NextResponse.json(
        { error: "You can only respond to trade requests you are involved in" },
        { status: 403 }
      );
    }

    // For acceptance and rejection, only the recipient can respond
    if ((action === "ACCEPTED" || action === "REJECTED") && !isRecipient) {
      return NextResponse.json(
        { error: "Only the trade recipient can accept or reject requests" },
        { status: 403 }
      );
    }

    // For cancellation, both parties can cancel, but only pending or accepted trades
    if (action === "CANCELED") {
      if (
        tradeRequest.status !== "PENDING" &&
        tradeRequest.status !== "ACCEPTED"
      ) {
        return NextResponse.json(
          { error: "Only pending or accepted trades can be canceled" },
          { status: 400 }
        );
      }
    } else {
      // Check if the trade request is still pending (for accept/reject)
      if (tradeRequest.status !== "PENDING") {
        return NextResponse.json(
          { error: "This trade request has already been responded to" },
          { status: 400 }
        );
      }
    } // Update the trade request status
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
    }); // If trade is accepted, automatically delist all involved listings
    if (action === "ACCEPTED") {
      const allListingIds = [
        ...updatedTradeRequest.initiatorListings.map((listing) => listing.id),
        ...updatedTradeRequest.targetListings.map((listing) => listing.id),
      ];

      // Update all involved listings to SOLD status
      await client.listing.updateMany({
        where: {
          id: { in: allListingIds },
          status: "ACTIVE", // Only update currently active listings
        },
        data: {
          status: "SOLD",
          updatedAt: new Date(),
        },
      });

      console.log(
        `Auto-delisted ${allListingIds.length} listings as TRADED for accepted trade ${params.id}`
      );
    } // If trade is canceled, automatically relist all involved listings that were previously SOLD
    if (action === "CANCELED") {
      const allListingIds = [
        ...updatedTradeRequest.initiatorListings.map((listing) => listing.id),
        ...updatedTradeRequest.targetListings.map((listing) => listing.id),
      ];

      // Delete all reviews related to this trade
      const deletedReviews = await client.review.deleteMany({
        where: {
          tradeId: params.id,
        },
      });

      console.log(
        `Deleted ${deletedReviews.count} review(s) related to canceled trade ${params.id}`
      );

      // Update all involved listings back to ACTIVE status if they were SOLD
      await client.listing.updateMany({
        where: {
          id: { in: allListingIds },
          status: "SOLD", // Only update listings that were marked as sold
        },
        data: {
          status: "ACTIVE",
          updatedAt: new Date(),
        },
      });

      console.log(
        `Auto-relisted ${allListingIds.length} listings as ACTIVE for canceled trade ${params.id}`
      );
    }

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
