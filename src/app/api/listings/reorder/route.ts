import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { listingIds } = await req.json();

    if (!Array.isArray(listingIds)) {
      return NextResponse.json(
        { error: "Invalid listing IDs format" },
        { status: 400 }
      );
    }

    // Get the user's database ID
    const dbUser = await db.user.findUnique({
      where: { clerkid: clerkUser.id },
      select: { id: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the order of listings in a transaction
    await db.$transaction(
      listingIds.map((listingId: string, index: number) =>
        db.listing.update({
          where: {
            id: listingId,
            userId: dbUser.id, // Ensure user owns the listing
          },
          data: {
            order: index,
          },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering listings:", error);
    return NextResponse.json(
      { error: "Failed to reorder listings" },
      { status: 500 }
    );
  }
}
