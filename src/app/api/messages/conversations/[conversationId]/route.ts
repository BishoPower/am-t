import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
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
    } // Parse the conversation ID to get other user ID and listing ID
    // Handle UUID format: "uuid-general" or "uuid-listingId"
    const conversationId = params.conversationId;
    let otherUserId: string;
    let listingId: string | null;

    // Look for the last dash to split properly (UUID contains multiple dashes)
    const lastDashIndex = conversationId.lastIndexOf("-");

    if (lastDashIndex === -1) {
      return NextResponse.json(
        { error: "Invalid conversation ID format" },
        { status: 400 }
      );
    }

    otherUserId = conversationId.substring(0, lastDashIndex);
    const listingPart = conversationId.substring(lastDashIndex + 1);
    listingId = listingPart === "general" ? null : listingPart;

    // Delete all messages in this conversation where current user is involved
    await client.message.deleteMany({
      where: {
        OR: [
          {
            fromId: currentDbUser.id,
            toId: otherUserId,
            listingId: listingId,
          },
          {
            fromId: otherUserId,
            toId: currentDbUser.id,
            listingId: listingId,
          },
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return NextResponse.json(
      { error: "Failed to delete conversation" },
      { status: 500 }
    );
  }
}
