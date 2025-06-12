import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { db } from "@/lib/db";

export async function POST() {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Get the user's UUID from the database
  const user = await db.user.findUnique({ where: { clerkid: clerkId } });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Delete related records using the UUID
  await db.tradePreference.deleteMany({ where: { userId: user.id } });
  await db.favorite.deleteMany({ where: { userId: user.id } });
  await db.message.deleteMany({ where: { fromId: user.id } });
  await db.message.deleteMany({ where: { toId: user.id } });
  await db.tradeRequest.deleteMany({ where: { fromUserId: user.id } });
  await db.tradeRequest.deleteMany({ where: { toUserId: user.id } });
  await db.listing.deleteMany({ where: { userId: user.id } });
  await db.closet.deleteMany({ where: { userId: user.id } });

  // Now delete the user
  await db.user.delete({ where: { clerkid: clerkId } });

  // Delete from Clerk
  await clerkClient.users.deleteUser(clerkId);

  return NextResponse.json({ success: true });
}
